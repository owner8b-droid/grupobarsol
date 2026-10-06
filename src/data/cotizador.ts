// Contenido del pre-cotizador de 5 pasos (docs/02-estrategia.md §10 · artboard Cotizador-*.dc.html, ADR-002).
// Las claves de servicio y de máquina son también la lista cerrada de lo que se puede precargar desde la URL.

export type ClaveServicio = 'tierra' | 'alquiler' | 'acarreo' | 'obra' | 'nose';

export const SERVICIOS: { clave: ClaveServicio; titulo: string; descripcion: string }[] = [
  { clave: 'tierra', titulo: 'Movimiento de tierras', descripcion: 'Excavar, cortar, rellenar o nivelar un terreno.' },
  { clave: 'alquiler', titulo: 'Alquiler de maquinaria', descripcion: 'Una máquina por hora, día o proyecto.' },
  { clave: 'acarreo', titulo: 'Acarreo o agregados', descripcion: 'Mover tierra, lastre, piedra o escombro, o comprar agregados.' },
  { clave: 'obra', titulo: 'Obra civil', descripcion: 'Calles, urbanizaciones o cimientos.' },
  { clave: 'nose', titulo: 'No estoy seguro', descripcion: 'Contanos el proyecto y te orientamos.' },
];

export const DETALLES: Record<Exclude<ClaveServicio, 'nose'>, { pregunta: string; opciones: string[]; extra: string; ejemplo: string }> = {
  tierra: {
    pregunta: '¿Qué trabajo es?',
    opciones: ['Excavación', 'Corte y relleno', 'Conformación de terraza', 'Compactación', 'Otro'],
    extra: 'Tamaño aproximado del terreno',
    ejemplo: 'Ej.: 800 m², o «no sé»',
  },
  alquiler: {
    pregunta: '¿Qué máquina necesitás?',
    opciones: ['Excavadora', 'Compactadora', 'Niveladora', 'Vagoneta', 'Otra'],
    extra: '¿Por cuánto tiempo?',
    ejemplo: 'Ej.: 3 días',
  },
  acarreo: {
    pregunta: '¿Qué material?',
    opciones: ['Tierra', 'Lastre', 'Piedra', 'Arena', 'Escombro'],
    extra: '¿Cuánto, más o menos?',
    ejemplo: 'Ej.: 4 viajes o 20 m³',
  },
  obra: {
    pregunta: '¿Qué tipo de obra?',
    opciones: ['Calle o acceso', 'Urbanización', 'Cimentación', 'Otra'],
    extra: '¿En qué etapa está?',
    ejemplo: 'Ej.: con planos listos',
  },
};

// Máquinas de la flota que se pueden precargar (?maquina=) como detalle del alquiler
export const MAQUINAS: Record<string, string> = {
  excavadora: 'Excavadora',
  compactadora: 'Compactadora',
  niveladora: 'Niveladora',
  vagoneta: 'Vagoneta',
};

export const CUANDO = ['Lo antes posible', 'Este mes', 'En 1 a 3 meses', 'Todavía sin fecha'];

export const TITULOS = ['¿Qué necesitás?', 'Detalles', '¿Dónde y cuándo?', 'Contacto', 'Resumen'];

export const MENSAJES = {
  elegir: 'Elegí una opción para seguir.',
  proyecto: 'Contanos un poco más del proyecto.',
  lugar: 'Contanos dónde es la obra.',
  cuando: 'Elegí para cuándo lo necesitás.',
  nombre: 'Escribí tu nombre.',
  telefono: 'Escribí un teléfono de 8 dígitos, por ejemplo 8888 8888.',
  correo: 'Revisá el correo; por ejemplo: nombre@correo.com.',
  permiso: 'Necesitamos tu permiso para usar estos datos.',
};
