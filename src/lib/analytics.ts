// Analítica diferida (BRIEF.md §10.4). Sin ID de GA4 no carga nada (pendiente #20).
// Con ID: se carga tras la primera interacción o en idle, nunca compitiendo con el LCP.

type Evento =
  | 'click_whatsapp'
  | 'click_telefono'
  | 'cotizador_inicio'
  | 'cotizador_paso'
  | 'cotizador_completo'
  | 'lead_enviado'
  | 'ver_item';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(evento: Evento, datos: Record<string, string | number> = {}): void {
  window.gtag?.('event', evento, datos);
}

export function initAnalytics(idGa4: string): void {
  if (!idGa4) return;
  let cargado = false;
  const cargar = () => {
    if (cargado) return;
    cargado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', idGa4);
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(idGa4)}`;
    document.head.append(s);
  };
  ['pointerdown', 'keydown', 'scroll'].forEach((tipo) =>
    window.addEventListener(tipo, cargar, { once: true, passive: true }),
  );
  if ('requestIdleCallback' in window) requestIdleCallback(cargar, { timeout: 8000 });
}

/** Eventos de clic declarativos: <a data-evento="click_whatsapp">. */
export function initEventosDeClic(root: ParentNode = document): void {
  root.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-evento]');
    if (el) track(el.dataset.evento as Evento, { ubicacion: el.dataset.ubicacion ?? '' });
  });
}
