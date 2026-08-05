/**
 * Componente: Módulo de Citas (MOCKUP PARA DEMO)
 * 
 * Vista de "Mis Citas" para mostrar en la presentación
 * NOTA: Este es un mockup estático para la demo del 09-AGO
 * La implementación completa será en Fase 1
 * 
 * Creado: 05-AGO-2026
 */

const { React } = window;
const { useState } = React;

export function ModuloCitas({ vendedorId = 'v1', className = '' }) {
  const [filtro, setFiltro] = useState('todas'); // todas, hoy, pendientes

  // Datos mock de citas
  const citas = [
    {
      id: 'c1',
      cliente: 'Carlos Mendoza',
      fecha: new Date('2026-08-05T10:00:00'),
      concesionario: 'Autoespar San Isidro',
      modelo: 'Toyota Corolla',
      fuente: 'Call Center',
      estado: 'programada', // programada, confirmada, asistio, no_asistio
      notas: 'Cliente interesado en plan de 3 cuotas'
    },
    {
      id: 'c2',
      cliente: 'Ana Torres',
      fecha: new Date('2026-08-05T15:30:00'),
      concesionario: 'Autoespar Surco',
      modelo: 'Toyota RAV4',
      fuente: 'Landing Digital',
      estado: 'confirmada',
      notas: 'Perfil de ingreso alto, hot lead'
    },
    {
      id: 'c3',
      cliente: 'Miguel Díaz',
      fecha: new Date('2026-08-06T11:00:00'),
      concesionario: 'Autoespar San Juan de Lurigancho',
      modelo: 'Toyota Yaris',
      fuente: 'Call Center',
      estado: 'programada',
      notas: ''
    },
    {
      id: 'c4',
      cliente: 'Roberto Ríos',
      fecha: new Date('2026-08-04T14:00:00'),
      concesionario: 'Autoespar Miraflores',
      modelo: 'Toyota Hilux',
      fuente: 'Base Toyota',
      estado: 'asistio',
      notas: 'Cita completada - evaluación aprobada'
    },
    {
      id: 'c5',
      cliente: 'María Ruiz',
      fecha: new Date('2026-08-04T09:00:00'),
      concesionario: 'Autoespar Surco',
      modelo: 'Toyota Corolla',
      fuente: 'Call Center',
      estado: 'no_asistio',
      notas: 'No se presentó - reagendar'
    }
  ];

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'programada': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'confirmada': return 'bg-green-50 text-green-700 border-green-200';
      case 'asistio': return 'bg-gray-50 text-gray-600 border-gray-200';
      case 'no_asistio': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getEstadoTexto = (estado) => {
    switch(estado) {
      case 'programada': return '📅 Programada';
      case 'confirmada': return '✅ Confirmada';
      case 'asistio': return '✓ Asistió';
      case 'no_asistio': return '✗ No asistió';
      default: return estado;
    }
  };

  const esHoy = (fecha) => {
    const hoy = new Date();
    return fecha.toDateString() === hoy.toDateString();
  };

  const citasFiltradas = citas.filter(cita => {
    if (filtro === 'hoy') return esHoy(cita.fecha);
    if (filtro === 'pendientes') return ['programada', 'confirmada'].includes(cita.estado);
    return true;
  });

  return React.createElement("div", {
    className: `card-maf ${className}`
  },
    // Header
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
          }, "📅"),
          React.createElement("div", null,
            React.createElement("h3", {
              className: "font-bold text-base"
            }, "Mis Citas"),
            React.createElement("p", {
              className: "text-xs opacity-80"
            }, `${citasFiltradas.length} cita${citasFiltradas.length !== 1 ? 's' : ''}`)
          )
        ),
        React.createElement("div", {
          className: "flex items-center gap-2"
        },
          // Filtros
          ['todas', 'hoy', 'pendientes'].map(f => 
            React.createElement("button", {
              key: f,
              onClick: () => setFiltro(f),
              className: `text-xs px-3 py-1 rounded transition-colors ${filtro === f ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
            }, f.charAt(0).toUpperCase() + f.slice(1))
          )
        )
      )
    ),

    // Lista de citas
    React.createElement("div", {
      className: "space-y-3 mt-4"
    },
      citasFiltradas.length === 0 ? 
        React.createElement("div", {
          className: "text-center py-12 text-gray-400"
        },
          React.createElement("div", {
            className: "text-4xl mb-3"
          }, "📅"),
          React.createElement("p", {
            className: "text-sm"
          }, "No hay citas para mostrar")
        )
      :
      citasFiltradas.map(cita =>
        React.createElement("div", {
          key: cita.id,
          className: `p-4 border rounded-lg hover:shadow-md transition-shadow ${esHoy(cita.fecha) ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`
        },
          // Header de la cita
          React.createElement("div", {
            className: "flex items-start justify-between mb-3"
          },
            React.createElement("div", null,
              React.createElement("h4", {
                className: "font-bold text-gray-900"
              }, cita.cliente),
              React.createElement("p", {
                className: "text-xs text-gray-500 mt-1"
              }, `📍 ${cita.concesionario}`)
            ),
            React.createElement("span", {
              className: `text-xs px-2 py-1 rounded border ${getEstadoColor(cita.estado)}`
            }, getEstadoTexto(cita.estado))
          ),

          // Detalles
          React.createElement("div", {
            className: "grid grid-cols-2 gap-3 mb-3 text-xs"
          },
            React.createElement("div", null,
              React.createElement("span", {
                className: "text-gray-500"
              }, "📅 Fecha:"),
              React.createElement("br", null),
              React.createElement("span", {
                className: "font-semibold text-gray-900"
              }, cita.fecha.toLocaleDateString('es-PE', { weekday: 'short', day: 'numeric', month: 'short' }))
            ),
            React.createElement("div", null,
              React.createElement("span", {
                className: "text-gray-500"
              }, "🕐 Hora:"),
              React.createElement("br", null),
              React.createElement("span", {
                className: "font-semibold text-gray-900"
              }, cita.fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }))
            ),
            React.createElement("div", null,
              React.createElement("span", {
                className: "text-gray-500"
              }, "🚗 Modelo:"),
              React.createElement("br", null),
              React.createElement("span", {
                className: "font-semibold text-gray-900"
              }, cita.modelo)
            ),
            React.createElement("div", null,
              React.createElement("span", {
                className: "text-gray-500"
              }, "📌 Fuente:"),
              React.createElement("br", null),
              React.createElement("span", {
                className: "font-semibold text-gray-900"
              }, cita.fuente)
            )
          ),

          // Notas
          cita.notas && React.createElement("div", {
            className: "text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 mb-3"
          },
            React.createElement("span", {
              className: "font-semibold"
            }, "📝 Notas: "),
            cita.notas
          ),

          // Acciones
          ['programada', 'confirmada'].includes(cita.estado) && React.createElement("div", {
            className: "flex gap-2"
          },
            React.createElement("button", {
              className: "flex-1 btn-maf-primary text-xs py-2",
              onClick: () => alert(`Marcar asistencia para ${cita.cliente}`)
            }, esHoy(cita.fecha) ? "✓ Marcar Asistencia" : "📅 Ver Detalles"),
            React.createElement("button", {
              className: "px-3 py-2 text-xs border border-gray-300 rounded hover:bg-gray-50",
              onClick: () => alert(`Reprogramar cita con ${cita.cliente}`)
            }, "↻ Reprogramar")
          )
        )
      )
    ),

    // Nota de desarrollo
    React.createElement("div", {
      className: "mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800"
    },
      React.createElement("span", {
        className: "font-semibold"
      }, "💡 Mockup para Demo:"),
      " Este es un prototipo visual. La funcionalidad completa de agendamiento, recordatorios y sincronización se implementará en Fase 1."
    )
  );
}

export default ModuloCitas;
