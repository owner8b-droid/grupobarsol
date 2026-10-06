// Datos del negocio (NAP, horario, redes). Fuente: BRIEF.md §1.1 y docs/privado/inventario-contenido.md.
// Lo que falta del cliente queda vacío y documentado en docs/privado/pendientes.md: nunca se inventa.

export const site = {
  nombre: 'Grupo Barsol',
  descriptor: 'Constructora y maquinaria',
  lema: 'Seguimos construyendo caminos, oportunidades y futuro.',
  telefono: '+50688808799',
  telefonoVisible: '+506 8880-8799',
  whatsapp: '50688808799',
  correo: 'grupobarsol@outlook.com',
  direccion: {
    calle: 'Avenida 4, Calle 12',
    ciudad: 'Cartago',
    provincia: 'Cartago',
    pais: 'CR',
  },
  // Del perfil de Google Business (Plus Code V37M+4Q). Confirmar que es la oficina.
  geo: { lat: 9.86284, lng: -83.91554 },
  horario: {
    dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    abre: '08:00',
    cierra: '17:00',
    texto: 'Lunes a viernes, 8:00\u00a0a.\u00a0m. a 5:00\u00a0p.\u00a0m.', // espacios duros: la hora no se parte
  },
  zonaHoraria: 'America/Costa_Rica',
  redes: {
    instagram: 'https://www.instagram.com/grupobarsol33/',
    facebook: 'https://www.facebook.com/profile.php?id=61551545677276',
    maps: 'https://maps.app.goo.gl/vVK5VVziTTzRJDcHA',
  },
  // Pendientes #19 y #20: la access key de Web3Forms es pública por diseño; GA4 solo con aprobación.
  web3formsKey: '',
  ga4: '',
} as const;

export type Site = typeof site;
