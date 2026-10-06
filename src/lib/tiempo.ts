// Trabajo no crítico (motor de movimiento, video) después del primer pintado y en reposo.
// requestIdleCallback y requestAnimationFrame pueden correr antes de que el primer frame se presente:
// se espera la entrada real de first-contentful-paint para que FCP/LCP no compitan con GSAP ni el video.
// Respaldo: si el navegador no expone paint timing, se arranca igual tras `respaldo` ms.
export function trasElPrimerPintado(tarea: () => void, limite = 1200, respaldo = 1500): void {
  let hecho = false;
  const enReposo = () => {
    if (hecho) return;
    hecho = true;
    if ('requestIdleCallback' in window) requestIdleCallback(() => tarea(), { timeout: limite });
    else setTimeout(tarea, 200);
  };

  if (performance.getEntriesByName('first-contentful-paint').length) return enReposo();
  if (!PerformanceObserver.supportedEntryTypes?.includes('paint')) return void setTimeout(enReposo, respaldo);

  const observador = new PerformanceObserver((lista) => {
    if (lista.getEntriesByName('first-contentful-paint').length) {
      observador.disconnect();
      enReposo();
    }
  });
  observador.observe({ type: 'paint', buffered: true });
  setTimeout(enReposo, respaldo);
}
