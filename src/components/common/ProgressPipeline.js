/**
 * ProgressPipeline - Indicador de progreso del proceso de venta
 */

const { React } = window;
import { AnnotationNote } from './AnnotationNote.js';

export function ProgressPipeline({ activeStep }) {
  const steps = [
    { n: 1, label: 'Identidad' },
    { n: 2, label: 'Evaluación' },
    { n: 3, label: 'Venta' },
    { n: 4, label: 'Pago' },
    { n: 5, label: 'Firma' },
    { n: 6, label: 'Cierre' }
  ];
  
  return React.createElement("div", null, 
    React.createElement("div", {
      className: "flex items-center w-full py-3 overflow-x-auto"
    }, 
      steps.map((s, i) => React.createElement(React.Fragment, {
        key: s.n
      }, 
        React.createElement("div", {
          className: "flex flex-col items-center min-w-0"
        }, 
          React.createElement("div", {
            className: `step-circle text-xs
                ${s.n < activeStep ? 'bg-gray-400 text-white' : s.n === activeStep ? 'bg-gray-800 text-white' : 'bg-gray-100 border border-gray-300 text-gray-400'}`
          }, s.n < activeStep ? '✓' : s.n), 
          React.createElement("span", {
            className: "text-xs mt-1 text-gray-500 hidden sm:block",
            style: { fontSize: '10px' }
          }, s.label)
        ), 
        i < steps.length - 1 && React.createElement("div", {
          className: `step-line mx-1 ${s.n < activeStep ? 'bg-gray-400' : 'bg-gray-200'}`
        })
      ))
    ), 
    React.createElement(AnnotationNote, {
      type: "rule",
      text: "C-02: El asesor ve 'Evaluación' como una etapa única. Las evaluaciones internas PLAFT y Equifax no se exponen en el pipeline."
    })
  );
}

export default ProgressPipeline;
