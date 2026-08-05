# MAF Perú - Sistema de Inteligencia Comercial
## Wireframes Funcionales con Agentes de IA

**Estado:** ✅ **v2.0 COMPLETADO** - 4 Agentes + 3 Componentes Nuevos  
**Última actualización:** 03-Agosto-2026  
**Versión:** v2.0.0 (Reunión 03-AGO implementada)

---

## 📋 Changelog

**Ver [`CHANGELOG.md`](./CHANGELOG.md) para historial completo de cambios**

### v2.0.0 (03-AGO-2026) - Cambios de Reunión con Cliente
- ✅ Agente 2 renombrado a "Seguimiento y Tareas"
- ✅ Botón "Enviar correo de seguimiento" (no "Llamar")
- ✅ FAQ ampliado: +7 preguntas de negocio MAF
- ✅ Estrategia de venta con IA generativa
- ✅ **NUEVO:** Dashboard "Mi Desempeño" (meta + progreso)
- ✅ **NUEVO:** Notificaciones con campanita 🔔
- ✅ **NUEVO:** Onboarding guiado interactivo
- ✅ Dashboard rediseñado (3 secciones)
- ✅ Chips de preguntas más visibles

### v1.0.0 (02-AGO-2026) - Implementación Inicial
- ✅ 4 Agentes de IA implementados
- ✅ Arquitectura modular ES6
- ✅ mockData.js coherente

---

## 🚀 Inicio Rápido

### Requisitos
- Python 3 (para servidor local)
- Navegador moderno (Chrome, Firefox, Edge)

### Ejecutar
```bash
cd "Sistema de Inteligencia Comercial"
python3 -m http.server 8000
```

Abrir en navegador: **http://localhost:8000/index.html**

⚠️ **IMPORTANTE:** NO abrir con `file://` - Los módulos ES6 requieren servidor HTTP.

---

## 🤖 Agentes de IA Implementados

| # | Agente | Pantalla | Demo |
|---|--------|----------|------|
| 1 | **Gestor de Conocimiento** | /lead/new, /eval/*, /sale/* | Panel rojo derecha |
| 2 | **Seguimiento y Tareas** | /dashboard (asesor) | Tarjeta roja arriba |
| 3 | **Priorización de Cartera** | /lead/list | Toggle "🚦 Priorizar por IA" |
| 4 | **Copiloto Ejecutivo** | /dashboard (supervisor/gerente) | Tarjeta azul arriba |

## 🆕 Nuevos Componentes (v2.0)

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| **Mi Desempeño** | Dashboard vendedor | Meta, progreso visual, tasa de cierre |
| **Notificaciones** | GlobalHeader (🔔) | Recordatorios + alertas con badge |
| **Onboarding Guiado** | Primera carga | Tour interactivo de 6 pasos |

### Cómo Probar

#### 🤖 Agente 1: Copiloto Embebido
1. Rol: **Asesor** (Juan Pérez - por defecto)
2. Navegar a "Nuevo Lead" o cualquier pantalla de evaluación
3. Ver panel rojo fijo a la derecha
4. Hacer preguntas: "¿Qué documentos necesito?", "¿Cuánto tarda?"

#### 🎯 Agente 2: Seguimiento y Tareas
1. Rol: **Asesor** (Juan Pérez)
2. Estar en Dashboard
3. Ver tarjeta "Lo primero de hoy" con urgencias detectadas
4. Observar iconos: 🔴 Alta | 🟡 Media | ⚪ Baja
5. **NUEVO:** Botón "Enviar correo de seguimiento" (azul)

#### 📊 Mi Desempeño (Nuevo v2.0)
1. Rol: **Asesor** (Juan Pérez)
2. Dashboard → Sección 2 (después de Seguimiento y Tareas)
3. Ver meta (100), ventas actuales (30), tasa de cierre (5.3%)
4. Barra de progreso con línea de avance esperado
5. Mensaje motivacional según estado

#### 🔔 Notificaciones (Nuevo v2.0)
1. Header → Campanita con badge rojo "4"
2. Click → Ver 4 notificaciones mock
3. Click en notificación → Marcar como leída
4. "Marcar todas leídas" → Badge desaparece

#### 📊 Agente 3: Priorización
1. Sidebar → "Gestión de Leads"
2. Activar toggle "🚦 Priorizar por IA"
3. Ver leads reordenados por score
4. Semáforo: 🟢 Caliente | 🟡 Tibio | 🔴 Frío

#### 📈 Agente 4: Copiloto Ejecutivo
1. Header → Cambiar a **Jorge Mendoza** (Supervisor)
2. Ver tarjeta azul en dashboard
3. Hacer preguntas: "¿Cómo va mi equipo?", "¿Quién es mi mejor vendedor?"

---

## 📁 Estructura del Proyecto

```
Sistema de Inteligencia Comercial/
├── index.html                      # Shell mínimo (67 líneas)
├── mockData.js                     # Datos coherentes para demo
├── src/
│   ├── App.js                      # Orquestador principal (6,300+ líneas)
│   ├── agents/                     # ⭐ AGENTES DE IA (1,166 líneas)
│   │   ├── AgenteCopiloto.js              # Agente 1 - Gestor Conocimiento
│   │   ├── AgenteAsistente.js             # Agente 2 - Seguimiento y Tareas
│   │   ├── AgentePriorizacion.js          # Agente 3 - Priorización
│   │   └── AgenteCopilotoEjecutivo.js     # Agente 4 - Copiloto Ejecutivo
│   ├── components/
│   │   ├── common/                # 12 componentes reutilizables
│   │   │   ├── MiDesempenio.js           # 📊 NUEVO v2.0 (190 líneas)
│   │   │   ├── Notificaciones.js         # 🔔 NUEVO v2.0 (232 líneas)
│   │   │   └── OnboardingGuiado.js       # 👉 NUEVO v2.0 (265 líneas)
│   │   └── layout/                # GlobalHeader, Sidebar, MainLayout
│   ├── config/                    # roles.js, routes.js
│   ├── context/                   # AppContext.js
│   ├── router/                    # Router.js
│   └── styles/                    # custom.css
├── docs/                          # 📚 Documentación técnica
│   ├── 01-analisis-ingenieria-inversa-wireframes.md
│   ├── 02-arquitectura-datos-mock.md
│   └── 08-agentes-ia-implementados.md  # ⭐ SPEC COMPLETA
└── README.md                      # Este archivo
```

---

## 🎯 Casos de Uso por Rol

### Asesor (Juan Pérez)
- ✅ Ver **Agente 1** (Copiloto) en pantallas de captura/evaluación/venta
- ✅ Ver **Agente 2** (Asistente) en dashboard con urgencias detectadas
- ✅ Usar **Agente 3** (Priorización) en gestión de leads

### Supervisor (Jorge Mendoza)
- ✅ Ver **Agente 4** (Copiloto Ejecutivo) en dashboard
- ✅ Usar **Agente 3** (Priorización) para vista de cartera completa
- ✅ Drill-down en métricas del equipo

### Gerente (Juan Carlos Vega)
- ✅ Ver **Agente 4** (Copiloto Ejecutivo) con preguntas estratégicas
- ✅ Vista consolidada de zona (reportería)

---

## 📊 Métricas del Proyecto

### Reducción de Código (Optimización)
- **Antes:** 6,742 líneas (HTML monolítico)
- **Después:** 67 líneas HTML + 20 archivos modulares
- **Reducción:** 98.9%

### Código Agéntico
- **Total:** 1,166 líneas (4 agentes)
- **mockData.js:** 300+ líneas de datos coherentes
- **FAQ:** 6 preguntas para Agente 1
- **Preguntas ejecutivas:** 4 consultas para Agente 4

### Datos Mock
- **Vendedores:** 6 usuarios con roles variados
- **Leads:** 5 casos tipo (caliente, nuevo, tibio, etc.)
- **Sucursales:** 3 ubicaciones (Surco, San Isidro, Miraflores)

---

## 🛠️ Stack Técnico

- **Frontend:** React 18 (UMD build, sin JSX transpiler)
- **Estilos:** Tailwind CSS 3 (CDN)
- **Módulos:** ES6 Modules nativos (sin bundler)
- **Servidor:** Python 3 http.server
- **Patrón:** Component-based architecture + Context API

---

## 📚 Documentación

Para detalles técnicos completos, ver:

- **[08-agentes-ia-implementados.md](docs/08-agentes-ia-implementados.md)** - Especificación completa de agentes ⭐
- **[01-analisis-ingenieria-inversa-wireframes.md](docs/01-analisis-ingenieria-inversa-wireframes.md)** - Análisis del wireframe
- **[02-arquitectura-datos-mock.md](docs/02-arquitectura-datos-mock.md)** - Diseño de mockData.js

---

## 🔧 Cómo Extender

### Agregar Nueva Pregunta al Agente 1
Editar `mockData.js`:
```javascript
export const FAQ = {
  mi_nueva_pregunta: {
    pregunta: "¿Cuál es...?",
    keywords: ['palabra1', 'palabra2'],
    respuesta: "La respuesta es..."
  }
};
```

### Modificar Scoring del Agente 3
Editar función `calcularScoreLead()` en `mockData.js`:
```javascript
export function calcularScoreLead(lead) {
  let score = 50;
  if (lead.miCondicion) score += 20;
  // ... más reglas
  return { score, temperatura, razones };
}
```

---

## 🚦 Roadmap

### ✅ Fase 1 (Completada)
- Arquitectura modular (ES6 modules)
- 4 agentes de IA con mockData.js
- Demostración funcional sin backend

### 🔜 Fase 2 (Q4 2026)
- Integración con API REST
- Modelos ML reales (scoring predictivo)
- RAG sobre documentación completa
- LLM para lenguaje natural (GPT-4/Claude)

### 🔮 Fase 3 (Q1 2027)
- Aprendizaje continuo (fine-tuning)
- A/B testing de estrategias
- Dashboards de performance de agentes
- Expansión: Agentes 5-7

---

## ✅ Validación

### Checklist de Funcionamiento
- [ ] Servidor corriendo en puerto 8000
- [ ] Sin errores en consola (F12)
- [ ] Header y sidebar visibles
- [ ] Agente 1: Panel rojo en /lead/new
- [ ] Agente 2: Tarjeta en dashboard asesor
- [ ] Agente 3: Toggle en /lead/list
- [ ] Agente 4: Tarjeta azul en dashboard supervisor

---

## 🎓 Usuarios Demo

| Nombre | Rol | Email | Pass |
|--------|-----|-------|------|
| Juan Pérez (protagonista) | Asesor | j.perez@maf.pe | demo123 |
| Jorge Mendoza | Supervisor | j.mendoza@maf.pe | demo123 |
| Juan Carlos Vega | Gerente | jc.vega@maf.pe | demo123 |

**Cambiar usuario:** Header → Click en avatar → Seleccionar usuario

---

## 📞 Soporte

Para problemas:
1. Verificar que el servidor esté corriendo
2. Abrir consola del navegador (F12) y copiar errores
3. Revisar checklist de validación
4. Consultar `docs/08-agentes-ia-implementados.md`

---

## 🎯 Valor de Negocio

Cada agente resuelve un problema específico:

1. **Agente 1:** ¿Cuántos más vendedores puede liderar un supervisor?
2. **Agente 2:** ¿Cuántas ventas se pierden por falta de seguimiento?
3. **Agente 3:** ¿Cuánto más cierra el equipo enfocando leads calientes?
4. **Agente 4:** ¿Qué mejores decisiones toma dirección con data al instante?

---

**Última actualización:** 02-Agosto-2026  
**Estado:** ✅ Listo para demostración
