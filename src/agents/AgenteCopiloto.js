/**
 * Agente 1: Gestor de Conocimiento (Copiloto Embebido)
 * 
 * Especialista en: resolver dudas del sistema y del proceso de fondos colectivos
 * al vendedor, en el momento, sin que la consulta escale al supervisor.
 * 
 * Nivel de impacto: Supervisor
 * Complejidad: BAJA
 * 
 * Mensaje clave: "¿Cuántos más vendedores puede liderar un mismo supervisor 
 * si deja de responder las mismas preguntas del sistema cada día?"
 */

const { React } = window;
const { useState, useEffect } = React;
import { FAQ, generarEstrategiaVenta, prepararCita } from '../mockData.js';

export function AgenteCopiloto({ 
  currentScreen = '/lead/new',
  onHighlightFields = null,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false); // Nuevo estado para minimizar completamente
  const [messages, setMessages] = useState([
    {
      type: 'agent',
      text: '👋 Hola, soy tu Asistente MAF. Estoy aquí para ayudarte con cualquier duda sobre el sistema. ¿En qué puedo ayudarte?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [consultasResueltas, setConsultasResueltas] = useState(7);
  const [isTyping, setIsTyping] = useState(false);

  // Preguntas sugeridas según la pantalla actual
  const preguntasSugeridas = {
    '/lead/new': [
      '¿Por qué no me deja guardar el lead?',
      '¿Qué documentos necesito para la evaluación?',
      '¿Hasta cuántas cuotas puedo ofrecer?',
      'Ayúdame a prepararme para mi cita de mañana'
    ],
    '/eval/riesgo': [
      '¿Cuántas veces puedo reevaluar?',
      '¿Cómo funciona EUFIC?',
      '¿Qué pasa si PLAFT retorna "Consultar"?',
      '¿Cómo funciona el scoring de leads?'
    ],
    '/sale/payment': [
      '¿Qué es la CIA?',
      '¿Cuál es el plazo máximo para desembolso?',
      '¿Hasta cuántas cuotas puedo ofrecer?'
    ],
    '/dashboard': [
      'Ármame estrategia para llegar a mi meta',
      '¿Qué estrategia uso para cerrar más rápido?',
      '¿Cómo funciona el scoring de leads?',
      'Ayúdame a prepararme para mi cita'
    ]
  };

  const sugerencias = preguntasSugeridas[currentScreen] || [
    '¿Hasta cuántas cuotas puedo ofrecer?',
    '¿Qué documentos necesito?',
    '¿Cómo funciona el scoring?',
    'Ármame estrategia para mi meta'
  ];

  // Buscar respuesta en FAQ por keywords
  const buscarRespuesta = (pregunta) => {
    const preguntaLower = pregunta.toLowerCase();
    
    // ESTRATEGIA DE VENTA (nuevo)
    if (preguntaLower.includes('estrategia') || preguntaLower.includes('llegar a mi meta') || preguntaLower.includes('cómo cierro')) {
      const estrategia = generarEstrategiaVenta({
        meta: 100,
        ventasActuales: 30,
        diasDelMes: 30,
        diasTranscurridos: 15
      });
      return {
        pregunta: 'Estrategia para llegar a meta',
        respuesta: estrategia.estrategia + '\n\n**Acciones recomendadas:**\n' + estrategia.acciones.map((a, i) => `${i+1}. ${a}`).join('\n'),
        modulo: 'IA Generativa'
      };
    }
    
    // PREPARACIÓN DE CITA (nuevo)
    if (preguntaLower.includes('prepara') || preguntaLower.includes('cita') && preguntaLower.includes('mañana') || preguntaLower.includes('qué hablar')) {
      const prep = prepararCita({
        cliente: { nombre: 'Carlos Mendoza', ingreso: 9000 },
        fuente: 'Base Toyota',
        modeloInteres: 'Hyundai Tucson',
        temperatura: 'caliente',
        hot: true
      });
      return {
        pregunta: 'Preparación para cita',
        respuesta: `**Cliente:** ${prep.clientePerfil.nombre} (${prep.clientePerfil.temperatura})\n\n**Temas a cubrir:**\n${prep.temas.map((t, i) => `${i+1}. ${t}`).join('\n')}\n\n**Objeciones probables:**\n${prep.objeciones.join('\n')}\n\n**Estrategia:**\n${prep.estrategiaRapida.join('\n')}`,
        modulo: 'IA Generativa'
      };
    }
    
    // Matching FAQ existente
    if (preguntaLower.includes('guardar') || preguntaLower.includes('no me deja') || preguntaLower.includes('obligatorio')) {
      return FAQ['guardar'];
    }
    if (preguntaLower.includes('cotitular') || preguntaLower.includes('co-titular')) {
      return FAQ['cotitular'];
    }
    if (preguntaLower.includes('cia') || preguntaLower.includes('inscripción')) {
      return FAQ['cia'];
    }
    if (preguntaLower.includes('plaft') || preguntaLower.includes('consultar')) {
      return FAQ['plaft'];
    }
    if (preguntaLower.includes('reevaluar') || preguntaLower.includes('reintento') || preguntaLower.includes('veces')) {
      return FAQ['reevaluar'];
    }
    if (preguntaLower.includes('vacante') || preguntaLower.includes('cambio') || preguntaLower.includes('grupo')) {
      return FAQ['vacante'];
    }
    // Nuevo conocimiento de negocio
    if (preguntaLower.includes('cuotas') || preguntaLower.includes('cuántas cuotas')) {
      return FAQ['cuotas'];
    }
    if (preguntaLower.includes('documentos') || preguntaLower.includes('requisitos')) {
      return FAQ['documentos_evaluacion'];
    }
    if (preguntaLower.includes('eufic') || preguntaLower.includes('evaluación')) {
      return FAQ['eufic'];
    }
    if (preguntaLower.includes('desembolso') || preguntaLower.includes('plazo') || preguntaLower.includes('entrega')) {
      return FAQ['desembolso'];
    }
    if (preguntaLower.includes('scoring') || preguntaLower.includes('prioriza') || preguntaLower.includes('semáforo')) {
      return FAQ['scoring'];
    }
    if (preguntaLower.includes('estrategia cierre') || preguntaLower.includes('cerrar rápido')) {
      return FAQ['estrategia_cierre'];
    }
    
    return null;
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

    // Simular delay de "pensando"
    setTimeout(() => {
      const respuestaData = buscarRespuesta(pregunta);
      
      if (respuestaData) {
        // Respuesta encontrada
        setMessages(prev => [...prev, {
          type: 'agent',
          text: respuestaData.respuesta,
          modulo: respuestaData.modulo,
          timestamp: new Date()
        }]);

        // Resaltar campos si hay callback y campos definidos
        if (onHighlightFields && respuestaData.camposADestacar && respuestaData.camposADestacar.length > 0) {
          onHighlightFields(respuestaData.camposADestacar);
        }

        // Incrementar contador
        setConsultasResueltas(prev => prev + 1);
      } else {
        // No encontrada - respuesta genérica
        setMessages(prev => [...prev, {
          type: 'agent',
          text: 'Entiendo tu pregunta. Para esta consulta específica, te recomiendo revisar el manual del sistema o contactar al equipo de soporte. ¿Hay algo más en lo que pueda ayudarte?',
          timestamp: new Date()
        }]);
      }

      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Si está completamente minimizado, solo mostrar botón flotante
  if (isMinimized) {
    return React.createElement("button", {
      onClick: () => setIsMinimized(false),
      className: "fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center z-30 transition-all hover:scale-110",
      title: "Abrir Asistente MAF"
    },
      React.createElement("span", { className: "text-2xl" }, "💬")
    );
  }

  return React.createElement("div", {
    className: `fixed top-16 right-4 bottom-4 w-96 bg-gray-900 text-white rounded-lg shadow-2xl flex flex-col z-30 ${className}`,
    'data-agente': 'copiloto',
    style: { maxHeight: 'calc(100vh - 80px)' }
  },
    // Header
    React.createElement("div", {
      className: "p-4 border-b border-gray-700 flex items-center justify-between"
    },
      React.createElement("div", {
        className: "flex items-center gap-3"
      },
        React.createElement("div", {
          className: "w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold"
        }, "AI"),
        React.createElement("div", null,
          React.createElement("h3", {
            className: "font-semibold text-sm"
          }, "Asistente MAF"),
          React.createElement("p", {
            className: "text-xs text-gray-400"
          }, "● en línea · especialista en el sistema")
        )
      ),
      // Botones de control
      React.createElement("div", {
        className: "flex items-center gap-2"
      },
        React.createElement("button", {
          onClick: () => setIsOpen(!isOpen),
          className: "text-gray-400 hover:text-white text-xl",
          title: isOpen ? "Minimizar chat" : "Expandir chat"
        }, isOpen ? "−" : "+"),
        React.createElement("button", {
          onClick: () => setIsMinimized(true),
          className: "text-gray-400 hover:text-white text-lg",
          title: "Ocultar completamente"
        }, "✕")
      )
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
            className: `max-w-[80%] rounded-lg p-3 ${
              msg.type === 'user' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-gray-100'
            }`
          },
            React.createElement("p", {
              className: "text-sm whitespace-pre-wrap"
            }, msg.text),
            msg.modulo && React.createElement("p", {
              className: "text-xs text-gray-400 mt-2"
            }, `📚 Ref: ${msg.modulo}`)
          )
        )
      ),
      isTyping && React.createElement("div", {
        className: "flex justify-start"
      },
        React.createElement("div", {
          className: "bg-gray-800 rounded-lg p-3"
        },
          React.createElement("div", {
            className: "flex gap-1"
          },
            React.createElement("div", {
              className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce",
              style: { animationDelay: '0ms' }
            }),
            React.createElement("div", {
              className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce",
              style: { animationDelay: '150ms' }
            }),
            React.createElement("div", {
              className: "w-2 h-2 bg-gray-500 rounded-full animate-bounce",
              style: { animationDelay: '300ms' }
            })
          )
        )
      )
    ),

    // Preguntas sugeridas (CHIPS VISIBLES)
    isOpen && React.createElement("div", {
      className: "px-4 py-3 border-t border-gray-700 bg-gray-900"
    },
      React.createElement("p", {
        className: "text-xs font-semibold text-gray-300 mb-2"
      }, "💡 Preguntas frecuentes:"),
      React.createElement("div", {
        className: "flex flex-wrap gap-2"
      },
        sugerencias.map((pregunta, idx) =>
          React.createElement("button", {
            key: idx,
            onClick: () => handleSend(pregunta),
            className: "text-xs bg-red-600 hover:bg-red-500 text-white font-medium px-3 py-1.5 rounded-full border border-red-500 transition-all hover:scale-105"
          }, pregunta)
        )
      )
    ),

    // Contador de consultas resueltas
    isOpen && React.createElement("div", {
      className: "px-4 py-2 bg-gray-800 border-t border-gray-700"
    },
      React.createElement("p", {
        className: "text-xs text-green-400"
      }, `✓ Consultas resueltas hoy sin escalar: ${consultasResueltas}`)
    ),

    // Input
    isOpen && React.createElement("div", {
      className: "p-4 border-t border-gray-700"
    },
      React.createElement("div", {
        className: "flex gap-2"
      },
        React.createElement("input", {
          type: "text",
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyPress: handleKeyPress,
          placeholder: "Escribe tu pregunta…",
          className: "flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        }),
        React.createElement("button", {
          onClick: () => handleSend(),
          disabled: !inputValue.trim(),
          className: "bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium"
        }, "Enviar")
      )
    )
  );
}

export default AgenteCopiloto;
