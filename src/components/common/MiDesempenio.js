/**
 * Componente: Mi Desempeño
 * 
 * Dashboard personal del vendedor con:
 * - Meta del mes
 * - Ventas cerradas
 * - Tasa de cierre
 * - Progreso visual
 * - NUEVO (05-AGO): Citas generadas, Evaluaciones Equifax, Certificados + Ticket Promedio
 * 
 * Usado en el dashboard principal del vendedor
 */

const { React } = window;
const { useState, useEffect } = React;
import { VENDEDORES } from '../../mockData.js';

export function MiDesempenio({ vendedorId = 'v1', className = '' }) {
  // Obtener datos reales del vendedor desde mockData
  const vendedor = VENDEDORES.find(v => v.id === vendedorId) || VENDEDORES[0];
  
  // Datos del vendedor
  const [datos, setDatos] = useState({
    meta: vendedor.metaMensual,
    ventasActuales: vendedor.ventasMes,
    tasaCierre: (vendedor.tasaEfectividad * 100).toFixed(1),
    diasDelMes: 30,
    diasTranscurridos: 15,
    // NUEVAS MÉTRICAS (05-AGO-2026)
    citasGeneradas: vendedor.citasGeneradas,
    citasMeta: vendedor.citasMeta,
    evaluaciones: vendedor.evaluacionesEquifax,
    evaluacionesMeta: vendedor.evaluacionesMeta,
    certificados: vendedor.certificadosEmitidos,
    ticketPromedio: vendedor.ticketPromedio,
    ticketMeta: vendedor.ticketMeta
  });

  // Calcular métricas
  const progreso = (datos.ventasActuales / datos.meta) * 100;
  const avanceEsperado = (datos.diasTranscurridos / datos.diasDelMes) * 100;
  const estadoProgreso = progreso >= avanceEsperado ? 'adelantado' : 'atrasado';
  const diferencia = Math.abs(progreso - avanceEsperado).toFixed(1);
  
  // Determinar color del progreso
  const getColorProgreso = () => {
    if (progreso >= 100) return { bg: 'bg-green-500', text: 'text-green-700', border: 'border-green-500' };
    if (progreso >= avanceEsperado) return { bg: 'bg-blue-500', text: 'text-blue-700', border: 'border-blue-500' };
    if (progreso >= avanceEsperado * 0.8) return { bg: 'bg-yellow-500', text: 'text-yellow-700', border: 'border-yellow-500' };
    return { bg: 'bg-red-500', text: 'text-red-700', border: 'border-red-500' };
  };

  const colores = getColorProgreso();

  return React.createElement("div", {
    className: `card-maf ${className}`,
    'data-agente': 'desempeno'
  },
    // Header con barra de acento celeste
    React.createElement("div", {
      className: "card-maf-header"
    },
      React.createElement("div", {
        className: "flex items-center justify-between"
      },
        React.createElement("div", {
          className: "flex items-center gap-3"
        },
          React.createElement("span", {
            className: "text-2xl"
          }, "📊"),
          React.createElement("div", null,
            React.createElement("h3", {
              className: "font-bold text-base"
            }, "Mi Desempeño"),
            React.createElement("p", {
              className: "text-xs opacity-80"
            }, `Mes actual - Día ${datos.diasTranscurridos} de ${datos.diasDelMes}`)
          )
        ),
        React.createElement("span", {
          className: `badge-maf ${estadoProgreso === 'adelantado' || progreso >= 100 ? 'exito' : estadoProgreso === 'atrasado' ? 'advertencia' : 'gris'}`
        }, progreso >= 100 ? '¡Meta superada!' : estadoProgreso === 'adelantado' ? '✓ Adelantado' : '⚠ Requiere acción')
      )
    ),

    // Contenido
    React.createElement("div", {
      className: "mt-4"
    },
      // Métricas principales
      React.createElement("div", {
        className: "grid grid-cols-3 gap-4 mb-4"
      },
        // Meta
        React.createElement("div", {
          className: "text-center"
        },
          React.createElement("p", {
            className: "text-2xl font-bold text-gray-900"
          }, datos.meta),
          React.createElement("p", {
            className: "text-xs text-gray-500 mt-1"
          }, "Meta del mes")
        ),
        // Ventas actuales
        React.createElement("div", {
          className: "text-center border-l border-r border-gray-200"
        },
          React.createElement("p", {
            className: `text-2xl font-bold ${colores.text}`
          }, datos.ventasActuales),
          React.createElement("p", {
            className: "text-xs text-gray-500 mt-1"
          }, "Ventas cerradas")
        ),
        // Tasa de cierre
        React.createElement("div", {
          className: "text-center"
        },
          React.createElement("p", {
            className: "text-2xl font-bold text-gray-900"
          }, `${datos.tasaCierre}%`),
          React.createElement("p", {
            className: "text-xs text-gray-500 mt-1"
          }, "Tasa de cierre")
        )
      ),

      // Barra de progreso
      React.createElement("div", {
        className: "mb-4"
      },
        React.createElement("div", {
          className: "flex items-center justify-between mb-2"
        },
          React.createElement("span", {
            className: "text-xs font-semibold text-gray-700"
          }, "Progreso"),
          React.createElement("span", {
            className: `text-xs font-bold ${colores.text}`
          }, `${progreso.toFixed(1)}%`)
        ),
        // Barra con línea de referencia
        React.createElement("div", {
          className: "relative"
        },
          // Barra de fondo
          React.createElement("div", {
            className: "w-full h-8 bg-gray-200 rounded-lg overflow-hidden relative"
          },
            // Progreso actual (celeste MAF)
            React.createElement("div", {
              className: "h-full transition-all duration-500 flex items-center justify-end pr-2",
              style: { 
                width: `${Math.min(progreso, 100)}%`,
                backgroundColor: 'var(--maf-celeste-acento)'
              }
            },
              progreso >= 10 && React.createElement("span", {
                className: "text-xs font-bold text-white"
              }, datos.ventasActuales)
            ),
            // Línea de referencia (avance esperado)
            React.createElement("div", {
              className: "absolute top-0 bottom-0 w-0.5 bg-gray-600",
              style: { left: `${avanceEsperado}%` },
              title: `Avance esperado: ${avanceEsperado.toFixed(1)}%`
            })
          )
        ),
        // Leyenda
        React.createElement("div", {
          className: "flex items-center justify-between mt-2 text-xs"
        },
          React.createElement("span", {
            className: "text-gray-500"
          }, `Esperado: ${(datos.meta * avanceEsperado / 100).toFixed(0)} ventas`),
          React.createElement("span", {
            className: colores.text + " font-semibold"
          }, estadoProgreso === 'adelantado' 
            ? `${diferencia}% por encima` 
            : `${diferencia}% por debajo`)
        )
      ),

      // ═══════════════════════════════════════════════════════════════
      // SECCIÓN NUEVOS 3 INDICADORES CLAVE (05-AGO-2026)
      // ═══════════════════════════════════════════════════════════════
      React.createElement("div", {
        className: "mt-6 pt-6 border-t border-gray-200"
      },
        React.createElement("h4", {
          className: "text-sm font-bold text-gray-900 mb-4"
        }, "📈 Indicadores Clave del Mes"),
        
        React.createElement("div", {
          className: "grid grid-cols-3 gap-3"
        },
          // 1. CITAS GENERADAS
          React.createElement("div", {
            className: "bg-blue-50 border border-blue-200 rounded-lg p-3"
          },
            React.createElement("div", {
              className: "flex items-center justify-between mb-2"
            },
              React.createElement("span", {
                className: "text-xs font-semibold text-blue-700"
              }, "📅 Citas"),
              React.createElement("span", {
                className: `text-xs font-bold ${datos.citasGeneradas >= datos.citasMeta ? 'text-green-600' : 'text-blue-600'}`
              }, datos.citasGeneradas >= datos.citasMeta ? '✓' : `${((datos.citasGeneradas / datos.citasMeta) * 100).toFixed(0)}%`)
            ),
            React.createElement("p", {
              className: "text-2xl font-bold text-blue-900"
            }, datos.citasGeneradas),
            React.createElement("p", {
              className: "text-xs text-blue-600 mt-1"
            }, `Meta: ${datos.citasMeta}`)
          ),
          
          // 2. EVALUACIONES EQUIFAX
          React.createElement("div", {
            className: "bg-purple-50 border border-purple-200 rounded-lg p-3"
          },
            React.createElement("div", {
              className: "flex items-center justify-between mb-2"
            },
              React.createElement("span", {
                className: "text-xs font-semibold text-purple-700"
              }, "🔍 Evaluaciones Equifax"),
              React.createElement("span", {
                className: `text-xs font-bold ${datos.evaluaciones >= datos.evaluacionesMeta ? 'text-green-600' : 'text-purple-600'}`
              }, datos.evaluaciones >= datos.evaluacionesMeta ? '✓' : `${((datos.evaluaciones / datos.evaluacionesMeta) * 100).toFixed(0)}%`)
            ),
            React.createElement("p", {
              className: "text-2xl font-bold text-purple-900"
            }, datos.evaluaciones),
            React.createElement("p", {
              className: "text-xs text-purple-600 mt-1"
            }, `Meta: ${datos.evaluacionesMeta}`)
          ),
          
          // 3. CERTIFICADOS + TICKET PROMEDIO
          React.createElement("div", {
            className: "bg-green-50 border border-green-200 rounded-lg p-3"
          },
            React.createElement("div", {
              className: "flex items-center justify-between mb-2"
            },
              React.createElement("span", {
                className: "text-xs font-semibold text-green-700"
              }, "📜 Certificados"),
              React.createElement("span", {
                className: `text-xs font-bold ${datos.ticketPromedio >= datos.ticketMeta ? 'text-green-600' : 'text-orange-600'}`
              }, datos.ticketPromedio >= datos.ticketMeta ? '✓ Ticket OK' : '⚠ Ticket bajo')
            ),
            React.createElement("p", {
              className: "text-2xl font-bold text-green-900"
            }, datos.certificados),
            React.createElement("p", {
              className: "text-xs text-green-600 mt-1"
            }, `$${datos.ticketPromedio.toLocaleString('en-US')}`)
          )
        ),
        
        // Nota sobre ticket promedio
        React.createElement("div", {
          className: "mt-3 text-xs text-gray-500 italic"
        }, `💰 Ticket promedio meta: $${datos.ticketMeta.toLocaleString('en-US')} | Actual: $${datos.ticketPromedio.toLocaleString('en-US')}`)
      ),

      // Mensaje motivacional con objetivo diario
      React.createElement("div", {
        className: `p-3 rounded-lg mt-4 ${progreso >= 100 ? 'bg-green-50 border border-green-200' : progreso >= avanceEsperado ? 'bg-blue-50 border border-blue-200' : 'bg-yellow-50 border border-yellow-200'}`
      },
        // Objetivo diario (NUEVO 05-AGO)
        React.createElement("div", {
          className: "mb-2 pb-2 border-b border-gray-300"
        },
          React.createElement("p", {
            className: "text-sm font-bold text-gray-900"
          }, "🎯 Objetivo Diario"),
          React.createElement("p", {
            className: "text-xs text-gray-700 mt-1"
          }, (() => {
            const ventasFaltantes = datos.meta - datos.ventasActuales;
            const diasRestantes = datos.diasDelMes - datos.diasTranscurridos;
            const ventasPorDia = diasRestantes > 0 ? (ventasFaltantes / diasRestantes).toFixed(1) : 0;
            
            if (progreso >= 100) {
              return '✅ Meta superada - Mantén el ritmo';
            } else if (ventasPorDia <= 0) {
              return '✅ Sin ventas pendientes';
            } else {
              return `Debes cerrar ${ventasPorDia} venta${ventasPorDia > 1 ? 's' : ''} por día (faltan ${ventasFaltantes} en ${diasRestantes} días)`;
            }
          })())
        ),
        
        // Mensaje motivacional
        React.createElement("p", {
          className: "text-xs text-gray-700"
        },
          progreso >= 100
            ? `🎉 ¡Excelente trabajo! Superaste tu meta. Sigue así para cerrar el mes con récord.`
            : progreso >= avanceEsperado
            ? `💪 Vas bien. Necesitas ${(datos.meta - datos.ventasActuales)} ventas más en ${datos.diasDelMes - datos.diasTranscurridos} días.`
            : `⚠️ Requiere acción. Enfócate en leads HOT (🟢) y agenda citas HOY para recuperar ritmo.`
        )
      )
    )
  );
}
