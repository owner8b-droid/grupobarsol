// Puntos de progreso del home (modern-web-guidance: scrollspy).
// Nativo: scroll-target-group + :target-current pinta el punto; aquí solo se sincroniza aria-current.
// Respaldo: IntersectionObserver marca .is-current y aria-current.

export function initScrollspy(): void {
  const nav = document.querySelector<HTMLElement>('[data-scrollspy]');
  if (!nav) return;
  const enlaces = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];

  if (CSS.supports('scroll-target-group: auto')) {
    const sync = () => {
      const activo = nav.querySelector<HTMLAnchorElement>('a:target-current');
      enlaces.forEach((a) => a.setAttribute('aria-current', a === activo ? 'true' : 'false'));
    };
    sync();
    // Lenis desplaza con scrollTo en cada cuadro: además de scrollend, se sincroniza al quedar quieto.
    let espera = 0;
    const alQuedarQuieto = () => {
      window.clearTimeout(espera);
      espera = window.setTimeout(sync, 160);
    };
    document.addEventListener('scrollend', sync);
    window.addEventListener('scroll', alQuedarQuieto, { passive: true });
    return;
  }

  const marcar = (activo: HTMLAnchorElement | null) =>
    enlaces.forEach((a) => {
      a.classList.toggle('is-current', a === activo);
      a.setAttribute('aria-current', a === activo ? 'true' : 'false');
    });
  const secciones = enlaces
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter((s): s is HTMLElement => s !== null);
  const observador = new IntersectionObserver(
    (entradas) =>
      entradas.forEach((e) => {
        if (e.isIntersecting) marcar(enlaces.find((a) => a.hash === `#${e.target.id}`) ?? null);
      }),
    { rootMargin: '-50% 0px -50% 0px' },
  );
  secciones.forEach((s) => observador.observe(s));
}
