/**
 * Componente: Onboarding Guiado
 * 
 * Tour interactivo paso a paso para nuevos usuarios
 * Inspirado en AWS QuickSight Q
 * 
 * Features:
 * - Resalta elementos específicos
 * - Sombrea el resto de la pantalla
 * - Tooltip con explicación
 * - Navegación prev/next
 * - Puede cerrarse en cualquier momento
 */

const { React } = window;
const { useState, useEffect, useRef } = React;

export function OnboardingGuiado({ 
  pasos = [],
  onComplete = null,
  onSkip = null,
  mostrar = false,
  className = ''
}) {
  const [pasoActual, setPasoActual] = useState(0);
  const [posicion, setPosicion] = useState({ top: 0, left: 0, width: 0, height: 0 });

  // Calcular posición del elemento resaltado
  useEffect(() => {
    if (!mostrar || pasos.length === 0) return;

    const paso = pasos[pasoActual];
    if (!paso || !paso.selector) return;

    const elemento = document.querySelector(paso.selector);
    if (!elemento) {
      console.warn(`⚠️ Elemento no encontrado en paso ${pasoActual + 1}: ${paso.selector}`);
      // Mostrar tooltip en el centro si no se encuentra el elemento
      setPosicion({
        top: window.innerHeight / 2 - 100,
        left: window.innerWidth / 2 - 200,
        width: 0,
        height: 0
      });
      return;
    }

    const rect = elemento.getBoundingClientRect();
    setPosicion({
      top: rect.top + window.scrollY - 8,
      left: rect.left + window.scrollX - 8,
      width: rect.width + 16,
      height: rect.height + 16
    });

    // Scroll al elemento si está fuera de vista
    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [pasoActual, mostrar, pasos]);

  if (!mostrar || pasos.length === 0) return null;

  const paso = pasos[pasoActual];
  const esUltimoPaso = pasoActual === pasos.length - 1;
  const esPrimerPaso = pasoActual === 0;

  const handleNext = () => {
    if (esUltimoPaso) {
      if (onComplete) onComplete();
    } else {
      setPasoActual(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!esPrimerPaso) {
      setPasoActual(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    if (onSkip) onSkip();
  };

  // Calcular posición del tooltip (mantenerlo dentro de la pantalla)
  const getTooltipPosition = () => {
    const tooltipPadding = 20;
    const tooltipWidth = 400; // max-w-md = ~400px
    const tooltipHeight = 300; // estimado
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let top, left, transform = '';
    
    switch(paso.tooltipPosition || 'bottom') {
      case 'top':
        top = Math.max(tooltipPadding, posicion.top - tooltipPadding);
        left = posicion.left;
        transform = 'translateY(-100%)';
        break;
      case 'left':
        top = posicion.top;
        left = Math.max(tooltipPadding, posicion.left - tooltipPadding);
        transform = 'translateX(-100%)';
        break;
      case 'right':
        top = posicion.top;
        left = Math.min(viewportWidth - tooltipWidth - tooltipPadding, posicion.left + posicion.width + tooltipPadding);
        break;
      case 'bottom':
      default:
        top = Math.min(viewportHeight - tooltipHeight - tooltipPadding, posicion.top + posicion.height + tooltipPadding);
        left = posicion.left;
        break;
    }
    
    // Asegurar que left no se salga de la pantalla
    if (left + tooltipWidth > viewportWidth) {
      left = viewportWidth - tooltipWidth - tooltipPadding;
    }
    if (left < tooltipPadding) {
      left = tooltipPadding;
    }
    
    return {
      top: `${top}px`,
      left: `${left}px`,
      transform
    };
  };

  return React.createElement("div", {
    className: `fixed inset-0 z-[9999] ${className}`
  },
    // Overlay oscuro con agujero
    React.createElement("div", {
      className: "absolute inset-0 bg-black bg-opacity-60",
      onClick: handleSkip
    }),

    // Spotlight (área resaltada) - solo si el elemento existe
    paso.selector && posicion.width > 0 && React.createElement("div", {
      className: "absolute bg-transparent rounded-lg pointer-events-none",
      style: {
        top: `${posicion.top}px`,
        left: `${posicion.left}px`,
        width: `${posicion.width}px`,
        height: `${posicion.height}px`,
        boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 9999px rgba(0, 0, 0, 0.6)',
        zIndex: 10000
      }
    }),

    // Tooltip con explicación
    React.createElement("div", {
      className: "absolute bg-white rounded-lg shadow-2xl p-6 w-96 z-[10001]",
      style: getTooltipPosition()
    },
      // Header
      React.createElement("div", {
        className: "flex items-start justify-between mb-4"
      },
        React.createElement("div", {
          className: "flex-1"
        },
          React.createElement("div", {
            className: "flex items-center gap-2 mb-2"
          },
            React.createElement("span", {
              className: "text-2xl"
            }, paso.icono || "👉"),
            React.createElement("h3", {
              className: "font-bold text-gray-900 text-lg"
            }, paso.titulo)
          ),
          React.createElement("p", {
            className: "text-sm text-gray-600 mb-2"
          }, paso.descripcion),
          paso.ejemplo && React.createElement("div", {
            className: "mt-3 p-3 bg-blue-50 border border-blue-200 rounded"
          },
            React.createElement("p", {
              className: "text-xs text-blue-900"
            }, `💡 Ejemplo: ${paso.ejemplo}`)
          )
        ),
        React.createElement("button", {
          onClick: handleSkip,
          className: "text-gray-400 hover:text-gray-600 ml-2"
        }, "✕")
      ),

      // Progreso
      React.createElement("div", {
        className: "mb-4"
      },
        React.createElement("div", {
          className: "flex items-center justify-between mb-2"
        },
          React.createElement("span", {
            className: "text-xs font-semibold text-gray-500"
          }, `Paso ${pasoActual + 1} de ${pasos.length}`),
          React.createElement("button", {
            onClick: handleSkip,
            className: "text-xs text-blue-600 hover:text-blue-800 font-medium"
          }, "Saltar tutorial")
        ),
        React.createElement("div", {
          className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden"
        },
          React.createElement("div", {
            className: "h-full bg-blue-600 transition-all duration-300",
            style: { width: `${((pasoActual + 1) / pasos.length) * 100}%` }
          })
        )
      ),

      // Botones de navegación
      React.createElement("div", {
        className: "flex items-center justify-between gap-3"
      },
        React.createElement("button", {
          onClick: handlePrev,
          disabled: esPrimerPaso,
          className: `px-4 py-2 rounded text-sm font-medium border transition-colors ${
            esPrimerPaso 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`
        }, "← Anterior"),
        React.createElement("button", {
          onClick: handleNext,
          className: "flex-1 px-4 py-2 rounded text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        }, esUltimoPaso ? "✓ Finalizar" : "Siguiente →")
      )
    )
  );
}

// Pasos de ejemplo para el onboarding de MAF
export const PASOS_ONBOARDING_VENDEDOR = [
  {
    selector: 'aside',
    titulo: 'Navegación Principal',
    descripcion: 'Esta es tu barra lateral de navegación. Desde aquí puedes acceder a todas las funciones del sistema.',
    icono: '🧭',
    tooltipPosition: 'right',
    ejemplo: 'Click en "Dashboard" para ver tu panel principal'
  },
  {
    selector: '[data-agente="asistente"]',
    titulo: 'Seguimiento y Tareas',
    descripcion: 'Este agente te muestra las tareas más urgentes del día. Revísalo cada mañana para priorizar tu trabajo.',
    icono: '🤖',
    tooltipPosition: 'bottom',
    ejemplo: 'Leads sin contacto, citas HOY, recordatorios'
  },
  {
    selector: '[data-agente="desempeno"]',
    titulo: 'Mi Desempeño',
    descripcion: 'Aquí ves cómo vas con tu meta del mes. La barra verde muestra tu progreso y la línea negra es lo esperado.',
    icono: '📊',
    tooltipPosition: 'bottom',
    ejemplo: 'Si estás en rojo, enfócate en leads HOT (🟢)'
  },
  {
    selector: '.notification-bell',
    titulo: 'Notificaciones',
    descripcion: 'La campanita te avisa de recordatorios y alertas importantes. El número rojo indica cuántas tienes sin leer.',
    icono: '🔔',
    tooltipPosition: 'bottom',
    ejemplo: 'Recordatorios que TÚ creaste + alertas del sistema'
  },
  {
    selector: '[data-agente="copiloto"]',
    titulo: 'Copiloto MAF',
    descripcion: 'Tu asistente para dudas del sistema y del negocio. Pregúntale lo que necesites sin tener que llamar al supervisor.',
    icono: '💬',
    tooltipPosition: 'left',
    ejemplo: '¿Hasta cuántas cuotas puedo ofrecer? ¿Qué documentos necesito?'
  }
];


// Sistema de activación global del onboarding
window.iniciarOnboarding = function(vendedorId = 'v1') {
  // Crear un contenedor temporal para el onboarding
  const container = document.createElement('div');
  container.id = 'onboarding-container';
  document.body.appendChild(container);

  // Montar el componente con React
  const { React, ReactDOM } = window;
  ReactDOM.render(
    React.createElement(OnboardingGuiado, {
      pasos: PASOS_ONBOARDING_VENDEDOR,
      mostrar: true,
      onComplete: () => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        console.log('✅ Onboarding completado');
      },
      onSkip: () => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        console.log('⏭️ Onboarding saltado');
      }
    }),
    container
  );
};
