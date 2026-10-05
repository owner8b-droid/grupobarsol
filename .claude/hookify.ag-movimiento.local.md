---
name: ag-movimiento-generico
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: /src/.*\.(astro|css|ts|js|mjs)$
  - field: content
    operator: regex_match
    pattern: transition(-property)?\s*:\s*all\b|transition(-property)?\s*:[^;\n]*\b(width|height|top|left|right|bottom|margin|padding)\b|scale\(\s*0\s*\)|ease-in(?!-out)\b|ease\s*:\s*\S*(bounce|elastic|\.in\b)
---

**Anti-genérico (BRIEF.md §6.3 y §4.6): movimiento genérico o costoso.**

Detecté al menos uno de estos: `transition: all`, transición de `width/height/top/left/margin/padding`,
`scale(0)`, `ease-in` en una entrada, o un ease `bounce`/`elastic`.

En su lugar: anima solo `transform`, `opacity` y `clip-path`; entradas con `--ease-out` (o `expo.out`),
cambios de estado con `--ease-in-out`, duraciones de UI de 1,2 s como máximo, y siempre por el motor de
`src/lib/motion` (atributos `data-*`) con su ruta para `prefers-reduced-motion`.
