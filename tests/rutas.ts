// Rutas públicas en ES, relativas a baseURL (sin barra inicial: baseURL ya incluye /grupobarsol/).
export const RUTAS = [
  '',
  'servicios/',
  'servicios/movimiento-de-tierras/',
  'servicios/alquiler-de-maquinaria/',
  'servicios/acarreo-y-agregados/',
  'servicios/obra-civil/',
  'flota/',
  'proyectos/',
  'nosotros/',
  'cotizador/',
  'contacto/',
  'privacidad/',
  'terminos-del-cotizador/',
];

export const nombre = (ruta: string) => ruta || 'inicio';
