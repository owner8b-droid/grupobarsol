import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Modelo de contenido (BRIEF.md §4.4, adaptado en docs/02-estrategia.md §7).
// El idioma sale de la carpeta: src/content/<colección>/<es|en>/<id>.md

const lang = z.enum(['es', 'en']);
const spec = z.object({ label: z.string(), valor: z.string() });

const servicios = defineCollection({
  loader: glob({ base: './src/content/servicios', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      lang,
      orden: z.number(),
      titulo: z.string(),
      h1: z.string(),
      // Título de una palabra de la cabecera (el mismo del home: Tierra, Maquinaria, Obra…)
      palabra: z.string(),
      resumen: z.string().max(160),
      bajada: z.string(),
      paraEmpresas: z.array(z.string()).default([]),
      paraParticulares: z.array(z.string()).default([]),
      incluye: z.array(z.string()).default([]),
      noIncluye: z.array(z.string()).default([]),
      foto: image(),
      fotoAlt: z.string(),
      fotoPosicion: z.string().optional(),
      // Paneles de la cabecera (docs/03-direccion-de-arte.md §5): capa de acento (decorativa) y foto secundaria
      fotoCapa: image(),
      fotoSecundaria: image().optional(),
      fotoSecundariaAlt: z.string().optional(),
      cotizadorServicio: z.enum(['tierra', 'alquiler', 'acarreo', 'obra']),
      seoTitle: z.string().max(60),
      seoDescription: z.string().max(155),
      traduccionDe: z.string().optional(),
    }),
});

const flota = defineCollection({
  loader: glob({ base: './src/content/flota', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      lang,
      nombre: z.string(),
      tipo: z.enum(['excavadora', 'compactadora', 'niveladora', 'vagoneta', 'otro']),
      marca: z.string().optional(),
      modelo: z.string().optional(),
      specs: z.array(spec).default([]),
      fotos: z.array(image()).default([]),
      fotoAlt: z.string().optional(),
      // Texto alternativo de cada foto de la galería, en el mismo orden (la primera puede usar fotoAlt)
      fotosAlt: z.array(z.string()).default([]),
      modalidades: z.array(z.enum(['hora', 'dia', 'proyecto', 'viaje'])).default([]),
      operador: z.enum(['si', 'no', 'a-convenir']).optional(),
      estado: z.enum(['disponible', 'consultar', 'mantenimiento']).default('consultar'),
      destacado: z.boolean().default(false),
      // Unidad de muestra hasta tener el inventario real (pendiente #1). No puede llegar a producción.
      muestra: z.boolean().default(false),
      traduccionDe: z.string().optional(),
    }),
});

const proyectos = defineCollection({
  loader: glob({ base: './src/content/proyectos', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      lang,
      titulo: z.string(),
      cliente: z.string().optional(),
      // El nombre del cliente solo se publica con su permiso (pendiente #2)
      permisoCliente: z.boolean().default(false),
      ubicacion: z.string().optional(),
      fecha: z.coerce.date().optional(),
      servicios: z.array(z.enum(['tierra', 'alquiler', 'acarreo', 'obra'])).min(1),
      alcance: z.string().optional(),
      foto: image(),
      fotoAlt: z.string(),
      fotoPosicion: z.string().default('50% 50%'),
      fotosAntes: z.array(image()).default([]),
      fotosDespues: z.array(image()).default([]),
      destacado: z.boolean().default(false),
      orden: z.number().default(99),
      // Proyecto de muestra hasta tener la lista real (pendiente #2). No puede llegar a producción.
      muestra: z.boolean().default(false),
      traduccionDe: z.string().optional(),
    }),
});

export const collections = { servicios, flota, proyectos };
