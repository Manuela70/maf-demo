// ─── SIDEBAR ────────────────────────────────────────────────────────────────
// Componente externalizado: Sidebar
// Menú lateral de navegación con control de acceso por rol

const { React } = window;
const { useContext } = React;

export function Sidebar({ open, currentPath, AppContext, ALL_ROUTES, ROLE_SCREENS }) {
  const { navigate, demoState } = useContext(AppContext);
  
  const roleScreens = ROLE_SCREENS[demoState.currentRole];
  const isAdmin = roleScreens === 'all';

  const modules = [...new Set(ALL_ROUTES.map((r) => r.module))];

  return /*#__PURE__*/React.createElement("aside", {
    className: `fixed top-16 left-0 z-30 w-60 bg-white border-r border-gray-200 sidebar-scroll transition-transform duration-200 ${
      open ? 'translate-x-0' : '-translate-x-full'
    }`,
    style: { bottom: 0 }
  },
    /*#__PURE__*/React.createElement("div", {
      className: "p-3"
    },
      modules.map((mod) => {
        const screens = ALL_ROUTES.filter(
          (r) =>
            r.module === mod &&
            (mod === 'Inicio' ||
              isAdmin ||
              (Array.isArray(roleScreens) && roleScreens.includes(r.path)))
        );
        if (!screens.length) return null;

        return /*#__PURE__*/React.createElement("div", {
          key: mod,
          className: "mb-3"
        },
          /*#__PURE__*/React.createElement("p", {
            className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 px-1"
          }, mod),
          
          screens.map((s) =>
            /*#__PURE__*/React.createElement("button", {
              key: s.path,
              onClick: () => navigate(s.path),
              className: `w-full text-left text-xs px-2 py-1.5 rounded mb-0.5 ${
                currentPath === s.path
                  ? 'bg-gray-200 font-semibold text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }, s.label)
          )
        );
      })
    )
  );
}
