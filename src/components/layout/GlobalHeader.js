// ─── GLOBAL HEADER ──────────────────────────────────────────────────────────
// Componente externalizado: GlobalHeader
// Header superior con navegación, cambio de rol y logout

const { React } = window;
const { useState, useContext } = React;
import { Modal } from '../common/index.js';
import { Notificaciones } from '../common/Notificaciones.js';

// ─── DATOS DEMO USUARIOS ────────────────────────────────────────────────────
const DEMO_USERS_LIST = [
  { id: 1, nombre: 'María López Vega', email: 'm.lopez@maf.pe', pass: 'demo123', cargo: 'Sucursal Miraflores', roles: ['asesor'], rolPrincipal: 'asesor' },
  { id: 2, nombre: 'Carlos Ríos Paredes', email: 'c.rios@maf.pe', pass: 'demo123', cargo: 'Lima Sur', roles: ['jefe_ventas', 'supervisor'], rolPrincipal: 'jefe_ventas' },
  { id: 3, nombre: 'Jorge Mendoza', email: 'j.mendoza@maf.pe', pass: 'demo123', cargo: 'Sucursal San Isidro', roles: ['supervisor'], rolPrincipal: 'supervisor' },
  { id: 4, nombre: 'Lucía Torres', email: 'l.torres@maf.pe', pass: 'demo123', cargo: 'Call Center Externo', roles: ['callcenter', 'asesor'], rolPrincipal: 'callcenter' },
  { id: 5, nombre: 'Juan Carlos Vega', email: 'jc.vega@maf.pe', pass: 'demo123', cargo: 'Gerencia Comercial Lima', roles: ['gerente'], rolPrincipal: 'gerente' },
  { id: 6, nombre: 'Patricia Salas', email: 'p.salas@maf.pe', pass: 'demo123', cargo: 'Cumplimiento PLAFT', roles: ['oficial'], rolPrincipal: 'oficial' },
  { id: 7, nombre: 'Roberto Chang', email: 'r.chang@maf.pe', pass: 'demo123', cargo: 'Riesgos MAF FC', roles: ['admin_sistema'], rolPrincipal: 'admin_sistema' },
  { id: 8, nombre: 'Sandra Huamán', email: 's.huaman@maf.pe', pass: 'demo123', cargo: 'Operaciones EAFC', roles: ['operaciones'], rolPrincipal: 'operaciones' },
  { id: 9, nombre: 'Administrador', email: 'admin@maf.pe', pass: 'demo123', cargo: 'TI / Sistema', roles: ['admin'], rolPrincipal: 'admin' },
];

const ROLE_LABELS = {
  asesor: 'Asesor FC',
  jefe_ventas: 'Jefe de Ventas',
  supervisor: 'Supervisor',
  callcenter: 'Call Center',
  gerente: 'Gerente Comercial',
  oficial: 'Oficial PLAFT',
  admin_sistema: 'Analista Créditos',
  operaciones: 'Operaciones',
  admin: 'Administrador',
};

export function GlobalHeader({ currentPath, sidebarOpen, setSidebarOpen, AppContext, ALL_ROUTES }) {
  const { demoState, setDemoState, navigate } = useContext(AppContext);
  const [showLogout, setShowLogout] = useState(false);
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [pendingSwitch, setPendingSwitch] = useState(null);

  const screenName = ALL_ROUTES.find((r) => r.path === currentPath)?.label || currentPath;
  const activeUser = DEMO_USERS_LIST.find((u) => u.rolPrincipal === demoState.currentRole) || DEMO_USERS_LIST[0];
  const rolLabel = ROLE_LABELS[demoState.currentRole];

  const homeByRole = {
    asesor: '/dashboard',
    jefe_ventas: '/dashboard',
    supervisor: '/dashboard',
    callcenter: '/dashboard',
    gerente: '/dashboard',
    oficial: '/plaft/panel',
    admin_sistema: '/admin/users',
    operaciones: '/close/ops',
    admin: '/admin/users',
  };

  const confirmSwitch = () => {
    setDemoState((s) => ({ ...s, currentRole: pendingSwitch.role }));
    navigate(homeByRole[pendingSwitch.role] || '/dashboard');
    setPendingSwitch(null);
  };

  const iniciarTour = () => {
    if (window.iniciarOnboarding) {
      window.iniciarOnboarding(activeUser.id);
    } else {
      console.error('Onboarding no disponible aún. Recarga la página.');
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement('header', {
      className: 'fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center px-4 gap-3'
    },
      React.createElement('button', {
        onClick: () => setSidebarOpen(!sidebarOpen),
        className: 'text-gray-600 hover:text-gray-900 font-medium text-sm border border-gray-200 rounded px-2 py-1'
      }, '☰'),
      
      // Logo MAF con colores oficiales
      React.createElement('div', {
        className: 'flex items-center gap-2',
        style: { height: 36 }
      },
        // Placa "Fondos Colectivos"
        React.createElement('div', {
          style: {
            backgroundColor: '#555555',
            borderRadius: 4,
            padding: '4px 8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 32
          }
        },
          React.createElement('div', {
            style: {
              color: 'white',
              fontSize: 9,
              fontWeight: 600,
              lineHeight: 1.2,
              textAlign: 'center'
            }
          }, 'Fondos', React.createElement('br'), 'Colectivos')
        ),
        // Barra divisoria celeste
        React.createElement('div', {
          style: {
            width: 2,
            height: 32,
            backgroundColor: '#82CCE5'
          }
        }),
        // Wordmark "maf" rojo
        React.createElement('div', {
          style: {
            color: '#E30221',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }
        }, 'maf')
      ),
      
      React.createElement('div', { className: 'flex-1 min-w-0' },
        React.createElement('span', { className: 'text-sm font-semibold text-gray-800 truncate block' }, screenName)
      ),
      
      React.createElement('div', { className: 'relative flex items-center gap-2' },
        // Botón Tour/Onboarding
        React.createElement('button', {
          onClick: iniciarTour,
          className: 'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors',
          title: 'Iniciar tour guiado'
        },
          React.createElement('span', { className: 'text-base' }, '🎓'),
          React.createElement('span', { className: 'hidden sm:inline' }, 'Tour')
        ),
        
        // Campanita de notificaciones
        React.createElement(Notificaciones, {
          vendedorId: 'v1'
        }),
        
        React.createElement('button', {
          onClick: () => setShowRolePicker((v) => !v),
          className: 'flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors'
        },
          React.createElement('div', {
            className: 'w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-bold flex-shrink-0'
          }, activeUser.nombre.charAt(0)),
          React.createElement('div', { className: 'hidden sm:flex flex-col items-start leading-tight' },
            React.createElement('span', { className: 'text-xs font-semibold text-gray-800' }, activeUser.nombre),
            React.createElement('span', { className: 'text-xs text-gray-400' }, rolLabel)
          ),
          React.createElement('span', { className: 'text-gray-400 text-xs ml-1' }, '▼')
        ),
        
        showRolePicker && React.createElement('div', {
          className: 'absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden'
        },
          React.createElement('div', { className: 'px-3 py-2 border-b border-gray-100 bg-gray-50' },
            React.createElement('p', { className: 'text-xs font-semibold text-gray-500 uppercase tracking-wider' }, '[ Demo: cambiar usuario / rol ]'),
            React.createElement('p', { className: 'text-xs text-gray-400 mt-0.5' }, 'Cada usuario puede tener varios roles asignados')
          ),
          React.createElement('div', { className: 'py-1 max-h-96 overflow-y-auto' },
            DEMO_USERS_LIST.map((u) => React.createElement('div', { key: u.id },
              u.roles.length === 1 ? 
                React.createElement('button', {
                  onClick: () => {
                    const role = u.roles[0];
                    if (role === demoState.currentRole && u.id === activeUser.id) {
                      setShowRolePicker(false);
                      return;
                    }
                    setPendingSwitch({ user: u, role });
                    setShowRolePicker(false);
                  },
                  className: 'w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-gray-50 ' + 
                    (u.id === activeUser.id && u.roles[0] === demoState.currentRole ? 'bg-gray-100' : '')
                },
                  React.createElement('div', {
                    className: 'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ' +
                      (u.id === activeUser.id ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700')
                  }, u.nombre.charAt(0)),
                  React.createElement('div', { className: 'min-w-0 flex-1' },
                    React.createElement('p', { className: 'text-sm font-medium text-gray-800 truncate' }, u.nombre),
                    React.createElement('p', { className: 'text-xs text-gray-400' }, ROLE_LABELS[u.roles[0]])
                  ),
                  u.id === activeUser.id && React.createElement('span', { className: 'text-xs text-gray-400 flex-shrink-0' }, 'activo')
                )
              :
                React.createElement('div', { className: 'border-b border-gray-50' },
                  React.createElement('div', { className: 'px-3 py-2 flex items-center gap-3' },
                    React.createElement('div', {
                      className: 'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ' +
                        (u.id === activeUser.id ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700')
                    }, u.nombre.charAt(0)),
                    React.createElement('div', { className: 'min-w-0 flex-1' },
                      React.createElement('p', { className: 'text-sm font-medium text-gray-800' }, u.nombre),
                      React.createElement('p', { className: 'text-xs text-gray-400' }, u.cargo)
                    )
                  ),
                  u.roles.map((role) => React.createElement('button', {
                    key: role,
                    onClick: () => {
                      if (role === demoState.currentRole && u.id === activeUser.id) {
                        setShowRolePicker(false);
                        return;
                      }
                      setPendingSwitch({ user: u, role });
                      setShowRolePicker(false);
                    },
                    className: 'w-full text-left pl-12 pr-3 py-1.5 flex items-center gap-2 hover:bg-gray-50 text-xs ' +
                      (u.id === activeUser.id && role === demoState.currentRole ? 'bg-gray-50' : '')
                  },
                    React.createElement('span', { className: 'text-gray-300' }, '└'),
                    React.createElement('span', {
                      className: 'px-2 py-0.5 rounded border ' +
                        (u.id === activeUser.id && role === demoState.currentRole ? 
                          'bg-gray-800 text-white border-gray-800' : 
                          'bg-gray-100 border-gray-200 text-gray-600')
                    }, ROLE_LABELS[role]),
                    role === u.rolPrincipal && React.createElement('span', { className: 'text-gray-300 text-xs' }, 'principal')
                  ))
                )
            ))
          )
        ),
        
        React.createElement('button', {
          onClick: () => setShowLogout(true),
          className: 'text-xs text-gray-400 hover:text-gray-700 border border-gray-200 rounded px-2 py-1'
        }, '↩')
      ),
      
      showRolePicker && React.createElement('div', {
        className: 'fixed inset-0 z-40',
        onClick: () => setShowRolePicker(false)
      })
    ),
    
    pendingSwitch && React.createElement(Modal, {
      title: 'Cambiar perfil',
      body: React.createElement('div', null,
        React.createElement('p', { className: 'text-sm text-gray-600 mb-3' },
          'Vas a cambiar a ',
          React.createElement('strong', null, pendingSwitch.user.nombre),
          ' como ',
          React.createElement('strong', null, ROLE_LABELS[pendingSwitch.role]),
          '.'
        ),
        React.createElement('div', { className: 'p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500' },
          'El UI se adaptará al nuevo rol. El flujo actual no se guardará.'
        )
      ),
      actions: React.createElement(React.Fragment, null,
        React.createElement('button', {
          onClick: () => setPendingSwitch(null),
          className: 'border border-gray-300 rounded px-4 py-2 text-sm'
        }, 'Cancelar'),
        React.createElement('button', {
          onClick: confirmSwitch,
          className: 'bg-gray-900 text-white rounded px-4 py-2 text-sm'
        }, 'Entrar como ', ROLE_LABELS[pendingSwitch.role])
      ),
      onClose: () => setPendingSwitch(null)
    }),
    
    showLogout && React.createElement(Modal, {
      title: 'Cerrar sesión',
      body: React.createElement('p', { className: 'text-sm text-gray-600' },
        '¿Deseas cerrar la sesión de ',
        React.createElement('strong', null, activeUser.nombre),
        '?'
      ),
      actions: React.createElement(React.Fragment, null,
        React.createElement('button', {
          onClick: () => setShowLogout(false),
          className: 'border border-gray-300 rounded px-4 py-2 text-sm'
        }, 'Cancelar'),
        React.createElement('button', {
          onClick: () => {
            setShowLogout(false);
            navigate('/login');
          },
          className: 'bg-gray-900 text-white rounded px-4 py-2 text-sm'
        }, 'Cerrar sesión')
      ),
      onClose: () => setShowLogout(false)
    })
  );
}
