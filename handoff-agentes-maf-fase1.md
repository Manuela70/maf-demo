# Suite Agéntica MAF Perú — 4 Agentes de Fase 1

**Applying Consulting · Documento de Handoff Interno**

Especificación funcional y visual para la construcción del mockup funcional (React). Incluye detalle de cada agente, wireframes de referencia, tips de implementación y el mensaje comercial por nivel jerárquico.

**CONFIDENCIAL · USO INTERNO**

- **Preparado para:** Manuela Ballén — Sales Engineer
- **Contexto:** Plataforma Integral de Gestión Comercial — MAF Perú
- **Base:** Sync de Estrategia (16/07/2026) · Alcance Funcional v-actual · Propuesta v1.5
- **Objetivo:** Mockup funcional para posicionar la oferta de valor agéntica ante MAF

## Punto de partida

### Cómo leer este documento

Este handoff traduce las decisiones del sync de estrategia en una especificación accionable para el mockup. Cada agente incluye: qué hace, sobre qué data y módulos del alcance corre, el flujo demostrable paso a paso, el wireframe de referencia, los tips para el mockup en React y el mensaje comercial por nivel jerárquico.

### Las 4 reglas transversales del sync (aplican a los 4 agentes)

| Regla | Qué significa para el mockup |
| --- | --- |
| Software agéntico = proactivo | El diferencial contra el software tradicional es que actúa sin que le metas data primero. En el mockup, cada agente debe iniciar algo (una recomendación, un recordatorio, una alerta), no solo responder a un clic. |
| Lámina = pregunta, no feature | Cada agente se presenta con una pregunta-gancho al decisor. Ejemplo del sync: en vez de "esto libera 20% del tiempo", poner "¿Qué vas a hacer con el 20% de disponibilidad de tu equipo?". |
| Nunca cerrar en "ahorro de tiempo" | El ahorro de tiempo habilita; no es el ROI. Cada agente aterriza en su beneficio de nivel: vendedor→más ventas, supervisor→menos costo, director→mejores decisiones. |
| Cada agente es "especialista en…" | El cliente debe entender que es "un mini-alguien que hace ciertas tareas y libera tiempo". Ponerle nombre propio genera empatía (opcional, según el perfil del decisor). |

### La escalera jerárquica que ordena el pitch

Vladimir fijó el mensaje por nivel. El orden del deck y del demo debe subir por esta escalera:

| Nivel | Su trabajo es… | Mensaje que le llega al Gerente General |
| --- | --- | --- |
| Vendedor | Vender (ejecuta) | Más tiempo para vender → más ventas (nunca "menos vendedores") |
| Supervisor | Seguimiento y control (operativo = costo) | Atiende más vendedores con el mismo headcount → menos costo |
| Director / Gerente | Tomar decisiones | Data en línea → mejores decisiones y control |

### Límite de alcance — instrucción directa de Vladimir

Máximo 5 agentes en Fase 1, puntuales y cumplibles. Estos 4 se eligieron por ser sólidos y de bajo riesgo de promesa. Se descartó el Perfilador/primer contacto autónomo por su complejidad y riesgo de no cumplir la promesa (la venta de fondos colectivos es emotiva y presencial). En el mockup, nada debe verse más ambicioso de lo que Fase 1 garantiza.

### Cómo demostrar "proactivo" en React

Para que el mockup sienta agéntico y no un CRM más: usa `useEffect` con un `setTimeout` corto para que los agentes "aparezcan" solos al cargar cada pantalla (una notificación que entra, una cartera que se reordena sola, un saludo del copiloto). El evaluador debe ver que el sistema habla primero. Datos mock en un archivo `mockData.js` central para mantener coherencia narrativa entre las 4 pantallas (mismos vendedores, mismos leads, misma sucursal).

## Agente 1 de 4 · La estrella — Gestor de Conocimiento / Onboarding

**1 — Gestor de Conocimiento ★** · Complejidad: BAJA · Impacto: Supervisor

Especialista en: resolver dudas del sistema y del proceso de fondos colectivos al vendedor, en el momento, sin que la consulta escale al supervisor.

### El dolor (con evidencia del cliente)

MAF tiene alta rotación de vendedores: reclutamiento y entrenamiento constante. El vendedor nuevo llega a su primera venta y pregunta "¿cómo funciona esto?", "me salió este error". Hoy el supervisor termina de mesa de ayuda respondiendo lo mismo cada día.

> "Varias capacitaciones y me siguen mandando pantallazos: ¿Cómo hago? No me deja guardar." — Supervisor Comercial

### Qué hace, en concreto

- Responde en lenguaje natural cómo usar la plataforma (registrar un lead, generar la proforma, qué significa un estado, cómo reevaluar en Equifax).
- Explica reglas del proceso (co-titularidad, por qué el pago está bloqueado si PLAFT está pendiente, qué pasa cuando una orden vence).
- Guía en errores comunes ("no me deja guardar" → le indica qué campo obligatorio falta).
- Vive embebido como copiloto lateral. Manuela lo describió como "el chatbot al lado".

### Data y módulos del alcance sobre los que corre

Base de conocimiento del proceso: máquina de estados del lead (sección 0), reglas de negocio (RN-001 a RN-013) y flujos de los 11 módulos. No necesita data transaccional en vivo — se alimenta de la documentación del sistema. Por eso es el más cumplible.

### Flujo demostrable (guion del demo)

1. Vendedor nuevo en la pantalla de creación de lead (RF-P07-01); no sabe por qué no avanza.
2. Abre el copiloto: "¿por qué no me deja guardar el lead?".
3. El agente responde: DNI y correo son obligatorios al crear el lead (regla real del RF-P07-01) y señala el campo.
4. Segundo turno: "¿qué es co-titularidad?" → explica el RF-021 en lenguaje simple.
5. Cierre: mostrar que esa consulta no llegó al supervisor (contador "resueltas sin escalar").

> "¿Cuántos más vendedores puede liderar un mismo supervisor si deja de responder las mismas preguntas del sistema cada día?"

**Nivel: Supervisor** → el supervisor es costo y su trabajo es operativo. Liberarlo de mesa de ayuda = atiende más vendedores con el mismo headcount = menos costo de supervisión por vendedor. Nunca decir "menos supervisores": el GG lo concluye solo.

### Wireframe de referencia — Agente 1 (copiloto embebido en creación de lead)

**Panel principal — "Crear Lead"** (Plataforma de Ventas FC — MAF · Vendedor: J. Pérez)

| Campo | Valor mostrado |
| --- | --- |
| Tipo de documento | DNI |
| Número de documento * | — vacío — |
| Correo electrónico * | — vacío — |
| Teléfono (opcional) | (vacío) |
| Concesionario (auto) | Toyota — Surco |

Estado del formulario: "● 2 campos obligatorios pendientes" · botón "Guardar" (deshabilitado).

**Panel lateral — "Asistente MAF"** (● en línea · especialista en el sistema)

> **Vendedor:** ¿Por qué no me deja guardar el lead?
>
> **Asistente:** Para guardar necesitas 2 datos obligatorios: el DNI y el correo del cliente. El teléfono es opcional en esta etapa.
> *Te marqué los 2 campos en rojo →*

Debajo del chat: "Consultas resueltas hoy sin escalar: 7". Campo de entrada: "Escribe tu pregunta…".

*Nota del wireframe: el copiloto (panel oscuro derecho) resuelve la duda señalando los campos obligatorios reales del RF-P07-01. Nótese el contador "resueltas sin escalar" — es la prueba visual del beneficio al supervisor.*

### Tips para el mockup en React — Agente 1

- **Base de respuestas mock:** un objeto `faq = {"guardar": {texto, camposADestacar:['dni','correo']}, "cotitular": {...}}`. El "matching" puede ser por keyword simple — no necesitas un LLM real para el demo.
- **Efecto agéntico:** al escribir la pregunta y enviar, aplica un `setState` que además pinta los inputs referidos con `borderColor:'#E30E43'`. Que el agente *actúe sobre la UI*, no solo texto.
- **Contador "sin escalar":** un `useState` que incrementa por cada consulta resuelta. Es el número que sustenta el mensaje al supervisor.
- **Naming opcional:** si el perfil del decisor lo permite, ponle nombre propio al agente (genera empatía, se queda en la cabeza). Mantén visible el "especialista en…".

## Agente 2 de 4 — Asistente Personal del Vendedor

**2 — Asistente de Seguimiento de Cartera** · Complejidad: BAJA–MEDIA · Impacto: Vendedor

Especialista en: que ningún lead se enfríe por falta de seguimiento — el recordatorio proactivo de cada vendedor.

### El dolor (con evidencia)

Yrina lo levantó como una de las mayores preocupaciones de los asesores: los leads llegan pero se pierden porque son muchos y no hay seguimiento. Hoy los vendedores fungen ellos mismos de recordatorio. Vladimir lo confirmó con el patrón universal: "me llamas el viernes" → se olvida → lo llama el lunes/martes → el deal se enfrió.

> "Los leads llegan a los vendedores, pero a veces no hay seguimiento o se pierden porque son un montón." — Yrina, resumiendo a los asesores

### Qué hace, en concreto

- Cada vendedor tiene "su propio asistente" que arma la agenda del día: a quién contactar hoy, qué siguientes pasos quedaron pendientes.
- Detecta leads sin actualización de estado y los levanta antes de que se enfríen (conecta con RF-020 Dashboard 1: "leads sin movimiento hace más de X días").
- Recuerda por fecha de próximo contacto y por la máquina de estados: un lead EN SEGUIMIENTO con cita pendiente, un NUEVO sin primer contacto.

### Data y módulos del alcance

Estados y timestamps del lead (RF-GL-02: cada cambio genera entrada en historial). Cartera del vendedor (RF-GL-01: nombre, fuente, estado, fecha, último intento). Notas y siguientes pasos. Referencia: la alerta de 48h del deck — aquí el agente pasa de alertar a organizar la acción.

### Flujo demostrable (guion del demo)

1. El vendedor entra. Lo primero que ve (Vladimir: "lo primero después del login es cómo está tu negocio") es su panel con el asistente arriba.
2. El asistente muestra: "Hoy contacta 3 leads. Este lleva 2 días sin movimiento en EN SEGUIMIENTO. A este prometiste llamarlo hoy."
3. El vendedor marca uno como contactado → el estado se actualiza (RF-GL-02) → el asistente reordena la agenda solo.
4. Mostrar un lead que estaba por enfriarse y que el agente rescató a tiempo.

> "¿Cuántas ventas se pierden hoy porque un lead se enfrió esperando un seguimiento que nadie recordó?"

**Nivel: Vendedor** → más tiempo vendiendo y menos organizándose = más ventas con la misma fuerza. Ancla numérica del business case: cada venta = $1,500 de margen.

### Wireframe de referencia — Agente 2 (franja "Prioridades de hoy" sobre el dashboard del vendedor)

**Panel principal — "Mi Panel — J. Pérez"**

KPIs (franja oscura): Mis leads activos **42** · Cierres del mes **6** · En seguimiento **11** · Sin movimiento +2 días **3**

**Tarjeta del asistente — "Tu asistente · lo primero de hoy"** *(especialista en que ningún lead se te enfríe)*

- C. Rojas — lleva 2 días sin movimiento en EN SEGUIMIENTO. Recontáctalo antes de que se enfríe. → *(acción: "Llamar")*
- M. Díaz — prometiste llamarla HOY (cita agendada 4:00 pm). → *(acción: "Ver")*
- …y 1 lead nuevo sin primer contacto registrado.

**Tabla "Mi cartera":**

| Cliente | Fuente | Estado | Últ. contacto | Acción |
| --- | --- | --- | --- | --- |
| C. Rojas | Landing digital | En seguimiento | hace 2 días | Recontactar |
| M. Díaz | Call Center | En seguimiento | hoy | Cita 4pm |
| L. Vega | Base Toyota | Contactado | ayer | — |
| P. Núñez | Derivación | Nuevo | sin contacto | Primer contacto |

*Nota del wireframe: la franja oscura de KPIs es la que Vladimir pidió llenar (estaba vacía en el demo previo). Debajo, la tarjeta roja del asistente = "lo primero de hoy". El agente ya priorizó y enlazó cada tarea a la fila de cartera correspondiente.*

### Tips para el mockup en React — Agente 2

- **Regla de "enfriamiento" mock:** calcula días desde `ultimoContacto` en `mockData`. Si > umbral y estado ∈ {NUEVO, EN SEGUIMIENTO} → entra a la tarjeta del asistente con color de urgencia (rojo >2d, ámbar cita hoy).
- **Reordenamiento vivo:** al marcar un lead como contactado, actualiza estado + `ultimoContacto=hoy` y recalcula la lista de tareas con `useMemo`. El evaluador ve que la agenda **se reorganiza sola**.
- **Coherencia narrativa:** usa los mismos leads (C. Rojas, M. Díaz…) en las 4 pantallas del demo. Refuerza que es una sola plataforma.
- **No cruces el límite:** el asistente *recuerda y prioriza*; el vendedor ejecuta el contacto. No hagas que el agente "llame" o "escriba al cliente" — eso era el perfilador descartado.

## Agente 3 de 4 — Priorización de Cartera (semáforo)

**3 — Priorización de Cartera** · Complejidad: MEDIA · Impacto: Vendedor

Especialista en: decirle al vendedor a quién llamar primero, para que su tiempo rinda más.

### El dolor (con evidencia)

> "Si viene un cliente que gana 20,000 soles y otro que gana 5,000, ¿cuál priorizo? Hoy en día se hace al ojo." — Yrina

La conversión actual (4%) depende en parte de a quién trabaja primero el vendedor, y esa decisión hoy es pura intuición.

### Qué hace, en concreto

- Ordena la cartera del vendedor por probabilidad de cierre / temperatura ("de más caliente a más frío").
- Conecta con la lógica de hot leads que ya existe en el alcance (RF-GL-HOT: identificación automática de alta intención, criterios configurables sin deploy).
- Considera factores del lead: fuente (un landing con formulario completo es más caliente que base masiva), perfil, comportamiento en el funnel.

### Nota de alcance — cómo no sobre-prometer

Vladimir matizó: "no sé si necesariamente un agente, o una recomendación". La versión Fase 1 puede ser un ranking basado en reglas (semáforo), no un modelo predictivo. En el demo, preséntalo como priorización inteligente y explicable, no como "IA que predice el cierre". No prometas capacidad predictiva que Fase 1 no garantiza.

### Data y módulos del alcance

RF-GL-HOT (hot leads y criterios configurables). Datos de perfil (M5) y fuente del lead (RF-002: las 4 fuentes tienen distinta calidad de intención). Estado y actividad en el funnel.

### Flujo demostrable (guion del demo)

1. El vendedor abre su cartera — 15 leads en lista plana.
2. Sin priorización: decide al ojo.
3. Con el agente: la cartera se reordena con semáforo — verdes (calientes: hot lead de campaña digital con formulario completo) arriba, rojos (fríos) abajo.
4. Mostrar el "por qué" de uno o dos (fuente + perfil + intención). Explicable, no caja negra.

> "¿Cuánta más conversión saca tu equipo si cada vendedor trabaja primero los leads con mayor probabilidad de cierre, en vez de al ojo?"

**Nivel: Vendedor** → más conversión sobre los mismos 19,500 leads/mes, sin sumar asesores = más ventas con la misma fuerza. Enlaza con el business case: +1pp de conversión = +195 ventas/mes.

### Wireframe de referencia — Agente 3 (cartera reordenada con semáforo y "por qué")

**Panel principal — "Mi cartera priorizada — J. Pérez"**

15 leads · ordenados por temperatura · toggle "Priorización del agente: ON"

Leyenda de semáforo: 🟢 Caliente · 🟡 Tibio · 🔴 Frío

| Lead | Semáforo | Por qué | Acción |
| --- | --- | --- | --- |
| A. Torres | Caliente | Landing digital con formulario completo · hot lead automático (RF-GL-HOT) · respondió en <1h | Llamar 1° |
| M. Díaz | Caliente | Cita agendada · interés en modelo específico · perfil de ingreso alto | Llamar 2° |
| L. Vega | Tibio | Base Toyota · contactado una vez · sin señal fuerte de intención aún | — |
| P. Núñez | Frío | Sin datos de perfil · fuente masiva · sin respuesta | — |

…11 leads más, ordenados de tibio a frío.

**Callout del agente — "Por qué ordené así tu cartera":** "Prioricé leads de campañas digitales con formulario completo y perfil de ingreso alto — históricamente cierran más. Los de fuente masiva sin respuesta quedan al final. Puedes reordenar manualmente cuando quieras." *Recomendación explicable — tú decides el orden final.*

*Nota del wireframe: semáforo verde→ámbar→rojo con el "POR QUÉ" visible en cada lead. El callout inferior explica el criterio: transparente, no caja negra. El toggle ON/OFF permite mostrar el antes/después en el demo.*

### Tips para el mockup en React — Agente 3

- **Score por reglas (no ML):** función `scoreLead(lead)` que suma puntos por fuente (landing+3, callcenter+2, base+1), perfil (ingreso alto +2), señal (respondió rápido +2, cita +2). Ordena con `.sort()`. Simple, explicable, defendible.
- **El "por qué" sale del mismo score:** guarda las razones que sumaron puntos y muéstralas como texto. Esto es lo que evita el reclamo de "caja negra".
- **Toggle antes/después:** un `useState` booleano que alterna entre orden original y orden por score. Es el gesto más vendedor del demo.
- **Lenguaje:** en labels usa "priorización" y "recomendación", nunca "predicción de cierre". Protege la promesa de Fase 1.

## Agente 4 de 4 · Sube más alto — Copiloto del Supervisor / Director

**4 — Copiloto Ejecutivo (analítica conversacional)** · Complejidad: MEDIA · Impacto: Supervisor / Director

Especialista en: responder en lenguaje natural cómo va el negocio, para que quien decide no dependa de armar reportes.

### El dolor (con evidencia)

El supervisor "pegado a la laptop de 8 AM a 10 PM" viendo si le llegó un lead (deck). Y el nivel director/gerente que hoy con Dynamics no tiene visibilidad ejecutiva en tiempo real.

> "Le haces las preguntas: ¿cuáles son las métricas del supervisor tal? y te responde en base a la información de la plataforma." — Yrina, tras probar Amazon Q en la APN

Origen concreto y real: Yrina ya lo vio funcionando con Amazon Q sobre la data de la plataforma.

### Qué hace, en concreto

- Responde preguntas en lenguaje natural: "¿cómo va mi negocio hoy?", "¿quién es mi mejor y mi peor vendedor?", "¿qué sucursal cayó esta semana?".
- Supervisor: métricas del equipo (leads activos por estado, evaluaciones, ventas cerradas, efectividad por asesor).
- Director/Gerente: visión agregada de zona, comparativos entre sucursales, tendencias.

### Nota de alcance — la frontera que debes dejar clara

En la propuesta, el BI analítico externo (Snowflake/Redshift) está Fuera de Alcance Fase 1 (RF-020). Pero la analítica conversacional sobre los dashboards nativos (Amazon Q sobre QuickSight embebido) SÍ es viable con la arquitectura propuesta. En el demo: consulta conversacional sobre la data propia de la plataforma = sí; data warehouse analítico externo = Fase 2.

### Data y módulos del alcance

RF-GL-06 (dashboard de métricas del supervisor) y RF-020 (3 dashboards nativos: Asesor, Supervisor, Gerencial). Arquitectura del deck: Aurora PostgreSQL → SPICE → QuickSight embebido, con Q/analítica conversacional encima (embed URL vía Lambda + API Gateway). Respeta RBAC: cada perfil ve solo su ámbito.

### Flujo demostrable (guion del demo)

1. El supervisor entra y, en vez de leer tablas, pregunta: "¿cómo va mi equipo hoy?".
2. El agente responde con las métricas clave y resalta lo relevante ("tu mejor vendedor es X con N cierres; Y no mueve sus leads hace 3 días").
3. Seguimiento: "¿qué sucursal cayó esta semana?" → respuesta con drill-down.
4. Al hacer clic en una cifra, se filtra a los leads correspondientes (comportamiento ya definido en RF-020).

> "¿Qué mejores decisiones toma tu dirección comercial cuando tiene la respuesta en línea, en el momento en que la pregunta?"

**Nivel: Director hacia arriba** → su trabajo es tomar decisiones. El mensaje no es ahorro de tiempo: es "mejor seguimiento y control para el supervisor, mejores decisiones para el director, con la data en línea". Es el agente que habla el idioma gerente-para-arriba.

### Wireframe de referencia — Agente 4 (copiloto conversacional sobre el panel del supervisor)

**Panel principal — "Panel Supervisor — Sucursal Surco"**

KPIs: Ventas del mes **58** · Tasa efectividad **4.6%** · Leads nuevos s/gestión **9**

Gráfico "Ventas por asesor" (barras): Pérez, Vega, Ríos, Soto (Soto en rojo, resaltado como bajo desempeño).

**Panel del copiloto — "Copiloto Ejecutivo"** *(especialista en responder cómo va tu negocio, al instante)*

> **Supervisor:** ¿Cómo va mi equipo hoy?
>
> **Copiloto:** Vas en **58 ventas** este mes, sobre meta. Tu mejor vendedor es **J. Pérez** (14 cierres). Atención: **R. Soto** no mueve sus leads hace 3 días y tiene 9 leads NUEVOS sin gestión.
> *▸ Clic aquí para ver los 9 leads sin gestión (se filtra la lista)*
>
> **Supervisor:** ¿Qué sucursal cayó esta semana?
>
> **Copiloto:** **Miraflores** bajó 18% en cierres vs. la semana pasada. La caída se concentra en leads de Call Center sin primer contacto en las primeras 24h.
> *▸ Ver detalle por asesor de Miraflores*

Campo de entrada: "Pregúntale a tu copiloto…".

*Nota del wireframe: a la izquierda, KPIs y gráfico del supervisor (RF-GL-06/RF-020). A la derecha, el copiloto conversacional responde en lenguaje natural y ofrece drill-down (clic en la cifra → filtra la lista, comportamiento ya definido en RF-020). Basado en lo que Yrina ya probó con Amazon Q.*

### Tips para el mockup en React — Agente 4

- **Q&A mock por intención:** mapea 4–5 preguntas típicas a respuestas pre-armadas que lean del mismo `mockData` (ventas, ranking de asesores, sucursal en caída). No necesitas NLP real — un select de preguntas sugeridas o keyword-match basta para el demo.
- **Drill-down real:** el "▸ Ver los 9 leads" debe filtrar de verdad una tabla (aunque sea mock). Ese gesto es exactamente el RF-020 ("al hacer clic en cualquier cifra → lista filtrada") y es muy convincente en vivo.
- **Preguntas sugeridas:** muestra 3 chips de preguntas ("¿cómo va mi equipo?", "¿mejor y peor vendedor?", "¿sucursal en caída?") para guiar al evaluador y evitar que escriba algo sin respuesta mock.
- **RBAC en el demo:** si tienes tiempo, un selector de rol (Supervisor / Gerente) que cambie el alcance de las respuestas (equipo vs. zona). Refuerza el mensaje de "mejores decisiones por nivel".
- **Ancla a lo real:** menciona en la narración que esto se apoya en Amazon Q + QuickSight embebido (arquitectura del deck), no es una maqueta inventada.

## Consolidado

### Los 4 agentes de un vistazo

| Agente | Impacto / Nivel | Complejidad | Pregunta-gancho (lámina) | Beneficio al GG |
| --- | --- | --- | --- | --- |
| 1. Gestor de Conocimiento ★ (ya incluido en el bundle) | Supervisor | Baja | ¿Cuántos más vendedores puede liderar un supervisor si deja de responder lo mismo cada día? | Menos costo de supervisión |
| 2. Asistente del Vendedor | Vendedor | Baja–Media | ¿Cuántas ventas se pierden porque un lead se enfrió esperando un seguimiento? | Más ventas (misma fuerza) |
| 3. Priorización de Cartera | Vendedor | Media | ¿Cuánta más conversión si cada vendedor trabaja primero lo más caliente, no al ojo? | Más ventas (más conversión) |
| 4. Copiloto Ejecutivo | Supervisor / Director | Media | ¿Qué mejores decisiones toma tu dirección con la respuesta en línea, al instante? | Mejores decisiones y control |

### Orden recomendado para el deck y el demo (escalera jerárquica)

| Paso | Qué mostrar y por qué |
| --- | --- |
| 1° | Gestor de Conocimiento — abre, porque ya está incluido en la propuesta. Es la prueba tangible de que esto no es promesa, es real. |
| 2°–3° | Asistente + Priorización — el bloque de ventas. Van juntos: cuentan una sola historia (el vendedor vende más y mejor con la misma fuerza). |
| 4° | Copiloto Ejecutivo — cierra hacia arriba, con el mensaje ejecutivo de "mejores decisiones". Es el que habla el idioma gerente-para-arriba. |

### Checklist de construcción del mockup (React)

| Elemento | Estado sugerido para el demo |
| --- | --- |
| `mockData.js` central: mismos vendedores, leads y sucursal en las 4 pantallas | Imprescindible — coherencia narrativa |
| Efecto "proactivo" (`useEffect`+`setTimeout`): el agente aparece/actúa solo al cargar | Imprescindible — es lo que lo hace agéntico |
| Agente 1: base de FAQ mock + resaltado de campos en la UI | Alta prioridad |
| Agente 2: cálculo de "enfriamiento" + reordenamiento vivo de agenda | Alta prioridad |
| Agente 3: `scoreLead()` por reglas + "por qué" explicable + toggle antes/después | Alta prioridad |
| Agente 4: Q&A mock por intención + drill-down real (clic→filtra) + chips de preguntas | Alta prioridad |
| Franja de KPIs arriba del dashboard del vendedor (la que estaba vacía) | Pedido explícito de Vladimir |
| Cada agente con su etiqueta "especialista en…" visible | Regla del sync |
| Branding: navy #2F394D, crimson #E30E43, verde #22C55E, AWS naranja #F7981D · Montserrat | Identidad Applying |

### Guardarraíles para no romper la promesa (crítico en el demo en vivo)

- Agente 3: es priorización/recomendación explicable, no "predicción de cierre con IA". Nunca uses la palabra "predice".
- Agente 4: analítica conversacional sobre data propia (sí Fase 1) ≠ BI externo sobre Snowflake/Redshift (Fase 2).
- Ningún agente contacta o cierra con el cliente final. La venta de fondos colectivos es emotiva y presencial: el agente libera tiempo y quita fricción; el humano cierra. Ese es el límite que se descartó cruzar (perfilador).
- Todo lo que se vea en el mockup debe ser cumplible en Fase 1. Si algo se ve más ambicioso de lo prometido, acótalo en la narración.

### Dato pendiente de confirmar con el cliente (antes del demo final)

En el sync quedó abierto si el crecimiento de MAF está topado por conversión, por capacidad de formar gente, o por volumen de leads. La respuesta define cuál de los 4 agentes lidera el mensaje. Conviene confirmarlo con Juan Carlos, idealmente en el taller de IA agéntica del bundle.

> El rey del mensaje de IA no es el ahorro de tiempo. Es qué haces con ese tiempo.
>
> — Principio de posicionamiento del sync. Cada agente del mockup debe aterrizar en más ventas, menos costo o mejores decisiones. El tiempo liberado solo habilita el ROI; no es el ROI.
