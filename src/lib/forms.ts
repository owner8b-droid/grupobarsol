// Formularios: validación accesible y salida a WhatsApp con el resumen escrito (ADR-002).
// modern-web-guidance: validate-input-after-interaction + accessible-error-announcement.
// Los formularios llevan novalidate: solo se ven nuestros mensajes (voseo, junto al campo), nunca la burbuja
// nativa del navegador. Al enviar con errores se marcan todos y el foco va al primero.
import { track } from './analytics';

const CAMPOS = 'input, textarea, select';

// Servicios que se pueden precargar desde la URL (?servicio=) o desde un enlace (data-servicio): lista cerrada
const SERVICIOS: Record<string, string> = {
  tierra: 'Movimiento de tierras',
  alquiler: 'Alquiler de maquinaria',
  acarreo: 'Acarreo o agregados',
  obra: 'Obra civil',
};

// aria-invalid y el mensaje de error en aria-describedby solo mientras el campo es inválido
// (aria-errormessage se mantiene, pero su soporte en lectores de pantalla es parcial).
export function marcar(el: HTMLElement, invalido: boolean) {
  const idError = el.getAttribute('aria-errormessage');
  const ids = new Set((el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter(Boolean));
  if (invalido) el.setAttribute('aria-invalid', 'true');
  else el.removeAttribute('aria-invalid');
  if (idError) {
    if (invalido) ids.add(idError);
    else ids.delete(idError);
  }
  if (ids.size) el.setAttribute('aria-describedby', [...ids].join(' '));
  else el.removeAttribute('aria-describedby');
}

const esValido = (el: Element) => !(el as HTMLInputElement).checkValidity || (el as HTMLInputElement).checkValidity();

// Un campo ya marcado sigue marcado mientras siga inválido (aunque no se haya tocado);
// uno sin marcar solo se marca después de que la persona interactuó con él (:user-invalid).
function sincronizarAria(el: Element | null) {
  if (!(el instanceof HTMLElement) || !el.matches(CAMPOS)) return;
  const yaMarcado = el.getAttribute('aria-invalid') === 'true';
  marcar(el, yaMarcado ? !esValido(el) : el.matches(':user-invalid'));
}

// Teléfono de Costa Rica: 8 dígitos, con o sin espacios, guiones, paréntesis o el prefijo 506
export function digitosTelefono(valor: string): string {
  const digitos = valor.replace(/\D/g, '');
  return digitos.length === 11 && digitos.startsWith('506') ? digitos.slice(3) : digitos;
}
export function validarTelefono(el: HTMLInputElement) {
  // Vacío de verdad lo resuelve «required»; cualquier otra cosa (también solo espacios) tiene que dar 8 dígitos
  const vacio = el.value === '';
  const mensaje = document.getElementById(el.getAttribute('aria-errormessage') ?? '')?.textContent ?? 'Teléfono inválido';
  el.setCustomValidity(vacio || digitosTelefono(el.value).length === 8 ? '' : mensaje);
}

function precargarServicio(form: HTMLFormElement, clave: string | null | undefined) {
  const valor = clave ? SERVICIOS[clave] : undefined;
  const select = form.querySelector<HTMLSelectElement>('select[name="servicio"]');
  if (valor && select && [...select.options].some((o) => o.value === valor)) select.value = valor;
}

export function initValidacionAccesible(): void {
  document.querySelectorAll<HTMLInputElement>('input[data-validar="telefono"]').forEach(validarTelefono);
  // Un envío por requestSubmit sin novalidate dispara «invalid» en cada campo (no burbujea)
  document.addEventListener(
    'invalid',
    (e) => {
      if (e.target instanceof HTMLElement && e.target.matches(CAMPOS)) marcar(e.target, true);
    },
    true,
  );
  document.addEventListener('blur', (e) => sincronizarAria(e.target as Element), true);
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el instanceof HTMLInputElement && el.dataset.validar === 'telefono') validarTelefono(el);
    if (el instanceof HTMLElement && el.getAttribute('aria-invalid') === 'true') sincronizarAria(el);
  });
}

function resumen(form: HTMLFormElement): { lineas: string[]; datos: Record<string, string> } {
  const lineas: string[] = [];
  const datos: Record<string, string> = {};
  form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-etiqueta]').forEach((campo) => {
    const valor = campo.value.trim();
    if (!valor) return;
    lineas.push(`• ${campo.dataset.etiqueta}: ${valor}`);
    datos[campo.name] = valor;
  });
  return { lineas, datos };
}

export async function copiaPorCorreo(clave: string, asunto: string, datos: Record<string, string>): Promise<boolean> {
  const control = new AbortController();
  const limite = window.setTimeout(() => control.abort(), 8000);
  try {
    const r = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: clave, subject: asunto, from_name: 'Sitio Grupo Barsol', ...datos }),
      signal: control.signal,
    });
    return r.ok;
  } catch {
    return false;
  } finally {
    window.clearTimeout(limite);
  }
}

export function initFormulariosWhatsApp(): void {
  const formularios = [...document.querySelectorAll<HTMLFormElement>('form[data-whatsapp]')];
  if (!formularios.length) return;

  // Precarga del servicio: desde la URL (?servicio=obra) o desde un enlace que baja al formulario
  const desdeUrl = new URLSearchParams(window.location.search).get('servicio');
  formularios.forEach((form) => precargarServicio(form, desdeUrl));
  document.addEventListener('click', (e) => {
    const enlace = (e.target as Element).closest<HTMLAnchorElement>('a[data-servicio]');
    if (enlace) formularios.forEach((form) => precargarServicio(form, enlace.dataset.servicio));
  });

  formularios.forEach((form) => {
    form.addEventListener('submit', async (evento) => {
      evento.preventDefault();
      form.querySelectorAll<HTMLInputElement>('input[data-validar="telefono"]').forEach(validarTelefono);
      if (!form.checkValidity()) {
        const invalidos = [...form.querySelectorAll<HTMLElement>(CAMPOS)].filter((c) => !esValido(c));
        invalidos.forEach((c) => marcar(c, true));
        invalidos[0]?.focus();
        return;
      }
      // Honeypot: si un bot lo llenó, se descarta en silencio
      const trampa = form.querySelector<HTMLInputElement>('[data-trampa]');
      if (trampa?.value) return;

      const { lineas, datos } = resumen(form);
      const mensaje = [form.dataset.saludo ?? 'Hola, Grupo Barsol.', ...lineas].join('\n');
      const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(mensaje)}`;
      const confirmacion = form.querySelector<HTMLElement>('[data-confirmacion]');
      const nombre = datos.nombre ?? '';

      window.open(url, '_blank', 'noopener');
      track('lead_enviado', { formulario: form.dataset.formulario ?? 'contacto' });

      if (confirmacion) {
        const enlace = confirmacion.querySelector<HTMLAnchorElement>('a');
        if (enlace) enlace.href = url;
        const saludo = confirmacion.querySelector<HTMLElement>('[data-saludo-nombre]');
        if (saludo) saludo.textContent = nombre ? `¡Listo, ${nombre}!` : '¡Listo!';
        confirmacion.hidden = false;
        // Al volver de WhatsApp, la confirmación (con el enlace de respaldo) está a la vista y enfocada
        confirmacion.scrollIntoView({ block: 'center' });
        confirmacion.focus({ preventScroll: true });
      }

      const clave = form.dataset.web3forms;
      if (clave && datos.correo) {
        const ok = await copiaPorCorreo(clave, 'Pre-cotización desde el sitio', datos);
        if (!ok) form.querySelector<HTMLElement>('[data-error-correo]')?.removeAttribute('hidden');
      }
    });
  });
}
