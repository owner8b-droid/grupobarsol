// Mapa de rutas ES ↔ EN con slugs traducidos (docs/02-estrategia.md §3).
// Las páginas EN se generan cuando exista su texto (ADR-001); el mapa ya está listo.

export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

export const rutas = {
  inicio: { es: '/', en: '/en/' },
  servicios: { es: '/servicios/', en: '/en/services/' },
  movimientoDeTierras: { es: '/servicios/movimiento-de-tierras/', en: '/en/services/earthworks/' },
  alquilerDeMaquinaria: { es: '/servicios/alquiler-de-maquinaria/', en: '/en/services/equipment-rental/' },
  acarreoYAgregados: { es: '/servicios/acarreo-y-agregados/', en: '/en/services/hauling-and-aggregates/' },
  obraCivil: { es: '/servicios/obra-civil/', en: '/en/services/civil-works/' },
  flota: { es: '/flota/', en: '/en/fleet/' },
  proyectos: { es: '/proyectos/', en: '/en/projects/' },
  nosotros: { es: '/nosotros/', en: '/en/about/' },
  cotizador: { es: '/cotizador/', en: '/en/quote/' },
  contacto: { es: '/contacto/', en: '/en/contact/' },
  privacidad: { es: '/privacidad/', en: '/en/privacy/' },
  terminos: { es: '/terminos-del-cotizador/', en: '/en/quote-terms/' },
} as const satisfies Record<string, Record<Idioma, string>>;

export type ClaveRuta = keyof typeof rutas;

// Slugs de servicio (colección `servicios`) → clave del mapa.
export const rutaDeServicio: Record<string, ClaveRuta> = {
  'movimiento-de-tierras': 'movimientoDeTierras',
  'alquiler-de-maquinaria': 'alquilerDeMaquinaria',
  'acarreo-y-agregados': 'acarreoYAgregados',
  'obra-civil': 'obraCivil',
};
