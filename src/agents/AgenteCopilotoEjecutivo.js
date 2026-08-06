/**
 * Agente 4: Copiloto Ejecutivo (Analítica Conversacional)
 * 
 * Especialista en: responder en lenguaje natural cómo va el negocio,
 * para que quien decide no dependa de armar reportes.
 * 
 * Nivel de impacto: Supervisor / Director
 * Complejidad: MEDIA
 * 
 * Mensaje clave: "¿Qué mejores decisiones toma tu dirección comercial cuando 
 * tiene la respuesta en línea, en el momento en que la pregunta?"
 */

const { React } = window;
const { useState, useEffect } = React;
import { 
  PREGUNTAS_EJECUTIVAS, 
  VENDEDORES, 
  SUCURSALES, 
  LEADS,
  METRICAS_DASHBOARD 
} from '../mockData.js';

export function AgenteCopilotoEjecutivo({ 
  rol = 'supervisor', // 'supervisor' o 'gerente'
  sucursalId = 's1',
  onDrillDown = null,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false); // Nuevo estado para minimizar completamente
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Preparar data del contexto
  const sucursal = SUCURSALES.find(s => s.id === sucursalId) || SUCURSALES[0];
  const vendedores = VENDEDORES.filter(v => v.sucursal === sucursal.nombre);
  const leads = LEADS.filter(l => l.sucursal === sucursal.nombre);

  const dataContext = {
    sucursal,
    vendedores,
    leads
  };

  // Mensaje de bienvenida proactivo
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([{
        type: 'agent',
        text: `👋 Hola, soy tu Copiloto Ejecutivo. Especialista en responder cómo va tu negocio, al instante. Pregúntame lo que necesites sobre tu ${rol === 'supervisor' ? 'equipo' : 'operación'}.`,
        timestamp: new Date()
      }]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [rol]);

  // Preguntas sugeridas según el rol
  const preguntasSugeridas = rol === 'supervisor' 
    ? [
        '¿Cómo va mi equipo hoy?',
        '¿Qué dealer no cumple las 5 derivaciones diarias?',
        '¿Cómo va el ticket promedio vs meta?'
      ]
    : [
        '¿Cómo va mi equipo hoy?',
        '¿Qué sucursal cayó esta semana?',
        '¿Cómo está la conversión?'
      ];

  // Buscar respuesta en PREGUNTAS_EJECUTIVAS
  const buscarRespuesta = (pregunta) => {
    const preguntaLower = pregunta.toLowerCase();
    
    // Matching por keywords
    if (preguntaLower.includes('equipo') || preguntaLower.includes('cómo va')) {
      return PREGUNTAS_EJECUTIVAS['como_va_equipo'];
    }
    if (preguntaLower.includes('mejor') || preguntaLower.includes('peor') || preguntaLower.includes('vendedor')) {
      return PREGUNTAS_EJECUTIVAS['mejor_peor_vendedor'];
    }
    if (preguntaLower.includes('sucursal') || preguntaLower.includes('cayó') || preguntaLower.includes('bajó')) {
      return PREGUNTAS_EJECUTIVAS['sucursal_cayo'];
    }
    if (preguntaLower.includes('conversión') || preguntaLower.includes('conversion')) {
      return PREGUNTAS_EJECUTIVAS['conversion'];
    }
    // NUEVAS PREGUNTAS (06-AGO-2026)
    if (preguntaLower.includes('derivaciones') && (preguntaLower.includes('cumple') || preguntaLower.includes('dealer'))) {
      return PREGUNTAS_EJECUTIVAS['derivaciones_incumplimiento'];
    }
    if (preguntaLower.includes('derivaciones') && preguntaLower.includes('por dealer')) {
      return PREGUNTAS_EJECUTIVAS['derivaciones_por_dealer'];
    }
    if (preguntaLower.includes('derivó') || preguntaLower.includes('derivo')) {
      return PREGUNTAS_EJECUTIVAS['quien_derivo_deal'];
    }
    if (preguntaLower.includes('ticket') && (preguntaLower.includes('promedio') || preguntaLower.includes('meta'))) {
      return PREGUNTAS_EJECUTIVAS['ticket_promedio_vs_meta'];
    }
    
    return null;
  };

  // Formatear texto con markdown bold
  const formatearTexto = (texto) => {
    // Convertir **texto** a <strong>texto</strong>
    const partes = texto.split(/(\*\*[^*]+\*\*)/g);
    return partes.map((parte, idx) => {
      if (parte.startsWith('**') && parte.endsWith('**')) {
        return React.createElement('strong', { key: idx }, parte.slice(2, -2));
      }
      return parte;
    });
  };

  const handleSend = (preguntaText = null) => {
    const pregunta = preguntaText || inputValue.trim();
    if (!pregunta) return;

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, {
      type: 'user',
      text: pregunta,
      timestamp: new Date()
    }]);

    setInputValue('');
    setIsTyping(true);

    // Simular delay de procesamiento
    setTimeout(() => {
      const preguntaConfig = buscarRespuesta(pregunta);
      
      if (preguntaConfig) {
        // Ejecutar función de respuesta con data del contexto
        const respuestaData = preguntaConfig.respuesta(dataContext);
        
        setMessages(prev => [...prev, {
          type: 'agent',
          text: respuestaData.texto,
          acciones: respuestaData.acciones || [],
          timestamp: new Date()
        }]);
      } else {
        // Respuesta genérica
        setMessages(prev => [...prev, {
          type: 'agent',
          text: 'Entiendo tu pregunta. Para esta consulta específica, te sugiero revisar los dashboards detallados o contactar con el equipo de análisis. ¿Hay algo más en lo que pueda ayudarte?',
          timestamp: new Date()
        }]);
      }

      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAccion = (filtro) => {
    if (onDrillDown) {
      onDrillDown(filtro);
    }
  };

  // Si está completamente minimizado, solo mostrar botón flotante
  if (isMinimized) {
    return React.createElement("button", {
      onClick: () => setIsMinimized(false),
      className: "fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center z-30 transition-all hover:scale-110 border-2 border-blue-400",
      title: "Abrir Asistente MAF"
    },
      React.createElement("span", { className: "text-xs font-bold" }, "MAF")
    );
  }

  return React.createElement("div", {
    className: `fixed top-16 right-4 bottom-4 w-[28rem] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-lg shadow-2xl flex flex-col z-30 border-2 border-blue-500 ${className}`,
    style: { maxHeight: 'calc(100vh - 80px)' }
  },
    // Header
    React.createElement("div", {
      className: "p-4 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-800"
    },
      React.createElement("div", {
        className: "flex items-center gap-3"
      },
        React.createElement("div", {
          className: "w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg"
        }, "✦"),
        React.createElement("div", null,
          React.createElement("h3", {
            className: "font-semibold text-sm"
          }, "Asistente MAF"),
          React.createElement("p", {
            className: "text-xs text-blue-200"
          }, "● en línea · especialista en responder cómo va tu negocio")
        )
      ),
      // Botones de control
      React.createElement("div", {
        className: "flex items-center gap-2"
      },
        React.createElement("button", {
          onClick: () => setIsOpen(!isOpen),
          className: "text-blue-200 hover:text-white transition-colors text-xl",
          title: isOpen ? "Minimizar chat" : "Expandir chat"
        }, isOpen ? "−" : "+"),
        React.createElement("button", {
          onClick: () => setIsMinimized(true),
          className: "text-blue-200 hover:text-white transition-colors text-lg",
          title: "Ocultar completamente"
        }, "✕")
      )
    ),

    // Indicador de contexto
    isOpen && React.createElement("div", {
      className: "px-4 py-2 bg-blue-900/50 border-b border-gray-700 text-xs text-blue-200"
    },
      React.createElement("span", null, `📊 Contexto: ${sucursal.nombre} · ${vendedores.length} asesores · ${leads.length} leads`)
    ),

    // Mensajes
    isOpen && React.createElement("div", {
      className: "flex-1 overflow-y-auto p-4 space-y-4"
    },
      messages.map((msg, idx) => 
        React.createElement("div", {
          key: idx,
          className: `flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`
        },
          React.createElement("div", {
            className: `max-w-[85%] rounded-lg p-3 ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-100 border border-gray-700'
            }`
          },
            React.createElement("p", {
              className: "text-sm whitespace-pre-wrap leading-relaxed"
            }, formatearTexto(msg.text)),
            
            // Acciones de drill-down
            msg.acciones && msg.acciones.length > 0 && React.createElement("div", {
              className: "mt-3 space-y-2"
            },
              msg.acciones.map((accion, aIdx) =>
                React.createElement("button", {
                  key: aIdx,
                  onClick: () => handleAccion(accion.filtro),
                  className: "block w-full text-left text-xs bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors"
                }, `▸ ${accion.texto}`)
              )
            ),

            // Timestamp
            React.createElement("p", {
              className: "text-xs text-gray-500 mt-2"
            }, msg.timestamp.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }))
          )
        )
      ),
      
      // Indicador de typing
      isTyping && React.createElement("div", {
        className: "flex justify-start"
      },
        React.createElement("div", {
          className: "bg-gray-800 border border-gray-700 rounded-lg p-3"
        },
          React.createElement("div", {
            className: "flex gap-1"
          },
            React.createElement("div", {
              className: "w-2 h-2 bg-blue-500 rounded-full animate-bounce",
              style: { animationDelay: '0ms' }
            }),
            React.createElement("div", {
              className: "w-2 h-2 bg-blue-500 rounded-full animate-bounce",
              style: { animationDelay: '150ms' }
            }),
            React.createElement("div", {
              className: "w-2 h-2 bg-blue-500 rounded-full animate-bounce",
              style: { animationDelay: '300ms' }
            })
          )
        )
      )
    ),

    // Preguntas sugeridas (CHIPS VISIBLES)
    isOpen && React.createElement("div", {
      className: "px-4 py-3 border-t border-blue-700 bg-gradient-to-r from-blue-900/50 to-blue-800/50"
    },
      React.createElement("p", {
        className: "text-xs text-blue-200 mb-2 font-semibold"
      }, "💡 Puedes preguntarme:"),
      React.createElement("div", {
        className: "flex flex-wrap gap-2"
      },
        preguntasSugeridas.map((pregunta, idx) =>
          React.createElement("button", {
            key: idx,
            onClick: () => handleSend(pregunta),
            className: "text-xs bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1.5 rounded-full border border-blue-400 transition-all hover:scale-105 hover:shadow-lg"
          }, pregunta)
        )
      )
    ),

    // Footer informativo
    isOpen && React.createElement("div", {
      className: "px-4 py-2 bg-blue-900/30 border-t border-gray-700"
    },
      React.createElement("p", {
        className: "text-xs text-blue-300 text-center"
      }, "💎 Mejores decisiones con data en línea, al instante")
    ),

    // Input
    isOpen && React.createElement("div", {
      className: "p-4 border-t border-gray-700 bg-gray-900"
    },
      React.createElement("div", {
        className: "flex gap-2"
      },
        React.createElement("input", {
          type: "text",
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyPress: handleKeyPress,
          placeholder: "Pregúntale a tu copiloto…",
          className: "flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }),
        React.createElement("button", {
          onClick: () => handleSend(),
          disabled: !inputValue.trim(),
          className: "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        }, "Enviar")
      )
    )
  );
}

export default AgenteCopilotoEjecutivo;
