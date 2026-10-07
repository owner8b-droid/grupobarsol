// Filtro de la flota por tipo (artboard Flota-escritorio): radios nativos (flechas del teclado), conteo anunciado
// (aria-live) y el tipo en la URL (?tipo=, el que usan los enlaces del home y del alquiler). La precarga solo acepta
// los valores de los propios radios (lista cerrada). Sin JS el filtro no se muestra y se ven todas las unidades.
export function initFiltroFlota(): void {
  const filtro = document.querySelector<HTMLFieldSetElement>('[data-filtro-flota]');
  if (!filtro) return;
  const radios = [...filtro.querySelectorAll<HTMLInputElement>('input[name="tipo"]')];
  const items = [...document.querySelectorAll<HTMLElement>('[data-unidad-tipo]')];
  const conteo = document.querySelector<HTMLElement>('[data-conteo]');
  if (!radios.length) return;

  function aplicar(radio: HTMLInputElement) {
    const tipo = radio.value;
    let visibles = 0;
    items.forEach((item) => {
      const ve = !tipo || item.dataset.unidadTipo === tipo;
      item.hidden = !ve;
      if (ve) visibles++;
    });
    if (conteo) conteo.textContent = `${visibles} ${visibles === 1 ? radio.dataset.singular : radio.dataset.plural}`;
    const url = new URL(window.location.href);
    if (tipo) url.searchParams.set('tipo', tipo);
    else url.searchParams.delete('tipo');
    history.replaceState(history.state, '', url);
  }

  const pedido = new URL(window.location.href).searchParams.get('tipo') ?? '';
  const inicial = radios.find((r) => r.value === pedido) ?? radios[0];
  inicial.checked = true;
  aplicar(inicial);
  filtro.addEventListener('change', (e) => {
    const radio = e.target as HTMLInputElement;
    if (radio.name === 'tipo') aplicar(radio);
  });
}
