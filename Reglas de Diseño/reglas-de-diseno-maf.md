# Reglas de Diseño — Plataforma MAF (extraídas de mockups)

**Fuentes analizadas:** `Propuestas.pdf` (3 propuestas de color en mobile: login + dashboard + menú), `PROPUESTA_V2.pdf` — nombrado así en el archivo pero su contenido es la validación de vistas mobile teal/celeste/amarillo — en realidad el mismo set de 3 propuestas visto arriba en una segunda pasada), `cod_OTP.pdf` (flujo de activación/recuperación de contraseña, desktop) y `Dashboard.pdf` (dashboard final autenticado, 2 variantes de color de header).

**Nota de método:** esto no es una transcripción, es una síntesis de patrones visuales repetidos entre los mockups. Los códigos de color se obtuvieron por muestreo de píxeles directo sobre las capturas (no son valores declarados en un design system, así que pueden tener ±2-3 unidades de variación por compresión/antialiasing). Los PDFs son capturas de pantalla incrustadas (fuentes tipo `Type 3` sin nombre, o Arial del texto envolvente del documento) — **no pude extraer el nombre real de la tipografía del producto**; la describo visualmente más abajo, pero para el nombre exacto de familia/pesos hay que consultar el archivo de diseño (Figma) original.

## 1. Marca y logo

Lockup horizontal: placa gris oscura redondeada con "Fondos Colectivos" (dos líneas, blanco) → barra vertical celeste delgada → wordmark "**maf**" en rojo, tipografía condensada/display con trazos irregulares (aspecto "hecho a mano" o serif angular en la "a").

| Elemento | Color (hex) |
| --- | --- |
| Placa del isotipo "Fondos Colectivos" | `#555555` |
| Barra divisoria vertical | `#82CCE5` |
| Wordmark "maf" | `#E30221` |

El rojo del wordmark (`#E30221`) es, en la práctica, el mismo rojo que se usa como color primario de acción en toda la plataforma (ver §2) — hay coherencia de marca entre el logo y los CTAs.

## 2. Paleta de color

### 2.1 Colores que llegaron a la propuesta final (presentes en `Propuestas.pdf`, `cod_OTP.pdf` y `Dashboard.pdf`)

| Uso | Hex aproximado | Dónde aparece |
| --- | --- | --- |
| **Rojo primario** (CTA principal, wordmark, iconografía de alerta) | `#E00020` – `#E30221` | Botón "Iniciar sesión" / "Verificar" / "Rematar", ícono de sobre en el modal de OTP, wordmark del logo |
| **Celeste / azul pastel** (headers de sección, anillo de progreso) | `#80C8E0` – `#83CEE6` | Barras de título "Detalles del contrato" / "Rematar" / "Cronograma de pago" / "Asamblea" (variante A del Dashboard), anillo de "Cuotas pagadas", ítem activo del sidebar |
| **Rosa pastel** (headers de sección — variante alterna, botones secundarios) | `#FFDDDD` – `#F0C0C8` | Barras de título (variante B del Dashboard), botón secundario "Ver más", botón "Reenviar código" |
| **Verde** (estado positivo) | `#90E0A8` | Badge "Pagado", badge "Normal" |
| **Amarillo / ámbar** (estado pendiente) | `#F0B828` | Badge "Pendiente" |
| **Gris casi negro** (texto principal) | `#1B1A18` | Títulos, texto de cuerpo |
| **Grises de fondo** | `#FAFAFA`, `#F3F1F1`, `#E6E2E2`, `#D1D0D0` | Fondo de página, fondo de tarjetas, bordes |

**Observación importante — el color de header de sección no está resuelto:** `Dashboard.pdf` trae dos páginas con la *misma* estructura y contenido, pero una usa celeste (`#80C8E0`) y la otra usa rosa (`#FFDDDD`) para las barras de título de cada card. Es una comparación A/B, no una decisión tomada. Cualquier implementación en React debería tratar ese color como una variable/tema, no como un valor fijo, hasta que el cliente confirme cuál de las dos.

### 2.2 Colores explorados y descartados (solo en el set de validación mobile — teal/celeste/amarillo)

| Color | Hex aproximado | Estado |
| --- | --- | --- |
| Teal / turquesa | `#30B0B8` | Descartado (propuesta 1 de la validación) |
| Celeste | `#80C8E0` | **Sobrevivió** — es el mismo celeste que terminó en el Dashboard final (§2.1) |
| Amarillo mostaza | `#E8D858` | Descartado (propuesta 3 de la validación) |
| Rojo (ya presente como acento puntual incluso en esta fase temprana) | `#E00020` | Se mantuvo y se volvió el color primario |

Esto sugiere una progresión real del proceso de diseño: se probaron 3 acentos de color (teal, celeste, amarillo) sobre una base neutra con rojo de marca fijo; ganó el celeste como acento secundario, y el rojo se consolidó como primario en las piezas posteriores (login con foto, OTP, dashboard).

## 3. Tipografía

No pude extraer el nombre de familia real (ver nota de método). Descripción visual:

- **Títulos y labels en negrita** (nombres de campo, headers de card, botones): sans-serif geométrica/humanista, peso bold, sin serifas, esquinas ligeramente redondeadas — visualmente cercana a familias como Poppins, Nunito Sans o similar (no confirmado).
- **Texto de cuerpo y placeholders**: la misma familia en peso regular, gris medio para placeholders (`Ingrese su documento`, `Escribe tu pregunta…`).
- **Wordmark "maf"**: tipografía display distinta a la de la UI, condensada, con detalles angulares en la "a" — es un asset de marca, no la tipografía de interfaz.
- Jerarquía consistente: título de card (bold, ~16–18px aparente) > label de campo (regular, ~13–14px) > valor del campo (bold o semibold, ~14–15px) > texto auxiliar/placeholder (regular, gris claro, ~13px).

## 4. Componentes UI

| Componente | Patrón observado |
| --- | --- |
| **Botón primario** | Rojo sólido, texto blanco bold, esquinas totalmente redondeadas (pill). Ancho completo del contenedor. |
| **Botón secundario** | Fondo rosa pastel o gris claro, texto oscuro, misma forma pill. Usado para acciones no destructivas de menor jerarquía ("Ver más", "Reenviar código"). |
| **Botón deshabilitado** | Mismo pill, relleno gris claro, texto gris — se ve en "Guardar" antes de completar el formulario de nueva contraseña. |
| **Input de texto** | Rectángulo con esquinas redondeadas (~8–10px radio), borde gris claro (o celeste cuando el campo está activo/enfocado), ícono prefijo dentro del campo (documento, candado), ícono de "ojo" para mostrar/ocultar contraseña a la derecha. |
| **Segmented control / tabs (DNI · RUC)** | Cápsula contenedora con dos mitades; la mitad activa se rellena con el color de acento (rosa, celeste o gris oscuro según la propuesta) y texto en negrita; la inactiva queda en blanco/gris. |
| **Checkbox + reCAPTCHA** | Checkbox cuadrado simple + widget de reCAPTCHA estándar de Google, sin personalización. |
| **Inputs de código OTP** | 6 casillas cuadradas individuales, un dígito cada una, bordes redondeados, mismo ancho/alto, separadas por espacio uniforme. |
| **Card / panel** | Fondo blanco, esquinas redondeadas, sombra suave; cuando tiene título de sección, ese título va en una barra de ancho completo pegada arriba de la card, en el color de acento (celeste o rosa), con texto en negrita. |
| **Badge de estado** | Pill pequeño, relleno de color según estado (verde=Pagado/Normal, amarillo=Pendiente), texto oscuro o blanco según contraste. |
| **Modal de confirmación** | Card blanca centrada sobre fondo oscurecido (overlay), ícono circular grande arriba (check verde para éxito, sobre rojo para reenvío de código), título bold, texto explicativo corto, botón de acción abajo a la derecha. |
| **Anillo de progreso** | Donut chart con el porcentaje en el centro en número grande bold, arco de color de acento sobre pista gris clara; cifra secundaria (ej. "7/14") dentro del anillo. |
| **Navegación lateral (sidebar de contratos)** | Lista vertical simple de ítems con ícono de documento; el ítem seleccionado tiene fondo celeste claro y esquinas redondeadas. |
| **Menú de usuario (header)** | Avatar circular arriba a la derecha (inicial o ícono de persona sobre fondo rojo); al hacer clic despliega card con nombre, correo, y accesos ("Canales de atención", "Cerrar sesión") separados por una línea divisoria. |
| **Menú hamburguesa (mobile)** | Ícono de 3 líneas arriba a la izquierda; despliega lista de secciones (Datos del contrato, Rematar, Cronograma de pagos, Asamblea, Perfil) superpuesta sobre el contenido. |

## 5. Layout

- **Login (desktop):** pantalla dividida 50/50 — foto a un lado (varía cuál lado: se probaron las 4 combinaciones de foto izquierda/derecha), card de formulario blanca redondeada al otro lado, centrada verticalmente. El logo va arriba del formulario, dentro de la mitad blanca.
- **Login (mobile):** columna única, card de formulario centrada verticalmente en la pantalla, con espacio en blanco generoso arriba; no hay imagen de fondo en las variantes mobile.
- **Dashboard (desktop):** grilla de 2 columnas. Columna izquierda: "Datos del contrato" (arriba) + "Asambleas" (abajo, dentro de la misma card o inmediatamente debajo). Columna derecha: "Rematar" (arriba) + "Cronograma de pagos" (abajo, con anillo de progreso). Sección "Canales de atención" a ancho completo, debajo de ambas columnas.
- **Dashboard (mobile):** las mismas cards se apilan en una sola columna, en el mismo orden top-to-bottom que en desktop.
- **Header persistente:** logo a la izquierda, selector de contrato o nombre de sección en el centro/izquierda, avatar de usuario a la derecha — presente en todas las pantallas autenticadas.
- **Versión más reciente del dashboard** (`Dashboard.pdf`) agrega un sidebar fijo de "Lista de contratos" a la izquierda que no estaba en las propuestas anteriores (antes el contrato se elegía con un dropdown arriba, "CONTRATO: 0350830 ⌄").

## 6. Puntos abiertos / inconsistencias entre archivos (no asumir, confirmar con el cliente)

- **Color de acento de sección:** celeste vs. rosa, sin resolver (ver §2.1).
- **Selector de contrato:** dropdown horizontal (`Propuestas.pdf`) vs. sidebar vertical de lista (`Dashboard.pdf`) — son dos soluciones distintas al mismo problema, de etapas distintas del proceso; la más reciente (`Dashboard.pdf`) parece ser el sidebar.
- **Placeholder de contraseña:** en algunas pantallas de `Propuestas.pdf` el placeholder del campo Contraseña dice por error "Ingrese su documento" (debería decir "Ingrese su contraseña"); ya corregido en otras variantes del mismo set y en `cod_OTP.pdf`. Vale la pena confirmarlo como bug de copy ya resuelto, no como decisión de producto.
- **Tipografía real:** pendiente de confirmar contra el archivo fuente de diseño (Figma), no contra estos PDFs.
