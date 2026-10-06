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
