/**
 * FormField - Campo de formulario con validación y estados
 */

const { React } = window;
const { useState } = React;

export function FormField({
  label,
  type = 'text',
  required,
  placeholder,
  hint,
  error,
  readOnly,
  autoFilled,
  value,
  onChange
}) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;
  
  return React.createElement("div", {
    className: "mb-3"
  }, 
    React.createElement("label", {
      className: "block text-xs font-semibold text-gray-700 mb-1"
    }, 
      label, 
      required && React.createElement("span", {
        className: "text-red-500 ml-0.5"
      }, "*"), 
      readOnly && React.createElement("span", {
        className: "ml-1 text-gray-400"
      }, "🔒")
    ), 
    React.createElement("div", {
      className: "relative"
    }, 
      React.createElement("input", {
        type: inputType,
        placeholder: placeholder,
        readOnly: readOnly || autoFilled,
        value: value || '',
        onChange: onChange || (() => {}),
        className: `w-full border rounded px-3 py-2 text-sm outline-none
            ${error ? 'border-red-400' : 'border-gray-300'}
            ${readOnly ? 'bg-gray-100 cursor-not-allowed' : autoFilled ? 'bg-gray-50' : 'bg-white'}
            focus:border-gray-500`
      }), 
      type === 'password' && React.createElement("button", {
        onClick: () => setShow(!show),
        className: "absolute right-3 top-2 text-gray-400 text-sm"
      }, show ? '🙈' : '👁')
    ), 
    autoFilled && React.createElement("p", {
      className: "text-xs text-gray-500 mt-0.5"
    }, "✓ Autocompletado por proveedor de identidad"), 
    hint && !error && React.createElement("p", {
      className: "text-xs text-gray-400 mt-0.5"
    }, hint), 
    error && React.createElement("p", {
      className: "text-xs text-red-500 mt-0.5"
    }, error)
  );
}

export default FormField;
