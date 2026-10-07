// Rutas públicas en ES, relativas a baseURL (sin barra inicial: baseURL ya incluye /grupobarsol/).
export const RUTAS = [
  '',
  'servicios/',
  'servicios/movimiento-de-tierras/',
  'servicios/alquiler-de-maquinaria/',
  'servicios/acarreo-y-agregados/',
  'servicios/obra-civil/',
  'flota/',
  // Fichas de unidades de muestra (con galería y sin foto): cambian cuando llegue el inventario real (pendiente #1)
  'flota/excavadora-1/',
  'flota/niveladora-1/',
  'proyectos/',
  'nosotros/',
  'cotizador/',
  'contacto/',
  'privacidad/',
  'terminos-del-cotizador/',
];

export const nombre = (ruta: string) => ruta || 'inicio';
