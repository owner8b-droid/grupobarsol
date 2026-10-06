// Encabezado: transparente sobre el hero y sólido al pasarlo; se oculta al bajar y vuelve al subir.
// Menú móvil en <dialog> modal con light-dismiss (closedby="any" + respaldo para Safari).

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const hero = document.querySelector('[data-hero]');
  if (hero) {
    new IntersectionObserver(([entrada]) => header.classList.toggle('is-solid', !entrada.isIntersecting), {
      rootMargin: '-80px 0px 0px 0px',
    }).observe(hero);
  } else {
    header.classList.add('is-solid');
  }

  let ultimoY = window.scrollY;
  let pendiente = false;
  window.addEventListener(
    'scroll',
    () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const bajando = y > ultimoY && y > 240;
        if (!document.querySelector('dialog[open]')) header.classList.toggle('is-hidden', bajando);
        ultimoY = y;
        pendiente = false;
      });
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
}

export function initMenu(): void {
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  if (!menu) return;
  let abridor: HTMLElement | null = null;
  document.querySelectorAll<HTMLElement>('[data-menu-abrir]').forEach((b) =>
    b.addEventListener('click', () => {
      abridor = b;
      menu.showModal();
    }),
  );
  menu.querySelectorAll('[data-menu-cerrar], a').forEach((b) => b.addEventListener('click', () => menu.close()));

  // Safari no enfoca un botón al tocarlo: al cerrar, el diálogo dejaría el foco en <body>.
  menu.addEventListener('close', () => {
    const activo = document.activeElement;
    if (abridor && (!activo || activo === document.body || menu.contains(activo))) abridor.focus();
  });

  // Respaldo de light-dismiss donde no existe `closedby` (modern-web-guidance: light-dismiss-a-dialog)
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    menu.addEventListener('click', (evento) => {
      if (evento.target !== menu) return;
      const r = menu.getBoundingClientRect();
      const dentro = r.top <= evento.clientY && evento.clientY <= r.bottom && r.left <= evento.clientX && evento.clientX <= r.right;
      if (!dentro) menu.close();
    });
  }
}
