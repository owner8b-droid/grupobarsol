// Hero: video de fondo progresivo y frase rotante.
// El póster (<img fetchpriority="high">) pinta primero (el LCP medido es el display del hero); el video
// llega después del load y del primer pintado, solo sin reduced-motion ni Save-Data,
// tiene botón de pausa (WCAG 2.2.2) y se pausa solo cuando sale de pantalla.
import { trasElPrimerPintado } from './tiempo';

interface ConexionConAhorro {
  saveData?: boolean;
}

export function initHeroVideo(): void {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  const boton = document.querySelector<HTMLButtonElement>('[data-video-toggle]');
  if (!video || !boton) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ahorro = (navigator as Navigator & { connection?: ConexionConAhorro }).connection?.saveData === true;
  if (reduce || ahorro) {
    boton.hidden = true;
    return;
  }

  let pausadoPorUsuario = false;
  const actualizar = () => {
    const enPausa = video.paused;
    boton.setAttribute('aria-label', enPausa ? boton.dataset.reproducir! : boton.dataset.pausar!);
    boton.dataset.estado = enPausa ? 'pausa' : 'reproduciendo';
  };

  // El video (~1,4 MB) espera a que la página cargue: no compite con el póster, las fotos ni el motor
  const arrancar = () => {
    video.src = video.dataset.src!;
    video.muted = true;
    video.play().catch(() => actualizar());
    boton.hidden = false;
  };
  const enReposo = () => trasElPrimerPintado(arrancar, 2000);
  if (document.readyState === 'complete') enReposo();
  else window.addEventListener('load', enReposo, { once: true });

  video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
  video.addEventListener('play', actualizar);
  video.addEventListener('pause', actualizar);

  boton.addEventListener('click', () => {
    if (video.paused) {
      pausadoPorUsuario = false;
      void video.play();
    } else {
      pausadoPorUsuario = true;
      video.pause();
    }
  });

  new IntersectionObserver(([entrada]) => {
    if (!video.currentSrc && !video.getAttribute('src')) return; // todavía no arrancó
    if (!entrada.isIntersecting) video.pause();
    else if (!pausadoPorUsuario) void video.play().catch(() => undefined);
  }).observe(video);
}

export function initFraseRotante(): void {
  const el = document.querySelector<HTMLElement>('[data-rota]');
  if (!el) return;
  const frases: string[] = JSON.parse(el.dataset.rota ?? '[]');
  if (frases.length < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = el.dataset.completa ?? el.textContent;
    return;
  }
  let i = 0;
  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(el);
  window.setInterval(() => {
    if (!visible || document.hidden) return;
    i = (i + 1) % frases.length;
    el.classList.add('is-saliendo');
    window.setTimeout(() => {
      el.textContent = frases[i];
      el.classList.remove('is-saliendo');
    }, 320);
  }, 2800);
}
