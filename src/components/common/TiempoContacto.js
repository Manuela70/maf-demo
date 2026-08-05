/**
 * Componente: Tiempo de Contacto
 * 
 * Indicador visual del tiempo transcurrido desde que llegó un lead nuevo
 * Sem

áforo: Verde (<15min), Amarillo (15-30min), Rojo (>30min)
 * 
 * Usado en: Lista de leads, Dashboard del asesor
 * Creado: 05-AGO-2026 - Requerimiento crítico del negocio
 */

const { React } = window;
const { useState, useEffect } = React;

export function TiempoContacto({ 
  fechaRegistro, 
  ultimoContacto = null,
  estado = 'Nuevo',
  className = '' 
}) {
  const [minutos, setMinutos] = useState(0);

  useEffect(() => {
    // Solo calcular si es lead nuevo sin contacto
    if (estado !== 'Nuevo' || ultimoContacto) {
      return;
    }

    const calcularTiempo = () => {
      if (!fechaRegistro) return;
      const ahora = new Date();
      const diff = ahora - new Date(fechaRegistro);
      const mins = Math.floor(diff / (1000 * 60));
      setMinutos(mins);
    };

    calcularTiempo();
    // Actualizar cada 30 segundos
    const interval = setInterval(calcularTiempo, 30000);
    return () => clearInterval(interval);
  }, [fechaRegistro, ultimoContacto, estado]);

  // Si ya fue contactado, no mostrar nada
  if (ultimoContacto || estado !== 'Nuevo') {
    return null;
  }

  // Determinar color y estado del semáforo
  const getSemaforo = () => {
    if (minutos < 15) {
      return {
        color: 'bg-green-500',
        textColor: 'text-green-700',
        borderColor: 'border-green-300',
        bgColor: 'bg-green-50',
        icono: '🟢',
        estado: 'OK',
        mensaje: 'Dentro del tiempo'
      };
    } else if (minutos < 30) {
      return {
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-300',
        bgColor: 'bg-yellow-50',
        icono: '🟡',
        estado: 'ADVERTENCIA',
        mensaje: `Quedan ${30 - minutos} min`
      };
    } else {
      return {
        color: 'bg-red-600',
        textColor: 'text-red-700',
        borderColor: 'border-red-400',
        bgColor: 'bg-red-50',
        icono: '🔴',
        estado: 'CRÍTICO',
        mensaje: 'FUERA DE TIEMPO'
      };
    }
  };

  const semaforo = getSemaforo();

  return React.createElement("div", {
    className: `inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${semaforo.borderColor} ${semaforo.bgColor} ${className}`
  },
    // Semáforo visual
    React.createElement("div", {
      className: `w-2 h-2 rounded-full ${semaforo.color} animate-pulse`
    }),
    
    // Tiempo transcurrido
    React.createElement("div", {
      className: "flex flex-col"
    },
      React.createElement("span", {
        className: `text-xs font-bold ${semaforo.textColor}`
      }, `${semaforo.icono} ${minutos} min`),
      
      React.createElement("span", {
        className: `text-xs ${semaforo.textColor} opacity-80`
      }, semaforo.mensaje)
    )
  );
}

/**
 * Variante compacta: Solo muestra el ícono del semáforo con tooltip
 */
export function TiempoContactoCompacto({ 
  fechaRegistro, 
  ultimoContacto = null,
  estado = 'Nuevo',
  className = '' 
}) {
  const [minutos, setMinutos] = useState(0);

  useEffect(() => {
    if (estado !== 'Nuevo' || ultimoContacto) {
      return;
    }

    const calcularTiempo = () => {
      if (!fechaRegistro) return;
      const ahora = new Date();
      const diff = ahora - new Date(fechaRegistro);
      const mins = Math.floor(diff / (1000 * 60));
      setMinutos(mins);
    };

    calcularTiempo();
    const interval = setInterval(calcularTiempo, 30000);
    return () => clearInterval(interval);
  }, [fechaRegistro, ultimoContacto, estado]);

  if (ultimoContacto || estado !== 'Nuevo') {
    return null;
  }

  const getSemaforo = () => {
    if (minutos < 15) return { icono: '🟢', titulo: `${minutos} min - OK` };
    if (minutos < 30) return { icono: '🟡', titulo: `${minutos} min - Quedan ${30 - minutos} min` };
    return { icono: '🔴', titulo: `${minutos} min - CRÍTICO` };
  };

  const semaforo = getSemaforo();

  return React.createElement("span", {
    className: `text-lg ${className}`,
    title: semaforo.titulo
  }, semaforo.icono);
}

export default TiempoContacto;
