---
name: seg-html-inyectado
enabled: true
event: file
action: warn
conditions:
  - field: file_path
    operator: regex_match
    pattern: /src/.*\.(astro|ts|js|mjs)$
  - field: content
    operator: regex_match
    pattern: set:html|\.innerHTML\s*=|insertAdjacentHTML|document\.write\(|\beval\(|new Function\(
---

**Seguridad (.claude/claude-security-guidance.md): HTML inyectado o código dinámico.**

Prohibido `set:html`, `innerHTML` o `insertAdjacentHTML` con datos de formularios, de la URL o de contenido
remoto sin sanitizar, y prohibido `eval`/`new Function` (el cotizador usa tipos de cálculo predefinidos).
Si el HTML es estático y lo controla el repo, documenta por qué es seguro en el código.
