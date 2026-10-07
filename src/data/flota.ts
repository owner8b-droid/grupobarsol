// Textos fijos de la flota: nombres de cada tipo, usos («Para qué sirve» de la ficha) y etiquetas de los datos.
// Los usos de la excavadora vienen del artboard aprobado (Ficha-escritorio); los demás son usos generales del tipo
// de máquina y quedan para validar con el cliente (docs/privado/pendientes.md).
import type { CollectionEntry } from 'astro:content';

type Unidad = CollectionEntry<'flota'>['data'];
export type Tipo = Unidad['tipo'];

// En este orden se listan (el del home: excavadoras primero)
export const TIPOS: Record<Tipo, { singular: string; plural: string }> = {
  excavadora: { singular: 'Excavadora', plural: 'Excavadoras' },
  compactadora: { singular: 'Compactadora', plural: 'Compactadoras' },
  niveladora: { singular: 'Niveladora', plural: 'Niveladoras' },
  vagoneta: { singular: 'Vagoneta', plural: 'Vagonetas' },
  otro: { singular: 'Máquina', plural: 'Otras máquinas' },
};
export const ORDEN_TIPOS = Object.keys(TIPOS) as Tipo[];

export const USOS: Partial<Record<Tipo, string[]>> = {
  excavadora: ['Zanjas para tuberías y cimientos', 'Carga de vagonetas', 'Cortes y conformación de taludes', 'Excavación y nivelación de lotes'],
  compactadora: ['Compactación de rellenos y terrazas', 'Bases de calles y accesos', 'Lastre en parqueos y caminos'],
  niveladora: ['Nivelación de terrazas y lotes', 'Conformación de calles y caminos de lastre', 'Perfilado de cunetas'],
  vagoneta: ['Acarreo de tierra, lastre y piedra', 'Retiro de escombro', 'Entrega de agregados en la obra'],
};

const MODALIDAD: Record<Unidad['modalidades'][number], string> = { hora: 'hora', dia: 'día', proyecto: 'proyecto', viaje: 'viaje' };
export const OPERADOR: Record<NonNullable<Unidad['operador']>, string> = { si: 'Incluido', no: 'Sin operador', 'a-convenir': 'A convenir' };
export const ESTADO: Record<Unidad['estado'], string> = {
  disponible: 'Disponible',
  consultar: 'Consultá disponibilidad',
  mantenimiento: 'En mantenimiento',
};

export const nombreUnidad = (d: Unidad) => [d.nombre, d.marca, d.modelo].filter(Boolean).join(' ');
export const slugUnidad = (u: CollectionEntry<'flota'>) => u.id.split('/').pop()!;

/** «Por hora, día o proyecto» */
export function textoAlquiler(d: Unidad): string {
  const m = d.modalidades.map((x) => MODALIDAD[x]);
  if (!m.length) return '';
  return `Por ${m.length > 1 ? `${m.slice(0, -1).join(', ')} o ${m.at(-1)}` : m[0]}`;
}

/** Orden del listado: por tipo (el del home) y, dentro del tipo, primero las destacadas */
export const ordenUnidades = (a: CollectionEntry<'flota'>, b: CollectionEntry<'flota'>) =>
  ORDEN_TIPOS.indexOf(a.data.tipo) - ORDEN_TIPOS.indexOf(b.data.tipo) || Number(b.data.destacado) - Number(a.data.destacado);
