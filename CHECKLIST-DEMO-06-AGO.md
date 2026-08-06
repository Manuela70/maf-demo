# ✅ Checklist de Verificación - Demo MAF v2.3.1

**Antes de grabar, verifica que todo funcione correctamente:**

---

## 🔍 Pruebas Funcionales

### 1. Filtro por Dealer
- [ ] Ir a: Gestión de Leads (`/lead/list`)
- [ ] Ver selector "Todos los dealers" junto al filtro de estados
- [ ] Seleccionar un dealer (ej: "Autospar San Juan de Lurigancho")
- [ ] Verificar que la lista se filtra correctamente
- [ ] Contador de leads se actualiza

### 2. Botón de Exportar
- [ ] Ir a: Gestión de Leads (`/lead/list`)
- [ ] Click en botón "📥 Exportar"
- [ ] Aparece alert con resumen de filtros
- [ ] Muestra cantidad de leads a exportar

### 3. Preguntas de Derivaciones (Copiloto Ejecutivo)
- [ ] Login como **Supervisor** (usuario: `supervisor` / password: `demo123`)
- [ ] Abrir Copiloto Ejecutivo (botón flotante "MAF")
- [ ] Probar preguntas sugeridas:
  - [ ] "¿Qué dealer no cumple las 5 derivaciones diarias?"
  - [ ] "¿Cómo va el ticket promedio vs meta?"
- [ ] Escribir manualmente:
  - [ ] "¿Cuántas derivaciones hay por dealer?"
  - [ ] "¿Quién derivó este deal?"

### 4. Ícono de WhatsApp
- [ ] Login como **Asesor** (usuario: `asesor` / password: `demo123`)
- [ ] Ver Dashboard
- [ ] En Agente Asistente, buscar botón de acción
- [ ] Verificar que dice: "💬 Enviar WhatsApp de seguimiento"

### 5. Branding MAF en Copilotos
- [ ] Como **Asesor**: Ver botón flotante con texto "MAF" (rojo)
- [ ] Abrir copiloto, verificar título "Asistente MAF"
- [ ] Como **Supervisor**: Ver botón flotante con texto "MAF" (azul)
- [ ] Abrir copiloto ejecutivo, verificar título "Asistente MAF"

### 6. Sin Labels Técnicos
- [ ] Navegar por diferentes pantallas
- [ ] Verificar que NO aparecen:
  - [ ] Cajas azules con "RF-GL-CC-01"
  - [ ] Notas sobre "Estados Macro Call Center"
  - [ ] Cualquier referencia técnica visible

---

## 🎯 Flujo de Demo Sugerido

### Como Asesor:
1. **Login** → Ver logo MAF profesional
2. **Dashboard** → Ver Agente Asistente con leads urgentes
3. **Click en lead** → Ver detalle y botón "💬 Enviar WhatsApp"
4. **Mi Desempeño** → Ver métricas y objetivo diario
5. **Ver Mis Citas** → Botón azul nuevo
6. **Gestión de Leads** → Mostrar filtro por dealer + exportar
7. **Copiloto MAF** → Hacer pregunta sobre sistema

### Como Supervisor:
1. **Dashboard** → Ver Copiloto Ejecutivo
2. **Pregunta 1:** "¿Qué dealer no cumple las 5 derivaciones diarias?"
   - Respuesta muestra vendedores con incumplimiento
3. **Pregunta 2:** "¿Cómo va el ticket promedio vs meta?"
   - Respuesta muestra análisis de ticket promedio
4. **Métricas del Equipo** → Ver dashboard consolidado

---

## 🚨 Problemas Comunes

### Si algo no funciona:

1. **Filtro de dealer no aparece:**
   - Refrescar la página (Ctrl+R)
   - Verificar que estás en `/lead/list`

2. **Preguntas no responden:**
   - Verificar que escribiste exactamente la pregunta
   - Usar preguntas sugeridas primero

3. **Copiloto no se abre:**
   - Buscar botón flotante "MAF" en esquina inferior derecha
   - Puede estar minimizado

---

## 📱 URLs Importantes

**Demo público:** https://manuela70.github.io/maf-demo/

**Login de prueba:**
- Asesor: `asesor` / `demo123`
- Supervisor: `supervisor` / `demo123`
- Gerente: `gerente` / `demo123`

---

## 📝 Notas para la Grabación

✅ Sistema limpio, sin labels técnicos  
✅ Branding MAF en toda la experiencia  
✅ Filtros funcionales y útiles  
✅ Copiloto responde preguntas de negocio  
✅ Flujo completo del día a día del asesor  

**Storytelling sugerido:**
> "Buenos días, soy Juan Pérez, asesor de MAF. Empiezo mi día revisando mis tareas urgentes... El sistema me indica que tengo leads sin contactar... Puedo filtrar por dealer para ver de dónde vienen mis mejores oportunidades... Y si tengo dudas, mi Asistente MAF me ayuda al instante..."

---

**Preparado por:** Kiro AI  
**Fecha:** 06-AGO-2026  
**Para demo:** 09-AGO-2026, 8:30 AM
