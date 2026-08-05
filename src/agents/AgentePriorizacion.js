/**
 * Agente 3: Priorización de Cartera (Semáforo Inteligente)
 * 
 * Especialista en: decirle al vendedor a quién llamar primero, 
 * para que su tiempo rinda más.
 * 
 * Nivel de impacto: Vendedor
 * Complejidad: MEDIA
 * 
 * Mensaje clave: "¿Cuánta más conversión saca tu equipo si cada vendedor 
 * trabaja primero los leads con mayor probabilidad de cierre, en vez de al ojo?"
 */

const { React } = window;
const { useState, useEffect, useMemo } = React;
import { LEADS, calcularScoreLead } from '../mockData.js';

export function AgentePriorizacion({ 
  vendedorId = 'v1',
  leadsOriginales = [],
  onReordenar = null,
  className = ''
}) {
  const [priorizacionActiva, setPriorizacionActiva] = useState(true);
  const [mostrarExplicacion, setMostrarExplicacion] = useState(true);

  // Calcular scores y ordenar leads
  const leadsConScore = useMemo(() => {
    // Usar leads pasados por props o filtrar de LEADS mock
    const leadsBase = leadsOriginales.length > 0 
      ? leadsOriginales 
      : LEADS.filter(l => l.vendedorId === vendedorId);

    // Calcular score para cada lead
    const conScores = leadsBase.map(lead => {
      try {
        const scoreData = calcularScoreLead(lead);
        return {
          ...lead,
          score: scoreData.score,
          temperatura: scoreData.temperatura,
          razonesScore: scoreData.razones
        };
      } catch (error) {
        console.error('Error calculando score para lead:', lead, error);
        return null;
      }
    }).filter(lead => lead !== null); // Filtrar leads con error

    // Ordenar por score descendente si la priorización está activa
    if (priorizacionActiva) {
      return conScores.sort((a, b) => b.score - a.score);
    }

    return conScores;
  }, [vendedorId, leadsOriginales, priorizacionActiva]);

  // Notificar cambios al componente padre
  // DESHABILITADO temporalmente para evitar loop infinito
  /*
  useEffect(() => {
    if (onReordenar && priorizacionActiva) {
      onReordenar(leadsConScore);
    }
  }, [leadsConScore, priorizacionActiva]);
  */

  // Efecto proactivo: mostrar que el agente está trabajando
  // DESHABILITADO - causaba loop infinito
  /*
  useEffect(() => {
    if (priorizacionActiva && leadsConScore.length > 0) {
      console.log(`🎯 Agente de Priorización: Ordené ${leadsConScore.length} leads por temperatura`);
    }
  }, [leadsConScore, priorizacionActiva]);
  */

  const togglePriorizacion = () => {
    setPriorizacionActiva(!priorizacionActiva);
  };

  const getSemaforoColor = (temperatura) => {
    switch (temperatura) {
      case 'caliente': return { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800', icon: '🟢', label: 'Caliente' };
      case 'tibio': return { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800', icon: '🟡', label: 'Tibio' };
      case 'frio': return { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800', icon: '🔴', label: 'Frío' };
      default: return { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-800', icon: '⚪', label: 'Sin clasificar' };
    }
  };

  const estadisticas = useMemo(() => {
    const total = leadsConScore.length;
    const calientes = leadsConScore.filter(l => l.temperatura === 'caliente').length;
    const tibios = leadsConScore.filter(l => l.temperatura === 'tibio').length;
    const frios = leadsConScore.filter(l => l.temperatura === 'frio').length;

    return { total, calientes, tibios, frios };
  }, [leadsConScore]);

  return React.createElement("div", {
    className: `${className}`
  },
    // Header con toggle
    React.createElement("div", {
      className: "bg-gradient-to-r from-purple-900 to-indigo-900 border-2 border-purple-500 rounded-lg shadow-xl p-4 mb-4"
    },
      React.createElement("div", {
        className: "flex items-center justify-between"
      },
        React.createElement("div", {
          className: "flex items-center gap-3"
        },
          React.createElement("div", {
            className: "w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xl"
          }, "🎯"),
          React.createElement("div", null,
            React.createElement("h3", {
              className: "font-bold text-white text-lg"
            }, "Priorización Inteligente"),
            React.createElement("p", {
              className: "text-xs text-purple-200"
            }, "🤖 especialista en maximizar tu conversión")
          )
        ),
        React.createElement("label", {
          className: "flex items-center gap-3 cursor-pointer"
        },
          React.createElement("span", {
            className: "text-sm text-white font-medium"
          }, priorizacionActiva ? "Activada" : "Desactivada"),
          React.createElement("div", {
            className: "relative"
          },
            React.createElement("input", {
              type: "checkbox",
              checked: priorizacionActiva,
              onChange: togglePriorizacion,
              className: "sr-only peer"
            }),
            React.createElement("div", {
              className: "w-14 h-7 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"
            })
          )
        )
      ),

      // Estadísticas
      React.createElement("div", {
        className: "grid grid-cols-4 gap-3 mt-4"
      },
        [
          { label: 'Total', value: estadisticas.total, color: 'bg-gray-700 text-white' },
          { label: '🟢 Calientes', value: estadisticas.calientes, color: 'bg-green-600 text-white' },
          { label: '🟡 Tibios', value: estadisticas.tibios, color: 'bg-yellow-600 text-white' },
          { label: '🔴 Fríos', value: estadisticas.frios, color: 'bg-red-600 text-white' }
        ].map((stat, idx) =>
          React.createElement("div", {
            key: idx,
            className: `${stat.color} rounded-lg p-3 text-center`
          },
            React.createElement("p", {
              className: "text-2xl font-bold"
            }, stat.value),
            React.createElement("p", {
              className: "text-xs opacity-90 mt-1"
            }, stat.label)
          )
        )
      )
    ),

    // Explicación del criterio (colapsable)
    priorizacionActiva && React.createElement("div", {
      className: "bg-blue-50 border-2 border-blue-300 rounded-lg mb-4 overflow-hidden"
    },
      React.createElement("button", {
        onClick: () => setMostrarExplicacion(!mostrarExplicacion),
        className: "w-full p-3 flex items-center justify-between hover:bg-blue-100 transition-colors"
      },
        React.createElement("div", {
          className: "flex items-center gap-2"
        },
          React.createElement("span", {
            className: "text-blue-700 font-bold"
          }, "💡"),
          React.createElement("span", {
            className: "text-sm font-semibold text-blue-900"
          }, "Por qué ordené así tu cartera")
        ),
        React.createElement("span", {
          className: "text-blue-700"
        }, mostrarExplicacion ? "▼" : "▶")
      ),
      mostrarExplicacion && React.createElement("div", {
        className: "p-4 pt-0 text-sm text-blue-800"
      },
        React.createElement("p", {
          className: "mb-3"
        }, "Prioricé tus leads considerando:"),
        React.createElement("ul", {
          className: "space-y-2 ml-4"
        },
          React.createElement("li", {
            className: "flex items-start gap-2"
          },
            React.createElement("span", null, "✓"),
            React.createElement("span", null, React.createElement("strong", null, "Fuente:"), " Leads de landing digital con formulario completo tienen mayor intención que bases masivas")
          ),
          React.createElement("li", {
            className: "flex items-start gap-2"
          },
            React.createElement("span", null, "✓"),
            React.createElement("span", null, React.createElement("strong", null, "Perfil:"), " Clientes con ingresos altos califican mejor y cierran más rápido")
          ),
          React.createElement("li", {
            className: "flex items-start gap-2"
          },
            React.createElement("span", null, "✓"),
            React.createElement("span", null, React.createElement("strong", null, "Señales de intención:"), " Citas agendadas, modelo específico, respuestas rápidas")
          ),
          React.createElement("li", {
            className: "flex items-start gap-2"
          },
            React.createElement("span", null, "✓"),
            React.createElement("span", null, React.createElement("strong", null, "Seguimiento:"), " Leads sin movimiento pierden temperatura con el tiempo")
          )
        ),
        React.createElement("div", {
          className: "mt-3 p-3 bg-blue-100 rounded border border-blue-200"
        },
          React.createElement("p", {
            className: "text-xs italic"
          }, "📊 Recomendación explicable — tú decides el orden final. Puedes desactivar la priorización con el toggle arriba.")
        )
      )
    ),

    // Leyenda de semáforo
    priorizacionActiva && React.createElement("div", {
      className: "bg-white border border-gray-200 rounded-lg p-3 mb-4"
    },
      React.createElement("p", {
        className: "text-xs font-semibold text-gray-600 mb-2"
      }, "Leyenda de temperatura:"),
      React.createElement("div", {
        className: "flex gap-4 flex-wrap"
      },
        ['caliente', 'tibio', 'frio'].map(temp => {
          const colors = getSemaforoColor(temp);
          return React.createElement("div", {
            key: temp,
            className: "flex items-center gap-2"
          },
            React.createElement("span", {
              className: "text-xl"
            }, colors.icon),
            React.createElement("span", {
              className: `text-sm font-medium ${colors.text}`
            }, colors.label),
            React.createElement("span", {
              className: "text-xs text-gray-500"
            }, 
              temp === 'caliente' ? '(Score ≥ 70)' :
              temp === 'tibio' ? '(Score 50-69)' :
              '(Score < 50)'
            )
          );
        })
      )
    ),

    // Lista de leads priorizada (preview - primeros 3)
    priorizacionActiva && leadsConScore.length > 0 && React.createElement("div", {
      className: "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
    },
      React.createElement("div", {
        className: "bg-gray-50 border-b border-gray-200 p-3"
      },
        React.createElement("h4", {
          className: "text-sm font-semibold text-gray-700"
        }, "Vista previa priorizada (top 3)")
      ),
      React.createElement("div", {
        className: "divide-y divide-gray-100"
      },
        leadsConScore.filter(lead => lead && (lead.nombre || (lead.cliente && lead.cliente.nombre))).slice(0, 3).map((lead, idx) => {
          const colors = getSemaforoColor(lead.temperatura);
          return React.createElement("div", {
            key: lead.id,
            className: `p-4 hover:bg-gray-50 transition-colors ${colors.bg} border-l-4 ${colors.border}`
          },
            React.createElement("div", {
              className: "flex items-start gap-3"
            },
              React.createElement("div", {
                className: "flex flex-col items-center gap-1 flex-shrink-0"
              },
                React.createElement("span", {
                  className: "text-3xl"
                }, colors.icon),
                React.createElement("span", {
                  className: `text-xs font-bold ${colors.text}`
                }, `#${idx + 1}`)
              ),
              React.createElement("div", {
                className: "flex-1 min-w-0"
              },
                React.createElement("div", {
                  className: "flex items-center gap-2 mb-2"
                },
                  React.createElement("h5", {
                    className: "font-bold text-gray-900"
                  }, lead.cliente ? lead.cliente.nombre : lead.nombre), // Adaptado para ambas estructuras
                  React.createElement("span", {
                    className: `px-2 py-0.5 rounded text-xs font-bold ${colors.bg} ${colors.text}`
                  }, `Score: ${lead.score}`)
                ),
                React.createElement("div", {
                  className: "text-xs text-gray-600 space-y-1 mb-2"
                },
                  React.createElement("p", null, `📍 ${lead.fuente} · ${lead.estado}`),
                  lead.modeloInteres && React.createElement("p", null, `🚗 Interés: ${lead.modeloInteres}`),
                  lead.citaAgendada && React.createElement("p", {
                    className: "text-green-700 font-semibold"
                  }, `📅 Cita agendada: ${lead.citaAgendada.toLocaleDateString('es-PE')}`)
                ),
                React.createElement("div", {
                  className: "bg-white border border-gray-200 rounded p-2"
                },
                  React.createElement("p", {
                    className: "text-xs font-semibold text-gray-700 mb-1"
                  }, "Por qué es prioritario:"),
                  React.createElement("ul", {
                    className: "text-xs text-gray-600 space-y-0.5"
                  },
                    lead.razonesScore && lead.razonesScore.map((razon, ridx) =>
                      React.createElement("li", {
                        key: ridx,
                        className: "flex items-start gap-1"
                      },
                        React.createElement("span", null, "•"),
                        React.createElement("span", null, razon)
                      )
                    )
                  )
                )
              ),
              React.createElement("div", {
                className: "flex flex-col gap-2"
              },
                React.createElement("button", {
                  className: `px-4 py-2 rounded text-white text-sm font-medium ${
                    idx === 0 ? 'bg-green-600 hover:bg-green-700 animate-pulse' :
                    'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`
                }, idx === 0 ? "¡Llamar 1°!" : `Llamar ${idx + 1}°`)
              )
            )
          );
        })
      ),
      leadsConScore.length > 3 && React.createElement("div", {
        className: "p-3 bg-gray-50 text-center border-t border-gray-200"
      },
        React.createElement("p", {
          className: "text-sm text-gray-600"
        }, `...y ${leadsConScore.length - 3} leads más ordenados por temperatura abajo`)
      )
    )
  );
}

export default AgentePriorizacion;
