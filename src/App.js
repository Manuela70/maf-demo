// ─── IMPORTS ────────────────────────────────────────────────────────────────
import { ROLES, ROLE_LABELS, ROLE_SCREENS } from './config/roles.js';
import { ALL_ROUTES, SEQUENTIAL_FLOW } from './config/routes.js';
import { 
  AnnotationNote,
  StatusBadge,
  FormField,
  Modal,
  ChannelSelector,
  ProgressPipeline,
  Breadcrumb,
  setBreadcrumbContext,
  DemoToggle,
  MiDesempenio,
  OnboardingGuiado,
  ModuloCitas
} from './components/common/index.js';
import { 
  GlobalHeader,
  Sidebar,
  MainLayout
} from './components/layout/index.js';
import { 
  AppContext, 
  INITIAL_DEMO_STATE,
  useAppContext
} from './context/AppContext.js';
import {
  Router,
  useRouter,
  isPublicRoute,
  getHomeRoute
} from './router/Router.js';
import { AgenteCopiloto } from './agents/AgenteCopiloto.js';
import { AgenteAsistente } from './agents/AgenteAsistente.js';
import { AgentePriorizacion } from './agents/AgentePriorizacion.js';
import { AgenteCopilotoEjecutivo } from './agents/AgenteCopilotoEjecutivo.js';
import { generarReporteConsolidado, VENDEDORES } from './mockData.js';

// ─── REACT HOOKS ───────────────────────────────────────────────────────────
const {
  useState,
  useContext,
  useEffect,
  useRef
} = React;

// Inyectar AppContext en Breadcrumb
setBreadcrumbContext(AppContext);

// ═══════════════════════════════════════════════════════════════════════════
// NOTA: GlobalHeader y Sidebar han sido externalizados a:
// - src/components/layout/GlobalHeader.js
// - src/components/layout/Sidebar.js  
// - src/components/layout/MainLayout.js
// Se importan en la línea 31 de este archivo
// ═══════════════════════════════════════════════════════════════════════════

// ─── SCREEN WRAPPER ──────────────────────────────────────────────────────────
function Screen({
  children,
  path,
  pipeline
}) {
  const { navigate } = React.useContext(AppContext);
  
  // Mapeo de rutas a su pantalla anterior
  const backRoutes = {
    '/login': null, // No tiene retroceso
    '/dashboard': '/login', // Volver al login (para cambiar de usuario en la demo)
    '/': '/login',
    '/lead/list': '/dashboard',
    '/lead/new': '/lead/list',
    '/lead/1': '/lead/list',
    '/lead/callcenter': '/dashboard',
    '/citas': '/dashboard',
    '/eval': '/lead/1',
    '/eval/empresa': '/dashboard',
    '/eval/auto': '/lead/1',
    '/eval/plaft': '/eval',
    '/close': '/eval',
    '/close/dni': '/close',
    '/close/kashio': '/close/dni',
    '/close/keynua': '/close/kashio',
    '/close/contrato': '/close/keynua',
    '/close/ops': '/dashboard',
    '/config': '/dashboard',
    '/templates': '/dashboard'
  };
  
  const backPath = backRoutes[path];
  const showBackButton = backPath !== undefined && backPath !== null;
  
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen pt-16"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 max-w-5xl mx-auto"
  }, showBackButton && /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(backPath),
    className: "mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors hover:gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "←"), "Volver"), pipeline && /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(ProgressPipeline, {
    activeStep: pipeline
  })), children, /*#__PURE__*/React.createElement(Breadcrumb, {
    current: path
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO 0 — ÍNDICE
// ═══════════════════════════════════════════════════════════════════════════
function HomeIndex() {
  const {
    navigate
  } = useContext(AppContext);
  const modules = [...new Set(ALL_ROUTES.filter(r => r.path !== '/').map(r => r.module))];
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-200 border border-gray-300 rounded inline-flex items-center justify-center font-bold text-gray-700 text-lg mb-3",
    style: {
      width: 120,
      height: 48
    }
  }, "[MAF FC]"), /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-bold text-gray-900"
  }, "Plataforma de Ventas FC \u2014 MAF Per\xFA"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Plataforma Web de Ventas \u2014 MAF Per\xFA EAFC"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/login'),
    className: "mt-3 bg-gray-800 text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-700"
  }, "\u25B6 Iniciar flujo desde Login")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border-2 border-dashed border-gray-300 rounded p-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"
  }, "[ Demo \u2014 Casu\xEDsticas del coasociado ]"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mb-3"
  }, "Acceso directo a P10 con cada casu\xEDstica preseleccionada \u2014 para validar el comportamiento correcto con MAF"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
  }, [{
    id: 'c1',
    label: 'C1: Ambos aprueban',
    desc: 'Happy path — ambos titulares califican'
  }, {
    id: 'c2',
    label: 'C2: Titular OK / Coasociado rechazado',
    desc: 'Lógica restrictiva — venta cae'
  }, {
    id: 'c3',
    label: 'C3: Titular rechazado / Coasociado OK',
    desc: 'Lógica restrictiva aplicada al titular'
  }, {
    id: 'c4',
    label: 'C4: Ambos rechazados',
    desc: 'Ninguno califica'
  }, {
    id: 'c5',
    label: 'C5: Titular OK / Coasociado en revisión',
    desc: 'PLAFT Consultar en coasociado'
  }, {
    id: 'c6',
    label: 'C6: Coasociado en reintento',
    desc: '1er rechazo crediticio — monto reducido'
  }].map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => navigate('/eval/riesgo'),
    className: "text-left border border-gray-200 rounded p-3 hover:bg-gray-50 hover:border-gray-300"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-800"
  }, c.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, c.desc)))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-2 text-center italic"
  }, "\u2192 Confirma con MAF cu\xE1l es el comportamiento correcto antes del desarrollo")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
  }, modules.map(mod => /*#__PURE__*/React.createElement("div", {
    key: mod,
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pb-2 border-b border-gray-100"
  }, mod), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, ALL_ROUTES.filter(r => r.module === mod && r.path !== '/').map(s => {
    const V3_PATHS = new Set(['/eval/certificates', '/sale/groups', '/sale/payment', '/sale/docs', '/sale/scan', '/close/keynua']);
    const V2_PATHS = new Set(['/lead/new', '/eval/riesgo', '/plaft/panel', '/plaft/resolve', '/sale/proforma', '/close/contract']);
    const INTERNAL_PATHS = new Set(['/eval/equifax', '/plaft/result']);
    const NEW_PATHS = new Set(['/eval/mensajes']);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s.path
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate(s.path),
      className: "w-full text-left text-xs px-3 py-2 border border-gray-200 rounded hover:bg-gray-50 text-gray-700 hover:text-gray-900 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", null, s.label), V3_PATHS.has(s.path) && /*#__PURE__*/React.createElement("span", {
      className: "font-bold ml-2 flex-shrink-0",
      style: {
        color: '#7c3aed'
      }
    }, "\u26A1 v3.0"), V2_PATHS.has(s.path) && /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#f97316'
      },
      className: "font-bold ml-2 flex-shrink-0"
    }, "\u26A1 v2.0"), NEW_PATHS.has(s.path) && /*#__PURE__*/React.createElement("span", {
      className: "font-bold ml-2 flex-shrink-0"
    }, "\uD83C\uDD95")), s.path === '/eval/riesgo' && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-400 px-3 py-1 italic"
    }, "(P10 Equifax y P15 PLAFT ahora son internas \u2014 solo visibles para Oficial/Admin)"), INTERNAL_PATHS.has(s.path) && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-400 px-3 py-1 italic"
    }, "[Solo visible para Oficial de Cumplimiento / Admin]"));
  }))))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P01 — LOGIN CON SELECCIÓN DE PERFIL
// ═══════════════════════════════════════════════════════════════════════════

// ─── MODELO USUARIO / ROL (como Kinto/SGC) ─────────────────────────────────
// Un usuario tiene un perfil (correo) y se le asignan N roles.
// Solo uno es el "principal" (activo al loguear). Puede cambiar entre sus roles asignados.
// El front valida con el CÓDIGO del rol (nunca el ID). El admin solo asigna roles de nivel inferior.

const DEMO_USERS_LIST = [{
  id: 1,
  nombre: 'María López Vega',
  email: 'm.lopez@maf.pe',
  pass: 'demo123',
  cargo: 'Sucursal Miraflores',
  roles: ['asesor'],
  rolPrincipal: 'asesor'
}, {
  id: 2,
  nombre: 'Carlos Ríos Paredes',
  email: 'c.rios@maf.pe',
  pass: 'demo123',
  cargo: 'Lima Sur',
  roles: ['jefe_ventas', 'supervisor'],
  rolPrincipal: 'jefe_ventas'
}, {
  id: 3,
  nombre: 'Jorge Mendoza',
  email: 'j.mendoza@maf.pe',
  pass: 'demo123',
  cargo: 'Sucursal San Isidro',
  roles: ['supervisor'],
  rolPrincipal: 'supervisor'
}, {
  id: 4,
  nombre: 'Lucía Torres',
  email: 'l.torres@maf.pe',
  pass: 'demo123',
  cargo: 'Call Center Externo',
  roles: ['callcenter', 'asesor'],
  rolPrincipal: 'callcenter'
}, {
  id: 5,
  nombre: 'Juan Carlos Vega',
  email: 'jc.vega@maf.pe',
  pass: 'demo123',
  cargo: 'Gerencia Comercial Lima',
  roles: ['gerente'],
  rolPrincipal: 'gerente'
}, {
  id: 6,
  nombre: 'Patricia Salas',
  email: 'p.salas@maf.pe',
  pass: 'demo123',
  cargo: 'Cumplimiento PLAFT',
  roles: ['oficial'],
  rolPrincipal: 'oficial'
}, {
  id: 7,
  nombre: 'Roberto Chang',
  email: 'r.chang@maf.pe',
  pass: 'demo123',
  cargo: 'Riesgos MAF FC',
  roles: ['admin_sistema'],
  rolPrincipal: 'admin_sistema'
}, {
  id: 8,
  nombre: 'Sandra Huamán',
  email: 's.huaman@maf.pe',
  pass: 'demo123',
  cargo: 'Operaciones EAFC',
  roles: ['operaciones'],
  rolPrincipal: 'operaciones'
}, {
  id: 9,
  nombre: 'Administrador',
  email: 'admin@maf.pe',
  pass: 'demo123',
  cargo: 'TI / Sistema',
  roles: ['admin'],
  rolPrincipal: 'admin'
}];

// Acceso rápido por rol (para el login demo — muestra el usuario con ese rol principal)
const DEMO_USERS = Object.fromEntries(ROLES.map(role => {
  const u = DEMO_USERS_LIST.find(u => u.rolPrincipal === role) || DEMO_USERS_LIST[0];
  return [role, {
    email: u.email,
    pass: u.pass,
    nombre: u.nombre,
    cargo: u.cargo,
    userId: u.id
  }];
}));
const ROLE_DESCRIPTION = {
  asesor: 'Opera el flujo completo de venta in situ junto al cliente.',
  jefe_ventas: 'Ejecuta todo el flujo de ventas y puede asignar leads al Asesor FC.',
  supervisor: 'Asigna leads, revisa evaluaciones y gestiona casos PLAFT.',
  callcenter: 'Registra leads y los asigna al asesor. No evalúa ni opera ventas.',
  gerente: 'Visualiza reportes y dashboards de su zona. Solo consulta.',
  oficial: 'Gestiona casos PLAFT "Consultar" desde su panel de cumplimiento.',
  admin_sistema: 'Acceso técnico completo para soporte y auditoría del sistema.',
  operaciones: 'Valida expedientes y confirma el cierre. Llamada de bienvenida.',
  admin: 'Gestión de usuarios, roles y configuración del sistema.'
};

// Nivel jerárquico para regla: solo asignas roles de nivel inferior al tuyo
const ROLE_LEVEL = {
  admin: 0,
  gerente: 1,
  oficial: 1,
  admin_sistema: 1,
  jefe_ventas: 2,
  supervisor: 2,
  operaciones: 2,
  asesor: 3,
  callcenter: 3
};
function P01Login() {
  const {
    navigate,
    setDemoState
  } = useContext(AppContext);
  const [selectedRole, setSelectedRole] = useState('asesor');
  const [pass, setPass] = useState('');
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const user = DEMO_USERS[selectedRole];
  const handleLogin = () => {
    if (locked) return;
    if (pass === user.pass) {
      setDemoState(s => ({
        ...s,
        currentRole: selectedRole
      }));
      // Redirigir según rol
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
      navigate(homeByRole[selectedRole] || '/dashboard');
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setShowError(true);
      if (next >= 5) setLocked(true);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm"
  }, 
    // Logo de MAF - Mismo diseño del header
    /*#__PURE__*/React.createElement("div", {
      className: "text-center mb-8"
    }, 
      // Logo MAF con colores oficiales (igual al header)
      /*#__PURE__*/React.createElement("div", {
        className: "inline-flex items-center gap-2 mb-4",
        style: { height: 48 }
      },
        // Placa "Fondos Colectivos"
        /*#__PURE__*/React.createElement("div", {
          style: {
            backgroundColor: '#555555',
            borderRadius: 6,
            padding: '6px 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 48
          }
        },
          /*#__PURE__*/React.createElement("div", {
            style: {
              color: 'white',
              fontSize: 11,
              fontWeight: 600,
              lineHeight: 1.3,
              textAlign: 'center'
            }
          }, "Fondos", /*#__PURE__*/React.createElement("br"), "Colectivos")
        ),
        // Barra divisoria celeste
        /*#__PURE__*/React.createElement("div", {
          style: {
            width: 3,
            height: 48,
            backgroundColor: '#82CCE5'
          }
        }),
        // Wordmark "maf" rojo
        /*#__PURE__*/React.createElement("div", {
          style: {
            color: '#E30221',
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }
        }, "maf")
      ),
      // Subtítulo
      /*#__PURE__*/React.createElement("h1", {
        className: "text-xl font-bold text-gray-900 mb-1"
      }, "Sistema de Inteligencia Comercial"),
      /*#__PURE__*/React.createElement("p", {
        className: "text-sm text-gray-500"
      }, "Plataforma de Ventas FC")
    ),
    
    /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-2"
  }, "[ Demo: Selecciona el perfil de acceso ]"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-1.5"
  }, Object.entries(DEMO_USERS).map(([role, u]) => /*#__PURE__*/React.createElement("button", {
    key: role,
    onClick: () => {
      setSelectedRole(role);
      setPass('');
      setShowError(false);
      setAttempts(0);
      setLocked(false);
    },
    className: `text-xs py-1.5 px-1 rounded border text-center transition-colors ${selectedRole === role ? 'bg-gray-800 text-white border-gray-800 font-semibold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`
  }, ROLE_LABELS[role])))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full bg-gray-300 border border-gray-400 flex items-center justify-center text-gray-700 font-bold text-sm flex-shrink-0"
  }, user.nombre.charAt(0)), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-gray-900 truncate"
  }, user.nombre), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 truncate"
  }, user.cargo))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-2 pt-2 border-t border-gray-200"
  }, ROLE_DESCRIPTION[selectedRole]), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-300 mt-1"
  }, "\uD83D\uDCE7 ", user.email)), locked && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700"
  }, "\u26D4 Cuenta bloqueada. Por favor espera o contacta al administrador."), showError && !locked && /*#__PURE__*/React.createElement("div", {
    className: "mb-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700"
  }, "\u2717 Contrase\xF1a incorrecta \xB7 Intento ", attempts, " de 5"), /*#__PURE__*/React.createElement(FormField, {
    label: "Contrase\xF1a",
    type: "password",
    required: true,
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: pass,
    onChange: e => {
      setPass(e.target.value);
      setShowError(false);
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleLogin,
    disabled: locked || !pass,
    className: `w-full py-2.5 rounded text-sm font-semibold mt-1 ${locked || !pass ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "Ingresar como ", ROLE_LABELS[selectedRole]), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-300 text-center mt-3"
  }, "Contrase\xF1a demo: ", /*#__PURE__*/React.createElement("span", {
    className: "font-mono"
  }, "demo123"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Cada perfil tiene credenciales \xFAnicas. El rol se propaga al demoState y adapta sidebar, dashboard y acciones disponibles."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Tras 5 intentos: bloqueo autom\xE1tico. Requiere acci\xF3n del administrador."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    id: "AG1",
    text: "\xBFAzure AD SSO o BD propia? Si Azure AD: login unificado, esta pantalla se reemplaza por redirect SSO."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P02 — RECUPERAR CONTRASEÑA
// ═══════════════════════════════════════════════════════════════════════════
function P02Recover() {
  const {
    navigate
  } = useContext(AppContext);
  const [estado, setEstado] = useState('solicitud'); // solicitud | nueva | expirado
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const strength = pass1.length === 0 ? 0 : pass1.length < 6 ? 1 : pass1.length < 10 ? 2 : 3;
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/recover"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-sm mx-auto mt-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4 justify-center"
  }, ['solicitud', 'nueva', 'expirado'].map(e => /*#__PURE__*/React.createElement("button", {
    key: e,
    onClick: () => {
      setEstado(e);
      setSent(false);
    },
    className: `text-xs px-3 py-1 rounded border ${estado === e ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 text-gray-500'}`
  }, e === 'solicitud' ? 'Estado 1: Solicitud' : e === 'nueva' ? 'Estado 2: Nueva contraseña' : 'Estado 3: Link expirado'))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4 text-center"
  }, estado === 'solicitud' ? 'Recuperar contraseña' : estado === 'nueva' ? 'Nueva contraseña' : 'Enlace expirado'), estado === 'solicitud' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormField, {
    label: "Correo corporativo",
    type: "email",
    required: true,
    placeholder: "usuario@maf.pe",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), sent && /*#__PURE__*/React.createElement("div", {
    className: "mb-3 p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700"
  }, "Si el correo existe en nuestro sistema, recibir\xE1s instrucciones en breve."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSent(true),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Enviar enlace de recuperaci\xF3n")), estado === 'nueva' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormField, {
    label: "Nueva contrase\xF1a",
    type: "password",
    required: true,
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: pass1,
    onChange: e => setPass1(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-1"
  }, "Seguridad de contrase\xF1a"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, [1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `h-1.5 flex-1 rounded ${i <= strength ? 'bg-gray-700' : 'bg-gray-200'}`
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, strength === 0 ? '—' : strength === 1 ? 'Débil' : strength === 2 ? 'Media' : 'Fuerte')), /*#__PURE__*/React.createElement(FormField, {
    label: "Confirmar contrase\xF1a",
    type: "password",
    required: true,
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    value: pass2,
    onChange: e => setPass2(e.target.value),
    error: pass2 && pass1 !== pass2 ? 'Las contraseñas no coinciden' : null
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/login'),
    disabled: !pass1 || pass1 !== pass2,
    className: `w-full py-2 rounded text-sm font-semibold ${!pass1 || pass1 !== pass2 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "Restablecer contrase\xF1a")), estado === 'expirado' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700"
  }, "\u2717 El enlace de recuperaci\xF3n ha expirado o ya fue utilizado."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEstado('solicitud'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Solicitar nuevo enlace")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/login'),
    className: "w-full mt-3 border border-gray-300 text-gray-600 py-2 rounded text-sm hover:bg-gray-50"
  }, "\u2190 Volver al login")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Mensaje siempre gen\xE9rico: no revelar si el email existe en el sistema."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Link de recuperaci\xF3n: TTL 30 min, un solo uso. Expiraci\xF3n autom\xE1tica."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    id: "AG1",
    text: "CONDICIONAL: esta pantalla se cancela si el login usa Azure AD SSO."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P05 — DASHBOARD PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════
const DEMO_LEADS = [{
  id: 1,
  nombre: 'Carlos Mendoza Ríos',
  fuente: 'In situ',
  estado: 'En seguimiento',
  fecha: '12/03/2026',
  contacto: 'Hoy 10:30'
}, {
  id: 2,
  nombre: 'Ana Sofía Torres',
  fuente: 'Call Center',
  estado: 'Nuevo',
  fecha: '11/03/2026',
  contacto: 'Ayer 15:00'
}, {
  id: 3,
  nombre: 'Roberto Sánchez P.',
  fuente: 'Landing',
  estado: 'Contactado',
  fecha: '10/03/2026',
  contacto: '10/03/2026'
}, {
  id: 4,
  nombre: 'María Elena Ruiz',
  fuente: 'In situ',
  estado: 'No contactado',
  fecha: '09/03/2026',
  contacto: '09/03/2026'
}, {
  id: 5,
  nombre: 'Luis Jaime Castro',
  fuente: 'Call Center',
  estado: 'Descartado',
  fecha: '08/03/2026',
  contacto: '08/03/2026'
}];

// ═══════════════════════════════════════════════════════════════════════════
// P-CITAS — MIS CITAS (NUEVO 05-AGO-2026)
// ═══════════════════════════════════════════════════════════════════════════

function PCitas() {
  const { navigate } = useContext(AppContext);
  
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/citas"
  }, /*#__PURE__*/React.createElement(ModuloCitas, {
    vendedorId: 'v1',
    className: ""
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// P05 — DASHBOARD PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

function P05Dashboard() {
  const {
    navigate,
    demoState
  } = useContext(AppContext);
  const [vacío, setVacío] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const rol = demoState.currentRole;
  const fuenBadge = {
    'In situ': 'bg-gray-200',
    'Call Center': 'bg-purple-100 text-purple-700',
    'Landing': 'bg-gray-100 border border-gray-300',
    'Derivado Dealer': 'bg-gray-200',
    'Digital': 'bg-gray-100 border border-gray-200'
  };
  const filtrados = DEMO_LEADS.filter(l => (!filtroEstado || l.estado === filtroEstado) && (!busqueda || l.nombre.toLowerCase().includes(busqueda.toLowerCase())));

  // Gerente: solo vista de reportería
  if (rol === 'gerente') return /*#__PURE__*/React.createElement(Screen, {
    path: "/dashboard"
  }, /*#__PURE__*/React.createElement(React.Fragment, null,
    // Agente 4: Copiloto Ejecutivo para Gerente
    /*#__PURE__*/React.createElement(AgenteCopilotoEjecutivo, {
      rol: 'gerente',
      sucursalId: 's1',
      onDrillDown: (filtro) => console.log('Drill-down:', filtro),
      className: "mb-6"
    }),
    
    /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Panel Gerente Comercial"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Solo lectura \u2014 Reporter\xEDa y m\xE9tricas de zona"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
  }, [['Leads este mes', '342'], ['Contratos cerrados', '18'], ['Tasa conversión', '5.3%'], ['Asesores activos', '12']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold text-gray-900"
  }, v), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-1"
  }, k)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 text-center text-gray-400"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "Dashboard BI embebido (QuickSight / Power BI)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1"
  }, "Fase 2 \u2014 requiere acumulaci\xF3n de datos operativos (3\u20136 meses)"), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RF-020 DECIDIDO: Fase 1 incluye 3 dashboards nativos (Asesor, Supervisor, Gerente) con m\xE9tricas calculadas sobre la BD de la plataforma, opcionalmente con QuickSight embebido. Dashboard BI avanzado sobre Snowflake/Redshift \u2192 Fase 2."
  }))));

  // Call Center: solo creación de leads
  if (rol === 'callcenter') return /*#__PURE__*/React.createElement(Screen, {
    path: "/dashboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Panel Call Center"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Solo puede registrar y asignar leads")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/new'),
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Registrar lead")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Leads registrados hoy"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, DEMO_LEADS.slice(0, 3).map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    className: "flex items-center justify-between border border-gray-100 rounded p-3 text-sm"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-gray-800"
  }, l.nombre), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Registrado: ", l.fecha)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5"
  }, "Pendiente asignar"))))), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Call Center: solo puede registrar y asignar leads. NO puede evaluar, ver procesos de venta ni generar expedientes."
  }));

  // Oficial PLAFT
  if (rol === 'oficial') return /*#__PURE__*/React.createElement(Screen, {
    path: "/dashboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Panel Oficial de Cumplimiento"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Casos PLAFT pendientes de revisi\xF3n")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-red-100 text-red-700 border border-red-200 rounded px-2 py-1 font-semibold"
  }, "3 casos pendientes")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/plaft/panel'),
    className: "w-full bg-gray-800 text-white py-2.5 rounded text-sm font-semibold hover:bg-gray-700 mb-4"
  }, "Ir al panel de cumplimiento \u2192"), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Oficial opera solo en horario L\u2013V 9:00\u201318:00. SLA orientativo: 20\u201360 min por caso."
  }));

  // Operaciones
  if (rol === 'operaciones') return /*#__PURE__*/React.createElement(Screen, {
    path: "/dashboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Panel Operaciones"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Expedientes recibidos para validaci\xF3n")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-gray-200 text-gray-700 rounded px-2 py-1 font-semibold"
  }, "4 expedientes")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/close/ops'),
    className: "w-full bg-gray-800 text-white py-2.5 rounded text-sm font-semibold hover:bg-gray-700 mb-4"
  }, "Ver expedientes pendientes \u2192"), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Operaciones valida: DNI vigente, estado civil, poderes de representaci\xF3n (PJ). Confirma en NewCon."
  }));

  // Analista de Créditos
  if (rol === 'admin_sistema') return /*#__PURE__*/React.createElement(Screen, {
    path: "/dashboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Panel Analista de Cr\xE9ditos"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Evaluaciones manuales PJ pendientes")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-gray-200 text-gray-700 rounded px-2 py-1 font-semibold"
  }, "2 casos PJ")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/eval/empresa'),
    className: "w-full bg-gray-800 text-white py-2.5 rounded text-sm font-semibold hover:bg-gray-700 mb-4"
  }, "Ver evaluaciones pendientes \u2192"), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Analista Cr\xE9ditos: solo eval\xFAa Persona Jur\xEDdica (RUC). NO usa Equifax \u2014 evaluaci\xF3n manual."
  }));

  // Asesor / Jefe de Ventas / Supervisor / Admin — dashboard de leads
  const esSupervisor = ['supervisor', 'jefe_ventas', 'admin'].includes(rol);
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/dashboard"
  }, /*#__PURE__*/React.createElement(React.Fragment, null,
    // NUEVO DISEÑO DASHBOARD ASESOR: 3 secciones
    // 1. Seguimiento y Tareas (Agente 2)
    rol === 'asesor' && !vacío && /*#__PURE__*/React.createElement(AgenteAsistente, {
      vendedorId: 'v1',
      onLeadClick: (lead) => {
        console.log('Ver lead:', lead);
        navigate('/lead/1');
      },
      className: "mb-6"
    }),
    
    // 2. Mi Desempeño (Dashboard personal)
    rol === 'asesor' && !vacío && /*#__PURE__*/React.createElement(MiDesempenio, {
      vendedorId: 'v1',
      className: "mb-6"
    }),
    
    // 2b. Acceso rápido a Mis Citas (NUEVO 05-AGO-2026)
    rol === 'asesor' && !vacío && /*#__PURE__*/React.createElement("div", {
      className: "mb-6 grid grid-cols-2 gap-3"
    },
      /*#__PURE__*/React.createElement("button", {
        onClick: () => navigate('/citas'),
        className: "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-md"
      }, 
        /*#__PURE__*/React.createElement("span", {
          className: "text-lg"
        }, "📅"),
        "Mis Citas"
      ),
      /*#__PURE__*/React.createElement("button", {
        onClick: () => navigate('/lead/list'),
        className: "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-3 rounded-lg text-sm font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all flex items-center justify-center gap-2 shadow-md"
      }, 
        /*#__PURE__*/React.createElement("span", {
          className: "text-lg"
        }, "📋"),
        "Gestión de Leads"
      )
    ),
    
    // Agente 4: Copiloto Ejecutivo para Supervisor
    rol === 'supervisor' && !vacío && /*#__PURE__*/React.createElement(AgenteCopilotoEjecutivo, {
      rol: 'supervisor',
      sucursalId: 's1',
      onDrillDown: (filtro) => {
        console.log('Aplicar filtro drill-down:', filtro);
        if (filtro.estado) setFiltroEstado(filtro.estado);
      },
      className: "mb-6"
    }),
    
    // Accesos rápidos para Supervisor (NUEVO 06-AGO-2026)
    rol === 'supervisor' && !vacío && /*#__PURE__*/React.createElement("div", {
      className: "mb-6 grid grid-cols-2 gap-3"
    },
      /*#__PURE__*/React.createElement("button", {
        onClick: () => navigate('/lead/list'),
        className: "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white py-3 rounded-lg text-sm font-semibold hover:from-cyan-700 hover:to-cyan-800 transition-all flex items-center justify-center gap-2 shadow-md"
      }, 
        /*#__PURE__*/React.createElement("span", {
          className: "text-lg"
        }, "📋"),
        "Gestión de Leads"
      ),
      /*#__PURE__*/React.createElement("button", {
        onClick: () => navigate('/citas'),
        className: "bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-md"
      }, 
        /*#__PURE__*/React.createElement("span", {
          className: "text-lg"
        }, "📅"),
        "Módulo de Citas"
      )
    ),
    
    // NUEVO (05-AGO-2026): Dashboard consolidado del supervisor
    rol === 'supervisor' && !vacío && /*#__PURE__*/React.createElement("div", {
      className: "card-maf mb-6"
    },
      // Header con botón de exportar
      React.createElement("div", {
        className: "card-maf-header"
      },
        React.createElement("div", {
          className: "flex items-center justify-between"
        },
          React.createElement("div", {
            className: "flex items-center gap-3"
          },
            React.createElement("span", {
              className: "text-2xl"
            }, "📊"),
            React.createElement("h3", {
              className: "font-bold text-base"
            }, "Métricas del Equipo - Surco")
          ),
          React.createElement("button", {
            onClick: () => {
              const reporte = generarReporteConsolidado('s1');
              console.log('Reporte generado:', reporte);
              // Simular descarga
              alert(`📄 Reporte consolidado generado\n\nSucursal: ${reporte.sucursal}\nFecha: ${reporte.fechaCorte}\n\n✓ ${reporte.reportePorVendedor.length} vendedores\n✓ ${reporte.alertas.length} alertas\n\n(En producción se descargaría como Excel/CSV)`);
            },
            className: "btn-maf secundario text-sm"
          }, "📥 Exportar Reporte Diario")
        )
      ),
      
      // Grid de métricas principales
      React.createElement("div", {
        className: "grid grid-cols-4 gap-4 mt-4"
      },
        // Ventas
        React.createElement("div", {
          className: "bg-blue-50 border border-blue-200 rounded-lg p-4"
        },
          React.createElement("div", {
            className: "flex items-center justify-between mb-2"
          },
            React.createElement("span", {
              className: "text-sm font-semibold text-blue-700"
            }, "🎯 Ventas"),
            React.createElement("span", {
              className: "text-xs font-bold text-blue-600"
            }, `${((VENDEDORES.reduce((sum, v) => sum + v.ventasMes, 0) / VENDEDORES.reduce((sum, v) => sum + v.metaMensual, 0)) * 100).toFixed(0)}%`)
          ),
          React.createElement("p", {
            className: "text-3xl font-bold text-blue-900"
          }, VENDEDORES.reduce((sum, v) => sum + v.ventasMes, 0)),
          React.createElement("p", {
            className: "text-xs text-blue-600 mt-1"
          }, `Meta: ${VENDEDORES.reduce((sum, v) => sum + v.metaMensual, 0)}`)
        ),
        
        // Citas
        React.createElement("div", {
          className: "bg-green-50 border border-green-200 rounded-lg p-4"
        },
          React.createElement("div", {
            className: "flex items-center justify-between mb-2"
          },
            React.createElement("span", {
              className: "text-sm font-semibold text-green-700"
            }, "📅 Citas"),
            React.createElement("span", {
              className: "text-xs font-bold text-green-600"
            }, `${((VENDEDORES.reduce((sum, v) => sum + v.citasGeneradas, 0) / VENDEDORES.reduce((sum, v) => sum + v.citasMeta, 0)) * 100).toFixed(0)}%`)
          ),
          React.createElement("p", {
            className: "text-3xl font-bold text-green-900"
          }, VENDEDORES.reduce((sum, v) => sum + v.citasGeneradas, 0)),
          React.createElement("p", {
            className: "text-xs text-green-600 mt-1"
          }, `Meta: ${VENDEDORES.reduce((sum, v) => sum + v.citasMeta, 0)}`)
        ),
        
        // Evaluaciones
        React.createElement("div", {
          className: "bg-purple-50 border border-purple-200 rounded-lg p-4"
        },
          React.createElement("div", {
            className: "flex items-center justify-between mb-2"
          },
            React.createElement("span", {
              className: "text-sm font-semibold text-purple-700"
            }, "🔍 Evaluaciones"),
            React.createElement("span", {
              className: "text-xs font-bold text-purple-600"
            }, `${((VENDEDORES.reduce((sum, v) => sum + v.evaluacionesEquifax, 0) / VENDEDORES.reduce((sum, v) => sum + v.evaluacionesMeta, 0)) * 100).toFixed(0)}%`)
          ),
          React.createElement("p", {
            className: "text-3xl font-bold text-purple-900"
          }, VENDEDORES.reduce((sum, v) => sum + v.evaluacionesEquifax, 0)),
          React.createElement("p", {
            className: "text-xs text-purple-600 mt-1"
          }, `Meta: ${VENDEDORES.reduce((sum, v) => sum + v.evaluacionesMeta, 0)}`)
        ),
        
        // Certificados + Ticket
        React.createElement("div", {
          className: "bg-amber-50 border border-amber-200 rounded-lg p-4"
        },
          React.createElement("div", {
            className: "flex items-center justify-between mb-2"
          },
            React.createElement("span", {
              className: "text-sm font-semibold text-amber-700"
            }, "📜 Certificados"),
            React.createElement("span", {
              className: "text-xs font-bold text-amber-600"
            }, `$${(VENDEDORES.reduce((sum, v) => sum + v.ticketPromedio, 0) / VENDEDORES.length).toFixed(0)}`)
          ),
          React.createElement("p", {
            className: "text-3xl font-bold text-amber-900"
          }, VENDEDORES.reduce((sum, v) => sum + v.certificadosEmitidos, 0)),
          React.createElement("p", {
            className: "text-xs text-amber-600 mt-1"
          }, "Ticket prom. equipo")
        )
      )
    ),
    
    /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, rol === 'supervisor' ? 'Leads de mi sucursal' : rol === 'jefe_ventas' ? 'Leads — Jefe de Ventas' : rol === 'admin' ? 'Todos los leads' : 'Mis leads'), esSupervisor && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Visibilidad: todos los leads de la sucursal")), ['asesor', 'jefe_ventas', 'admin'].includes(rol) && /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/new'),
    className: "hidden sm:block bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Nuevo Lead")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 mb-4 flex-wrap"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "sin leads (estado vac\xEDo)",
    value: vacío,
    onChange: setVacío
  })), vacío ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-12 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3"
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("h2", {
    className: "text-gray-700 font-semibold mb-1"
  }, "No hay leads registrados"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 mb-4"
  }, "Comienza creando tu primer lead prospecto."), ['asesor', 'jefe_ventas', 'admin'].includes(rol) && /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/new'),
    className: "bg-gray-800 text-white px-6 py-2 rounded text-sm hover:bg-gray-700"
  }, "Crear primer lead")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3"
  }, /*#__PURE__*/React.createElement("select", {
    value: filtroEstado,
    onChange: e => setFiltroEstado(e.target.value),
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 bg-white"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Estado: Todos"), ['Nuevo', 'En evaluación', 'Calificado', 'Rechazado', 'CERRADO', 'Pendiente acción'].map(e => /*#__PURE__*/React.createElement("option", {
    key: e
  }, e))), /*#__PURE__*/React.createElement("input", {
    value: busqueda,
    onChange: e => setBusqueda(e.target.value),
    placeholder: "\uD83D\uDD0D Buscar por nombre o DNI...",
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 flex-1 min-w-40"
  }), esSupervisor && /*#__PURE__*/React.createElement("select", {
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 bg-white"
  }, /*#__PURE__*/React.createElement("option", null, "Todos los asesores"), /*#__PURE__*/React.createElement("option", null, "M. L\xF3pez"), /*#__PURE__*/React.createElement("option", null, "J. Garc\xEDa"), /*#__PURE__*/React.createElement("option", null, "C. Reyes")))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("tr", null, ['Nombre', 'Fuente SGC', 'Estado', 'Fecha registro', esSupervisor ? 'Asesor' : 'Último contacto', 'Acción'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "text-left text-xs font-semibold text-gray-500 px-4 py-3"
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, filtrados.map((l, i) => /*#__PURE__*/React.createElement("tr", {
    key: l.id,
    className: `border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 font-medium text-gray-900"
  }, l.nombre), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xs px-2 py-0.5 rounded ${fuenBadge[l.fuente] || 'bg-gray-100'}`
  }, l.fuente)), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: l.estado
  })), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-gray-500 text-xs"
  }, l.fecha), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-gray-500 text-xs"
  }, esSupervisor ? 'M. López' : l.contacto), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    className: "text-xs text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "Ver \u2192"))))))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500"
  }, /*#__PURE__*/React.createElement("span", null, "Mostrando ", filtrados.length, " leads"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, ['<', '1', '2', '3', '>'].map(p => /*#__PURE__*/React.createElement("button", {
    key: p,
    className: `px-2 py-1 rounded border ${p === '1' ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 hover:bg-gray-50'}`
  }, p)))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/new'),
    className: "fixed bottom-6 right-6 sm:hidden bg-gray-800 text-white w-12 h-12 rounded-full shadow-lg text-xl flex items-center justify-center"
  }, "+"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RF-018: Asesor ve SOLO sus propios leads. Supervisor/Jefe Ventas ven toda la sucursal. Gerente ve su zona."
  }), esSupervisor && /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Supervisor puede reasignar leads manualmente en cualquier momento (RN-025)."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════

// P-GL — GESTIÓN DE LEADS — v5 (Con Agente 3: Priorización de Cartera)
function PGLGestionLeads() {
  const {
    navigate,
    demoState
  } = React.useContext(AppContext);
  const rol = demoState.currentRole;
  const esSup = ['supervisor', 'jefe_ventas'].includes(rol);
  const [filtro, setFiltro] = React.useState('');
  const [filtroDealer, setFiltroDealer] = React.useState('');
  const [tab, setTab] = React.useState('lista');
  const [leadsPriorizados, setLeadsPriorizados] = React.useState(null);
  
  const LEADS = [{
    id: 1001,
    nombre: 'Carlos Mendoza',
    fuente: 'Base Toyota',
    dealer: 'ToyotaSur - Surco',
    estado: 'En seguimiento',
    asesor: 'M. López',
    intentos: 3,
    hot: true
  }, {
    id: 1002,
    nombre: 'Ana Torres',
    fuente: 'Landing',
    dealer: null,
    estado: 'Nuevo',
    asesor: 'M. López',
    intentos: 0,
    hot: true
  }, {
    id: 1003,
    nombre: 'Roberto Ríos',
    fuente: 'Call Center',
    dealer: 'Autospar San Juan de Lurigancho',
    estado: 'No contactado',
    asesor: 'R. García',
    intentos: 2,
    hot: false
  }, {
    id: 1004,
    nombre: 'María Ruiz',
    fuente: 'In situ',
    dealer: 'Motored - San Miguel',
    estado: 'En seguimiento',
    asesor: 'M. López',
    intentos: 1,
    hot: false
  }, {
    id: 1005,
    nombre: 'Luis Castro',
    fuente: 'Toyota',
    dealer: 'ToyotaSur - Surco',
    estado: 'Descartado',
    asesor: 'M. López',
    intentos: 4,
    hot: false
  }, {
    id: 1006,
    nombre: 'Carla Díaz',
    fuente: 'Landing',
    dealer: null,
    estado: 'Cerrado',
    asesor: 'M. López',
    intentos: 2,
    hot: false
  }];
  const BADGE = {
    'Nuevo': 'bg-gray-100 text-gray-600',
    'Contactado': 'bg-blue-100 text-blue-700',
    'No contactado': 'bg-amber-100 text-amber-700',
    'No contactado - Tel. incorrecto': 'bg-amber-200 text-amber-800',
    'No contactado - No contesta': 'bg-amber-200 text-amber-800',
    'En seguimiento': 'bg-green-100 text-green-700',
    'Descartado': 'bg-red-100 text-red-700',
    'Cerrado': 'bg-gray-800 text-white'
  };
  const ESTADOS = ['Nuevo', 'Contactado', 'No contactado', 'En seguimiento', 'Descartado', 'Cerrado'];
  const ESTADOS_MACRO_CC = ['Contactado', 'No contactado']; // 🟡 Estados macro Call Center con sub-estados
  
  // Usar leads priorizados si están disponibles, sino los originales
  const leadsAMostrar = leadsPriorizados || LEADS;
  let leads = leadsAMostrar;
  if (filtro) leads = leads.filter(l => l.estado === filtro);
  if (filtroDealer) leads = leads.filter(l => l.dealer === filtroDealer);
  
  // Obtener lista única de dealers para el selector
  const dealersUnicos = [...new Set(LEADS.map(l => l.dealer).filter(Boolean))].sort();
  
  // Callback para recibir leads priorizados del agente
  const handleLeadsPriorizados = React.useCallback((leadsPriorizadosNuevos) => {
    setLeadsPriorizados(leadsPriorizadosNuevos);
  }, []); // Sin dependencias - setLeadsPriorizados es estable
  
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/lead/list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, esSup ? 'Gestión de Leads — Sucursal' : 'Mis Leads'), esSup && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "5 asesores \xB7 Autospar San Juan de Lurigancho")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/new'),
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Nuevo lead")), 
  
  // 🎯 AGENTE 3: PRIORIZACIÓN DE CARTERA
  !esSup && /*#__PURE__*/React.createElement(AgentePriorizacion, {
    vendedorId: "v1",
    leadsOriginales: LEADS,
    onReordenar: handleLeadsPriorizados,
    className: "mb-6"
  }),
  
  /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-gray-200 mb-5"
  }, ['lista', 'funnel'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    className: 'px-5 py-2 text-sm border-b-2 ' + (tab === t ? 'border-gray-800 text-gray-800 font-semibold' : 'border-transparent text-gray-500')
  }, t === 'lista' ? 'Lista de leads' : 'Vista funnel'))), /*#__PURE__*/React.createElement("div", {
    className: "bg-blue-50 border border-blue-200 rounded p-3 mb-4 text-xs text-blue-800"
  }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDFE1 Estados Macro Call Center (18/06):"), " El sistema implementa 2 estados macro para Call Center:", /*#__PURE__*/React.createElement("ul", {
    className: "list-disc ml-4 mt-1 space-y-0.5"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "CONTACTADO"), " (macro) despliega: En seguimiento | Descartado | Venta en tr\xE1mite | Venta cerrada"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "NO CONTACTADO"), " (macro) despliega: Tel\xE9fono incorrecto | No contesta")), /*#__PURE__*/React.createElement("p", {
    className: "mt-2"
  }, "Al hacer click en \"Contactado\" o \"No contactado\" se despliegan los sub-estados disponibles para clasificaci\xF3n granular.")), tab === 'lista' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4 items-center"
  }, /*#__PURE__*/React.createElement("select", {
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 bg-white",
    value: filtro,
    onChange: e => setFiltro(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Todos los estados"), ESTADOS.map(e => /*#__PURE__*/React.createElement("option", {
    key: e,
    value: e
  }, e))), /*#__PURE__*/React.createElement("select", {
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 bg-white",
    value: filtroDealer,
    onChange: e => setFiltroDealer(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Todos los dealers"), dealersUnicos.map(d => /*#__PURE__*/React.createElement("option", {
    key: d,
    value: d
  }, d))), esSup && /*#__PURE__*/React.createElement("select", {
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 bg-white"
  }, /*#__PURE__*/React.createElement("option", null, "Todos los asesores"), /*#__PURE__*/React.createElement("option", null, "M. L\xF3pez"), /*#__PURE__*/React.createElement("option", null, "R. Garc\xEDa")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 ml-auto"
  }, leads.length, " leads"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      alert(`📥 Exportando ${leads.length} leads a Excel...\n\nFiltros aplicados:\n- Estado: ${filtro || 'Todos'}\n- Dealer: ${filtroDealer || 'Todos'}\n\n(En producción se descargaría como archivo CSV/Excel)`);
    },
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 font-medium flex items-center gap-2"
  }, "📥 Exportar")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded overflow-hidden shadow-sm"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "bg-gray-50 border-b border-gray-200"
  }, (!esSup ? ['#', 'Cliente', 'Fuente', 'Estado', 'Score', 'Temp', 'Intentos', ''] : ['Cliente', 'Fuente', 'Estado', 'Asesor', '']).map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "text-left px-3 py-2.5 text-xs font-semibold text-gray-500"
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, leads.map((l, idx) => /*#__PURE__*/React.createElement("tr", {
    key: l.id,
    className: "border-b border-gray-100 hover:bg-gray-50"
  }, !esSup && /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs font-bold text-gray-400"
  }, "#", idx + 1), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-900"
  }, l.nombre), l.hot && /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700"
  }, "\uD83D\uDD25 Hot"))), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-500"
  }, l.fuente), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'text-xs font-medium px-2 py-0.5 rounded-full ' + (BADGE[l.estado] || 'bg-gray-100 text-gray-700')
  }, l.estado)), !esSup && l.score !== undefined && /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs font-bold text-gray-700"
  }, l.score), !esSup && l.temperatura && /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-lg"
  }, l.temperatura === 'caliente' ? '🟢' : l.temperatura === 'tibio' ? '🟡' : '🔴'), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-500"
  }, esSup ? l.asesor : l.intentos), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 text-gray-600"
  }, "Ver")))))))), tab === 'funnel' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded p-5 shadow-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-4"
  }, "Funnel de conversi\xF3n"), [{
    e: 'Nuevo',
    n: 24,
    w: '100%',
    c: 'bg-gray-200'
  }, {
    e: 'Contactado',
    n: 18,
    w: '75%',
    c: 'bg-blue-200'
  }, {
    e: 'En seguimiento',
    n: 11,
    w: '46%',
    c: 'bg-green-200'
  }, {
    e: 'Cerrado',
    n: 2,
    w: '8%',
    c: 'bg-gray-800'
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.e,
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-xs mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-700"
  }, f.e), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, f.n, " leads")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-100 rounded-full h-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: f.c + ' h-5 rounded-full',
    style: {
      width: f.w
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3 mt-4 text-center"
  }, [['1:20', 'Efectividad'], ['8.3%', 'Tasa cierre'], ['59', 'Leads mes']].map(x => /*#__PURE__*/React.createElement("div", {
    key: x[1],
    className: "bg-gray-50 border border-gray-200 rounded p-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-gray-900"
  }, x[0]), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, x[1])))))));
}

// ═══════════════════════════════════════════════════════════════════════════
// 🟡 ACTUALIZADO 18/06 — P-GL-CC MÓDULO CALL CENTER: Multi-Usuario + Carga Masiva + Dashboard
// ═══════════════════════════════════════════════════════════════════════════
function PGLCallCenter() {
  // 🟡 CAMBIOS 12, 17 y 18/06/2026: Multi-usuario, carga masiva CSV, dashboard específico, trazabilidad cruzada
  const {
    navigate,
    demoState
  } = React.useContext(AppContext);
  const [filtroEstado, setFiltroEstado] = React.useState('');
  const [leadSeleccionado, setLeadSeleccionado] = React.useState(null);
  const [notaNueva, setNotaNueva] = React.useState('');
  const [vistaActual, setVistaActual] = React.useState('tracking'); // 'tracking', 'carga', 'dashboard'

  // 🟡 NUEVO 18/06: Estados específicos del tracking Call Center (2 macros con sub-estados)
  const ESTADOS_CC = ['Contactado en seguimiento', 'Descartado', 'Venta en trámite', 'Venta cerrada', 'No contactado - Tel. incorrecto', 'No contactado - No contesta'];
  const BADGE_CC = {
    'Contactado en seguimiento': 'bg-blue-100 text-blue-700',
    'Descartado': 'bg-red-100 text-red-700',
    'Venta en trámite': 'bg-yellow-100 text-yellow-700',
    'Venta cerrada': 'bg-green-100 text-green-700',
    'No contactado - Tel. incorrecto': 'bg-amber-200 text-amber-800',
    'No contactado - No contesta': 'bg-amber-100 text-amber-600'
  };
  const LEADS_CC = [{
    id: 2001,
    nombre: 'Pedro Sánchez',
    telefono: '987654321',
    fuente: 'Call Center',
    estado: 'Contactado en seguimiento',
    asesorAsignado: 'M. López',
    fechaDerivacion: '15/06/2026',
    notas: [{
      id: 1,
      fecha: '15/06/2026 10:30',
      usuario: 'L. Torres (CC)',
      texto: 'Cliente interesado en certificado de 20K. Mencionó que ya tiene el auto separado en Autospar SJL.'
    }, {
      id: 2,
      fecha: '15/06/2026 11:15',
      usuario: 'M. López (Asesor)',
      texto: 'Contacté al cliente. Confirmó interés. Agendamos cita para mañana 16/06 a las 3pm.'
    }]
  }, {
    id: 2002,
    nombre: 'Ana Gutiérrez',
    telefono: '912345678',
    fuente: 'Call Center',
    estado: 'No contactado - No contesta',
    asesorAsignado: 'R. García',
    fechaDerivacion: '14/06/2026',
    notas: [{
      id: 3,
      fecha: '14/06/2026 09:00',
      usuario: 'J. Mora (CC)',
      texto: 'Intento 1: No contesta. Buzón de voz desactivado.'
    }, {
      id: 4,
      fecha: '14/06/2026 14:30',
      usuario: 'J. Mora (CC)',
      texto: 'Intento 2: No contesta. Reintentaré mañana en horario matutino.'
    }, {
      id: 5,
      fecha: '15/06/2026 10:00',
      usuario: 'J. Mora (CC)',
      texto: 'Intento 3: No contesta. Derivado a asesor para seguimiento.'
    }]
  }, {
    id: 2003,
    nombre: 'Carlos Vega',
    telefono: 'Invalid',
    fuente: 'Call Center',
    estado: 'No contactado - Tel. incorrecto',
    asesorAsignado: '-',
    fechaDerivacion: '13/06/2026',
    notas: [{
      id: 6,
      fecha: '13/06/2026 11:45',
      usuario: 'P. Silva (CC)',
      texto: 'Número inválido. Sonido fuera de servicio. Lead descartado por teléfono incorrecto.'
    }]
  }, {
    id: 2004,
    nombre: 'Rosa Martínez',
    telefono: '998877665',
    fuente: 'Call Center',
    estado: 'Venta en trámite',
    asesorAsignado: 'M. López',
    fechaDerivacion: '10/06/2026',
    notas: [{
      id: 7,
      fecha: '10/06/2026 15:20',
      usuario: 'L. Torres (CC)',
      texto: 'Cliente muy interesada. Ya revisó los documentos y quiere avanzar rápido.'
    }, {
      id: 8,
      fecha: '11/06/2026 09:30',
      usuario: 'M. López (Asesor)',
      texto: 'Evaluación de riesgo OK. Cliente pasó a selección de grupo.'
    }]
  }];
  const leadsFiltered = filtroEstado ? LEADS_CC.filter(l => l.estado === filtroEstado) : LEADS_CC;
  const agregarNota = () => {
    if (!notaNueva.trim()) return;
    alert(`Nota agregada: "${notaNueva}"`);
    setNotaNueva('');
  };
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/lead/callcenter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "\uD83D\uDFE1 Call Center \u2014 Tracking de Derivaciones"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-0.5"
  }, "M\xF3dulo de seguimiento espec\xEDfico para operadores de Call Center con registro obligatorio de notas")), /*#__PURE__*/React.createElement("div", {
    className: "note bg-blue-50 border-l-4 border-blue-400 mb-4 text-xs text-blue-800"
  }, /*#__PURE__*/React.createElement("strong", null, "RF-GL-CC-01:"), " El m\xF3dulo de Call Center extiende la m\xE1quina de estados general con estados espec\xEDficos de gesti\xF3n comercial. Cada lead cuenta con un ", /*#__PURE__*/React.createElement("strong", null, "m\xF3dulo de notas obligatorio"), " para registrar observaciones, intentos de contacto y contexto."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4 items-center"
  }, /*#__PURE__*/React.createElement("select", {
    className: "text-sm border border-gray-300 rounded px-3 py-1.5 bg-white",
    value: filtroEstado,
    onChange: e => setFiltroEstado(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Todos los estados"), ESTADOS_CC.map(e => /*#__PURE__*/React.createElement("option", {
    key: e,
    value: e
  }, e))), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 ml-auto"
  }, leadsFiltered.length, " leads derivados")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded overflow-hidden shadow-sm mb-4"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "bg-gray-50 border-b border-gray-200"
  }, ['Cliente', 'Teléfono', 'Estado', 'Asesor Asignado', 'Fecha Derivación', 'Notas', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "text-left px-3 py-2.5 text-xs font-semibold text-gray-500"
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, leadsFiltered.map(l => /*#__PURE__*/React.createElement("tr", {
    key: l.id,
    className: "border-b border-gray-100 hover:bg-gray-50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 font-medium text-gray-900"
  }, l.nombre), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-500 font-mono"
  }, l.telefono), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'text-xs font-medium px-2 py-0.5 rounded-full ' + (BADGE_CC[l.estado] || 'bg-gray-100 text-gray-700')
  }, l.estado)), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-500"
  }, l.asesorAsignado), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-400"
  }, l.fechaDerivacion), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-500"
  }, l.notas.length, " nota", l.notas.length !== 1 ? 's' : ''), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setLeadSeleccionado(l),
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 text-gray-600"
  }, "Ver notas"))))))), leadSeleccionado && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center",
    style: {
      background: 'rgba(0,0,0,0.3)'
    },
    onClick: () => setLeadSeleccionado(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white max-w-2xl w-full mx-4 rounded shadow-lg border border-gray-200",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-b border-gray-200 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold text-gray-900"
  }, leadSeleccionado.nombre), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "Tel\xE9fono: ", leadSeleccionado.telefono, " \xB7 Estado: ", leadSeleccionado.estado)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setLeadSeleccionado(null),
    className: "text-gray-400 hover:text-gray-700 text-xl"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 max-h-96 overflow-y-auto"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "\uD83D\uDFE1 M\xF3dulo de notas (obligatorio)"), leadSeleccionado.notas.map(nota => /*#__PURE__*/React.createElement("div", {
    key: nota.id,
    className: "mb-3 p-3 bg-gray-50 border border-gray-200 rounded"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-gray-700"
  }, nota.usuario), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400"
  }, nota.fecha)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, nota.texto))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Agregar nueva nota"), /*#__PURE__*/React.createElement("textarea", {
    value: notaNueva,
    onChange: e => setNotaNueva(e.target.value),
    placeholder: "Registra el resultado del intento de contacto, observaciones o contexto relevante...",
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-gray-500 mb-2",
    rows: "3"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: agregarNota,
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Guardar nota"))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 RF-GL-CC-01: Estados espec\xEDficos Call Center \u2014 Contactado en seguimiento, Descartado, Venta en tr\xE1mite, Venta cerrada, No contactado (Tel. incorrecto / No contesta)"
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 M\xF3dulo de notas OBLIGATORIO: Cada lead derivado desde Call Center debe tener al menos una nota registrada por el operador con contexto de la interacci\xF3n."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Las notas son visibles para el asesor asignado y el supervisor. Timestamp y usuario se guardan autom\xE1ticamente."
  }))));
}

// P07 — CREAR LEAD — v4 (concesionario predeterminado + campo dealer)
function P07CreateLead() {
  const {
    navigate
  } = React.useContext(AppContext);
  const [docType, setDocType] = React.useState('DNI');
  const [docNum, setDocNum] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [reniecData, setReniecData] = React.useState(null);
  const [fuente, setFuente] = React.useState('');
  const [asDealer, setAsDealer] = React.useState('');
  const [sucursal, setSucursal] = React.useState('');
  const [modelo, setModelo] = React.useState('');
  const [color, setColor] = React.useState('');

  // Datos maestros del backoffice
  const MODELOS = ['Corolla', 'Hilux', 'RAV4', 'Yaris', 'Fortuner', 'Land Cruiser', 'Camry', 'Prius', 'CH-R', 'Hiace'];
  const COLORES = ['Blanco Perla', 'Negro Mica', 'Plata Metálico', 'Gris Oscuro', 'Rojo Mica', 'Azul Metálico', 'Bronce Metálico', 'Verde Oscuro'];
  const SUCS = ['SJL', 'Miraflores', 'San Isidro', 'La Molina', 'Surco', 'San Borja', 'Lince', 'Callao', 'Los Olivos', 'Ate', 'Independencia'];
  const PLACEHOLDERS = {
    'DNI': '12345678',
    'Carnet Ext.': '001234567',
    'Pasaporte': 'AC123456',
    'RUC': '20123456789'
  };
  function handleDoc(v) {
    setDocNum(v);
    if (docType === 'DNI' && v.length === 8) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setReniecData({
          nombres: 'Carlos Alberto',
          apPat: 'Mendoza',
          apMat: 'Ríos'
        });
      }, 1800);
    }
  }
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/lead/new"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-5"
  }, "Crear Lead"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Concesionario y sucursal"), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-gray-700"
  }, "Concesionario"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 bg-white border border-gray-200 rounded px-2 py-0.5"
  }, "Predeterminado")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-gray-900"
  }, "Autospar")), /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Sucursal ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
    value: sucursal,
    onChange: e => setSucursal(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar sucursal..."), SUCS.map(s => /*#__PURE__*/React.createElement("option", {
    key: s
  }, "Autospar ", s)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Documento del cliente"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 mb-3 bg-gray-100 p-1 rounded"
  }, ['DNI', 'Carnet Ext.', 'Pasaporte', 'RUC'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => {
      setDocType(t);
      setDocNum('');
      setReniecData(null);
    },
    className: 'flex-1 text-xs py-1.5 rounded ' + (docType === t ? 'bg-white border border-gray-300 font-semibold shadow-sm' : 'text-gray-500')
  }, t))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: PLACEHOLDERS[docType] || '',
    value: docNum,
    onChange: e => handleDoc(e.target.value),
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500"
  }), (docType === 'Carnet Ext.' || docType === 'Pasaporte') && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-amber-600 mt-1"
  }, "Validaci\xF3n sujeta al proveedor de documentos de extranjeros definido por MAF."), loading && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs text-gray-400 mt-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"
  }), /*#__PURE__*/React.createElement("span", null, "Consultando proveedor de identidad...")), reniecData && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 p-3 bg-gray-50 border border-gray-200 rounded text-xs"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-600 mb-1"
  }, "\u2713 Datos obtenidos"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-700"
  }, reniecData.nombres, " ", reniecData.apPat, " ", reniecData.apMat))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Datos de contacto"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-600 mb-3 bg-blue-50 px-3 py-2 rounded"
  }, "Solo correo es obligatorio. Tel\xE9fono y direcci\xF3n son opcionales en esta etapa."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Correo electr\xF3nico ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "cliente@correo.com",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Tel\xE9fono celular"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    placeholder: "9XXXXXXXX",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Fuente del lead ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
    value: fuente,
    onChange: e => setFuente(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar fuente..."), ['Base Toyota / CSV', 'Landing Page / Digital', 'Call Center', 'Derivado Dealer', 'In situ / Cartera propia'].map(f => /*#__PURE__*/React.createElement("option", {
    key: f
  }, f)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Modelo de auto de inter\xE9s"), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
    value: modelo,
    onChange: e => setModelo(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar modelo..."), MODELOS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Color preferido"), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
    value: color,
    onChange: e => setColor(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar color..."), COLORES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))))), (fuente === 'Derivado Dealer' || fuente === 'Base Toyota / CSV') && /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-amber-50 border border-amber-200 rounded"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Asesor de ventas del dealer ", fuente === 'Derivado Dealer' && /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nombre del asesor del concesionario",
    value: asDealer,
    onChange: e => setAsDealer(e.target.value),
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, fuente === 'Base Toyota / CSV' ? 'Viene en el archivo CSV — completar si está disponible.' : 'Obligatorio para trazabilidad de comisiones.')), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/list'),
    className: "flex-1 border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    className: "flex-1 bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Guardar lead")))));
}

// P08 — FICHA DE LEAD
// ═══════════════════════════════════════════════════════════════════════════
function P08LeadDetail() {
  const {
    navigate
  } = useContext(AppContext);
  const [tab, setTab] = useState('datos');
  const [nota, setNota] = useState('Llamó para consultar sobre plazos de pago. Interesado en grupo de USD 20,000.');
  const [editando, setEditando] = useState(false);
  const [estadoMacro, setEstadoMacro] = useState('');
  const [subestado, setSubestado] = useState('En seguimiento');
  const ESTADOS_BASE = ['Nuevo', 'Contactado', 'No contactado'];
  const SUBESTADOS_CONTACTADO = ['En seguimiento', 'Descartado', 'Venta en trámite', 'Venta cerrada'];
  const SUBESTADOS_NO_CONTACTADO = ['Teléfono incorrecto', 'No contesta'];
  const handleEstadoChange = e => {
    const valor = e.target.value;
    if (valor === 'Contactado' || valor === 'No contactado') {
      setEstadoMacro(valor);
      setSubestado('');
    } else {
      setEstadoMacro('');
      setSubestado(valor);
    }
  };
  const historial = [{
    ts: '12/03/2026 10:30',
    user: 'M. López (Asesor)',
    evento: 'Estado cambiado: Nuevo → Contactado'
  }, {
    ts: '12/03/2026 09:15',
    user: 'Sistema',
    evento: 'Lead creado desde fuente Call Center'
  }, {
    ts: '11/03/2026 16:00',
    user: 'M. López (Asesor)',
    evento: 'Nota agregada: Primer contacto telefónico'
  }, {
    ts: '11/03/2026 14:30',
    user: 'Sistema',
    evento: 'Validación de identidad exitosa (DNI 45678901)'
  }];
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/lead/1",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Carlos Alberto Mendoza R\xEDos"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-1"
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    status: "En evaluaci\xF3n"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "Fuente: Call Center"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "\u2022"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-500"
  }, "DNI 45678901"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/eval/identity'),
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "Iniciar evaluaci\xF3n \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-gray-200"
  }, ['datos', 'evaluaciones', 'documentos', 'historial'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    className: `flex-1 text-xs py-3 font-medium capitalize ${tab === t ? 'bg-white border-b-2 border-gray-800 text-gray-900' : 'bg-gray-50 text-gray-500 hover:text-gray-700'}`
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "p-4"
  }, tab === 'datos' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-x-6 gap-y-2 text-sm"
  }, [['Nombres', 'Carlos Alberto'], ['Ap. Paterno', 'Mendoza'], ['Ap. Materno', 'Ríos'], ['DNI', '45678901'], ['Teléfono', '987654321'], ['Correo', 'carlos.m@gmail.com'], ['Dirección', 'Av. Arequipa 2345, Miraflores'], ['Estado civil', 'Soltero'], ['Fecha registro', '12/03/2026'], ['Modelo de interés', 'Toyota Corolla 2026'], ['Color', 'Blanco Perla'], ['Asesor dealer', 'J. Ramírez (Autospar SJL)']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-gray-800"
  }, v))), /*#__PURE__*/React.createElement("div", {
    className: "col-span-2 mt-2"
  }, editando ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditando(false),
    className: "text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "\u2713 Guardar cambios") : /*#__PURE__*/React.createElement("button", {
    onClick: () => setEditando(true),
    className: "text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "\u270F Editar datos"))), tab === 'evaluaciones' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, [{
    t: 'Evaluación PLAFT — Inspektor',
    st: 'Pendiente',
    d: 'Se ejecuta primero, de forma automática'
  }, {
    t: 'Evaluación Equifax',
    st: 'Pendiente',
    d: 'Solo si PLAFT aprueba'
  }].map(e => /*#__PURE__*/React.createElement("div", {
    key: e.t,
    className: "border border-gray-200 rounded p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-700"
  }, e.t), /*#__PURE__*/React.createElement(StatusBadge, {
    status: e.st === 'Pendiente' ? 'Nuevo' : e.st
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, e.d))), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RN-001: PLAFT siempre precede a Equifax. El asesor ve solo el resultado unificado: Aprobado / Rechazado / En revisi\xF3n. Nunca se expone qu\xE9 evaluaci\xF3n origin\xF3 el rechazo."
  })), tab === 'documentos' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, [{
    name: 'DNI_anverso.jpg',
    size: '2.3 MB',
    tipo: 'Identidad'
  }, {
    name: 'Proforma_GrupoA.pdf',
    size: '156 KB',
    tipo: 'Proforma'
  }, {
    name: 'Contrato_FC2026.pdf',
    size: '312 KB',
    tipo: 'Contrato'
  }].map(doc => /*#__PURE__*/React.createElement("div", {
    key: doc.name,
    className: "flex items-center justify-between border border-gray-200 rounded p-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-gray-700"
  }, "\uD83D\uDCC4 ", doc.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, doc.tipo, " \xB7 ", doc.size)), /*#__PURE__*/React.createElement("button", {
    className: "text-xs text-gray-500 border border-gray-200 rounded px-2 py-1 hover:bg-gray-50"
  }, "\u2B07 Descargar")))), tab === 'historial' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-0"
  }, historial.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 rounded-full bg-gray-400 mt-1.5 flex-shrink-0"
  }), i < historial.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: "w-0.5 flex-1 bg-gray-200 my-1"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, h.ts, " \xB7 ", h.user), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700"
  }, h.evento)))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold text-gray-700 mb-3"
  }, "\uD83D\uDFE1 Estado del lead (con estados macro)"), /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Estado principal"), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white mb-3",
    value: estadoMacro || subestado,
    onChange: handleEstadoChange
  }, ESTADOS_BASE.map(e => /*#__PURE__*/React.createElement("option", {
    key: e,
    value: e
  }, e))), estadoMacro === 'Contactado' && /*#__PURE__*/React.createElement("div", {
    className: "mb-3 p-3 bg-blue-50 border border-blue-200 rounded"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-blue-900 mb-1"
  }, "\u21B3 Sub-estado de Contactado ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-blue-300 rounded px-3 py-2 bg-white",
    value: subestado,
    onChange: e => setSubestado(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Seleccionar sub-estado \u2014"), SUBESTADOS_CONTACTADO.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-700 mt-1"
  }, "4 opciones: En seguimiento | Descartado | Venta en tr\xE1mite | Venta cerrada"), 
  
  // Campo de fecha de cita (NUEVO 05-AGO-2026)
  /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-blue-200"
  },
    /*#__PURE__*/React.createElement("label", {
      className: "block text-xs font-semibold text-blue-900 mb-1"
    }, "\uD83D\uDCC5 Fecha y hora de cita"),
    /*#__PURE__*/React.createElement("input", {
      type: "datetime-local",
      className: "w-full text-sm border border-blue-300 rounded px-3 py-2 bg-white",
      placeholder: "Fecha de la cita"
    }),
    /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-blue-600 mt-1"
    }, "Si agendaste una cita, registra fecha y hora aqu\xED")
  )), 
  
  estadoMacro === 'No contactado' && /*#__PURE__*/React.createElement("div", {
    className: "mb-3 p-3 bg-amber-50 border border-amber-200 rounded"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-amber-900 mb-1"
  }, "\u21B3 Sub-estado de No contactado ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-amber-300 rounded px-3 py-2 bg-white",
    value: subestado,
    onChange: e => setSubestado(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Seleccionar sub-estado \u2014"), SUBESTADOS_NO_CONTACTADO.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-amber-700 mt-1"
  }, "2 opciones: Tel\xE9fono incorrecto | No contesta")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mb-1"
  }, "Raz\xF3n de descarte (obligatorio si Descartado)"), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-gray-500"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Seleccionar raz\xF3n \u2014"), /*#__PURE__*/React.createElement("option", null, "N\xFAmero err\xF3neo"), /*#__PURE__*/React.createElement("option", null, "No interesado"), /*#__PURE__*/React.createElement("option", null, "Solicit\xF3 no ser contactado"), /*#__PURE__*/React.createElement("option", null, "Fuera de perfil"))), /*#__PURE__*/React.createElement("button", {
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700 mb-3"
  }, "Guardar estado"), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800 mb-3"
  }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDFE1 L\xF3gica 18/06:"), " Al seleccionar \"Contactado\" o \"No contactado\" aparece un segundo dropdown con los sub-estados espec\xEDficos. El estado \"Nuevo\" no despliega sub-estados."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500"
  }, "Cerrado \u2014 asignaci\xF3n autom\xE1tica"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "El sistema lo asigna al recibir N\xB0 de contrato desde NewCon."))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold text-gray-700 mb-3"
  }, "Siguiente paso"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-3"
  }, "El lead est\xE1 listo para evaluaci\xF3n crediticia."), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/eval/identity'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Iniciar evaluaci\xF3n crediticia \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold text-gray-700 mb-2"
  }, "Notas del asesor"), /*#__PURE__*/React.createElement("textarea", {
    value: nota,
    onChange: e => setNota(e.target.value),
    className: "w-full border border-gray-200 rounded p-2 text-sm text-gray-700 resize-none",
    rows: 4,
    placeholder: "Escribe una nota..."
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "\u2713 Guardado autom\xE1ticamente")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold text-gray-700 mb-3"
  }, "Contacto"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700 mb-1"
  }, "\uD83D\uDCF1 987 654 321"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700 mb-3"
  }, "\u2709 carlos.m@gmail.com"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "flex-1 border border-gray-300 rounded py-1.5 text-xs text-gray-600 hover:bg-gray-50"
  }, "\uD83D\uDCDE Llamar"), /*#__PURE__*/React.createElement("button", {
    className: "flex-1 border border-gray-300 rounded py-1.5 text-xs text-gray-600 hover:bg-gray-50"
  }, "\u2709 Correo")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Historial de estados: append-only, no editable. Toda acci\xF3n queda registrada con usuario y timestamp."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Bot\xF3n acci\xF3n contextual: din\xE1mico seg\xFAn estado actual del lead y paso del pipeline."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Modelo de inter\xE9s y Asesor dealer: campos visibles desde la ficha del lead para que el asesor FC tenga contexto completo al realizar el primer contacto. Son prerequisito para cambiar estado a Contactado."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// P09 — VALIDACIÓN DE IDENTIDAD
// ═══════════════════════════════════════════════════════════════════════════
function P09Identity() {
  const {
    navigate
  } = useContext(AppContext);
  const [docType, setDocType] = useState('DNI');
  const [docNum, setDocNum] = useState('');
  const [estado, setEstado] = useState('idle'); // idle | loading | success | error
  const [apiError, setApiError] = useState(false);
  const consultar = () => {
    setEstado('loading');
    setTimeout(() => setEstado('success'), 2000);
  };
  const isEmpresa = docType === 'RUC';
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/eval/identity",
    pipeline: 1
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P09 \u2014 Verificaci\xF3n de Identidad"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 mb-4 bg-gray-100 p-1 rounded"
  }, ['DNI', 'CE', 'Pasaporte', 'RUC'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => {
      setDocType(t);
      setEstado('idle');
    },
    className: `flex-1 text-xs py-1.5 rounded ${docType === t ? 'bg-white border border-gray-300 font-semibold shadow-sm' : 'text-gray-500'}`
  }, t))), /*#__PURE__*/React.createElement(FormField, {
    label: `N° ${docType}`,
    required: true,
    placeholder: docType === 'DNI' ? '12345678' : docType === 'RUC' ? '20123456789' : 'Número de documento',
    value: docNum,
    onChange: e => setDocNum(e.target.value)
  }), (docType === 'CE' || docType === 'Pasaporte') && /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Tel\xE9fono con indicativo de pa\xEDs"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "+51",
    className: "w-20 text-sm border border-gray-300 rounded px-3 py-2"
  }), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    placeholder: "N\xFAmero de tel\xE9fono",
    className: "flex-1 text-sm border border-gray-300 rounded px-3 py-2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "API no disponible",
    value: apiError,
    onChange: setApiError
  })), /*#__PURE__*/React.createElement("button", {
    onClick: consultar,
    disabled: !docNum,
    className: `w-full py-2 rounded text-sm font-semibold mb-4 ${!docNum ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`
  }, "Consultar proveedor de identidad"), estado === 'loading' && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-600"
  }, "Consultando proveedor de identidad...")), estado === 'success' && !apiError && /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-200 rounded p-4 mb-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "\u2713 Datos obtenidos"), isEmpresa ? /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-sm"
  }, [['Razón Social', 'Empresa Ejemplo SAC'], ['RUC', '20123456789'], ['Estado RUC', 'ACTIVO'], ['Representante Legal', 'Juan Carlos Pérez']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 w-36"
  }, k, ":"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, v)))) : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm"
  }, [['Nombres', 'Carlos Alberto'], ['Ap. Paterno', 'Mendoza'], ['Ap. Materno', 'Ríos'], ['Estado civil', 'Soltero'], ['Fecha nacimiento', '—⚠ PENDIENTE']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium"
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-2 bg-white border border-gray-200 rounded text-xs text-gray-600"
  }, "\u2192 Se aplicar\xE1 evaluaci\xF3n: ", /*#__PURE__*/React.createElement("strong", null, isEmpresa ? 'Motor Crediticio Empresa' : 'Equifax Personal'))), apiError && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700"
  }, "\u26A0 Proveedor de identidad no disponible. Puedes ingresar datos manualmente."), (estado === 'success' || apiError) && !isEmpresa && /*#__PURE__*/React.createElement("div", {
    className: "mt-4 pt-4 border-t border-gray-200 space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Informaci\xF3n Laboral e Ingresos"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Situaci\xF3n laboral ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 mt-1"
  }, ['Dependiente', 'Independiente'].map(s => /*#__PURE__*/React.createElement("label", {
    key: s,
    className: "flex items-center gap-1.5 text-sm cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "situacion",
    className: "accent-gray-700"
  }), " ", s)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Profesi\xF3n / Cargo actual ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ej. Ingeniero, Contador, Gerente",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Giro o actividad de la empresa ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ej. Comercio, Servicios, Construcci\xF3n",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Nombre del centro de trabajo ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nombre de la empresa u organizaci\xF3n",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "RUC del empleador"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "20XXXXXXXXX",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Direcci\xF3n laboral"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Av. / Calle, distrito",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Fecha de ingreso ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Ingreso neto mensual ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center px-2 text-xs bg-gray-100 border border-r-0 border-gray-300 rounded-l text-gray-500"
  }, "USD"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "3,500",
    className: "flex-1 text-sm border border-l-0 border-gray-300 rounded-r px-3 py-2"
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Vinculaci\xF3n con MAF EAFC S.A."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 mb-2"
  }, "\xBFMantiene v\xEDnculos de propiedad, consanguinidad o afinidad con propietarios de MAF EAFC S.A.? ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, ['Sí', 'No'].map(v => /*#__PURE__*/React.createElement("label", {
    key: v,
    className: "flex items-center gap-1.5 text-sm cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "vinculo1",
    className: "accent-gray-700"
  }), " ", v)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-700 mb-2"
  }, "\xBFEs director, funcionario o asesor de MAF EAFC, o tiene v\xEDnculo con alg\xFAn director o empleado? ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, ['Sí', 'No'].map(v => /*#__PURE__*/React.createElement("label", {
    key: v,
    className: "flex items-center gap-1.5 text-sm cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "vinculo2",
    className: "accent-gray-700"
  }), " ", v)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Nombre de persona vinculada (si aplica)"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Nombre y apellidos",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Tipo de v\xEDnculo"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ej. C\xF3nyuge, hermano",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Persona Expuesta Pol\xEDticamente (PEP)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-600 mb-2"
  }, "\xBFUsted, su c\xF3nyuge o alg\xFAn pariente hasta 2do grado de consanguinidad o afinidad es PEP? ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, ['Sí', 'No'].map(v => /*#__PURE__*/React.createElement("label", {
    key: v,
    className: "flex items-center gap-1.5 text-sm cursor-pointer"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "pep",
    className: "accent-gray-700"
  }), " ", v))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-amber-700 bg-amber-50 rounded px-3 py-2 mt-2"
  }, "Si respondi\xF3 S\xED, se debe completar el Formulario PEP por separado.")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-blue-600 bg-blue-50 rounded px-3 py-2"
  }, "Todos estos datos se precargan autom\xE1ticamente en la Declaraci\xF3n Jurada al generar los documentos.")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(isEmpresa ? '/eval/empresa' : '/eval/certificates'),
    disabled: estado !== 'success' && !apiError,
    className: `flex-1 py-2 rounded text-sm font-semibold ${estado !== 'success' && !apiError ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "Confirmar y continuar \u2192"), apiError && /*#__PURE__*/React.createElement("button", {
    className: "flex-1 border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "Ingresar manualmente"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Timeout API proveedor de identidad \u2192 fallback manual autom\xE1tico. Anotar que fue manual."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Proveedor para CE y Pasaporte sin definir. Representa ~20% del volumen estimado."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Proveedor para persona jur\xEDdica: sin HU mapeada en backlog actual."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════

// P09b — SELECCIÓN DE CERTIFICADOS — v4 (valor independiente por certificado)
function P09bCertificates() {
  const {
    navigate,
    demoState,
    setDemoState
  } = React.useContext(AppContext);
  const [programa, setPrograma] = React.useState('');
  const [grupo, setGrupo] = React.useState('');
  const [cantidad, setCantidad] = React.useState(1);
  const [sels, setSels] = React.useState(['', '', '', '', '']);
  const [coTit, setCoTit] = React.useState(false);
  const [coTitDNI, setCoTitDNI] = React.useState('');
  const [coTitOk, setCoTitOk] = React.useState(false);
  const [apiOk, setApiOk] = React.useState(true);
  const GRUPOS = {
    'Toyota FC 2026': [{
      id: 'G-045',
      label: 'Grupo G-045 — 48 meses — 12 vacantes'
    }, {
      id: 'G-061',
      label: 'Grupo G-061 — 36 meses — 3 vacantes'
    }, {
      id: 'G-072',
      label: 'Grupo G-072 — 60 meses — 8 vacantes'
    }]
  };
  const CERTS = {
    'G-045': [{
      id: 'C-10K',
      label: 'USD 10,000',
      cuota: 'USD 243/mes',
      insc: 'USD 485'
    }, {
      id: 'C-15K',
      label: 'USD 15,000',
      cuota: 'USD 364/mes',
      insc: 'USD 727'
    }, {
      id: 'C-20K',
      label: 'USD 20,000',
      cuota: 'USD 485/mes',
      insc: 'USD 970'
    }, {
      id: 'C-25K',
      label: 'USD 25,000',
      cuota: 'USD 606/mes',
      insc: 'USD 1,213'
    }],
    'G-061': [{
      id: 'C-10K',
      label: 'USD 10,000',
      cuota: 'USD 283/mes',
      insc: 'USD 500'
    }, {
      id: 'C-15K',
      label: 'USD 15,000',
      cuota: 'USD 489/mes',
      insc: 'USD 750'
    }],
    'G-072': [{
      id: 'C-20K',
      label: 'USD 20,000',
      cuota: 'USD 390/mes',
      insc: 'USD 970'
    }, {
      id: 'C-25K',
      label: 'USD 25,000',
      cuota: 'USD 502/mes',
      insc: 'USD 1,250'
    }]
  };
  const certs = CERTS[grupo] || [];
  const getN = str => parseInt((str || '0').replace(/[^0-9]/g, '')) || 0;
  const getCert = id => certs.find(c => c.id === id);
  const activeSels = sels.slice(0, cantidad);
  const totalUSD = activeSels.reduce((s, id) => {
    const c = getCert(id);
    return s + (c ? getN(c.label) : 0);
  }, 0);
  const totalCuota = activeSels.reduce((s, id) => {
    const c = getCert(id);
    return s + (c ? getN(c.cuota) : 0);
  }, 0);
  const totalInsc = activeSels.reduce((s, id) => {
    const c = getCert(id);
    return s + (c ? getN(c.insc) : 0);
  }, 0);
  const allSel = activeSels.every(s => s !== '');
  const canContinue = programa && grupo && allSel;
  function handleCoTit(v) {
    setCoTitDNI(v);
    if (v.length === 8) setTimeout(() => setCoTitOk(true), 1500);else setCoTitOk(false);
  }
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/eval/certificates",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-1"
  }, "Selecci\xF3n de certificados"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mb-5"
  }, "Define el monto de cada certificado antes de la evaluaci\xF3n de riesgo"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 mb-4 space-y-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Paso 1 \u2014 Programa"), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
    value: programa,
    onChange: e => {
      setPrograma(e.target.value);
      setGrupo('');
      setSels(['', '', '', '', '']);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar programa..."), /*#__PURE__*/React.createElement("option", {
    value: "Toyota FC 2026"
  }, "Toyota FC 2026"))), programa && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Paso 2 \u2014 Grupo"), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
    value: grupo,
    onChange: e => {
      setGrupo(e.target.value);
      setSels(['', '', '', '', '']);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar grupo..."), (GRUPOS[programa] || []).map(g => /*#__PURE__*/React.createElement("option", {
    key: g.id,
    value: g.id
  }, g.label))), grupo && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "Plazo y vacantes retornados por NewConn en tiempo real.")), grupo && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Paso 3 \u2014 \xBFCu\xE1ntos certificados?"), /*#__PURE__*/React.createElement("select", {
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
    value: cantidad,
    onChange: e => {
      setCantidad(parseInt(e.target.value));
      setSels(['', '', '', '', '']);
    }
  }, [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n, " certificado", n > 1 ? 's' : ''))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "M\xE1ximo 5 por operaci\xF3n. Cada uno puede tener un valor diferente.")), grupo && cantidad > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-700 uppercase mb-2"
  }, "Paso 4 \u2014 Valor de cada certificado"), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-amber-700 bg-amber-50 border-l-4 border-amber-400 px-3 py-2 mb-3 rounded-r"
  }, "Cada certificado puede ser de un valor diferente. Selecci\xF3nalos de forma independiente."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, Array.from({
    length: cantidad
  }, (_, i) => {
    const sel = getCert(sels[i]);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "border border-gray-200 rounded p-3 bg-gray-50"
    }, /*#__PURE__*/React.createElement("label", {
      className: "block text-xs font-semibold text-gray-700 mb-1"
    }, "Certificado #", i + 1, " \u2014 Valor (USD) ", /*#__PURE__*/React.createElement("span", {
      className: "text-red-500"
    }, "*")), /*#__PURE__*/React.createElement("select", {
      className: "w-full text-sm border border-gray-300 rounded px-3 py-2 bg-white",
      value: sels[i],
      onChange: e => {
        const v = e.target.value;
        setSels(prev => prev.map((s, j) => j === i ? v : s));
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Seleccionar valor..."), certs.map(ct => /*#__PURE__*/React.createElement("option", {
      key: ct.id,
      value: ct.id
    }, ct.label, " \u2014 ", ct.cuota))), sel && /*#__PURE__*/React.createElement("div", {
      className: "flex gap-4 mt-1.5 text-xs text-gray-500"
    }, /*#__PURE__*/React.createElement("span", null, "Cuota: ", /*#__PURE__*/React.createElement("strong", {
      className: "text-gray-700"
    }, sel.cuota)), /*#__PURE__*/React.createElement("span", null, "Inscripci\xF3n: ", /*#__PURE__*/React.createElement("strong", {
      className: "text-gray-700"
    }, sel.insc))));
  }))), allSel && totalUSD > 0 && /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-900 text-white rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-400 uppercase mb-2"
  }, "Resumen consolidado \u2014 monto a evaluar"), [['Monto total combinado:', 'USD ' + totalUSD.toLocaleString()], ['Cuota mensual total:', apiOk ? 'USD ' + totalCuota.toLocaleString() + '/mes' : '—'], ['Inscripción total:', apiOk ? 'USD ' + totalInsc.toLocaleString() : '—']].map(r => /*#__PURE__*/React.createElement("div", {
    key: r[0],
    className: "flex justify-between text-sm mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, r[0]), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, r[1]))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 text-right mt-1"
  }, "Calculado por NewConn \xB7 no editable"), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-700 mt-2 pt-2"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Simular API no disponible",
    value: !apiOk,
    onChange: v => setApiOk(!v)
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-gray-700"
  }, "\xBFHay co-titular?"), /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Simular co-titular",
    value: coTit,
    onChange: v => {
      setCoTit(v);
      setCoTitDNI('');
      setCoTitOk(false);
    }
  })), coTit && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "DNI del co-titular"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "12345678",
    value: coTitDNI,
    onChange: e => handleCoTit(e.target.value),
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  }), coTitOk && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green-600 mt-1"
  }, "\u2713 Mar\xEDa Elena R\xEDos Castillo \xB7 DNI ", coTitDNI))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDemoState(s => ({
        ...s,
        totalMontoUSD: totalUSD,
        certsCombinados: cantidad
      }));
      navigate('/eval/riesgo');
    },
    disabled: !canContinue,
    className: 'w-full py-3 rounded text-sm font-semibold ' + (canContinue ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-400 cursor-not-allowed')
  }, "Continuar a evaluaci\xF3n de riesgo \u2192"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/eval/identity'),
    className: "w-full mt-2 border border-gray-300 rounded py-2 text-sm text-gray-500 hover:bg-gray-50"
  }, "\u2190 Volver a identidad")));
}

// P10 — EVALUACIÓN EQUIFAX (INTERNO)
function P10Equifax() {
  const {
    navigate,
    demoState,
    setDemoState
  } = useContext(AppContext);
  const [estado, setEstado] = useState('loading'); // loading | aprobado | denegado1 | denegado2
  const [monto, setMonto] = useState('20000');
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/eval/equifax",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P10 \u2014 Evaluaci\xF3n Crediticia Equifax"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, [{
    k: 'loading',
    l: 'Cargando'
  }, {
    'k': 'aprobado',
    l: 'Aprobado'
  }, {
    'k': 'denegado1',
    l: 'Denegado 1°'
  }, {
    'k': 'denegado2',
    l: 'Denegado 2°'
  }].map(e => /*#__PURE__*/React.createElement("button", {
    key: e.k,
    onClick: () => setEstado(e.k),
    className: `text-xs px-3 py-1 rounded border ${estado === e.k ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`
  }, "[ Demo: ", e.l, " ]"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700"
  }, "Carlos Alberto Mendoza R\xEDos"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-xs"
  }, "DNI 45678901 \xB7 Solicita: USD ", parseInt(monto).toLocaleString())), estado === 'loading' && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700 mb-2"
  }, "Consultando Equifax..."), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-200 rounded-full h-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-600 h-2 rounded-full w-2/3"
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "Este proceso puede tardar hasta 2 minutos")), estado === 'aprobado' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-50 border border-gray-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2713"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900 text-lg"
  }, "APROBADO"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "El cliente califica crediticiamente para el monto solicitado")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-sm mb-4"
  }, [['Score Equifax', '—'], ['Nivel de riesgo', '—'], ['Monto aprobado', 'USD 20,000'], ['Fecha evaluación', '12/03/2026 10:35']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "border border-gray-200 rounded p-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium"
  }, v)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDemoState(s => ({
        ...s,
        equifaxResult: 'aprobado'
      }));
      navigate('/plaft/result');
    },
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Continuar a evaluaci\xF3n PLAFT \u2192")), estado === 'denegado1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-100 border border-gray-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2717"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900"
  }, "DENEGADO \u2014 Primer intento"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "El cliente no califica para el monto solicitado")), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-2"
  }, "Seleccionar monto reducido para re-evaluaci\xF3n:"), /*#__PURE__*/React.createElement("select", {
    value: monto,
    onChange: e => setMonto(e.target.value),
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm"
  }, /*#__PURE__*/React.createElement("option", {
    value: "20000"
  }, "USD 20,000 (original)"), /*#__PURE__*/React.createElement("option", {
    value: "15000"
  }, "USD 15,000"), /*#__PURE__*/React.createElement("option", {
    value: "10000"
  }, "USD 10,000"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEstado('denegado2'),
    className: "w-full bg-gray-700 text-white py-2 rounded text-sm font-semibold hover:bg-gray-600"
  }, "Re-evaluar con USD ", parseInt(monto).toLocaleString())), estado === 'denegado2' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-200 border border-gray-400 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2717"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900"
  }, "DENEGADO \u2014 Segundo intento"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-700 mt-1"
  }, "El cliente no califica para este producto con los montos disponibles")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 mb-4"
  }, "El proceso de evaluaci\xF3n crediticia ha concluido. El lead ser\xE1 marcado como Rechazado."), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "\u2190 Volver a ficha del lead"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "JSON completo de respuesta Equifax: almacenado autom\xE1ticamente. No visible al asesor."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    id: "AG13",
    text: "M\xE1ximo de reintentos y reglas de re-evaluaci\xF3n: confirmar con \xE1rea de Riesgos MAF."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P10-UNIFIED — EVALUACIÓN DE RIESGO (C-01 / C-02) — 6 CASUÍSTICAS COASOCIADO
// ═══════════════════════════════════════════════════════════════════════════
function P10Unified() {
  const {
    navigate,
    demoState,
    setDemoState
  } = useContext(AppContext);
  const [estado, setEstado] = useState('loading');
  const [fueraHorario, setFueraHorario] = useState(false);
  const [coTitActivo, setCoTitActivo] = useState(demoState.coTitularActivo || false);
  const [coTitDocNum, setCoTitDocNum] = useState('');
  const [coTitReniec, setCoTitReniec] = useState('idle');
  const [casuistica, setCasuistica] = useState('c1');
  const handleCoTitDoc = v => {
    setCoTitDocNum(v);
    if (v.length === 8) {
      setCoTitReniec('loading');
      setTimeout(() => setCoTitReniec('done'), 1500);
    } else setCoTitReniec('idle');
  };
  const CASUISTICAS = [{
    id: 'c1',
    label: 'C1: Ambos aprueban'
  }, {
    id: 'c2',
    label: 'C2: Titular OK / Coasociado rechazado'
  }, {
    id: 'c3',
    label: 'C3: Titular rechazado / Coasociado OK'
  }, {
    id: 'c4',
    label: 'C4: Ambos rechazados'
  }, {
    id: 'c5',
    label: 'C5: Titular OK / Coasociado en revisión'
  }, {
    id: 'c6',
    label: 'C6: Coasociado en reintento (monto reducido)'
  }];
  const CasuisticaResult = () => {
    if (casuistica === 'c1') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-200 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Titular principal"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-gray-800 mt-1"
    }, "\u2713 Aprobado")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-200 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Coasociado"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-gray-800 mt-1"
    }, "\u2713 Aprobado"))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 bg-gray-50 border border-gray-300 rounded mb-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-2xl mb-1"
    }, "\u2713"), /*#__PURE__*/React.createElement("p", {
      className: "font-bold text-gray-900"
    }, "Evaluaci\xF3n aprobada \u2014 Ambos titulares califican")), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate('/sale/groups'),
      className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
    }, "Continuar a selecci\xF3n de grupo \u2192"));
    if (casuistica === 'c2') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-200 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Titular principal"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-gray-800 mt-1"
    }, "\u2713 Aprobado")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-800 bg-gray-800 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-300"
    }, "Coasociado"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-white mt-1"
    }, "\u2717 Rechazado"))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 bg-gray-800 text-white rounded mb-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-2xl mb-1"
    }, "\u2717"), /*#__PURE__*/React.createElement("p", {
      className: "font-bold"
    }, "Evaluaci\xF3n no exitosa"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-gray-300 mt-1"
    }, "Uno de los titulares no cumple los requisitos.")), /*#__PURE__*/React.createElement("div", {
      className: "p-3 bg-yellow-50 border border-yellow-300 rounded mb-3 text-sm text-gray-800"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold mb-1"
    }, "\uD83D\uDFE1 Sugerencia para el asesor:"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs"
    }, "Puedes reintentar la evaluaci\xF3n con: (1) monto reducido, (2) plazo diferente, o (3) cambiar el coasociado. No hay l\xEDmite de reintentos.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate('/eval/riesgo'),
      className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700 mb-2"
    }, "Re-evaluar con datos modificados \u2192"), /*#__PURE__*/React.createElement("div", {
      className: "space-y-1"
    }, /*#__PURE__*/React.createElement(AnnotationNote, {
      type: "gap",
      text: "[GAP C-05a]: \xBFSe permite sustituir al coasociado fallido por otra persona?"
    }), /*#__PURE__*/React.createElement(AnnotationNote, {
      type: "gap",
      text: "[GAP C-05b]: \xBFLa venta puede continuar solo con el titular principal eliminando al coasociado?"
    })));
    if (casuistica === 'c3') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-800 bg-gray-800 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-300"
    }, "Titular principal"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-white mt-1"
    }, "\u2717 Rechazado")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-200 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Coasociado"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-gray-800 mt-1"
    }, "\u2713 Aprobado"))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 bg-gray-800 text-white rounded mb-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-2xl mb-1"
    }, "\u2717"), /*#__PURE__*/React.createElement("p", {
      className: "font-bold"
    }, "Evaluaci\xF3n no exitosa"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-gray-300 mt-1"
    }, "El titular principal no cumple los requisitos.")), /*#__PURE__*/React.createElement("div", {
      className: "p-3 bg-yellow-50 border border-yellow-300 rounded mb-3 text-sm text-gray-800"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold mb-1"
    }, "\uD83D\uDFE1 Sugerencia para el asesor:"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs"
    }, "Intenta con: (1) monto reducido, (2) plazo diferente. Sin l\xEDmite de reintentos.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate('/eval/riesgo'),
      className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700 mb-2"
    }, "Re-evaluar con datos modificados \u2192"), /*#__PURE__*/React.createElement("div", {
      className: "p-3 bg-orange-50 border border-orange-200 rounded text-xs text-orange-800 mb-2"
    }, "\u26A0 L\xF3gica restrictiva: si el titular principal falla, la operaci\xF3n cae sin importar el resultado del coasociado."), /*#__PURE__*/React.createElement(AnnotationNote, {
      type: "gap",
      text: "[GAP C-05b]: \xBFLa venta puede continuar solo con el titular principal eliminando al coasociado?"
    }));
    if (casuistica === 'c4') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-800 bg-gray-800 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-300"
    }, "Titular principal"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-white mt-1"
    }, "\u2717 Rechazado")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-800 bg-gray-800 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-300"
    }, "Coasociado"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-white mt-1"
    }, "\u2717 Rechazado"))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 bg-gray-800 text-white rounded mb-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-2xl mb-1"
    }, "\u2717"), /*#__PURE__*/React.createElement("p", {
      className: "font-bold"
    }, "Evaluaci\xF3n no exitosa"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-gray-300 mt-1"
    }, "Ninguno de los titulares cumple los requisitos.")), /*#__PURE__*/React.createElement("div", {
      className: "p-3 bg-yellow-50 border border-yellow-300 rounded mb-3 text-sm text-gray-800"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold mb-1"
    }, "\uD83D\uDFE1 Sugerencia para el asesor:"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs"
    }, "Intenta con: (1) monto significativamente reducido, (2) plazo diferente, o (3) cambiar ambos titulares. Sin l\xEDmite de reintentos.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate('/eval/riesgo'),
      className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700 mb-2"
    }, "Re-evaluar con datos modificados \u2192"));
    if (casuistica === 'c5') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-200 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Titular principal"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-gray-800 mt-1"
    }, "\u2713 Aprobado")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-yellow-300 bg-yellow-50 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-yellow-700"
    }, "Coasociado"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-yellow-800 mt-1"
    }, "\u23F3 En revisi\xF3n"))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 bg-yellow-50 border border-yellow-300 rounded mb-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-2xl mb-1"
    }, "\u23F3"), /*#__PURE__*/React.createElement("p", {
      className: "font-bold text-gray-900"
    }, "Operaci\xF3n pausada \u2014 en revisi\xF3n"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-gray-600 mt-1"
    }, "El coasociado requiere revisi\xF3n manual por el Oficial de Cumplimiento.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => navigate('/sale/groups'),
      className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700 mb-2"
    }, "Ver proforma mientras esperas \u2192"), /*#__PURE__*/React.createElement("div", {
      className: "p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 text-center mb-2"
    }, "\u26A0 La orden de pago estar\xE1 bloqueada hasta que el Oficial resuelva"), /*#__PURE__*/React.createElement(AnnotationNote, {
      type: "gap",
      text: "[GAP C-05c]: Si el Oficial rechaza al coasociado, \xBFpuede el asesor reemplazarlo o cae toda la venta?"
    }));
    if (casuistica === 'c6') return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-gray-200 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, "Titular principal"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-gray-800 mt-1"
    }, "\u2713 Aprobado")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 border border-yellow-300 bg-yellow-50 rounded p-3 text-center"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-yellow-700"
    }, "Coasociado"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-bold text-yellow-800 mt-1"
    }, "\u26A0 1er rechazo"))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 bg-yellow-50 border border-yellow-300 rounded mb-3"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-gray-800 mb-2"
    }, "\xBFRe-evaluar coasociado con monto menor?"), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 mb-2"
    }, "Solo aplica a la parte del coasociado. El monto del titular no cambia."), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2 flex-wrap mb-3"
    }, ['USD 20,000', 'USD 15,000', 'USD 10,000'].map(m => /*#__PURE__*/React.createElement("button", {
      key: m,
      className: "text-xs border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-50"
    }, m))), /*#__PURE__*/React.createElement("button", {
      className: "w-full border border-gray-700 rounded py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
    }, "Re-evaluar coasociado con nuevo monto")), /*#__PURE__*/React.createElement(AnnotationNote, {
      type: "gap",
      text: "[GAP C-05d]: Si el coasociado pasa con monto reducido, \xBFeso cambia cu\xE1ntos certificados puede adquirir el titular?"
    }));
    return null;
  };
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/eval/riesgo",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P10-UNIFIED \u2014 Evaluaci\xF3n de Riesgo"), demoState.totalMontoUSD > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-1"
  }, "Monto a evaluar (desde P09b)"), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Total combinado:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, "USD ", demoState.totalMontoUSD.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, "Certificados:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, demoState.certificadosCombinados))), !coTitActivo && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, [{
    k: 'loading',
    l: 'Cargando'
  }, {
    k: 'aprobado',
    l: 'Aprobado'
  }, {
    k: 'rechazado',
    l: 'Rechazado'
  }, {
    k: 'primer_rechazo',
    l: '1er rechazo'
  }, {
    k: 'en_revision',
    l: 'En revisión'
  }, {
    k: 'error',
    l: 'Error API'
  }].map(e => /*#__PURE__*/React.createElement("button", {
    key: e.k,
    onClick: () => setEstado(e.k),
    className: `text-xs px-3 py-1 rounded border ${estado === e.k ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`
  }, "[ Demo: ", e.l, " ]"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-4 bg-gray-50 border border-gray-200 rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Declaraci\xF3n Jurada \u2014 datos de P09"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-sm"
  }, [['Situación laboral', 'Dependiente'], ['Cargo', 'Contador Senior'], ['Empresa', 'Empresa Ejemplo SAC'], ['Giro', 'Servicios financieros'], ['Fecha ingreso', '15/03/2021'], ['Ingreso neto mensual', 'USD 3,500'], ['Vinculación MAF', 'No'], ['PEP', 'No']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-gray-800"
  }, v))))), !coTitActivo && estado === 'loading' && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700 mb-1"
  }, "Evaluando..."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "El sistema ejecuta las verificaciones necesarias.")), !coTitActivo && estado === 'aprobado' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-50 border border-gray-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2713"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900 text-lg"
  }, "Evaluaci\xF3n aprobada \u2014 puede continuar")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/groups'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Continuar a selecci\xF3n de grupo \u2192")), !coTitActivo && estado === 'rechazado' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-800 text-white rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2717"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-lg"
  }, "Evaluaci\xF3n no exitosa"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-300 mt-1"
  }, "No es posible continuar con este prospecto.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "\u2190 Volver a ficha del lead")), !coTitActivo && estado === 'primer_rechazo' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-yellow-50 border border-yellow-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-2"
  }, "\u26A0"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-800"
  }, "Evaluaci\xF3n no completamente aprobada"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, "\xBFDeseas re-evaluar con un monto menor?")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Selecciona monto reducido:"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-3"
  }, ['USD 20,000', 'USD 15,000', 'USD 10,000'].map(m => /*#__PURE__*/React.createElement("button", {
    key: m,
    className: "flex-1 text-xs border border-gray-300 rounded px-2 py-2 hover:bg-gray-50"
  }, m))), /*#__PURE__*/React.createElement("button", {
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Re-evaluar con nuevo monto"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 text-center mt-2"
  }, "Solo 1 reintento permitido por sesi\xF3n")), !coTitActivo && estado === 'en_revision' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-yellow-50 border border-yellow-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u23F3"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900"
  }, "En revisi\xF3n con analista")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-600 mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mb-1"
  }, "Tu solicitud est\xE1 siendo revisada. Te notificaremos cuando se resuelva."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "\u23F1 SLA: ~20\u201360 min en horario L\u2013V 9:00\u201318:00")), /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Fuera de horario",
    value: fueraHorario,
    onChange: setFueraHorario
  }), fueraHorario && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 p-3 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700"
  }, "\uD83C\uDF19 Ser\xE1 atendido el ", /*#__PURE__*/React.createElement("strong", null, "siguiente d\xEDa h\xE1bil"), " (L\u2013V a partir de las 9:00 am)."), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/groups'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Ver proforma mientras esperas \u2192"), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 text-center"
  }, "\u26A0 La orden de pago (P23) est\xE1 bloqueada hasta que el Oficial resuelva"))), !coTitActivo && estado === 'error' && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-3"
  }, "!"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700 mb-2"
  }, "Servicio de evaluaci\xF3n no disponible"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEstado('loading'),
    className: "bg-gray-700 text-white px-6 py-2 rounded text-sm font-semibold"
  }, "Reintentar")), coTitActivo && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-red-50 border-l-4 border-red-500 text-xs text-red-800 mb-4 font-semibold"
  }, "\u26A0 L\xD3GICA RESTRICTIVA: Si cualquiera de los dos titulares falla la evaluaci\xF3n, la venta no puede continuar. Pendiente confirmar con MAF si existe excepci\xF3n."), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "[ DEMO \u2014 Selecciona casu\xEDstica para validar con MAF ]"), /*#__PURE__*/React.createElement("select", {
    value: casuistica,
    onChange: e => setCasuistica(e.target.value),
    className: "w-full border-2 border-dashed border-gray-400 rounded px-3 py-2 text-sm bg-white"
  }, CASUISTICAS.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.label)))), /*#__PURE__*/React.createElement(CasuisticaResult, null))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-gray-700"
  }, "Co-titular (coasociado)"), /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Activar co-titular",
    value: coTitActivo,
    onChange: v => {
      setCoTitActivo(v);
      setCoTitDocNum('');
      setCoTitReniec('idle');
    }
  })), coTitActivo && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-gray-100 space-y-2"
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "DNI co-titular",
    required: true,
    placeholder: "12345678",
    value: coTitDocNum,
    onChange: e => handleCoTitDoc(e.target.value)
  }), coTitReniec === 'loading' && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-xs text-gray-500"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"
  }), "Consultando proveedor..."), coTitReniec === 'done' && /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-gray-50 border border-gray-200 rounded text-xs"
  }, "\u2713 ", /*#__PURE__*/React.createElement("strong", null, "Mar\xEDa Elena R\xEDos Castillo"), " \xB7 DNI ", coTitDocNum))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-01: Sistema ejecuta PLAFT primero \u2192 si OK \u2192 Equifax. El asesor nunca ve las etapas internas."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-02: Asesor ve exactamente 3 resultados: Aprobado / Rechazado / En revisi\xF3n. Nunca ve 'Equifax' ni 'PLAFT'."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RN-018: Co-titularidad \u2014 ambos deben aprobar. L\xF3gica m\xE1s restrictiva implementada."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 18/06 RF-005: Re-evaluaci\xF3n sin l\xEDmite \u2014 el asesor puede modificar monto, plazo o certificados y re-evaluar tantas veces como sea necesario. NO hay m\xE1ximo de reintentos."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 18/06 RN-002: Resultado unificado con mensaje accionable \u2014 el asesor ve 'Rechazado' pero S\xCD recibe sugerencias gen\xE9ricas ('intenta reducir monto', 'cambia plazo') SIN ver detalle t\xE9cnico ni distinguir PLAFT vs Equifax."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "C-05 PENDIENTE: \xBFEvaluaci\xF3n co-titular en paralelo o secuencial? \xBFPuede sustituirse al fallido?"
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "R-01: API unificada Equifax+Inspektor en proceso. Plan B: APIs separadas."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P12 — REVISIÓN SUPERVISOR
// ═══════════════════════════════════════════════════════════════════════════
function P12Supervisor() {
  const {
    navigate
  } = useContext(AppContext);
  const [selected, setSelected] = useState(0);
  const [comentario, setComentario] = useState('');
  const casos = [{
    id: 1,
    nombre: 'Carlos Mendoza',
    dni: '45678901',
    ingresos: 'USD 3,500/mes',
    sla: '🟢 18h restantes',
    slaColor: 'green'
  }, {
    id: 2,
    nombre: 'Ana Torres Vega',
    dni: '32145678',
    ingresos: 'USD 2,800/mes',
    sla: '🟡 4h restantes',
    slaColor: 'yellow'
  }, {
    id: 3,
    nombre: 'Roberto Sánchez',
    dni: '87654321',
    ingresos: 'USD 5,100/mes',
    sla: '🔴 VENCIDO',
    slaColor: 'red'
  }];
  const slaBadge = {
    green: 'bg-gray-100 text-gray-700',
    yellow: 'bg-gray-200 text-gray-800',
    red: 'bg-gray-800 text-white'
  };
  const caso = casos[selected];
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/eval/supervisor",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P12 \u2014 Panel Revisi\xF3n Supervisor"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 bg-gray-50 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500"
  }, "CASOS PENDIENTES")), casos.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    onClick: () => setSelected(i),
    className: `p-3 border-b border-gray-100 cursor-pointer ${selected === i ? 'bg-gray-100' : 'hover:bg-gray-50'}`
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-gray-800"
  }, c.nombre), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, c.dni), /*#__PURE__*/React.createElement("span", {
    className: `text-xs px-2 py-0.5 rounded mt-1 inline-block ${slaBadge[c.slaColor]}`
  }, c.sla))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "font-semibold text-gray-800 mb-4"
  }, caso.nombre), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-sm mb-4"
  }, [['DNI', caso.dni], ['Ingresos declarados', caso.ingresos], ['Asesor asignado', 'María López'], ['Fecha solicitud', '12/03/2026']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-gray-800"
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: `mb-4 p-3 rounded text-sm font-medium ${slaBadge[caso.slaColor]}`
  }, "SLA: ", caso.sla), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Comentario del supervisor ", comentario.length < 20 ? /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "(requerido para rechazar, m\xEDn 20 chars)") : null), /*#__PURE__*/React.createElement("textarea", {
    value: comentario,
    onChange: e => setComentario(e.target.value),
    rows: 3,
    className: "w-full border border-gray-300 rounded p-2 text-sm resize-none",
    placeholder: "Ingrese observaciones o motivo de decisi\xF3n..."
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, comentario.length, " caracteres")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    disabled: comentario.length < 20,
    className: `flex-1 py-2 rounded text-sm font-semibold border ${comentario.length < 20 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-700 hover:bg-gray-50'}`
  }, "\u2717 Rechazar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/plaft/result'),
    className: "flex-1 bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "\u2713 Aprobar \u2192 PLAFT"))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Rechazo requiere comentario obligatorio (m\xEDnimo 20 caracteres). Bot\xF3n disabled sin \xE9l."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Este paso es evaluaci\xF3n CREDITICIA, NO PLAFT. Conceptos y flujos son separados."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "SLA: confirmar valores exactos con MAF. \xBFUn supervisor por concesionaria o centralizado?"
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-03 / GAP-12 CERRADO: SLA Oficial de Cumplimiento = 20-60 min en horario de oficina. Fuera de horario: siguiente d\xEDa h\xE1bil. El Oficial opera con su propio usuario dentro de la plataforma."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// P13 — MOTOR CREDITICIO EMPRESA
// ═══════════════════════════════════════════════════════════════════════════
function P13Empresa() {
  const {
    navigate
  } = useContext(AppContext);
  const [estado, setEstado] = useState('formulario');
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/eval/empresa",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P13 \u2014 Motor Crediticio Empresa"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4 flex-wrap"
  }, [{
    k: 'formulario',
    l: 'Formulario'
  }, {
    'k': 'evaluando',
    l: 'Evaluando'
  }, {
    'k': 'aprobado',
    l: 'Aprobado'
  }, {
    'k': 'denegado',
    l: 'Denegado'
  }].map(e => /*#__PURE__*/React.createElement("button", {
    key: e.k,
    onClick: () => setEstado(e.k),
    className: `text-xs px-3 py-1 rounded border ${estado === e.k ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 text-gray-500'}`
  }, "[ Demo: ", e.l, " ]"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, estado === 'formulario' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Datos financieros de la empresa"), /*#__PURE__*/React.createElement(FormField, {
    label: "Ventas anuales (USD)",
    required: true,
    placeholder: "500000",
    type: "number"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Antig\xFCedad de la empresa (a\xF1os)",
    required: true,
    placeholder: "5",
    type: "number"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "N\xB0 empleados",
    placeholder: "25",
    type: "number"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Sector econ\xF3mico",
    required: true,
    placeholder: "Comercio / Servicios / Industria"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "Ingresos netos mensuales (USD)",
    required: true,
    placeholder: "45000",
    type: "number"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEstado('evaluando'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold mt-2"
  }, "Enviar para evaluaci\xF3n")), estado === 'evaluando' && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700"
  }, "Evaluando perfil empresarial..."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-2"
  }, "Motor crediticio procesando datos")), estado === 'aprobado' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-50 border border-gray-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2713"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900 text-lg"
  }, "APROBADO"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "La empresa califica para el producto")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/plaft/result'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold"
  }, "Continuar a evaluaci\xF3n PLAFT \u2192")), estado === 'denegado' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-200 border border-gray-400 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2717"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900"
  }, "DENEGADO"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "La empresa no califica para este producto")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600"
  }, "\u2190 Volver a ficha del lead"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Motor crediticio empresa: par\xE1metros y umbrales definidos por \xE1rea de Riesgos MAF."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "HU para motor empresa no mapeada en backlog. Requiere levantamiento con Riesgos."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P15 — RESULTADO PLAFT
// ═══════════════════════════════════════════════════════════════════════════
function P15PLAFT() {
  const {
    navigate,
    setDemoState
  } = useContext(AppContext);
  const [estado, setEstado] = useState('loading');
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/plaft/result",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P15 \u2014 Resultado Evaluaci\xF3n PLAFT (Inspektor)"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, [{
    k: 'loading',
    l: 'Cargando'
  }, {
    k: 'continuar',
    l: 'Continuar'
  }, {
    k: 'denegar',
    l: 'Denegar'
  }, {
    k: 'consultar',
    l: 'Consultar'
  }, {
    k: 'error',
    l: 'Error API'
  }].map(e => /*#__PURE__*/React.createElement("button", {
    key: e.k,
    onClick: () => setEstado(e.k),
    className: `text-xs px-3 py-1 rounded border ${estado === e.k ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 text-gray-500'}`
  }, "[ Demo: ", e.l, " ]"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700"
  }, "Carlos Alberto Mendoza R\xEDos \xB7 DNI 45678901")), estado === 'loading' && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto mb-4"
  }), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700"
  }, "Consultando Inspektor PLAFT..."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-2"
  }, "Verificando listas de control y cumplimiento")), estado === 'continuar' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-50 border border-gray-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2713"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900"
  }, "APROBADO"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "El cliente puede continuar con el proceso de venta")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDemoState(s => ({
        ...s,
        plaftResult: 'continuar'
      }));
      navigate('/sale/groups');
    },
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold"
  }, "Continuar a selecci\xF3n de grupo \u2192")), estado === 'denegar' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-800 text-white rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u2717"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-lg"
  }, "NO ES POSIBLE CONTINUAR"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-300 mt-1"
  }, "Este prospecto no puede acceder al producto")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500 mb-4"
  }, "Por razones de confidencialidad, no es posible revelar el motivo de esta decisi\xF3n."), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/lead/1'),
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600"
  }, "\u2190 Volver a ficha del lead")), estado === 'consultar' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-200 border border-gray-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u23F3"), /*#__PURE__*/React.createElement("h2", {
    className: "font-bold text-gray-900"
  }, "PENDIENTE REVISI\xD3N"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "Caso derivado al Oficial de Cumplimiento")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 mb-4"
  }, "Se ha generado una alerta autom\xE1tica para el Oficial de Cumplimiento PLAFT. El asesor ser\xE1 notificado cuando se resuelva el caso."), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/plaft/panel'),
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600"
  }, "Ver panel Oficial \u2192")), estado === 'error' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-gray-100 border border-gray-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u26A0"), /*#__PURE__*/React.createElement("h2", {
    className: "font-semibold text-gray-700"
  }, "Inspektor no disponible"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mt-1"
  }, "Error de conexi\xF3n con el servicio PLAFT")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEstado('loading'),
    className: "w-full bg-gray-700 text-white py-2 rounded text-sm font-semibold"
  }, "Reintentar consulta"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Estado DENEGAR: PERMANENTE e irreversible. El lead queda bloqueado permanentemente."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Mensaje de denegaci\xF3n: NO revelar motivo bajo ninguna circunstancia (confidencialidad PLAFT)."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Texto exacto del mensaje de denegaci\xF3n: confirmar con \xE1rea legal y compliance de MAF."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Bloqueo futuro de DNI denegado en otras solicitudes: \xBFcu\xE1ndo y c\xF3mo se implementa?"
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P16 — PANEL OFICIAL DE CUMPLIMIENTO
// ═══════════════════════════════════════════════════════════════════════════
function P16PanelOficial() {
  const {
    navigate
  } = useContext(AppContext);
  const casos = [{
    id: 1,
    nombre: 'Carlos Mendoza',
    dni: '45678901',
    asesor: 'M. López',
    fecha: '20/03/2026 10:15',
    sla: '🟢 42 min restantes',
    slaC: 'green',
    fueraHorario: false
  }, {
    id: 2,
    nombre: 'Patricia Vera',
    dni: '23456789',
    asesor: 'J. García',
    fecha: '20/03/2026 09:50',
    sla: '🟡 8 min restantes',
    slaC: 'yellow',
    fueraHorario: false
  }, {
    id: 3,
    nombre: 'Empresa ABC SAC',
    dni: '20112233445',
    asesor: 'L. Torres',
    fecha: '19/03/2026 19:30',
    sla: '🌙 Fuera de horario',
    slaC: 'offhours',
    fueraHorario: true
  }];
  const slaBadge = {
    green: 'bg-gray-100',
    yellow: 'bg-gray-200',
    red: 'bg-gray-800 text-white',
    offhours: 'bg-gray-300 text-gray-700 italic'
  };
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/plaft/panel",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "P16 \u2014 Panel Oficial de Cumplimiento PLAFT"), /*#__PURE__*/React.createElement("span", {
    className: "bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded"
  }, casos.length, " casos pendientes")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("tr", null, ['Cliente', 'DNI/RUC', 'Asesor', 'Fecha derivación', 'SLA / Horario', 'Acción'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "text-left text-xs font-semibold text-gray-500 px-4 py-3"
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, casos.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.id,
    className: "border-b border-gray-100 hover:bg-gray-50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 font-medium text-gray-900"
  }, c.nombre), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-gray-500 text-xs"
  }, c.dni), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-gray-500 text-xs"
  }, c.asesor), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-gray-500 text-xs"
  }, c.fecha), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-xs px-2 py-0.5 rounded ${slaBadge[c.slaC]}`
  }, c.sla), c.fueraHorario && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "Se atender\xE1 el siguiente d\xEDa h\xE1bil")), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/plaft/resolve'),
    className: "text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "Revisar \u2192")))))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Horario laboral Compliance: L\u2013V 9:00\u201318:00. Casos generados fuera de este horario se atienden el siguiente d\xEDa h\xE1bil."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-03 / GAP-12: SLA orientativo = 20\u201360 min dentro del horario laboral. Escalamiento autom\xE1tico si se supera."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-09: El Oficial recibe notificaci\xF3n dentro de la plataforma (dashboard) y adicionalmente por correo electr\xF3nico. Levanta la restricci\xF3n con su propio usuario. Queda registro con timestamp."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "AG-N1: \xBFEl correo electr\xF3nico de notificaci\xF3n al Oficial es configurable desde administraci\xF3n? \xBFQu\xE9 plantilla de correo se usa? Confirmar con MAF."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// P17 — RESOLUCIÓN CASO PLAFT
// ═══════════════════════════════════════════════════════════════════════════
function P17ResolvePLAFT() {
  const {
    navigate
  } = useContext(AppContext);
  const [justificacion, setJustificacion] = useState('');
  const valid = justificacion.length > 0;
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/plaft/resolve",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P17 \u2014 Resoluci\xF3n Caso PLAFT"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-200 rounded p-4 mb-4 bg-gray-50"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Caso PLAFT"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-800"
  }, "Carlos Alberto Mendoza R\xEDos"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "DNI 45678901 \xB7 Derivado: 12/03/2026 10:00"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500"
  }, "Asesor: Mar\xEDa L\xF3pez"), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-2 bg-white border border-gray-200 rounded text-xs space-y-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-600 uppercase tracking-wide mb-1",
    style: {
      fontSize: '10px'
    }
  }, "Detalle interno \u2014 solo visible para Compliance"), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Estado PLAFT:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded"
  }, "OBSERVADO (Consultar)")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Score Equifax:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-700"
  }, "\uD83D\uDFE2 Aprobado")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Monto solicitado:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-700"
  }, "USD 20,000")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Resultado visible al vendedor:"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500 italic"
  }, "\"En revisi\xF3n con analista\"")))), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Justificaci\xF3n / Comentario ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*"), /*#__PURE__*/React.createElement("span", {
    className: "font-normal text-gray-400 ml-1"
  }, "(obligatorio para aprobar y rechazar)")), /*#__PURE__*/React.createElement("textarea", {
    value: justificacion,
    onChange: e => setJustificacion(e.target.value),
    rows: 4,
    className: "w-full border border-gray-300 rounded p-2 text-sm resize-none focus:border-gray-500 focus:outline-none",
    placeholder: "Ingrese la justificaci\xF3n de la resoluci\xF3n..."
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, justificacion.length, " caracteres")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/plaft/panel'),
    disabled: !valid,
    className: `flex-1 py-2 rounded text-sm font-semibold border ${!valid ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-700 hover:bg-gray-50'}`
  }, "\u2717 Rechazar caso"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/groups'),
    disabled: !valid,
    className: `flex-1 py-2 rounded text-sm font-semibold ${!valid ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "\u2713 Aprobar \u2014 Puede continuar"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Comentario OBLIGATORIO para ambas acciones: aprobar y rechazar. Botones disabled sin \xE9l."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-09: Al aprobar, el sistema levanta autom\xE1ticamente el bloqueo de P23 (orden de pago) para el caso correspondiente."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RN-002d: Este detalle (PLAFT observado + score aprobado) SOLO lo ve Compliance aqu\xED. El vendedor \xFAnicamente vio 'En revisi\xF3n con analista' sin ning\xFAn detalle adicional."
  }))));
}

// P-MSG — MENSAJES Y POP-UPS DIFERENCIADOS (HU-034)
// ═══════════════════════════════════════════════════════════════════════════
function PMsgPopups() {
  // 🟡 CAMBIO 12-06-2026: Sistema de mensajes y notificaciones diferenciadas por rol
  const [vistaActiva, setVistaActiva] = useState('cliente'); // cliente | compliance

  const mensajesCliente = [{
    id: 'MSG-01',
    evento: 'Evaluación rechazada (cualquier motivo)',
    mensaje: 'Su solicitud no puede continuar en este momento. Por favor contáctenos para más información.',
    notas: 'Sin revelar si fue PLAFT, Equifax u otro motivo.'
  }, {
    id: 'MSG-02',
    evento: 'Evaluación en revisión manual',
    mensaje: 'Su solicitud está siendo revisada. Le notificaremos el resultado a la brevedad.',
    notas: 'No menciona "PLAFT" ni "analista" al cliente.'
  }, {
    id: 'MSG-03',
    evento: 'Evaluación aprobada',
    mensaje: '¡Su solicitud fue aprobada! Continuamos con el proceso.',
    notas: ''
  }, {
    id: 'MSG-04',
    evento: 'Caso generado fuera de horario laboral',
    mensaje: 'Su solicitud está en proceso. Será atendida el siguiente día hábil (L–V a partir de las 9:00 am).',
    notas: 'Solo aplica cuando el caso cae fuera del horario L–V 9:00–18:00.'
  }];
  const mensajesCompliance = [{
    id: 'INT-01',
    evento: 'Nuevo caso PLAFT "Consultar"',
    mensaje: '[INTERNO] Nuevo caso requiere revisión manual. Cliente: {nombre} — DNI: {dni} — Asesor: {asesor} — Timestamp: {hora}. Estado PLAFT: OBSERVADO. Score Equifax: {resultado}. Acceder al caso →',
    notas: 'Visible en dashboard P16 + correo electrónico al Oficial.'
  }, {
    id: 'INT-02',
    evento: 'SLA próximo a vencer (< 10 min)',
    mensaje: '[ALERTA] El caso de {nombre} vence su SLA en menos de 10 minutos. Acceder ahora →',
    notas: 'Badge rojo en P16.'
  }, {
    id: 'INT-03',
    evento: 'Caso fuera de horario laboral',
    mensaje: '[DIFERIDO] Caso generado fuera del horario laboral ({hora}). Se activará para revisión el {fecha_habil} a las 9:00 am.',
    notas: 'El Oficial no recibe notificación inmediata fuera de horario.'
  }];
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/eval/mensajes",
    pipeline: 2
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-2xl mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-1"
  }, "P-MSG \u2014 Mensajes y Pop-ups Diferenciados"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-4"
  }, "HU-034 \xB7 RN-002e \xB7 Alcance funcional \u2014 pendiente aprobaci\xF3n legal MAF"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setVistaActiva('cliente'),
    className: `px-4 py-2 rounded text-sm font-semibold border ${vistaActiva === 'cliente' ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`
  }, "Vista: Cliente Final"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setVistaActiva('compliance'),
    className: `px-4 py-2 rounded text-sm font-semibold border ${vistaActiva === 'compliance' ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`
  }, "Vista: Compliance (Interno)")), vistaActiva === 'cliente' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"
  }, "Mensajes visibles al cliente final \u2014 sin detalles t\xE9cnicos"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, mensajesCliente.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded"
  }, m.id), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 italic ml-2"
  }, m.evento)), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-700 mb-2"
  }, "\"", m.mensaje, "\""), m.notas && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "\u2699 ", m.notas))))), vistaActiva === 'compliance' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3"
  }, "Mensajes internos para Compliance \u2014 incluyen detalle t\xE9cnico y opciones de acci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, mensajesCompliance.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.id,
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-gray-800 bg-gray-200 px-2 py-0.5 rounded"
  }, m.id), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400 italic ml-2"
  }, m.evento)), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-100 border border-gray-300 rounded text-sm text-gray-800 font-mono mb-2",
    style: {
      fontSize: '11px'
    }
  }, m.mensaje), m.notas && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, "\u2699 ", m.notas))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RN-002e: El sistema genera DOS tipos de mensajes diferenciados. Los mensajes al cliente final no revelan causa del rechazo ni el sistema evaluador (PLAFT/Equifax). Los mensajes de Compliance incluyen detalle t\xE9cnico completo."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "AG-N2 BLOQUEANTE: Textos exactos de TODOS los mensajes pendientes de aprobaci\xF3n por el \xE1rea legal de MAF antes del desarrollo. Esta pantalla es referencial."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P18 — SELECCIÓN GRUPO + VACANTES
// ═══════════════════════════════════════════════════════════════════════════
function P18Groups() {
  const {
    navigate,
    demoState
  } = useContext(AppContext);
  const [programa, setPrograma] = useState('Toyota FC 2026');
  const [grupo, setGrupo] = useState('');
  const [certificado, setCertificado] = useState('');
  const [cantidad, setCantidad] = useState('1');
  const [vacantesInsuf, setVacantesInsuf] = useState(false);
  const GRUPOS_DATA = {
    'Toyota FC 2026': [{
      id: 'G-045',
      label: 'G-045',
      plazo: '48 meses',
      vacantes: 12
    }, {
      id: 'G-061',
      label: 'G-061',
      plazo: '36 meses',
      vacantes: 3
    }, {
      id: 'G-072',
      label: 'G-072',
      plazo: '60 meses',
      vacantes: 8
    }, {
      id: 'G-088',
      label: 'G-088 (sin vacantes)',
      plazo: '48 meses',
      vacantes: 0
    }]
  };
  const CERTS_DATA = {
    'G-045': [{
      id: 'C-20K',
      label: 'USD 20,000',
      cuota: 'USD 485/mes',
      inscripcion: 'USD 970'
    }],
    'G-061': [{
      id: 'C-15K',
      label: 'USD 15,000',
      cuota: 'USD 489/mes',
      inscripcion: 'USD 750'
    }],
    'G-072': [{
      id: 'C-25K',
      label: 'USD 25,000',
      cuota: 'USD 502/mes',
      inscripcion: 'USD 1,250'
    }]
  };
  const grupos = GRUPOS_DATA[programa] || [];
  const certs = CERTS_DATA[grupo] || [];
  const grupoSel = grupos.find(g => g.id === grupo);
  const certSel = certs.find(c => c.id === certificado);
  const nCerts = parseInt(cantidad) || 1;
  const totalUSD = certSel ? parseInt(certSel.label.replace(/[^0-9]/g, '')) * nCerts : 0;
  const vacOk = grupoSel && !vacantesInsuf && grupoSel.vacantes >= nCerts;
  const canContinue = programa && grupo && certificado && cantidad && vacOk;
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/sale/groups",
    pipeline: 3
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P18 \u2014 Selecci\xF3n Programa / Grupo / Certificado \u26A1"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 mb-4 space-y-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"
  }, "Paso 1 \u2014 Programa"), /*#__PURE__*/React.createElement("select", {
    value: programa,
    onChange: e => {
      setPrograma(e.target.value);
      setGrupo('');
      setCertificado('');
    },
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecciona programa..."), /*#__PURE__*/React.createElement("option", null, "Toyota FC 2026")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "Actualmente 1 programa activo. El sistema soporta N programas futuros.")), programa && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"
  }, "Paso 2 \u2014 Grupo ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    value: grupo,
    onChange: e => {
      setGrupo(e.target.value);
      setCertificado('');
    },
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecciona grupo (desde NewCon API)..."), grupos.map(g => /*#__PURE__*/React.createElement("option", {
    key: g.id,
    value: g.id,
    disabled: g.vacantes === 0
  }, g.label, " \u2014 ", g.plazo, " \u2014 ", g.vacantes, " vacantes", g.vacantes === 0 ? ' (SIN VACANTES)' : ''))), grupoSel && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-xs flex gap-4"
  }, /*#__PURE__*/React.createElement("span", null, "\u23F1 Plazo: ", /*#__PURE__*/React.createElement("strong", null, grupoSel.plazo)), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCE6 Vacantes: ", /*#__PURE__*/React.createElement("strong", {
    className: grupoSel.vacantes < 3 ? 'text-orange-600' : ''
  }, grupoSel.vacantes)))), grupo && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"
  }, "Paso 3 \u2014 Certificado ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    value: certificado,
    onChange: e => setCertificado(e.target.value),
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecciona certificado (desde NewCon API)..."), certs.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.label, " \u2014 Cuota: ", c.cuota))), certSel && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-xs flex gap-4"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCB0 Cuota: ", /*#__PURE__*/React.createElement("strong", null, certSel.cuota)), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCB Inscripci\xF3n: ", /*#__PURE__*/React.createElement("strong", null, certSel.inscripcion)), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "De NewCon"))), certificado && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1"
  }, "Cantidad de certificados ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    value: cantidad,
    onChange: e => setCantidad(e.target.value),
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
  }, [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n, " certificado", n > 1 ? 's' : ''))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "M\xE1ximo 5 certificados por operaci\xF3n")), certificado && certSel && /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded space-y-1 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Monto total combinado:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, "USD ", totalUSD.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Cuota mensual total:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "USD ", parseInt(certSel.cuota) * nCerts, "/mes")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Inscripci\xF3n total:"), /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, "USD ", parseInt(certSel.inscripcion) * nCerts)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 text-right"
  }, "Calculado por NewCon API"), /*#__PURE__*/React.createElement("div", {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Simular vacantes insuficientes",
    value: vacantesInsuf,
    onChange: setVacantesInsuf
  })), vacantesInsuf && /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-yellow-50 border border-yellow-300 rounded text-xs text-yellow-800"
  }, "\u26A0 El grupo no tiene vacantes suficientes para ", nCerts, " certificados (disponibles: ", grupoSel?.vacantes || 0, ")."), demoState.coTitularActivo && /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800"
  }, "\uD83D\uDC65 Co-titular activo \u2014 Se requerir\xE1n 2 firmas Keynua al cerrar."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/proforma'),
    disabled: !canContinue,
    className: `w-full py-3 rounded text-sm font-semibold ${!canContinue ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "Confirmar selecci\xF3n y generar proforma \u2192"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/eval/riesgo'),
    className: "w-full mt-2 border border-gray-300 rounded py-2 text-sm text-gray-500 hover:bg-gray-50"
  }, "\u2190 Volver a evaluaci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Flujo en cascada Programa \u2192 Grupo \u2192 Certificado. Plazo sale del grupo, cuota la calcula NewCon."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "M\xE1ximo 5 certificados por operaci\xF3n. Campo es desplegable, no texto libre."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Todos los montos en USD. Sin bimoneda. NewCon retorna cuota + inscripci\xF3n."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "C-06 PENDIENTE: \xBFTodos los certificados combinados deben ser del mismo grupo?"
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Sandbox NewCon cr\xEDtico (R-02): sin sandbox las pruebas generan contratos reales."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P19 — GENERACIÓN PROFORMA
// ═══════════════════════════════════════════════════════════════════════════
function P19Proforma() {
  const {
    navigate
  } = useContext(AppContext);
  const [estado, setEstado] = useState('generando');
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/sale/proforma",
    pipeline: 3
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P19 \u2014 Generaci\xF3n de Proforma"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, [{
    k: 'generando',
    l: 'Generando'
  }, {
    k: 'lista',
    l: 'Lista'
  }, {
    k: 'error',
    l: 'Error cálculo'
  }].map(e => /*#__PURE__*/React.createElement("button", {
    key: e.k,
    onClick: () => setEstado(e.k),
    className: `text-xs px-3 py-1 rounded border ${estado === e.k ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 text-gray-500'}`
  }, "[ Demo: ", e.l, " ]"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Resumen"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm"
  }, [['Cliente', 'Carlos Mendoza'], ['Grupo', 'Grupo Alpha 2026'], ['Certificados', '1'], ['Monto', 'USD 20,000']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium"
  }, v))))), estado === 'generando' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-8 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto mb-3"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-700 font-medium"
  }, "Generando proforma..."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "Calculando cuotas y cronograma de pagos")), estado === 'lista' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-gray-500 text-sm mb-4",
    style: {
      height: 180
    }
  }, "\uD83D\uDCC4 PDF Preview", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, "Proforma_Carlos_Mendoza_GrupoA.pdf")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm mb-3"
  }, [['Monto certificado', 'USD 20,000'], ['🟡 CIA (4%)', 'USD 800'], ['Cuota mensual', 'USD 652'], ['Fecha inicio', '01/04/2026'], ['Duración', '36 meses']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "border border-gray-200 rounded p-2"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium"
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 mb-3"
  }, /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDFE1 18/06:"), " La proforma ahora muestra 2 conceptos desglosados: (1) Monto del certificado y (2) CIA = 4% del certificado. Ambos conceptos se incluyen en la orden de pago."), /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-200 rounded p-3 text-sm mb-4 space-y-1 bg-gray-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Certificados:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "2 certificados del Grupo A")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Monto total combinado:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "USD 40,000")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Contratos generados:"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium"
  }, "2 (uno por certificado)"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/otp'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "\u2713 Confirmar y continuar \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "\u2B07 Descargar proforma"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/groups'),
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "\u2190 Cambiar grupo"))), estado === 'error' && /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-3"
  }, "\u26A0"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700 mb-2"
  }, "Error en c\xE1lculo de proforma"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-4"
  }, "Error: falta dato 'cuota_base' del grupo seleccionado. Por favor contacta a Operaciones."), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/groups'),
    className: "border border-gray-300 rounded px-4 py-2 text-sm text-gray-600"
  }, "\u2190 Cambiar grupo")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    id: "AG5",
    text: "BLOQUEANTE: F\xF3rmula de c\xE1lculo de cuota no recibida de MAF. Impide implementaci\xF3n."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-06: La proforma consolida todos los certificados. Cada uno generar\xE1 un N\xB0 de contrato y vacante independiente en NewCon."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P20 — OTP CONSENTIMIENTO
// ═══════════════════════════════════════════════════════════════════════════
function P20OTP() {
  const {
    navigate,
    setDemoState
  } = useContext(AppContext);
  const [canal, setCanal] = useState('sms'); // Canal único — MAF debe confirmar si SMS o WhatsApp
  const [enviado, setEnviado] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [validado, setValidado] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [intentos, setIntentos] = useState(3);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const handleOtp = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) refs[i + 1].current?.focus();
  };
  const validar = () => {
    if (otp.join('') === '123456') {
      setValidado(true);
      setDemoState(s => ({
        ...s,
        otpValidated: true
      }));
    } else setIntentos(p => p - 1);
  };
  const enviar = () => {
    setEnviado(true);
    setCooldown(45);
    const t = setInterval(() => setCooldown(c => {
      if (c <= 1) {
        clearInterval(t);
        return 0;
      }
      return c - 1;
    }), 1000);
  };
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/sale/otp",
    pipeline: 3
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-md mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P20 \u2014 OTP Consentimiento Informado"), validado ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3"
  }, "\u2713"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-gray-900 mb-1"
  }, "Consentimiento ya registrado"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-4"
  }, "El cliente valid\xF3 su consentimiento. Puedes continuar."), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/docs'),
    className: "bg-gray-800 text-white px-6 py-2 rounded text-sm font-semibold"
  }, "Continuar \u2192")) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-medium text-gray-700"
  }, "Carlos Mendoza"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500"
  }, "\uD83D\uDCF1 +51 9\u25CF\u25CF\u25CF\u25CF\u25CF789 \xA0\xA0 \u2709 ca\u25CF\u25CF\u25CF@gmail.com", /*#__PURE__*/React.createElement("button", {
    className: "ml-2 text-xs underline text-gray-400 hover:text-gray-600"
  }, "Editar"))), /*#__PURE__*/React.createElement(ChannelSelector, {
    value: canal,
    onChange: setCanal,
    className: "mb-4"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: enviar,
    className: "w-full bg-gray-700 text-white py-2 rounded text-sm font-semibold mb-4 hover:bg-gray-600"
  }, "Enviar c\xF3digo OTP al cliente"), enviado && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 text-center mb-3"
  }, "C\xF3digo enviado a: +51 9\u25CF\u25CF\u25CF\u25CF\u25CF789"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 justify-center mb-4"
  }, otp.map((v, i) => /*#__PURE__*/React.createElement("input", {
    key: i,
    ref: refs[i],
    maxLength: 1,
    value: v,
    onChange: e => handleOtp(i, e.target.value),
    className: "otp-input",
    placeholder: "\xB7"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs text-gray-500 mb-3"
  }, /*#__PURE__*/React.createElement("span", null, "Intentos restantes: ", intentos), cooldown > 0 ? /*#__PURE__*/React.createElement("span", null, "Reenviar en: ", String(Math.floor(cooldown / 60)).padStart(2, '0'), ":", String(cooldown % 60).padStart(2, '0')) : /*#__PURE__*/React.createElement("button", {
    onClick: enviar,
    className: "underline hover:text-gray-800"
  }, "Reenviar c\xF3digo")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 text-center mb-3"
  }, "Demo: ingresa 1 2 3 4 5 6 para validar"), /*#__PURE__*/React.createElement("button", {
    onClick: validar,
    disabled: otp.join('').length < 6 || intentos <= 0,
    className: `w-full py-2 rounded text-sm font-semibold ${otp.join('').length < 6 || intentos <= 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "Validar c\xF3digo"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "OTP: TTL = 5 min. M\xE1x 3 intentos. Cooldown 60s entre reenv\xEDos. Invalida tras expiraci\xF3n."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Canal definitivo (SMS/correo/WhatsApp): confirmar con MAF. WhatsApp requiere acuerdo proveedor."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Plantillas de mensaje OTP: requieren aprobaci\xF3n legal antes de implementar."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P21 — ENVÍO DOCUMENTOS NORMATIVOS
// ═══════════════════════════════════════════════════════════════════════════
function P21Docs() {
  const {
    navigate
  } = useContext(AppContext);
  const [enviado, setEnviado] = useState(false);
  const [canal, setCanal] = useState('correo');
  const [progreso, setProgreso] = useState([false, false, false, false, false, false]);
  const docs = ['Contrato Modelo FC', 'Tarifario de Comisiones', 'Cartilla Informativa', 'Calendario de Asambleas', 'DDJJ Ingresos (borrador)', 'Política de Privacidad de Datos ⚡'];
  const enviarDocs = () => {
    docs.forEach((_, i) => setTimeout(() => setProgreso(p => {
      const n = [...p];
      n[i] = true;
      return n;
    }), i * 400 + 400));
    setTimeout(() => setEnviado(true), docs.length * 400 + 400);
  };
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/sale/docs",
    pipeline: 3
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P21 \u2014 Env\xEDo Documentos Normativos"), enviado ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3"
  }, "\u2713"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-gray-900 mb-1"
  }, "Documentos enviados correctamente"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-1"
  }, "Entrega registrada: 12/03/2026 11:45:23"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mb-4"
  }, "El cliente recibir\xE1 los documentos por ", canal), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/scan'),
    className: "bg-gray-800 text-white px-6 py-2 rounded text-sm font-semibold"
  }, "Continuar \u2192")) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Documentos a enviar"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-4"
  }, docs.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d,
    className: "flex items-center gap-3 border border-gray-200 rounded p-3"
  }, progreso[i] ? /*#__PURE__*/React.createElement("span", {
    className: "text-gray-700 w-5 text-center"
  }, "\u2713") : /*#__PURE__*/React.createElement("div", {
    className: "w-5 h-5 border-2 border-gray-300 rounded-full"
  }), /*#__PURE__*/React.createElement("span", {
    className: `text-sm ${progreso[i] ? 'text-gray-700 font-medium' : 'text-gray-500'}`
  }, "\uD83D\uDCC4 ", d)))), /*#__PURE__*/React.createElement(ChannelSelector, {
    value: canal,
    onChange: setCanal,
    className: "mb-4"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: enviarDocs,
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Enviar todos los documentos")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Son 6 documentos totales. El 6to es 'Pol\xEDtica de Privacidad de Datos' (RF-011)."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "PENDIENTE: \xBFEl OTP cubre la aceptaci\xF3n de la Pol\xEDtica de Privacidad o debe ir como doc separado?"
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    id: "AG6",
    text: "Plantillas de 6 documentos normativos: aprobaci\xF3n legal BLOQUEANTE para implementaci\xF3n."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P22 — CAPTURA DNI
// ═══════════════════════════════════════════════════════════════════════════
function P22ScanDNI() {
  const {
    navigate
  } = useContext(AppContext);
  const [anverso, setAnverso] = useState(null);
  const [reverso, setReverso] = useState(null);
  const DropZone = ({
    label,
    file,
    onSet
  }) => /*#__PURE__*/React.createElement("div", {
    className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer",
    onClick: () => onSet({
      name: `DNI_${label.toLowerCase()}.jpg`,
      size: '2.3 MB'
    })
  }, file ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-200 border border-gray-300 rounded mx-auto mb-2 flex items-center justify-center text-gray-500 text-xs",
    style: {
      width: 120,
      height: 75
    }
  }, "[Imagen DNI]"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-medium text-gray-700"
  }, "\uD83D\uDCF7 ", file.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500"
  }, file.size, " \xB7 L\xEDmite 5MB"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-600 mt-1"
  }, "\u2713 JPG ", file.size, " \u2014 Formato v\xE1lido")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-2xl mb-2"
  }, "\uD83D\uDCF7"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 font-medium"
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1"
  }, "Tomar foto o seleccionar archivo"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "JPG/PNG \xB7 m\xE1x 5MB"), /*#__PURE__*/React.createElement("button", {
    className: "mt-2 text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "\uD83D\uDCF7 Tomar foto"), /*#__PURE__*/React.createElement("span", {
    className: "mx-1 text-xs text-gray-300"
  }, "|"), /*#__PURE__*/React.createElement("button", {
    className: "text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "\uD83D\uDCC1 Seleccionar")));
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/sale/scan",
    pipeline: 3
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P22 \u2014 Captura de DNI \u26A1"), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-xs text-blue-800"
  }, "Esta captura es ", /*#__PURE__*/React.createElement("strong", null, "OPCIONAL"), " en este paso (solo se necesita el n\xFAmero de doc para Kashio). Es ", /*#__PURE__*/React.createElement("strong", null, "OBLIGATORIA"), " antes de disparar la firma Keynua."), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mb-4"
  }, "Adjunta una foto clara del DNI del cliente. El archivo se almacenar\xE1 con retenci\xF3n legal de 5 a\xF1os."), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Anverso (frente) ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement(DropZone, {
    label: "Anverso",
    file: anverso,
    onSet: setAnverso
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Reverso (dorso)"), /*#__PURE__*/React.createElement(DropZone, {
    label: "Reverso",
    file: reverso,
    onSet: setReverso
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/sale/payment'),
    className: "w-full py-2 rounded text-sm font-semibold bg-gray-800 text-white hover:bg-gray-700"
  }, "Continuar ", !anverso ? '(sin foto — OPCIONAL)' : '→'), !anverso && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 text-center mt-1"
  }, "La foto se solicitar\xE1 obligatoriamente antes de Keynua si no se captura aqu\xED.")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "N6/N8 (10-abr): OPCIONAL para orden de pago Kashio. OBLIGATORIA antes de Keynua. El asesor puede pagar sin foto."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Archivos almacenados en S3 con Object Lock WORM. Retenci\xF3n m\xEDnima 5 a\xF1os (regulaci\xF3n SBS)."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "RF-012: \xBFMAF/Operaciones acepta que la foto llegue despu\xE9s del pago pero antes de Keynua? Confirmar."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P23 — ORDEN DE PAGO
// ═══════════════════════════════════════════════════════════════════════════
function P23Payment() {
  // 🟡 CAMBIO 12-06-2026: CIA 4%, modalidades pago (total/parcial), vigencia 48h, notificaciones
  const {
    navigate,
    demoState,
    setDemoState
  } = useContext(AppContext);
  const [estado, setEstado] = useState(demoState.plaftEnConsulta ? 'bloqueado_plaft' : 'inicial');
  const [montoCompleto, setMontoCompleto] = useState(true);
  const [montoParcial, setMontoParcial] = useState('');

  // Código Kashio: número documento + prefijo "PC" (N9/N14/RN-012)
  const docNum = '45678901';
  const codigoKashio = `${docNum}PC`;

  // 🟡 NUEVO: Cálculo de CIA (4% del valor de cuota) — RF-PAGO-CIA
  const inscripcionBase = demoState.totalMontoUSD > 0 ? demoState.totalMontoUSD * 0.05 : 652; // inscripción ~5%
  const CIA = inscripcionBase * 0.04; // 4% de la inscripción
  const montoTotal = inscripcionBase + CIA; // Total con CIA incluida

  const montoOrden = montoCompleto ? montoTotal : parseFloat(montoParcial) || 0;

  // 🟡 NUEVO: Fecha de vencimiento 48h desde generación
  const fechaVencimiento = new Date();
  fechaVencimiento.setHours(fechaVencimiento.getHours() + 48);
  const fechaVencStr = fechaVencimiento.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/sale/payment",
    pipeline: 4
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-1"
  }, "P23 \u2014 Orden de Pago Kashio \u26A1"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-4"
  }, "Integraci\xF3n directa con Kashio (correcci\xF3n cr\xEDtica N9 \u2014 cuota 1 e inscripci\xF3n)"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, [{
    k: 'inicial',
    l: 'Generar'
  }, {
    k: 'generada',
    l: 'Generada'
  }, {
    k: 'pago_cuenta',
    l: 'Pago a cuenta'
  }, {
    k: 'error_kashio',
    l: 'Error Kashio'
  }, {
    k: 'bloqueado_plaft',
    l: 'Bloqueado PLAFT'
  }].map(e => /*#__PURE__*/React.createElement("button", {
    key: e.k,
    onClick: () => setEstado(e.k),
    className: `text-xs px-3 py-1 rounded border ${estado === e.k ? 'bg-gray-200 border-gray-400 font-semibold' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`
  }, "[ Demo: ", e.l, " ]"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, estado === 'inicial' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm space-y-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700 mb-2"
  }, "Resumen del pago"), [['Cliente', 'Carlos Alberto Mendoza'], ['Código Kashio', codigoKashio], ['🟡 Concepto 1: 1ª Cuota', `USD ${inscripcionBase.toFixed(2)}`], ['🟡 Concepto 2: CIA (4%)', `USD ${CIA.toFixed(2)}`], ['Monto total (2 conceptos)', `USD ${montoTotal.toFixed(2)}`]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, k, ":"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium font-mono text-gray-800"
  }, v))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 pt-1"
  }, "C\xF3digo = N\xB0 doc + \"PC\" (generado por la plataforma, no por Kashio)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 pt-1"
  }, "\uD83D\uDFE1 18/06: Solo 2 conceptos \u2014 Cuota 1 y CIA (4%). La cuota de inscripci\xF3n es b\xE1sicamente la CIA.")), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 border border-dashed border-gray-300 rounded"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Modalidad de pago"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: `flex-1 flex items-center gap-2 text-sm border rounded px-3 py-2 cursor-pointer ${montoCompleto ? 'border-gray-800 bg-gray-100 font-medium' : 'border-gray-200'}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    checked: montoCompleto,
    onChange: () => setMontoCompleto(true)
  }), " Pago Total (100%)"), /*#__PURE__*/React.createElement("label", {
    className: `flex-1 flex items-center gap-2 text-sm border rounded px-3 py-2 cursor-pointer ${!montoCompleto ? 'border-gray-800 bg-gray-100 font-medium' : 'border-gray-200'}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    checked: !montoCompleto,
    onChange: () => setMontoCompleto(false)
  }), " Pago Parcial")), !montoCompleto && /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-1"
  }, "Pago Parcial: \uD83D\uDFE1 Cuota 1 \xEDntegra obligatoria + CIA desde 1 USD (m\xE1x. 4 letras)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: montoParcial,
    onChange: e => setMontoParcial(e.target.value),
    placeholder: `Monto parcial (ejemplo: ${(montoTotal * 0.15).toFixed(2)})`,
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "note bg-yellow-50 border-l-4 border-yellow-400 mt-2 text-xs text-yellow-800"
  }, "\u26A0 Pago Parcial: el flujo completo (Keynua, contrato) se activa solo cuando el pago total est\xE9 completo."), /*#__PURE__*/React.createElement("div", {
    className: "p-2 bg-blue-50 border border-blue-200 rounded mt-2 text-xs text-blue-800"
  }, "\uD83D\uDFE1 18/06: Cuota 1 se debe pagar \xEDntegra obligatoriamente. La CIA puede pagarse desde 1 USD sin m\xEDnimo."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEstado(montoCompleto ? 'generada' : 'pago_cuenta'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Generar orden en Kashio \u2192")), estado === 'generada' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-300 rounded mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Orden generada en Kashio"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 space-y-1 text-sm"
  }, [['Código Kashio', codigoKashio], ['N° orden Kashio', 'KSH-2026-004821'], ['Monto', `USD ${montoTotal.toFixed(2)}`], ['🟡 Válido hasta', fechaVencStr + ' (48h)']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-xs"
  }, k, ":"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium font-mono text-xs"
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-gray-500 text-xs",
    style: {
      width: 90,
      height: 90
    }
  }, "QR Pago")), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 p-2 bg-white border border-gray-200 rounded text-xs text-gray-400"
  }, "Canal bancario: BCP (SPSP) \xB7 Contrato de recaudaci\xF3n requerido (2\u20133 sem. tr\xE1mite)"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700"
  }, "\uD83D\uDFE1 ", /*#__PURE__*/React.createElement("strong", null, "Vencimiento 48h:"), " Si el cliente no confirma el pago dentro de 48 horas, la orden se invalida autom\xE1ticamente y deber\xE1s generar una nueva.")), /*#__PURE__*/React.createElement("div", {
    className: "mb-3 p-2 bg-green-50 border border-green-200 rounded text-xs text-green-700"
  }, "\u2705 ", /*#__PURE__*/React.createElement("strong", null, "Notificaciones enviadas:"), " Asesor, Supervisor y Cliente han sido notificados de la orden generada."), /*#__PURE__*/React.createElement("div", {
    className: "mb-3 flex items-center gap-2 text-sm text-gray-600"
  }, /*#__PURE__*/React.createElement("span", {
    className: "animate-pulse-custom"
  }, "\u23F3"), " Esperando confirmaci\xF3n de pago"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "Reenviar orden al cliente (correo/WhatsApp/SMS)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDemoState(s => ({
        ...s,
        paymentConfirmed: true
      }));
      navigate('/close/keynua');
    },
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "[ Demo ] Simular pago confirmado \u2014 Continuar a firma \u2192"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500"
  }, "\uD83D\uDFE1 ", /*#__PURE__*/React.createElement("strong", null, "Notificaci\xF3n autom\xE1tica al confirmar pago:"), " El sistema notificar\xE1 autom\xE1ticamente a Asesor, Supervisor y Cliente cuando reciba el webhook de confirmaci\xF3n de pago desde Kashio."))), estado === 'pago_cuenta' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-yellow-50 border border-yellow-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-2"
  }, "\u23F3"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-gray-900"
  }, "Pago a cuenta registrado"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, "Monto parcial: USD ", montoParcial || '—'), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600"
  }, "Saldo pendiente: USD ", (montoTotal - (parseFloat(montoParcial) || 0)).toFixed(2))), /*#__PURE__*/React.createElement("button", {
    disabled: true,
    className: "w-full bg-gray-100 text-gray-400 py-2 rounded text-sm font-semibold cursor-not-allowed mb-2"
  }, "Firma Keynua bloqueada (pago incompleto)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 text-center"
  }, "Keynua se activa solo cuando el pago total est\xE9 confirmado (RN-013).")), estado === 'error_kashio' && /*#__PURE__*/React.createElement("div", {
    className: "text-center py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-3"
  }, "\u26A0"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-gray-700 mb-1"
  }, "Error al conectar con Kashio"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-4"
  }, "El servicio no respondi\xF3. No se generaron \xF3rdenes duplicadas."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEstado('inicial'),
    className: "bg-gray-700 text-white px-6 py-2 rounded text-sm font-semibold"
  }, "Reintentar")), estado === 'bloqueado_plaft' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-4 bg-yellow-50 border border-yellow-300 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl mb-2"
  }, "\u23F3"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-gray-900"
  }, "Orden de pago bloqueada"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-600 mt-1"
  }, "Hay una revisi\xF3n de cumplimiento pendiente con el analista.")), /*#__PURE__*/React.createElement("button", {
    disabled: true,
    className: "w-full bg-gray-100 text-gray-400 py-2 rounded text-sm font-semibold cursor-not-allowed mb-2"
  }, "Generar orden de pago"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 text-center"
  }, "El bloqueo se levanta autom\xE1ticamente cuando el Oficial resuelva el caso."))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "CORRECCI\xD3N CR\xCDTICA: La plataforma integra Kashio DIRECTAMENTE para cuota 1 e inscripci\xF3n. NewCon\u2194Kashio aplica solo desde cuota 2."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RN-012: C\xF3digo pago Kashio = n\xFAmero_documento + 'PC'. Lo genera la plataforma, no Kashio. Para PJ: usa RUC. Para CE: usa N\xB0 carnet."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 RF-PAGO-CIA: CIA = 4% del valor de la cuota de inscripci\xF3n, calculado autom\xE1ticamente desde NewCon. El asesor no puede modificar este valor."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 RF-PAGO-MOD: Modalidades de pago \u2014 Total (100%) o Parcial (1\xAA cuota + CIA). M\xE1ximo 4 letras permitidas en pago parcial."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 RF-013 / RF-PAGO-MOD: Vencimiento 48h desde generaci\xF3n. Si el cliente no confirma el pago, la orden se invalida autom\xE1ticamente."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 RF-NOT: Notificaciones autom\xE1ticas a Asesor, Supervisor y Cliente en: (1) generaci\xF3n de orden, (2) confirmaci\xF3n de pago (webhook Kashio)."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RN-013: Pago Parcial permitido. Keynua y contrato se activan solo cuando el pago total est\xE9 completo."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-03: CTA bloqueado si hay caso PLAFT 'Consultar' pendiente de resoluci\xF3n por el Oficial."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "R-01 Kashio: Sin sandbox disponible. Integrar contra producci\xF3n genera \xF3rdenes reales con impacto en clientes."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Confirmaci\xF3n de pago autom\xE1tica (Fase 1 nice-to-have): \xBFwebhook de Kashio o confirmaci\xF3n manual del asesor?"
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P25 — FIRMA KEYNUA
// ═══════════════════════════════════════════════════════════════════════════
function CuentaDevolucion() {
  const [tipo, setTipo] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, [{
    k: 'cheque',
    l: 'Cheque'
  }, {
    k: 'cuenta',
    l: 'Cuenta bancaria (USD)'
  }].map(o => /*#__PURE__*/React.createElement("label", {
    key: o.k,
    className: `flex items-center gap-2 text-sm border rounded px-3 py-2 cursor-pointer flex-1 ${tipo === o.k ? 'border-gray-700 bg-gray-50 font-semibold' : 'border-gray-200'}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "cuentadev",
    checked: tipo === o.k,
    onChange: () => setTipo(o.k),
    className: "accent-gray-700"
  }), " ", o.l))), tipo === 'cuenta' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "Banco ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ej. BCP, BBVA, Interbank",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-700 mb-1"
  }, "N\xB0 de cuenta en USD ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "N\xFAmero de cuenta bancaria",
    className: "w-full text-sm border border-gray-300 rounded px-3 py-2"
  }))));
}
function P25Keynua() {
  // 🟡 CAMBIO 12-06-2026: Notificaciones automáticas a asesor, supervisor y cliente
  const {
    navigate,
    demoState,
    setDemoState
  } = useContext(AppContext);
  const [simPago, setSimPago] = useState(demoState.paymentConfirmed);
  const [linkEnviado, setLinkEnviado] = useState(false);
  const [canal, setCanal] = useState('correo');
  const [simFirma, setSimFirma] = useState('');
  const [coTitActivo, setCoTitActivo] = useState(false);
  const pagoConfirmado = simPago || demoState.paymentConfirmed;
  useEffect(() => {
    if (simPago) setDemoState(s => ({
      ...s,
      paymentConfirmed: true
    }));
  }, [simPago]);
  const prereqs = [{
    label: 'OTP validado',
    ok: demoState.otpValidated
  }, {
    label: 'Documentos enviados',
    ok: true
  }, {
    label: 'DNI adjunto',
    ok: true
  }, {
    label: 'Pago confirmado',
    ok: pagoConfirmado
  }];
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/close/keynua",
    pipeline: 5
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P25 \u2014 Disparo Firma Biom\xE9trica Keynua"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Prerrequisitos"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-4"
  }, prereqs.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.label,
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: p.ok ? 'text-gray-700' : 'text-gray-300'
  }, p.ok ? '✓' : '⏳'), /*#__PURE__*/React.createElement("span", {
    className: p.ok ? 'text-gray-700' : 'text-gray-400'
  }, p.label)))), !pagoConfirmado && /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Simular pago confirmado",
    value: simPago,
    onChange: setSimPago
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Documentos a firmar"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 mb-4"
  }, ['Contrato FC', 'Tarifario', 'Proforma', 'DDJJ Final'].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    className: "flex items-center gap-2 text-sm border border-gray-200 rounded px-3 py-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "\uD83D\uDCC4"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-700"
  }, d)))), /*#__PURE__*/React.createElement("div", {
    className: "mb-4 pt-4 border-t border-gray-200"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-2"
  }, "Cuenta de Devoluci\xF3n"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-3"
  }, "En caso de devoluci\xF3n de dinero, \xBFc\xF3mo prefiere recibirlo?"), /*#__PURE__*/React.createElement(CuentaDevolucion, null)), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Activar co-titularidad",
    value: coTitActivo,
    onChange: setCoTitActivo
  })), coTitActivo && /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm border border-gray-200 rounded px-3 py-2 mb-2 bg-gray-50"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-700"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-700"
  }, "Firma co-titular (titular 2)")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800"
  }, "Este contrato tiene co-titularidad. Ambas firmas son obligatorias. El link de Keynua se enviar\xE1 a ambos titulares.")), /*#__PURE__*/React.createElement(ChannelSelector, {
    value: canal,
    onChange: setCanal,
    label: "Canal de env\xEDo del link",
    className: "mb-4"
  }), !linkEnviado ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setLinkEnviado(true),
    disabled: !pagoConfirmado,
    className: `w-full py-2 rounded text-sm font-semibold ${!pagoConfirmado ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "Iniciar firma biom\xE9trica \u2192") : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-green-50 border border-green-200 rounded mb-2 text-xs text-green-700"
  }, "\u2705 ", /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDFE1 Notificaciones enviadas:"), " Asesor, Supervisor y Cliente han sido notificados del env\xEDo del link de firma Keynua."), /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded mb-3 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "animate-pulse-custom text-gray-500"
  }, "\u23F3"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-700"
  }, "\u2709 Link enviado. Esperando validaci\xF3n biom\xE9trica...")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "actualizando cada 30 segundos...")), /*#__PURE__*/React.createElement("button", {
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50 mb-3"
  }, "Reenviar link"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Firma completada",
    value: simFirma === 'ok',
    onChange: v => {
      setSimFirma(v ? 'ok' : '');
      if (v) {
        setDemoState(s => ({
          ...s,
          signatureCompleted: true
        }));
        navigate('/close/contract');
      }
    }
  }), /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Fallo biom\xE9trico",
    value: simFirma === 'fail',
    onChange: v => setSimFirma(v ? 'fail' : '')
  })), simFirma === 'ok' && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-3 bg-green-50 border border-green-200 rounded text-xs text-green-700"
  }, "\u2705 ", /*#__PURE__*/React.createElement("strong", null, "\uD83D\uDFE1 Notificaciones de contrato confirmado:"), " Asesor, Supervisor y Cliente han sido notificados de la firma exitosa."), simFirma === 'fail' && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 p-3 bg-gray-100 border border-gray-300 rounded text-sm text-gray-700"
  }, "\u26A0 Fallo en validaci\xF3n biom\xE9trica del cliente. Protocolo de acci\xF3n pendiente de definir con MAF."))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Bot\xF3n BLOQUEADO hasta pago confirmado (HU-023 ESC-5). Sin excepciones."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "\uD83D\uDFE1 RF-NOT: Notificaciones autom\xE1ticas a Asesor, Supervisor y Cliente al: (1) enviar link Keynua, (2) confirmar firma biom\xE9trica exitosa."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "Confirmaci\xF3n de pago Fase 1: mecanismo exacto sin definir con \xE1rea de operaciones."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    id: "Dev P2",
    text: "CR\xCDTICO: Protocolo para biometr\xEDa fallida post-pago no tiene definici\xF3n de MAF. Bloquea implementaci\xF3n."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-05: Ambos titulares reciben el link de firma. El contrato solo avanza cuando AMBAS firmas biom\xE9tricas est\xE1n completadas."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "C-05 PENDIENTE: \xBFAmbos firman en la misma sesi\xF3n o sesiones independientes? \xBFQu\xE9 ocurre si uno firma y el otro no?"
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P27 — N° CONTRATO + VACANTE
// ═══════════════════════════════════════════════════════════════════════════
function P27Contract() {
  const {
    navigate
  } = useContext(AppContext);
  const [coTitActivo, setCoTitActivo] = useState(false);
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/close/contract",
    pipeline: 6
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P27 \u2014 N\xB0 Contrato + Separaci\xF3n de Vacante"), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 bg-gray-50 border border-gray-200 rounded mb-4 text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u2713"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-gray-900 mt-1"
  }, "Firma biom\xE9trica completada exitosamente"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-0.5"
  }, "12/03/2026 14:23:07 \u2014 Firmado por cliente v\xEDa Keynua")), /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-200 rounded p-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Datos del contrato (generados por NewCon)"), /*#__PURE__*/React.createElement(FormField, {
    label: "N\xB0 Contrato",
    readOnly: true,
    value: "FC-2026-004821"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "N\xB0 Vacante",
    readOnly: true,
    value: "GRP-A-047"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-sm mt-2"
  }, [['Grupo', 'Grupo Alpha 2026'], ['Monto', 'USD 20,000'], ['Cliente', 'Carlos Mendoza'], ['Fecha inicio', '01/04/2026']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, k), /*#__PURE__*/React.createElement("p", {
    className: "font-medium"
  }, v))))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Activar co-titularidad",
    value: coTitActivo,
    onChange: setCoTitActivo
  })), coTitActivo && /*#__PURE__*/React.createElement("div", {
    className: "border border-gray-200 rounded p-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Datos co-titular (generados por NewCon)"), /*#__PURE__*/React.createElement(FormField, {
    label: "N\xB0 Contrato Co-titular",
    readOnly: true,
    value: "FC-2026-004822"
  }), /*#__PURE__*/React.createElement(FormField, {
    label: "N\xB0 Vacante Co-titular",
    readOnly: true,
    value: "GRP-A-048"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-06: Cada certificado combinado genera su propio contrato y vacante independiente en NewCon."
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Resumen del expediente"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 mb-4"
  }, ['✓ DDJJ firmada digitalmente', '✓ DNI escaneado (anverso + reverso)', '✓ Contrato firmado en Keynua', '✓ Proforma aceptada', '✓ Tarifario entregado'].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    className: "text-sm text-gray-700 py-0.5"
  }, d))), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/close/send'),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Enviar expediente a Operaciones \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "N\xB0 Contrato y Vacante: SOLO generados por NewCon. No modificables (RN-011)."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "C-10 / GAP-6 CERRADO: La separaci\xF3n de vacante es AUTOM\xC1TICA v\xEDa API post-webhook de Keynua. Operaciones NO interviene en este paso. Solo valida el expediente documental en P30."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P28 — ENVÍO EXPEDIENTE A OPERACIONES
// ═══════════════════════════════════════════════════════════════════════════
function P28SendExpedient() {
  const {
    navigate,
    setDemoState
  } = useContext(AppContext);
  const [incompleto, setIncompleto] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [previsualizando, setPrevisualizando] = useState(false);
  const [comentario, setComentario] = useState('');
  const docs = [{
    label: 'DDJJ de Ingresos firmada (Keynua)',
    ok: true
  }, {
    label: 'DNI escaneado (anverso)',
    ok: true
  }, {
    label: 'Contrato firmado biométricamente (Keynua)',
    ok: true
  }, {
    label: 'Proforma del certificado',
    ok: true
  }, {
    label: 'Tarifario de comisiones',
    ok: !incompleto
  }, {
    label: 'Política de Privacidad (aceptación OTP) ⚡',
    ok: !incompleto
  }];
  const allOk = docs.every(d => d.ok);
  const okCount = docs.filter(d => d.ok).length;
  const enviar = () => {
    setEnviado(true);
    setDemoState(s => ({
      ...s,
      expedienteSent: true
    }));
  };
  if (previsualizando) return /*#__PURE__*/React.createElement(Screen, {
    path: "/close/send",
    pipeline: 6
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setPrevisualizando(false),
    className: "text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "\u2190 Volver"), /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Vista previa del expediente")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Expediente \u2014 Carlos Alberto Mendoza R\xEDos"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, docs.filter(d => d.ok).map(d => /*#__PURE__*/React.createElement("div", {
    key: d.label,
    className: "flex items-center justify-between border border-gray-200 rounded p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-600"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-gray-700"
  }, d.label)), /*#__PURE__*/React.createElement("button", {
    className: "text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5 hover:bg-gray-50"
  }, "\uD83D\uDC41 Ver")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500 space-y-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "N\xB0 Contrato:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium"
  }, "FC-2026-004821")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "N\xB0 Vacante:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-medium"
  }, "VAC-G045-0127")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "Fecha firma:"), /*#__PURE__*/React.createElement("span", null, "16/04/2026 14:33")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPrevisualizando(false),
    className: "w-full bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "Confirmar y volver al env\xEDo \u2192")));
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/close/send",
    pipeline: 6
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-1"
  }, "P28 \u2014 Env\xEDo Expediente a Operaciones \u26A1"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mb-4"
  }, "Checklist bloqueante \u2014 El bot\xF3n de env\xEDo se habilita solo cuando todos los documentos est\xE9n presentes (N11/RF-017)"), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement(DemoToggle, {
    label: "Simular documentos faltantes",
    value: incompleto,
    onChange: setIncompleto
  })), enviado ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3"
  }, "\u2713"), /*#__PURE__*/React.createElement("p", {
    className: "font-bold text-gray-900 mb-1"
  }, "Expediente enviado a Operaciones"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-1"
  }, "Alerta autom\xE1tica generada. El equipo de Operaciones fue notificado."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mb-4"
  }, "El asesor NO redacta correo \u2014 env\xEDo y alerta son 100% autom\xE1ticos."), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/close/ops'),
    className: "text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "Ver panel Operaciones \u2192")) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase"
  }, "Checklist del expediente"), /*#__PURE__*/React.createElement("span", {
    className: `text-xs font-bold px-2 py-0.5 rounded ${allOk ? 'bg-gray-200 text-gray-700' : 'bg-red-100 text-red-700'}`
  }, okCount, "/", docs.length, " documentos")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2 mb-4"
  }, docs.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.label,
    className: `flex items-center gap-3 border rounded p-2.5 ${d.ok ? 'border-gray-200 bg-white' : 'border-red-200 bg-red-50'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: `text-sm flex-shrink-0 ${d.ok ? 'text-gray-600' : 'text-red-500'}`
  }, d.ok ? '✓' : '✗'), /*#__PURE__*/React.createElement("span", {
    className: `text-sm flex-1 ${d.ok ? 'text-gray-700' : 'text-red-600 font-medium'}`
  }, d.label), d.ok ? /*#__PURE__*/React.createElement("button", {
    className: "text-xs text-gray-400 border border-gray-200 rounded px-2 py-0.5 hover:bg-gray-50 flex-shrink-0"
  }, "\uD83D\uDC41 Ver") : /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-red-400 flex-shrink-0"
  }, "Faltante")))), !allOk && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700"
  }, "\u26A0 Faltan ", docs.length - okCount, " documento(s). El env\xEDo est\xE1 bloqueado hasta completar el checklist."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPrevisualizando(true),
    className: "w-full border border-gray-300 rounded py-2 text-sm text-gray-600 hover:bg-gray-50 mb-3"
  }, "\uD83D\uDC41 Previsualizar expediente completo"), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Comentarios para Operaciones (opcional)"), /*#__PURE__*/React.createElement("textarea", {
    value: comentario,
    onChange: e => setComentario(e.target.value),
    rows: 2,
    className: "w-full border border-gray-300 rounded p-2 text-sm resize-none",
    placeholder: "Notas adicionales..."
  })), /*#__PURE__*/React.createElement("button", {
    onClick: enviar,
    disabled: !allOk,
    className: `w-full py-2.5 rounded text-sm font-semibold ${!allOk ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, allOk ? 'Enviar expediente a Operaciones →' : 'Envío bloqueado — checklist incompleto')), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "N11/RF-017 (10-abr): Checklist BLOQUEANTE. Si falta un doc, el bot\xF3n queda deshabilitado. El asesor debe previsualizar antes de enviar."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Env\xEDo autom\xE1tico: la alerta a Operaciones se genera sin que el asesor redacte correo manual."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "GAP-11: Si Operaciones rechaza y el asesor reenv\xEDa corregido, \xBFse usa el mismo N\xB0 contrato o NewCon genera uno nuevo?"
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P29/P30 — PANEL OPERACIONES
// ═══════════════════════════════════════════════════════════════════════════
function P29Ops() {
  const {
    navigate
  } = useContext(AppContext);
  const [vista, setVista] = useState('lista'); // lista | revision
  const [motivo, setMotivo] = useState('');
  const expedientes = [{
    id: 1,
    cliente: 'Carlos Mendoza',
    contrato: 'FC-2026-004821',
    asesor: 'M. López',
    fecha: '12/03/2026',
    sla: '🟢 36h'
  }, {
    id: 2,
    cliente: 'Ana Torres',
    contrato: 'FC-2026-004820',
    asesor: 'J. García',
    fecha: '11/03/2026',
    sla: '🟡 8h'
  }, {
    id: 3,
    cliente: 'Empresa ABC',
    contrato: 'FC-2026-004819',
    asesor: 'L. Torres',
    fecha: '10/03/2026',
    sla: '🔴 VENCIDO'
  }, {
    id: 4,
    cliente: 'Roberto Sánchez',
    contrato: 'FC-2026-004818',
    asesor: 'C. Reyes',
    fecha: '10/03/2026',
    sla: '🟢 48h'
  }];
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/close/ops",
    pipeline: 6
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, vista === 'lista' ? 'P29 — Panel Operaciones' : 'P30 — Revisión Expediente'), vista === 'revision' && /*#__PURE__*/React.createElement("button", {
    onClick: () => setVista('lista'),
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
  }, "\u2190 Lista")), vista === 'lista' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bg-gray-200 text-gray-800 text-xs font-bold px-3 py-1 rounded"
  }, expedientes.length, " expedientes pendientes")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("tr", null, ['Cliente', 'N° Contrato', 'Asesor', 'Fecha envío', 'SLA', 'Acción'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "text-left text-xs font-semibold text-gray-500 px-4 py-3"
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, expedientes.map(e => /*#__PURE__*/React.createElement("tr", {
    key: e.id,
    className: "border-b border-gray-100 hover:bg-gray-50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 font-medium"
  }, e.cliente), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-xs text-gray-500"
  }, e.contrato), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-xs text-gray-500"
  }, e.asesor), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-xs text-gray-500"
  }, e.fecha), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3 text-xs"
  }, e.sla), /*#__PURE__*/React.createElement("td", {
    className: "px-4 py-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setVista('revision'),
    className: "text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50"
  }, "Revisar \u2192"))))))))), vista === 'revision' && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Checklist de validaci\xF3n"), [{
    l: 'DNI vigente y legible',
    ok: true
  }, {
    l: 'Estado civil coincide',
    ok: true
  }, {
    l: 'Poderes vigentes (jurídicos)',
    ok: false
  }].map(item => /*#__PURE__*/React.createElement("div", {
    key: item.l,
    className: `flex items-center gap-3 border rounded p-3 mb-2 ${item.ok ? 'border-gray-200' : 'border-red-200 bg-red-50'}`
  }, /*#__PURE__*/React.createElement("span", {
    className: item.ok ? 'text-gray-700' : 'text-red-500'
  }, item.ok ? '✓' : '✗'), /*#__PURE__*/React.createElement("span", {
    className: `text-sm ${item.ok ? 'text-gray-700' : 'text-red-600'}`
  }, item.l))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Motivo de rechazo (requerido si rechaza)"), /*#__PURE__*/React.createElement("textarea", {
    value: motivo,
    onChange: e => setMotivo(e.target.value),
    rows: 3,
    className: "w-full border border-gray-300 rounded p-2 text-sm resize-none",
    placeholder: "Describe el motivo del rechazo..."
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Documentos del expediente"), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-gray-500 text-sm mb-3",
    style: {
      height: 160
    }
  }, "\uD83D\uDCC4 Visor de documentos"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-3 text-xs"
  }, ['DNI', 'Contrato', 'Proforma', 'DDJJ'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/close/send'),
    disabled: !motivo,
    className: `flex-1 py-2 rounded text-sm font-semibold border ${!motivo ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-400 text-gray-700 hover:bg-gray-50'}`
  }, "\u2717 Rechazar con motivo"), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/close/welcome'),
    className: "flex-1 bg-gray-800 text-white py-2 rounded text-sm font-semibold hover:bg-gray-700"
  }, "\u2713 Aprobar expediente")))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "SLA Operaciones: confirmar con MAF. Sugerido: 24-48h h\xE1biles con escalamiento autom\xE1tico."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "\xBFSe notifica al cliente cuando Operaciones rechaza el expediente? Flujo sin definir."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// P31 — LLAMADA DE BIENVENIDA
// ═══════════════════════════════════════════════════════════════════════════
function P31Welcome() {
  const {
    navigate
  } = useContext(AppContext);
  const [resultado, setResultado] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [cerrado, setCerrado] = useState(false);
  const [fechaReintento, setFechaReintento] = useState('');
  const registrar = () => {
    if (resultado) setCerrado(true);
  };
  return /*#__PURE__*/React.createElement(Screen, {
    path: "/close/welcome",
    pipeline: 6
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-lg mx-auto"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900 mb-4"
  }, "P31 \u2014 Llamada de Bienvenida"), cerrado ? /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-5xl mb-3"
  }, "\uD83C\uDFC1"), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-bold text-gray-900 mb-1"
  }, "CONTRATO CERRADO"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-600 mb-1"
  }, "El proceso de venta ha finalizado exitosamente."), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 mb-4"
  }, "N\xB0 Contrato: FC-2026-004821 \xB7 Carlos Mendoza"), /*#__PURE__*/React.createElement(StatusBadge, {
    status: "CERRADO"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('/dashboard'),
    className: "border border-gray-300 rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
  }, "\u2190 Volver al dashboard"))) : /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 p-3 bg-gray-50 border border-gray-200 rounded text-sm"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-1"
  }, "Datos del nuevo asociado"), [['Nombre', 'Carlos Alberto Mendoza Ríos'], ['N° Contrato', 'FC-2026-004821'], ['Grupo', 'Grupo Alpha 2026'], ['Cuota mensual', 'USD 652.00']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "flex justify-between py-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, k, ":"), /*#__PURE__*/React.createElement("span", {
    className: "font-medium text-gray-800"
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Resultado de la llamada ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    value: resultado,
    onChange: e => setResultado(e.target.value),
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Seleccionar resultado..."), /*#__PURE__*/React.createElement("option", {
    value: "contactado"
  }, "\u2713 Contactado exitosamente"), /*#__PURE__*/React.createElement("option", {
    value: "no_contesta"
  }, "No contesta"), /*#__PURE__*/React.createElement("option", {
    value: "incorrecto"
  }, "N\xFAmero incorrecto"), /*#__PURE__*/React.createElement("option", {
    value: "otro"
  }, "Otro"))), /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Fecha y hora de la llamada ", /*#__PURE__*/React.createElement("span", {
    className: "text-red-500"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm",
    defaultValue: "2026-03-12T14:30"
  })), resultado === 'no_contesta' && /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Programar siguiente intento"), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    value: fechaReintento,
    onChange: e => setFechaReintento(e.target.value),
    className: "w-full border border-gray-300 rounded px-3 py-2 text-sm"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-semibold text-gray-600 mb-1"
  }, "Observaciones"), /*#__PURE__*/React.createElement("textarea", {
    value: observaciones,
    onChange: e => setObservaciones(e.target.value),
    rows: 3,
    className: "w-full border border-gray-300 rounded p-2 text-sm resize-none",
    placeholder: "Observaciones del resultado de la llamada..."
  })), /*#__PURE__*/React.createElement("button", {
    onClick: registrar,
    disabled: !resultado,
    className: `w-full py-2 rounded text-sm font-semibold ${!resultado ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'}`
  }, "Registrar llamada y cerrar contrato")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Estado CERRADO: final e irreversible. No se puede reabrir ni modificar el flujo posterior."
  }))));
}

// ═══════════════════════════════════════════════════════════════════════════
// P32 — GESTIÓN USUARIOS Y ROLES
// ═══════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — COMPONENTE COMPARTIDO: AdminShell (nav lateral interna)
// ═══════════════════════════════════════════════════════════════════════════
function AdminShell({
  active,
  children
}) {
  const {
    navigate
  } = useContext(AppContext);
  const items = [{
    path: '/admin/users',
    icon: '👥',
    label: 'Usuarios y Roles'
  }, {
    path: '/admin/roles',
    icon: '🔑',
    label: 'Gestión de Roles'
  }, {
    path: '/admin/permisos',
    icon: '🛡',
    label: 'Permisos por Rol'
  }, {
    path: '/admin/sucursales',
    icon: '🏢',
    label: 'Sucursales / Locales'
  }, {
    path: '/admin/dealers',
    icon: '🚗',
    label: 'Dealers'
  }, {
    path: '/admin/plantillas',
    icon: '📄',
    label: 'Plantillas Docs'
  }, {
    path: '/admin/notificaciones',
    icon: '🔔',
    label: 'Notificaciones'
  }, {
    path: '/admin/parametros',
    icon: '⚙',
    label: 'Parámetros'
  }, {
    path: '/admin/auditoria',
    icon: '📋',
    label: 'Auditoría'
  }, {
    path: '/admin/bi',
    icon: '📊',
    label: 'Dashboard BI'
  }];
  return /*#__PURE__*/React.createElement(Screen, {
    path: active
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 min-h-screen",
    style: {
      marginTop: '-1rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-48 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden sticky top-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-3 py-2 border-b border-gray-100 bg-gray-50"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-bold text-gray-500 uppercase tracking-wider"
  }, "Administraci\xF3n")), items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.path,
    onClick: () => navigate(it.path),
    className: "w-full text-left px-3 py-2.5 flex items-center gap-2 text-xs transition-colors " + (active === it.path ? "bg-gray-800 text-white font-semibold" : "text-gray-600 hover:bg-gray-50")
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, it.icon), /*#__PURE__*/React.createElement("span", null, it.label))))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0"
  }, children)));
}

// Helpers compartidos
function CrudTable({
  cols,
  rows,
  onEdit,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("tr", null, [...cols, 'Acciones'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "text-left text-xs font-semibold text-gray-500 px-3 py-3"
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    className: "border-b border-gray-100 hover:bg-gray-50"
  }, cols.map(col => /*#__PURE__*/React.createElement("td", {
    key: col,
    className: "px-3 py-2.5 text-sm text-gray-700"
  }, typeof row[col] === 'boolean' ? /*#__PURE__*/React.createElement("span", {
    className: "text-xs px-2 py-0.5 rounded " + (row[col] ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400')
  }, row[col] ? 'Activo' : 'Inactivo') : Array.isArray(row[col]) ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1"
  }, row[col].map(v => /*#__PURE__*/React.createElement("span", {
    key: v,
    className: "text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5"
  }, v))) : String(row[col] || '—'))), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEdit && onEdit(row),
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
  }, "Editar"), onDelete && /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete && onDelete(row),
    className: "text-xs border border-red-200 text-red-500 rounded px-2 py-1 hover:bg-red-50"
  }, "Eliminar")))))))));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — P32: USUARIOS Y ROLES (modelo correcto usuario→roles)
// ═══════════════════════════════════════════════════════════════════════════
function P32Users() {
  const {
    navigate
  } = useContext(AppContext);
  const [users, setUsers] = useState(DEMO_USERS_LIST.map(u => ({
    ...u
  })));
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [assignModal, setAssignModal] = useState(null);
  const openCreate = () => {
    setForm({
      nombre: '',
      email: '',
      cargo: '',
      roles: [],
      rolPrincipal: '',
      activo: true
    });
    setModal('crear');
  };
  const openEdit = u => {
    setForm({
      ...u
    });
    setModal(u);
  };
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/users"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Usuarios y Roles"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "Cada usuario tiene un perfil (correo) y se le asignan N roles. Solo uno es el principal activo.")), /*#__PURE__*/React.createElement("button", {
    onClick: openCreate,
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Crear usuario")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm overflow-hidden mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-gray-50 border-b border-gray-200"
  }, /*#__PURE__*/React.createElement("tr", null, ['Usuario', 'Correo', 'Cargo', 'Roles asignados', 'Rol principal', 'Estado', 'Acciones'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    className: "text-left text-xs font-semibold text-gray-500 px-3 py-3"
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, users.map(u => /*#__PURE__*/React.createElement("tr", {
    key: u.id,
    className: "border-b border-gray-100 hover:bg-gray-50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 font-medium text-gray-900"
  }, u.nombre), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-500"
  }, u.email), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-500"
  }, u.cargo), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1"
  }, u.roles.map(r => /*#__PURE__*/React.createElement("span", {
    key: r,
    className: "text-xs px-1.5 py-0.5 rounded border " + (r === u.rolPrincipal ? 'bg-gray-800 text-white border-gray-800' : 'bg-gray-100 border-gray-200 text-gray-600')
  }, ROLE_LABELS[r])))), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5 text-xs text-gray-700 font-medium"
  }, ROLE_LABELS[u.rolPrincipal]), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs px-2 py-0.5 rounded " + (u.activo !== false ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-400')
  }, u.activo !== false ? 'Activo' : 'Inactivo')), /*#__PURE__*/React.createElement("td", {
    className: "px-3 py-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEdit(u),
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
  }, "Editar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAssignModal(u),
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
  }, "Roles"))))))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Modelo usuario\u2192roles: un usuario puede tener N roles. Solo uno es el principal (activo al loguear). El admin asigna roles de nivel inferior al suyo."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Validaci\xF3n front: c\xF3digo de rol fijo (ROLE_ASESOR, etc.) \u2014 nunca el ID autoincrementable de la tabla."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "AG1 PENDIENTE: \xBFAzure AD o BD propia? Si Azure AD, el admin no gestiona contrase\xF1as, solo asignaci\xF3n de roles en tabla interna."
  })), modal && /*#__PURE__*/React.createElement(Modal, {
    title: modal === 'crear' ? 'Crear usuario' : `Editar: ${modal.nombre || ''}`,
    body: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FormField, {
      label: "Nombre completo",
      required: true,
      placeholder: "Nombre Apellido",
      value: form.nombre || '',
      onChange: e => setForm(f => ({
        ...f,
        nombre: e.target.value
      }))
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Correo corporativo",
      type: "email",
      required: true,
      placeholder: "usuario@maf.pe",
      value: form.email || '',
      onChange: e => setForm(f => ({
        ...f,
        email: e.target.value
      }))
    }), /*#__PURE__*/React.createElement(FormField, {
      label: "Cargo / \xE1rea",
      placeholder: "Ej: Sucursal Miraflores",
      value: form.cargo || '',
      onChange: e => setForm(f => ({
        ...f,
        cargo: e.target.value
      }))
    }), /*#__PURE__*/React.createElement("div", {
      className: "mb-3"
    }, /*#__PURE__*/React.createElement("label", {
      className: "block text-xs font-semibold text-gray-700 mb-1"
    }, "Rol principal ", /*#__PURE__*/React.createElement("span", {
      className: "text-red-500"
    }, "*")), /*#__PURE__*/React.createElement("select", {
      value: form.rolPrincipal || '',
      onChange: e => setForm(f => ({
        ...f,
        rolPrincipal: e.target.value
      })),
      className: "w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Seleccionar rol principal..."), ROLES.filter(r => r !== 'admin').map(r => /*#__PURE__*/React.createElement("option", {
      key: r,
      value: r
    }, ROLE_LABELS[r])))), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-400"
    }, "Para asignar roles adicionales, usa el bot\xF3n \"Roles\" en la tabla.")),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setModal(null),
      className: "border border-gray-300 rounded px-4 py-2 text-sm"
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setModal(null),
      className: "bg-gray-900 text-white rounded px-4 py-2 text-sm"
    }, "Guardar")),
    onClose: () => setModal(null)
  }), assignModal && /*#__PURE__*/React.createElement(Modal, {
    title: `Roles de ${assignModal.nombre}`,
    body: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 mb-3"
    }, "Activa los roles que puede asumir este usuario. Marca uno como principal."), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2"
    }, ROLES.filter(r => r !== 'admin').map(r => /*#__PURE__*/React.createElement("div", {
      key: r,
      className: "flex items-center justify-between border border-gray-200 rounded p-2.5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-medium text-gray-800"
    }, ROLE_LABELS[r]), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-400"
    }, ROLE_DESCRIPTION[r])), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-shrink-0"
    }, assignModal.roles.includes(r) && /*#__PURE__*/React.createElement("button", {
      className: "text-xs px-2 py-0.5 rounded border " + (assignModal.rolPrincipal === r ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-300 text-gray-500')
    }, assignModal.rolPrincipal === r ? 'Principal' : 'Hacer principal'), /*#__PURE__*/React.createElement("div", {
      className: "w-9 h-5 rounded-full cursor-pointer relative " + (assignModal.roles.includes(r) ? 'bg-gray-700' : 'bg-gray-300')
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform " + (assignModal.roles.includes(r) ? 'translate-x-4' : 'translate-x-0.5')
    })))))), /*#__PURE__*/React.createElement(AnnotationNote, {
      type: "rule",
      text: "El admin solo puede asignar roles de nivel inferior al propio. Regla heredada de Kinto/SGC."
    })),
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setAssignModal(null),
      className: "border border-gray-300 rounded px-4 py-2 text-sm"
    }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setAssignModal(null),
      className: "bg-gray-900 text-white rounded px-4 py-2 text-sm"
    }, "Guardar roles")),
    onClose: () => setAssignModal(null)
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Gestión de Roles (CRUD de roles del sistema)
// ═══════════════════════════════════════════════════════════════════════════
function AdminRoles() {
  const rolesData = [{
    Código: 'ROLE_ADMIN',
    Nombre: 'Administrador',
    Nivel: 0,
    Usuarios: 1
  }, {
    Código: 'ROLE_GERENTE',
    Nombre: 'Gerente Comercial',
    Nivel: 1,
    Usuarios: 1
  }, {
    Código: 'ROLE_OFICIAL_PLAFT',
    Nombre: 'Oficial Cumplimiento',
    Nivel: 1,
    Usuarios: 1
  }, {
    Código: 'ROLE_ANALISTA',
    Nombre: 'Analista Créditos',
    Nivel: 1,
    Usuarios: 1
  }, {
    Código: 'ROLE_JEFE_VENTAS',
    Nombre: 'Jefe de Ventas',
    Nivel: 2,
    Usuarios: 1
  }, {
    Código: 'ROLE_SUPERVISOR',
    Nombre: 'Supervisor Comercial',
    Nivel: 2,
    Usuarios: 1
  }, {
    Código: 'ROLE_OPERACIONES',
    Nombre: 'Operaciones',
    Nivel: 2,
    Usuarios: 1
  }, {
    Código: 'ROLE_ASESOR',
    Nombre: 'Asesor FC',
    Nivel: 3,
    Usuarios: 3
  }, {
    Código: 'ROLE_CALLCENTER',
    Nombre: 'Call Center',
    Nivel: 3,
    Usuarios: 1
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/roles"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Gesti\xF3n de Roles"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "El c\xF3digo del rol es inmutable. Nunca se valida el ID autoincrementable.")), /*#__PURE__*/React.createElement("button", {
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Nuevo rol")), /*#__PURE__*/React.createElement(CrudTable, {
    cols: ['Código', 'Nombre', 'Nivel', 'Usuarios'],
    rows: rolesData
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "El c\xF3digo del rol (ej. ROLE_ASESOR) es el identificador estable. El ID puede cambiar; el c\xF3digo nunca. El front y el back validan por c\xF3digo."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Nivel jer\xE1rquico: quien asigna roles solo puede asignar roles de nivel mayor (n\xFAmero mayor = menor jerarqu\xEDa)."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Permisos por Rol (qué módulos/acciones puede hacer cada rol)
// ═══════════════════════════════════════════════════════════════════════════
function AdminPermisos() {
  const [rolSel, setRolSel] = useState('asesor');
  const PERMISOS = {
    asesor: ['Ver dashboard propio', 'Crear lead manual', 'Ver ficha lead propio', 'Consultar proveedor identidad', 'Seleccionar certificados', 'Iniciar evaluación riesgo', 'Seleccionar grupo', 'Generar proforma', 'Validar OTP', 'Enviar documentos', 'Capturar DNI', 'Generar orden Kashio', 'Disparar Keynua', 'Ver N° contrato', 'Enviar expediente', 'Ver bienvenida'],
    supervisor: ['Ver dashboard sucursal', 'Ver ficha lead (todos)', 'Reasignar leads', 'Revisar evaluación', 'Ver Equifax (interno)'],
    jefe_ventas: ['Todo lo de Asesor', 'Ver dashboard sucursal', 'Asignar leads', 'Ver reportes sucursal'],
    gerente: ['Ver dashboard zona', 'Ver reportes zona', 'Ver BI embebido'],
    oficial: ['Ver panel PLAFT', 'Aprobar/rechazar casos PLAFT', 'Ver resultado Equifax (interno)', 'Enviar notificación asesor'],
    admin_sistema: ['Acceso completo', 'CRUD usuarios', 'CRUD roles', 'CRUD parámetros', 'Ver auditoría completa'],
    operaciones: ['Ver panel expedientes', 'Validar docs expediente', 'Confirmar cierre', 'Registrar bienvenida'],
    admin: ['Todo lo anterior', 'CRUD usuarios', 'CRUD roles', 'CRUD permisos', 'CRUD sucursales', 'CRUD dealers', 'CRUD plantillas', 'CRUD notificaciones', 'Ver auditoría completa', 'Ver BI admin', 'Configurar parámetros'],
    callcenter: ['Ver dashboard asignación', 'Crear lead', 'Asignar lead a asesor']
  };
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/permisos"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Permisos por Rol")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 flex-wrap mb-4"
  }, ROLES.map(r => /*#__PURE__*/React.createElement("button", {
    key: r,
    onClick: () => setRolSel(r),
    className: "text-xs px-3 py-1.5 rounded border " + (rolSel === r ? 'bg-gray-800 text-white border-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50')
  }, ROLE_LABELS[r]))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-500 uppercase mb-3"
  }, "Permisos de ", ROLE_LABELS[rolSel]), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, (PERMISOS[rolSel] || []).map(p => /*#__PURE__*/React.createElement("div", {
    key: p,
    className: "flex items-center gap-2 text-sm text-gray-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-600 flex-shrink-0"
  }, "\u2713"), p)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Validaci\xF3n doble: el front oculta/deshabilita por c\xF3digo de rol. El back valida en cada endpoint. Ambas capas obligatorias."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Sucursales / Locales
// ═══════════════════════════════════════════════════════════════════════════
function AdminSucursales() {
  const sucursales = [{
    Nombre: 'Grupo Pana — Surco',
    Código: '029',
    Dealer: 'GRUPO PANA-LIMA',
    Zona: 'ZONA_LIMA_SUR',
    Distrito: 'Surco',
    Asesores: 3,
    Activo: true
  }, {
    Nombre: 'Mitsui Lima Norte',
    Código: '012',
    Dealer: 'MITSUI-LIMA',
    Zona: 'ZONA_LIMA_NORTE',
    Distrito: 'Los Olivos',
    Asesores: 2,
    Activo: true
  }, {
    Nombre: 'Autonort Trujillo',
    Código: '041',
    Dealer: 'AUTONORT',
    Zona: 'ZONA_NORTE',
    Distrito: 'Trujillo',
    Asesores: 2,
    Activo: true
  }, {
    Nombre: 'Conauto Arequipa',
    Código: '055',
    Dealer: 'CONAUTO SA',
    Zona: 'ZONA_SUR',
    Distrito: 'Arequipa',
    Asesores: 1,
    Activo: false
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/sucursales"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Sucursales / Locales"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "48 sucursales activas registradas. Los leads se asignan por dealer + sucursal.")), /*#__PURE__*/React.createElement("button", {
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Nueva sucursal")), /*#__PURE__*/React.createElement(CrudTable, {
    cols: ['Nombre', 'Código', 'Dealer', 'Zona', 'Distrito', 'Asesores', 'Activo'],
    rows: sucursales
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RN-021: Los leads Toyota CSV se asignan usando los campos 'dealer' y 'sucursal' del archivo. El c\xF3digo de sucursal es el identificador estable."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Dealers / Concesionarios
// ═══════════════════════════════════════════════════════════════════════════
function AdminDealers() {
  const dealers = [{
    Nombre: 'GRUPO PANA-LIMA',
    RUC: '20100123456',
    Zona: 'ZONA_LIMA_SUR',
    Sucursales: 8,
    Responsable: 'jc.vega@maf.pe',
    Activo: true
  }, {
    Nombre: 'MITSUI-LIMA',
    RUC: '20200234567',
    Zona: 'ZONA_LIMA_NORTE',
    Sucursales: 5,
    Responsable: 'm.garcia@maf.pe',
    Activo: true
  }, {
    Nombre: 'AUTONORT',
    RUC: '20300345678',
    Zona: 'ZONA_NORTE',
    Sucursales: 6,
    Responsable: 'r.torres@maf.pe',
    Activo: true
  }, {
    Nombre: 'CONAUTO SA',
    RUC: '20400456789',
    Zona: 'ZONA_SUR',
    Sucursales: 4,
    Responsable: 'a.rios@maf.pe',
    Activo: false
  }, {
    Nombre: 'MANNUCCI MOTORS',
    RUC: '20500567890',
    Zona: 'ZONA_CENTRO',
    Sucursales: 3,
    Responsable: 'c.flores@maf.pe',
    Activo: true
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/dealers"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Dealers / Concesionarios"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "11 dealers activos. Cada dealer tiene N sucursales y un responsable MAF asignado.")), /*#__PURE__*/React.createElement("button", {
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Nuevo dealer")), /*#__PURE__*/React.createElement(CrudTable, {
    cols: ['Nombre', 'RUC', 'Zona', 'Sucursales', 'Responsable', 'Activo'],
    rows: dealers
  }));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Plantillas de Documentos (como SGC/Kinto — variables en BD)
// ═══════════════════════════════════════════════════════════════════════════
function AdminPlantillas() {
  const [selected, setSelected] = useState(null);
  const plantillas = [{
    id: 1,
    nombre: 'Contrato Modelo FC',
    tipo: 'Contrato',
    variables: ['{{nombre_cliente}}', '{{dni}}', '{{monto_certificado}}', '{{cuota_mensual}}', '{{grupo}}', '{{plazo}}'],
    dinamica: false,
    ultimaEdicion: '10/04/2026'
  }, {
    id: 2,
    nombre: 'Proforma de Certificado',
    tipo: 'Proforma',
    variables: ['{{nombre_cliente}}', '{{certificados}}', '{{monto_total}}', '{{cuota_total}}', '{{inscripcion}}', '{{grupo}}', '{{fecha}}'],
    dinamica: true,
    ultimaEdicion: '12/04/2026'
  }, {
    id: 3,
    nombre: 'Tarifario de Comisiones',
    tipo: 'Normativo',
    variables: ['{{año}}', '{{version}}'],
    dinamica: false,
    ultimaEdicion: '01/03/2026'
  }, {
    id: 4,
    nombre: 'Cartilla Informativa',
    tipo: 'Normativo',
    variables: ['{{fecha}}'],
    dinamica: false,
    ultimaEdicion: '01/03/2026'
  }, {
    id: 5,
    nombre: 'DDJJ de Ingresos',
    tipo: 'Declaración',
    variables: ['{{nombre_cliente}}', '{{dni}}', '{{ingresos_declarados}}', '{{fecha}}'],
    dinamica: false,
    ultimaEdicion: '05/04/2026'
  }, {
    id: 6,
    nombre: 'Política de Privacidad de Datos',
    tipo: 'Normativo',
    variables: ['{{fecha_aceptacion}}', '{{canal_otp}}'],
    dinamica: false,
    ultimaEdicion: '10/04/2026'
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/plantillas"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Plantillas de Documentos"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "6 documentos normativos + proforma + contrato. Las variables se resuelven con datos del prospecto al generar.")), /*#__PURE__*/React.createElement("button", {
    className: "bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700"
  }, "+ Nueva plantilla")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 gap-3 mb-4"
  }, plantillas.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "bg-white border rounded shadow-sm p-4 cursor-pointer transition-colors " + (selected?.id === p.id ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300'),
    onClick: () => setSelected(selected?.id === p.id ? null : p)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-semibold text-gray-900"
  }, p.nombre), /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-500"
  }, p.tipo), p.dinamica && /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-blue-50 border border-blue-200 rounded px-1.5 py-0.5 text-blue-700"
  }, "Din\xE1mica")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400"
  }, "\xDAltima edici\xF3n: ", p.ultimaEdicion)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
  }, "Editar"), /*#__PURE__*/React.createElement("button", {
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
  }, "Previsualizar"))), selected?.id === p.id && /*#__PURE__*/React.createElement("div", {
    className: "mt-3 pt-3 border-t border-gray-100"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Variables del template:"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, p.variables.map(v => /*#__PURE__*/React.createElement("code", {
    key: v,
    className: "text-xs bg-gray-100 border border-gray-200 rounded px-2 py-0.5 text-gray-700 font-mono"
  }, v))), p.dinamica && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 note bg-blue-50 border-l-4 border-blue-400 text-xs text-blue-800"
  }, "Plantilla din\xE1mica: el sistema arma el documento con ifs seg\xFAn los datos del prospecto (multicertificado, co-titular, PJ, etc.) \u2014 como en SGC."))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Las variables {{nombre}} se resuelven con datos de la plataforma al generar el documento. Las plantillas viven en BD (editables sin deploy)."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    id: "AG6",
    text: "BLOQUEANTE: Las 6 plantillas legales deben ser entregadas por MAF (\xE1rea legal) como prerequisito del Sprint. Applying solo integra, no construye el contenido legal."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Mensajes y Notificaciones
// ═══════════════════════════════════════════════════════════════════════════
function AdminNotificaciones() {
  const [tab, setTab] = useState('templates');
  const templates = [{
    id: 1,
    nombre: 'OTP — Consentimiento cliente',
    canal: 'Correo / WhatsApp / SMS',
    destinatario: 'Cliente',
    variables: ['{{codigo_otp}}', '{{nombre_cliente}}', '{{ttl_minutos}}'],
    activo: true
  }, {
    id: 2,
    nombre: 'Notificación al Oficial PLAFT',
    canal: 'Email + In-app',
    destinatario: 'Oficial Cumplimiento',
    variables: ['{{nombre_cliente}}', '{{dni}}', '{{asesor}}', '{{sucursal}}', '{{hora}}'],
    activo: true
  }, {
    id: 3,
    nombre: 'Caso PLAFT resuelto — al Asesor',
    canal: 'In-app',
    destinatario: 'Asesor FC',
    variables: ['{{nombre_cliente}}', '{{resultado}}', '{{oficial}}'],
    activo: true
  }, {
    id: 4,
    nombre: 'Firma Keynua completada',
    canal: 'Email',
    destinatario: 'Asesor + Supervisor + Cliente',
    variables: ['{{nombre_cliente}}', '{{n_contrato}}', '{{fecha_firma}}'],
    activo: true
  }, {
    id: 5,
    nombre: 'Expediente recibido — Operaciones',
    canal: 'In-app + Email',
    destinatario: 'Operaciones',
    variables: ['{{nombre_cliente}}', '{{n_contrato}}', '{{asesor}}'],
    activo: true
  }, {
    id: 6,
    nombre: 'Evaluación rechazada — cliente final',
    canal: 'N/A (popup)',
    destinatario: 'Cliente (via asesor)',
    variables: ['{{mensaje_generico}}'],
    activo: true
  }];
  const logs = [{
    timestamp: '20/04 14:33',
    tipo: 'OTP',
    destinatario: 'carlos.m@gmail.com',
    estado: 'Entregado',
    canal: 'WhatsApp'
  }, {
    timestamp: '20/04 14:31',
    tipo: 'Notif. Oficial',
    destinatario: 'p.salas@maf.pe',
    estado: 'Entregado',
    canal: 'Email + App'
  }, {
    timestamp: '20/04 13:55',
    tipo: 'Keynua completada',
    destinatario: 'm.lopez@maf.pe',
    estado: 'Entregado',
    canal: 'Email'
  }, {
    timestamp: '20/04 11:20',
    tipo: 'OTP',
    destinatario: 'ana.t@gmail.com',
    estado: 'Fallido',
    canal: 'SMS'
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/notificaciones"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Mensajes y Notificaciones")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4"
  }, ['templates', 'logs'].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTab(t),
    className: "text-xs px-3 py-1.5 rounded border " + (tab === t ? 'bg-gray-800 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50')
  }, t === 'templates' ? 'Templates de mensajes' : 'Log de envíos'))), tab === 'templates' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, templates.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "bg-white border border-gray-200 rounded shadow-sm p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-gray-900"
  }, t.nombre), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-1 flex-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-gray-100 rounded px-1.5 py-0.5 text-gray-500"
  }, "Canal: ", t.canal), /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-gray-100 rounded px-1.5 py-0.5 text-gray-500"
  }, "Para: ", t.destinatario)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 mt-2 flex-wrap"
  }, t.variables.map(v => /*#__PURE__*/React.createElement("code", {
    key: v,
    className: "text-xs bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 font-mono text-gray-600"
  }, v)))), /*#__PURE__*/React.createElement("button", {
    className: "text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50 flex-shrink-0"
  }, "Editar"))))), tab === 'logs' && /*#__PURE__*/React.createElement(CrudTable, {
    cols: ['timestamp', 'tipo', 'destinatario', 'canal', 'estado'],
    rows: logs
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Dos tipos: mensajes para el cliente final (sin detalles t\xE9cnicos, sin revelar causa de rechazo) y mensajes internos para Compliance (con detalle PLAFT + timestamp)."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "AG-N2 BLOQUEANTE: Los textos exactos de AMBOS tipos deben aprobarse con el \xE1rea legal de MAF antes del desarrollo."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Parámetros del Sistema
// ═══════════════════════════════════════════════════════════════════════════
function AdminParametros() {
  const params = [{
    Grupo: 'PLAFT',
    Parámetro: 'sla_oficial_minutos',
    Valor: '60',
    Descripción: 'SLA máx. del Oficial (minutos en horario laboral)',
    Editable: true
  }, {
    Grupo: 'PLAFT',
    Parámetro: 'horario_inicio',
    Valor: '09:00',
    Descripción: 'Hora inicio atención Oficial (L–V)',
    Editable: true
  }, {
    Grupo: 'PLAFT',
    Parámetro: 'horario_fin',
    Valor: '18:00',
    Descripción: 'Hora fin atención Oficial (L–V)',
    Editable: true
  }, {
    Grupo: 'OTP',
    Parámetro: 'otp_ttl_segundos',
    Valor: '300',
    Descripción: 'TTL del código OTP (5 min)',
    Editable: true
  }, {
    Grupo: 'OTP',
    Parámetro: 'otp_max_reintentos',
    Valor: '3',
    Descripción: 'Intentos máx. antes de reenvío',
    Editable: true
  }, {
    Grupo: 'Evaluación',
    Parámetro: 'equifax_max_reintentos',
    Valor: '2',
    Descripción: 'Reintentos máx. Equifax por sesión',
    Editable: true
  }, {
    Grupo: 'Leads',
    Parámetro: 'asignacion_hora',
    Valor: '09:00',
    Descripción: 'Hora ejecución asignación automática (L–V)',
    Editable: true
  }, {
    Grupo: 'Leads',
    Parámetro: 'login_max_intentos',
    Valor: '5',
    Descripción: 'Intentos máx. antes de bloqueo de cuenta',
    Editable: true
  }, {
    Grupo: 'Kashio',
    Parámetro: 'kashio_codigo_prefijo',
    Valor: 'PC',
    Descripción: 'Prefijo del código de pago (doc + prefijo)',
    Editable: false
  }, {
    Grupo: 'Sistema',
    Parámetro: 'certificados_max',
    Valor: '5',
    Descripción: 'Máximo certificados por operación',
    Editable: false
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/parametros"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Par\xE1metros del Sistema"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "Valores configurables sin necesidad de deploy. Los marcados como no editables requieren cambio de c\xF3digo."))), /*#__PURE__*/React.createElement(CrudTable, {
    cols: ['Grupo', 'Parámetro', 'Valor', 'Descripción', 'Editable'],
    rows: params
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "Los par\xE1metros editables se guardan en BD y se leen en runtime. Un cambio aplica inmediatamente sin reiniciar el sistema."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Log de Auditoría
// ═══════════════════════════════════════════════════════════════════════════
function AdminAuditoria() {
  const logs = [{
    Timestamp: '20/04/2026 14:33:21',
    Usuario: 'm.lopez@maf.pe',
    Rol: 'ROLE_ASESOR',
    Acción: 'Generó orden de pago',
    Entidad: 'Lead #1042',
    Detalle: 'Monto: USD 970'
  }, {
    Timestamp: '20/04/2026 14:31:05',
    Usuario: 'p.salas@maf.pe',
    Rol: 'ROLE_OFICIAL_PLAFT',
    Acción: 'Aprobó caso PLAFT',
    Entidad: 'Lead #1042',
    Detalle: 'Estado: Continuar'
  }, {
    Timestamp: '20/04/2026 14:20:11',
    Usuario: 'm.lopez@maf.pe',
    Rol: 'ROLE_ASESOR',
    Acción: 'Inició evaluación riesgo',
    Entidad: 'Lead #1042',
    Detalle: 'DNI: 45678901'
  }, {
    Timestamp: '20/04/2026 13:55:44',
    Usuario: 'm.lopez@maf.pe',
    Rol: 'ROLE_ASESOR',
    Acción: 'Creó lead manual',
    Entidad: 'Lead #1042',
    Detalle: 'Fuente: In situ'
  }, {
    Timestamp: '20/04/2026 09:00:02',
    Usuario: 'SISTEMA',
    Rol: '—',
    Acción: 'Asignación automática de leads',
    Entidad: 'Lote #2026-04-19',
    Detalle: '48 leads asignados'
  }, {
    Timestamp: '19/04/2026 17:58:33',
    Usuario: 'admin@maf.pe',
    Rol: 'ROLE_ADMIN',
    Acción: 'Modificó rol de usuario',
    Entidad: 'Usuario #4',
    Detalle: 'callcenter → asesor (principal)'
  }];
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/auditoria"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Log de Auditor\xEDa"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "Historial append-only de todas las acciones del sistema. No editable ni eliminable.")), /*#__PURE__*/React.createElement("button", {
    className: "border border-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-50"
  }, "\u2B07 Exportar")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4 flex-wrap"
  }, ['Todos', 'Ventas', 'Evaluación', 'Admin', 'Sistema'].map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    className: "text-xs px-3 py-1.5 rounded border " + (f === 'Todos' ? 'bg-gray-800 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50')
  }, f))), /*#__PURE__*/React.createElement(CrudTable, {
    cols: ['Timestamp', 'Usuario', 'Rol', 'Acción', 'Entidad', 'Detalle'],
    rows: logs,
    onEdit: null,
    onDelete: null
  }), /*#__PURE__*/React.createElement("div", {
    className: "mt-4"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RNF Trazabilidad: log append-only de TODA acci\xF3n. Incluye usuario, rol, timestamp, entidad afectada, valor anterior y nuevo. No se puede borrar ni editar."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN — Dashboard BI / Reportería embebida
// ═══════════════════════════════════════════════════════════════════════════
function AdminBI() {
  const [herramienta, setHerramienta] = useState('quicksight');
  const [rolVista, setRolVista] = useState('gerente');
  return /*#__PURE__*/React.createElement(AdminShell, {
    active: "/admin/bi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-bold text-gray-900"
  }, "Dashboard BI / Reporter\xEDa"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-0.5"
  }, "Vista segmentada por rol. Cada actor ve solo los datos de su \xE1mbito."))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Opciones evaluadas (pendiente decisi\xF3n con Juan Carlos)"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 flex-wrap"
  }, [{
    id: 'quicksight',
    label: 'Amazon QuickSight embebido',
    desc: 'Sin licencias por usuario. Modelo por sesión 30 min. Caso de éxito previo.'
  }, {
    id: 'powerbi',
    label: 'Power BI + AWS Redshift',
    desc: 'MAF ya usa Azure. Proyecto Snowflake pendiente. Mayor costo de licencias.'
  }].map(h => /*#__PURE__*/React.createElement("label", {
    key: h.id,
    className: "flex-1 min-w-48 border rounded p-3 cursor-pointer " + (herramienta === h.id ? 'border-gray-400 bg-gray-50' : 'border-gray-200 hover:border-gray-300')
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "herramienta",
    value: h.id,
    checked: herramienta === h.id,
    onChange: () => setHerramienta(h.id),
    className: "mr-2"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium text-gray-800"
  }, h.label), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-400 mt-1 ml-5"
  }, h.desc))))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-gray-600 mb-2"
  }, "Vista seg\xFAn rol (segmentaci\xF3n de datos)"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4 flex-wrap"
  }, ['gerente', 'jefe_ventas', 'supervisor', 'asesor'].map(r => /*#__PURE__*/React.createElement("button", {
    key: r,
    onClick: () => setRolVista(r),
    className: "text-xs px-3 py-1.5 rounded border " + (rolVista === r ? 'bg-gray-800 text-white' : 'border-gray-200 text-gray-600 hover:bg-gray-50')
  }, ROLE_LABELS[r]))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border border-gray-200 rounded shadow-sm p-4 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-gray-700"
  }, rolVista === 'gerente' ? 'Zona Lima completa' : rolVista === 'jefe_ventas' ? 'Sucursal Lima Sur' : rolVista === 'supervisor' ? 'Sucursal San Isidro' : 'Mis leads — Sucursal Miraflores'), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400"
  }, "Restricci\xF3n por ", rolVista === 'gerente' ? 'zona' : 'sucursal', " \u2014 datos aislados por rol")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4"
  }, (rolVista === 'gerente' ? [['Leads este mes', '342'], ['Contratos', '18'], ['Tasa conv.', '5.3%'], ['Asesores activos', '12']] : rolVista === 'asesor' ? [['Mis leads', '23'], ['En evaluación', '5'], ['Cerrados', '3'], ['Tasa conv.', '13%']] : [['Leads sucursal', '87'], ['Contratos', '6'], ['Asesores', '4'], ['Tasa conv.', '6.9%']]).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "bg-gray-50 border border-gray-200 rounded p-3 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xl font-bold text-gray-900"
  }, v), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-0.5"
  }, k)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-100 border border-dashed border-gray-300 rounded p-8 text-center text-gray-400"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, "[", herramienta === 'quicksight' ? 'Amazon QuickSight' : 'Power BI', " embebido aqu\xED]"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1"
  }, "Gr\xE1ficas de embudo, conversi\xF3n por asesor, leads por fuente, etc."), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mt-1 text-gray-300"
  }, "Restricci\xF3n por columna/fila seg\xFAn ", ROLE_LABELS[rolVista]))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "rule",
    text: "RF-020: Datos segmentados por rol. Asesor ve solo su sucursal. Gerente ve toda su zona. Restricci\xF3n por columna/fila en la herramienta BI."
  }), /*#__PURE__*/React.createElement(AnnotationNote, {
    type: "gap",
    text: "P4 PENDIENTE: \xBFQuickSight o Power BI? Decisi\xF3n pendiente con Juan Carlos (Gerente Comercial). Define si va en Fase 1 o Fase 2."
  })));
}

// ═══════════════════════════════════════════════════════════════════════════
// ROUTER + APP
// ═══════════════════════════════════════════════════════════════════════════
const SCREENS = {
  '/': HomeIndex,
  '/login': P01Login,
  '/recover': P02Recover,
  '/dashboard': P05Dashboard,
  '/citas': PCitas,
  '/lead/list': PGLGestionLeads,
  '/lead/callcenter': PGLCallCenter,
  '/lead/new': P07CreateLead,
  '/lead/1': P08LeadDetail,
  '/eval/identity': P09Identity,
  '/eval/certificates': P09bCertificates,
  '/eval/riesgo': P10Unified,
  '/eval/equifax': P10Equifax,
  '/eval/supervisor': P12Supervisor,
  '/eval/empresa': P13Empresa,
  '/plaft/result': P15PLAFT,
  '/plaft/panel': P16PanelOficial,
  '/plaft/resolve': P17ResolvePLAFT,
  '/eval/mensajes': PMsgPopups,
  '/sale/groups': P18Groups,
  '/sale/proforma': P19Proforma,
  '/sale/otp': P20OTP,
  '/sale/docs': P21Docs,
  '/sale/scan': P22ScanDNI,
  '/sale/payment': P23Payment,
  '/close/keynua': P25Keynua,
  '/close/contract': P27Contract,
  '/close/send': P28SendExpedient,
  '/close/ops': P29Ops,
  '/close/welcome': P31Welcome,
  '/admin/users': P32Users,
  '/admin/roles': AdminRoles,
  '/admin/permisos': AdminPermisos,
  '/admin/sucursales': AdminSucursales,
  '/admin/dealers': AdminDealers,
  '/admin/plantillas': AdminPlantillas,
  '/admin/notificaciones': AdminNotificaciones,
  '/admin/parametros': AdminParametros,
  '/admin/auditoria': AdminAuditoria,
  '/admin/bi': AdminBI
};
// ═══════════════════════════════════════════════════════════════════════════
// APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function App() {
  // Usar el hook de router externalizado
  const { route, navigate, goBack, canGoBack } = useRouter();
  
  // Estado de demostración
  const [demoState, setDemoState] = useState(INITIAL_DEMO_STATE);
  
  // Estado para el Agente Copiloto (Agente 1)
  const [mostrarAgenteCopiloto, setMostrarAgenteCopiloto] = useState(true);
  const [camposDestacados, setCamposDestacados] = useState([]);
  
  // Handler para resaltar campos desde el agente
  const handleHighlightFields = (campos) => {
    setCamposDestacados(campos);
    // Auto-limpiar después de 5 segundos
    setTimeout(() => setCamposDestacados([]), 5000);
  };
  
  // Rutas donde se muestra el Agente Copiloto
  const rutasConAgente = ['/lead/new', '/eval/identity', '/eval/riesgo', '/sale/proforma', '/sale/payment'];
  
  // Buscar el componente correspondiente a la ruta actual
  const CurrentScreen = SCREENS[route] || (() => 
    React.createElement(Screen, { path: route },
      React.createElement('div', { className: 'text-center py-12' },
        React.createElement('p', { className: 'text-gray-500' },
          'Pantalla no encontrada: ', route
        ),
        React.createElement('button', {
          onClick: () => navigate('/'),
          className: 'mt-3 border border-gray-300 rounded px-4 py-2 text-sm'
        }, '← Ir al índice')
      )
    )
  );
  
  // Determinar si la ruta es pública
  const isPublic = isPublicRoute(route);
  
  // Valor del contexto
  const contextValue = {
    route,
    navigate,
    goBack,
    canGoBack,
    demoState,
    setDemoState
  };
  
  return React.createElement(AppContext.Provider, { value: contextValue },
    // Rutas privadas con layout completo
    !isPublic && React.createElement(MainLayout, {
      currentPath: route,
      AppContext: AppContext,
      ALL_ROUTES: ALL_ROUTES,
      ROLE_SCREENS: ROLE_SCREENS,
      showLayout: true
    }, 
      React.createElement(CurrentScreen, null),
      // Agente Copiloto (Agente 1) - Se muestra en rutas específicas
      mostrarAgenteCopiloto && rutasConAgente.includes(route) &&
        React.createElement(AgenteCopiloto, {
          currentScreen: route,
          onHighlightFields: handleHighlightFields
        })
    ),
    
    // Rutas públicas sin layout
    isPublic && React.createElement(MainLayout, {
      currentPath: route,
      AppContext: AppContext,
      ALL_ROUTES: ALL_ROUTES,
      ROLE_SCREENS: ROLE_SCREENS,
      showLayout: false
    },
      // Header simple para índice
      route !== '/login' && route !== '/recover' && 
        React.createElement('div', {
          className: 'bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between'
        },
          React.createElement('div', {
            className: 'bg-gray-200 border border-gray-300 rounded flex items-center justify-center font-bold text-gray-700 text-xs',
            style: { width: 64, height: 28 }
          }, '[MAF FC]'),
          React.createElement('button', {
            onClick: () => navigate('/login'),
            className: 'text-xs border border-gray-300 rounded px-3 py-1 hover:bg-gray-50'
          }, 'Iniciar sesión')
        ),
      React.createElement(CurrentScreen, null)
    )
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RENDER PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
