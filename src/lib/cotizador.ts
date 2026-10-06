// Pre-cotizador de 5 pasos (docs/02-estrategia.md §10 · ADR-002, ADR-016). Se carga solo en /cotizador/.
// Un paso por vez; valida con los mensajes de la estrategia; estado en la URL (?paso=, atrás y adelante del
// navegador) y en sessionStorage (no se pierde al recargar); precarga ?servicio= y ?maquina= contra las listas
// cerradas que trae el propio HTML; resume y abre WhatsApp con el mensaje escrito.
import { track } from './analytics';
import { copiaPorCorreo, marcar, validarTelefono } from './forms';

const ALMACEN = 'barsol-cotizador';
type Campos = Record<string, string | boolean>;

function leerAlmacen(): { campos: Campos } | null {
  try {
    return JSON.parse(sessionStorage.getItem(ALMACEN) ?? 'null');
  } catch {
    return null;
  }
}
function escribirAlmacen(valor: { campos: Campos } | null) {
  try {
    if (valor) sessionStorage.setItem(ALMACEN, JSON.stringify(valor));
    else sessionStorage.removeItem(ALMACEN);
  } catch {
    // Navegación privada o almacenamiento bloqueado: el asistente sigue funcionando sin recordar
  }
}

export function initCotizador(): void {
  const encontrado = document.querySelector<HTMLFormElement>('form[data-cotizador]');
  if (!encontrado) return;
  const form: HTMLFormElement = encontrado;
  const pasos = [...form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-paso]')];
  const total = pasos.length;
  const titulos: string[] = JSON.parse(form.dataset.titulos ?? '[]');
  const maquinas: Record<string, string> = JSON.parse(form.dataset.maquinas ?? '{}');
  const estado = form.querySelector<HTMLElement>('[data-estado]');
  const barras = [...form.querySelectorAll<HTMLElement>('[data-barra-paso]')];
  const atras = form.querySelector<HTMLElement>('[data-atras]');
  const seguir = form.querySelector<HTMLElement>('[data-seguir]');
  const navegacion = form.querySelector<HTMLElement>('[data-navegacion]');
  const $ = <T extends Element = HTMLInputElement>(sel: string) => form.querySelector<T>(sel);
  const elegido = (nombre: string) => $<HTMLInputElement>(`input[name="${nombre}"]:checked`);
  const servicio = () => elegido('servicio')?.value ?? '';
  let actual = 1;
  let iniciado = false;

  // ── Estado: guardar y restaurar ────────────────────────────────────────────────────────────────────────────
  const campos = () => [...form.querySelectorAll<HTMLInputElement>('input[name], textarea[name]')].filter((c) => !c.hasAttribute('data-trampa'));
  function guardar() {
    const datos: Campos = {};
    campos().forEach((c) => {
      if (c.type === 'radio') {
        if (c.checked) datos[c.name] = c.value;
      } else if (c.type === 'checkbox') datos[c.name] = c.checked;
      else datos[c.name] = c.value;
    });
    escribirAlmacen({ campos: datos });
  }
  function restaurar() {
    const guardado = leerAlmacen()?.campos;
    if (!guardado) return;
    campos().forEach((c) => {
      const v = guardado[c.name];
      if (v === undefined) return;
      if (c.type === 'radio') c.checked = c.value === v;
      else if (c.type === 'checkbox') c.checked = v === true;
      else c.value = String(v);
    });
  }

  // ── Precarga desde la URL, solo con valores que existen en el formulario ──────────────────────────────────
  function precargar() {
    const url = new URL(window.location.href);
    const pedido = url.searchParams.get('servicio');
    const radio = pedido ? $<HTMLInputElement>(`input[name="servicio"][value="${CSS.escape(pedido)}"]`) : null;
    if (radio) radio.checked = true;
    const maquina = maquinas[url.searchParams.get('maquina') ?? ''];
    if (maquina) {
      const servicioAlquiler = $<HTMLInputElement>('input[name="servicio"][value="alquiler"]');
      const opcion = $<HTMLInputElement>(`input[name="detalle-alquiler"][value="${CSS.escape(maquina)}"]`);
      if (servicioAlquiler && opcion) {
        servicioAlquiler.checked = true;
        opcion.checked = true;
      }
    }
    // La precarga se aplica una vez: al recargar manda lo que la persona eligió después
    if (url.searchParams.has('servicio') || url.searchParams.has('maquina')) {
      url.searchParams.delete('servicio');
      url.searchParams.delete('maquina');
      history.replaceState(history.state, '', url);
    }
  }

  // ── Detalle según el servicio (paso 2) ────────────────────────────────────────────────────────────────────
  function actualizarDetalle() {
    const s = servicio();
    form.querySelectorAll<HTMLElement>('[data-detalle]').forEach((d) => (d.hidden = d.dataset.detalle !== s));
  }

  // ── Validación por paso ───────────────────────────────────────────────────────────────────────────────────
  function errorDeGrupo(grupo: HTMLElement | null, invalido: boolean) {
    if (!grupo) return;
    const error = document.getElementById(grupo.getAttribute('aria-errormessage') ?? '');
    if (error) error.hidden = !invalido;
    marcar(grupo, invalido);
  }
  function grupoValido(nombre: string, mostrar: boolean): boolean {
    const ok = Boolean(elegido(nombre));
    if (mostrar || ok) errorDeGrupo($<HTMLElement>(`[data-grupo="${nombre}"]`), !ok);
    return ok;
  }
  function campoValido(el: HTMLInputElement | HTMLTextAreaElement | null, mostrar: boolean): boolean {
    if (!el) return true;
    if (el.required && el.value !== '' && el.value.trim() === '') el.setCustomValidity('vacío');
    else if (el.id === 'proyecto') el.setCustomValidity(el.value.trim().length >= 10 ? '' : 'corto');
    else if (el.dataset.validar === 'telefono') validarTelefono(el as HTMLInputElement);
    else el.setCustomValidity('');
    const ok = el.checkValidity();
    if (mostrar || ok) marcar(el, !ok);
    return ok;
  }
  /** Devuelve el primer control inválido del paso (o null) y, con `mostrar`, marca todos los errores. */
  function primerInvalido(n: number, mostrar: boolean): HTMLElement | null {
    const problemas: HTMLElement[] = [];
    const pedir = (ok: boolean, el: HTMLElement | null) => {
      if (!ok && el) problemas.push(el);
    };
    if (n === 1) pedir(grupoValido('servicio', mostrar), $('input[name="servicio"]'));
    if (n === 2) {
      const s = servicio();
      if (s === 'nose') pedir(campoValido($<HTMLTextAreaElement>('#proyecto'), mostrar), $('#proyecto'));
      else if (s) pedir(grupoValido(`detalle-${s}`, mostrar), $(`input[name="detalle-${s}"]`));
    }
    if (n === 3) {
      pedir(campoValido($('#lugar'), mostrar), $('#lugar'));
      pedir(grupoValido('cuando', mostrar), $('input[name="cuando"]'));
    }
    if (n === 4) {
      for (const sel of ['#cz-nombre', '#cz-telefono', '#cz-correo', '#cz-permiso']) {
        pedir(campoValido($(sel), mostrar), $(sel));
      }
    }
    return problemas[0] ?? null;
  }
  /** Último paso al que se puede llegar: el primero con datos incompletos (o el resumen). */
  function pasoAlcanzable(): number {
    for (let n = 1; n < total; n++) if (primerInvalido(n, false)) return n;
    return total;
  }

  // ── Resumen y mensaje ─────────────────────────────────────────────────────────────────────────────────────
  function respuestas() {
    const s = servicio();
    const valor = (sel: string) => ($<HTMLInputElement>(sel)?.value ?? '').trim();
    const detalle =
      s === 'nose' ? valor('#proyecto') : [elegido(`detalle-${s}`)?.value, valor(`#extra-${s}`)].filter(Boolean).join(' · ');
    return {
      servicio: elegido('servicio')?.dataset.etiqueta ?? '',
      detalle,
      lugar: valor('#lugar'),
      cuando: elegido('cuando')?.value ?? '',
      nombre: valor('#cz-nombre'),
      telefono: valor('#cz-telefono'),
      correo: valor('#cz-correo'),
    };
  }
  function pintarResumen() {
    const r = respuestas();
    const filas: Record<string, string> = {
      servicio: r.servicio,
      detalle: r.detalle,
      lugar: r.lugar,
      cuando: r.cuando,
      contacto: [r.nombre, r.telefono, r.correo].filter(Boolean).join(' · '),
    };
    form.querySelectorAll<HTMLElement>('[data-resumen]').forEach((valor) => (valor.textContent = filas[valor.dataset.resumen ?? ''] || 'Sin completar'));
  }
  function mensaje(): string {
    const r = respuestas();
    return [
      'Hola, Grupo Barsol. Quiero una pre-cotización:',
      `• Servicio: ${r.servicio}`,
      `• Detalle: ${r.detalle}`,
      `• Lugar: ${r.lugar}`,
      `• Para: ${r.cuando}`,
      `• Nombre: ${[r.nombre, r.telefono, r.correo].filter(Boolean).join(' · ')}`,
    ].join('\n');
  }

  // ── Navegación ────────────────────────────────────────────────────────────────────────────────────────────
  function mostrar(n: number, opciones: { enfocar?: boolean; historial?: 'push' | 'replace' | 'none' } = {}) {
    const { enfocar = true, historial = 'push' } = opciones;
    actual = Math.min(Math.max(n, 1), total);
    pasos.forEach((p) => (p.hidden = Number(p.dataset.paso) !== actual));
    barras.forEach((b) => {
      const k = Number(b.dataset.barraPaso);
      b.classList.toggle('is-hecho', k < actual);
      b.classList.toggle('is-actual', k === actual);
    });
    if (estado) estado.textContent = `Paso ${actual} de ${total} · ${titulos[actual - 1] ?? ''}`;
    // En el resumen no hay Atrás ni Seguir (artboard): cada fila tiene «Editar» y el envío, «Editar respuestas»
    if (atras) atras.hidden = actual === 1;
    if (seguir) seguir.hidden = actual === total;
    if (navegacion) navegacion.hidden = actual === total;
    actualizarDetalle();
    if (actual === total) pintarResumen();
    if (historial !== 'none') {
      const url = new URL(window.location.href);
      url.searchParams.set('paso', String(actual));
      history[historial === 'push' ? 'pushState' : 'replaceState']({ paso: actual }, '', url);
    }
    const titulo = pasos[actual - 1]?.querySelector<HTMLElement>('.paso__titulo');
    if (enfocar && titulo) {
      // El paso nuevo puede ser más bajo que el anterior y Safari no desplaza al enfocar: si el título quedó fuera
      // de la vista o bajo el encabezado, el asistente sube hasta su inicio (scroll-padding-top de html) (WCAG 2.4.11)
      const margen = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const r = titulo.getBoundingClientRect();
      if (r.top < margen || r.bottom > window.innerHeight) form.scrollIntoView({ block: 'start' });
      titulo.focus({ preventScroll: true });
    }
    track('cotizador_paso', { paso: actual });
    if (actual === total) track('cotizador_completo');
  }
  function avanzar() {
    const problema = primerInvalido(actual, true);
    if (problema) {
      problema.focus();
      return;
    }
    mostrar(actual + 1);
  }

  // ── Arranque ──────────────────────────────────────────────────────────────────────────────────────────────
  restaurar();
  precargar();
  guardar(); // lo precargado sobrevive a una recarga aunque la persona todavía no haya tocado nada
  const pedido = Number(new URL(window.location.href).searchParams.get('paso')) || 1;
  mostrar(Math.min(pedido, pasoAlcanzable()), { enfocar: false, historial: 'replace' });

  form.addEventListener('change', (e) => {
    const el = e.target as HTMLInputElement;
    if (!iniciado) {
      iniciado = true;
      track('cotizador_inicio', { ubicacion: 'cotizador' });
    }
    if (el.type === 'radio') errorDeGrupo(el.closest<HTMLElement>('[data-grupo]'), false);
    if (el.name === 'servicio') actualizarDetalle();
    guardar();
  });
  form.addEventListener('input', (e) => {
    // Un campo marcado deja de mostrar el error apenas su valor queda bien
    const el = e.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true') campoValido(el, false);
    guardar();
  });
  seguir?.addEventListener('click', avanzar);
  atras?.addEventListener('click', () => mostrar(actual - 1));
  form.querySelectorAll<HTMLElement>('[data-ir]').forEach((b) => b.addEventListener('click', () => mostrar(Number(b.dataset.ir))));
  window.addEventListener('popstate', () => {
    const n = Number(new URL(window.location.href).searchParams.get('paso')) || 1;
    mostrar(Math.min(n, pasoAlcanzable()), { historial: 'none' });
  });
  // Enter en un campo, también en una opción o en el permiso, valida el paso y avanza: si no, el envío implícito
  // saltaría al primer paso incompleto con sus errores ya a la vista (el envío es solo desde el resumen)
  form.addEventListener('keydown', (e) => {
    const el = e.target as HTMLElement;
    if (e.key === 'Enter' && actual < total && el instanceof HTMLInputElement) {
      e.preventDefault();
      avanzar();
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (let n = 1; n < total; n++) {
      if (primerInvalido(n, false)) {
        mostrar(n);
        primerInvalido(n, true)?.focus();
        return;
      }
    }
    if ($<HTMLInputElement>('[data-trampa]')?.value) return; // honeypot: se descarta en silencio

    const url = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(mensaje())}`;
    window.open(url, '_blank', 'noopener');
    track('lead_enviado', { formulario: 'cotizador' });

    const r = respuestas();
    const confirmacion = $<HTMLElement>('[data-confirmacion]');
    if (confirmacion) {
      const enlace = confirmacion.querySelector<HTMLAnchorElement>('a');
      if (enlace) enlace.href = url;
      const saludo = confirmacion.querySelector<HTMLElement>('[data-saludo-nombre]');
      if (saludo) saludo.textContent = r.nombre ? `¡Listo, ${r.nombre}!` : '¡Listo!';
      confirmacion.hidden = false;
      confirmacion.scrollIntoView({ block: 'center' });
      confirmacion.focus({ preventScroll: true });
    }
    escribirAlmacen(null);

    const clave = form.dataset.web3forms;
    if (clave && r.correo) {
      const ok = await copiaPorCorreo(clave, 'Pre-cotización desde el sitio', { ...r, mensaje: mensaje() });
      if (!ok) $<HTMLElement>('[data-error-correo]')?.removeAttribute('hidden');
    }
  });
}
