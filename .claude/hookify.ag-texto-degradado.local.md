---
name: ag-texto-con-degradado
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: /src/.*\.(astro|css)$
  - field: content
    operator: regex_match
    pattern: background-clip\s*:\s*text
---

**Anti-genérico (BRIEF.md §6.3): texto con degradado.**

Nada de texto con degradado ni degradados morados o neón. La jerarquía sale de la tipografía, la escala y
el único acento de la paleta (`--c-accent`), usado con disciplina.
