# Cambios Identificados - Reunión 05-AGO-2026
## Presentación de Demo MAF - Preparación Pitch

**Fecha de reunión:** 05-AGO-2026  
**Participantes:** Manuela Ballén (Applying) y Yrina Suarez Rios (Account Manager MAF)  
**Duración total:** 56 minutos (2 grabaciones)  
**Fecha de presentación al cliente:** 09-AGO-2026, 8:30 AM  
**Audiencia:** Claudia Díaz (CEO), Luis Cartulin (Gerente de TI), Gerente de Operaciones

---

## 📋 RESUMEN EJECUTIVO

**Objetivo de la reunión:** Preparar demo final para presentación a la CEO de MAF  
**Enfoque:** Mostrar el día a día del asesor de manera fluida y rápida  
**Formato:** Demo grabada en Story Lane + preparación de preguntas técnicas  

---

## 🆕 NUEVOS MÓDULOS Y FUNCIONALIDADES

### 1. MÓDULO DE CITAS / CALENDARIO ⭐ CRÍTICO

**Contexto:**
> "Sería genial tener un botoncito donde se vayan automáticamente las citas... ver todas las citas que yo he ido agendando"

**Requisitos:**

#### A. Agendamiento de Citas
- Campo de fecha/hora de cita en el lead
- Estado de cita:
  - `Cita programada`
  - `Cita confirmada`
  - `Asistió`
  - `No asistió`

#### B. Vista "Mis Citas"
- Módulo/botón separado en el sidebar
- Lista de todas las citas agendadas
- Filtros:
  - Citas de hoy
  - Citas pendientes
  - Citas pasadas (asistió/no asistió)
- Estados visuales con colores

#### C. Recordatorios de Cita
- El día de la cita: "Hoy tienes cita con [Cliente]"
- **Imperativo:** Marcar asistencia antes de continuar proceso
- Bloqueo del flujo hasta que marque asistió/no asistió

#### D. Integración con Call Center
- Call center asigna cita directamente
- El lead llega ya con:
  - Fecha y hora de cita
  - Concesionario asignado
  - Modelo de interés
  - Notas del call center

**Prioridad:** ALTA  
**Impacto:** Fundamental para el proceso de ventas  
**Justificación:**
> "Esto también sería genial, eso no tienen los chicos... deberíamos poder ingresar a un botoncito de mis citas y que se despliegue todas las citas"

---

### 2. ACCESO AL CRM PARA CALL CENTER ⭐ CRÍTICO

**Contexto:**
> "Juan Carlos nos pidió que los del call center también tengan acceso al CRM"

**Problema actual:**
- Call center deriva leads por WhatsApp
- Información se pierde (no hay trazabilidad)
- Ejecutivo no registra en el CRM

**Solución:**
- Call center debe tener acceso al CRM
- Crear leads directamente en la plataforma
- Agendar citas desde el CRM
- Fuente: "Call Center" (diferenciado)

**Requisitos:**
- Nuevo rol: `Call Center`
- Permisos:
  - Crear leads
  - Agendar citas
  - Ver solo sus propios leads
  - Agregar notas
- Campos específicos:
  - Modelo de interés
  - Concesionario sugerido
  - Fecha/hora de cita
  - Notas del call center

**Prioridad:** ALTA  
**Justificación:**
> "No puedo tener una gestión donde me derivan por WhatsApp... yo creo que eso no ayuda a una buena gestión y por ahí se pierde el seguimiento"

---

### 3. MÓDULO DE ASIGNACIÓN DE METAS ⭐ IMPORTANTE

**Contexto:**
> "Debería haber un módulo de metas para que se pueda asignar"

**Requisitos:**

#### A. Asignación de Metas
- Supervisor puede asignar metas a cada asesor
- Tipos de metas:
  1. **Meta de Citas** (mensual)
  2. **Meta de Evaluaciones** (mensual)
  3. **Meta de Certificados/Ventas** (mensual)
  4. **Ticket Promedio** ($23,500 USD)

#### B. Trazabilidad
- Historial de metas asignadas
- Cambios de meta (log)
- Comparación mes a mes

#### C. Vista para Supervisor
- Asignar metas por vendedor
- Asignar metas por concesionario
- Metas consolidadas del equipo

**Prioridad:** MEDIA  
**Fase:** Puede ser Fase 2, pero mencionar en demo

---

### 4. RECOMENDACIONES GENERATIVAS PARA EL ASESOR ✨ DIFERENCIADOR

**Contexto:**
> "Algo como: a este paso tienes que cerrar 2 ventas por día para llegar a tu meta"

**Requisitos:**

#### A. En "Mi Desempeño"
- Mensaje de recomendación contextual
- Cálculo automático:
  - Ventas faltantes
  - Días restantes
  - Ventas por día necesarias

#### B. Mensajes tipo:
- ✅ "Vas adelantado, mantén el ritmo"
- ⚠️ "Necesitas cerrar 2 ventas por día para llegar a tu meta"
- 🔴 "URGENTE: Requieres 3 ventas diarias para recuperar"

#### C. Recomendaciones adicionales:
- "Deberías llamar a X leads HOT hoy"
- "Enfócate en leads con citas agendadas"
- "Tienes X leads sin contactar >3 días"

**Prioridad:** MEDIA-ALTA  
**Tipo:** Generativa (no predictiva)  
**Justificación:**
> "Me gusta la idea de que el sistema pueda dar una guía... como que el sistema pueda dar recomendaciones"

---

### 5. MÓDULO DE SEGUIMIENTO DE CUOTAS CIA ⭐ IMPORTANTE

**Contexto:**
> "Las cuotas de inscripción, puede que pague en cuotas... el vendedor tiene que hacerle seguimiento"

**Requisitos:**

#### A. Vista de Cuotas Pendientes
- Panel separado: "Cuotas CIA Pendientes"
- Lista de clientes con cuotas pendientes
- Información:
  - Cliente
  - Monto total
  - Monto pagado
  - Monto pendiente
  - Cuotas restantes (máx. 3-4)
  - Fecha próximo pago

#### B. Recordatorios de Cobro
- Notificación: "Hoy debes cobrar a [Cliente]"
- Alerta si cuota vencida
- Historial de pagos

#### C. Acciones
- Registrar pago de cuota
- Enviar recordatorio de pago
- Ver historial de pagos

**Prioridad:** ALTA  
**Justificación:**
> "El vendedor tiene que hacerle seguimiento... ese módulo no sé dónde estaría"

---

## 🔄 MEJORAS A FUNCIONALIDADES EXISTENTES

### 6. MEJORAS AL DASHBOARD DEL ASESOR

#### A. Mensaje Motivacional con Objetivo Diario
**Actual:** Muestra progreso general  
**Nuevo:** Mostrar objetivo diario calculado

Ejemplo:
```
📊 Objetivo Diario: 2 ventas
Progreso hoy: 0/2
Faltan: 15 días | Meta mensual: 30 ventas restantes
```

**Cálculo:**
```javascript
ventasFaltantes = meta - ventasActuales
diasRestantes = diasDelMes - diasTranscurridos
objetivoDiario = ventasFaltantes / diasRestantes
```

#### B. Corrección de Texto en Botón
**Actual:** "Enviar correo de seguimiento"  
**Nuevo:** "Enviar WhatsApp de seguimiento"

**Justificación:**
> "Aquí no corregimos la del correo, ahí enviar WhatsApp de seguimiento"

---

### 7. MEJORAS AL SISTEMA DE NOTIFICACIONES

**Nuevos tipos de notificaciones:**

1. **Nuevo Lead Asignado**
   - "Te han asignado un nuevo lead: [Nombre] - [Fuente]"
   - Prioridad: ALTA

2. **Lead de Call Center con Cita**
   - "Nuevo lead de Call Center con cita programada para [Fecha]"
   - Incluye: Concesionario, Modelo de interés

3. **Recordatorio de Cita**
   - "Hoy tienes cita con [Cliente] a las [Hora]"
   - Prioridad: CRÍTICA

4. **Cobro de Cuota CIA**
   - "Hoy debes cobrar cuota a [Cliente] - Monto: $[X]"
   - Prioridad: ALTA

5. **Meta Alcanzada**
   - "¡Felicitaciones! [Vendedor] alcanzó su meta de certificados"
   - Para supervisor

**Notificaciones para Supervisor:**
- Lead sin contactar >30 min (del equipo)
- Concesionario llegó a meta
- Vendedor cerca de meta (80%+)

---

### 8. DASHBOARD DEL SUPERVISOR

#### A. Filtros Adicionales
**Actual:** Filtro por asesor  
**Nuevo:** Filtro por concesionario/dealer

**Justificación:**
> "Por concesionario... ellos dicen que hacen cortes por concesionario o por dealer"

#### B. Reporte por Concesionario
- Botón: "Exportar Reporte por Concesionario"
- Contenido:
  - Métricas del concesionario
  - Leads derivados
  - Conversión
  - Ventas cerradas

**Uso:**
> "El supervisor tiene que exigir al concesionario que traiga más leads... tienes que ir con data y ese es el reporte que envían diariamente"

---

### 9. MEJORAS VISUALES Y UX

#### A. Logo en Pantalla de Login
**Requisito:** Agregar logo de MAF en pantalla inicial de login

**Justificación:**
> "No podemos poner el loguito en la primera pantalla... para que la expectativa suba desde el minuto cero"

#### B. Cambio de Etiqueta
**Componente:** Indicador de Evaluaciones  
**Actual:** "Evaluaciones"  
**Nuevo:** "Evaluaciones Crediticias Aprobadas" o "Evaluaciones Equifax"

**Justificación:**
> "Si yo leo evaluaciones puede ser satisfacción, NPS... para que sea más claro"

---

## 🎯 FLUJO DEL DEMO (STORYTELLING)

### Personaje: María López (Asesora)

**Hora:** 8:00 AM

#### 1. INICIO DEL DÍA
```
1. Login a la plataforma
2. Ver "Mi Desempeño"
   - Progreso vs meta
   - Objetivo diario: "Debes cerrar 2 ventas hoy"
   - Indicadores: Citas, Evaluaciones, Certificados
3. Ver sugerencia del sistema
```

#### 2. REVISIÓN DE TAREAS CRÍTICAS
```
4. Ver "Seguimiento y Tareas"
5. Leads priorizados (🟢🟡🔴)
6. Llamar a C. Rojas
   - No contesta
   - Enviar WhatsApp de seguimiento
```

#### 3. GESTIÓN DE CITA (FLUJO EXITOSO)
```
7. Lead de Call Center con cita programada
   - Fuente: Call Center
   - Cita: Hoy, 10:00 AM
   - Concesionario: Autoespar San Isidro
   - Modelo: Toyota Corolla
   
8. Marcar asistencia: "Sí asistió"
   
9. Evaluación Crediticia
   - Ingresos
   - Modelo
   - Número de cuotas
   - Resultado: ✅ APROBADO

10. Proceso de Venta
    - Llenar datos rápidamente
    - OTP para cumplimiento
    - Firma de contrato
    
11. Seguimiento de Cuotas CIA
    - Cliente pagó 1ra cuota
    - Pendiente: 50% de cuota de inscripción
    - Programar recordatorio: 15 días
```

#### 4. CIERRE DEL FLUJO
```
12. Lead marcado como "Cerrado - Ganado"
13. Actualización automática de métricas
14. Certificado emitido
```

---

### Supervisor: Juan Pérez

#### 1. VISTA DEL SUPERVISOR
```
1. Dashboard con métricas del equipo
2. Notificaciones:
   - "Nuevo lead para Autoespar San Juan de Lugancho"
   - "Autoespar San Isidro llegó a su meta de certificados"
   - "Vendedor X está por llegar al 80% de su meta"
   
3. Ver leads que excedieron tiempo de contacto
4. Comunicarse con asesor a cargo

5. Exportar reporte por concesionario
```

---

### Gerente Comercial: Pedro Ramírez

#### 1. VISTA HOLÍSTICA
```
1. 3 Métricas principales:
   - Citas generadas (vs meta)
   - Evaluaciones aprobadas
   - Certificados + Ticket promedio
   
2. Filtros:
   - Por distribuidor
   - Por concesionario
   - Por período
   
3. Vista consolidada de toda la operación
```

---

## 🔧 CAMBIOS TÉCNICOS REQUERIDOS

### Base de Datos
```sql
-- Tabla de Citas
CREATE TABLE citas (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  vendedor_id UUID,
  fecha_hora TIMESTAMP,
  concesionario VARCHAR(100),
  estado VARCHAR(50), -- programada, confirmada, asistio, no_asistio
  notas TEXT,
  creado_por VARCHAR(50), -- asesor, call_center
  created_at TIMESTAMP
);

-- Tabla de Cuotas CIA
CREATE TABLE cuotas_cia (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),
  monto_total DECIMAL(10,2),
  monto_pagado DECIMAL(10,2),
  cuotas_total INTEGER,
  cuotas_pagadas INTEGER,
  proxima_fecha_pago DATE,
  estado VARCHAR(50), -- pendiente, pagado, vencido
  created_at TIMESTAMP
);

-- Tabla de Metas
CREATE TABLE metas (
  id UUID PRIMARY KEY,
  vendedor_id UUID,
  mes INTEGER,
  año INTEGER,
  meta_citas INTEGER,
  meta_evaluaciones INTEGER,
  meta_certificados INTEGER,
  ticket_promedio_meta DECIMAL(10,2),
  asignado_por UUID,
  created_at TIMESTAMP
);
```

### Nuevos Componentes

1. **`ModuloCitas.js`**
   - Lista de citas
   - Calendario visual
   - Marcar asistencia

2. **`SeguimientoCuotasCIA.js`**
   - Lista de cuotas pendientes
   - Registrar pagos
   - Recordatorios

3. **`AsignacionMetas.js`**
   - Formulario de asignación
   - Vista de metas por vendedor
   - Historial

4. **`RecomendacionesGenerativas.js`**
   - Cálculo de objetivo diario
   - Mensajes contextuales
   - Sugerencias de acciones

---

## ❓ PREGUNTAS TÉCNICAS A PREPARAR

**Para la CEO y Gerente de TI:**

### 1. Sobre IA y Tokens
**Pregunta esperada:** "¿Cuánto costará el tema de tokens de IA?"

**Respuesta preparar:**
- Usar Amazon Q (licencia fija, no tokens)
- O: Economía de tokens con AWS Bedrock
- Costos proyectados con volumen estimado
- Comparación vs otras soluciones

### 2. Sobre Integraciones
**Pregunta esperada:** "¿Cómo se integra con nuestros sistemas actuales?"

**Respuesta preparar:**
- MCP Server para integraciones modulares
- APIs nativas con CRM existente
- Integración con WhatsApp, Teams, Slack
- No requiere cambiar herramientas actuales

### 3. Sobre Arquitectura
**Pregunta esperada:** "¿Es escalable?"

**Respuesta preparar:**
- Arquitectura en AWS
- Modular y agnóstica
- Fácil añadir concesionarios
- Soporta crecimiento

### 4. Sobre Amazon Q
**Investigar:**
- ¿Se puede integrar Amazon Q a plataformas custom?
- ¿Cómo funciona el pricing?
- ¿Incluye automatizaciones y sub-agentes?
- ¿Alternativa vs desarrollo propio?

---

## 📅 TIMELINE Y PRIORIDADES

### Para la Demo del 09-AGO (Viernes 8:30 AM)

#### CRÍTICO - Implementar HOY (05-AGO)
- [ ] Logo en pantalla de login
- [ ] Corrección: "Enviar WhatsApp" (no "correo")
- [ ] Cambio etiqueta: "Evaluaciones Equifax"
- [ ] Objetivo diario en "Mi Desempeño"
- [ ] Mockup visual del módulo de citas

#### IMPORTANTE - Esta Tarde (05-AGO)
- [ ] Grabar demo en Story Lane
- [ ] Preparar preguntas técnicas (10 max)
- [ ] Practicar storytelling
- [ ] Revisar con Vladimir

#### MENCIONAR EN DEMO (Roadmap)
- Módulo de citas (en desarrollo)
- Acceso para call center
- Seguimiento de cuotas CIA
- Asignación de metas
- Recomendaciones generativas

### Para Implementación Real

#### Fase 1 (Post-Aprobación)
1. Módulo de citas completo
2. Acceso call center
3. Seguimiento cuotas CIA
4. Filtros por concesionario

#### Fase 2 (3-6 meses)
1. Módulo de asignación de metas
2. Recomendaciones generativas avanzadas
3. Integración con Amazon Q (evaluar)
4. Bolsa de horas de soporte

---

## 💡 NOTAS ADICIONALES

### Sobre el Negocio
- **Es nuevo:** Alcance vivo, irá cambiando
- **Bolsa de horas:** Mencionar soporte post-venta
- **Personalización:** Esto NO lo tiene Salesforce ni SAP
- **Valor diferencial:** Plataforma específica para fondos colectivos

### Sobre la Presentación
- **Enfoque:** CEO (no técnico profundo)
- **Mostrar valor antes de explicar**
- **Flujo rápido:** No llenar mucha información
- **Acompañamiento:** Verónica (apoyo moral)

### Coordinación Técnica
- **Anderson:** Validar tema de Amazon Q
- **Manu:** Preparar 10 preguntas técnicas con respuestas
- **Story Lane:** Demo grabada lista antes de las 16:00

---

## ✅ CHECKLIST FINAL

### Preparación Demo
- [ ] Logo en login
- [ ] Correcciones de texto
- [ ] Objetivo diario visible
- [ ] Storytelling armado
- [ ] Demo grabada en Story Lane
- [ ] Preguntas técnicas preparadas

### Documentación
- [ ] Resumen de cambios (este documento)
- [ ] Preguntas técnicas con respuestas
- [ ] Roadmap Fase 1 y 2
- [ ] Estimación de costos (tokens/Amazon Q)

---

**Última actualización:** 05-AGO-2026  
**Próxima revisión:** Con Vladimir - Tarde del 05-AGO  
**Presentación final:** 09-AGO-2026, 8:30 AM
