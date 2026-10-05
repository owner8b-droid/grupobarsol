# Guía de seguridad del proyecto · Grupo Barsol

Modo de datos: **estático** (Web3Forms + WhatsApp). Las reglas de Core aplican solo si el proyecto pasa a
híbrido-core (BRIEF.md §8).

- El repo de GitHub (owner8b-droid/grupobarsol) es **público**: ningún dato privado del cliente, clave ni
  documento interno sensible entra al repo.
- Ninguna clave privada en el repo ni en el bundle; `.env*` y `supabase/.temp/` en `.gitignore`.
- Formularios: Web3Forms con honeypot y casilla de consentimiento (Ley 8968). La access key de Web3Forms es
  pública por diseño, pero vive en un solo lugar (`src/data/site.ts`).
- WhatsApp: el texto pre-llenado se arma con `encodeURIComponent`; nunca se interpolan parámetros de URL
  sin validar.
- Prohibido `innerHTML`, `insertAdjacentHTML` o `set:html` con datos de formularios, de la URL o contenido
  remoto sin sanitizar. Prohibido `eval` y `new Function`: el cotizador solo usa tipos de cálculo predefinidos.
- Los parámetros de URL (filtros de la flota, `?servicio=` e `?item=` del cotizador) se validan contra listas
  permitidas antes de usarse.
- Enlaces externos con `rel="noopener noreferrer"`.
- Scripts de terceros (GA4, Meta Pixel) solo con aprobación, cargados después de la interacción o en idle,
  y declarados en la CSP de la Fase 7.
- Si se activa Core: nunca exponer `business_id`, UUIDs internos ni URLs de funciones sin validación en el
  cliente; solo `site_key` público. Toda escritura pasa por la Edge Function `site-intake` (Origin permitido,
  Turnstile, límite de tasa, validación de esquema).
