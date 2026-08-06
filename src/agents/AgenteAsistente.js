/**
 * Agente 2: Seguimiento y Tareas
 * 
 * Especialista en: recordatorios proactivos y tareas pendientes
 * — garantiza que ningún lead se enfríe por falta de seguimiento.
 * 
 * Nivel de impacto: Vendedor
 * Complejidad: BAJA-MEDIA
 * 
 * Mensaje clave: "¿Cuántas ventas se pierden hoy porque un lead se enfrió 
 * esperando un seguimiento que nadie recordó?"
 */

const { React } = window;
const { useState, useEffect } = React;
import { LEADS, detectarLeadsUrgentes } from '../mockData.js';

export function AgenteAsistente({ 
  vendedorId = 'v1',
  onLeadClick = null,
  className = ''
}) {
  const [urgentes, setUrgentes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  // Detectar leads urgentes al montar y cada minuto
  useEffect(() => {
    actualizarUrgentes();
    const interval = setInterval(actualizarUrgentes, 60000); // Cada minuto
    return () => clearInterval(interval);
  }, [vendedorId]);

  const actualizarUrgentes = () => {
    // Filtrar leads del vendedor actual
    const leadsDelVendedor = LEADS.filter(l => l.vendedorId === vendedorId);
    const leadsUrgentes = detectarLeadsUrgentes(leadsDelVendedor);
    setUrgentes(leadsUrgentes);
  };

  // Efecto proactivo: mostrar notificación al cargar
  useEffect(() => {
    if (urgentes.length > 0) {
      // Simular que el agente "habla primero"
      console.log(`🤖 Asistente: Tienes ${urgentes.length} tareas prioritarias hoy`);
    }
  }, [urgentes]);

  const getUrgenciaColor = (urgencia) => {
    switch (urgencia) {
      case 'alta': return 'border-red-500 bg-red-50';
      case 'media': return 'border-amber-500 bg-amber-50';
      case 'baja': return 'border-gray-300 bg-gray-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getUrgenciaIcon = (urgencia) => {
    switch (urgencia) {
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baja': return '⚪';
      default: return '⚪';
    }
  };

  const getAccionButton = (accion) => {
    const buttons = {
      'Llamar': { 
        text: React.createElement('span', { className: 'flex items-center gap-2' },
          React.createElement('svg', { 
            width: '18',
            height: '18',
            viewBox: '0 0 175 175',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            style: { flexShrink: 0 }
          },
            React.createElement('path', {
              fill: '#25D366',
              d: 'M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.927z'
            }),
            React.createElement('path', {
              fill: '#FFF',
              d: 'M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647z'
            })
          ),
          'Enviar WhatsApp de seguimiento'
        ),
        color: 'btn-maf-primary' 
      },
      'Ver': { text: 'Ver detalles', color: 'btn-maf-secondary' },
      'Primer contacto': { text: 'Contactar', color: 'btn-maf-primary' }
    };
    return buttons[accion] || { text: 'Ver', color: 'btn-maf-secondary gris' };
  };

  if (urgentes.length === 0) {
    return React.createElement("div", {
      className: `bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-4 ${className}`
    },
      React.createElement("div", {
        className: "flex items-center gap-3"
      },
        React.createElement("div", {
          className: "w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl flex-shrink-0"
        }, "✓"),
        React.createElement("div", {
          className: "flex-1"
        },
          React.createElement("h3", {
            className: "font-bold text-green-900"
          }, "¡Todo al día!"),
          React.createElement("p", {
            className: "text-sm text-green-700 mt-1"
          }, "No tienes leads urgentes en este momento. Sigue así, estás al día con tu cartera.")
        )
      )
    );
  }

  return React.createElement("div", {
    className: `card-maf ${className}`,
    'data-agente': 'asistente',
    style: { 
      padding: 0,
      minHeight: isExpanded ? 'auto' : '0'
    }
  },
    // Header con barra de acento celeste (clickeable para expandir/contraer)
    React.createElement("div", {
      className: "card-maf-header no-margin cursor-pointer",
      onClick: () => setIsExpanded(!isExpanded)
    },
      React.createElement("div", {
        className: "flex items-center justify-between"
      },
        React.createElement("div", {
          className: "flex items-center gap-3"
        },
          React.createElement("span", {
            className: "text-2xl"
          }, "🤖"),
          React.createElement("div", null,
            React.createElement("h3", {
              className: "font-bold text-lg"
            }, "Seguimiento y Tareas"),
            React.createElement("p", {
              className: "text-xs opacity-80"
            }, "Lo primero de hoy")
          )
        ),
        React.createElement("div", {
          className: "flex items-center gap-3"
        },
          React.createElement("span", {
            className: "badge-maf advertencia"
          }, `${urgentes.length} ${urgentes.length === 1 ? 'tarea' : 'tareas'}`),
          React.createElement("span", {
            className: "text-lg"
          }, isExpanded ? "▼" : "▶")
        )
      )
    ),

    // Lista de tareas urgentes
    isExpanded && React.createElement("div", {
      className: "px-5 pb-5 pt-5 space-y-3"
    },
      urgentes.slice(0, 5).map((item, idx) => {
        const buttonConfig = getAccionButton(item.accion);
        
        return React.createElement("div", {
          key: idx,
          className: `border-2 rounded-lg p-4 ${getUrgenciaColor(item.urgencia)} transition-all hover:shadow-md`
        },
          React.createElement("div", {
            className: "flex items-start gap-3"
          },
            React.createElement("span", {
              className: "text-2xl flex-shrink-0"
            }, getUrgenciaIcon(item.urgencia)),
            React.createElement("div", {
              className: "flex-1 min-w-0"
            },
              React.createElement("div", {
                className: "flex items-center gap-2 mb-2"
              },
                React.createElement("h4", {
                  className: "font-bold text-gray-900"
                }, item.lead.cliente.nombre),
                React.createElement("span", {
                  className: `px-2 py-0.5 rounded text-xs font-medium ${
                    item.urgencia === 'alta' ? 'bg-red-100 text-red-800' :
                    item.urgencia === 'media' ? 'bg-amber-100 text-amber-800' :
                    'bg-gray-100 text-gray-800'
                  }`
                }, item.urgencia.toUpperCase())
              ),
              React.createElement("p", {
                className: "text-sm text-gray-700 mb-3"
              }, item.razon),
              React.createElement("div", {
                className: "flex items-center gap-2 text-xs text-gray-600"
              },
                React.createElement("span", null, `📱 ${item.lead.cliente.telefono}`),
                React.createElement("span", null, "•"),
                React.createElement("span", null, `📧 ${item.lead.cliente.email}`),
                item.lead.modeloInteres && React.createElement(React.Fragment, null,
                  React.createElement("span", null, "•"),
                  React.createElement("span", null, `🚗 ${item.lead.modeloInteres}`)
                )
              )
            ),
            React.createElement("button", {
              onClick: () => onLeadClick && onLeadClick(item.lead),
              className: `${buttonConfig.color} flex-shrink-0`
            }, buttonConfig.text)
          )
        );
      }),

      // Mostrar si hay más de 5
      urgentes.length > 5 && React.createElement("div", {
        className: "text-center pt-2 border-t border-gray-600"
      },
        React.createElement("p", {
          className: "text-sm text-gray-300"
        }, `...y ${urgentes.length - 5} ${urgentes.length - 5 === 1 ? 'tarea más' : 'tareas más'}`)
      )
    ),

    // Footer con mensaje motivacional
    isExpanded && React.createElement("div", {
      className: "px-5 pb-5 pt-3 border-t border-gray-200"
    },
      React.createElement("p", {
        className: "text-xs text-gray-600 text-center"
      }, "💡 Cada lead atendido a tiempo es una venta que no se pierde. ¡Tú puedes!")
    )
  );
}

export default AgenteAsistente;
