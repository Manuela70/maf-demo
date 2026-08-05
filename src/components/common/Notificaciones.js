/**
 * Componente: Notificaciones / Recordatorios
 * 
 * Campanita con badge de notificaciones
 * Muestra recordatorios del vendedor y alertas del sistema
 * 
 * Usado en el GlobalHeader
 */

const { React } = window;
const { useState, useEffect } = React;

export function Notificaciones({ vendedorId = 'v1', className = '' }) {
  const [mostrar, setMostrar] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [noLeidas, setNoLeidas] = useState(0);

  // Simular carga de notificaciones (en producción vendría de API)
  useEffect(() => {
    const cargarNotificaciones = () => {
      const ahora = new Date();
      const notifs = [
        // NUEVA ALERTA CRÍTICA: Lead sin contactar en 30 min (05-AGO-2026)
        {
          id: 0,
          tipo: 'alerta_critica',
          titulo: '⚡ URGENTE: Lead sin contactar',
          mensaje: 'Pedro Navarro - Lead nuevo hace 35 minutos SIN CONTACTAR (límite: 30 min)',
          timestamp: new Date(ahora.getTime() - 35 * 60 * 1000), // Hace 35 min
          leida: false,
          urgencia: 'critica', // Nueva urgencia máxima
          icono: '⚡',
          tiempoTranscurrido: 35
        },
        {
          id: 1,
          tipo: 'recordatorio',
          titulo: 'Retomar llamada',
          mensaje: 'Carlos Mendoza - Prometiste llamar hoy a las 3:00 PM',
          timestamp: new Date(ahora.getTime() - 2 * 60 * 60 * 1000), // Hace 2h
          leida: false,
          urgencia: 'alta',
          icono: '📞'
        },
        {
          id: 2,
          tipo: 'alerta_sistema',
          titulo: 'Lead sin movimiento',
          mensaje: 'Ana Torres lleva 3 días sin cambio de estado',
          timestamp: new Date(ahora.getTime() - 5 * 60 * 60 * 1000), // Hace 5h
          leida: false,
          urgencia: 'media',
          icono: '⚠️'
        },
        {
          id: 3,
          tipo: 'recordatorio',
          titulo: 'Enviar documentos',
          mensaje: 'Roberto Ríos - Pendiente envío de documentos evaluación',
          timestamp: new Date(ahora.getTime() - 1 * 24 * 60 * 60 * 1000), // Ayer
          leida: true,
          urgencia: 'baja',
          icono: '📄'
        },
        {
          id: 4,
          tipo: 'alerta_sistema',
          titulo: 'Lead próximo a cerrarse',
          mensaje: 'María Ruiz - Sin respuesta hace 5 días. Se cerrará automáticamente mañana.',
          timestamp: new Date(ahora.getTime() - 8 * 60 * 60 * 1000), // Hace 8h
          leida: false,
          urgencia: 'alta',
          icono: '🔴'
        }
      ];
      
      setNotificaciones(notifs);
      setNoLeidas(notifs.filter(n => !n.leida).length);
    };

    cargarNotificaciones();
    // Actualizar cada minuto
    const interval = setInterval(cargarNotificaciones, 60000);
    return () => clearInterval(interval);
  }, [vendedorId]);

  const marcarComoLeida = (id) => {
    setNotificaciones(prev => prev.map(n => 
      n.id === id ? { ...n, leida: true } : n
    ));
    setNoLeidas(prev => Math.max(0, prev - 1));
  };

  const marcarTodasLeidas = () => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
    setNoLeidas(0);
  };

  const formatearTiempo = (timestamp) => {
    const diff = Date.now() - timestamp.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    
    if (dias > 0) return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    if (horas > 0) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    if (minutos > 0) return `Hace ${minutos} min`;
    return 'Ahora';
  };

  const getColorUrgencia = (urgencia) => {
    switch(urgencia) {
      case 'critica': return 'bg-red-100 border-red-400 border-2'; // NUEVO: crítica con borde grueso
      case 'alta': return 'bg-red-50 border-red-200';
      case 'media': return 'bg-yellow-50 border-yellow-200';
      case 'baja': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return React.createElement("div", {
    className: `relative ${className}`
  },
    // Botón campanita
    React.createElement("button", {
      onClick: () => setMostrar(!mostrar),
      className: "relative p-2 rounded-lg hover:bg-gray-100 transition-colors notification-bell"
    },
      React.createElement("span", {
        className: "text-2xl"
      }, "🔔"),
      // Badge con número de notificaciones no leídas
      noLeidas > 0 && React.createElement("div", {
        className: "absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center"
      },
        React.createElement("span", {
          className: "text-xs font-bold text-white"
        }, noLeidas > 9 ? '9+' : noLeidas)
      )
    ),

    // Dropdown de notificaciones
    mostrar && React.createElement(React.Fragment, null,
      // Overlay para cerrar al hacer click fuera
      React.createElement("div", {
        className: "fixed inset-0 z-40",
        onClick: () => setMostrar(false)
      }),
      
      // Panel de notificaciones
      React.createElement("div", {
        className: "absolute top-full right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden"
      },
        // Header
        React.createElement("div", {
          className: "bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between"
        },
          React.createElement("div", null,
            React.createElement("h3", {
              className: "font-bold text-gray-900 text-sm"
            }, "🔔 Notificaciones"),
            React.createElement("p", {
              className: "text-xs text-gray-500"
            }, `${noLeidas} sin leer`)
          ),
          noLeidas > 0 && React.createElement("button", {
            onClick: marcarTodasLeidas,
            className: "text-xs text-blue-600 hover:text-blue-800 font-medium"
          }, "Marcar todas leídas")
        ),

        // Lista de notificaciones
        React.createElement("div", {
          className: "max-h-96 overflow-y-auto"
        },
          notificaciones.length === 0 ? 
            React.createElement("div", {
              className: "p-8 text-center text-gray-400"
            },
              React.createElement("span", {
                className: "text-4xl mb-2 block"
              }, "✓"),
              React.createElement("p", {
                className: "text-sm"
              }, "No tienes notificaciones")
            )
          :
            notificaciones.map(notif =>
              React.createElement("div", {
                key: notif.id,
                onClick: () => !notif.leida && marcarComoLeida(notif.id),
                className: `p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                  notif.leida ? 'bg-white opacity-60' : getColorUrgencia(notif.urgencia)
                } hover:bg-gray-50`
              },
                React.createElement("div", {
                  className: "flex items-start gap-3"
                },
                  // Icono
                  React.createElement("div", {
                    className: "text-2xl flex-shrink-0"
                  }, notif.icono),
                  
                  // Contenido
                  React.createElement("div", {
                    className: "flex-1 min-w-0"
                  },
                    React.createElement("div", {
                      className: "flex items-center gap-2 mb-1"
                    },
                      React.createElement("h4", {
                        className: `font-semibold text-sm text-gray-900 ${!notif.leida ? 'font-bold' : ''}`
                      }, notif.titulo),
                      !notif.leida && React.createElement("div", {
                        className: "w-2 h-2 bg-blue-600 rounded-full"
                      })
                    ),
                    React.createElement("p", {
                      className: "text-xs text-gray-700 mb-1"
                    }, notif.mensaje),
                    React.createElement("p", {
                      className: "text-xs text-gray-400"
                    }, formatearTiempo(notif.timestamp))
                  )
                )
              )
            )
        ),

        // Footer
        React.createElement("div", {
          className: "bg-gray-50 px-4 py-2 border-t border-gray-200"
        },
          React.createElement("button", {
            onClick: () => {
              setMostrar(false);
              // Aquí navegaría a una vista de todas las notificaciones
            },
            className: "text-xs text-gray-600 hover:text-gray-900 font-medium w-full text-center"
          }, "Ver todas las notificaciones →")
        )
      )
    )
  );
}
