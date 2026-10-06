// Motor de movimiento único (BRIEF.md §4.6 · docs/03-direccion-de-arte.md §7).
// Atributos: data-reveal="up" · data-split · data-barra · data-diagonal (+ data-panel) · data-snap.
// La frase rotante (data-rota) vive en hero-video.ts para no depender de GSAP en el hero.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

const SLOPE = 0.46; // pendiente del corte diagonal (el brazo de la excavadora)

function marcarListo(els: Element[]) {
  els.forEach((el) => el.classList.add('is-in'));
}

export function initMotion(root: ParentNode = document): void {
  document.documentElement.classList.add('motion-ready');
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const lenis = new Lenis({ autoRaf: false });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Snap por proximidad solo en escritorio con puntero fino; nunca obligatorio (ADR-009).
    let snap: Snap | undefined;
    const pantallas = [...root.querySelectorAll<HTMLElement>('[data-snap]')];
    if (pantallas.length && matchMedia('(min-width: 64rem) and (pointer: fine)').matches) {
      snap = new Snap(lenis, { type: 'proximity', distanceThreshold: '18%', debounce: 450, duration: 0.9 });
      snap.addElements(pantallas, { align: ['start'] });
    }

    // Reveals declarativos
    ScrollTrigger.batch(root.querySelectorAll('[data-reveal]'), {
      start: 'top 85%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          onComplete: () => {
            marcarListo(els);
            gsap.set(els, { clearProps: 'opacity,visibility,transform' });
          },
        }),
    });

    // Títulos por líneas con máscara (paso 2 de la entrada de sección, después de la franja)
    root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'linea',
        // Las líneas no parten palabras: el lector las lee igual (aria-label en un span está prohibido)
        aria: 'none',
        autoSplit: true,
        onSplit: (self) => {
          if (el.classList.contains('is-in')) return; // al volver a partir (resize) no se repite
          gsap.set(el, { autoAlpha: 1 });
          // 150 %: con el aire de la máscara (motion.css) la línea queda oculta del todo, tildes incluidas
          return gsap.from(self.lines, {
            yPercent: 150,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onComplete: () => {
              marcarListo([el]);
              gsap.set(el, { clearProps: 'opacity,visibility' });
            },
          });
        },
      });
    });

    // Franja del título: se traza desde la izquierda (la línea ocre del logo)
    root.querySelectorAll<HTMLElement>('[data-barra]').forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.64,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onComplete: () => {
            marcarListo([el]);
            gsap.set(el, { clearProps: 'transform' });
          },
        },
      );
    });

    // Momento firma «La pasada del brazo»: los paneles barren siguiendo el ángulo del brazo
    root.querySelectorAll<HTMLElement>('[data-diagonal]').forEach((grupo) => {
      const paneles = [...grupo.querySelectorAll<HTMLElement>('[data-panel]')];
      gsap.fromTo(
        paneles,
        { autoAlpha: 0, yPercent: 12, xPercent: -12 * SLOPE },
        {
          autoAlpha: 1,
          yPercent: 0,
          xPercent: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: grupo, start: 'top 75%', once: true },
          onComplete: () => {
            marcarListo(paneles);
            gsap.set(paneles, { clearProps: 'opacity,visibility,transform' });
          },
        },
      );
    });

    return () => {
      snap?.destroy();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  });

  // Con reduced-motion: todo visible y en su lugar
  mm.add('(prefers-reduced-motion: reduce)', () => {
    marcarListo([...root.querySelectorAll('[data-reveal], [data-barra], [data-panel], [data-split]')]);
  });
}
