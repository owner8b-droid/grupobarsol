// Formularios: validación accesible y salida a WhatsApp con el resumen escrito (ADR-002).
// modern-web-guidance: validate-input-after-interaction + accessible-error-announcement.
import { track } from './analytics';

const CAMPOS = 'input, textarea, select';

// aria-invalid y el mensaje de error en aria-describedby solo mientras el campo es inválido
// (aria-errormessage se mantiene, pero su soporte en lectores de pantalla es parcial).
function marcar(el: HTMLElement, invalido: boolean) {
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

function sincronizarAria(el: Element | null) {
  if (!(el instanceof HTMLElement) || !el.matches(CAMPOS)) return;
  marcar(el, el.matches(':user-invalid'));
}

export function initValidacionAccesible(): void {
  // Un intento de envío con campos inválidos no dispara "submit" sino "invalid" en cada campo (no burbujea)
  document.addEventListener(
    'invalid',
    (e) => {
      if (e.target instanceof HTMLElement && e.target.matches(CAMPOS)) marcar(e.target, true);
    },
    true,
  );
  document.addEventListener('blur', (e) => sincronizarAria(e.target as Element), true);
  document.addEventListener('input', (e) => {
    const el = e.target as Element;
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

async function copiaPorCorreo(clave: string, asunto: string, datos: Record<string, string>): Promise<boolean> {
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
  document.querySelectorAll<HTMLFormElement>('form[data-whatsapp]').forEach((form) => {
    form.addEventListener('submit', async (evento) => {
      evento.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        form.querySelectorAll(CAMPOS).forEach(sincronizarAria);
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
      }

      const clave = form.dataset.web3forms;
      if (clave && datos.correo) {
        const ok = await copiaPorCorreo(clave, 'Pre-cotización desde el sitio', datos);
        if (!ok) form.querySelector<HTMLElement>('[data-error-correo]')?.removeAttribute('hidden');
      }
    });
  });
}
