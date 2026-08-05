/**
 * MAF Perú - Configuración de Usuarios Demo
 * 
 * Este módulo contiene la lista de usuarios de demostración para el sistema.
 * Cada usuario representa un rol específico del flujo operativo de MAF.
 * 
 * ESTRUCTURA DE DATOS:
 * 
 * DEMO_USERS_LIST: Array de objetos de usuario con la siguiente estructura:
 * - id: {number} - Identificador único del usuario
 * - nombre: {string} - Nombre completo del usuario
 * - email: {string} - Correo electrónico corporativo (@maf.pe)
 * - pass: {string} - Contraseña de demostración (demo123 para todos)
 * - cargo: {string} - Cargo o área de trabajo del usuario
 * - roles: {string[]} - Array de roles que puede asumir el usuario
 * - rolPrincipal: {string} - Rol principal del usuario (debe estar en ROLES)
 * 
 * DEMO_USERS: Objeto mapeado por rol para acceso rápido en login
 * - Cada clave es un rol (string) de ROLES
 * - Cada valor contiene: email, pass, nombre, cargo, userId
 * 
 * USO:
 * - Login demo: Seleccionar usuario por rol desde DEMO_USERS
 * - Cambio de rol: Buscar en DEMO_USERS_LIST por rolPrincipal
 * - Selector de usuario: Iterar sobre DEMO_USERS_LIST
 * 
 * @module config/demoUsers
 */

import { ROLES } from './roles.js';

/**
 * Lista completa de usuarios de demostración
 * Representa los 9 roles del sistema de MAF
 */
export const DEMO_USERS_LIST = [
  {
    id: 1,
    nombre: 'María López Vega',
    email: 'm.lopez@maf.pe',
    pass: 'demo123',
    cargo: 'Sucursal Miraflores',
    roles: ['asesor'],
    rolPrincipal: 'asesor'
  },
  {
    id: 2,
    nombre: 'Carlos Ríos Paredes',
    email: 'c.rios@maf.pe',
    pass: 'demo123',
    cargo: 'Lima Sur',
    roles: ['jefe_ventas', 'supervisor'],
    rolPrincipal: 'jefe_ventas'
  },
  {
    id: 3,
    nombre: 'Jorge Mendoza',
    email: 'j.mendoza@maf.pe',
    pass: 'demo123',
    cargo: 'Sucursal San Isidro',
    roles: ['supervisor'],
    rolPrincipal: 'supervisor'
  },
  {
    id: 4,
    nombre: 'Lucía Torres',
    email: 'l.torres@maf.pe',
    pass: 'demo123',
    cargo: 'Call Center Externo',
    roles: ['callcenter', 'asesor'],
    rolPrincipal: 'callcenter'
  },
  {
    id: 5,
    nombre: 'Juan Carlos Vega',
    email: 'jc.vega@maf.pe',
    pass: 'demo123',
    cargo: 'Gerencia Comercial Lima',
    roles: ['gerente'],
    rolPrincipal: 'gerente'
  },
  {
    id: 6,
    nombre: 'Patricia Salas',
    email: 'p.salas@maf.pe',
    pass: 'demo123',
    cargo: 'Cumplimiento PLAFT',
    roles: ['oficial'],
    rolPrincipal: 'oficial'
  },
  {
    id: 7,
    nombre: 'Roberto Chang',
    email: 'r.chang@maf.pe',
    pass: 'demo123',
    cargo: 'Riesgos MAF FC',
    roles: ['admin_sistema'],
    rolPrincipal: 'admin_sistema'
  },
  {
    id: 8,
    nombre: 'Sandra Huamán',
    email: 's.huaman@maf.pe',
    pass: 'demo123',
    cargo: 'Operaciones EAFC',
    roles: ['operaciones'],
    rolPrincipal: 'operaciones'
  },
  {
    id: 9,
    nombre: 'Administrador',
    email: 'admin@maf.pe',
    pass: 'demo123',
    cargo: 'TI / Sistema',
    roles: ['admin'],
    rolPrincipal: 'admin'
  }
];

/**
 * Mapeo de roles a usuarios para acceso rápido
 * Usado principalmente en la pantalla de login demo
 * 
 * Estructura: { [rol]: { email, pass, nombre, cargo, userId } }
 */
export const DEMO_USERS = Object.fromEntries(
  ROLES.map(role => {
    const u = DEMO_USERS_LIST.find(u => u.rolPrincipal === role) || DEMO_USERS_LIST[0];
    return [
      role,
      {
        email: u.email,
        pass: u.pass,
        nombre: u.nombre,
        cargo: u.cargo,
        userId: u.id
      }
    ];
  })
);

/**
 * Obtiene un usuario por su rol principal
 * @param {string} role - Rol a buscar
 * @returns {object|null} Usuario encontrado o null
 */
export function getUserByRole(role) {
  return DEMO_USERS_LIST.find(u => u.rolPrincipal === role) || null;
}

/**
 * Obtiene un usuario por su ID
 * @param {number} id - ID del usuario
 * @returns {object|null} Usuario encontrado o null
 */
export function getUserById(id) {
  return DEMO_USERS_LIST.find(u => u.id === id) || null;
}

/**
 * Obtiene un usuario por su email
 * @param {string} email - Email del usuario
 * @returns {object|null} Usuario encontrado o null
 */
export function getUserByEmail(email) {
  return DEMO_USERS_LIST.find(u => u.email === email) || null;
}

/**
 * Valida credenciales de login demo
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña
 * @returns {object|null} Usuario si las credenciales son válidas, null si no
 */
export function validateDemoCredentials(email, password) {
  const user = getUserByEmail(email);
  return user && user.pass === password ? user : null;
}

export default {
  DEMO_USERS_LIST,
  DEMO_USERS,
  getUserByRole,
  getUserById,
  getUserByEmail,
  validateDemoCredentials
};
