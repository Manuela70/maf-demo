# Implementación de Estilos MAF — Guía del Desarrollador

**Fecha:** 03-AGO-2026  
**Estado:** ✅ Variables CSS implementadas en `src/styles/custom.css`  
**Fuente:** Reglas extraídas de mockups oficiales MAF (ver `reglas-de-diseno-maf.md`)

---

## 🎨 Variables CSS Disponibles

Todas las variables están definidas en `:root` en `custom.css`:

### Colores de Marca
```css
--maf-rojo-primario: #E00020;       /* Botones CTA, alertas */
--maf-celeste-acento: #80C8E0;      /* Headers, elementos activos */
--maf-rosa-pastel: #FFDDDD;         /* Botones secundarios, headers alternos */
```

### Estados
```css
--maf-verde-exito: #90E0A8;         /* Pagado/Normal */
--maf-amarillo-pendiente: #F0B828;  /* Pendiente/Advertencias */
```

### Grises de Sistema
```css
--maf-gris-oscuro: #1B1A18;        /* Texto principal */
--maf-gris-medio: #555555;         /* Texto secundario */
--maf-gris-borde: #D1D0D0;         /* Bordes */
--maf-gris-fondo-claro: #FAFAFA;   /* Fondo página */
--maf-gris-fondo: #F3F1F1;         /* Cards deshabilitadas */
--maf-gris-fondo-medio: #E6E2E2;   /* Inputs deshabilitados */
```

### Logo (referencia)
```css
--maf-logo-placa: #555555;         /* Fondo "Fondos Colectivos" */
--maf-logo-barra: #82CCE5;         /* Barra divisoria vertical */
--maf-logo-wordmark: #E30221;      /* Wordmark "maf" */
```

---

## 🧩 Clases de Componentes

### Botones

#### Primarios (Rojo, pill shape)
```jsx
<button className="btn-maf-primary">
  Iniciar sesión
</button>
```

**Estados automáticos:**
- Hover: color más oscuro + elevación
- Active: sin elevación
- Disabled: gris, cursor not-allowed

#### Secundarios (Rosa pastel o gris, pill shape)
```jsx
<button className="btn-maf-secondary">
  Ver más
</button>

<button className="btn-maf-secondary gris">
  Cancelar
</button>
```

---

### Cards/Panels

#### Card básica
```jsx
<div className="card-maf">
  <h3>Título de la card</h3>
  <p>Contenido...</p>
</div>
```

#### Card con header de acento (celeste o rosa)
```jsx
<div className="card-maf">
  <div className="card-maf-header">
    Detalles del Contrato
  </div>
  <p>Contenido...</p>
</div>

{/* Variante rosa */}
<div className="card-maf">
  <div className="card-maf-header rosa">
    Rematar
  </div>
  <p>Contenido...</p>
</div>
```

**Nota:** El color de header (celeste vs rosa) aún no está resuelto por el cliente. Usar celeste por defecto hasta confirmación.

---

### Badges de Estado

```jsx
{/* Estados positivos */}
<span className="badge-maf pagado">Pagado</span>
<span className="badge-maf normal">Normal</span>
<span className="badge-maf exito">Éxito</span>

{/* Estados intermedios */}
<span className="badge-maf pendiente">Pendiente</span>
<span className="badge-maf advertencia">Advertencia</span>

{/* Estados negativos */}
<span className="badge-maf cancelado">Cancelado</span>
<span className="badge-maf error">Error</span>

{/* Neutrales */}
<span className="badge-maf gris">Inactivo</span>
```

---

### Inputs

#### Input de texto
```jsx
<input
  type="text"
  className="input-maf"
  placeholder="Ingrese su documento"
/>
```

**Estados automáticos:**
- Focus: borde celeste + sombra suave
- Disabled: fondo gris, cursor not-allowed
- Placeholder: gris medio, 70% opacidad

#### Select
```jsx
<select className="select-maf">
  <option>Opción 1</option>
  <option>Opción 2</option>
</select>
```

---

### Anillo de Progreso (Donut Chart)

**Estructura HTML:**
```jsx
<div className="progress-ring">
  <svg width="120" height="120">
    {/* Círculo de fondo (gris) */}
    <circle
      className="progress-ring-circle progress-ring-background"
      cx="60"
      cy="60"
      r="54"
      fill="none"
      strokeWidth="12"
    />
    {/* Círculo de progreso (celeste) */}
    <circle
      className="progress-ring-circle progress-ring-progress"
      cx="60"
      cy="60"
      r="54"
      fill="none"
      strokeWidth="12"
      strokeDasharray="339.292"  // 2π * 54
      strokeDashoffset="135.717" // (1 - 0.6) * 339.292 para 60%
    />
  </svg>
  {/* Texto centrado */}
  <div className="progress-ring-text">
    <div className="progress-ring-percent">60%</div>
    <div className="progress-ring-label">7/14 cuotas</div>
  </div>
</div>
```

**Cálculo de `strokeDashoffset`:**
```javascript
const radio = 54;
const circunferencia = 2 * Math.PI * radio; // 339.292
const progreso = 0.60; // 60%
const offset = circunferencia * (1 - progreso);
```

---

## 📐 Jerarquía Tipográfica

Según mockups oficiales:

| Elemento | Tamaño | Peso | Color |
|----------|--------|------|-------|
| Título de card | 16-18px | Bold (700) | `--maf-gris-oscuro` |
| Label de campo | 13-14px | Regular (400) | `--maf-gris-oscuro` |
| Valor de campo | 14-15px | Bold/Semibold (600-700) | `--maf-gris-oscuro` |
| Placeholder | 13px | Regular (400) | `--maf-gris-medio` |
| Badge | 12px | Semibold (600) | (variable según estado) |

**Font stack recomendado:**
```css
font-family: system-ui, -apple-system, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
```

**Nota:** La tipografía real no se pudo extraer de los PDFs. La fuente arriba es placeholder hasta confirmar con Figma.

---

## 🎭 Uso en React con Tailwind

### Mixing con Tailwind
Puedes combinar clases MAF con Tailwind:

```jsx
<button className="btn-maf-primary mt-4 w-full">
  Continuar
</button>

<div className="card-maf p-6 mb-4">
  <h3 className="text-lg font-bold mb-2">Título</h3>
  <p className="text-sm text-gray-600">Descripción</p>
</div>
```

### Usando Variables CSS en Tailwind
```jsx
<div style={{ backgroundColor: 'var(--maf-celeste-acento)' }}>
  Custom component
</div>
```

---

## ✅ Checklist de Componentes a Actualizar

- [x] **GlobalHeader:** Logo con colores oficiales ✅
- [x] **Botones de acción:** Reemplazar por `.btn-maf-primary` ✅
- [x] **Botones secundarios:** Reemplazar por `.btn-maf-secondary` ✅
- [x] **Cards de agentes:** Aplicar `.card-maf` + `.card-maf-header` ✅
- [x] **Badges de leads:** Usar `.badge-maf` con variantes de estado ✅
- [ ] **Inputs de formulario:** Aplicar `.input-maf` (pendiente: formularios no visibles en dashboard principal)
- [x] **Mi Desempeño:** Actualizar barra de progreso con color celeste ✅
- [x] **Notificaciones:** Badge de urgencia con colores MAF ✅
- [ ] **Onboarding:** Spotlight con color celeste MAF (pendiente optimización)

---

## 📋 Implementación Completada (03-AGO-2026)

### ✅ Componentes Actualizados

1. **GlobalHeader.js**
   - Logo MAF con 3 elementos (placa gris + barra celeste + wordmark rojo)
   
2. **AgenteAsistente.js** (Seguimiento y Tareas)
   - Card con `.card-maf` + `.card-maf-header` celeste
   - Botón primario: `.btn-maf-primary` (rojo pill)
   - Botón secundario: `.btn-maf-secondary` (rosa pill)
   - Badge de urgencia: `.badge-maf advertencia`

3. **MiDesempenio.js**
   - Card con `.card-maf` + `.card-maf-header` celeste
   - Barra de progreso con `var(--maf-celeste-acento)`
   - Badge de estado: `.badge-maf` con variantes según progreso

4. **custom.css**
   - Variables CSS completas
   - Clases de componentes MAF (botones, cards, badges, inputs)

---

## 🚨 Notas Importantes

1. **Color de header de card:** El cliente no definió si usar celeste o rosa. Usar **celeste** por defecto hasta confirmación.

2. **Logo MAF:** Mockups muestran lockup horizontal con 3 elementos:
   - Placa gris `#555555` con "Fondos Colectivos"
   - Barra celeste `#82CCE5` vertical
   - Wordmark "maf" rojo `#E30221`

3. **Border radius estándar:**
   - Botones: `border-radius: 9999px` (pill completo)
   - Inputs: `border-radius: 10px`
   - Cards: `border-radius: 12px`
   - Badges: `border-radius: 9999px` (pill completo)

4. **Sombras:**
   - Card: `0 1px 3px rgba(0, 0, 0, 0.1)`
   - Card hover: `0 4px 12px rgba(0, 0, 0, 0.15)`
   - Input focus: `0 0 0 3px rgba(128, 200, 224, 0.2)` (celeste con alpha)

---

## 📚 Referencias

- **Mockups oficiales:** `Propuestas.pdf`, `Dashboard.pdf`, `cod_OTP.pdf`
- **Reglas extraídas:** `reglas-de-diseno-maf.md`
- **Implementación CSS:** `src/styles/custom.css`

**Última actualización:** 03-AGO-2026
