/**
 * Breadcrumb - Navegación con flechas anterior/siguiente
 */

const { React } = window;
const { useContext } = React;
import { ALL_ROUTES, SEQUENTIAL_FLOW } from '../../config/routes.js';

// AppContext se inyectará desde el HTML principal
let AppContext;
export function setAppContext(context) {
  AppContext = context;
}

export function Breadcrumb({ current }) {
  const { navigate } = useContext(AppContext);
  const idx = SEQUENTIAL_FLOW.indexOf(current);
  const prev = idx > 0 ? SEQUENTIAL_FLOW[idx - 1] : null;
  const next = idx < SEQUENTIAL_FLOW.length - 1 ? SEQUENTIAL_FLOW[idx + 1] : null;
  const getPLabel = p => ALL_ROUTES.find(r => r.path === p)?.label || p;
  
  return React.createElement("div", {
    className: "mt-6 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500"
  }, 
    React.createElement("div", null, 
      prev && React.createElement("button", {
        onClick: () => navigate(prev),
        className: "hover:text-gray-800"
      }, "← ", getPLabel(prev))
    ), 
    React.createElement("div", {
      className: "text-gray-400"
    }, getPLabel(current)), 
    React.createElement("div", null, 
      next && React.createElement("button", {
        onClick: () => navigate(next),
        className: "hover:text-gray-800"
      }, getPLabel(next), " →")
    )
  );
}

export default Breadcrumb;
