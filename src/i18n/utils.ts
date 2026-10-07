import es from './es.json';
import en from './en.json';
import { rutas, type ClaveRuta, type Idioma } from './routes';

const textos = { es, en } as const;
export type ClaveTexto = keyof typeof es;

/** Texto de interfaz en el idioma pedido (ES por defecto). */
export function t(idioma: Idioma, clave: ClaveTexto): string {
  return textos[idioma][clave] ?? textos.es[clave];
}

/** Antepone el `base` del sitio (GitHub Pages) a una ruta absoluta del sitio. */
export function conBase(ruta: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (/^(https?:|mailto:|tel:|#)/.test(ruta)) return ruta;
  return `${base}${ruta.startsWith('/') ? ruta : `/${ruta}`}`;
}

/** URL de una página del mapa de rutas, ya con `base`. */
export function ruta(clave: ClaveRuta, idioma: Idioma = 'es'): string {
  return conBase(rutas[clave][idioma]);
}

/** Enlace de WhatsApp con un mensaje pre-llenado (encodeURIComponent, BRIEF.md §M04). */
export function enlaceWhatsApp(numero: string, mensaje?: string): string {
  return mensaje ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}` : `https://wa.me/${numero}`;
}

// Pre-cotizar desde otra página va al cotizador de 5 pasos (lib/cotizador.ts), con el servicio y la máquina
// precargados (?servicio=, ?maquina=; listas cerradas). En false, todo iría al formulario corto de contacto.
const COTIZADOR_LISTO = true;

/** Destino de «Pre-cotizá tu obra» desde otra página: el cotizador cuando exista; mientras, el formulario corto. */
export function rutaCotizar(servicio?: string, extra: Record<string, string> = {}, idioma: Idioma = 'es'): string {
  const parametros = new URLSearchParams({ ...(servicio ? { servicio } : {}), ...extra }).toString();
  const consulta = parametros ? `?${parametros}` : '';
  return COTIZADOR_LISTO ? `${ruta('cotizador', idioma)}${consulta}` : `${ruta('contacto', idioma)}${consulta}#cotizar`;
}

/** Ficha de una unidad de la flota: /flota/<slug>/ (docs/02-estrategia.md §3). */
export function rutaDeUnidad(slug: string, idioma: Idioma = 'es'): string {
  return `${ruta('flota', idioma)}${slug}/`;
}

/** En las páginas que ya tienen el formulario (inicio y contacto), «Pre-cotizá» baja a él sin salir. */
export function destinoCotizar(paginaActual: string, idioma: Idioma = 'es'): string {
  return [ruta('inicio', idioma), ruta('contacto', idioma)].includes(paginaActual) ? '#cotizar' : rutaCotizar(undefined, {}, idioma);
}

