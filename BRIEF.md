# Plantilla maestra · Sitio corporativo con módulos, nivel "arte web"

> **Para:** Claude Code (+ Claude Design) · **Stack:** Astro 7 estático · **Estudio:** Structura
> **Arquetipo:** sitios corporativos multipágina del tipo *dfsolucionescr.com* (catálogo, cotizador, listados, citas, prueba social, ES/EN), pero con dirección de arte, movimiento y rendimiento de nivel premiado.
> **Versión:** 1.1 · octubre 2026 · herramientas verificadas el 2026-10-03 (Claude Code ≥ 2.1.234, Astro 7.3, GSAP 3.15, Lenis 1.3, Three.js r186, UI Skills CLI 0.2). Usa UI Skills e impeccable ya instalados.

**Orden de lectura para Claude:** §2 (rol y reglas) → §9 (fase actual) → la sección que esa fase referencia. El BRIEF (§1) es la fuente de verdad del negocio.

---

## 0. Cómo usar esta plantilla

Tú haces 5 cosas; Claude hace el resto por fases y se detiene en cada **GATE** para tu aprobación.

1. Crea un repo vacío y copia este archivo como `BRIEF.md` en la raíz.
2. Llena la **§1 BRIEF**. Las variables tienen el formato `{{ASÍ}}`; en las opciones `{{a | b | c}}` deja solo la que aplica. Lo que no sepas, escríbelo como `PENDIENTE`: Claude lo registra y te pregunta en vez de inventar. Las variables de §4, §6 y los anexos (fuentes, colores, fase actual) las llena Claude durante el proyecto. (`${{ … }}` dentro de YAML es sintaxis de GitHub Actions: no se toca.)
3. Marca los módulos `[x]`, el nivel visual y el modo de datos.
4. Abre Claude Code en el repo con Chrome conectado: `claude --chrome`
5. Pega el prompt de arranque:

```text
Lee BRIEF.md completo. Asume el rol de la §2 y ejecuta la Fase 0 (§9).
No escribas código de producto hasta que yo apruebe el GATE 0.
Todo lo que esté PENDIENTE o ambiguo, pregúntamelo con opciones concretas (máx. 4 por ronda).
Trabaja por fases, con commits pequeños, y detente en cada GATE con evidencia
(capturas, URL de preview, métricas).
```

**Si vienes de una demo hecha con `propuesta-visual.md`:** pon la URL o carpeta de la demo en §1.4 como referencia aprobada. Claude reutiliza la dirección de arte, el contenido y el movimiento ya validados con el cliente en vez de empezar de cero.

### 0.1 Ruta con Claude Design (recomendada para Signature y Awwwards)

| Opción | Cómo | Cuándo |
|---|---|---|
| **A. `/design` dentro de Claude Code** | `/design <brief de la pantalla>` → Claude publica un canvas de artboards editables (`.dc.html`) → eliges uno y lo ajustas → "implementa el artboard N". Requiere Claude Code ≥ 2.1.234, plan Pro/Max/Team/Enterprise y sesión iniciada con tu cuenta de claude.ai. | Exploración rápida de pantallas sin salir de la terminal (Fase 3). |
| **B. claude.ai/design** | Sube logo, fotos reales, capturas de referencias, `docs/03-direccion-de-arte.md` y `src/styles/tokens.css` (o apunta al repo de GitHub para que arme el design system del cliente). Diseña las pantallas clave → **Export → Handoff to Claude Code** (sesión local o Claude Code web). | Dirección de arte más trabajada, un design system por cliente, y piezas extra con el mismo sistema (one-pager o pitch en PDF/PPTX/Canva). |

Reglas de la ruta Design:

- Los `.dc.html` y los exports son **especificación visual**, no código de producción: se **reimplementan** como layouts y componentes Astro con los tokens compartidos (cero boilerplate duplicado entre páginas). Se guardan en `design/` solo como referencia.
- Si el diseño cambia, se corrige **en Claude Design** y se vuelve a hacer handoff; no dejes que diseño y código diverjan.
- `/design-sync` solo sincroniza design systems **React** (paquete con `dist/` o Storybook). Con este stack Astro no aplica, salvo que el proyecto tenga una librería React aparte.

---

## 1. BRIEF del proyecto (llenar)

### 1.1 Datos base

```yaml
cliente:
  nombre_comercial: "{{Grupo_Barsol}}"
  sector: "{{Construccion y Maquinaria}}"            # construccion-inmobiliaria | automotriz | belleza-estetica | educacion-cuidado | salud | servicios-profesionales | comercio-local | otro
  ubicacion: "{{Central}}, {{Cartago}}, Costa Rica"
  anos_operando: "{{10}}"       # solo si es verificable
  afiliaciones: ["{{CFIA}}"]   # solo con respaldo (logo oficial + permiso de uso)
sitio:
  dominio: "{{pendiente}}"
  repo: "{{owner8b-droid}}/{{grupobarsol}}"
  idiomas: [es, en]               # el primero es el idioma por defecto (raíz /)
  voz: "{{voseo-cr}}"                  # voseo-cr (Cotizá, Reservá) | tu (Cotiza) | usted (Cotice)
  monedas: [CRC, USD]
  nivel_visual: "{{premium}}"       # premium | signature | awwwards  → §7
  datos: "{{estatico}}"         # estatico | hibrido-core          → §8
  fecha_entrega: "{{05/10/26}}"
contacto:
  whatsapp: "+506 {{8880-8799}}"
  telefono: "+506 {{8880-8799}}"
  email: "{{grupobarsol@outlook.com}}"
  direccion: "{{Cartago, Avenida 4, Calle 12}}"      # con señas, como se usa en CR
  horario: "{{L-V: 8am-5pm}}"
  google_maps: "{{https://maps.app.goo.gl/vVK5VVziTTzRJDcHA }}"
  google_business_profile: "{{pendiente}}"
  redes: { instagram: "{{https://www.instagram.com/grupobarsol33/}}", facebook: "{{https://www.facebook.com/profile.php?id=61551545677276&locale=es_LA}}", tiktok: "{{pendiente}}" }
analitica:
  ga4: "{{pendiente}}"
  meta_pixel: "{{META_PIXEL_ID}}" # opcional
formularios:
  endpoint_estatico: "{{web3Forms}}"   # Web3Forms, Formspree u otro (si datos = estatico)
core:                             # solo si datos = hibrido-core
  site_key: "{{CORE_SITE_KEY}}"   # clave PÚBLICA del sitio. Nunca el business_id/UUID (ver §8)
  intake_url: "{{CORE_INTAKE_URL}}"
  booking_url: "{{CORE_BOOKING_URL}}"
  modulos: [leads, cotizaciones, citas, ]
```

### 1.2 Negocio y objetivos

- **Qué vende y a quién (1 párrafo):** {{Proyectos de construccion civil, y alquiler de maquinaria pesada}}
- **Diferenciadores reales (con prueba):** {{unificacion de servicios y consultoria completa}}
- **Conversión primaria:** {{se discute y asesora por whatsapp luego de llenar cotizacion/formulario}} (ej.: agendar asesoría por WhatsApp)
- **Conversiones secundarias:** {{completar el cotizador, ver portafolio}} (ej.: completar el cotizador, descargar el catálogo, ver una propiedad)
- **KPI a 90 días:** {{90}}

### 1.3 Audiencia

| Persona | Necesidad | Objeciones | Idioma / canal |
|---|---|---|---|
| {{Dueña}} | unificar servicios | formulario complejos | español | 
| {{Publico}} | conocer servicios y cotizar | desconocimiento | español |

### 1.4 Referencias

| URL | Qué tomar (estructura, módulo, interacción) | Qué evitar |
|---|---|---|
| {{https://www.mcaninchcorp.com/}} | estructura | hero | movimientos y scroll
| {{https://elements.envato.com/exroz-construction-template-GP89LN7}} | diseno | contenido |
| {{pendiente}} | Dirección ya aprobada en la propuesta | |

> Las referencias inspiran estructura y nivel. **Nunca** se copia su diseño, sus textos ni sus fotos.

### 1.5 Marca existente

- Logo: {{insumos/logo}} (SVG ideal) · Colores: {{rojos/amarillos/blancos/negros}} · Tipografías: {{libre}} (o "libre")
- Fotografía disponible: {{insumos/fotos}} (propias / sesión pendiente / ninguna) · Video: {{insumos/videos}}
- Tono: {{libre}} · Palabras que sí / que no: {{LEXICO}}

### 1.6 Fuentes de contenido

Sitio actual {{pendiente}} · Instagram · Google Business Profile · catálogos PDF {{pendiente}} · catálogo de WhatsApp Business · documentos del cliente {{pendiente}}.

### 1.7 Módulos (marca y configura; specs en §5)

- [x] **M01 Hero de marca** · media: {{foto | video | WebGL}}
- [x] **M02 Servicios** · {{N}} servicios, cada uno con página propia
- [x] **M03 Catálogo** · de: {{modelos de casa | vehículos | servicios | productos | programas}} · descarga PDF: {{sí/no}}
- [x] **M04 Cotizador** · cálculo: {{por unidad (m², horas, personas) | por paquete | por servicio}} · muestra precio: {{sí, en rango | no: pre-cotización}} · destino: {{WhatsApp | Core | ambos}}
- [ ] **M05 Listados con filtros** · de: {{propiedades | lotes | vehículos | otro}} · mapa: {{sí/no}} · fuente: {{archivos | inventario de Core}}
- [ ] **M06 Reservas / citas** · vía: {{Core citas | Cal.com/Calendly | WhatsApp}}
- [x] **M07 Prueba social** · testimonios verificables, reseñas de Google, afiliaciones
- [x] **M08 Proceso / Cómo trabajamos**
- [x] **M09 Proyectos / casos** (antes y después)
- [x] **M10 Nosotros / equipo**
- [ ] **M11 Campaña destacada** (preventa, lanzamiento, promo)
- [x] **M12 Contacto** + mapa + horario + WhatsApp flotante
- [ ] **M13 FAQ**
- [ ] **M14 Blog / noticias**
- [x] **M15 Legal** (privacidad según Ley 8968, términos del cotizador, cookies)
- [ ] **M16 Área de clientes** (solo con Core)

### 1.8 Restricciones y pendientes conocidos

{{RESTRICCIONES}} (plazo, presupuesto, fotos faltantes, contenido por validar, accesos pendientes: dominio, Google Business Profile, analítica).

---

## 2. Rol, misión y estándar

Actúa como un **estudio senior completo**: director de arte, desarrollador full-stack senior, motion designer, especialista en SEO técnico y en accesibilidad. El resultado debe sentirse **hecho a mano para este negocio**, poder competir en CSSDA/Awwwards en el nivel elegido y, a la vez, convertir mejor que la referencia.

### 2.1 Qué significa "arte web" en este proyecto

1. **Concepto:** una idea visual central que nace del negocio (no de una tendencia) y gobierna cada sección.
2. **Tipografía y composición:** escala con carácter, grid editorial, asimetría con intención, ritmo vertical.
3. **Movimiento con intención:** el movimiento explica jerarquía, causa-efecto y continuidad. Nunca es adorno gratuito.
4. **Materialidad:** luz, textura, grano, fotografía real con dirección de arte.
5. **Rendimiento invisible:** se siente instantáneo; Core Web Vitals en verde.
6. **Claridad comercial:** el arte nunca esconde la acción. Una conversión primaria por página.

### 2.2 Reglas duras (no negociables)

- **Verdad del contenido:** no inventes precios, m², años, cifras, testimonios, reseñas, certificaciones ni logos. Si falta algo → `docs/pendientes.md` + placeholder marcado. En producción no queda ningún placeholder.
- **Originalidad:** las referencias inspiran; no copies diseño, textos, fotos ni código.
- **Mobile-first real** y **WCAG 2.2 AA**, con `prefers-reduced-motion` respetado en todo.
- **Mejora progresiva:** sin JS el contenido está completo y legible; el movimiento suma, nunca bloquea.
- **Verificación visual obligatoria:** ningún cambio visual está "hecho" sin verlo en un navegador real a 375 / 768 / 1280 / 1920 px.
- **Git:** commits pequeños y descriptivos. Tras cada deploy relevante, verifica la URL publicada antes de seguir.
- **Nunca sin aprobación:** push a producción, cambios de DNS, `supabase db push`, dependencias de más de 30 KB gzip, publicar.
- **Secretos:** ninguna clave en el repo ni en el cliente (ver §8).
- **Cuando dos guías choquen, manda (en orden):** BRIEF y dirección de arte aprobada → corrección técnica (`modern-web-guidance` + docs de `context7`) → calidad visual (`impeccable`, UI Skills, `fluid`) → exploración (`frontend-design`). Registra la decisión en `docs/decisiones.md`.

---

## 3. Kit de herramientas: skills, plugins y MCP

"Usar todo lo funcional" significa **cada herramienta en su fase**, no todas encendidas siempre: cada plugin suma contexto en cada turno. Mide el costo con `claude plugin details <nombre>` (desde la terminal).

### 3.1 Núcleo (siempre)

| Herramienta | Instalación (en sesión) | Para qué en este proyecto | Fases |
|---|---|---|---|
| **frontend-design** | `/plugin install frontend-design@claude-plugins-official` | Dirección estética distintiva; evita la estética genérica de IA | 3, 5 |
| **modern-web-guidance** (equipo de Chrome) | `/plugin install modern-web-guidance@claude-plugins-official` | **Consultar antes de escribir HTML/CSS/JS:** view transitions, scroll-driven animations, popover/dialog, formularios, imágenes, CWV. Respeta el Baseline target del `CLAUDE.md` | 4–7 |
| **context7** | `/plugin install context7@claude-plugins-official` | Docs exactas por versión: Astro 7, GSAP 3.15, Lenis, Three.js, Embla | 4–6 |
| **chrome-devtools-mcp** | `/plugin install chrome-devtools-mcp@claude-plugins-official` | `performance_start_trace` / `performance_analyze_insight`, `lighthouse_audit`, `emulate` (móvil + red lenta), consola, red, `take_screenshot` | 1, 5, 7 |
| **playwright** (Microsoft) | `/plugin install playwright@claude-plugins-official` | E2E y regresión visual en Chromium/WebKit/Firefox; flujos de cotizador, filtros y formularios | 5–7 |
| **Claude in Chrome** | `claude --chrome` · `/chrome` | Usar el sitio como un usuario real, auditar referencias, grabar GIF demo para portafolio o pitch | 1, 5, 7, 8 |
| **security-guidance** | `/plugin install security-guidance@claude-plugins-official` | Revisión automática por edición, por turno y por commit | todas |
| **fluid** (Darcos-Loft) | `/plugin marketplace add Darcos-Loft/fluid` → `/plugin install fluid@fluid` | Skills `design-system`, `fluid` (motion), `refine`, `redesign`, `brandkit`, `output` (gate sin placeholders) + detector de 28 reglas: `npx fluid-skills detect src --strict` | 3, 5, 7 |
| **impeccable** (Paul Bakaus) | **Ya instalado** (no reinstalar). En otra máquina: `/plugin marketplace add pbakaus/impeccable` | `init · shape · craft · critique · audit · polish · animate · typeset · layout · colorize · delight · overdrive · optimize · adapt · harden` (invocación según §3.6) | todas |
| **UI Skills** (ibelick · ui-skills.com) | **Ya instaladas** con su init (no reinstalar). Router: `npx ui-skills start` · bajo demanda: `npx ui-skills get <slug>` | Catálogo de skills de design engineering (motion, GSAP oficial, tipografía, color OKLCH, a11y, metadata, Three.js). Mapa por fase en §3.6 | todas |
| **/design** (Claude Design) | integrado (≥ 2.1.234) | Artboards editables de pantallas clave | 3 |

### 3.2 Flujo de trabajo (recomendados)

| Herramienta | Instalación | Uso |
|---|---|---|
| feature-dev | `/plugin install feature-dev@claude-plugins-official` | Explorar → arquitectura → revisión para módulos complejos (cotizador, filtros, integración con Core) |
| code-review | `/plugin install code-review@claude-plugins-official` | Revisión multi-agente antes de cada merge a `main` |
| code-simplifier | `/plugin install code-simplifier@claude-plugins-official` | Simplificar lo recién escrito sin cambiar comportamiento |
| commit-commands | `/plugin install commit-commands@claude-plugins-official` | Commits y PR consistentes |
| claude-md-management | `/plugin install claude-md-management@claude-plugins-official` | Mantener `CLAUDE.md` vivo con los aprendizajes del proyecto |
| hookify | `/plugin install hookify@claude-plugins-official` | Convertir las reglas anti-genérico críticas (§6.3) en avisos automáticos |
| github | `/plugin install github@claude-plugins-official` | Issues, PRs y estado de GitHub Pages |

### 3.3 Según el proyecto

| Herramienta | Instalación | Cuándo |
|---|---|---|
| figma | `/plugin install figma@claude-plugins-official` | El cliente o un diseñador entrega Figma (tokens, componentes) |
| example-skills (Anthropic) | `/plugin marketplace add anthropics/skills` → `/plugin install example-skills@anthropic-agent-skills` | `webapp-testing`, `theme-factory`, `canvas-design` (imágenes OG y piezas sociales), `algorithmic-art` (fondos generativos para Awwwards). Trae otra copia de `frontend-design`: deja activa solo una |
| firecrawl | `/plugin install firecrawl@claude-plugins-official` | Migrar mucho contenido del sitio actual del cliente |
| cloudinary | `/plugin install cloudinary@claude-plugins-official` | Catálogos o listados con cientos de imágenes |
| canva | `/plugin install canva@claude-plugins-official` | Piezas de lanzamiento para redes |
| supabase | `/plugin install supabase@claude-plugins-official` | Solo modo Core: leer esquema, tipos y logs de Edge Functions (nunca ejecutar migraciones) |
| cloudflare | `/plugin install cloudflare@claude-plugins-official` | Turnstile, Workers o despliegue en Cloudflare |
| claude-security | `/plugin install claude-security@claude-plugins-official` | Escaneo profundo multi-agente antes del lanzamiento |
| `/security-review` | integrado | Pase de seguridad del branch antes de producción |

### 3.4 Higiene del entorno (Fase 0)

- `claude plugin list`: los plugins de tu cuenta de claude.ai aparecen como `<nombre>@synced`. **No instales duplicados:** si ya existe `modern-web-guidance@synced` o `security-guidance@synced`, usa esa copia.
- Desactiva lo que no aplica al proyecto (por ejemplo, los plugins de Shopify/Liquid si el sitio no es Shopify): `/plugin` → pestaña **Installed** → `Espacio`.
- Activa `supabase` y `cloudflare` solo en la Fase 6. Usa `--chrome` cuando haga falta en vez de dejar Chrome activado por defecto (consume contexto).
- Con UI Skills, deja que el router (`npx ui-skills start`) elija el set mínimo por tarea en vez de cargar el catálogo completo (§3.6).
- Plugins de proyecto para sesiones en la nube o colaboradores: decláralos en `.claude/settings.json` (§11.2).

### 3.5 Subagentes del proyecto (`.claude/agents/`)

Crea estos cinco. Corren en segundo plano y en paralelo durante el QA.

| Archivo | Rol | Entrega |
|---|---|---|
| `director-de-arte.md` | Critica capturas contra `docs/03-direccion-de-arte.md` y la rúbrica §10.3 | Puntaje por criterio + hallazgos priorizados |
| `auditor-rendimiento.md` | Traza móvil con red lenta (chrome-devtools-mcp) + `lighthouse_audit`; compara contra §7 | LCP/INP/CLS, JS por página, causas y fixes |
| `auditor-a11y.md` | axe (Playwright), teclado, foco, contraste, lector de pantalla, reduced-motion | Lista WCAG con severidad |
| `auditor-seo.md` | Metas, hreflang, canonical, sitemap, JSON-LD, headings, enlaces | Checklist §10.4 con estado |
| `copy-es-en.md` | Voz, claridad y paridad ES/EN; marca afirmaciones sin respaldo | Cambios sugeridos |

Formato (ejemplo; los demás siguen el mismo patrón):

```markdown
---
name: director-de-arte
description: Crítica visual de secciones terminadas contra la dirección de arte y la rúbrica arte web. Úsalo al cerrar cada sección y antes de cada GATE.
disallowedTools: Edit, Write, NotebookEdit
model: inherit
---
Eres director de arte senior de un estudio premiado. Revisa capturas a 375/768/1280/1920 px
y el código de la sección contra docs/03-direccion-de-arte.md y la rúbrica de BRIEF.md §10.3.
No edites archivos. Devuelve: puntaje por criterio (1–5), los 5 problemas de mayor impacto con
la corrección concreta (archivo, selector, valor) y qué haría memorable esta sección.
```

### 3.6 UI Skills e impeccable (ya instalados): mapa por fase

Ambos ya están instalados en el entorno: Claude **no los reinstala**, los verifica y los usa. En la Fase 0:

- Lista lo instalado (`ls .claude/skills ~/.claude/skills 2>/dev/null`) y escribe `/` en Claude Code para ver cómo quedó expuesto cada uno. Anota en `CLAUDE.md` los slugs disponibles.
- **impeccable:** según la versión instalada se invoca como `/impeccable <comando>` o como skills sueltas (`/audit`, `/polish`, `/critique`…). Usa la forma que exista. Corre `init` una sola vez por proyecto, alimentado con este BRIEF: genera `PRODUCT.md`, que debe apuntar a `BRIEF.md` en vez de duplicarlo.
- **UI Skills:** `npx ui-skills start` imprime el router (`ui-skills-root`), que elige el set mínimo de skills para cada tarea. Lo que no esté instalado se trae como contexto puntual con `npx ui-skills get <slug>`; para explorar, `npx ui-skills list --category motion`.

| Fase | UI Skills (slug) | impeccable |
|---|---|---|
| 1 · Auditoría | `improve-ui`, `web-quality-audit`; `redesign-existing-projects` si el cliente ya tiene sitio | `critique` sobre las referencias |
| 2 · Estrategia y copy | `landing-page`, `design-first-ui-prompting` | `shape`, `clarify` |
| 3 · Dirección de arte | `create-design-md` (para `docs/03-direccion-de-arte.md`), `better-colors` u `oklch-skill`, `better-typography`, `swiss-design` + **una** skill de gusto acorde al territorio (`high-end-visual-design`, `minimalist-ui`, `design-taste-frontend`…) | `shape`, `colorize`, `typeset` |
| 4–5 · Movimiento | `animation-systems`, `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins` (oficiales de GreenSock), `gsap-scrolltrigger-storytelling`, `masked-reveal`, `marquee-loop`, `progressive-blur`, `12-principles-of-animation`, `to-spring-or-not-to-spring`, `accessible-animation` | `animate`, `delight` |
| 4–5 · Construcción | `baseline-ui`, `interaction-design`, `make-interfaces-feel-better`, `better-ui`, `company-logos` (afiliaciones), `container-lines`, `beautiful-shadows` | `craft`, `layout`, `adapt`, `harden` |
| 5 · Solo Awwwards | `threejs-fundamentals`, `threejs-shaders`, `threejs-postprocessing`, `threejs-loaders`, `webgl-landing-steering` | `overdrive`, `bolder` |
| 7 · QA | `web-design-guidelines`, `fixing-accessibility`, `wcag-audit-patterns`, `fixing-motion-performance`, `gsap-performance`, `review-animations`, `improve-animations`, `fixing-metadata` | `audit`, `critique`, `optimize` y `polish` como último pase |

Reglas de uso:

- **Router primero:** ante cada tarea de UI o motion, `npx ui-skills start` y carga solo lo que recomiende. Nunca decenas de skills a la vez.
- **Una sola skill de gusto por proyecto**, la que encaje con el territorio aprobado en el GATE 3, registrada en un ADR. Mezclar `minimalist-ui`, `industrial-brutalist-ui` y `high-end-visual-design` produce un sitio sin identidad.
- Las skills de GSAP se aplican **dentro** del motor de §4.6 (atributos `data-*`), no como animaciones sueltas por sección.
- Ignora las skills de otros stacks (Vue, React/Next, SwiftUI, shadcn, Tailwind, daisyUI) salvo que el proyecto los use.
- Si el catálogo duplica algo que ya está como plugin (`frontend-design`, `canvas-design`), deja una sola copia activa.
- Si una skill contradice la §2.2 o el BRIEF, mandan la §2.2 y el BRIEF.

---

## 4. Stack y arquitectura

### 4.1 Stack base

| Capa | Elección | Nota |
|---|---|---|
| Runtime | Node 24 LTS | Astro exige ≥ 22 |
| Framework | **Astro 7** (salida estática) | Compilador en Rust, Vite 8. Layouts y componentes compartidos = cero boilerplate repetido |
| Lenguaje | TypeScript estricto | `astro check` en el build |
| Estilos | CSS moderno sin framework: custom properties, `@layer`, nesting, `clamp()`, `oklch()`, container queries | Tailwind v4 solo si el proyecto lo pide |
| Fuentes | Fonts API de Astro (`<Font />`: self-hosting, fallbacks y preload automáticos) | Máx. 2 familias + 1 mono opcional |
| Imágenes | `astro:assets` (`<Image>`, `<Picture>`, AVIF/WebP) | La imagen LCP nunca es lazy |
| Movimiento | **GSAP 3.15** (ScrollTrigger, SplitText, Flip, DrawSVG, MorphSVG: todos gratis) + **Lenis 1.3** | CSS scroll-driven y View Transitions como mejora progresiva |
| WebGL (solo Awwwards) | Three.js r186 u OGL (más liviano) + `detect-gpu` | Diferido tras el LCP, con respaldo |
| Carruseles | Embla Carousel 8 | Liviano y accesible |
| Mapas | Imagen estática + enlace; Leaflet 1.9 bajo demanda ("ver mapa") | Nunca un mapa pesado en la carga inicial |
| SEO | `@astrojs/sitemap` (con i18n), componente `<Seo />`, JSON-LD tipado con `schema-dts` | — |
| Calidad | Prettier + `prettier-plugin-astro`, Playwright + `@axe-core/playwright`, Lighthouse CI, detector de fluid | Scripts en §4.8 |
| Hosting | GitHub Pages vía Actions (dominio propio con `public/CNAME`) | Cloudflare si hace falta edge o SSR |

> Al iniciar, verifica versiones actuales (`npm view <paquete> version`) y APIs exactas con context7. Las de esta tabla son las verificadas en octubre de 2026.

### 4.2 Estructura del repo

```text
/
├─ BRIEF.md                      ← esta plantilla, llena
├─ CLAUDE.md                     ← memoria del proyecto (§11.1)
├─ .claude/
│  ├─ settings.json              ← plugins del proyecto + permisos (§11.2)
│  ├─ agents/                    ← subagentes (§3.5)
│  └─ claude-security-guidance.md ← reglas de seguridad del proyecto (§11.3)
├─ docs/
│  ├─ 00-plan.md   01-auditoria.md   02-estrategia.md   03-direccion-de-arte.md
│  ├─ decisiones.md              ← ADRs cortos (Anexo D)
│  ├─ pendientes.md              ← lo que falta del cliente
│  └─ qa/                        ← reportes, trazas y capturas por fase
├─ design/                       ← artboards .dc.html y exports (referencia, no producción)
├─ public/                       ← CNAME, robots.txt, favicons, og/
├─ src/
│  ├─ assets/                    ← img/, video/, models/ (procesados por Astro)
│  ├─ components/
│  │  ├─ ui/                     ← Button, Link, Tag, Icon, Field, Dialog…
│  │  ├─ sections/               ← Hero, Services, Process, Testimonials…
│  │  └─ modules/                ← cotizador/, catalogo/, listados/, citas/
│  ├─ content/                   ← servicios/, catalogo/, listados/, testimonios/, proyectos/, faq/, equipo/
│  ├─ content.config.ts
│  ├─ data/                      ← site.ts (NAP, redes, horario), nav.ts, cotizador.config.json
│  ├─ i18n/                      ← es.json, en.json, routes.ts, utils.ts
│  ├─ layouts/                   ← Base.astro, Page.astro
│  ├─ lib/                       ← motion/, format.ts, analytics.ts, schema.ts, core-client.ts
│  ├─ pages/                     ← es en la raíz; en/ con slugs traducidos
│  └─ styles/                    ← tokens.css, base.css, motion.css, utilities.css
└─ tests/                        ← e2e/, a11y/, visual/
```

### 4.3 Configuración base

```js
// astro.config.mjs (las fuentes las define la Fase 3)
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://{{DOMINIO}}',
  trailingSlash: 'always',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false }, // es en "/", en en "/en/"
  },
  integrations: [
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-CR', en: 'en' } } }),
  ],
  fonts: [
    { provider: fontProviders.fontsource(), name: '{{FUENTE_DISPLAY}}', cssVariable: '--font-display',
      weights: [400, 700], styles: ['normal'], subsets: ['latin'] },
    { provider: fontProviders.fontsource(), name: '{{FUENTE_TEXTO}}', cssVariable: '--font-text',
      weights: [400, 500, 600], styles: ['normal', 'italic'], subsets: ['latin'] },
  ],
  // security: { csp: true }, // activar en la Fase 7 y permitir GA4/Pixel si se usan (verificar con context7)
});
```

En `Base.astro`: `<Font cssVariable="--font-display" preload />` (import desde `astro:assets`) y, antes de cualquier CSS, `<script is:inline>document.documentElement.classList.add('js')</script>` para que los estados iniciales de animación solo apliquen con JS.

### 4.4 Modelo de contenido (multisector)

Cada sector cambia **qué** se cataloga, no la estructura: las características van en `specs` (label/valor), así el mismo esquema sirve para casas, autos o paquetes de novia.

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const lang = z.enum(['es', 'en']);
const spec = z.object({ label: z.string(), valor: z.string(), icono: z.string().optional() });
const precio = z.object({
  monto: z.number().positive(),
  moneda: z.enum(['CRC', 'USD']),
  desde: z.boolean().default(false),
});

const catalogo = defineCollection({
  loader: glob({ base: './src/content/catalogo', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    lang,
    titulo: z.string(),
    categoria: z.string(),
    resumen: z.string().max(160),
    portada: image(),
    galeria: z.array(image()).default([]),
    specs: z.array(spec).default([]),      // m², habitaciones, cilindrada, duración…
    precio: precio.optional(),            // solo si el cliente lo confirmó
    estado: z.enum(['disponible', 'reservado', 'vendido', 'proximamente']).default('disponible'),
    destacado: z.boolean().default(false),
    traduccionDe: z.string().optional(),  // id de la entrada equivalente en el otro idioma
  }),
});

const testimonios = defineCollection({
  loader: glob({ base: './src/content/testimonios', pattern: '**/*.md' }),
  schema: z.object({
    lang,
    nombre: z.string(),
    contexto: z.string(),                 // proyecto, servicio o ubicación
    fecha: z.coerce.date(),
    fuente: z.enum(['google', 'facebook', 'instagram', 'directo']),
    urlFuente: z.string().optional(),
    verificado: z.literal(true),          // el build falla si alguien intenta un testimonio sin respaldo
  }),
});

export const collections = { catalogo, testimonios /* servicios, listados, proyectos, faq, equipo, campanas */ };
```

- `listados`: como `catalogo` + `ubicacion`, `coords` (opcional), `atributos` (spec[]), `etiquetas`, `publicado`.
- `servicios`, `proyectos`, `equipo`, `faq`, `campanas`: mismo patrón, campos mínimos.
- **Modo híbrido-core:** `catalogo` y `listados` pueden usar un loader de build que lea el endpoint público de Core (solo campos públicos). El sitio sigue siendo estático; Core dispara `repository_dispatch` (`core-content-updated`) para reconstruir cuando cambie el inventario. Las *live collections* de Astro requieren renderizado bajo demanda: no aplican en GitHub Pages.

### 4.5 Internacionalización

- ES en la raíz y EN en `/en/` con **slugs traducidos** (`/catalogo/` ↔ `/en/catalog/`) mediante un mapa de rutas en `src/i18n/routes.ts`.
- Textos de interfaz en `src/i18n/{es,en}.json`; contenido con `lang` + `traduccionDe`.
- El selector de idioma lleva a la **página equivalente**, no al inicio. `<html lang>`, `hreflang` (es-CR, en, x-default) y `og:locale` por página.
- Dinero con un helper único `formatMoney()` en `src/lib/format.ts`. Ojo: `Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' })` agrupa con espacios (`₡18 741 060`); si el cliente usa puntos (`₡18.741.060`), reemplaza el separador con `formatToParts`. En EN: USD primero y ft² entre paréntesis si la audiencia es extranjera.
- Traducción humana de calidad (Claude redacta, el cliente valida). Nada de traductores automáticos en tiempo de ejecución.

### 4.6 Motor de movimiento (base para los tres niveles)

Si Structura ya tiene `motion.css` y curvas propias, reutilízalas; estos son los valores por defecto.

```css
/* src/styles/tokens.css (extracto de movimiento) */
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);       /* entradas: rápido al inicio, aterriza suave */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* cambios de estado */
  --ease-press: cubic-bezier(0.2, 0, 0, 1);        /* botón con peso */
  --dur-1: 160ms; --dur-2: 320ms; --dur-3: 640ms; --dur-4: 1100ms;
}

/* src/styles/motion.css: estados iniciales solo con JS, sin reduced-motion y hasta que el motor marque .is-in */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal]:not(.is-in) { opacity: 0; visibility: hidden; }
  .js [data-reveal='up']:not(.is-in) { transform: translateY(2.5rem); }
  .js [data-reveal='scale-blur']:not(.is-in) { transform: scale(0.94); filter: blur(12px); }
}
.btn { transition: transform var(--dur-1) var(--ease-press), background-color var(--dur-2) var(--ease-out); }
.btn:active { transform: translateY(1px) scale(0.97); }
```

```ts
// src/lib/motion/index.ts (verificar API exacta con context7)
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initMotion(root: ParentNode = document) {
  const mm = gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const lenis = new Lenis();                         // scroll suave sincronizado con ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.batch(root.querySelectorAll('[data-reveal]'), {   // reveals declarativos
      start: 'top 85%',
      once: true,
      onEnter: (els) => gsap.to(els, {
        autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)',
        duration: 1.1, ease: 'expo.out', stagger: 0.08,
        onComplete: () => {                            // estado final limpio: sin filter/transform residuales
          els.forEach((el) => el.classList.add('is-in'));
          gsap.set(els, { clearProps: 'opacity,visibility,transform,filter' });
        },
      }),
    });

    root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {  // titulares por líneas
      SplitText.create(el, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, {
          yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
      });
    });

    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  });
}
```

Reglas del motor:

- API declarativa por atributos: `data-reveal="up | scale-blur"`, `data-split`, `data-parallax="0.2"`, `data-magnetic`. Las variantes nuevas (por ejemplo `mask` con `clip-path`) se agregan dentro de este mismo motor; ninguna sección escribe su propio sistema de animación.
- Al terminar un reveal se limpian los estilos inline: un `filter` residual crea un bloque contenedor y rompe hijos con `position: fixed` (modales, menús).
- Solo se animan `transform`, `opacity` y `clip-path`; `filter: blur()` con moderación (pocos elementos, radios chicos). `will-change` solo durante la animación.
- El motor no compite con el LCP: lo crítico primero; lo demás se inicializa en `requestIdleCallback` o al acercarse al viewport. WebGL se pausa fuera de pantalla.
- Transiciones entre páginas: CSS `@view-transition { navigation: auto; }` + `view-transition-name` en el elemento compartido (tarjeta → ficha), como mejora progresiva. Usa `<ClientRouter />` (de `astro:transitions`) solo si hace falta persistir elementos (`transition:persist`, p. ej. un canvas WebGL); entonces el motor se destruye en `astro:before-swap` y se reinicia en `astro:page-load`. Documenta la elección en un ADR.
- Antes de usar scroll-driven animations, view transitions o popover, consulta `modern-web-guidance` y envuelve en `@supports`.

### 4.7 Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
  repository_dispatch:
    types: [core-content-updated]   # solo modo híbrido-core: Core pide reconstruir
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: withastro/action@v6
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

Dominio propio: `public/CNAME` con `{{DOMINIO}}`, `site` apuntando al dominio y sin `base`. El DNS lo configura Franklin.

### 4.8 Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "dev:bg": "astro dev --background",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/a11y",
    "lint:design": "npx fluid-skills detect src --strict",
    "lhci": "lhci autorun"
  }
}
```

`astro dev --background` deja el servidor corriendo como proceso administrado mientras Claude prueba con Chrome o Playwright.

---

## 5. Librería de módulos

Cada módulo define objetivo, comportamiento, movimiento por nivel (**P** Premium · **S** Signature · **A** Awwwards), accesibilidad/SEO y datos. Implementa solo los marcados en §1.7.

### M01 · Hero de marca
- **Objetivo:** en 3 segundos decir qué, para quién y dónde, con 1 CTA primario (+1 secundario).
- **Contenido:** H1 con propuesta concreta (no un eslogan vacío), subtítulo con prueba verificable, media propia del cliente, sellos de afiliaciones confirmadas.
- **Movimiento:** P: H1 por líneas con máscara + media con scale-in sutil. S: coreografía de entrada + capas con parallax. A: escena WebGL (distorsión o transición entre imágenes, o modelo 3D) cargada después del LCP, con imagen de respaldo.
- **Rendimiento:** la imagen o el poster del hero es el LCP: `<Picture>` AVIF, `fetchpriority="high"`, sin lazy. Video: `preload="none"` + poster; autoplay solo sin reduced-motion ni `Save-Data`, con botón de pausa (WCAG 2.2.2).

### M02 · Servicios
- Tarjetas que llevan a una **página por servicio** (H1 "servicio + zona", beneficios, proceso, FAQ, CTA). Schema `Service`.
- Movimiento: stagger de entrada; S+: hover con revelado de imagen.
- Sin páginas puerta: no clones una página por cantón con texto duplicado.

### M03 · Catálogo
- Grid con filtros del lado del cliente (categoría, rango de specs o precio) sincronizados con la URL; orden; estados (disponible, reservado, vendido, próximamente).
- **Ficha por ítem:** galería en `<dialog>` accesible, specs, planos, precio "desde" solo si está confirmado, descarga del PDF, CTA "Cotizar este modelo" que pre-llena el cotizador (`/cotizador/?item=<slug>`), relacionados.
- **Movimiento:** S: GSAP Flip al filtrar + elemento compartido tarjeta → ficha (`view-transition-name`). A: vista 3D o recorrido por scroll del ítem estrella.
- **SEO:** cada ficha indexable; `Product` + `Offer` solo con precio real; `BreadcrumbList`.
- **Hecho cuando:** filtros operables con teclado, resultados anunciados con `aria-live`, URL compartible, CLS 0 al filtrar.

### M04 · Cotizador
- Configuración 100 % en `src/data/cotizador.config.json` (Anexo B): pasos, campos, opciones, multiplicadores, tipo de cálculo y disclaimer. Sin `eval` ni fórmulas en texto: solo tipos de cálculo predefinidos.
- **Stepper accesible:** `<fieldset>`/`<legend>` por paso, progreso anunciado, validación nativa (`:user-invalid`), atrás y adelante sin perder datos (estado en la URL + `sessionStorage`).
- **Salida:** un **rango** ("entre ₡X y ₡Y"), desglose y disclaimer; nunca un monto exacto. **Si el cliente no aprueba valores, funciona en modo pre-cotización:** recoge requisitos y no muestra precio.
- **Envío:** WhatsApp con resumen pre-llenado (`https://wa.me/506XXXXXXXX?text=` con `encodeURIComponent`) y/o lead a Core (`cotizaciones`) con acuse por email.
- **Eventos:** `cotizador_inicio`, `cotizador_paso`, `cotizador_completo`, `lead_enviado`.
- **Movimiento:** S: transición entre pasos (clip-path o Flip) y conteo animado del rango. A: un visual que reacciona a la selección (por ejemplo, la casa crece con los m²).
- **Hecho cuando:** Playwright cubre camino feliz, validaciones, retroceso y envío; funciona con teclado y lector de pantalla.

### M05 · Listados con filtros
- Filtros (precio, ubicación, atributos, estado), orden y "cargar más"; filtros en la URL con `canonical` a la vista sin filtros.
- **Tarjeta:** foto, precio con moneda, ubicación, 3–4 atributos clave, etiqueta (nuevo, preventa, vendido).
- **Ficha:** galería, atributos, descripción, mapa bajo demanda, compartir (Web Share API), WhatsApp "Me interesa {título} · {URL}", similares; favoritos en `localStorage` (con try/catch).
- **SEO:** tipos de schema.org según el sector (inmueble, vehículo, producto), validados en el Rich Results Test.
- **Datos:** archivos en `src/content/listados/` o inventario de Core (loader de build + reconstrucción por `repository_dispatch`).

### M06 · Reservas / citas
- Core citas (`{{CORE_BOOKING_URL}}`), Cal.com o Calendly embebido bajo demanda, o WhatsApp con mensaje preparado. Mostrar "qué pasa después" en 3 pasos. Eventos `cita_iniciada` / `cita_confirmada`.

### M07 · Prueba social
- Testimonios reales (fuente + fecha), enlace al perfil de Google, afiliaciones con permiso. Cifras solo verificadas.
- Marquee pausable (estático con reduced-motion); carrusel Embla con controles visibles, sin autoplay o con pausa.
- **SEO:** no marques testimonios propios con `AggregateRating` esperando estrellas: Google no muestra reseñas que un negocio publica sobre sí mismo.

### M08 · Proceso / Cómo trabajamos
- 4–6 pasos con entregables y tiempos reales. S: línea de progreso con DrawSVG en una sección fijada. A: escena que cambia en cada paso.

### M09 · Proyectos / casos
- Antes y después accesible (`<input type="range">`), galería, datos del proyecto, testimonio vinculado. Schema `CreativeWork`.

### M10 · Nosotros / equipo
- Historia, valores, equipo con fotos reales, afiliaciones. Nada de "somos líderes" sin prueba.

### M11 · Campaña destacada
- Landing interna: propuesta, amenidades, plano, precio desde, disponibilidad real, formulario con etiqueta de campaña (Core `leads.campana`). Sin urgencia falsa ni contadores inventados.

### M12 · Contacto
- Formulario corto (nombre, teléfono, interés, mensaje; email opcional) + casilla de consentimiento (Ley 8968) + honeypot y Turnstile.
- **WhatsApp flotante:** no tapa CTAs, respeta `safe-area-inset`, se oculta sobre el footer.
- Horario con "abierto ahora" calculado en `America/Costa_Rica`; dirección con señas; mapa estático + enlace a Google Maps.
- **Schema:** subtipo de `LocalBusiness` con `geo`, `openingHoursSpecification` y `sameAs`; NAP idéntico al de Google Business Profile.

### M13 · FAQ
- `<details>`/`<summary>` nativo. `FAQPage` solo como semántica: Google limita ese resultado enriquecido a sitios gubernamentales y de salud.

### M14 · Blog / noticias
- Colección MD/MDX, schema `Article`, RSS, autor real.

### M15 · Legal
- Política de privacidad conforme a la Ley 8968 (consentimiento informado en formularios), términos del cotizador y aviso de cookies si hay analítica o píxel. Es un borrador para revisión del cliente, no asesoría legal.

### M16 · Área de clientes
- Solo con Core (Supabase Auth): enlace al portal. Nunca autenticación casera en el sitio estático.

### Componentes globales
Header sticky (se oculta al bajar y reaparece al subir; menú móvil en `<dialog>` con foco atrapado) · Footer (NAP, legales, redes, idioma, "Sitio por Structura") · selector de idioma · botón de WhatsApp · 404 diseñada · favicon e imagen OG por página · cursor contextual (S/A, solo `pointer: fine`) · preloader (solo A: primera visita, ≤ 1,2 s, saltable).

### 5.1 Presets por sector

Puntos de partida para la Fase 3, no plantillas visuales.

| Sector | Catálogo | Cotizador | Listados | Citas | Detonante de concepto |
|---|---|---|---|---|---|
| Ingeniería, construcción, inmobiliaria | Modelos de casa, planos | m² × nivel de acabados | Propiedades, lotes, preventas | Asesoría / visita | "Del plano a la llave": líneas de plano que se convierten en la casa real |
| Automotriz y talleres | Vehículos, servicios | Mantenimiento por tipo de vehículo | Inventario de autos (Core) | Taller / prueba de manejo | Showroom nocturno: la luz recorre la carrocería con el scroll |
| Belleza y estética | Servicios, paquetes de novia | Paquete por evento y personas | — | Reserva (Core citas) | Editorial de moda: textura, piel, luz suave |
| Cuidado infantil y educación | Programas, cursos | Mensualidad por modalidad | Grupos y horarios | Visita guiada | Ilustración propia que cobra vida |
| Comercio y servicios locales | Productos, servicios | Presupuesto por pedido | — | Opcional | El oficio en primer plano: manos, proceso, detalle |
| Servicios profesionales y salud | Servicios | — | — | Consulta | Calma y precisión: espacio, datos, tipografía |

---

## 6. Dirección de arte y sistema visual

### 6.1 Proceso (Fase 3)

1. **Diagnóstico:** marca del cliente + 3–5 competidores locales. Lista lo que todos hacen igual (eso se evita).
2. **Tres territorios distintos en forma, no solo en color.** Para cada uno: nombre, idea en una frase, por qué encaja con el negocio, paleta (oklch), pareja tipográfica, tratamiento fotográfico, lenguaje de movimiento, layout firma, momentos firma (§7) y riesgos. Herramientas: `fluid` → `design-system`, impeccable `shape`, UI Skills de dirección de arte (§3.6), `frontend-design`.
3. **Artboards** con `/design` (o Claude Design web) del territorio favorito y una alternativa: home en desktop y móvil, sección firma, catálogo o listado, ficha y cotizador.
4. **GATE 3:** Franklin elige territorio y artboards.
5. **Consolidación:** `docs/03-direccion-de-arte.md` (concepto, reglas, sí/no, momentos firma, guía de fotografía) + `src/styles/tokens.css`.

### 6.2 Tokens

```css
/* src/styles/tokens.css: valores definidos en la Fase 3 */
@layer tokens {
  :root {
    /* Color: oklch y neutrales tintados (nunca #000 ni #fff puros) */
    --c-ink:    oklch(0.20 0.02 {{HUE}});
    --c-paper:  oklch(0.97 0.01 {{HUE}});
    --c-brand:  oklch({{L}} {{C}} {{H}});
    --c-accent: oklch({{L2}} {{C2}} {{H2}});   /* 1 acento, usado con disciplina */
    --c-muted:  color-mix(in oklch, var(--c-ink) 60%, var(--c-paper));

    /* Tipografía fluida */
    --step--1: clamp(0.83rem, 0.80rem + 0.15vw, 0.90rem);
    --step-0:  clamp(1.00rem, 0.95rem + 0.25vw, 1.13rem);
    --step-1:  clamp(1.25rem, 1.15rem + 0.50vw, 1.50rem);
    --step-2:  clamp(1.56rem, 1.35rem + 1.00vw, 2.10rem);
    --step-3:  clamp(1.95rem, 1.60rem + 1.80vw, 3.00rem);
    --step-4:  clamp(2.44rem, 1.80rem + 3.20vw, 4.50rem);
    --step-5:  clamp(3.05rem, 2.00rem + 5.20vw, 7.00rem);   /* titulares editoriales */
    --leading-tight: 0.95; --leading-body: 1.55; --tracking-display: -0.02em;

    /* Espacio, forma y medios */
    --space-xs: clamp(0.5rem, 0.45rem + 0.25vw, 0.75rem);
    --space-s:  clamp(1rem, 0.90rem + 0.50vw, 1.5rem);
    --space-m:  clamp(2rem, 1.70rem + 1.50vw, 3rem);
    --space-l:  clamp(4rem, 3.20rem + 4.00vw, 7rem);
    --radius-s: 4px; --radius-m: 12px;
    --aspect-hero: 16 / 9; --aspect-card: 4 / 5;
  }
}
```

### 6.3 Reglas anti-genérico

| Evitar | En su lugar |
|---|---|
| Inter, Roboto, Arial, Open Sans o Poppins como fuente principal; Space Grotesk por defecto; más de 2 familias | Una pareja con carácter elegida por concepto; máximo 2 familias (+1 mono) |
| Degradados morados o neón genéricos; texto con degradado | Paleta derivada de la marca; 1 acento con disciplina |
| Negro y gris puros | Neutrales tintados con el matiz de la marca |
| Hero centrado + 2 botones + 3 tarjetas de "features" por defecto | Un layout con una idea: editorial, asimetría, escala, ritmo |
| Todo en tarjetas, tarjetas dentro de tarjetas, sombras genéricas | Jerarquía por tipografía, espacio y línea |
| `transition: all`, animar `width/height/top/left`, `scale(0)`, `ease-in` en entradas, bounce o elastic, duraciones de UI > 1,2 s | `transform`/`opacity`, `ease-out` en entradas, curvas de la casa, ruta para reduced-motion |
| Componentes de Aceternity o Magic UI copiados tal cual; emojis como íconos | Componentes propios; un solo set de íconos o SVG propios |
| Stock genérico o imágenes de IA presentadas como obra real del cliente | Fotos reales con tratamiento consistente; IA solo para texturas o abstractos |
| Texto gris sobre color; contraste bajo AA | Contraste AA mínimo medido, AAA en texto largo cuando sea posible |
| Carruseles automáticos sin pausa, popups invasivos, urgencia falsa | Control del usuario, cero trucos |
| Lorem ipsum o placeholders en producción | Contenido real o `PENDIENTE` visible solo en desarrollo (gate `output` de fluid) |

Convierte las filas críticas en avisos automáticos con `hookify`, y corre `npm run lint:design` (detector de fluid) en cada sección.

### 6.4 Fotografía y media

- Fotos reales del cliente por encima de todo. Si no hay o son débiles, Claude genera `docs/shotlist.md` (fachadas en hora dorada, interiores con luz natural, detalles de materiales, equipo trabajando, proceso, clientes reales con permiso) para coordinar una sesión.
- Tratamiento consistente: misma curva de color, recortes por tokens de aspecto, máscaras o duotono para secundarias.
- Video: loops de 6–12 s, sin audio, ≤ 3 MB (H.264 + WebM/AV1), poster optimizado.

### 6.5 Copy y microcopy

- Voz según `voz` del BRIEF. Titulares con beneficio concreto; CTAs con verbo + resultado ("Cotizá tu casa en 2 minutos").
- Microcopy escrito a propósito para formularios, errores, estados vacíos y confirmaciones.
- EN adaptado a su audiencia (expats o inversionistas: USD primero, ft², referencias de ubicación), no traducido literal.
- Sin relleno ("soluciones integrales", "somos líderes") que no tenga prueba.

---

## 7. Niveles de "arte web"

| | **Premium** | **Signature** | **Awwwards** |
|---|---|---|---|
| Ideal para | Negocio local que debe verse top y convertir | Marca que quiere diferenciarse con claridad | Proyecto insignia, lanzamiento, marca aspiracional |
| Momentos firma | 1 | 2–3 | 4–5 |
| Movimiento | Motor de la casa: Lenis, reveals scale/blur y máscara, titulares por líneas, botón con peso, hovers con intención, marquee, View Transitions entre páginas | + secciones fijadas con ScrollTrigger, DrawSVG/MorphSVG, Flip en filtros, galería horizontal, elemento compartido entre páginas, cursor contextual, botones magnéticos | + WebGL: shaders sobre imágenes, transiciones por desplazamiento, modelo o escena 3D con cámara por scroll, ruido o partículas, preloader de marca |
| JS por página (gzip, sin analítica) | ≤ 90 KB | ≤ 160 KB | ≤ 160 KB inicial + WebGL diferido (≤ 500 KB total) |
| LCP móvil (Lighthouse, red lenta) | ≤ 2,0 s | ≤ 2,3 s | ≤ 2,5 s |
| INP / CLS | ≤ 200 ms / ≤ 0,05 | ≤ 200 ms / ≤ 0,05 | ≤ 200 ms / ≤ 0,05 |
| Lighthouse móvil (Perf · A11y · BP · SEO) | ≥ 95 · 100 · 100 · 100 | ≥ 90 · 100 · 100 · 100 | ≥ 85 · 100 · 100 · 100 |
| Respaldo | Sin JS = contenido completo | + reduced-motion = versión estática cuidada | + sin WebGL o GPU débil (`detect-gpu`) = imagen o video |
| Herramientas clave | fluid, impeccable `animate`, UI Skills `animation-systems` · `masked-reveal` · `gsap-scrolltrigger` | + Flip/DrawSVG, impeccable `delight`, `gsap-scrolltrigger-storytelling` · `interaction-design` | + impeccable `overdrive`, `threejs-*` · `webgl-landing-steering`, Three.js/OGL vía context7, `algorithmic-art` |

**Momento firma:** una interacción memorable ligada al concepto, que alguien describiría al contar del sitio ("cuando bajas, el plano se dibuja y se convierte en la casa"). Cada uno se diseña en la Fase 3, se nombra en `docs/03-direccion-de-arte.md` y tiene su versión reduced-motion.

> Un 100 en accesibilidad de Lighthouse no prueba accesibilidad: también se hacen las pruebas manuales de §10.2.

---

## 8. Integración con Core (modo híbrido, opcional)

```text
Sitio Astro (estático)
  │  POST { site_key público, token Turnstile, datos }
  ▼
Edge Function `site-intake` (Supabase, repo de Core)
  │  valida origen + Turnstile + límite de tasa + esquema
  │  resuelve business_id desde site_key (del lado servidor)
  │  inserta con service role · notifica con Resend
  ▼
Core: leads · cotizaciones · citas

Build de Astro ──GET──▶ endpoint de solo lectura (catálogo e inventario: solo campos públicos)
Core ──repository_dispatch: core-content-updated──▶ GitHub Actions reconstruye el sitio
```

1. **El sitio nunca conoce ni envía `business_id` ni UUIDs:** solo un `site_key` público, rotable y mapeado en Core.
2. **La Edge Function valida:** método y `Content-Type`, `Origin` contra la lista permitida del tenant, token de Turnstile del lado servidor, límite de tasa por IP + `site_key`, tamaño y esquema del payload, honeypot.
3. **RLS activo en todo:** `anon` sin INSERT ni SELECT directos sobre tablas de negocio; las lecturas públicas salen de vistas o endpoints con campos públicos, filtrados por tenant.
4. **Migraciones:** Claude las escribe en el repo de Core (`supabase/migrations/`), con `GRANT` explícitos para `anon`, `authenticated` y `service_role`. **Franklin revisa y ejecuta `supabase db push`.** Si `site-intake` aún no existe, se crea como tarea aparte en el repo de Core, con aprobación.
5. **Sin secretos en el repo del sitio:** `.env*` y `supabase/.temp/` en `.gitignore`.
6. **Resiliencia:** si Core no responde en 8 s, el usuario recibe el botón de WhatsApp con su resumen. Un lead nunca se pierde.
7. **Modo estático:** los mismos formularios contra `{{FORM_ENDPOINT}}` o WhatsApp, con honeypot (y Turnstile si el servicio lo soporta).

Contrato del payload en el Anexo C. Copia estas reglas en `.claude/claude-security-guidance.md` (§11.3) para que `security-guidance` las vigile.

---

## 9. Plan de ejecución por fases

Cada fase termina en un **GATE**: Claude presenta evidencia (capturas, URL de preview, métricas, documento) y espera aprobación explícita antes de seguir.

### Fase 0 · Preparación (sin código de producto)
1. `claude --version` (≥ 2.1.234) y `node -v` (24 LTS).
2. `claude plugin list` → instala lo que falte del núcleo (§3.1), desactiva lo que no aplica (§3.4) y reporta el costo de contexto de lo activo.
3. Verifica UI Skills e impeccable sin reinstalarlos (§3.6): slugs disponibles, forma de invocar impeccable, `npx ui-skills start` funcionando. Corre `init` de impeccable con este BRIEF.
4. Crea `CLAUDE.md` (§11.1), `.claude/settings.json` (§11.2), `.claude/claude-security-guidance.md` (§11.3), `.claude/agents/` (§3.5) y `docs/`.
5. Con `hookify`, convierte en avisos las reglas críticas de §6.3.
6. Analiza el BRIEF: lista PENDIENTES, supuestos y riesgos; haz hasta 4 preguntas con opciones.
- **Entregable:** `docs/00-plan.md` (módulos, nivel, mapa de páginas preliminar, calendario por fases, riesgos, lo que se necesita del cliente).
- **GATE 0:** plan aprobado.

### Fase 1 · Auditoría y descubrimiento
Herramientas: Claude in Chrome, chrome-devtools-mcp, firecrawl (opcional), búsqueda web.
1. Audita las referencias de §1.4: arquitectura, módulos, patrones de conversión y rendimiento (`performance_start_trace` en móvil + `lighthouse_audit`). Anota aciertos y errores (por ejemplo: demasiadas familias tipográficas, carruseles genéricos, plugins pesados).
2. Audita la presencia actual del cliente (sitio, Instagram, Google Business Profile) y a 3–5 competidores locales.
3. Extrae el contenido real utilizable (textos, servicios, precios publicados, fotos) → `docs/inventario-contenido.md`.
4. Define 5 oportunidades de diferenciación.
- **Entregable:** `docs/01-auditoria.md` + capturas en `docs/qa/fase-1/`.
- **GATE 1:** puede fusionarse con el GATE 2.

### Fase 2 · Estrategia, arquitectura de información y contenido
1. Sitemap ES/EN con slugs traducidos; una conversión primaria por página; recorridos por persona.
2. Mapa de palabras clave local (servicio + zona) sin páginas puerta; plan de schema por página.
3. Adapta el modelo de contenido (§4.4) al sector; carga contenido real en `src/content/`; lo faltante va a `docs/pendientes.md`.
4. Copy ES en la voz del BRIEF + EN adaptado; microcopy de formularios y errores.
- **Entregable:** `docs/02-estrategia.md`.
- **GATE 2:** sitemap y copy del home aprobados.

### Fase 3 · Dirección de arte (Claude Design)
Herramientas: `fluid` (`design-system`, `brandkit`), impeccable (`shape`, `colorize`, `typeset`), UI Skills de dirección de arte (§3.6), `frontend-design`, `/design` o claude.ai/design, `figma` si hay archivos.
1. Proceso de §6.1: tres territorios → artboards del favorito + una alternativa (en `design/`).
2. Momentos firma según el nivel (§7) y lenguaje de movimiento (curvas, duraciones, coreografía).
3. Define fuentes (actualiza `astro.config.mjs`), tokens y guía de fotografía.
- **Entregables:** `docs/03-direccion-de-arte.md`, `src/styles/tokens.css`, artboards.
- **GATE 3:** territorio y artboards aprobados.

### Fase 4 · Arquitectura y base técnica (en plan mode)
Herramientas: plan mode, `context7`, `modern-web-guidance`, `feature-dev`, `github`.
1. Scaffolding Astro 7 (§4): configuración, i18n, colecciones, layouts, `<Seo />`, analítica diferida, `formatMoney()`.
2. Motor de movimiento (§4.6) + componentes UI base con todos sus estados (hover, focus-visible, active, disabled, loading, error).
3. CI de deploy (§4.7) + Playwright, axe y Lighthouse CI configurados.
- **Entregable:** URL de preview navegable con el sistema base funcionando.
- **GATE 4:** estructura y motor validados en el navegador.

### Fase 5 · Construcción por secciones
Orden: globales (header, footer, WhatsApp, selector de idioma) → home → páginas de módulos → fichas → legales y 404.

Ciclo por sección:
1. Implementa desde el artboard + tokens (se reimplementa, no se pega el `.dc.html`). Antes de cada patrón de UI o motion: router de UI Skills (`npx ui-skills start`) para elegir las skills del caso + `modern-web-guidance` para la API correcta.
2. Verifica en navegador real a 375 / 768 / 1280 / 1920 px, con teclado y con reduced-motion.
3. `npm run lint:design` → 0 avisos.
4. impeccable `critique` + subagente `director-de-arte` con capturas → corrige lo de mayor impacto.
5. Commit atómico.

Módulos complejos (cotizador, filtros, listados): flujo de `feature-dev`.
- **GATE 5:** home completa aprobada **antes** de replicar el sistema al resto del sitio.

### Fase 6 · Integraciones
1. Formularios + WhatsApp con mensajes pre-llenados + eventos de analítica (§10.4), cargados sin bloquear.
2. Modo Core (si aplica): §8, con el plugin `supabase` para leer esquema y logs; las migraciones solo se escriben.
3. E2E del flujo de lead completo en preview.
- **GATE 6:** lead de prueba recibido de punta a punta (Core, email o WhatsApp).

### Fase 7 · QA "arte web"
Lanza en paralelo `auditor-rendimiento`, `auditor-a11y`, `auditor-seo` y `copy-es-en`; después, `director-de-arte`.
1. Rendimiento: trazas y `lighthouse_audit` en móvil con red lenta contra el presupuesto de §7; Lighthouse CI.
2. Accesibilidad: matriz de §10.2.
3. Multinavegador con Playwright + iPhone y Android reales.
4. SEO: checklist de §10.4, con JSON-LD validado.
5. Calidad visual: set de QA de UI Skills (§3.6: `web-design-guidelines`, `fixing-motion-performance`, `review-animations`, `fixing-accessibility`, `fixing-metadata`) → impeccable `audit` → `polish` como último pase; rúbrica de §10.3.
6. Código y seguridad: `code-review`, `code-simplifier`, `/security-review`; activa la CSP (`security.csp`) y verifica que nada se rompa.
- **Entregable:** `docs/qa/reporte-final.md` con números, capturas y pendientes.
- **GATE 7:** QA aprobado.

### Fase 8 · Lanzamiento y entrega
1. `public/CNAME` y `site` finales; DNS (Franklin); HTTPS forzado en GitHub Pages.
2. Deploy, smoke test con Playwright contra producción, sitemap enviado a Search Console, enlace desde Google Business Profile.
3. Para el cliente: `docs/manual-cliente.md` (cómo editar contenido o qué se gestiona en Core) y `docs/handoff.md` (stack, comandos, decisiones).
4. Para Structura: GIF o video del recorrido grabado con Claude in Chrome + capturas para el portafolio.
5. Con `claude-md-management`, actualiza `CLAUDE.md`; anota mejoras para esta plantilla en `docs/mejoras-plantilla.md`.
- **GATE 8:** publicación aprobada.

---

## 10. QA y definición de terminado

### 10.1 Presupuestos
Los del nivel elegido (§7), más: imagen LCP ≤ 150 KB en móvil · peso inicial del home ≤ 1,5 MB sin video · máximo 2 archivos de fuente precargados · 0 errores de consola · 0 enlaces rotos.

### 10.2 Matriz de pruebas

| Dimensión | Casos |
|---|---|
| Viewports | 360, 390, 768, 1024, 1280, 1440, 1920 |
| Navegadores | Chromium, WebKit y Firefox (Playwright) + Safari en iPhone y Chrome en Android reales |
| Modos | Sin JS · reduced-motion · solo teclado · lector de pantalla (VoiceOver o NVDA) · zoom 200 % · red lenta · EN |
| Flujos | Cotizador completo · filtros + ficha · cita · contacto · cambio de idioma en cada plantilla de página |

### 10.3 Rúbrica "arte web" (1–5 por criterio)

1. **Concepto:** idea central reconocible y coherente en todo el sitio.
2. **Tipografía:** carácter, jerarquía, ritmo, legibilidad.
3. **Composición:** grid, espacio, tensión, consistencia responsive.
4. **Color y materialidad:** paleta disciplinada, textura, fotografía tratada.
5. **Movimiento:** intención, curvas, coreografía, fluidez, ruta reduced-motion.
6. **Momentos firma:** memorables y ligados al concepto.
7. **Conversión:** CTA claro, fricción mínima, señales de confianza.
8. **Contenido:** real, específico, sin relleno; voz consistente en ES y EN.
9. **Rendimiento percibido:** instantáneo, sin tirones, sin saltos de layout.
10. **Accesibilidad:** teclado, contraste, lectores, movimiento reducido.
11. **Craft:** estados completos (hover, focus, active, disabled, vacío, error, carga), 404, favicon, imágenes OG.

**Umbral para publicar:** promedio ≥ 4,0 y ningún criterio < 3. **Nivel Awwwards:** promedio ≥ 4,5 y momentos firma ≥ 4.

### 10.4 SEO técnico y medición
- [ ] `title` ≤ 60 y `description` ≤ 155 caracteres, únicos por página; un solo H1.
- [ ] `hreflang` es-CR / en / x-default, `canonical`, `og:locale`; sitemap con i18n; `robots.txt`.
- [ ] Imagen OG 1200 × 630 por página clave.
- [ ] JSON-LD: subtipo de `Organization`/`LocalBusiness` + `WebSite` + `BreadcrumbList` + tipos por módulo, validados.
- [ ] NAP idéntico al de Google Business Profile; `sameAs` a redes oficiales.
- [ ] `alt` descriptivo y nombres de archivo con sentido; URLs limpias en el idioma de la página.
- [ ] Sin páginas puerta ni contenido duplicado entre zonas.
- [ ] Eventos GA4: `click_whatsapp`, `click_telefono`, `cotizador_inicio`, `cotizador_completo`, `lead_enviado`, `cita_iniciada`, `ver_item`, `descarga_catalogo`. Analítica cargada después de la interacción o en idle.

### 10.5 Definición de terminado
- [ ] Cero placeholders y cero `PENDIENTE` en producción (gate `output` de fluid).
- [ ] `npm run build` limpio (incluye `astro check`); `lint:design` en 0; E2E y a11y en verde.
- [ ] Presupuestos del nivel cumplidos en móvil y rúbrica ≥ umbral.
- [ ] Funciona sin JS, con reduced-motion y solo con teclado.
- [ ] ES y EN completos, con el selector llevando a la página equivalente.
- [ ] `/security-review` sin hallazgos abiertos; ningún secreto en el repo.
- [ ] Docs de entrega listos; `CLAUDE.md` actualizado.

---

## 11. Archivos semilla

### 11.1 `CLAUDE.md`

```markdown
# CLAUDE.md · {{NOMBRE_COMERCIAL}}

## Proyecto
Sitio corporativo ({{SECTOR}}) en Astro 7, salida estática. ES por defecto, EN en /en/.
Nivel visual: {{NIVEL}} · Datos: {{MODO_DATOS}} · Conversión primaria: {{CONVERSION_PRIMARIA}}
Fuentes de verdad: BRIEF.md · docs/03-direccion-de-arte.md · docs/decisiones.md · docs/pendientes.md

## Baseline
This project's Baseline target is Baseline Widely available.
Lo "Newly available" (View Transitions, scroll-driven animations) solo como mejora progresiva con @supports.
Consulta modern-web-guidance antes de escribir HTML/CSS/JS.

## Comandos
npm run dev | dev:bg | build | preview | test:e2e | test:a11y | lint:design | lhci

## Skills (ya instaladas, no reinstalar)
- UI Skills: router con `npx ui-skills start`; extra bajo demanda con `npx ui-skills get <slug>`. Slugs instalados: {{SLUGS_UI_SKILLS}}
- impeccable: se invoca como {{FORMA_IMPECCABLE}}; contexto del producto en PRODUCT.md (apunta a BRIEF.md).
- Mapa por fase y reglas: BRIEF.md §3.6 (una sola skill de gusto; GSAP siempre dentro de src/lib/motion).

## Reglas
- No inventar datos del negocio; lo faltante va a docs/pendientes.md.
- Tokens en src/styles/tokens.css; sin valores sueltos de color, espacio o tipografía en componentes.
- Movimiento solo vía src/lib/motion (atributos data-*), con transform/opacity y reduced-motion siempre.
- JS solo donde haya interacción real; el contenido funciona sin JS.
- Anti-genérico: BRIEF.md §6.3. lint:design en 0 antes de cada commit de UI.
- Verificar cada cambio visual en el navegador (375/768/1280/1920).
- Commits pequeños. Nunca push a main, DNS ni supabase db push sin aprobación.

## Flujo
Fases y GATES: BRIEF.md §9. Fase actual: {{FASE_ACTUAL}}.
```

### 11.2 `.claude/settings.json`

```json
{
  "enabledPlugins": {
    "frontend-design@claude-plugins-official": true,
    "modern-web-guidance@claude-plugins-official": true,
    "context7@claude-plugins-official": true,
    "chrome-devtools-mcp@claude-plugins-official": true,
    "playwright@claude-plugins-official": true,
    "security-guidance@claude-plugins-official": true,
    "feature-dev@claude-plugins-official": true,
    "commit-commands@claude-plugins-official": true
  },
  "permissions": {
    "allow": ["Bash(npm run *)", "Bash(npx astro *)", "Bash(npx fluid-skills detect *)", "Bash(npx playwright test *)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Bash(supabase db push *)", "Read(./.env)", "Read(./.env.*)"]
  }
}
```

- Habilitar un plugin en el proyecto no lo descarga: en cada máquina se instala una vez con `claude plugin install <nombre>@claude-plugins-official --scope project`. Si usas las copias `@synced` de tu cuenta, no dupliques.
- `fluid` viene de un marketplace de terceros: instálalo en scope de usuario (una vez, sirve para todos los proyectos). impeccable y UI Skills ya están instalados (§3.6).

### 11.3 `.claude/claude-security-guidance.md`

```markdown
# Guía de seguridad del proyecto
- Nunca exponer business_id, UUIDs internos ni URLs de funciones sin validación en el cliente; solo site_key público.
- Toda escritura hacia Core pasa por la Edge Function site-intake (Origin permitido, Turnstile, límite de tasa, validación de esquema).
- Prohibido innerHTML o set:html con datos de formularios, de la URL o contenido remoto sin sanitizar.
- Ninguna clave en el repo ni en el bundle; .env* y supabase/.temp/ en .gitignore.
- Parámetros de URL (filtros, cotizador) se validan contra listas permitidas antes de usarse.
- Enlaces externos con rel="noopener noreferrer"; formularios con honeypot.
```

---

## 12. Anexos

### A. Prompts por fase

```text
[F1] Audita {{URL}} con chrome-devtools-mcp: traza móvil con red lenta + lighthouse_audit.
     Resume arquitectura, módulos, patrones de conversión y errores en docs/01-auditoria.md, con capturas.

[F3] /design Home de {{NOMBRE_COMERCIAL}} · territorio "{{TERRITORIO}}" · hero con {{MEDIA}} ·
     3 composiciones distintas · desktop y móvil · usa docs/03-direccion-de-arte.md y src/styles/tokens.css

[F5] Implementa el artboard {{N}} de design/{{ARCHIVO}}.dc.html como componentes Astro con los tokens.
     No copies el HTML del artboard. Verifica en Chrome a 375/768/1280/1920 y corre npm run lint:design.

[F5] Corre npx ui-skills start y aplica las skills que recomiende para el reveal con máscara del hero
     (p. ej. masked-reveal + gsap-scrolltrigger), implementado dentro de src/lib/motion.

[F5] impeccable critique sobre src/components/sections/{{SECCION}}.astro   (forma de invocación: §3.6)

[F5] Construye el cotizador con el flujo de feature-dev, leyendo src/data/cotizador.config.json (Anexo B).

[F7] Lanza en paralelo auditor-rendimiento, auditor-a11y, auditor-seo y copy-es-en sobre {{URL_PREVIEW}}
     y consolida todo en docs/qa/reporte-final.md, priorizado por impacto.

[F7] Revisa la home con web-design-guidelines, fixing-motion-performance y fixing-accessibility (UI Skills);
     luego impeccable audit y polish como último pase; puntúa con la rúbrica de §10.3.

[F8] Graba con Chrome un GIF del recorrido home → catálogo → ficha → cotizador para el portafolio.
```

### B. Configuración del cotizador (`src/data/cotizador.config.json`)

```json
{
  "id": "cotizador-principal",
  "modo": "rango",
  "moneda": "CRC",
  "margenRango": 0.12,
  "calculo": {
    "tipo": "base_x_unidades_x_multiplicadores",
    "base": "tipo",
    "unidades": "area",
    "multiplicadores": ["acabados"]
  },
  "pasos": [
    {
      "id": "tipo",
      "titulo": { "es": "¿Qué necesitas?", "en": "What do you need?" },
      "campo": {
        "tipo": "opciones",
        "opciones": [
          { "valor": "{{OPCION_1}}", "label": { "es": "{{LABEL_ES}}", "en": "{{LABEL_EN}}" }, "base": "{{PRECIO_BASE_POR_UNIDAD}}" }
        ]
      }
    },
    {
      "id": "area",
      "titulo": { "es": "Área aproximada", "en": "Approximate area" },
      "campo": { "tipo": "rango", "min": 40, "max": 500, "paso": 5, "unidad": "m²" }
    },
    {
      "id": "acabados",
      "titulo": { "es": "Nivel de acabados", "en": "Finish level" },
      "campo": {
        "tipo": "opciones",
        "opciones": [
          { "valor": "estandar", "label": { "es": "Estándar", "en": "Standard" }, "multiplicador": 1 },
          { "valor": "superior", "label": { "es": "Superior", "en": "Premium" }, "multiplicador": "{{MULT_SUPERIOR}}" }
        ]
      }
    },
    {
      "id": "contacto",
      "titulo": { "es": "¿A dónde te enviamos la estimación?", "en": "Where should we send your estimate?" },
      "campo": { "tipo": "contacto", "requeridos": ["nombre", "telefono"], "consentimiento": true }
    }
  ],
  "disclaimer": {
    "es": "Estimación referencial sin valor contractual; sujeta a visita técnica.",
    "en": "Reference estimate only, not a binding quote; subject to an on-site assessment."
  }
}
```

Los números de `area` y `margenRango` son valores de interfaz de ejemplo; precios y multiplicadores los aprueba el cliente. Con `"modo": "pre-cotizacion"` el cotizador recoge requisitos y no muestra precio.

### C. Contrato del payload hacia Core

```json
{
  "site_key": "{{CORE_SITE_KEY}}",
  "tipo": "lead | cotizacion | cita",
  "origen": { "pagina": "/cotizador/", "lang": "es", "utm": { "source": "", "medium": "", "campaign": "" } },
  "contacto": { "nombre": "", "telefono": "+506", "email": "", "consentimiento": true },
  "datos": { "respuestas": {}, "estimado": { "min": 0, "max": 0, "moneda": "CRC" }, "item": "", "campana": "" },
  "turnstile_token": ""
}
```

Respuesta: `{ "ok": true, "ref": "L-000123" }` o `{ "ok": false, "error": "<codigo>" }`. El sitio muestra `ref` como número de seguimiento; nunca recibe IDs internos.

### D. Registro de decisiones (`docs/decisiones.md`)

```markdown
## ADR-001 · {{TITULO}}
- Fecha: {{AAAA-MM-DD}} · Estado: propuesta | aceptada | reemplazada
- Contexto: …
- Decisión: …
- Alternativas consideradas: …
- Consecuencias (rendimiento, mantenimiento, costo): …
```

---

*Mantenimiento de esta plantilla: al cerrar cada proyecto, revisa `docs/mejoras-plantilla.md`, incorpora lo que funcionó y sube la versión del encabezado.*
