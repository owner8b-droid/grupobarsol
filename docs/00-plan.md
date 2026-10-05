# 00 · Plan del proyecto · Grupo Barsol

> Fase 0 · 2026-10-04 · Estado: **GATE 0 aprobado** el 2026-10-05 («continuemos», junto con la elección de la dirección D)
> Fuentes: [BRIEF.md](../BRIEF.md) · [PRODUCT.md](../PRODUCT.md) · [decisiones](decisiones.md) · [pendientes](privado/pendientes.md) (privado, fuera de git)

## 1. Resumen

| | |
|---|---|
| Cliente | Grupo Barsol · constructora y maquinaria pesada · Cartago (cantón Central), Costa Rica |
| Qué construimos | Sitio corporativo multipágina en Astro 7 (estático), español primero e inglés después |
| Nivel visual | **Premium** (§7): 1 momento firma · JS ≤ 90 KB gzip por página · LCP móvil ≤ 2,0 s · Lighthouse ≥ 95/100/100/100 |
| Datos | **Estático**: pre-cotización a WhatsApp + copia por email (Web3Forms) |
| Conversión primaria | Pre-cotización corta que termina en una conversación por WhatsApp |
| Públicos | Empresas y desarrolladores **y** propietarios particulares, por igual |
| Primer hito | **Prototipo navegable en una semana**: todo el sitio en español, a más tardar el domingo 11 de octubre de 2026 |

## 2. Decisiones tomadas en la Fase 0

Ocho respuestas en dos rondas de preguntas; el detalle está en [decisiones.md](decisiones.md).

| Tema | Decisión |
|---|---|
| Fecha | El 05/10/26 del BRIEF era de ejemplo. Hay **una semana completa para un primer prototipo**. |
| Alcance del prototipo | **Todo el sitio en español.** El selector y las rutas `/en/` quedan listos; el texto EN se redacta cuando el cliente valide el ES. |
| Servicios (M02) | 4, cada uno con página propia: **movimiento de tierras · alquiler de maquinaria · acarreo de materiales · obra civil**. |
| Público | **Ambos por igual**: el home habla a los dos y cada servicio aclara para quién es. |
| Cotizador (M04) | **Pre-cotización**: sin precios; resumen a WhatsApp + copia por email. |
| Catálogo (M03) | **Flota de maquinaria**: una ficha por máquina o vagoneta. Sin PDF hasta que exista uno real. |
| Referencia mcaninchcorp.com | Tomar **estructura, hero y scroll** como vara de nivel, sin copiar su diseño. |
| KPI a 90 días | **Se define con el cliente.** No bloquea el prototipo. |

## 3. Módulos

| Módulo | En el prototipo (semana 1) | Para producción | Bloquea |
|---|---|---|---|
| **M01 Hero de marca** | Foto real como LCP + H1 por líneas con máscara. Momento firma definido en la Fase 3. | Loop de video (6–12 s, ≤ 3 MB) solo con el archivo original del dron | Fotos originales sin logo |
| **M02 Servicios** (4) | 4 páginas: H1 "servicio + zona", para quién es, alcance, proceso y CTA que pre-llena el cotizador | FAQ por servicio solo con preguntas reales | Zona de cobertura y alcance real de cada servicio |
| **M03 Catálogo · flota** | Grid filtrable por tipo de máquina (filtros en la URL) + fichas; specs faltantes marcadas `PENDIENTE` | Specs reales, Flip al filtrar | Inventario de la flota |
| **M04 Cotizador** | Stepper accesible (servicio o máquina → ubicación y fechas → alcance → contacto) que arma el resumen para WhatsApp | Copia por email (Web3Forms), eventos GA4, E2E completo | Access key de Web3Forms |
| **M07 Prueba social** | Prueba con obra real: fotos, equipo y flota. Sin testimonios inventados. | Testimonios verificados, reseñas de Google, CFIA con permiso | Google Business Profile, testimonios, registro CFIA |
| **M08 Proceso** | 4–6 pasos en borrador, a validar con el cliente | Tiempos y entregables reales | Proceso real del cliente |
| **M09 Proyectos** | 3–4 casos armados con las fotos existentes; datos marcados `PENDIENTE` | Antes y después real (`<input type="range">`), datos del proyecto | Lista de proyectos con datos y permisos |
| **M10 Nosotros** | Historia y valores en borrador + foto del equipo | Datos verificados; "10 años" solo con prueba | Historia, prueba de antigüedad |
| **M12 Contacto** | NAP, horario con "abierto ahora" (`America/Costa_Rica`), mapa estático + enlace, WhatsApp flotante, formulario corto | Captcha si Web3Forms lo ofrece en su plan | — |
| **M15 Legal** | Borradores: privacidad (Ley 8968) y términos del cotizador | Revisión del cliente; aviso de cookies solo si se activa analítica | — |

Fuera de alcance (desmarcados en §1.7): M05 Listados, M06 Citas, M11 Campaña, M13 FAQ, M14 Blog, M16 Área de clientes.

**Pendientes visibles en el prototipo:** lo que falte se marca con una etiqueta discreta `PENDIENTE`, para que el cliente
vea qué le toca entregar. En producción no queda ninguno (§2.2 y §10.5).

## 4. Mapa de páginas preliminar

Se cierra en la Fase 2. Las rutas EN se crean en la Fase 4; su texto llega después de validar el ES.

| Página | Ruta ES | Ruta EN | Módulos | Conversión |
|---|---|---|---|---|
| Inicio | `/` | `/en/` | M01, M02, M07, M08, M09, M12 | Iniciar pre-cotización |
| Servicios | `/servicios/` | `/en/services/` | M02 | Elegir servicio y cotizar |
| Movimiento de tierras | `/servicios/movimiento-de-tierras/` | `/en/services/earthworks/` | M02, M08, M09 | Cotizá este servicio |
| Alquiler de maquinaria | `/servicios/alquiler-de-maquinaria/` | `/en/services/equipment-rental/` | M02, M03 | Ver la flota y cotizar |
| Acarreo de materiales | `/servicios/acarreo-de-materiales/` | `/en/services/material-hauling/` | M02 | Cotizá el acarreo |
| Obra civil | `/servicios/obra-civil/` | `/en/services/civil-works/` | M02, M09 | Cotizá tu obra |
| Flota | `/flota/` | `/en/fleet/` | M03 | Cotizar esta máquina |
| Ficha de máquina | `/flota/<slug>/` | `/en/fleet/<slug>/` | M03 | Cotizar esta máquina (`?item=`) |
| Cotizador | `/cotizador/` | `/en/quote/` | M04 | Enviar a WhatsApp |
| Proyectos | `/proyectos/` | `/en/projects/` | M09 | Cotizá un proyecto similar |
| Ficha de proyecto | `/proyectos/<slug>/` | `/en/projects/<slug>/` | M09, M07 | Cotizá un proyecto similar |
| Nosotros | `/nosotros/` | `/en/about/` | M10, M07 | Escribinos por WhatsApp |
| Contacto | `/contacto/` | `/en/contact/` | M12 | WhatsApp |
| Privacidad | `/privacidad/` | `/en/privacy/` | M15 | — |
| Términos del cotizador | `/terminos-del-cotizador/` | `/en/quote-terms/` | M15 | — |
| 404 | `/404` | `/en/404` | global | Volver al inicio o cotizar |

Globales: header que se oculta al bajar, menú móvil en `<dialog>`, footer con NAP y "Sitio por Structura",
selector de idioma a la página equivalente y WhatsApp flotante.

## 5. Calendario

Cada GATE espera tu aprobación explícita. Si uno se atrasa, el resto del calendario se corre.

**Semana 1 · prototipo**

| Día | Fase | Entregable | GATE |
|---|---|---|---|
| Lun 5 oct | **F1 Auditoría + F2 Estrategia**: mcaninchcorp.com y la plantilla de Envato (nivel, sin copiar), presencia del cliente en IG y FB, 3–5 competidores de Cartago y la GAM; sitemap, palabras clave locales y copy del home | `01-auditoria.md`, `inventario-contenido.md`, `02-estrategia.md` | GATE 1+2 |
| Mar 6 oct | **F3 Dirección de arte**: 3 territorios, artboards del favorito + una alternativa, momento firma, fuentes y tokens | `03-direccion-de-arte.md`, `tokens.css`, `design/` | GATE 3 |
| Mié 7 oct | **F4 Base técnica**: Astro 7, i18n, colecciones, `<Seo />`, motor de movimiento, UI base con todos sus estados, CI | URL de preview | GATE 4 |
| Jue 8 oct | **F5 Globales + home** verificados a 375/768/1280/1920, con teclado y con reduced-motion | Home en la preview | GATE 5 |
| Vie 9 oct | **F5 Servicios + cotizador** (Playwright: camino feliz y retroceso) | 4 servicios + cotizador | — |
| Sáb 10 oct | **F5 Resto**: flota y fichas, proyectos, nosotros, contacto, legales, 404 | Preview completa | — |
| Dom 11 oct | **QA del prototipo** (lo esencial de la F7: rendimiento móvil, a11y, responsive, lint) | `docs/qa/prototipo.md` con métricas y capturas | **Entrega del prototipo** |

**Después del prototipo** (estimado; depende de la velocidad del contenido del cliente)

| Semana | Trabajo | GATE |
|---|---|---|
| 12–18 oct | Ajustes del cliente; contenido real (flota, proyectos, fotos originales); texto EN; **F6** integraciones (Web3Forms, WhatsApp, GA4 si hay ID) | GATE 6 |
| 19–25 oct | **F7** QA completo (subagentes en paralelo, rúbrica ≥ 4,0) · **F8** lanzamiento (dominio, DNS por Franklin, Search Console) | GATE 7 · GATE 8 |

## 6. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Faltan inventario de la flota, proyectos con datos, testimonios y las pruebas de "10 años" y del CFIA | El prototipo lleva `PENDIENTE` visibles y la v1 no puede salir así | Pedir esta semana la lista de alta prioridad de [pendientes.md](privado/pendientes.md) |
| Las 13 fotos vienen de redes: 941–1994 px, compresión de Facebook y 8 con el logo sobreimpreso | Hero a 1920 px suave; 8 fotos no sirven tal cual | Pedir originales sin logo; recortes que eviten la marca; `docs/shotlist.md` si no hay originales |
| Los 2 videos son grabaciones de pantalla (una a 1090 × 608, con el cursor visible) | No sirven para un hero de video | Hero con foto (además, mejor LCP); pedir el archivo original del dron |
| El logo solo existe como JPG de 828 px | Sin nitidez en header, favicon ni imágenes OG | Pedir el vector a quien lo diseñó; si no existe, vectorizarlo fiel al original con aprobación del cliente (sin rediseñarlo) |
| El repo de GitHub es **público** | Al primer push quedan visibles BRIEF.md y los docs, incluidos los pendientes del cliente (p. ej., "falta la prueba del CFIA") | Decidir antes del primer push, en la Fase 4 (ver §9) |
| Sin Google Business Profile ni reseñas | M07 sin prueba de terceros; SEO local débil | Prueba con obra real mientras tanto; crear o reclamar el perfil cuanto antes |
| Sin dominio | `site`, canonical, sitemap y OG son provisionales | Preview en GitHub Pages con `base` provisional; dominio antes de la F8 |
| Dos públicos por igual | Mensaje difuso en el home | La F2 separa recorridos claros para cada público en el home |
| Una semana con 5 GATES | Cualquier atraso de aprobación corre la entrega | GATE 1+2 fusionado; las aprobaciones se piden con evidencia lista para decidir rápido |
| `fluid` sin instalar | Sin `lint:design` ni las skills de fluid hasta instalarlo | Instalación manual (§9); mientras tanto, el detector de impeccable |

## 7. Lo que se necesita del cliente

La lista completa, con su estado, está en [pendientes.md](privado/pendientes.md). Para el prototipo importa sobre todo:

1. **Inventario de la flota:** tipo, marca, modelo, capacidad, si va con operador y una foto de cada unidad.
2. **3–6 proyectos:** nombre, ubicación, año, alcance, cliente (con permiso) y fotos de antes y después.
3. **Fotos originales** en máxima resolución y sin el logo encima, y el **video original del dron**.
4. **Logo en vector** (AI, SVG, PDF o EPS).
5. **Zona de cobertura** y **cómo trabajan** (pasos, tiempos y entregables reales).

## 8. Entorno (Fase 0)

| Paso §9 | Resultado |
|---|---|
| 1 · Versiones | Claude Code **2.1.289** ✓ (binario de la extensión de VS Code; `claude` no está en el PATH) · Node **24.18.0** ✓ · npm 11.18 · git 2.54 · gh 2.101 con sesión de owner8b-droid |
| 2 · Plugins | **Instalados en el proyecto:** frontend-design, context7, chrome-devtools-mcp, playwright, feature-dev, commit-commands, hookify. **Ya presentes (@synced), sin duplicar:** modern-web-guidance, security-guidance. **Desactivados en este proyecto:** liquid-skills, liquid-dev, figma-suite. **Sin instalar:** fluid (bloqueado por el modo automático, ver §9); code-review y code-simplifier (los cubren los integrados `/code-review` y `/simplify`); github (lo cubre `gh`, ya autenticado); claude-md-management (se instala en la F8). |
| 3 · UI Skills e impeccable | UI Skills CLI 0.2.4: `npx ui-skills start` ✓, registro con 26 categorías, slugs de §3.6 verificados (4 renombrados; mapa en `CLAUDE.md`). impeccable 4.5.0 ✓ como `/impeccable <comando>`; `init` corrido → `PRODUCT.md`. Sin generación de imágenes: flujo code-first. |
| 4 · Archivos semilla | `CLAUDE.md`, `PRODUCT.md`, `.claude/settings.json`, `.claude/claude-security-guidance.md`, 5 subagentes en `.claude/agents/`, `docs/` |
| 5 · hookify | 7 reglas (6 anti-genérico de §6.3 + 1 de seguridad), en modo aviso; **25/25 casos de prueba correctos** con el propio motor de hookify |
| 6 · Análisis | 8 preguntas en 2 rondas; pendientes, supuestos y riesgos en este documento |

**Costo de contexto siempre activo de los plugins:** unos 2,3 k tokens por sesión. Los servidores MCP (context7,
chrome-devtools, playwright) cargan sus herramientas bajo demanda.

| Plugin | Tokens siempre activos |
|---|---|
| chrome-devtools-mcp | ~806 |
| modern-web-guidance (@synced) | ~759 |
| hookify | ~294 |
| feature-dev | ~240 |
| commit-commands | ~105 |
| frontend-design | ~80 |
| context7 · playwright · security-guidance | ~0 (MCP o hooks) |

Los plugins nuevos cargan al abrir una sesión nueva de Claude Code en esta carpeta.

## 9. Supuestos y decisiones que necesito de ti

**Supuestos** (aprobar el GATE 0 los confirma):

- Prototipo a más tardar el **domingo 11 de octubre de 2026**.
- Hero con **foto** en el prototipo; video solo con el original del dron.
- Sin Meta Pixel (la variable quedó sin llenar) y sin aviso de cookies mientras no haya GA4.
- Monedas CRC y USD declaradas, pero sin precios en el prototipo; `formatMoney()` queda listo.
- Tomamos el diseño de la plantilla de Envato como inspiración, no como base: no se copia diseño, texto ni código (§2.2).

**Decisiones**:

1. **Aprobar este plan (GATE 0).**
2. **Instalar `fluid`** (el modo automático no me deja instalar marketplaces de terceros):
   `/plugin marketplace add Darcos-Loft/fluid` → `/plugin install fluid@fluid`. Revisé el repo: MIT, solo
   skills (sin hooks ni servidores MCP), y su detector no hace llamadas de red. Si prefieres no instalarlo,
   `lint:design` usa el detector de impeccable.
3. **Antes del miércoles (F4):** cómo publicar la preview, dado que el repo es público: (a) público + GitHub Pages,
   sacando del repo lo sensible del cliente; (b) repo privado + otra plataforma de preview; o (c) repo privado +
   GitHub Pages con plan pago.
4. **Enviar al cliente** la lista de alta prioridad de [pendientes.md](privado/pendientes.md).
