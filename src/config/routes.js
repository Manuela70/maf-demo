/**
 * MAF Perú - Configuración de Rutas
 * Definición de las 39 rutas del sistema y flujo secuencial para navegación
 */

export const ALL_ROUTES = [
  {
    path: '/',
    label: 'Índice / Home',
    module: 'Inicio'
  },
  {
    path: '/login',
    label: 'P01 Login',
    module: 'Autenticación'
  },
  {
    path: '/recover',
    label: 'P02 Recuperar Contraseña',
    module: 'Autenticación'
  },
  {
    path: '/dashboard',
    label: 'P05 Dashboard',
    module: 'Leads'
  },
  {
    path: '/citas',
    label: '📅 Mis Citas',
    module: 'Leads'
  },
  {
    path: '/lead/list',
    label: 'P-GL Gestión de Leads',
    module: 'Leads'
  },
  {
    path: '/lead/callcenter',
    label: '🟡 P-GL-CC Call Center — Multi-Usuario + Carga Masiva + Dashboard [ACTUALIZADO 18/06]',
    module: 'Leads'
  },
  {
    path: '/lead/new',
    label: 'P07 Crear Lead',
    module: 'Leads'
  },
  {
    path: '/lead/1',
    label: 'P08 Ficha de Lead',
    module: 'Leads'
  },
  {
    path: '/eval/identity',
    label: 'P09 Identidad + RENIEC',
    module: 'Evaluación'
  },
  {
    path: '/eval/certificates',
    label: 'P09b Selección Certificados ⚡',
    module: 'Evaluación'
  },
  {
    path: '/eval/riesgo',
    label: '🟡 P10-UNIFIED — Eval. Riesgo (Resultado SIN motivo + Re-eval) [ACTUALIZADO 18/06]',
    module: 'Evaluación'
  },
  {
    path: '/eval/equifax',
    label: 'P10 Evaluación Equifax (interno)',
    module: 'Evaluación'
  },
  {
    path: '/eval/supervisor',
    label: 'P12 Revisión Supervisor',
    module: 'Evaluación'
  },
  {
    path: '/eval/empresa',
    label: 'P13 Motor Crediticio Empresa',
    module: 'Evaluación'
  },
  {
    path: '/plaft/result',
    label: 'P15 Resultado PLAFT (interno)',
    module: 'Evaluación'
  },
  {
    path: '/plaft/panel',
    label: 'P16 Panel Oficial Cumplimiento',
    module: 'Evaluación'
  },
  {
    path: '/plaft/resolve',
    label: 'P17 Resolución Caso PLAFT',
    module: 'Evaluación'
  },
  {
    path: '/eval/mensajes',
    label: '🟡 P-MSG Mensajes y Notificaciones [NUEVO 12/06]',
    module: 'Evaluación'
  },
  {
    path: '/sale/groups',
    label: 'P18 Selección Programa/Grupo/Cert. ⚡',
    module: 'Venta'
  },
  {
    path: '/sale/proforma',
    label: 'P19 Generación Proforma',
    module: 'Venta'
  },
  {
    path: '/sale/otp',
    label: 'P20 OTP Consentimiento',
    module: 'Venta'
  },
  {
    path: '/sale/docs',
    label: 'P21 Envío Documentos (6 docs) ⚡',
    module: 'Venta'
  },
  {
    path: '/sale/scan',
    label: 'P22 Captura DNI (opcional) ⚡',
    module: 'Venta'
  },
  {
    path: '/sale/payment',
    label: '🟡 P23 Orden Pago (CIA 4% + 48h + Notif) [UPD 12/06] ⚡',
    module: 'Venta'
  },
  {
    path: '/close/keynua',
    label: '🟡 P25 Firma Keynua (Notif. automáticas) [UPD 12/06]',
    module: 'Cierre'
  },
  {
    path: '/close/contract',
    label: 'P27 N° Contrato',
    module: 'Cierre'
  },
  {
    path: '/close/send',
    label: 'P28 Envío Expediente',
    module: 'Cierre'
  },
  {
    path: '/close/ops',
    label: 'P29/30 Panel Operaciones',
    module: 'Cierre'
  },
  {
    path: '/close/welcome',
    label: 'P31 Llamada Bienvenida',
    module: 'Cierre'
  },
  {
    path: '/admin/users',
    label: 'Usuarios y Roles',
    module: 'Admin'
  },
  {
    path: '/admin/roles',
    label: 'Gestión de Roles',
    module: 'Admin'
  },
  {
    path: '/admin/permisos',
    label: 'Permisos por Rol',
    module: 'Admin'
  },
  {
    path: '/admin/sucursales',
    label: 'Sucursales / Locales',
    module: 'Admin'
  },
  {
    path: '/admin/dealers',
    label: 'Dealers / Concesionarios',
    module: 'Admin'
  },
  {
    path: '/admin/plantillas',
    label: 'Plantillas de Documentos',
    module: 'Admin'
  },
  {
    path: '/admin/notificaciones',
    label: 'Mensajes y Notificaciones',
    module: 'Admin'
  },
  {
    path: '/admin/parametros',
    label: 'Parámetros del Sistema',
    module: 'Admin'
  },
  {
    path: '/admin/auditoria',
    label: 'Log de Auditoría',
    module: 'Admin'
  },
  {
    path: '/admin/bi',
    label: '🟡 Dashboard BI / Reportería (incluye Dashboard Call Center) [UPD 18/06]',
    module: 'Admin'
  }
];

/**
 * Flujo secuencial para navegación con breadcrumbs
 * Permite navegar hacia adelante/atrás con flechas
 */
export const SEQUENTIAL_FLOW = [
  '/login',
  '/dashboard',
  '/lead/new',
  '/lead/1',
  '/eval/identity',
  '/eval/certificates',
  '/eval/riesgo',
  '/eval/supervisor',
  '/plaft/panel',
  '/plaft/resolve',
  '/sale/groups',
  '/sale/proforma',
  '/sale/otp',
  '/sale/docs',
  '/sale/scan',
  '/sale/payment',
  '/close/keynua',
  '/close/contract',
  '/close/send',
  '/close/ops',
  '/close/welcome',
  '/admin/users'
];

export default {
  ALL_ROUTES,
  SEQUENTIAL_FLOW
};
