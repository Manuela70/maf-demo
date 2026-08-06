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
      'Llamar': { text: '💬 Enviar WhatsApp de seguimiento', color: 'btn-maf-primary' },
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
