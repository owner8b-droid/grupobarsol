// Arranque del sitio. Lo crítico es liviano y va primero; el motor de movimiento (GSAP + Lenis)
// se carga después del primer pintado y en reposo para no competir con el LCP (BRIEF.md §4.6, ADR-014).
import { initHeader, initMenu } from './header';
import { initFraseRotante, initHeroVideo } from './hero-video';
import { initScrollspy } from './scrollspy';
import { initFormulariosWhatsApp, initValidacionAccesible } from './forms';
import { initAnalytics, initEventosDeClic } from './analytics';
import { trasElPrimerPintado } from './tiempo';

// La pestaña «Pre-cotizá» se va mientras el formulario está a la vista: no compite con él
function initPestana(): void {
  const pestana = document.querySelector<HTMLElement>('[data-pestana]');
  const formulario = document.getElementById('cotizar');
  if (!pestana || !formulario) return;
  new IntersectionObserver(([e]) => pestana.classList.toggle('is-oculta', e.isIntersecting), { threshold: 0.15 }).observe(formulario);
}

export function initSite(opciones: { ga4?: string } = {}): void {
  initHeader();
  initMenu();
  initHeroVideo();
  initFraseRotante();
  initScrollspy();
  initPestana();
  // El cotizador es la función de su página: se carga apenas hace falta, no después del primer pintado
  if (document.querySelector('[data-cotizador]')) void import('./cotizador').then((m) => m.initCotizador());
  initValidacionAccesible();
  initFormulariosWhatsApp();
  initEventosDeClic();
  initAnalytics(opciones.ga4 ?? '');

  // Si el motor no carga, nada queda oculto: los estados iniciales solo existen con .motion-ready (motion.css).
  // motion-fallback queda como marca para diagnóstico y tests.
  const arrancarMovimiento = () =>
    import('./motion')
      .then((m) => m.initMotion())
      .catch(() => document.documentElement.classList.add('motion-fallback'));
  trasElPrimerPintado(arrancarMovimiento);
}
