# Feature: Minimizar Chat de Agentes

**Fecha:** 03-AGO-2026  
**Problema:** Los paneles de chat de los agentes están sobrepuestos en las pantallas y tapan el contenido  
**Solución:** Funcionalidad de minimización completa con botón flotante  

---

## 🎯 Cambios Implementados

### Agente 1: Copiloto (AgenteCopiloto.js)

**Nuevos estados:**
```javascript
const [isOpen, setIsOpen] = useState(true);           // Ya existía
const [isMinimized, setIsMinimized] = useState(false); // NUEVO
```

**Nuevos controles:**
1. **Botón "−"**: Minimiza el chat (solo muestra header)
2. **Botón "✕"**: Oculta completamente el panel
3. **Botón flotante 💬**: Aparece cuando está completamente minimizado (bottom-right)

**Estados visuales:**
- **Expandido**: Panel completo visible (estado por defecto)
- **Minimizado**: Solo header visible
- **Oculto**: Solo botón flotante rojo (bottom-right, 14x14, bg-red-600)

---

### Agente 4: Copiloto Ejecutivo (AgenteCopilotoEjecutivo.js)

**Misma funcionalidad que Agente 1:**
- Estado `isMinimized` agregado
- Botones "−" y "✕" en header
- Botón flotante azul "✦" cuando está minimizado (bg-blue-600)

---

## 🎨 Diseño de Botones

### Botón Flotante (Minimizado)
```
Posición: fixed bottom-6 right-6
Tamaño: w-14 h-14 (56x56px)
Color: 
  - Agente Copiloto: bg-red-600
  - Copiloto Ejecutivo: bg-blue-600
Ícono: 
  - Agente Copiloto: 💬
  - Copiloto Ejecutivo: ✦
Hover: scale-110
```

### Controles en Header
```
Botón "−": Minimizar (solo header)
Botón "✕": Ocultar completamente
Ambos con hover effect
```

---

## 🧪 Cómo Probar

1. **Abrir aplicación** en cualquier vista con agente visible
2. **Click en "−"**: El panel se minimiza (solo header visible)
3. **Click en "✕"**: El panel desaparece, aparece botón flotante
4. **Click en botón flotante**: El panel reaparece expandido

---

## 📊 Archivos Modificados

| Archivo | Líneas modificadas | Cambios |
|---------|-------------------|---------|
| `src/agents/AgenteCopiloto.js` | ~15 líneas | + estado `isMinimized` + botón ✕ + render condicional |
| `src/agents/AgenteCopilotoEjecutivo.js` | ~15 líneas | + estado `isMinimized` + botón ✕ + render condicional |

**Total:** 2 archivos, ~30 líneas modificadas

---

## ✅ Beneficios

1. **Mejor UX**: El usuario puede ocultar el chat cuando necesita ver el contenido completo
2. **No invasivo**: El botón flotante es discreto pero accesible
3. **Consistente**: Ambos agentes tienen la misma funcionalidad
4. **Reversible**: Fácil de restaurar con un click

---

## 🚀 Próximas Mejoras Posibles

- [ ] Persistir estado de minimización en localStorage
- [ ] Animación de transición suave (slide-out)
- [ ] Badge con contador de mensajes nuevos en botón flotante
- [ ] Atajo de teclado para minimizar/maximizar (Ctrl+M)

---

**Estado:** ✅ COMPLETADO  
**Impacto:** ALTO (mejora significativa de UX)  
**Breaking Changes:** Ninguno
