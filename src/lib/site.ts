// Arranque del sitio. Lo crítico es liviano y va primero; el motor de movimiento (GSAP + Lenis)
// se carga después del primer pintado y en reposo para no competir con el LCP (BRIEF.md §4.6).
import { initHeader, initMenu } from './header';
import { initFraseRotante, initHeroVideo } from './hero-video';
import { initScrollspy } from './scrollspy';
import { initFormulariosWhatsApp, initValidacionAccesible } from './forms';
import { initAnalytics, initEventosDeClic } from './analytics';
import { trasElPrimerPintado } from './tiempo';

export function initSite(opciones: { ga4?: string } = {}): void {
  initHeader();
  initMenu();
  initHeroVideo();
  initFraseRotante();
  initScrollspy();
  initValidacionAccesible();
  initFormulariosWhatsApp();
  initEventosDeClic();
  initAnalytics(opciones.ga4 ?? '');

  // Si el motor no carga, el respaldo (definido en Base.astro) deja todo visible.
  const respaldo = (window as Window & { __respaldoMovimiento?: number }).__respaldoMovimiento;
  const arrancarMovimiento = () =>
    import('./motion')
      .then((m) => {
        m.initMotion();
        window.clearTimeout(respaldo);
      })
      .catch(() => document.documentElement.classList.add('motion-fallback'));
  trasElPrimerPintado(arrancarMovimiento);
}
