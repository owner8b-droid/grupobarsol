# 03 · Dirección de arte · D «Frente de obra»

> Fase 3 · 2026-10-05 · Estado: dirección aprobada como base («el D está excelente como base»); consolidación y
> pantallas clave **esperando GATE 3**. Canvas (privado): https://claude.ai/artifact/6Pu1veZqmhYTbZzH6wume4 ·
> copia de referencia en [design/](../design/README.md) · tokens en [src/styles/tokens.css](../src/styles/tokens.css).

## 1. Concepto

**El home avanza como un frente de obra: una pantalla por tarea, con la máquina a la vista.** La estructura, el hero
y el scroll vienen de la referencia aprobada (mcaninchcorp.com, ADR-009). La identidad sale de Grupo Barsol:

- la **línea ocre** bajo «Constructora y Maquinaria» en el logo se vuelve la franja de cada título;
- el **brazo de la excavadora** del logo marca el ángulo de todos los cortes diagonales;
- los **colores del logo** (ocre, rojo óxido, carmesí) sobre negro y blanco cálido;
- su **video y sus fotos**, y su **lema real** en el hero: «Construyendo caminos / oportunidades / futuro».

## 2. Reglas

| Sí | No |
|---|---|
| Una idea por pantalla: título de una palabra, bajada en negrita, párrafo corto, una acción | Bloques de texto largos o valores genéricos («excelencia», «compromiso») |
| Un solo acento por vista (ocre por defecto); el rojo vive en el logo | Mezclar ocre y rojo como acentos en la misma vista |
| Cortes diagonales con el ángulo del brazo (pendiente 0,46, dirección «/») | Ángulos distintos en una misma pantalla, o diagonales decorativas sin foto |
| Capa de acento (gris + multiplicar) solo en paneles secundarios, una por sección | Teñir la foto principal o usar degradados de color |
| Fotos y video reales del cliente | Stock, imágenes de IA o fotos con el logo sobreimpreso |
| Voseo y CTAs con verbo + resultado («Pre-cotizá tu obra») | *Usted*, «Contáctenos», «Conozca más» |
| Prueba concreta (máquina, proyecto, dato) | Años de experiencia o certificaciones sin respaldo |
| Cinta de peligro: nunca | — |

## 3. Color

| Token | Hex | OKLCH | Uso | Contraste |
|---|---|---|---|---|
| `--c-ink` | #141210 | 0.184 0.005 67 | Texto, secciones oscuras, encabezado | 17,9:1 sobre `--c-paper` |
| `--c-paper` | #FBFAF7 | 0.985 0.004 91 | Fondo claro | — |
| `--c-accent` | #D5A63C | 0.750 0.132 84 | Franjas, botones, capas, pestaña | `--c-ink` encima: 8,3:1 |
| `--c-brand` / `--c-brand-2` | #AE3A1E / #A83238 | 0.512 0.157 35 / 0.496 0.154 22 | Acento alterno (tweak del canvas) | `--c-paper` encima: 5,9:1 / 6,3:1 |
| `--c-muted` / `--c-muted-dark` | #4A4541 / #B9B1A6 | — | Texto secundario | 9,1:1 / 8,8:1 |
| `--c-field-border` / `-dark` | #8C8379 / #726A62 | 0.615 0.018 70 / 0.529 0.016 67 | Borde de campos | 3,67:1 / 3,23:1 (WCAG 1.4.11) |
| `--c-error` / `--c-error-bg` | #7A2914 / #F6E7E1 | — | Mensajes de error | 8,1:1 |

## 4. Tipografía

**Urbanist** (variable 400–900, con itálica 700–900), autoalojada con la Fonts API de Astro y Fontsource. Una sola
familia: geométrica como las letras del logo y con el peso de la referencia.

| Uso | Tamaño | Peso / interlínea / tracking |
|---|---|---|
| Display del hero | `--step-5` (64–160 px) | 900 · 0,9 · −0,045em |
| Título de una palabra | `--step-4` (64–116 px) | 900 · 0,92 · −0,045em |
| Título de bloque y pasos del cotizador | `--step-3` (36–52 px) | 900 · 1,05 · −0,03em |
| Bajada | 21–24 px | 800 · 1,25 |
| Texto | `--step-0` (16,5–18 px) | 500 · 1,55 |
| Eyebrow y H1 corto del hero | 13–15 px, mayúsculas | 800 · 0,16–0,18em |
| Interfaz (botones, chips) | 16–18 px | 800 |

## 5. Composición

- **Pantallas completas** en el home de escritorio (`--section-min`, con *snap* por proximidad); en móvil, altura
  natural, sin snap.
- **Columna de texto** con margen izquierdo amplio (`--gutter-start`) y **bloque visual** a sangre hacia el borde,
  con 2–3 paneles diagonales: foto principal, panel con capa de acento y foto secundaria.
- **Franja del título:** alto 0,2em, apenas bajo la línea de base, entra desde el borde de la página y termina con
  un corte al mismo ángulo.
- **Listas con chevrones** (forma recortada en acento) y **caja de acento** para listas cortas de enlaces.
- **Fijos:** encabezado (transparente sobre el hero y negro al bajar), puntos de progreso a la izquierda y pestaña
  «Pre-cotizá tu obra» a la derecha. En móvil: WhatsApp y Pre-cotizá arriba del hero, sin pestaña.
- **Formas:** 4 px en botones y campos, 6 px en tarjetas, píldora en chips.

## 6. Fotografía y video

- Fotos reales con contraste apenas subido; la foto principal nunca se tiñe. Los recortes evitan logos sobreimpresos.
- Video del hero: 6–12 s, ≤ 3 MB, sin audio, con póster y **botón de pausa** visible (WCAG 2.2.2). Con
  `prefers-reduced-motion` o `Save-Data`: solo el póster.
- Faltan los originales en alta (pendientes #3 y #4); el prototipo usa las fotos de redes recortadas.

## 7. Movimiento

| Momento | Comportamiento | Reduced-motion |
|---|---|---|
| Hero | La frase rota cada 2,8 s (líneas con máscara, `--dur-3`, `expo.out`) | Frase completa, fija |
| Entrada de sección (una vez) | 1) la franja se traza desde la izquierda (`scaleX`, `--dur-3`); 2) el título sube con máscara (`--dur-4`); 3) los paneles diagonales se deslizan a lo largo del ángulo del brazo, escalonados 80 ms; 4) bajada y listas suben | Todo en su lugar, sin desplazamiento |
| Encabezado | Transparente → negro al pasar el hero (`--dur-2`) | Igual, sin transición |
| Scroll | *Snap* por proximidad en escritorio (Lenis o ScrollTrigger; API exacta con context7 en la F4). Nunca obligatorio ni secuestrado | Scroll normal |
| Botones | Presión: `scale(0.97)` con `--ease-press` | Sin escala |

**Momento firma (premium = 1): «La pasada del brazo».** Al entrar a cada sección, los paneles barren en la
dirección del brazo de la excavadora y la franja ocre se traza bajo el título, como la pasada de la máquina sobre
el terreno.

Motor único en `src/lib/motion` con atributos: `data-reveal="up"`, `data-split`, `data-barra`, `data-diagonal`,
`data-rota`. Solo `transform`, `opacity` y `clip-path`; nada de bounce; ninguna duración de interfaz pasa de 1,2 s.

## 8. Componentes y estados

| Componente | Estados obligatorios |
|---|---|
| Botón sólido (acento) y con borde | hover (fondo un 8 % más oscuro) · focus-visible (contorno de 3 px en `--c-focus` con separación de 3 px; sobre acento, contorno en tinta) · active (presión) · disabled (opacidad 0,45) · cargando («Enviando…») |
| Enlace con flecha | hover (la flecha avanza 4 px) · focus-visible |
| Chip de filtro y tarjeta de opción (radio) | seleccionado (fondo tinta, texto cal) · focus-visible · teclado con flechas (radios nativos) |
| Campo de texto | normal · focus (borde en acento) · error (borde óxido + mensaje con `role="alert"`) · deshabilitado |
| Tarjeta de máquina / de proyecto | hover (la foto se acerca un 3 %) · focus dentro · sin foto (placeholder marcado) |
| Pestaña fija, puntos de progreso, pausa del video | focus-visible · `aria-current` en el punto activo · etiqueta Pausar / Reproducir |

## 9. Pantallas diseñadas (canvas, página «Ronda 2»)

| Pantalla | Archivo | Interactiva |
|---|---|---|
| Home escritorio y móvil | `D-escritorio.dc.html`, `D-movil.dc.html` | Video con pausa, frase que rota, encabezado y puntos que siguen el scroll |
| Flota | `Flota-escritorio.dc.html` | Filtro por tipo con conteo anunciado |
| Ficha de máquina | `Ficha-escritorio.dc.html` | Galería con miniaturas |
| Pre-cotización escritorio y móvil | `Cotizador-escritorio.dc.html`, `Cotizador-movil.dc.html` | Los 5 pasos con validación y salida a WhatsApp |

## 10. Abierto

- **Logo en vector** (pendiente #5): mientras tanto, el encabezado usa el sello circular; con el vector se evalúa
  una versión horizontal.
- **Acento definitivo:** ocre (recomendado: es el color del brazo y da mejor contraste con tinta) o rojo óxido.
  Se decide en el GATE 3.
- **Fotos y video originales** (pendientes #3 y #4).
