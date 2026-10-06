# Registro de decisiones (ADR)

Formato del Anexo D de BRIEF.md. "Aceptada" = la decidió el usuario; "propuesta" = la propone Claude y se confirma
con el GATE indicado.

## ADR-001 · Alcance y calendario del primer prototipo
- Fecha: 2026-10-04 · Estado: aceptada
- Contexto: el BRIEF decía `fecha_entrega: 05/10/26`, que era un valor de ejemplo. Hay una semana completa para un primer prototipo.
- Decisión: prototipo navegable con todo el sitio en español, a más tardar el domingo 11 de octubre de 2026. El
  selector de idioma y las rutas `/en/` quedan listos; el texto EN se redacta cuando el cliente valide el ES.
- Alternativas consideradas: ES + EN completos en el prototipo; solo home y cotizador al detalle.
- Consecuencias: la mitad del copy a validar en la semana; la arquitectura i18n se construye igual desde la F4.

## ADR-002 · Cotizador en modo pre-cotización
- Fecha: 2026-10-04 · Estado: aceptada
- Contexto: no hay precios ni tarifas aprobadas por el cliente.
- Decisión: el cotizador recoge servicio o máquina, ubicación, fechas, alcance y contacto; no muestra precios.
  Envía el resumen pre-llenado a WhatsApp y una copia por email con Web3Forms (`"modo": "pre-cotizacion"`).
- Alternativas consideradas: rango por hora o día de máquina; rango por m² de obra (ambos requieren tarifas aprobadas).
- Consecuencias: cero riesgo de publicar precios inventados; la calificación del lead ocurre en la conversación por WhatsApp.

## ADR-003 · Insumos crudos del cliente fuera de git
- Fecha: 2026-10-04 · Estado: propuesta (GATE 0)
- Contexto: `insumos/` pesa 125 MB (dos videos de 24 y 97 MB) y 8 fotos traen el logo sobreimpreso; el repo es público.
- Decisión: `insumos/` va en `.gitignore`. Las versiones procesadas y aprobadas entran a `src/assets/`.
- Alternativas consideradas: versionar todo; Git LFS.
- Consecuencias: repo liviano. Una sesión en la nube o un colaborador no reciben los crudos; hay que compartirlos aparte.

## ADR-004 · Plugins: copias @synced e integrados en vez de duplicados
- Fecha: 2026-10-04 · Estado: propuesta (GATE 0)
- Contexto: §3.4 pide no instalar duplicados y medir el costo de contexto.
- Decisión: se usan modern-web-guidance y security-guidance @synced; `/code-review` y `/simplify` integrados en vez de
  los plugins code-review y code-simplifier; `gh` (ya autenticado) en vez del plugin github. Shopify/Liquid y Figma
  quedan desactivados en este proyecto.
- Alternativas consideradas: instalar la lista completa de §3.1 y §3.2.
- Consecuencias: unos 2,3 k tokens siempre activos. En una sesión en la nube, los plugins @synced llegan desde la cuenta.

## ADR-005 · Catálogo = flota de maquinaria
- Fecha: 2026-10-04 · Estado: aceptada
- Contexto: M03 estaba marcado sin definir qué se cataloga.
- Decisión: una ficha por máquina o vagoneta con specs reales y "Cotizar esta máquina" (`/cotizador/?item=<slug>`).
  Sin PDF descargable hasta que exista uno real.
- Alternativas consideradas: sin catálogo aparte, con la maquinaria dentro de "Alquiler de maquinaria".
- Consecuencias: depende del inventario real de la flota (pendiente del cliente).

## ADR-006 · Cómo se usan las referencias
- Fecha: 2026-10-04 · Estado: aceptada
- Contexto: la fila de mcaninchcorp.com en §1.4 tenía una celda de más.
- Decisión: de mcaninchcorp.com se toman estructura, hero y movimiento con scroll como vara de nivel; de la plantilla
  "Exroz" de Envato, el diseño como inspiración y nada de su contenido. De ninguna se copia diseño, texto, fotos ni código (§2.2).
- Consecuencias: la F1 audita ambas a fondo en esos tres ejes.

## ADR-007 · Reglas anti-genérico como avisos
- Fecha: 2026-10-04 · Estado: propuesta (GATE 0)
- Contexto: §3.2 y §6.3 piden convertir las reglas críticas en avisos automáticos con hookify.
- Decisión: 7 reglas en `.claude/hookify.*.local.md` con `action: warn`: fuentes genéricas, negro o blanco puros,
  color fuera de tokens, texto con degradado, movimiento genérico, relleno o emojis, y HTML inyectado. Probadas con
  25 casos con el motor de hookify.
- Alternativas consideradas: `action: block` (frena excepciones legítimas, como el negro en una máscara).
- Consecuencias: el aviso aparece en cada edición; la decisión final sigue en la revisión y en `lint:design`.

## ADR-008 · Exploración de territorios antes de las Fases 1–2
- Fecha: 2026-10-05 · Estado: aceptada (pedido del usuario con `/design`); el territorio se elige en el GATE 3
- Contexto: el usuario pidió explorar el home en 3 territorios antes de la auditoría y la estrategia.
- Decisión: canvas de Claude Design con A · Curvas de nivel, B · Peso pesado y C · Caminos, en escritorio y móvil,
  con fotos reales del cliente (recortadas sin el logo sobreimpreso) y textos provisionales. Copia de referencia en
  `design/home-territorios/`.
- Alternativas consideradas: esperar a que la F2 cierre el copy; un solo territorio.
- Consecuencias: la F1 y la F2 pueden ajustar el copy y la estructura; el territorio elegido se consolida después en
  `docs/03-direccion-de-arte.md` y `src/styles/tokens.css`. Dos fotos quedan fuera hasta verificar que no sean de IA.

## ADR-009 · Dirección D, basada en la estructura de McAninch
- Fecha: 2026-10-05 · Estado: aceptada como base («el D está excelente como base», 2026-10-05)
- Contexto: ninguno de los territorios A, B y C convenció; el B fue el más cercano. El usuario pidió parecerse a
  mcaninchcorp.com, en línea con §1.4 (tomar estructura, hero y scroll).
- Decisión: la dirección D toma de McAninch la estructura por pantallas completas, el hero con video y frase que rota,
  los títulos de una palabra con franja de color, las fotos en diagonal con capa de color, los puntos de progreso, la
  pestaña fija de cotización y las tarjetas de proyecto. La identidad es de Barsol: su lema, la línea ocre y el brazo
  de la excavadora del logo, sus colores, Urbanist, y su propio video y fotos. No se copian textos, fotos, logo ni código (§2.2).
- Cambios frente a la referencia: snap suave en lugar de scroll secuestrado; video pausable y liviano (1,5 MB);
  foto fija con reduced-motion; formulario con consentimiento (Ley 8968).
- Alternativas consideradas: ajustar el territorio B; copiar la referencia más de cerca (descartado: §2.2 y riesgo legal).
- Consecuencias: el movimiento pasa a nivel cercano a Signature (secciones fijadas). Se valida contra el presupuesto
  premium de JS en la F4, y se registra un ADR si hace falta subir de nivel.

## ADR-010 · Repo público con docs sensibles fuera de git
- Fecha: 2026-10-05 · Estado: aceptada (elección del usuario: GitHub Pages con repo público)
- Contexto: el repo `owner8b-droid/grupobarsol` es público y la preview sale de GitHub Pages. Pendientes y
  auditoría contienen datos sensibles del cliente (afirmaciones sin respaldo, fotos por verificar, competidores).
- Decisión: esos docs viven en `docs/privado/` (en `.gitignore`). Antes del primer push se sacaron del historial
  local con `git filter-branch`; el respaldo previo queda en `refs/original` (el bundle que se había hecho en una
  carpeta temporal se perdió al limpiarse esa carpeta). Se publica solo `main`.
- Alternativas consideradas: repo privado con Cloudflare Pages; repo privado con GitHub Pages pago.
- Consecuencias: un colaborador o una sesión en la nube no reciben `docs/privado/`; hay que compartirlo aparte.
  Queda `refs/original` local con el historial viejo hasta que el usuario lo borre; nunca usar `push --all`.

## ADR-011 · H1 concreto y lema como display en el hero
- Fecha: 2026-10-05 · Estado: propuesta (GATE 2)
- Contexto: §M01 pide un H1 con propuesta concreta (qué, dónde, para quién), no un eslogan. La dirección D usa el lema
  como palabra enorme.
- Decisión: el H1 es la línea corta superior («Movimiento de tierras, maquinaria y obra civil en Cartago»); el lema
  («Construyendo caminos / oportunidades / futuro») queda como texto de display, con el texto completo disponible
  para lectores de pantalla.
- Alternativas consideradas: lema como H1 (débil para SEO y para M01); H1 grande con la frase de servicios (pierde la
  fuerza visual de la referencia).
- Consecuencias: SEO local y M01 cumplidos sin cambiar la imagen del hero.

## ADR-012 · Venta de agregados dentro de Acarreo
- Fecha: 2026-10-05 · Estado: aceptada (respuesta del usuario)
- Contexto: el perfil de Facebook menciona venta de agregados; no estaba entre los 4 servicios confirmados.
- Decisión: sin página propia; la página pasa a «Acarreo y agregados» (`/servicios/acarreo-y-agregados/`) y el
  cotizador ofrece «Acarreo o agregados».
- Consecuencias: falta el detalle de materiales y modalidad (pendiente #7b).

## ADR-013 · Preview en GitHub Pages con `base` y EN sin generar
- Fecha: 2026-10-05 · Estado: aceptada (deriva de ADR-010 y del alcance de ADR-001)
- Contexto: no hay dominio todavía; la preview sale de `https://owner8b-droid.github.io/grupobarsol/`. El inglés
  se hace después de validar el español.
- Decisión: `site` = dominio de GitHub Pages y `base: '/grupobarsol/'`; todos los enlaces pasan por `ruta()` y
  `conBase()`, así que el cambio a dominio propio es solo `site`, quitar `base` y agregar `public/CNAME`. El mapa
  de rutas ES↔EN (`src/i18n/routes.ts`) y el `hreflang` existen desde ya, pero las páginas `/en/` no se generan
  hasta tener el texto aprobado: no se publica un inglés provisional.
- Consecuencias: el canonical, el sitemap y el Open Graph apuntan a GitHub Pages hasta el cambio de dominio.
  Los tests y Lighthouse CI corren contra `/grupobarsol/`.

## ADR-014 · Orden de carga: CSS en línea; motor y video después del primer pintado
- Fecha: 2026-10-05 · Estado: aceptada (evidencia de la Fase 4)
- Contexto: con Slow 4G el CSS externo (~4,5 KB gzip en dos hojas) costaba un viaje de red antes del primer
  pintado (LCP 1,38 s en traza). En Lighthouse CI (throttling simulado) el LCP del home daba 2,21 s, sobre el
  presupuesto premium de 2,0 s: `requestIdleCallback` corría antes de que se presentara el primer frame, así que
  GSAP (53 KB gzip) y el video (1,4 MB) arrancaban antes del FCP y entraban en la estimación.
- Decisión: `build.inlineStylesheets: 'always'` (HTML del home: 13,6 KB gzip). El motor de movimiento y el video
  del hero arrancan con `trasElPrimerPintado()` (`src/lib/tiempo.ts`): esperan la entrada real de
  `first-contentful-paint` y luego reposo, con respaldo a los 1,5 s si no hay paint timing; el video además espera
  al evento `load`.
- Alternativas consideradas: `throttlingMethod: devtools` en Lighthouse CI (descartada: maquilla la medición
  en vez de corregir el orden de carga); diferir las fotos de las secciones (descartada: llegan a baja prioridad
  y conviene tenerlas listas al bajar).
- Consecuencias: LCP del home 0,90 s en traza (Slow 4G, CPU ×4) y 1,43 s en Lighthouse CI; Performance 100.
  El CSS no se cachea entre páginas, lo que con este peso es más barato que el viaje de red.
