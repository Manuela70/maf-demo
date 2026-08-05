// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────
// Componente externalizado: MainLayout
// Layout principal que orquesta GlobalHeader, Sidebar y el contenido de la aplicación

const { React } = window;
const { useState } = React;
import { GlobalHeader } from './GlobalHeader.js';
import { Sidebar } from './Sidebar.js';

/**
 * MainLayout - Componente de layout principal
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a renderizar en el layout
 * @param {string} props.currentPath - Ruta actual de la aplicación
 * @param {Object} props.AppContext - Contexto global de la aplicación
 * @param {Array} props.ALL_ROUTES - Array con todas las rutas de la aplicación
 * @param {Object} props.ROLE_SCREENS - Mapeo de roles a pantallas accesibles
 * @param {boolean} [props.showLayout=true] - Si false, muestra solo children sin header/sidebar
 */
export function MainLayout({ 
  children, 
  currentPath, 
  AppContext, 
  ALL_ROUTES, 
  ROLE_SCREENS,
  showLayout = true 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Para rutas públicas (login, etc.) no mostrar header ni sidebar
  if (!showLayout) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null,
    /*#__PURE__*/React.createElement(GlobalHeader, {
      currentPath: currentPath,
      sidebarOpen: sidebarOpen,
      setSidebarOpen: setSidebarOpen,
      AppContext: AppContext,
      ALL_ROUTES: ALL_ROUTES
    }),
    
    /*#__PURE__*/React.createElement(Sidebar, {
      open: sidebarOpen,
      currentPath: currentPath,
      AppContext: AppContext,
      ALL_ROUTES: ALL_ROUTES,
      ROLE_SCREENS: ROLE_SCREENS
    }),
    
    children
  );
}
