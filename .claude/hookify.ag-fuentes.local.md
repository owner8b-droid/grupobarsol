---
name: ag-fuentes-genericas
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: /src/.*\.(astro|css|ts|mjs)$|astro\.config\.mjs$
  - field: content
    operator: regex_match
    pattern: (font-family|name)\s*:\s*[^;\n]*\b(inter|roboto|arial|open sans|poppins|space grotesk)\b
---

**Anti-genérico (BRIEF.md §6.3): fuente genérica como fuente principal.**

Inter, Roboto, Arial, Open Sans, Poppins y Space Grotesk no van como fuente principal.
Usa la pareja tipográfica aprobada en el GATE 3 (`docs/03-direccion-de-arte.md`), máximo 2 familias + 1 mono,
cargada con la Fonts API de Astro. Si es solo un fallback del sistema, ignora este aviso.
