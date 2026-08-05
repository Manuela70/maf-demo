# Agente 4: Copiloto Ejecutivo - Documentación de Implementación

**Fecha:** 2 de agosto de 2026  
**Estado:** ✅ Implementado  
**Archivos creados/modificados:**
- `src/agents/AgenteCopilotoEjecutivo.js` (nuevo)
- `src/App.js` (modificado)

---

## Descripción General

El **Agente 4: Copiloto Ejecutivo** es un agente de analítica conversacional diseñado para responder en lenguaje natural preguntas sobre el estado del negocio, eliminando la necesidad de armar reportes manualmente.

### Especialidad
Responder en lenguaje natural cómo va el negocio, para que quien decide no dependa de armar reportes.

### Nivel de Impacto
**Supervisor / Director / Gerente**

### Complejidad
**MEDIA**

### Mensaje Clave
> "¿Qué mejores decisiones toma tu dirección comercial cuando tiene la respuesta en línea, en el momento en que la pregunta?"

---

## Características Implementadas

### 1. Interfaz Conversacional
- Panel lateral fijo (similar a los otros agentes)
- Sistema de mensajes tipo chat
- Indicador de "typing" mientras procesa
- Timestamps en cada mensaje
- Diseño diferenciado con gradiente azul para distinguirlo de otros agentes

### 2. Preguntas Soportadas

El agente puede responder las siguientes preguntas ejecutivas (definidas en `mockData.js`):

1. **"¿Cómo va mi equipo hoy?"**
   - Muestra ventas del mes vs meta
   - Identifica mejor vendedor
   - Alerta sobre vendedores con bajo desempeño
   - Muestra leads sin gestión

2. **"¿Quién es mi mejor y peor vendedor?"**
   - Compara vendedores por ventas y efectividad
   - Explica la brecha principal
   - Ofrece drill-down a la cartera del peor vendedor

3. **"¿Qué sucursal cayó esta semana?"**
   - Identifica sucursales con caída en ventas
   - Explica el motivo de la caída
   - Ofrece drill-down por asesor de la sucursal

4. **"¿Cómo está la conversión?"**
   - Muestra tasa de conversión actual
   - Calcula el impacto de mejorar la conversión
   - Sugiere oportunidad de mejora

### 3. Funcionalidades Avanzadas

#### Formateo de Texto con Markdown
- Soporta **negrita** usando `**texto**`
- Parsea y renderiza correctamente en React

#### Drill-Down Interactivo
- Botones de acción en las respuestas
- Callback `onDrillDown` para aplicar filtros
- Integración con la tabla de leads del dashboard

#### Contexto Dinámico
- Muestra información de la sucursal actual
- Número de asesores y leads en contexto
- Ajusta respuestas según el rol (supervisor/gerente)

#### Preguntas Sugeridas
- Chips con preguntas frecuentes
- Adaptadas según el rol del usuario
- Click para enviar pregunta automáticamente

---

## Integración en el Sistema

### Ubicación en el Dashboard

El Agente 4 se muestra en:

1. **Panel de Gerente** (`rol === 'gerente'`)
   - Aparece en la parte superior del dashboard
   - Tiene acceso a métricas de todas las sucursales
   - Preguntas orientadas a análisis estratégico

2. **Panel de Supervisor** (`rol === 'supervisor'`)
   - Aparece en la parte superior del dashboard
   - Enfocado en métricas del equipo de la sucursal
   - Preguntas orientadas a gestión operativa

### Arquitectura

```
AgenteCopilotoEjecutivo
├── Props
│   ├── rol: 'supervisor' | 'gerente'
│   ├── sucursalId: string
│   ├── onDrillDown: function(filtro)
│   └── className: string
│
├── Estado Local
│   ├── isOpen: boolean
│   ├── messages: Array<Message>
│   ├── inputValue: string
│   └── isTyping: boolean
│
└── Funciones
    ├── buscarRespuesta(pregunta)
    ├── handleSend(preguntaText)
    ├── handleAccion(filtro)
    └── formatearTexto(texto)
```

---

## Datos Utilizados

### Fuentes de Datos (mockData.js)

```javascript
PREGUNTAS_EJECUTIVAS = {
  'como_va_equipo': {
    pregunta: '¿Cómo va mi equipo hoy?',
    respuesta: (data) => { ... }
  },
  'mejor_peor_vendedor': { ... },
  'sucursal_cayo': { ... },
  'conversion': { ... }
}

VENDEDORES = [...]
SUCURSALES = [...]
LEADS = [...]
METRICAS_DASHBOARD = { ... }
```

### Contexto Calculado

El agente construye un contexto dinámico:

```javascript
const dataContext = {
  sucursal: SUCURSALES.find(s => s.id === sucursalId),
  vendedores: VENDEDORES.filter(v => v.sucursal === sucursal.nombre),
  leads: LEADS.filter(l => l.sucursal === sucursal.nombre)
};
```

---

## Comportamiento Proactivo

Siguiendo las directrices del handoff, el agente es **proactivo**:

1. **Mensaje de Bienvenida Automático**
   ```javascript
   useEffect(() => {
     setTimeout(() => {
       setMessages([{
         type: 'agent',
         text: '👋 Hola, soy tu Copiloto Ejecutivo...',
         timestamp: new Date()
       }]);
     }, 500);
   }, [rol]);
   ```

2. **El agente "habla primero"** al cargar el dashboard
3. **Preguntas sugeridas visibles** para guiar al usuario
4. **Respuestas con acciones** para drill-down inmediato

---

## Estilos y Diseño

### Colores Distintivos
- **Fondo:** Gradiente gris oscuro (`from-gray-900 via-gray-800 to-gray-900`)
- **Acento:** Azul (`border-blue-500`, `bg-blue-600`)
- **Header:** Gradiente azul (`from-blue-900 to-blue-800`)
- **Icono:** ✦ (estrella decorativa en círculo azul)

### Diferenciación de Otros Agentes
- **Agente 1 (Copiloto):** Rojo - Especialista en conocimiento del sistema
- **Agente 2 (Asistente):** Rojo oscuro - Especialista en seguimiento
- **Agente 4 (Ejecutivo):** Azul - Especialista en analítica ejecutiva

---

## Matching de Preguntas

El sistema usa **keyword matching simple** para identificar intenciones:

```javascript
const buscarRespuesta = (pregunta) => {
  const preguntaLower = pregunta.toLowerCase();
  
  if (preguntaLower.includes('equipo') || preguntaLower.includes('cómo va')) {
    return PREGUNTAS_EJECUTIVAS['como_va_equipo'];
  }
  if (preguntaLower.includes('mejor') || preguntaLower.includes('peor')) {
    return PREGUNTAS_EJECUTIVAS['mejor_peor_vendedor'];
  }
  // ... más patrones
};
```

**Nota:** Para Fase 1 esto es suficiente. En Fase 2 se podría integrar Amazon Q o procesamiento de lenguaje natural avanzado.

---

## Drill-Down y Filtros

Las respuestas pueden incluir acciones para drill-down:

```javascript
{
  texto: "Vas en **58 ventas** este mes...",
  acciones: [
    { 
      texto: 'Ver los 9 leads sin gestión', 
      filtro: { estado: 'Nuevo' } 
    }
  ]
}
```

Al hacer click, se ejecuta `onDrillDown(filtro)` que puede:
- Aplicar filtros a la tabla de leads
- Navegar a una vista detallada
- Actualizar el estado de la aplicación

---

## Pruebas y Validación

### Para Probar el Agente

1. **Como Supervisor:**
   ```
   - Cambiar rol a "Supervisor Comercial"
   - Navegar al Dashboard
   - Verificar que aparece el panel azul del Copiloto Ejecutivo
   - Probar las preguntas sugeridas
   ```

2. **Como Gerente:**
   ```
   - Cambiar rol a "Gerente Comercial"
   - Navegar al Dashboard
   - Verificar que aparece el panel azul del Copiloto Ejecutivo
   - Probar las preguntas sugeridas
   ```

### Preguntas de Prueba

Escribir o hacer click en:
- "¿Cómo va mi equipo hoy?"
- "¿Quién es mi mejor y peor vendedor?"
- "¿Qué sucursal cayó esta semana?"
- "¿Cómo está la conversión?"

### Resultados Esperados

- **Respuesta inmediata** (después de ~1 segundo de typing)
- **Texto formateado** con negritas en cifras clave
- **Botones de acción** para drill-down
- **Información contextual** de la sucursal

---

## Limitaciones y Fase 2

### Limitaciones Actuales (Fase 1)

1. **Matching Simple:** Usa keywords, no NLP avanzado
2. **Respuestas Pre-definidas:** 4 preguntas configuradas
3. **Datos Mock:** No conecta con BD real
4. **Sin Historial Persistente:** Mensajes se pierden al recargar

### Mejoras Propuestas (Fase 2)

1. **Amazon Q Integration**
   - Analítica conversacional sobre QuickSight
   - Preguntas en lenguaje natural sin límite
   - Generación dinámica de visualizaciones

2. **Conexión a BD Real**
   - Aurora PostgreSQL → SPICE → QuickSight
   - Métricas en tiempo real
   - Drill-down a data transaccional

3. **Historial de Conversación**
   - Guardar sesiones en DynamoDB
   - Contexto entre sesiones
   - Aprendizaje de patrones de preguntas

4. **Alertas Proactivas**
   - Notificaciones automáticas de anomalías
   - Sugerencias basadas en tendencias
   - Comparativas temporales

---

## Mensaje Comercial

### Pregunta-Gancho (para la presentación)
> "¿Qué mejores decisiones toma tu dirección comercial cuando tiene la respuesta en línea, en el momento en que la pregunta?"

### Beneficio por Nivel

| Nivel | Beneficio |
|-------|-----------|
| **Supervisor** | Mejor seguimiento y control del equipo sin armar reportes |
| **Director/Gerente** | Mejores decisiones con data en línea, al instante |
| **Gerente General** | Control ejecutivo y visibilidad estratégica |

### ROI

- **Tiempo ahorrado:** ~2-3 horas/día del supervisor en armar reportes
- **Mejor decisión:** Acceso a data crítica en <30 segundos
- **Escalabilidad:** El mismo supervisor puede gestionar más vendedores

---

## Checklist de Implementación

- ✅ Archivo `AgenteCopilotoEjecutivo.js` creado
- ✅ Import agregado en `App.js`
- ✅ Integración en dashboard de **gerente**
- ✅ Integración en dashboard de **supervisor**
- ✅ Uso de `PREGUNTAS_EJECUTIVAS` de `mockData.js`
- ✅ Panel lateral con diseño diferenciado (azul)
- ✅ Mensaje proactivo al cargar
- ✅ Preguntas sugeridas según rol
- ✅ Formateo de texto con markdown
- ✅ Drill-down con callbacks
- ✅ Indicador de contexto (sucursal, asesores, leads)
- ✅ Respuesta genérica para preguntas no reconocidas

---

## Referencias

- **Handoff:** `/handoff-agentes-maf-fase1.md` - Sección "Agente 4 de 4"
- **Mock Data:** `/mockData.js` - Sección `PREGUNTAS_EJECUTIVAS`
- **Agentes Relacionados:**
  - Agente 1: `src/agents/AgenteCopiloto.js`
  - Agente 2: `src/agents/AgenteAsistente.js`

---

## Contacto y Soporte

**Implementado por:** Kiro (AI Agent)  
**Fecha:** 2 de agosto de 2026  
**Versión:** 1.0 - Fase 1
