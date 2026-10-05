---
name: ag-negro-blanco-puros
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: /src/.*\.(astro|css)$
  - field: content
    operator: regex_match
    pattern: (#000(000)?|#fff(fff)?)\b|rgba?\(\s*(0\s*,\s*0\s*,\s*0|255\s*,\s*255\s*,\s*255)\b|(?<![-\w])(black|white)(?![-\w])
---

**Anti-genérico (BRIEF.md §6.3): negro o blanco puros.**

Usa los neutrales tintados de `src/styles/tokens.css` (`--c-ink`, `--c-paper`, `--c-muted`), nunca `#000`/`#fff`.
Excepción válida: máscaras (`mask-image`) o `clip-path`, donde el negro solo define alfa.
