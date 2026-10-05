# Product

<!-- impeccable:product-schema 1 -->

> **Fuente de verdad del negocio: [BRIEF.md](BRIEF.md) §1.** Este archivo resume solo lo confirmado en la Fase 0
> (2026-10-04) y apunta al BRIEF en vez de duplicarlo. Si algo choca, manda el BRIEF; lo que falta está en
> [docs/privado/pendientes.md](docs/privado/pendientes.md) (privado, fuera de git).

## Platform

web

## Stack

Astro 7 con salida estática en GitHub Pages, definido por el estudio en BRIEF.md §4: TypeScript estricto,
CSS moderno sin framework, GSAP + Lenis para el movimiento.

## Users

Grupo Barsol le habla **por igual** a dos públicos (confirmado en la Fase 0):

- **Empresas y desarrolladores:** constructoras, desarrolladores, industrias y municipalidades que contratan obra
  o maquinaria por proyecto.
- **Propietarios particulares:** dueños de un lote o de una casa que necesitan excavar, preparar un terreno o construir.

Los dos llegan a conocer los servicios y a cotizar. Su objeción es no saber bien qué necesitan ni cuánto cuesta,
y les frenan los formularios complejos (BRIEF.md §1.3). Hablan español; el inglés entra después del prototipo.

## Product Purpose

Sitio corporativo de una constructora y empresa de maquinaria pesada de Cartago que reúne sus cuatro servicios
en un solo lugar y convierte visitas en conversaciones: la persona describe su necesidad en una pre-cotización
y la asesoría sigue por WhatsApp (BRIEF.md §1.2). El éxito se mide en pre-cotizaciones calificadas; el KPI
numérico a 90 días está **por definir con el cliente**.

## Positioning

Un solo proveedor para preparar el terreno, poner la maquinaria y los camiones, y construir la obra civil, con
asesoría desde el primer contacto. Es el diferenciador declarado en el BRIEF ("unificación de servicios y
consultoría completa"); **falta la prueba** que lo respalde antes de publicarlo como afirmación.

## Operating Context

- Servicios confirmados, cada uno con página propia: **movimiento de tierras, alquiler de maquinaria, acarreo
  de materiales y obra civil.**
- Catálogo = **flota de maquinaria**: una ficha por máquina o vagoneta con specs reales y "Cotizar esta máquina".
- La conversación comercial pasa por WhatsApp (+506 8880-8799). El sitio prepara esa conversación; no la reemplaza.
- Base en Cartago (cantón Central). Zona de cobertura por confirmar.

## Capabilities and Constraints

- Cotizador en modo **pre-cotización**: recoge servicio o máquina, ubicación, fechas, alcance y contacto.
  **No muestra precios** (no hay tarifas aprobadas). Envía el resumen a WhatsApp y una copia por email con Web3Forms.
- Datos estáticos, sin backend propio. Formularios con honeypot y consentimiento (Ley 8968).
- Nivel visual **premium** (BRIEF.md §7): JS ≤ 90 KB gzip por página, LCP móvil ≤ 2,0 s, 1 momento firma.
- Primer prototipo en una semana: todo el sitio en español, con las rutas EN listas para el texto en inglés.
- Por definir: dominio, Google Business Profile, GA4, KPI a 90 días, inventario de la flota y zona de cobertura.

## Brand Commitments

- Nombre: **Grupo Barsol** · descriptor del logo: "Constructora y Maquinaria".
- Logo existente: círculo rojo, brazo de excavadora en ocre y "GRUPO BARSOL" en carmesí. Solo existe como JPG de
  828 px sacado de redes; se conserva, no se rediseña.
- Colores declarados en el BRIEF: rojos, amarillos, blancos y negros.
- Voz: voseo costarricense ("Cotizá", "Escribinos").

## Evidence on Hand

- 13 fotos propias de obra (`insumos/fotos/`, descargadas de redes, 941–1994 px): terrazas y lotes industriales
  en aéreo, excavadoras cargando vagonetas, pavimentación nocturna, una calle de condominio terminada, una zanja
  en una nave industrial y una foto del equipo (unas 30 personas). Ocho traen el logo sobreimpreso.
- 2 grabaciones de pantalla de publicaciones (`insumos/videos/`): aéreo de movimiento de tierras y excavadoras
  cargando vagonetas en una obra vial.
- Lema en uso en redes: "Seguimos construyendo caminos, oportunidades y futuro."
- **No hay todavía:** testimonios, reseñas de Google, precios, inventario de la flota, proyectos con datos,
  prueba de los 10 años de operación ni del registro en el CFIA. Nada de eso se publica sin respaldo (BRIEF.md §2.2).

## Product Principles

1. **La acción siempre a mano:** cada página termina en una pre-cotización corta o en WhatsApp, nunca en un formulario largo.
2. **Prueba antes que adjetivos:** obra real, máquinas reales y datos verificables; nada de "somos líderes".
3. **Dos públicos, una sola claridad:** el mismo sitio sirve a una desarrolladora y a un dueño de lote, sin jerga ni condescendencia.
4. **Rápido en el campo:** pensado primero para el celular y para redes lentas.

## Accessibility & Inclusion

WCAG 2.2 AA, `prefers-reduced-motion` respetado en todo y contenido completo sin JS (BRIEF.md §2.2).
