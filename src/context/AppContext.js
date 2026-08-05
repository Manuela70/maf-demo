/**
 * AppContext.js
 * 
 * Context global de la aplicación que maneja:
 * - Estado de navegación (route, navigate)
 * - Estado de demostración (demoState)
 * - Toda la lógica de estado centralizada
 * 
 * Externalizado desde: maf_wireframes_v9_FINAL.html (línea ~47)
 */

const { createContext } = React;

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

/**
 * AppContext
 * 
 * Contexto global que provee:
 * - route: string - Ruta actual de la aplicación
 * - navigate: (path: string) => void - Función para cambiar de ruta
 * - demoState: object - Estado de demostración con flags de flujo
 * - setDemoState: (updater) => void - Función para actualizar demoState
 */
export const AppContext = createContext(null);

// ═══════════════════════════════════════════════════════════════════════════
// ESTADO INICIAL DE DEMO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Estado de demostración inicial
 * 
 * Contiene flags de progreso del flujo de venta y configuraciones demo:
 * - currentRole: Rol activo del usuario
 * - Flags de evaluación: equifaxResult, plaftResult, plaftEnConsulta
 * - Flags de documentos: otpValidated, paymentConfirmed, signatureCompleted
 * - Flags de flujo: expedienteSent, coTitularActivo, pagoCuenta
 * - Datos de certificados: certificadosCombinados, totalMontoUSD
 */
export const INITIAL_DEMO_STATE = {
  currentRole: 'asesor',
  leadStatus: 'nuevo',
  
  // Evaluación de riesgo
  equifaxResult: null,
  plaftResult: null,
  plaftEnConsulta: false,
  plaftResuelto: false,
  
  // Co-titular
  coTitularActivo: false,
  coTitularResult: null,
  coTitCasuistica: 'c1',
  
  // Certificados
  certificadosCombinados: 1,
  totalMontoUSD: 20000,
  
  // Documentación y pagos
  otpValidated: false,
  paymentConfirmed: false,
  signatureCompleted: false,
  expedienteSent: false,
  pagoCuenta: false
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hook de conveniencia para usar el contexto
 * 
 * @returns {Object} Contexto completo de la aplicación
 * @throws {Error} Si se usa fuera de un AppContext.Provider
 */
export function useAppContext() {
  const context = React.useContext(AppContext);
  
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de un AppContext.Provider');
  }
  
  return context;
}
