# 02 · Estrategia, arquitectura de información y contenido

> Fase 2 · 2026-10-05 · Estado: **esperando GATE 2** (sitemap y copy del home).
> Base: [BRIEF.md](../BRIEF.md), [PRODUCT.md](../PRODUCT.md), dirección D ([design/](../design/README.md)) y la
> auditoría (`docs/privado/01-auditoria.md`, fuera de git).

## 1. Conversión

Una conversión primaria por página. Todas terminan en una conversación por WhatsApp, por tres caminos:

1. **Pre-cotización** (`/cotizador/`): 4 pasos y un resumen que abre WhatsApp con el mensaje escrito y, si la
   persona deja su correo, le manda una copia con Web3Forms.
2. **Formulario corto** del home y de contacto: los mismos datos mínimos y la misma salida.
3. **WhatsApp o llamada directa:** botón en el encabezado, pestaña lateral y bloque de contacto.

Secundarias: ver la flota, ver proyectos, llamar.

## 2. Públicos y recorridos

| Público | Cómo llega | Qué necesita ver | Recorrido |
|---|---|---|---|
| **Empresas y desarrolladores** (constructoras, industrias, municipalidades) | Google («movimiento de tierras Cartago»), referidos | Capacidad real: proyectos con datos, flota con fichas, alcance claro | Servicio → proyectos o flota → pre-cotización con el servicio ya elegido → WhatsApp |
| **Propietarios particulares** (dueños de lote o casa) | Google Maps, Facebook, Instagram, «excavación de lote» | Lenguaje simple, qué implica el trabajo, que no los enreden con formularios | Inicio → Tierra u Obra → pre-cotización (con la opción «No estoy seguro») → WhatsApp |
| **Alquiler directo** (los dos) | «alquiler de excavadora Cartago» | La máquina, sus datos y cómo se alquila | Flota → ficha → «Cotizar esta máquina» → WhatsApp |

## 3. Mapa del sitio

ES en la raíz; EN en `/en/` con slugs traducidos. Las rutas EN se crean en la F4 y su texto entra después de
validar el ES (ADR-001); el selector de idioma se muestra cuando haya texto EN, para no llevar a páginas vacías.

| Página | Ruta ES | Ruta EN | H1 | Conversión primaria |
|---|---|---|---|---|
| Inicio | `/` | `/en/` | Movimiento de tierras, maquinaria y obra civil en Cartago | Pre-cotizá tu obra |
| Servicios | `/servicios/` | `/en/services/` | Servicios de construcción y maquinaria | Elegir servicio y cotizar |
| Movimiento de tierras | `/servicios/movimiento-de-tierras/` | `/en/services/earthworks/` | Movimiento de tierras en Cartago | Cotizá este servicio |
| Alquiler de maquinaria | `/servicios/alquiler-de-maquinaria/` | `/en/services/equipment-rental/` | Alquiler de maquinaria pesada en Cartago | Ver la flota y cotizar |
| Acarreo y agregados | `/servicios/acarreo-y-agregados/` | `/en/services/hauling-and-aggregates/` | Acarreo de materiales y venta de agregados en Cartago | Cotizá el acarreo o el material |
| Obra civil | `/servicios/obra-civil/` | `/en/services/civil-works/` | Obra civil en Cartago | Cotizá tu obra |
| Flota | `/flota/` (`?tipo=`) | `/en/fleet/` | Flota | Cotizar esta máquina |
| Ficha | `/flota/<slug>/` | `/en/fleet/<slug>/` | {Tipo} {marca} {modelo} | Cotizar esta máquina (`?item=`) |
| Proyectos | `/proyectos/` | `/en/projects/` | Proyectos | Cotizá un proyecto similar |
| Ficha de proyecto | `/proyectos/<slug>/` | `/en/projects/<slug>/` | {Proyecto} | Cotizá un proyecto similar |
| Nosotros | `/nosotros/` | `/en/about/` | Equipo | Escribinos por WhatsApp |
| Pre-cotización | `/cotizador/` | `/en/quote/` | Cotizá | Enviar y seguir por WhatsApp |
| Contacto | `/contacto/` | `/en/contact/` | Contacto | WhatsApp |
| Privacidad | `/privacidad/` | `/en/privacy/` | Política de privacidad | — |
| Términos del cotizador | `/terminos-del-cotizador/` | `/en/quote-terms/` | Términos de la pre-cotización | — |
| 404 | `/404` | `/en/404` | Esta página no existe | Volver al inicio o cotizar |

Sin páginas puerta: no se clona una página por cantón. La zona entra en el H1 de cada servicio cuando se confirme
la cobertura (pendiente #6); mientras tanto, «en Cartago».

## 4. Palabras clave locales (hipótesis)

No hay datos de volumen en este entorno: son hipótesis por intención, a validar con Search Console después del
lanzamiento. Términos de Costa Rica: *vagoneta* (camión de volteo), *lastre*, *movimientos de tierra* (en plural,
como lo usan los competidores).

| Página | Intención | Principal | Secundarias |
|---|---|---|---|
| Inicio | Marca y genérica local | Grupo Barsol | constructora en Cartago · maquinaria pesada Cartago |
| Movimiento de tierras | Servicio local | movimiento de tierras Cartago | movimientos de tierra Costa Rica · excavación de lotes · conformación de terrazas · corte y relleno |
| Alquiler de maquinaria | Transaccional local | alquiler de maquinaria pesada Cartago | alquiler de excavadora · alquiler de compactadora · alquiler de vagonetas |
| Acarreo y agregados | Transaccional local | acarreo de materiales Cartago | venta de lastre · venta de agregados · acarreo de escombros |
| Obra civil | Servicio B2B | obra civil Cartago | calles en condominios · cimentaciones · urbanizaciones |
| Flota y fichas | Transaccional | excavadora en alquiler Cartago | {modelo} en alquiler |

## 5. Metadatos (title ≤ 60 · description ≤ 155, medidos)

| Página | Title | Desc. |
|---|---|---|
| Inicio | Movimiento de tierras y maquinaria en Cartago \| Grupo Barsol (60) | Movimiento de tierras, alquiler de maquinaria, acarreo de materiales y obra civil en Cartago. Pre-cotizá en línea y seguí la conversación por WhatsApp. (151) |
| Servicios | Servicios de construcción y maquinaria \| Grupo Barsol (53) | Movimiento de tierras, alquiler de maquinaria, acarreo y venta de agregados, y obra civil en Cartago. Elegí el servicio y pre-cotizá sin compromiso. (148) |
| Movimiento de tierras | Movimiento de tierras en Cartago \| Grupo Barsol (47) | Excavación, cortes, rellenos, conformación y compactación de terrenos en Cartago. Contanos tu proyecto y seguimos por WhatsApp. (127) |
| Alquiler | Alquiler de maquinaria pesada en Cartago \| Grupo Barsol (55) | Excavadoras, compactadoras, niveladoras y vagonetas por hora, día o proyecto en Cartago. Mirá la flota y cotizá la máquina que necesitás. (137) |
| Acarreo y agregados | Acarreo y venta de agregados en Cartago \| Grupo Barsol (54) | Acarreo de tierra, lastre, piedra y escombro en vagoneta, y venta de agregados en Cartago. Pre-cotizá el viaje o el material por WhatsApp. (138) |
| Obra civil | Obra civil en Cartago: calles y cimientos \| Grupo Barsol (56) | Calles, urbanizaciones, cimentaciones e infraestructura en Cartago, para desarrolladores, empresas y familias. Contanos tu obra. (128) |
| Flota | Flota de maquinaria pesada en alquiler \| Grupo Barsol (53) | Excavadoras, compactadoras, niveladoras y vagonetas con su ficha técnica. Filtrá por tipo y cotizá la unidad que necesitás en Cartago. (134) |
| Ficha | {Tipo} {Marca} {Modelo} en alquiler \| Grupo Barsol | {Tipo} {Marca} {Modelo} en alquiler por hora, día o proyecto en Cartago: ficha técnica y pre-cotización por WhatsApp. |
| Proyectos | Proyectos de Grupo Barsol: obra y movimiento de tierras (55) | Terrazas, calles, zanjas y cimientos hechos por Grupo Barsol en Cartago: qué se hizo, dónde y para quién. (105) |
| Nosotros | Nosotros: el equipo de Grupo Barsol en Cartago (46) | Quiénes somos y cómo trabajamos en Grupo Barsol, constructora y empresa de maquinaria pesada de Cartago. (104) |
| Pre-cotización | Pre-cotizá tu obra o tu máquina \| Grupo Barsol (46) | Contanos qué necesitás en cuatro pasos cortos y seguimos la conversación por WhatsApp. Sin costo ni compromiso. (111) |
| Contacto | Contacto y ubicación en Cartago \| Grupo Barsol (46) | Escribinos por WhatsApp o llamanos al +506 8880-8799. Estamos en Cartago, Avenida 4, Calle 12, de lunes a viernes, de 8 a. m. a 5 p. m. (135) |

## 6. Schema (JSON-LD con `schema-dts`)

| Alcance | Tipos |
|---|---|
| Todo el sitio | `GeneralContractor` (`@id …/#negocio`): nombre, logo, teléfono, correo, dirección (Avenida 4, Calle 12, Cartago, CR), `geo` 9,86284 / −83,91554 (por confirmar), horario L–V 08:00–17:00, `sameAs` (Facebook, Instagram, Google Maps), `areaServed` cuando se confirme la cobertura · `WebSite` (`inLanguage` es-CR) |
| Cada página | `WebPage` + `BreadcrumbList` |
| Servicios | `Service` (`serviceType`, `provider` → #negocio, `areaServed`); sin `Offer` porque no hay precios |
| Flota | `CollectionPage` + `ItemList` de `Product` (nombre, marca, modelo, imagen) · Ficha: `Product` con `additionalProperty` para las specs; sin `Offer` |
| Proyectos | `CollectionPage` · Proyecto: `CreativeWork` (`about`, `locationCreated`, `dateCreated`, `creator` → #negocio) |
| Nosotros / Contacto | `AboutPage` / `ContactPage` |
| Nunca | `AggregateRating` ni `Review` propios: Google no muestra reseñas que un negocio publica sobre sí mismo |

## 7. Modelo de contenido (adaptación de §4.4)

Las colecciones se crean en la F4; el contenido real entra cuando llegue del cliente.

| Colección | Campos |
|---|---|
| `servicios` | lang, titulo, slug, resumen (≤ 160), paraEmpresas[], paraParticulares[], incluye[], noIncluye[], fotos, cotizadorServicio (`tierra`, `alquiler`, `acarreo`, `obra`), traduccionDe |
| `flota` (el «catálogo» de §4.4) | lang, nombre, tipo (`excavadora`, `compactadora`, `niveladora`, `vagoneta`, `otro`), marca, modelo, specs[] (label/valor), fotos, modalidades (`hora`, `dia`, `proyecto`, `viaje`), operador (sí, no, a convenir), estado, destacado; sin precio |
| `proyectos` | lang, titulo, cliente, permisoCliente (bool), ubicacion, fecha, servicios[], alcance, fotosAntes[], fotosDespues[], testimonio (ref), destacado |
| `equipo` | nombre, rol, foto, permisoFoto (bool), orden |
| `testimonios` | como §4.4 (`verificado: true` obligatorio) |
| `src/data/site.ts` | NAP, horario, redes, coordenadas, zona de cobertura |

## 8. Copy del home (dirección D) · para aprobar en el GATE 2

| Bloque | Copy |
|---|---|
| H1 (línea superior del hero) | Movimiento de tierras, maquinaria y obra civil en Cartago |
| Display del hero | Construyendo / caminos. · oportunidades. → «caminos, oportunidades y futuro.» (el lema real: una sola vuelta de 2 s por frase que se detiene en el lema completo antes de 5 s, WCAG 2.2.2; completo con reduced-motion) |
| CTAs del hero | **Pre-cotizá tu obra** · Ver servicios · (botón: Pausar video / Reproducir video) |
| 01 · Tierra | **Movemos lo que tu obra necesita.** Excavación, cortes, rellenos, conformación y compactación de terrenos, y acarreo de tierra, lastre, piedra y escombro en vagoneta. También vendemos agregados. → Movimiento de tierras · Acarreo y agregados |
| 02 · Maquinaria | **Equipo pesado cuando lo necesitás.** Alquiler por hora, día o proyecto, para obras grandes y para lotes particulares. → Excavadoras · Compactadoras · Niveladoras · Vagonetas · Ver toda la flota |
| 03 · Obra | **De la terraza a la calle terminada.** Obra civil para desarrolladores, empresas y familias: calles, urbanizaciones, cimentaciones e infraestructura. → Cotizá tu obra civil · Ver proyectos |
| 04 · Equipo | **La gente detrás de cada obra.** [Historia: desde cuándo trabajan, quién dirige Grupo Barsol y cómo empezó; pendiente #13] → Conocé al equipo |
| 05 · Proyectos | Tarjetas con proyecto, tipo, cliente y ubicación [pendiente #2] → Ver detalles · Ver todos los proyectos |
| 06 · Cotizá | **Contanos qué necesitás y seguimos por WhatsApp.** Nombre · Teléfono o WhatsApp · ¿Qué necesitás? · ¿Dónde es la obra? · Contanos un poco más · consentimiento → **Enviar y seguir por WhatsApp**. Al lado: oficina, horario, teléfono y correo |
| Pestaña fija | Pre-cotizá tu obra |
| Pie | Seguimos construyendo caminos, oportunidades y futuro. · Instagram · Facebook · Privacidad · Términos del cotizador · Sitio por Structura |

## 9. Páginas de servicio (plantilla)

H1 «{servicio} en Cartago» · bajada de una o dos frases · **Para quién** (empresas y desarrolladores / dueños de
lote o casa) · **Qué incluye y qué no** (pendiente #7) · **Cómo trabajamos** (pendiente #8) · prueba: proyectos y
máquinas relacionadas · CTA «Cotizá este servicio» → `/cotizador/?servicio=…`.

| Servicio | Bajada |
|---|---|
| Movimiento de tierras | Preparamos el terreno para que tu obra arranque bien: excavación, cortes, rellenos, conformación de terrazas y compactación. |
| Alquiler de maquinaria | Excavadoras, compactadoras, niveladoras y vagonetas por hora, día o proyecto. Elegí la máquina en la flota y cotizala. |
| Acarreo y agregados | Llevamos y traemos tierra, lastre, piedra y escombro en vagoneta, y te vendemos los agregados para tu obra. [Materiales y modalidad: pendiente #7b] |
| Obra civil | Calles, urbanizaciones, cimentaciones e infraestructura, desde la terraza hasta la obra terminada. |

## 10. Pre-cotizador (M04, modo pre-cotización · ADR-002)

| Paso | Pregunta | Campos | Validación |
|---|---|---|---|
| 1 | ¿Qué necesitás? | Movimiento de tierras · Alquiler de maquinaria · Acarreo o agregados · Obra civil · No estoy seguro | «Elegí una opción para seguir.» |
| 2 | Detalles (según el servicio) | Tierra: tipo de trabajo + tamaño aproximado · Alquiler: máquina + tiempo · Acarreo: material + cantidad · Obra: tipo + etapa · No estoy seguro: «Contanos tu proyecto» | «Elegí una opción para seguir.» / «Contanos un poco más del proyecto.» |
| 3 | ¿Dónde y cuándo? | Lugar (cantón o distrito) + Lo antes posible · Este mes · En 1 a 3 meses · Todavía sin fecha | «Contanos dónde es la obra.» / «Elegí para cuándo lo necesitás.» |
| 4 | ¿Cómo te contactamos? | Nombre · Teléfono o WhatsApp (8 dígitos) · Correo (opcional) · consentimiento · honeypot | «Escribí tu nombre.» / «Escribí un teléfono de 8 dígitos, por ejemplo 8888 8888.» / «Revisá el correo; por ejemplo: nombre@correo.com.» / «Necesitamos tu permiso para usar estos datos.» |
| 5 | Revisá tu pre-cotización | Resumen + **Enviar y seguir por WhatsApp** + Editar respuestas | — |

- **Mensaje de WhatsApp:** «Hola, Grupo Barsol. Quiero una pre-cotización: • Servicio • Detalle • Lugar • Para •
  Nombre y teléfono», armado con `encodeURIComponent`.
- **Precarga desde la URL:** `?servicio=` y `?item=` validados contra listas permitidas (guía de seguridad).
- **Estado:** en la URL y en `sessionStorage` (atrás y adelante sin perder datos).
- **Eventos:** `cotizador_inicio`, `cotizador_paso`, `cotizador_completo`, `lead_enviado`, `click_whatsapp`.
- **Aviso:** «La pre-cotización no tiene costo ni compromiso. El precio se define cuando conversemos el alcance.»
- **Prototipo funcional:** `design/home-territorios/Cotizador-*.dc.html` (canvas, página «Ronda 2»).

## 11. Microcopy global

| Situación | Texto |
|---|---|
| Confirmación | ¡Listo, {nombre}! Abrimos WhatsApp con tu resumen. ¿No se abrió? Tocá aquí para abrirlo. Te respondemos de lunes a viernes, de 8:00 a. m. a 5:00 p. m. |
| Falla de la copia por correo | No pudimos enviar la copia por correo, pero tu resumen igual está listo en WhatsApp. |
| Consentimiento | Acepto que Grupo Barsol use estos datos solo para responder mi consulta (Ley 8968). · Política de privacidad |
| Flota sin resultados | No hay unidades de este tipo por ahora. Contanos qué necesitás y te orientamos. |
| 404 | **Esta página no existe.** Puede que el enlace esté mal escrito o que la página se haya movido. → Volver al inicio · Pre-cotizá tu obra |
| Accesibilidad | Saltar al contenido · Abrir menú / Cerrar menú · Pausar video / Reproducir video |

Sin aviso de cookies mientras no haya GA4 ni píxel (§M15).
