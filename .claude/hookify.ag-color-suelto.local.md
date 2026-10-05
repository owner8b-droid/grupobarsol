---
name: ag-color-fuera-de-tokens
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: /src/(components|layouts|pages)/.*\.(astro|css)$
  - field: content
    operator: regex_match
    pattern: #[0-9a-f]{3,8}\b|(?<![-\w])(rgba?|hsla?|oklch|oklab|lab|lch)\(
---

**Regla del proyecto (CLAUDE.md): color suelto en un componente.**

Los colores viven solo en `src/styles/tokens.css`. En componentes, layouts y páginas usa `var(--c-*)`
o `color-mix(in oklch, var(--c-…) N%, …)`. Si el color nuevo hace falta, agrégalo primero como token.
