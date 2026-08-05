/**
 * StatusBadge - Badge para mostrar estados de leads
 */

const { React } = window;

export function StatusBadge({ status }) {
  const map = {
    'Nuevo': 'bg-gray-100 border border-gray-300 text-gray-700',
    'En evaluación': 'bg-gray-200 text-gray-700',
    'Calificado': 'bg-gray-300 text-gray-800 font-medium',
    'Rechazado': 'bg-gray-800 text-white',
    'CERRADO': 'bg-gray-900 text-white font-bold',
    'Pendiente acción': 'border-2 border-gray-400 text-gray-700 animate-pulse-custom'
  };
  
  return React.createElement("span", {
    className: `px-2 py-0.5 rounded text-xs ${map[status] || 'bg-gray-100 text-gray-600'}`
  }, status);
}

export default StatusBadge;
