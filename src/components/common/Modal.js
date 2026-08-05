/**
 * Modal - Componente de modal/diálogo
 */

const { React } = window;

export function Modal({ title, body, actions, onClose }) {
  return React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center",
    style: {
      background: 'rgba(0,0,0,0.3)'
    }
  }, 
    React.createElement("div", {
      className: "bg-white max-w-md w-full mx-4 rounded shadow-lg border border-gray-200"
    }, 
      React.createElement("div", {
        className: "p-4 border-b border-gray-200"
      }, 
        React.createElement("h3", {
          className: "font-semibold text-gray-900"
        }, title)
      ), 
      React.createElement("div", {
        className: "p-4 text-sm text-gray-700"
      }, body), 
      React.createElement("div", {
        className: "p-4 border-t border-gray-200 flex gap-2 justify-end"
      }, actions)
    )
  );
}

export default Modal;
