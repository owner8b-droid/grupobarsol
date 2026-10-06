// Motor de movimiento único (BRIEF.md §4.6 · docs/03-direccion-de-arte.md §7).
// Atributos: data-entrada (sección con entrada coreografiada) · data-reveal="up" · data-split · data-barra ·
// data-diagonal con data-cortina y data-panel (la pasada del brazo) · data-snap.
// La frase rotante (data-rota) vive en hero-video.ts para no depender de GSAP en el hero.
// Los estados iniciales (motion.css) solo aplican con .motion-ready, que se pone al final: si algo falla antes,
// todo queda visible. Lo que ya está a la vista al arrancar se marca .is-in sin animación.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

const ANIMADOS = '[data-reveal], [data-barra], [data-split], [data-cortina]';

// Ángulo del corte del brazo en grados, desde el token --slope (la cortina lo lleva también en CSS)
const pendiente = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--slope')) || 0.46;
const sesgo = () => (-Math.atan(pendiente()) * 180) / Math.PI;

function marcarListo(els: Element[]) {
  els.forEach((el) => el.classList.add('is-in'));
}

// La cortina está en display: none hasta que el motor arranca (no tiene caja): se mide el bloque que la contiene
const visibleAlArrancar = (el: Element) => {
  const caja = el.getClientRects().length ? el : (el.parentElement ?? el);
  return caja.getBoundingClientRect().top < window.innerHeight;
};

// Títulos de una palabra: líneas en <span> (válido dentro de <h2>) con máscara que solo recorta en vertical
// (motion.css). Las líneas no parten palabras: el lector las lee igual, sin aria extra.
function lineasDe(titulos: HTMLElement[]) {
  return titulos.flatMap(
    (t) => SplitText.create(t, { type: 'lines', mask: 'lines', linesClass: 'linea', tag: 'span', aria: 'none' }).lines,
  );
}

/** Entrada de un grupo (§7): 1) la franja se traza desde el borde; 2) el título sube con máscara y se apoya en
 *  ella; 3) la pasada del brazo: la cortina barre con el ángulo del brazo y destapa los paneles, cuyas fotos se
 *  asientan; 4) eyebrow, bajada y listas suben. Pasos ausentes en el grupo se saltan. */
function entrada(grupo: Element, scrollTrigger: ScrollTrigger.Vars, incluir = { texto: true, paneles: true }) {
  const pendientes = (sel: string) => [...grupo.querySelectorAll<HTMLElement>(`${sel}:not(.is-in)`)];
  const barras = incluir.texto ? pendientes('[data-barra]') : [];
  const titulos = incluir.texto ? pendientes('[data-split]') : [];
  const reveals = incluir.texto ? pendientes('[data-reveal]') : [];
  const cortinas = incluir.paneles ? pendientes('[data-cortina]') : [];
  const todos = [...barras, ...titulos, ...reveals, ...cortinas];
  if (!todos.length) return;

  const lineas = lineasDe(titulos);
  const tl = gsap.timeline({
    scrollTrigger: { ...scrollTrigger, once: true },
    defaults: { ease: 'expo.out' },
    onComplete: () => {
      marcarListo(todos);
      gsap.set([...barras, ...reveals, ...cortinas], { clearProps: 'transform,opacity' });
    },
  });

  if (barras.length) tl.fromTo(barras, { scaleX: 0 }, { scaleX: 1, duration: 0.64 }, 0);
  if (lineas.length) tl.from(lineas, { yPercent: 150, duration: 1.1, stagger: 0.08 }, barras.length ? 0.32 : 0);
  const angulo = sesgo();
  cortinas.forEach((cortina, i) => {
    const fotos = cortina.parentElement?.querySelectorAll('[data-panel] img') ?? [];
    const inicio = (incluir.texto ? 0.45 : 0) + i * 0.08;
    // --ease-in-out de la casa (cubic-bezier(0.65, 0, 0.35, 1)) = power2.inOut
    tl.fromTo(cortina, { xPercent: 0, skewX: angulo }, { xPercent: 101, skewX: angulo, duration: 0.9, ease: 'power2.inOut' }, inicio);
    if (fotos.length) tl.from(fotos, { scale: 1.06, xPercent: -2, duration: 1.3 }, inicio + 0.1);
  });
  if (reveals.length) {
    tl.fromTo(reveals, { opacity: 0, y: '2.5rem' }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, barras.length ? 0.5 : 0);
  }
}

export function initMotion(root: ParentNode = document): void {
  const html = document.documentElement;
  const mm = gsap.matchMedia();

  mm.add({ animar: '(prefers-reduced-motion: no-preference)', escritorio: '(min-width: 64rem)' }, (contexto) => {
    const { animar, escritorio } = contexto.conditions as { animar: boolean; escritorio: boolean };
    if (!animar) {
      // Con reduced-motion: todo visible y en su lugar
      marcarListo([...root.querySelectorAll(ANIMADOS)]);
      html.classList.add('motion-ready');
      return;
    }

    const lenis = new Lenis({ autoRaf: false, anchors: { offset: 0 } });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Snap por proximidad solo en escritorio con puntero fino; nunca obligatorio (ADR-009).
    let snap: Snap | undefined;
    const pantallas = [...root.querySelectorAll<HTMLElement>('[data-snap]')];
    if (escritorio && pantallas.length && matchMedia('(pointer: fine)').matches) {
      snap = new Snap(lenis, { type: 'proximity', distanceThreshold: '18%', debounce: 450, duration: 0.9 });
      snap.addElements(pantallas, { align: ['start'] });
    }

    // Lo que ya está a la vista no se oculta ni se anima: secciones coreografiadas enteras, el resto suelto
    root.querySelectorAll('[data-entrada]').forEach((s) => {
      if (visibleAlArrancar(s)) marcarListo([...s.querySelectorAll(ANIMADOS)]);
    });
    marcarListo([...root.querySelectorAll(ANIMADOS)].filter(visibleAlArrancar));

    // Secciones coreografiadas. Escritorio: una sola entrada por sección. Móvil: el bloque visual va debajo del
    // texto, así que el texto y la pasada del brazo entran cada uno al llegar.
    root.querySelectorAll('[data-entrada]').forEach((seccion) => {
      if (escritorio) {
        entrada(seccion, { trigger: seccion, start: 'top 65%' });
        return;
      }
      const texto = seccion.querySelector('[data-split]') ?? seccion;
      entrada(seccion, { trigger: texto, start: 'top 85%' }, { texto: true, paneles: false });
      seccion.querySelectorAll('[data-diagonal]').forEach((visual) => {
        entrada(visual, { trigger: visual, start: 'top 80%' }, { texto: false, paneles: true });
      });
    });

    // Fuera de una sección coreografiada (páginas internas): cada elemento entra solo
    const sueltos = (sel: string) =>
      [...root.querySelectorAll<HTMLElement>(`${sel}:not(.is-in)`)].filter((el) => !el.closest('[data-entrada]'));
    ScrollTrigger.batch(sueltos('[data-reveal]'), {
      start: 'top 85%',
      once: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, y: '2.5rem' },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            onComplete: () => {
              marcarListo(els);
              gsap.set(els, { clearProps: 'opacity,transform' });
            },
          },
        ),
    });
    sueltos('[data-barra]').forEach((el) => {
      // La franja y su título (TitleWord) entran juntos; el resto del bloque lo maneja el batch de arriba
      const titulo = el.parentElement ?? el;
      entrada(titulo, { trigger: el, start: 'top 88%' }, { texto: true, paneles: false });
    });
    sueltos('[data-diagonal]').forEach((el) => entrada(el, { trigger: el, start: 'top 80%' }, { texto: false, paneles: true }));

    html.classList.add('motion-ready');
    return () => {
      snap?.destroy();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  });
}
