# CLAUDE.md · Grupo Barsol

## Proyecto
Sitio corporativo (construcción y maquinaria pesada · Cartago, Costa Rica) en Astro 7, salida estática.
ES por defecto; EN en /en/ con rutas listas desde el prototipo y texto después de validar el ES.
Nivel visual: premium · Datos: estático (Web3Forms + WhatsApp) · Conversión primaria: pre-cotización que sigue por WhatsApp
Fuentes de verdad: BRIEF.md · PRODUCT.md · docs/03-direccion-de-arte.md · docs/decisiones.md · docs/privado/pendientes.md (fuera de git)

## Baseline
This project's Baseline target is Baseline Widely available.
Lo "Newly available" (View Transitions, scroll-driven animations) solo como mejora progresiva con @supports.
Consulta modern-web-guidance antes de escribir HTML/CSS/JS.

## Comandos
npm run dev | dev:bg | build | preview | test:e2e | test:a11y | lint:design | lhci

## Entorno
- Claude Code 2.1.289 (binario de la extensión de VS Code; `claude` no está en el PATH) · Node 24.18.0 (nvm).
- Plugins del proyecto en .claude/settings.json. modern-web-guidance y security-guidance llegan como @synced
  desde la cuenta: no instalar las copias oficiales. Shopify/Liquid y Figma están desactivados en este proyecto.
- fluid (Darcos-Loft) lo instala el usuario a mano: el modo automático bloquea marketplaces de terceros.
- Detector de impeccable (sin hook automático): `~/.claude/skills/impeccable/scripts/impeccable detect --json <archivos>`.
- Avisos anti-genérico y de seguridad: .claude/hookify.*.local.md (hookify, acción warn).

## Skills (ya instaladas, no reinstalar)
- UI Skills (CLI 0.2.4): router con `npx ui-skills start`; el resto se trae como contexto con `npx ui-skills get <slug>`
  (no se instalan en disco). Incluidas en el CLI: baseline-ui, fixing-accessibility, fixing-metadata,
  fixing-motion-performance, improve-ui, ui-skills-root. Todos los slugs de BRIEF.md §3.6 existen, salvo cuatro
  renombrados en el registro: redesign-existing-projects → leonxlnx/redesign-skill · high-end-visual-design →
  leonxlnx/soft-skill · minimalist-ui → leonxlnx/minimalist-skill · industrial-brutalist-ui → leonxlnx/brutalist-skill.
- impeccable 4.5.0: se invoca como `/impeccable <comando>` (una skill con subcomandos; `impeccable pin <comando>`
  crea atajos sueltos). Contexto del producto en PRODUCT.md, que apunta a BRIEF.md. Sin generación de imágenes en
  este entorno: flujo code-first.
- Mapa por fase y reglas: BRIEF.md §3.6 (una sola skill de gusto; GSAP siempre dentro de src/lib/motion).

## Reglas
- No inventar datos del negocio; lo faltante va a docs/privado/pendientes.md (fuera de git: el repo es público).
- Los valores del BRIEF pueden ser de ejemplo (la fecha 05/10/26 lo era): confirmar antes de tratarlos como hechos.
- Tokens en src/styles/tokens.css; sin valores sueltos de color, espacio o tipografía en componentes.
- Movimiento solo vía src/lib/motion (atributos data-*), con transform/opacity y reduced-motion siempre.
- JS solo donde haya interacción real; el contenido funciona sin JS.
- Anti-genérico: BRIEF.md §6.3. lint:design en 0 antes de cada commit de UI.
- Verificar cada cambio visual en el navegador (375/768/1280/1920).
- Commits pequeños. Nunca push a main, DNS ni supabase db push sin aprobación.
- Publicar solo con `git push origin main` (nunca `--all` ni `--mirror`): `refs/original` guarda el historial previo
  con los docs privados hasta que el usuario lo borre (ADR-010).
- El repo de GitHub es público: nada privado del cliente en el repo. insumos/ (crudos) está fuera de git;
  los assets procesados van a src/assets/.

## Flujo
Fases y GATES: BRIEF.md §9; calendario en docs/00-plan.md. GATE 0 aprobado. Dirección de arte: D · Frente de obra
(ADR-009, design/home-territorios/). GATES 0–3 aprobados. Fase actual: 4 (base técnica), esperando GATE 4;
el primer push y la activación de GitHub Pages esperan la aprobación del usuario.
