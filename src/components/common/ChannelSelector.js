/**
 * ChannelSelector - Selector de canal de comunicación (Correo, WhatsApp, SMS)
 */

const { React } = window;

export function ChannelSelector({
  value,
  onChange,
  label = 'Canal de envío',
  className = ''
}) {
  const channels = [
    { k: 'correo', l: 'Correo', icon: '📧' },
    { k: 'whatsapp', l: 'WhatsApp', icon: '💬' },
    { k: 'sms', l: 'SMS', icon: '📱' }
  ];
  
  return React.createElement("div", {
    className: className
  }, 
    React.createElement("p", {
      className: "text-xs font-semibold text-gray-600 mb-2"
    }, label), 
    React.createElement("div", {
      className: "flex gap-2"
    }, 
      channels.map(c => React.createElement("label", {
        key: c.k,
        className: `flex-1 flex items-center justify-center gap-1.5 text-sm border rounded px-3 py-2 cursor-pointer transition-colors
              ${value === c.k ? 'border-gray-800 bg-gray-800 text-white font-medium' : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700'}`
      }, 
        React.createElement("input", {
          type: "radio",
          name: `channel-${label}`,
          value: c.k,
          checked: value === c.k,
          onChange: () => onChange(c.k),
          className: "sr-only"
        }), 
        React.createElement("span", null, c.icon), 
        React.createElement("span", null, c.l)
      ))
    )
  );
}

export default ChannelSelector;
