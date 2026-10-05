---
name: ag-relleno-emojis-componentes-copiados
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: /src/.*\.(astro|md|mdx|json|ts)$
  - field: content
    operator: regex_match
    pattern: lorem ipsum|aceternity|magicui|magic-ui|[\U0001F300-\U0001FAFF☀-➿]
---

**Anti-genérico (BRIEF.md §6.3 y §2.2): relleno, emojis como íconos o componentes copiados.**

- Nada de lorem ipsum: contenido real, o `PENDIENTE` registrado en `docs/privado/pendientes.md`.
- Nada de emojis como íconos: un solo set de íconos o SVG propios.
- Nada de componentes de Aceternity o Magic UI copiados tal cual: componentes propios con los tokens.
