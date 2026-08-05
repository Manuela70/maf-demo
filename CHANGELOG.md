# CHANGELOG - Sistema de Inteligencia Comercial MAF

Registro centralizado de cambios, decisiones y evolución del proyecto.

---

## [v2.3.0] - 2026-08-05

### 🎯 Cambios Críticos para Demo del 09-AGO

**Contexto:** Preparación de presentación final a la CEO de MAF (Claudia Díaz)  
**Fecha de presentación:** 09-AGO-2026, 8:30 AM  
**Objetivo:** Impactar desde el primer segundo y mostrar flujo completo del día a día del asesor

---

#### ✨ 1. Logo de MAF en Pantalla de Login

**Componente modificado:** `src/App.js` (P01Login)

**Antes:**
```
[MAF FC] - placeholder simple gris
```

**Después:**
```
┌──────────────────────────────┐
│  MAF PERÚ                   │ ← Gradiente rojo, letras grandes
│  Sistema de Inteligencia    │
│  Comercial                   │
│  Fondos Colectivos          │
└──────────────────────────────┘
```

**Características:**
- Logo con gradiente rojo (from-red-600 to-red-700)
- Letras grandes y bold (text-4xl)
- "PERÚ" en mayúsculas pequeñas
- Sombra y diseño profesional
- Fondo con gradiente sutil (from-gray-50 to-gray-100)

**Justificación:**
> "Para que la expectativa suba un poquito desde el desde el desde el minuto cero" - Yrina Suarez

---

#### 📱 2. Cambio de "CRM" a "Call Center"

**Archivos modificados:** 
- `src/App.js` (5 ocurrencias)
- Fuentes de leads
- Badges de visualización
- Eventos de creación

**Cambios:**
```javascript
// Antes
fuente: 'CRM'
'CRM': 'bg-gray-300'

// Después
fuente: 'Call Center'
'Call Center': 'bg-purple-100 text-purple-700'
```

**Motivo:** El rol `callcenter` ya existe y debe reflejarse correctamente como fuente de leads.

---

#### 📞 3. Corrección de Texto: WhatsApp vs Correo

**Componente:** `src/agents/AgenteAsistente.js`

**Antes:**
```
Botón: "Enviar correo de seguimiento"
```

**Después:**
```
Botón: "Enviar WhatsApp de seguimiento"
```

**Motivo:** En la transcripción de la reunión quedó pendiente este cambio. El negocio de MAF es presencial y usa WhatsApp como canal principal.

---

#### 🔍 4. Etiqueta Mejorada: "Evaluaciones Equifax"

**Componente:** `src/components/common/MiDesempenio.js`

**Antes:**
```
🔍 Evaluaciones
```

**Después:**
```
🔍 Evaluaciones Equifax
```

**Justificación:**
> "Si yo leo evaluaciones puede ser satisfacción, NPS... para que sea un poco más claro" - Yrina Suarez

---

#### 🎯 5. Objetivo Diario Calculado Dinámicamente

**Componente:** `src/components/common/MiDesempenio.js`

**Nueva sección agregada:**

```javascript
🎯 Objetivo Diario
Debes cerrar X ventas por día (faltan Y en Z días)
```

**Cálculo automático:**
```javascript
ventasFaltantes = meta - ventasActuales
diasRestantes = diasDelMes - diasTranscurridos
objetivoDiario = ventasFaltantes / diasRestantes
```

**Mensajes contextuales:**
- Meta superada: "✅ Meta superada - Mantén el ritmo"
- Sin pendientes: "✅ Sin ventas pendientes"
- Con pendientes: "Debes cerrar X ventas por día (faltan Y en Z días)"

**Justificación:**
> "Me gustaría que refleje un objetivo diario... si voy en 50% y es quincena, perfecto, me falta hacer 2 ventas al día" - Yrina Suarez

---

#### 📅 6. Mockup del Módulo de Citas

**Nuevo archivo:** `src/components/common/ModuloCitas.js` (261 líneas)

**Características:**

**A. Datos Mock:**
- 5 citas de ejemplo
- Estados: Programada, Confirmada, Asistió, No asistió
- Fuentes: Call Center, Landing Digital, Base Toyota
- Concesionarios: San Isidro, Surco, SJL, Miraflores

**B. Filtros:**
- Todas las citas
- Solo hoy
- Solo pendientes

**C. Información por cita:**
- Cliente
- Fecha y hora
- Concesionario
- Modelo de vehículo
- Fuente del lead
- Estado con color distintivo
- Notas

**D. Acciones:**
- Marcar asistencia (para citas de hoy)
- Reprogramar
- Ver detalles

**E. Destacado visual:**
- Citas de hoy: Borde azul + fondo azul claro
- Estados con colores:
  - Programada: Azul
  - Confirmada: Verde
  - Asistió: Gris
  - No asistió: Rojo

**F. Nota de desarrollo:**
```
💡 Mockup para Demo: Este es un prototipo visual. 
La funcionalidad completa de agendamiento, recordatorios 
y sincronización se implementará en Fase 1.
```

**Exportado desde:** `src/components/common/index.js`

**Justificación:**
> "Me gustaría que el que refleje... tengo ahí mis citas y que se pueda develar todas las citas que yo he ido agendando" - Yrina Suarez

---

### 📊 Métricas de Implementación

| Componente | Tipo | Líneas |
|------------|------|--------|
| App.js | Modificado | ~40 (login + CRM fixes) |
| AgenteAsistente.js | Modificado | 1 |
| MiDesempenio.js | Modificado | ~35 |
| ModuloCitas.js | **NUEVO** | 261 |
| index.js | Modificado | 1 |
| **TOTAL** | 4 mod + 1 nuevo | **~338** |

---

### 🎯 Impacto en el Demo

#### Para la Presentación:
✅ **Logo impactante desde el inicio** - Genera expectativa  
✅ **Objetivo diario visible** - Muestra IA generativa útil  
✅ **Mockup de citas** - Demuestra visión completa del producto  
✅ **Correcciones de texto** - Profesionalismo y atención al detalle  

#### Para el Storytelling (María López):
1. **Login** → Logo MAF impacta
2. **Mi Desempeño** → Ve objetivo: "Debes cerrar 2 ventas hoy"
3. **Indicadores** → Citas, Evaluaciones Equifax, Certificados
4. **Mis Citas** → Vista consolidada de agenda
5. **Seguimiento** → WhatsApp de seguimiento visible

---

### 🚀 Roadmap Post-Demo

**Si se aprueba el proyecto:**

#### Fase 1 (Implementación Completa)
- [ ] Módulo de citas funcional (agendamiento real)
- [ ] Integración con calendarios (Teams opcional)
- [ ] Recordatorios automáticos de citas
- [ ] Bloqueo imperativo: marcar asistencia
- [ ] Acceso completo para Call Center
- [ ] Seguimiento de cuotas CIA
- [ ] Filtros por concesionario en dashboard supervisor

#### Fase 2 (Mejoras y Expansión)
- [ ] Módulo de asignación de metas
- [ ] Recomendaciones generativas avanzadas
- [ ] Integración con Amazon Q (evaluar)
- [ ] Reportes automatizados más complejos
- [ ] WhatsApp Bot para creación de leads
- [ ] Notificaciones push del navegador

---

### 📝 Notas de la Reunión

**Participantes:** Manuela Ballén, Yrina Suarez  
**Duración:** 56 minutos (2 grabaciones)  
**Próxima presentación:** 09-AGO-2026, 8:30 AM

**Decisiones clave:**
1. El rol `callcenter` ya existe - solo actualizar visualización
2. Mockup de citas es suficiente para demo - funcionalidad en Fase 1
3. Enfoque en mostrar el "día a día" del asesor
4. Logo debe impactar desde el minuto cero
5. Objetivo diario es valor diferencial vs CRMs genéricos

**Preparación adicional:**
- Grabar demo en Story Lane
- Preparar 10 preguntas técnicas (CEO + Gerente TI)
- Evaluar Amazon Q como alternativa
- Documento de economía de tokens

---

### 🐛 Fixes Incluidos

- Corregido: Badge de "Call Center" ahora es morado (antes gris genérico)
- Corregido: Eventos de creación de lead reflejan "Call Center" correctamente
- Corregido: Etiqueta de evaluaciones ahora es clara (Equifax)
- Mejorado: Diseño de login más profesional

---

## [v2.2.0] - 2026-08-05

### 🎯 Nuevas Métricas Clave del Negocio

**Contexto:** El área comercial requiere visibilidad de 3 indicadores críticos: Citas, Evaluaciones y Certificados, además de control estricto de tiempo de contacto (30 min).

#### ✨ 1. Dashboard del Asesor: 3 Indicadores Clave

**Componente actualizado:** `src/components/common/MiDesempenio.js`

**Nuevas métricas agregadas:**
- 📅 **Citas Generadas** (azul)
  - Actual vs Meta
  - % de cumplimiento
  - Crítico para pipeline de ventas

- 🔍 **Evaluaciones Equifax** (morado)
  - Evaluaciones realizadas
  - Meta mensual
  - Filtro de riesgo obligatorio

- 📜 **Certificados Emitidos + Ticket Promedio** (verde)
  - Número de certificados
  - Ticket promedio: Meta $23,500 USD
  - Indicador de calidad de ventas

**Visualización:**
- Grid de 3 columnas
- Colores distintivos por métrica
- Alertas visuales si está por debajo de meta
- Comparación en tiempo real

**Justificación:**
> "Nos miden por número de certificados y nos piden un ticket promedio todos los meses de 23.500 dólares"

---

#### ⚡ 2. Alerta Crítica: Tiempo de Contacto (30 minutos)

**Componentes actualizados:**
- `mockData.js` → `detectarLeadsUrgentes()`
- `src/components/common/Notificaciones.js`

**Nueva urgencia:** `critica` (nivel máximo)
- Prioridad por encima de "alta", "media", "baja"
- Color rojo intenso con borde doble
- Ícono: ⚡

**Lógica de detección:**
```javascript
// Lead nuevo sin contactar
if (minutos >= 30) → CRÍTICA (⚡ rojo)
if (minutos >= 15 && < 30) → ALTA (⚠️ amarillo)
if (minutos < 15) → OK (🟢 verde)
```

**Impacto:**
- Notificación automática en campanita
- Badge rojo en header
- Alerta destacada con tiempo transcurrido

**Justificación:**
> "Debemos de tener el control en tiempo de contacto para el ejecutivo, lead que llega debería ser gestionado en los próximos 30 minutos"

---

#### 🚦 3. Componente: Indicador de Tiempo de Contacto

**Nuevo archivo:** `src/components/common/TiempoContacto.js`

**Características:**
- Semáforo visual en tiempo real
- 3 estados:
  - 🟢 Verde: < 15 min (dentro del tiempo)
  - 🟡 Amarillo: 15-30 min (advertencia, quedan X min)
  - 🔴 Rojo: > 30 min (CRÍTICO, fuera de tiempo)

- Actualización automática cada 30 segundos
- Animación `pulse` en el indicador
- Tooltip con detalles

**Variantes:**
1. `TiempoContacto` - Completo con texto y detalles
2. `TiempoContactoCompacto` - Solo ícono para tablas

**Uso:**
```javascript
<TiempoContacto 
  fechaRegistro={lead.fechaRegistro}
  ultimoContacto={lead.ultimoContacto}
  estado={lead.estado}
/>
```

---

#### 📊 4. Dashboard del Supervisor: Métricas Consolidadas

**Componente actualizado:** `src/App.js` (Dashboard P05)

**Vista consolidada del equipo:**
- Grid de 4 métricas principales:
  1. 🎯 Ventas totales (actual/meta + %)
  2. 📅 Citas generadas (total + %)
  3. 🔍 Evaluaciones realizadas (total + %)
  4. 📜 Certificados + Ticket promedio del equipo

**Cálculo automático:**
- Suma de métricas de todos los vendedores
- Ticket promedio del equipo
- % de cumplimiento por indicador

**Diseño:**
- Colores distintivos por métrica
- Números grandes para lectura rápida
- Header con nombre de sucursal

---

#### 📥 5. Reporte Consolidado Automatizado

**Nueva función:** `generarReporteConsolidado()` en `mockData.js`

**Contenido del reporte:**
- **Header:** Sucursal, fecha de corte
- **Totales:** Ventas, Citas, Evaluaciones, Certificados, Ticket promedio
- **Por vendedor:**
  - Ventas (actual/meta/%)
  - Citas (actual/meta/%)
  - Evaluaciones (actual/meta/%)
  - Certificados emitidos
  - Ticket promedio individual
  - Ticket vs meta (✓/✗)
  - Leads activos y sin movimiento
  
- **Estados de leads:** Distribución por estado (Nuevo, En seguimiento, etc.)
- **Alertas críticas:**
  - Vendedores <60% de meta
  - Ticket promedio <90% de meta
  - Leads sin movimiento >5

**Botón de exportación:**
- Ubicado en header del dashboard del supervisor
- Texto: "📥 Exportar Reporte Diario"
- Genera preview en alert (en producción → descarga Excel/CSV)

**Formato de salida:**
- Objeto JavaScript con estructura clara
- `csvData` array listo para exportar
- Compatible con librerías de Excel/CSV

**Justificación:**
> "Reporte automatizado: Que el CRM pueda generar automáticamente el cuadro consolidado de derivaciones y estado de los clientes al corte del día"

---

### 🔧 Cambios Técnicos

**Archivos modificados:**

1. **`mockData.js`** (~150 líneas nuevas)
   - Agregadas métricas a VENDEDORES:
     - `citasGeneradas`, `citasMeta`
     - `evaluacionesEquifax`, `evaluacionesMeta`
     - `certificadosEmitidos`
     - `ticketPromedio`, `ticketMeta`
   - `detectarLeadsUrgentes()` → Detección de 30 min
   - `generarReporteConsolidado()` → Nueva función

2. **`src/components/common/MiDesempenio.js`** (~100 líneas nuevas)
   - Import de VENDEDORES desde mockData
   - Grid de 3 indicadores clave
   - Colores distintivos (azul, morado, verde)
   - Alertas visuales de cumplimiento

3. **`src/components/common/Notificaciones.js`** (~30 líneas modificadas)
   - Nuevo nivel de urgencia: `critica`
   - Alerta de lead sin contactar 35 min (mock)
   - Color rojo con borde doble para críticas

4. **`src/components/common/TiempoContacto.js`** (NUEVO - 156 líneas)
   - Componente semáforo visual
   - Lógica de cálculo de tiempo
   - Variante compacta

5. **`src/components/common/index.js`**
   - Export de `TiempoContacto` y `TiempoContactoCompacto`

6. **`src/App.js`** (~120 líneas nuevas)
   - Import de `generarReporteConsolidado` y `VENDEDORES`
   - Dashboard consolidado del supervisor
   - Botón de exportar reporte
   - Grid de 4 métricas del equipo

---

### 📊 Métricas de Implementación

| Componente | Líneas nuevas | Tipo |
|------------|---------------|------|
| mockData.js | ~150 | Modificado |
| MiDesempenio.js | ~100 | Modificado |
| Notificaciones.js | ~30 | Modificado |
| TiempoContacto.js | 156 | NUEVO |
| index.js | 1 | Modificado |
| App.js | ~120 | Modificado |
| **TOTAL** | **~557** | 5 modificados, 1 nuevo |

---

### 🎯 Impacto en el Negocio

#### Para el Asesor:
✅ Visibilidad clara de sus 3 indicadores clave  
✅ Sabe exactamente qué necesita mejorar  
✅ Alerta automática si lead sin contactar >30 min  
✅ Motivación con progreso visual vs meta  

#### Para el Supervisor:
✅ Vista consolidada de todo el equipo  
✅ Reporte diario con 1 click  
✅ Identificación rápida de vendedores con bajo desempeño  
✅ Alertas críticas automáticas  

#### Para el Negocio:
✅ Control estricto de tiempo de contacto  
✅ Seguimiento de ticket promedio ($23,500 target)  
✅ Métricas alineadas con indicadores comerciales  
✅ Trazabilidad completa de derivaciones  

---

### 🚀 Próximos Pasos (Fase 2)

- [ ] Integración con API real para métricas
- [ ] Exportación real a Excel/CSV (librería xlsx)
- [ ] WebSockets para actualización en tiempo real
- [ ] Gráficas de tendencia (Chart.js)
- [ ] Alertas push del navegador
- [ ] Historial de reportes diarios

---

### 📝 Notas de Implementación

**Decisión técnica:** Usar datos de mockData directamente
- Razón: Demo funcional sin backend
- Migración a API: Reemplazar imports por fetch/axios

**Ticket promedio:**
- Meta: $23,500 USD
- Cálculo: Suma de ventas / Número de certificados
- Alert visualalert si <90% de meta

**Tiempo de contacto:**
- Límite estricto: 30 minutos
- Pre-alerta: 15 minutos (amarillo)
- Actualización: Cada 30 segundos

---

## [v2.1.0] - 2026-08-03 (Noche)

### ✨ Nueva Funcionalidad: Minimizar Chat de Agentes

#### Problema Identificado
Los paneles de chat de los agentes (Copiloto y Copiloto Ejecutivo) están sobrepuestos en las pantallas y tapan el contenido, dificultando la visualización de información importante.

#### Solución Implementada
**Feature:** Minimización completa con botón flotante

**Componentes modificados:**
- `src/agents/AgenteCopiloto.js`
- `src/agents/AgenteCopilotoEjecutivo.js`

**Nuevos estados visuales:**
1. **Expandido**: Panel completo visible (estado por defecto)
2. **Minimizado**: Solo header visible (click en botón "−")
3. **Oculto**: Solo botón flotante (click en botón "✕")

**Controles agregados:**
- **Botón "−"** (header): Minimiza el chat manteniendo header visible
- **Botón "✕"** (header): Oculta completamente el panel
- **Botón flotante** (bottom-right): Reabre el panel cuando está oculto
  - Copiloto: Rojo con ícono 💬
  - Copiloto Ejecutivo: Azul con ícono ✦

**Especificaciones técnicas:**
```javascript
// Estado nuevo agregado
const [isMinimized, setIsMinimized] = useState(false);

// Botón flotante
Position: fixed bottom-6 right-6
Size: 14x14 (56px)
Animation: hover:scale-110
```

**Archivos afectados:** 2 archivos, ~30 líneas modificadas  
**Breaking changes:** Ninguno  
**Compatibilidad:** 100% backward compatible

**Documentación:** Ver `FEATURE-MINIMIZAR-CHAT.md`

---

## [v2.0.0] - 2026-08-03

### 🎯 Reunión de Revisión con Cliente (03-AGO-2026)
**Participantes:** Manuela Ballén (Applying), Yrina Suarez Rios (AM MAF)  
**Duración:** 47m 40s  
**Objetivo:** Pre-entrenamiento del demo antes de presentación a cliente  
**Resultado:** 12 cambios críticos e importantes identificados e implementados

---

### ✨ Nuevas Funcionalidades

#### 1. Sistema de Notificaciones Proactivas
- **Componente:** `src/components/common/Notificaciones.js` (232 líneas)
- **Ubicación:** GlobalHeader (campanita 🔔 con badge)
- **Tipos de notificaciones:**
  - Recordatorios manuales del vendedor
  - Alertas de sistema (leads sin movimiento)
  - Leads próximos a cerrarse (5 días sin respuesta)
  - Tareas pendientes
- **Features:** Marcar como leída, contador de no leídas, timestamp relativo
- **Justificación:** Evitar que leads se enfríen por falta de seguimiento

#### 2. Estrategia de Venta Generativa
- **Funciones:** `generarEstrategiaVenta()`, `prepararCita()` en mockData.js
- **Casos de uso:**
  - "Ármame estrategia para llegar a mi meta"
  - "Ayúdame a prepararme para mi cita de mañana"
  - "¿De qué puedo hablarle a este cliente?"
- **Algoritmo:** Análisis de progreso vs meta + recomendaciones contextuales
- **Justificación:** Vendedores no tecnológicos necesitan guía para planificar

#### 3. Dashboard "Mi Desempeño"
- **Componente:** `src/components/common/MiDesempenio.js` (190 líneas)
- **Métricas:** Meta, ventas actuales, tasa de cierre
- **Visualización:** Barra de progreso con línea de avance esperado
- **Colores dinámicos:** Verde (meta superada), Azul (adelantado), Amarillo (ritmo ok), Rojo (requiere acción)
- **Mensajes motivacionales:** Contextuales según estado
- **Justificación:** "Si yo soy yo vendedora este genuinamente siento que me ayuda"

#### 4. Módulo de Onboarding Guiado
- **Componente:** `src/components/common/OnboardingGuiado.js` (265 líneas)
- **Features:** Spotlight effect, tooltips posicionables, navegación paso a paso
- **Tour:** 6 pasos (Sidebar, Nuevo Lead, Agente Asistente, Mi Desempeño, Notificaciones, Copiloto)
- **Inspiración:** AWS QuickSight Q
- **Justificación:** Reducir tiempo de capacitación de nuevos vendedores

---

### 🔄 Cambios en Agentes Existentes

#### Agente 1: Gestor de Conocimiento (Copiloto Embebido)
**Archivos:** `src/agents/AgenteCopiloto.js`, `mockData.js`

**Conocimiento Ampliado (+7 preguntas):**
- "¿Hasta cuántas cuotas puedo ofrecer?" → Máximo 4, primera no negociable
- "¿Qué documentos necesito para la evaluación?"
- "¿Cómo funciona EUFIC?"
- "¿Cuál es el plazo máximo para desembolso?"
- "¿Cómo funciona el scoring de leads?"
- "¿Qué estrategia uso para cerrar más rápido?"
- Integración con estrategia generativa (nuevo)

**UX Mejorado:**
- Chips de preguntas sugeridas más visibles (rojos, `rounded-full`, hover `scale-105`)
- 4 preguntas contextuales por pantalla
- Icono 💡 "Preguntas frecuentes"

**Justificación:** "Siento que ese tipo de experiencia es lo que tenemos que buscar"

#### Agente 2: Seguimiento y Tareas (antes: Asistente Personal)
**Archivo:** `src/agents/AgenteAsistente.js`

**Cambios:**
- **Renombrado:** "Asistente Personal" → "Seguimiento y Tareas"
- **Botón principal:** "Llamar ahora" (rojo) → "Enviar correo de seguimiento" (azul)
- **Data attribute:** `data-agente="asistente"` para onboarding

**Razón del cambio de botón:**
> "El negocio es presencial. Las acciones más útiles son: 1) Enviar correo automático con template personalizable, 2) Agendar cita presencial en concesionario. NO llamadas directas desde la plataforma."

**Justificación:** Negocio de MAF es presencial, no telefónico

#### Agente 3: Priorización de Cartera
**Archivo:** `src/agents/AgentePriorizacion.js`

**Cambios:**
- Verificado nombre correcto (ya era "Priorización de Cartera")
- Sin cambios funcionales (ya cumplía con especificaciones)

#### Agente 4: Copiloto Ejecutivo
**Archivo:** `src/agents/AgenteCopilotoEjecutivo.js`

**UX Mejorado:**
- Chips azules con gradiente (`bg-blue-600`)
- Hover effect mejorado (`scale-105`, shadow)
- Texto actualizado: "💡 Puedes preguntarme:"

---

### 🏗️ Cambios de Arquitectura

#### Dashboard del Vendedor Rediseñado
**Archivo:** `src/App.js`

**Nuevo diseño (3 secciones):**
```
1. 🤖 Seguimiento y Tareas (Agente 2) - Urgencias del día
2. 📊 Mi Desempeño - Meta y progreso visual
3. 📋 Lista de Leads - Tabla tradicional
```

**Antes:** Solo lista de leads  
**Después:** Herramientas agénticas primero, luego lista

**Justificación:**
> "La primera vista inicial, así me lo imagino: primero, mi priorización de cartera, mis tareas, cómo voy. Porque uno tiene que tener claridad de cómo va."

---

### 📝 Actualizaciones de Documentación

**Archivos actualizados:**
- `CHANGELOG.md` (este archivo) - Creado
- `README.md` - Actualizado con nuevos componentes
- `docs/08-agentes-ia-implementados.md` - Actualizado con cambios
- `01-requerimientos.md` - Nuevos requerimientos agregados
- `05-historias-de-usuario.md` - Nuevas historias agregadas

**Nuevos documentos de auditoría:**
- `Transcripciones de Reuniones/CAMBIOS-IDENTIFICADOS-03-08.md` (296 líneas)
- `Transcripciones de Reuniones/IMPLEMENTACION-COMPLETADA-03-08.md` (368 líneas)

---

### 🐛 Correcciones de Bugs

#### Loop Infinito en AgentePriorizacion
- **Problema:** `useEffect` con `leadsConScore` como dependencia causaba loop
- **Solución:** Comentado `useEffect` que causaba el loop
- **Archivo:** `src/agents/AgentePriorizacion.js`
- **Fecha:** 03-AGO-2026 10:51

#### Error de Sintaxis en GlobalHeader
- **Problema:** Código huérfano de GlobalHeader en App.js (parámetros sin función)
- **Solución:** Eliminado bloque duplicado (líneas 54-229)
- **Archivo:** `src/App.js`
- **Fecha:** 03-AGO-2026 19:06

#### Compatibilidad de Datos en calcularScoreLead
- **Problema:** `calcularScoreLead()` fallaba con leads simples de PGLGestionLeads
- **Solución:** Detección automática de estructura (compleja vs simple)
- **Archivo:** `mockData.js`
- **Fecha:** 03-AGO-2026 10:41

---

### 📊 Métricas de Cambios

| Métrica | Valor |
|---------|-------|
| Componentes nuevos | 3 |
| Funciones nuevas en mockData | 2 |
| Preguntas FAQ agregadas | 7 |
| Archivos modificados | 10 |
| Líneas de código nuevas | ~970 |
| Líneas de documentación | ~1,300 |
| Bugs corregidos | 3 |

---

### 🎯 Decisiones de Diseño

#### 1. No Incluir Llamadas Automáticas
**Decisión:** No implementar "llamar por la plataforma" o voice AI  
**Razón:** MAF es un negocio presencial. El flujo es: llamada → agendar cita → reunión presencial  
**Alternativa:** "Enviar correo de seguimiento" con template personalizable  
**Fecha:** 03-AGO-2026  
**Participantes:** Yrina, Manuela

#### 2. Estrategia Generativa sin Internet
**Decisión:** Estrategia de venta usa cálculos + templates, no LLM externo  
**Razón:** "Quisiera que solamente consuma la base de conocimientos"  
**Futuro:** En producción sí usar LLM pero con KB interna  
**Fecha:** 03-AGO-2026  
**Participantes:** Yrina, Manuela

#### 3. Dashboard con Herramientas Primero
**Decisión:** Dashboard muestra agentes antes que lista de leads  
**Razón:** Maximizar adopción mostrando valor desde el primer pantallazo  
**Referencia:** "La idea es que la audiencia tiene que mirarlo y entenderlo antes que yo diga"  
**Fecha:** 03-AGO-2026  
**Participantes:** Yrina, Manuela

#### 4. Onboarding Inspirado en AWS
**Decisión:** Tour guiado con spotlight (no solo popups de "siguiente")  
**Referencia:** AWS QuickSight Q - sombrea pantalla y resalta elemento  
**Razón:** Más efectivo que popups tradicionales  
**Fecha:** 03-AGO-2026  
**Participantes:** Manuela

---

### ⚠️ Limitaciones Conocidas

1. **Estrategia Generativa:** Usa templates, no LLM real
2. **Notificaciones:** Mock data, no backend real
3. **Onboarding:** Depende de selectores CSS estables
4. **Mi Desempeño:** Datos hardcoded (meta=100, actual=30)

---

### 🚀 Próximos Pasos

**Para Demo del 09-AGO:**
- [ ] Testing manual según checklist
- [ ] Screenshots de los 4 agentes + nuevos componentes
- [ ] Video product tour (Story Lane style)
- [ ] Script de presentación

**Fase 2 (Q4 2026):**
- [ ] API REST para notificaciones
- [ ] LLM real para estrategia (GPT-4/Claude)
- [ ] Persistencia de recordatorios en BD
- [ ] WebSockets para notificaciones en tiempo real

---

## [v1.0.0] - 2026-08-02

### ✨ Implementación Inicial

- ✅ 4 Agentes de IA implementados
- ✅ Arquitectura modular (ES6 modules)
- ✅ mockData.js con datos coherentes
- ✅ HTML reducido de 6,742 → 67 líneas (98.9%)
- ✅ Documentación técnica completa

**Ver:** `docs/08-agentes-ia-implementados.md` para detalles

---

## Formato de Entradas

Cada cambio debe incluir:
- **Fecha**
- **Tipo:** [Funcionalidad|Bug|Arquitectura|Documentación|Decisión]
- **Descripción**
- **Archivos afectados**
- **Justificación** (si aplica)
- **Referencias** (reuniones, tickets)

---

**Última actualización:** 03-AGO-2026 11:40 AM  
**Mantenido por:** Equipo Applying
