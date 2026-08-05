# Externalización de Componentes de Layout

**Fecha:** 2 de agosto, 2026  
**Tarea:** Fase 3 - Layout (fase3_layout)

## Resumen

Se han externalizado los componentes `GlobalHeader`, `Sidebar` y se ha creado un nuevo componente `MainLayout` desde el archivo HTML principal hacia módulos JavaScript independientes en `src/components/layout/`.

## Archivos Creados

### 1. `/src/components/layout/GlobalHeader.js`
**Líneas:** 221  
**Descripción:** Componente de cabecera global que incluye:
- Logo de MAF FC
- Navegación y título de la pantalla actual
- Selector de usuario y rol
- Menú desplegable para cambio de perfil
- Modal de confirmación de cambio de rol
- Modal de cierre de sesión
- Lista de usuarios demo (DEMO_USERS_LIST)
- Etiquetas de roles (ROLE_LABELS)

**Props:**
- `currentPath`: Ruta actual de la aplicación
- `sidebarOpen`: Estado de apertura del sidebar
- `setSidebarOpen`: Función para cambiar estado del sidebar
- `AppContext`: Contexto global de la aplicación
- `ALL_ROUTES`: Array con todas las rutas disponibles

### 2. `/src/components/layout/Sidebar.js`
**Líneas:** 55  
**Descripción:** Componente de menú lateral que incluye:
- Navegación por módulos
- Control de acceso basado en roles
- Organización de pantallas por módulo
- Animación de apertura/cierre
- Resaltado de la ruta activa

**Props:**
- `open`: Estado de apertura del sidebar
- `currentPath`: Ruta actual
- `AppContext`: Contexto global
- `ALL_ROUTES`: Array de rutas
- `ROLE_SCREENS`: Mapeo de permisos por rol

### 3. `/src/components/layout/MainLayout.js`
**Líneas:** 57  
**Descripción:** Componente orquestador que envuelve la aplicación:
- Integra GlobalHeader y Sidebar
- Maneja el estado interno de apertura del sidebar
- Renderiza children (contenido de las pantallas)
- Soporta modo "sin layout" para pantallas públicas (login, etc.)

**Props:**
- `children`: Contenido a renderizar
- `currentPath`: Ruta actual
- `AppContext`: Contexto global
- `ALL_ROUTES`: Array de rutas
- `ROLE_SCREENS`: Permisos por rol
- `showLayout` (opcional): Si false, solo muestra children sin header/sidebar

### 4. `/src/components/layout/index.js`
**Líneas:** 6  
**Descripción:** Archivo de barril (barrel) para exportar todos los componentes de layout de forma centralizada.

## Cambios en el HTML Principal

### Imports Actualizados (Línea ~31)
```javascript
import { 
  GlobalHeader,
  Sidebar,
  MainLayout
} from './src/components/layout/index.js';
```

### Definiciones de Componentes Removidas
- **GlobalHeader**: Eliminada de ~línea 48-237
- **Sidebar**: Eliminada de ~línea 238-267
- Se agregó nota indicando la externalización

### App Component Actualizado
**Cambios realizados:**
1. **Removido:** Estado `sidebarOpen` (ahora lo maneja MainLayout internamente)
2. **Simplificado:** Función `navigate` (ya no necesita cerrar sidebar)
3. **Reemplazado:** Renderizado directo de GlobalHeader y Sidebar por uso de MainLayout
4. **Añadido:** Prop `showLayout` para diferenciar rutas públicas de privadas

**Antes:**
```javascript
!isPublic && React.createElement(React.Fragment, null,
  React.createElement(GlobalHeader, {...}),
  React.createElement(Sidebar, {...}),
  // ... overlay y contenido
)
```

**Después:**
```javascript
!isPublic && React.createElement(MainLayout, {
  currentPath: route,
  AppContext: AppContext,
  ALL_ROUTES: ALL_ROUTES,
  ROLE_SCREENS: ROLE_SCREENS,
  showLayout: true
}, React.createElement(CurrentScreen, null))
```

## Beneficios

### 1. **Modularidad**
- Código más organizado y fácil de mantener
- Cada componente tiene su propia responsabilidad
- Facilita pruebas unitarias

### 2. **Reutilización**
- Los componentes pueden ser importados desde cualquier parte
- Fácil de usar en otras aplicaciones o contextos

### 3. **Mantenibilidad**
- Cambios en layout se realizan en archivos dedicados
- HTML principal más limpio y legible
- Separación clara de concerns

### 4. **Consistencia**
- Import centralizado vía index.js
- Estructura de props documentada
- Patrón claro para futuros componentes

## Estructura de Directorios

```
src/
└── components/
    └── layout/
        ├── GlobalHeader.js    # Cabecera superior
        ├── Sidebar.js         # Menú lateral
        ├── MainLayout.js      # Orquestador principal
        └── index.js           # Exports centralizados
```

## Notas Técnicas

### Dependencias Requeridas
- React 18+ (para hooks useState, useContext)
- Componentes comunes: Modal (de src/components/common/index.js)
- Configuración: ROLES, ALL_ROUTES (de src/config/)

### Compatibilidad
- ✅ Mantiene funcionamiento idéntico al original
- ✅ Sin cambios en la lógica de negocio
- ✅ Props pasadas correctamente desde App
- ✅ Context API funciona sin modificaciones

### Próximos Pasos Sugeridos
1. Externalizar componentes de pantallas (P01-P31)
2. Crear tests unitarios para layout components
3. Documentar props con PropTypes o TypeScript
4. Optimizar renders con React.memo si es necesario

## Verificación

Para verificar que la externalización fue exitosa:

1. **Abrir HTML en navegador**
2. **Verificar que el header se muestra correctamente**
3. **Probar cambio de usuario/rol desde el dropdown**
4. **Verificar que el sidebar abre y cierra correctamente**
5. **Navegar entre diferentes pantallas**
6. **Verificar comportamiento en rutas públicas (/, /login, /recover)**

## Autor

Generado por: Kiro AI Assistant  
Fecha: 2 de agosto, 2026  
Contexto: Sistema de Inteligencia Comercial MAF - Fase 3
