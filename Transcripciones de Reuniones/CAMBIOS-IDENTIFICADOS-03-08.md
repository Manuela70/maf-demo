
# Cambios Identificados - Reunión 03-AGO-2026

**Fuente:** sync-maf-avance-demo-agentes-03-08.md  
**Participantes:** Manuela Ballén (Applying) y Yrina Suarez Rios (Account Manager MAF)  
**Duración:** 47m 40s

---

## 📋 Resumen Ejecutivo

De la revisión del demo surgieron cambios importantes respecto al handoff original (`handoff-agentes-maf-fase1.md`). Los cambios se centran en:
- Fusión/redefinición de agentes 2 y 3
- Ajustes al dashboard inicial del vendedor
- Ampliación del alcance del asistente de conocimiento
- Mejoras UX en priorización de leads

---

## 🔄 Cambios por Agente

### 1. Agente 2 + 3: Fusión/Redefinición

**Problema identificado:** Los agentes 2 (Asistente Personal) y 3 (Priorización) tienen overlaps y pueden confundir.

#### Decisión Final:
**Mantener 2 agentes separados pero renombrados:**

**A. Agente "Priorización de Cartera" (antes Agente 3)**
- **Función:** Ordenar leads por probabilidad de cierre (semáforo 🟢🟡🔴)
- **Ubicación:** Pantalla `/lead/list`
- **Características:**
  - Scoring por reglas de negocio (ingreso, fuente, ICP)
  - Semáforo visual: Caliente (>70) | Tibio (50-69) | Frío (<50)
  - Toggle ON/OFF
  - Columna "Por qué" explicable
  - Vista de top 3 priorizados

**B. Agente "Seguimiento y Tareas" (antes Agente 2)**
- **Función:** Recordatorios y acciones pendientes
- **Ubicación:** Dashboard del vendedor
- **Características:**
  - Leads sin movimiento hace X días
  - Recordatorios programados por el vendedor
  - Reglas de negocio: "se cierra si no responde en 5 días"
  - Cambios de estado sin actualizar en 3 días
  - **NUEVO:** Botón "Enviar correo de seguimiento" (reemplaza "Llamar")

#### Cambio Crítico en Acciones:
```diff
- Botón "Llamar ahora" 
- Botón "Contactar"
+ Botón "Enviar correo de seguimiento"
```

**Razón:** El negocio es presencial. Las acciones más útiles son:
1. **Enviar correo automático** con template personalizable
2. **Agendar cita** presencial en concesionario
3. NO llamadas directas desde la plataforma (fuera de alcance Fase 1)

---

### 2. Agente 1: Asistente Conversacional - AMPLIACIÓN

**Cambios al alcance:**

#### A. Conocimiento Ampliado (3 tipos):
1. **Plataforma** (ya implementado)
   - Cómo usar Dynamics
   - Cómo crear un lead
   - Navegación

2. **Datos del vendedor** (ya implementado)
   - "¿Cuándo llamé a Carlos Mendoza?"
   - "¿Cuántos leads cerré este mes?"
   - "¿Cuál es mi tasa de conversión?"

3. **Negocio MAF** ⭐ NUEVO
   - "¿Hasta cuántas cuotas puedo ofrecer?" → "Máximo 4 cuotas, pero la primera (inscripción) es no negociable"
   - "¿Qué documentos pide la evaluación?"
   - "¿Cómo funciona el tema de EUFIC?"
   - Estrategias de cierre

#### B. Onboarding Guiado ⭐ NUEVO
- **Inspiración:** AWS QuickSight Q (ver minuto 19:34-28:16)
- **Funcionalidad:**
  - Paso a paso interactivo para nuevos vendedores
  - Resalta campos/botones en pantalla (sombrea el resto)
  - Explica qué hacer en cada paso
  - Reduce tiempo de capacitación presencial

#### C. Estrategia de Venta ⭐ NUEVO (Generativa)
- **Casos de uso:**
  - "Ármame estrategia para llegar a mi meta de 100 ventas (voy en 30 a mitad de mes)"
  - "¿De qué puedo hablarle a este cliente?" (basado en su perfil)
  - "Ayúdame a prepararme para la cita de mañana"

**Nota:** Evitar conexión a Internet. Consumir solo base de conocimientos interna.

---

### 3. Agente 4: Copiloto Ejecutivo - SIN CAMBIOS MAYORES

**Ajustes menores:**
- Agregar **preguntas sugeridas** visibles (chips clicables)
- Ejemplos específicos de MAF:
  - "¿Cuáles son los vendedores con menor tasa de cierre?"
  - "¿Cuál es el concesionario con más ventas este mes?"
  - "¿Qué vendedor tiene leads estancados?"

---

## 🖥️ Cambios de UX/UI

### Dashboard Inicial del Vendedor (Pantalla Principal)

**Vista actual:**
```
/dashboard → Lista de leads directamente
```

**Vista propuesta:**
```
/dashboard → Nuevo diseño:
┌─────────────────────────────────────┐
│ 1. Priorización de Cartera (top 3) │  ← Agente 3
│    🟢 Carlos Mendoza - Score: 92   │
│    🟢 Ana Torres - Score: 85       │
│    🟡 María Ruiz - Score: 65       │
├─────────────────────────────────────┤
│ 2. Seguimiento y Tareas            │  ← Agente 2
│    🔴 Lead sin contacto hace 5 días│
│    🟡 Recordatorio: Llamar a X     │
├─────────────────────────────────────┤
│ 3. Mi Desempeño                    │  ← NUEVO
│    Meta: 100 ventas | Voy: 30     │
│    Tasa de cierre: 5.3%           │
│    📊 Progreso visual (curvita)    │
└─────────────────────────────────────┘
```

**Objetivo:** Primera impresión debe ser "wow, esto me ayuda" sin necesidad de explicación.

---

## 🆕 Funcionalidades Nuevas Identificadas

### 1. Botón "Enviar Correo de Seguimiento"
- **Ubicación:** Agente 2 (Seguimiento y Tareas)
- **Función:**
  - Al hacer click: abre template de correo prellenado
  - Vendedor puede personalizar
  - Se envía automáticamente
  - Se registra en historial del lead
- **Mensaje tipo:** "Hola [Cliente], te estoy contactando para saber cuál es el mejor momento para llamarte..."

### 2. Recordatorios Proactivos
- **Función:** Campanita de notificaciones
- **Tipos:**
  - Recordatorios manuales del vendedor ("Retomar llamada mañana")
  - Recordatorios automáticos por reglas de negocio:
    - "Lead se va a cerrar (no respondió en 5 días)"
    - "Lead sin cambio de estado hace 3 días"

### 3. Módulo de Onboarding
- **Tipo:** Tour guiado interactivo
- **Tecnología:** Similar a productos SaaS (popups de "Siguiente, siguiente")
- **Alcance:** Reducir capacitaciones presenciales
- **Backup:** Si el vendedor olvida algo, usa el asistente conversacional

### 4. Dashboard "Mi Desempeño"
- **Métricas:**
  - Meta del mes (configurable por vendedor)
  - Ventas cerradas
  - Tasa de cierre
  - Progreso visual (curva/barra)
- **Objetivo:** Motivar o presionar al vendedor según desempeño

### 5. Ticket de Soporte Directo ⭐ IDEA FUTURA
- **Propuesta:** Botón para crear ticket desde la plataforma
- **Flujo:**
  - Vendedor → Captura pantalla + descripción
  - Se crea ticket automático
  - Llega a Applying (soporte) + alerta a supervisor MAF
  - Evita escalaciones innecesarias (vendedor → supervisor → TI → Applying)
- **Estado:** Pendiente de análisis

---

## 📊 Integraciones Adicionales Propuestas

### 1. MCP Server
- **Qué es:** Model Context Protocol server
- **Beneficio:** Facilita integración con Claude u otras herramientas IA
- **Estado:** Por definir en alcance

### 2. WhatsApp para Creación de Leads
- **Función:** Crear leads por lenguaje natural vía WhatsApp
- **Caso de uso:** "Hola, tengo un cliente interesado en Hyundai Tucson, gana S/8000, trabaja en Banco..."
- **Estado:** Fase 2

### 3. Base de Conocimientos de Negocio
- **Contenido:**
  - Políticas de cuotas
  - Documentación EUFIC
  - Estrategias de cierre
  - FAQs de negocio
- **Consumo:** Agente 1 (Asistente Conversacional)
- **Fuente:** Documentación interna de MAF

---

## ⚠️ Limitaciones y Aclaraciones

### Modelo de Negocio MAF
- **Venta presencial:** La mayoría de acciones son cara a cara
- **Contacto inicial:** Llamada telefónica para agendar cita
- **No usan mucho correo:** Pero sí lo tienen como canal secundario
- **Descarte rápido:** Si no contestan en 2-3 intentos, se marca como "No contactado" y se descarta

### Usuario Final
- **Perfil:** Vendedor tradicional, NO muy tecnológico
- **Experiencia:** Usuario operativo, no corporativo
- **Expectativa:** Sistema amigable, no abrumador
- **Adopción:** Máximo impacto en negocio, mínimo impacto en cambio de hábitos

### Filosofía de los Agentes
- **Menos es más:** No sobre-sofisticar en Fase 1
- **Impacto medible:** Cada agente debe resolver un problema claro
- **Adopción natural:** Usuario entiende el valor sin explicación
- **Ejemplo PN:** Agentes que genuinamente ayudan (% de cierre, leads sin movimiento)

---

## 🎯 Priorización de Cambios

### CRÍTICO (Implementar antes del demo)
1. ✅ Botón "Enviar correo" en lugar de "Llamar" (Agente 2)
2. ✅ Renombrar agentes:
   - "Priorización de Cartera" (semáforo)
   - "Seguimiento y Tareas" (recordatorios)
3. ✅ Nuevo dashboard inicial con 3 secciones
4. ✅ Agregar conocimiento de negocio al asistente (ejemplos)
5. ✅ Preguntas sugeridas visibles (chips) en Agente 1 y 4

### IMPORTANTE (Nice-to-have para demo)
6. ⚪ Módulo de onboarding guiado
7. ⚪ Recordatorios con campanita
8. ⚪ Dashboard "Mi Desempeño" con métricas

### FUTURO (Fase 2)
9. 🔮 Estrategia de venta generativa
10. 🔮 Integración WhatsApp
11. 🔮 Ticket de soporte directo
12. 🔮 MCP Server

---

## 📝 Notas Adicionales

### Presentación del Demo
- **Formato sugerido:** Video grabado tipo "product tour" (referencia: Story Lane)
- **Estructura:**
  1. Dashboard inicial (impacto visual)
  2. Interacción con agentes (casos reales)
  3. Flujo completo vendedor → cierre
- **Enfoque:** Mostrar valor antes de explicar

### Ejemplos para el Asistente
- **Fuente:** Pedir a Claude/GPT que genere casos de uso reales
- **Objetivo:** Que la audiencia diga "wow, esto me sirve" antes de que Yrina explique
- **Cantidad:** 2-3 ejemplos por agente

### Timeline
- **Ajustes:** Antes de almuerzo del 03-AGO
- **Iteraciones:** 8:30 AM, 1-2 PM, o 5 PM del 04-AGO
- **Demo final:** Viernes 09-AGO (presentación a cliente)

---

## ✅ Checklist de Implementación

- [ ] Cambiar botón "Llamar" → "Enviar correo de seguimiento"
- [ ] Renombrar Agente 2 → "Seguimiento y Tareas"
- [ ] Renombrar Agente 3 → "Priorización de Cartera"
- [ ] Diseñar nuevo dashboard inicial (3 secciones)
- [ ] Agregar 3-4 preguntas de negocio MAF al Agente 1
- [ ] Agregar chips de preguntas sugeridas (Agente 1 y 4)
- [ ] Crear mockup de "Mi Desempeño" (meta + progreso)
- [ ] Documentar flujo de "Enviar correo"
- [ ] Actualizar docs/08-agentes-ia-implementados.md
- [ ] Preparar script de presentación del demo

---

**Última actualización:** 03-AGO-2026  
**Próxima revisión:** 04-AGO-2026 (mañana)
