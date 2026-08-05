/**
 * DemoToggle - Toggle switch para opciones de demo
 */

const { React } = window;

export function DemoToggle({ label, value, onChange }) {
  return React.createElement("div", {
    className: "inline-flex items-center gap-2 bg-gray-100 border border-gray-300 rounded px-3 py-1.5 text-xs cursor-pointer select-none",
    onClick: () => onChange(!value)
  }, 
    React.createElement("div", {
      className: `w-8 h-4 rounded-full transition-colors ${value ? 'bg-gray-700' : 'bg-gray-300'} relative`
    }, 
      React.createElement("div", {
        className: `absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`
      })
    ), 
    React.createElement("span", {
      className: "text-gray-600"
    }, "[ Demo: ", label, " ]")
  );
}

export default DemoToggle;
