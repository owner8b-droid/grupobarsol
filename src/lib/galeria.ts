// Galería de la ficha de máquina: las miniaturas (botones con aria-pressed) cambian la foto principal. Todas las
// fotos están en el HTML y solo una se ve; las ocultas no se descargan hasta mostrarse (loading="lazy").
export function initGalerias(): void {
  document.querySelectorAll<HTMLElement>('[data-galeria]').forEach((galeria) => {
    const fotos = [...galeria.querySelectorAll<HTMLElement>('[data-foto]')];
    const botones = [...galeria.querySelectorAll<HTMLButtonElement>('[data-miniatura]')];
    const texto = galeria.querySelector<HTMLElement>('[data-galeria-texto]');
    botones.forEach((boton, i) =>
      boton.addEventListener('click', () => {
        fotos.forEach((foto, k) => (foto.hidden = k !== i));
        botones.forEach((b, k) => b.setAttribute('aria-pressed', String(k === i)));
        if (texto) texto.textContent = `Foto ${i + 1} de ${fotos.length}`;
      }),
    );
  });
}
