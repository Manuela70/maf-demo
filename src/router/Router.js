/**
 * Router.js
 * 
 * Router básico de la aplicación MAF Perú - Plataforma FC
 * 
 * Maneja:
 * - Mapeo de rutas a componentes
 * - Navegación entre pantallas
 * - Control de layout (público vs privado)
 * - Estado de navegación
 * 
 * Externalizado desde: maf_wireframes_v9_FINAL.html (línea ~5840)
 */

const { useState } = React;

// ═══════════════════════════════════════════════════════════════════════════
// IMPORTS DE PANTALLAS
// ═══════════════════════════════════════════════════════════════════════════

// NOTA: Estas importaciones se resolverán cuando se externalicen las pantallas
// Por ahora, el mapeo SCREENS se mantiene en el HTML principal

// ═══════════════════════════════════════════════════════════════════════════
// UTILIDADES DE NAVEGACIÓN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Determina si una ruta es pública (sin autenticación)
 * 
 * @param {string} path - Ruta a verificar
 * @returns {boolean} true si la ruta es pública
 */
export function isPublicRoute(path) {
  const publicRoutes = ['/', '/login', '/recover'];
  return publicRoutes.includes(path);
}

/**
 * Obtiene la ruta inicial según el rol del usuario
 * 
 * @param {string} role - Rol del usuario
 * @returns {string} Ruta inicial correspondiente al rol
 */
export function getHomeRoute(role) {
  const homeByRole = {
    asesor: '/dashboard',
    jefe_ventas: '/dashboard',
    supervisor: '/dashboard',
    callcenter: '/dashboard',
    gerente: '/dashboard',
    oficial: '/plaft/panel',
    admin_sistema: '/admin/users',
    operaciones: '/close/ops',
    admin: '/admin/users'
  };
  
  return homeByRole[role] || '/dashboard';
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK DE NAVEGACIÓN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook personalizado para manejar navegación
 * 
 * @returns {Object} Estado y funciones de navegación
 * @returns {string} .route - Ruta actual
 * @returns {Function} .navigate - Función de navegación
 * @returns {Function} .goBack - Función para volver atrás
 */
export function useRouter() {
  const [route, setRoute] = useState('/');
  const [history, setHistory] = useState(['/']);
  
  /**
   * Navega a una nueva ruta
   * 
   * @param {string} path - Ruta de destino
   * @param {Object} options - Opciones de navegación
   * @param {boolean} options.replace - Si true, reemplaza la ruta actual en el historial
   */
  const navigate = (path, options = {}) => {
    if (options.replace) {
      setHistory(prev => [...prev.slice(0, -1), path]);
    } else {
      setHistory(prev => [...prev, path]);
    }
    
    setRoute(path);
    
    // Scroll to top en navegación
    window.scrollTo(0, 0);
  };
  
  /**
   * Vuelve a la ruta anterior
   */
  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousRoute = newHistory[newHistory.length - 1];
      
      setHistory(newHistory);
      setRoute(previousRoute);
      window.scrollTo(0, 0);
    }
  };
  
  return {
    route,
    navigate,
    goBack,
    canGoBack: history.length > 1
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE ROUTER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Router
 * 
 * Componente principal de navegación que:
 * - Renderiza el componente correspondiente a la ruta actual
 * - Maneja rutas no encontradas
 * - Integra con MainLayout para rutas privadas
 * 
 * Props:
 * @param {Object} screens - Mapeo de rutas a componentes
 * @param {string} currentRoute - Ruta actual
 * @param {Function} onNavigate - Callback de navegación
 * @param {Object} layoutProps - Props para MainLayout
 */
export function Router({ screens, currentRoute, onNavigate, layoutProps = {} }) {
  // Buscar componente para la ruta actual
  const CurrentScreen = screens[currentRoute];
  
  // Pantalla 404 si no existe la ruta
  if (!CurrentScreen) {
    return React.createElement(Screen, { path: currentRoute },
      React.createElement('div', { className: 'text-center py-12' },
        React.createElement('p', { className: 'text-gray-500' },
          'Pantalla no encontrada: ', currentRoute
        ),
        React.createElement('button', {
          onClick: () => onNavigate('/'),
          className: 'mt-3 border border-gray-300 rounded px-4 py-2 text-sm'
        }, '← Ir al índice')
      )
    );
  }
  
  return React.createElement(CurrentScreen, null);
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE ROUTE
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Route
 * 
 * Componente para definir una ruta individual
 * (útil para una futura migración a un sistema de rutas más complejo)
 * 
 * Props:
 * @param {string} path - Ruta del componente
 * @param {Component} component - Componente a renderizar
 * @param {boolean} exact - Si true, la ruta debe coincidir exactamente
 * @param {Function} render - Función de render alternativa
 */
export function Route({ path, component: Component, exact = false, render }) {
  // Este componente es preparatorio para una futura implementación más robusta
  // Por ahora, el routing se maneja en App.js
  
  if (render) {
    return render();
  }
  
  if (Component) {
    return React.createElement(Component, null);
  }
  
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export default Router;
