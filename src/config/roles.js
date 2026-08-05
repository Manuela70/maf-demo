/**
 * MAF Perú - Configuración de Roles
 * Definición de los 9 roles del sistema y sus permisos de acceso
 */

export const ROLES = [
  'asesor',
  'jefe_ventas',
  'supervisor',
  'callcenter',
  'gerente',
  'oficial',
  'admin_sistema',
  'operaciones',
  'admin'
];

export const ROLE_LABELS = {
  asesor: 'Asesor FC',
  jefe_ventas: 'Jefe de Ventas',
  supervisor: 'Supervisor Comercial',
  callcenter: 'Call Center',
  gerente: 'Gerente Comercial',
  oficial: 'Oficial PLAFT',
  admin_sistema: 'Admin Sistema',
  operaciones: 'Operaciones',
  admin: 'Administrador'
};

export const ROLE_SCREENS = {
  asesor: [
    '/dashboard',
    '/citas',
    '/lead/list',
    '/lead/new',
    '/lead/1',
    '/eval/identity',
    '/eval/certificates',
    '/eval/riesgo',
    '/eval/mensajes',
    '/sale/groups',
    '/sale/proforma',
    '/sale/otp',
    '/sale/docs',
    '/sale/scan',
    '/sale/payment',
    '/close/keynua',
    '/close/contract',
    '/close/send',
    '/close/welcome'
  ],
  jefe_ventas: [
    '/dashboard',
    '/citas',
    '/lead/new',
    '/lead/1',
    '/eval/identity',
    '/eval/certificates',
    '/eval/riesgo',
    '/eval/mensajes',
    '/sale/groups',
    '/sale/proforma',
    '/sale/otp',
    '/sale/docs',
    '/sale/scan',
    '/sale/payment',
    '/close/keynua',
    '/close/contract',
    '/close/send',
    '/close/welcome'
  ],
  supervisor: [
    '/dashboard',
    '/lead/list',
    '/lead/1',
    '/eval/supervisor',
    '/eval/equifax'
  ],
  callcenter: [
    '/dashboard',
    '/citas',
    '/lead/new',
    '/lead/1',
    '/lead/callcenter'
  ],
  gerente: [
    '/dashboard',
    '/admin/bi'
  ],
  oficial: [
    '/eval/equifax',
    '/plaft/result',
    '/plaft/panel',
    '/plaft/resolve',
    '/eval/mensajes'
  ],
  admin_sistema: 'all',
  operaciones: [
    '/close/ops',
    '/close/welcome',
    '/close/send'
  ],
  admin: 'all'
};

export default {
  ROLES,
  ROLE_LABELS,
  ROLE_SCREENS
};
