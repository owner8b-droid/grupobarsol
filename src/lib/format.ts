// Formato de dinero único del sitio (BRIEF.md §4.5). El cotizador no muestra precios (ADR-002),
// pero el helper queda listo para cuando el cliente apruebe tarifas.

export type Moneda = 'CRC' | 'USD';

interface OpcionesDinero {
  idioma?: 'es' | 'en';
  /** Separador de miles en español. `Intl` usa espacio en es-CR (₡18 741 060); algunos clientes prefieren punto. */
  separadorMiles?: ' ' | '.';
}

export function formatMoney(monto: number, moneda: Moneda, opciones: OpcionesDinero = {}): string {
  const { idioma = 'es', separadorMiles = ' ' } = opciones;
  const locale = idioma === 'es' ? 'es-CR' : 'en-US';
  const partes = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: moneda,
    maximumFractionDigits: 0,
  }).formatToParts(monto);
  return partes
    .map((p) => (p.type === 'group' && idioma === 'es' ? separadorMiles : p.value))
    .join('')
    .replace(/ | /g, ' ');
}
