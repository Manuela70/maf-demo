/**
 * MAF Perú - Mock Data Centralizado
 * Datos coherentes para demostración de los 4 agentes de IA
 * 
 * Narrativa coherente:
 * - Sucursal Surco con equipo de 6 vendedores
 * - 15 leads en distintos estados
 * - Mismo conjunto de datos compartido entre las 4 pantallas de agentes
 */

// ═══════════════════════════════════════════════════════════════════════════
// VENDEDORES (ASESORES FC)
// ═══════════════════════════════════════════════════════════════════════════

export const VENDEDORES = [
  {
    id: 'v1',
    nombre: 'J. Pérez',
    nombreCompleto: 'Juan Pérez',
    sucursal: 'Surco',
    metaDiaria: 3,
    metaMensual: 60,
    ventasMes: 14,
    evaluacionesMes: 28,
    tasaEfectividad: 0.50, // 50%
    leadsActivos: 12,
    leadsSinMovimiento: 1,
    ultimaActividad: new Date('2026-08-02T16:30:00'),
    estado: 'activo',
    // NUEVAS MÉTRICAS (05-AGO-2026)
    citasGeneradas: 32,
    citasMeta: 40,
    evaluacionesEquifax: 28, // Mismo que evaluacionesMes
    evaluacionesMeta: 30,
    certificadosEmitidos: 14, // Igual a ventasMes
    ticketPromedio: 24100, // USD - por encima de meta ($23,500)
    ticketMeta: 23500,
    // Derivaciones diarias (NUEVO 06-AGO-2026)
    derivacionesDiarias: 6, // Cumple meta de 5
    derivacionesMeta: 5
  },
  {
    id: 'v2',
    nombre: 'M. Díaz',
    nombreCompleto: 'María Díaz',
    sucursal: 'Surco',
    metaDiaria: 3,
    metaMensual: 60,
    ventasMes: 11,
    evaluacionesMes: 24,
    tasaEfectividad: 0.46,
    leadsActivos: 10,
    leadsSinMovimiento: 0,
    ultimaActividad: new Date('2026-08-02T15:45:00'),
    estado: 'activo',
    // NUEVAS MÉTRICAS
    citasGeneradas: 28,
    citasMeta: 40,
    evaluacionesEquifax: 24,
    evaluacionesMeta: 30,
    certificadosEmitidos: 11,
    ticketPromedio: 22800, // Ligeramente por debajo de meta
    ticketMeta: 23500,
    derivacionesDiarias: 4, // NO cumple meta
    derivacionesMeta: 5
  },
  {
    id: 'v3',
    nombre: 'L. Vega',
    nombreCompleto: 'Luis Vega',
    sucursal: 'Surco',
    metaDiaria: 3,
    metaMensual: 60,
    ventasMes: 9,
    evaluacionesMes: 22,
    tasaEfectividad: 0.41,
    leadsActivos: 11,
    leadsSinMovimiento: 2,
    ultimaActividad: new Date('2026-08-02T14:20:00'),
    estado: 'activo',
    // NUEVAS MÉTRICAS
    citasGeneradas: 25,
    citasMeta: 40,
    evaluacionesEquifax: 22,
    evaluacionesMeta: 30,
    certificadosEmitidos: 9,
    ticketPromedio: 25200, // Buen ticket promedio
    ticketMeta: 23500,
    derivacionesDiarias: 5, // Cumple justo
    derivacionesMeta: 5
  },
  {
    id: 'v4',
    nombre: 'C. Rojas',
    nombreCompleto: 'Carmen Rojas',
    sucursal: 'Surco',
    metaDiaria: 3,
    metaMensual: 60,
    ventasMes: 8,
    evaluacionesMes: 20,
    tasaEfectividad: 0.40,
    leadsActivos: 9,
    leadsSinMovimiento: 1,
    ultimaActividad: new Date('2026-08-02T13:10:00'),
    estado: 'activo',
    // NUEVAS MÉTRICAS
    citasGeneradas: 23,
    citasMeta: 40,
    evaluacionesEquifax: 20,
    evaluacionesMeta: 30,
    certificadosEmitidos: 8,
    ticketPromedio: 21500, // Por debajo de meta - requiere mejorar
    ticketMeta: 23500,
    derivacionesDiarias: 3, // NO cumple - crítico
    derivacionesMeta: 5
  },
  {
    id: 'v5',
    nombre: 'P. Núñez',
    nombreCompleto: 'Pedro Núñez',
    sucursal: 'Surco',
    metaDiaria: 3,
    metaMensual: 60,
    ventasMes: 10,
    evaluacionesMes: 25,
    tasaEfectividad: 0.40,
    leadsActivos: 13,
    leadsSinMovimiento: 3,
    ultimaActividad: new Date('2026-08-02T12:00:00'),
    estado: 'activo',
    // NUEVAS MÉTRICAS
    citasGeneradas: 30,
    citasMeta: 40,
    evaluacionesEquifax: 25,
    evaluacionesMeta: 30,
    certificadosEmitidos: 10,
    ticketPromedio: 23800, // Cerca de meta
    ticketMeta: 23500,
    derivacionesDiarias: 7, // Sobre la meta
    derivacionesMeta: 5
  },
  {
    id: 'v6',
    nombre: 'R. Soto',
    nombreCompleto: 'Roberto Soto',
    sucursal: 'Surco',
    metaDiaria: 3,
    metaMensual: 60,
    ventasMes: 6,
    evaluacionesMes: 18,
    tasaEfectividad: 0.33,
    leadsActivos: 15,
    leadsSinMovimiento: 9, // Bajo desempeño
    ultimaActividad: new Date('2026-07-30T17:00:00'), // 3 días sin actividad
    estado: 'activo',
    // NUEVAS MÉTRICAS
    citasGeneradas: 18,
    citasMeta: 40,
    evaluacionesEquifax: 18,
    evaluacionesMeta: 30,
    certificadosEmitidos: 6,
    ticketPromedio: 19800, // Muy por debajo de meta - CRÍTICO
    ticketMeta: 23500,
    derivacionesDiarias: 2, // MUY por debajo - crítico
    derivacionesMeta: 5
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// SUCURSALES
// ═══════════════════════════════════════════════════════════════════════════

export const SUCURSALES = [
  {
    id: 's1',
    nombre: 'Surco',
    ciudad: 'Lima',
    zona: 'Lima Sur',
    ventasMes: 58,
    metaMensual: 360,
    tasaEfectividad: 0.046,
    asesoresActivos: 6,
    leadsSinGestion: 9
  },
  {
    id: 's2',
    nombre: 'Miraflores',
    ciudad: 'Lima',
    zona: 'Lima Centro',
    ventasMes: 42,
    metaMensual: 300,
    tasaEfectividad: 0.038,
    asesoresActivos: 5,
    leadsSinGestion: 12
  },
  {
    id: 's3',
    nombre: 'San Isidro',
    ciudad: 'Lima',
    zona: 'Lima Centro',
    ventasMes: 51,
    metaMensual: 330,
    tasaEfectividad: 0.044,
    asesoresActivos: 5,
    leadsSinGestion: 7
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// FUENTES DE LEADS
// ═══════════════════════════════════════════════════════════════════════════

export const FUENTES = {
  LANDING: 'Landing digital',
  TOYOTA: 'Base Toyota',
  CALLCENTER: 'Call Center',
  DERIVACION: 'Derivación dealer',
  CARTERA_PROPIA: 'Cartera propia'
};

// ═══════════════════════════════════════════════════════════════════════════
// DEALERS / CONCESIONARIOS (NUEVO 06-AGO-2026)
// ═══════════════════════════════════════════════════════════════════════════

export const DEALERS = [
  { id: 'd1', nombre: 'Autospar San Juan de Lurigancho', ciudad: 'Lima', zona: 'Lima Este' },
  { id: 'd2', nombre: 'Automotriz del Pacífico - Miraflores', ciudad: 'Lima', zona: 'Lima Centro' },
  { id: 'd3', nombre: 'ToyotaSur - Surco', ciudad: 'Lima', zona: 'Lima Sur' },
  { id: 'd4', nombre: 'Motored - San Miguel', ciudad: 'Lima', zona: 'Lima Norte' },
  { id: 'd5', nombre: 'Breña Motors - Breña', ciudad: 'Lima', zona: 'Lima Centro' }
];

// ═══════════════════════════════════════════════════════════════════════════
// ESTADOS DE LEADS
// ═══════════════════════════════════════════════════════════════════════════

export const ESTADOS = {
  NUEVO: 'Nuevo',
  CONTACTADO: 'Contactado',
  NO_CONTACTADO: 'No contactado',
  EN_SEGUIMIENTO: 'En seguimiento',
  DESCARTADO: 'Descartado',
  CERRADO: 'Cerrado'
};

// ═══════════════════════════════════════════════════════════════════════════
// MODELOS DE VEHÍCULOS
// ═══════════════════════════════════════════════════════════════════════════

export const MODELOS = [
  { nombre: 'Toyota RAV4', rango: '45000-55000' },
  { nombre: 'Toyota Corolla', rango: '25000-30000' },
  { nombre: 'Toyota Hilux', rango: '35000-45000' },
  { nombre: 'Toyota Yaris', rango: '18000-22000' },
  { nombre: 'Toyota Land Cruiser', rango: '85000-95000' }
];

// ═══════════════════════════════════════════════════════════════════════════
// LEADS - Cartera del vendedor J. Pérez (v1)
// ═══════════════════════════════════════════════════════════════════════════

export const LEADS = [
  // ─── LEAD 1: HOT - Landing digital, respuesta rápida ───
  {
    id: 'l1',
    cliente: {
      nombre: 'A. Torres',
      nombreCompleto: 'Ana Torres',
      dni: '72345678',
      telefono: '987654321',
      email: 'atorres@email.com',
      ingreso: 6500, // USD mensual
      profesion: 'Gerente Comercial'
    },
    fuente: FUENTES.LANDING,
    dealer: null, // Landing directo, no viene de dealer
    estado: ESTADOS.EN_SEGUIMIENTO,
    vendedorId: 'v1',
    vendedor: 'J. Pérez',
    sucursal: 'Surco',
    fechaRegistro: new Date('2026-08-01T10:30:00'),
    ultimoContacto: new Date('2026-08-01T14:20:00'),
    diasSinMovimiento: 0,
    proximoContacto: new Date('2026-08-02T18:00:00'),
    modeloInteres: 'Toyota RAV4',
    colorInteres: 'Blanco Perla',
    citaAgendada: null,
    intentosContacto: 2,
    temperatura: 'caliente', // Para Agente 3
    score: 95, // Para Agente 3
    razonesScore: [
      'Landing digital con formulario completo',
      'Hot lead automático (RF-GL-HOT)',
      'Respondió en <1h',
      'Perfil de ingreso alto'
    ],
    notas: [
      { fecha: new Date('2026-08-01T14:20:00'), texto: 'Muy interesada en RAV4. Solicita info de plazos.', usuario: 'J. Pérez' }
    ]
  },

  // ─── LEAD 2: HOT - Cita agendada hoy ───
  {
    id: 'l2',
    cliente: {
      nombre: 'M. Díaz',
      nombreCompleto: 'Miguel Díaz',
      dni: '45678901',
      telefono: '998877665',
      email: 'mdiaz@email.com',
      ingreso: 5800,
      profesion: 'Ingeniero de Sistemas'
    },
    fuente: FUENTES.CALLCENTER,
    dealer: 'Autospar San Juan de Lurigancho', // Derivado de dealer
    estado: ESTADOS.EN_SEGUIMIENTO,
    vendedorId: 'v1',
    vendedor: 'J. Pérez',
    sucursal: 'Surco',
    fechaRegistro: new Date('2026-07-31T15:00:00'),
    ultimoContacto: new Date('2026-08-02T10:00:00'),
    diasSinMovimiento: 0,
    proximoContacto: new Date('2026-08-02T16:00:00'),
    modeloInteres: 'Toyota Corolla',
    colorInteres: 'Plata Metalizado',
    citaAgendada: new Date('2026-08-02T16:00:00'),
    intentosContacto: 3,
    temperatura: 'caliente',
    score: 90,
    razonesScore: [
      'Cita agendada HOY',
      'Interés en modelo específico',
      'Perfil de ingreso alto',
      'Contacto frecuente'
    ],
    notas: [
      { fecha: new Date('2026-08-02T10:00:00'), texto: 'Confirma cita 4pm. Traerá recibos de ingreso.', usuario: 'J. Pérez' }
    ]
  },

  // ─── LEAD 3: ALERTA - 2 días sin movimiento ───
  {
    id: 'l3',
    cliente: {
      nombre: 'C. Rojas',
      nombreCompleto: 'Carlos Rojas',
      dni: '56789012',
      telefono: '987123456',
      email: 'crojas@email.com',
      ingreso: 4200,
      profesion: 'Contador'
    },
    fuente: FUENTES.LANDING,
    dealer: null,
    estado: ESTADOS.EN_SEGUIMIENTO,
    vendedorId: 'v1',
    vendedor: 'J. Pérez',
    sucursal: 'Surco',
    fechaRegistro: new Date('2026-07-28T09:00:00'),
    ultimoContacto: new Date('2026-07-31T11:30:00'), // hace 2 días
    diasSinMovimiento: 2,
    proximoContacto: new Date('2026-08-02T09:00:00'), // HOY - atrasado
    modeloInteres: 'Toyota Yaris',
    colorInteres: 'Rojo',
    citaAgendada: null,
    intentosContacto: 2,
    temperatura: 'tibio',
    score: 65,
    razonesScore: [
      'Landing digital',
      'Lleva 2 días sin movimiento',
      'En riesgo de enfriarse'
    ],
    notas: [
      { fecha: new Date('2026-07-31T11:30:00'), texto: 'Pidió pensar. Recontactar hoy.', usuario: 'J. Pérez' }
    ]
  },

  // ─── LEAD 4: Base Toyota - tibio ───
  {
    id: 'l4',
    cliente: {
      nombre: 'L. Vega',
      nombreCompleto: 'Laura Vega',
      dni: '67890123',
      telefono: '965432109',
      email: 'lvega@email.com',
      ingreso: 3800,
      profesion: 'Docente'
    },
    fuente: FUENTES.TOYOTA,
    dealer: 'ToyotaSur - Surco',
    estado: ESTADOS.CONTACTADO,
    vendedorId: 'v1',
    vendedor: 'J. Pérez',
    sucursal: 'Surco',
    fechaRegistro: new Date('2026-08-01T08:00:00'),
    ultimoContacto: new Date('2026-08-01T16:45:00'),
    diasSinMovimiento: 0,
    proximoContacto: new Date('2026-08-03T10:00:00'),
    modeloInteres: null,
    colorInteres: null,
    citaAgendada: null,
    intentosContacto: 1,
    temperatura: 'tibio',
    score: 55,
    razonesScore: [
      'Base Toyota - fuente masiva',
      'Contactado una vez',
      'Sin señal fuerte de intención aún'
    ],
    notas: [
      { fecha: new Date('2026-08-01T16:45:00'), texto: 'Interesada pero sin modelo definido. Seguimiento en 2 días.', usuario: 'J. Pérez' }
    ]
  },

  // ─── LEAD 5: NUEVO - sin primer contacto ───
  {
    id: 'l5',
    cliente: {
      nombre: 'P. Núñez',
      nombreCompleto: 'Patricia Núñez',
      dni: '78901234',
      telefono: '976543210',
      email: 'pnunez@email.com',
      ingreso: null,
      profesion: null
    },
    fuente: FUENTES.DERIVACION,
    dealer: 'Motored - San Miguel',
    estado: ESTADOS.NUEVO,
    vendedorId: 'v1',
    vendedor: 'J. Pérez',
    sucursal: 'Surco',
    fechaRegistro: new Date('2026-08-02T14:00:00'), // hoy
    ultimoContacto: null,
    diasSinMovimiento: 0,
    proximoContacto: new Date('2026-08-02T17:30:00'),
    modeloInteres: null,
    colorInteres: null,
    citaAgendada: null,
    intentosContacto: 0,
    temperatura: 'frio',
    score: 40,
    razonesScore: [
      'Sin datos de perfil',
      'Sin primer contacto registrado',
      'Derivación - requiere calificación'
    ],
    notas: []
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// FAQ - Para Agente 1 (Gestor de Conocimiento)
// ═══════════════════════════════════════════════════════════════════════════

export const FAQ = {
  'guardar': {
    pregunta: '¿Por qué no me deja guardar el lead?',
    respuesta: 'Para guardar necesitas 2 datos obligatorios: el DNI y el correo del cliente. El teléfono es opcional en esta etapa.',
    camposADestacar: ['dni', 'correo'],
    modulo: 'RF-P07-01'
  },
  'cotitular': {
    pregunta: '¿Qué es co-titularidad?',
    respuesta: 'Co-titularidad significa que dos personas son dueñas del certificado. Ambos deben pasar la evaluación de riesgo de forma independiente. Si uno de los dos no aprueba, el contrato no puede avanzar.',
    camposADestacar: [],
    modulo: 'RF-021'
  },
  'cia': {
    pregunta: '¿Qué es la CIA?',
    respuesta: 'CIA es la Cuota de Inscripción al programa. Equivale al 4% del valor de la cuota mensual. Se paga junto con la Cuota 1 (primera cuota mensual) en la orden de pago inicial.',
    camposADestacar: [],
    modulo: 'RF-019'
  },
  'plaft': {
    pregunta: '¿Qué pasa si PLAFT retorna "Consultar"?',
    respuesta: 'Si PLAFT retorna "Consultar", puedes avanzar hasta generar la proforma, pero la orden de pago quedará bloqueada hasta que el Oficial de Cumplimiento resuelva el caso.',
    camposADestacar: [],
    modulo: 'RN-003'
  },
  'reevaluar': {
    pregunta: '¿Cuántas veces puedo reevaluar un lead rechazado?',
    respuesta: 'No hay límite de reintentos. Puedes modificar cualquier parámetro de cuota (monto, plazo, número de certificados) y volver a evaluar tantas veces como sea necesario para negociar con el cliente.',
    camposADestacar: [],
    modulo: 'RN-004'
  },
  'vacante': {
    pregunta: '¿Cómo cambio el grupo o certificado después de evaluar?',
    respuesta: 'Usa el botón "Reevaluar" que libera la reserva de vacante y te permite volver al paso de selección de programa/grupo/certificado.',
    camposADestacar: [],
    modulo: 'RN-024'
  },
  // NUEVO: Conocimiento de negocio MAF (Reunión 03-AGO-2026)
  'cuotas': {
    pregunta: '¿Hasta cuántas cuotas puedo ofrecer?',
    respuesta: 'Máximo 4 cuotas para la Cuota de Inscripción (CIA). IMPORTANTE: La primera cuota (junto con la CIA) es NO NEGOCIABLE y debe pagarse en la orden de pago inicial.',
    camposADestacar: [],
    modulo: 'Política MAF'
  },
  'documentos_evaluacion': {
    pregunta: '¿Qué documentos necesito para la evaluación?',
    respuesta: 'Para Persona Natural: DNI, recibo de servicios (domicilio), boletas de pago últimos 3 meses. Para Persona Jurídica: RUC, vigencia de poder, EEFF auditados últimos 2 años, flujo de caja proyectado.',
    camposADestacar: ['documentos'],
    modulo: 'Requisitos EUFIC'
  },
  'eufic': {
    pregunta: '¿Cómo funciona EUFIC?',
    respuesta: 'EUFIC es la evaluación de riesgo crediticio automática. Analiza: historial crediticio (Equifax), capacidad de pago (ingresos vs cuota), scoring interno MAF. Resultado en 24-48 horas hábiles.',
    camposADestacar: [],
    modulo: 'Proceso Crédito'
  },
  'desembolso': {
    pregunta: '¿Cuál es el plazo máximo para desembolso?',
    respuesta: 'Una vez firmado el contrato y pagada la primera cuota + CIA: 7 días hábiles para entrega del certificado. El desembolso al dealer ocurre dentro de las 48 horas posteriores a la firma.',
    camposADestacar: [],
    modulo: 'SLA Operaciones'
  },
  'scoring': {
    pregunta: '¿Cómo funciona el scoring de leads?',
    respuesta: 'El agente de priorización calcula un score 0-100 basado en: fuente del lead (+20 si Toyota/Landing), ingreso del cliente (+20 si >S/8000), señales de interés (+15 si tiene cita agendada), velocidad de respuesta (+10). Score ≥70 = HOT (🟢), 50-69 = Tibio (🟡), <50 = Frío (🔴).',
    camposADestacar: [],
    modulo: 'Agente IA'
  },
  'estrategia_cierre': {
    pregunta: '¿Qué estrategia uso para cerrar más rápido?',
    respuesta: 'Enfócate primero en leads 🟢 HOT (score ≥70). Prioriza: 1) Base Toyota (confianza), 2) Landing digital (interés comprobado), 3) Clientes con ingreso >S/8000. Agenda citas presenciales dentro de las 24-48h del primer contacto para evitar enfriamiento.',
    camposADestacar: [],
    modulo: 'Best Practices'
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// Q&A - Para Agente 4 (Copiloto Ejecutivo)
// ═══════════════════════════════════════════════════════════════════════════

export const PREGUNTAS_EJECUTIVAS = {
  'como_va_equipo': {
    pregunta: '¿Cómo va mi equipo hoy?',
    respuesta: (data) => {
      const ventasMes = data.sucursal.ventasMes;
      const mejorVendedor = data.vendedores.reduce((prev, current) => 
        (prev.ventasMes > current.ventasMes) ? prev : current
      );
      const peorVendedor = data.vendedores.reduce((prev, current) => 
        (prev.ventasMes < current.ventasMes) ? prev : current
      );
      
      return {
        texto: `Vas en **${ventasMes} ventas** este mes, sobre meta. Tu mejor vendedor es **${mejorVendedor.nombreCompleto}** (${mejorVendedor.ventasMes} cierres). Atención: **${peorVendedor.nombreCompleto}** no mueve sus leads hace ${peorVendedor.leadsSinMovimiento} días y tiene ${data.sucursal.leadsSinGestion} leads NUEVOS sin gestión.`,
        acciones: [
          { texto: 'Ver los 9 leads sin gestión', filtro: { estado: 'Nuevo' } }
        ]
      };
    }
  },
  'mejor_peor_vendedor': {
    pregunta: '¿Quién es mi mejor y peor vendedor?',
    respuesta: (data) => {
      const mejorVendedor = data.vendedores.reduce((prev, current) => 
        (prev.ventasMes > current.ventasMes) ? prev : current
      );
      const peorVendedor = data.vendedores.reduce((prev, current) => 
        (prev.ventasMes < current.ventasMes) ? prev : current
      );
      
      return {
        texto: `**Mejor:** ${mejorVendedor.nombreCompleto} con ${mejorVendedor.ventasMes} ventas (${(mejorVendedor.tasaEfectividad * 100).toFixed(1)}% efectividad). **Peor:** ${peorVendedor.nombreCompleto} con ${peorVendedor.ventasMes} ventas (${(peorVendedor.tasaEfectividad * 100).toFixed(1)}% efectividad). La brecha principal está en seguimiento de cartera.`,
        acciones: [
          { texto: `Ver cartera de ${peorVendedor.nombre}`, filtro: { vendedorId: peorVendedor.id } }
        ]
      };
    }
  },
  'sucursal_cayo': {
    pregunta: '¿Qué sucursal cayó esta semana?',
    respuesta: (data) => {
      return {
        texto: `**Miraflores** bajó 18% en cierres vs. la semana pasada. La caída se concentra en leads de Call Center sin primer contacto en las primeras 24h. Tasa actual: 3.8% (vs. 4.6% promedio).`,
        acciones: [
          { texto: 'Ver detalle por asesor de Miraflores', filtro: { sucursal: 'Miraflores' } }
        ]
      };
    }
  },
  'conversion': {
    pregunta: '¿Cómo está la conversión?',
    respuesta: (data) => {
      const tasaActual = data.sucursal.tasaEfectividad * 100;
      return {
        texto: `Tasa de conversión actual: **${tasaActual.toFixed(1)}%**. +1pp significaría +195 ventas/mes adicionales con los mismos 19,500 leads. La mayor oportunidad está en reducir leads sin seguimiento en las primeras 48h.`,
        acciones: [
          { texto: 'Ver leads +48h sin contacto', filtro: { diasSinMovimiento: 2 } }
        ]
      };
    }
  },
  // NUEVAS PREGUNTAS (06-AGO-2026)
  'derivaciones_incumplimiento': {
    pregunta: '¿Qué dealer no cumple las 5 derivaciones diarias?',
    respuesta: (data) => {
      const noCumplen = data.vendedores.filter(v => v.derivacionesDiarias < v.derivacionesMeta);
      if (noCumplen.length === 0) {
        return {
          texto: `✅ Todos los asesores cumplen la meta de 5 derivaciones diarias.`,
          acciones: []
        };
      }
      const nombres = noCumplen.map(v => `**${v.nombreCompleto}** (${v.derivacionesDiarias}/${v.derivacionesMeta})`).join(', ');
      return {
        texto: `⚠️ ${noCumplen.length} asesores no cumplen: ${nombres}. La meta es 5 derivaciones diarias para mantener el flujo comercial.`,
        acciones: [
          { texto: 'Ver desempeño completo del equipo', filtro: { metrica: 'derivaciones' } }
        ]
      };
    }
  },
  'derivaciones_por_dealer': {
    pregunta: '¿Cuántas derivaciones hay por dealer?',
    respuesta: (data) => {
      // Contar derivaciones por dealer desde los leads
      const conteo = {};
      data.leads.forEach(lead => {
        if (lead.dealer) {
          conteo[lead.dealer] = (conteo[lead.dealer] || 0) + 1;
        }
      });
      
      if (Object.keys(conteo).length === 0) {
        return {
          texto: `No hay derivaciones registradas de dealers en esta sucursal.`,
          acciones: []
        };
      }
      
      const ranking = Object.entries(conteo)
        .sort((a, b) => b[1] - a[1])
        .map(([dealer, cant]) => `**${dealer}**: ${cant}`)
        .join(', ');
      
      return {
        texto: `Derivaciones por dealer: ${ranking}. El dealer con más derivaciones tiene mayor engagement con MAF.`,
        acciones: [
          { texto: 'Ver leads por dealer', filtro: { agrupar: 'dealer' } }
        ]
      };
    }
  },
  'quien_derivo_deal': {
    pregunta: '¿Quién derivó este deal?',
    respuesta: (data) => {
      // Tomar un ejemplo del lead más reciente con dealer
      const leadConDealer = data.leads.find(l => l.dealer);
      if (!leadConDealer) {
        return {
          texto: `No hay deals con derivación de dealer en la cartera actual.`,
          acciones: []
        };
      }
      return {
        texto: `El lead **${leadConDealer.cliente.nombreCompleto}** fue derivado por **${leadConDealer.dealer}**. Estado actual: ${leadConDealer.estado}.`,
        acciones: [
          { texto: 'Ver todos los leads de este dealer', filtro: { dealer: leadConDealer.dealer } }
        ]
      };
    }
  },
  'ticket_promedio_vs_meta': {
    pregunta: '¿Cómo va el ticket promedio vs meta?',
    respuesta: (data) => {
      const ticketPromedio = data.vendedores.reduce((sum, v) => sum + v.ticketPromedio, 0) / data.vendedores.length;
      const meta = data.vendedores[0].ticketMeta; // Asumimos misma meta para todos
      const diferencia = ticketPromedio - meta;
      const porcentaje = ((diferencia / meta) * 100).toFixed(1);
      
      const vendedoresBajos = data.vendedores.filter(v => v.ticketPromedio < v.ticketMeta);
      
      if (diferencia >= 0) {
        return {
          texto: `✅ Ticket promedio: **$${ticketPromedio.toLocaleString()}** (meta: $${meta.toLocaleString()}). Estás **${porcentaje}%** sobre la meta. ${vendedoresBajos.length > 0 ? `Pero ${vendedoresBajos.length} asesores están por debajo.` : ''}`,
          acciones: vendedoresBajos.length > 0 ? [
            { texto: 'Ver asesores con ticket bajo', filtro: { metrica: 'ticket_bajo' } }
          ] : []
        };
      } else {
        return {
          texto: `⚠️ Ticket promedio: **$${ticketPromedio.toLocaleString()}** (meta: $${meta.toLocaleString()}). Estás **${Math.abs(porcentaje)}%** por debajo. **${vendedoresBajos.length}** asesores afectan el promedio: ${vendedoresBajos.map(v => v.nombreCompleto).join(', ')}.`,
          acciones: [
            { texto: 'Ver estrategia de upselling', filtro: { metrica: 'ticket_bajo' } }
          ]
        };
      }
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MÉTRICAS DEL DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════

export const METRICAS_DASHBOARD = {
  // Para el vendedor J. Pérez
  vendedor: {
    leadsActivos: 42,
    cierresMes: 6,
    enSeguimiento: 11,
    sinMovimiento2Dias: 3,
    evaluacionesRealizadas: 15,
    metaDiaria: 3,
    citasAgendadas: 2
  },
  // Para el supervisor
  supervisor: {
    ventasMes: 58,
    metaMensual: 360,
    tasaEfectividad: 4.6,
    leadsSinGestion: 9,
    asesoresActivos: 6
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calcula el score de priorización para un lead
 * Usado por el Agente 3
 * Adaptado para funcionar con leads simples y complejos
 */
export function calcularScoreLead(lead) {
  let score = 0;
  const razones = [];

  // Detectar si es lead complejo (con cliente.ingreso) o simple (con hot/intentos)
  const esLeadComplejo = lead.cliente && typeof lead.cliente.ingreso !== 'undefined';

  if (esLeadComplejo) {
    // SCORING PARA LEADS COMPLETOS (mockData.js)
    
    // Fuente (+1 a +3)
    if (lead.fuente === FUENTES.LANDING) {
      score += 3;
      razones.push('Landing digital con formulario completo');
    } else if (lead.fuente === FUENTES.CALLCENTER) {
      score += 2;
      razones.push('Call Center - ya calificado');
    } else if (lead.fuente === FUENTES.TOYOTA) {
      score += 1;
      razones.push('Base Toyota');
    }

    // Perfil de ingreso (+2)
    if (lead.cliente.ingreso && lead.cliente.ingreso > 5000) {
      score += 2;
      razones.push('Perfil de ingreso alto');
    }

    // Señales de intención (+2 cada una)
    if (lead.citaAgendada) {
      score += 2;
      razones.push('Cita agendada');
    }
    if (lead.modeloInteres) {
      score += 2;
      razones.push('Interés en modelo específico');
    }
    if (lead.intentosContacto > 0 && lead.diasSinMovimiento === 0) {
      score += 2;
      razones.push('Contacto frecuente');
    }

    // Hot lead automático (+3)
    if (lead.temperatura === 'caliente' && lead.fuente === FUENTES.LANDING) {
      score += 3;
      razones.push('Hot lead automático (RF-GL-HOT)');
    }

    // Penalizaciones
    if (lead.diasSinMovimiento >= 2) {
      score -= 2;
      razones.push(`Lleva ${lead.diasSinMovimiento} días sin movimiento`);
    }
    if (lead.estado === ESTADOS.NUEVO && !lead.ultimoContacto) {
      razones.push('Sin primer contacto registrado');
    }

    // Normalizar a escala 0-100
    score = Math.max(0, Math.min(100, score * 5));
    
  } else {
    // SCORING PARA LEADS SIMPLES (PGLGestionLeads)
    // Estructura: {id, nombre, fuente, estado, asesor, intentos, hot}
    
    score = 50; // Base neutra
    
    // Hot lead (+25)
    if (lead.hot === true) {
      score += 25;
      razones.push('Lead HOT marcado');
    }
    
    // Fuente confiable (+20)
    if (lead.fuente && (lead.fuente.includes('Toyota') || lead.fuente === 'Base Toyota')) {
      score += 20;
      razones.push('Fuente Toyota (confiable)');
    } else if (lead.fuente === 'Landing') {
      score += 15;
      razones.push('Lead digital (formulario)');
    }
    
    // Estado (+15 o +10)
    if (lead.estado === 'En seguimiento') {
      score += 15;
      razones.push('En seguimiento activo');
    } else if (lead.estado === 'Nuevo') {
      score += 10;
      razones.push('Lead recién ingresado');
    }
    
    // Pocos intentos = fresco (+10)
    if (typeof lead.intentos === 'number' && lead.intentos <= 1) {
      score += 10;
      razones.push('Pocos intentos (fresco)');
    }
    
    // Penalizaciones
    if (lead.estado === 'Descartado') {
      score -= 40;
      razones.push('Descartado previamente');
    } else if (lead.estado === 'Cerrado') {
      score -= 30;
      razones.push('Ya cerrado');
    } else if (lead.estado === 'No contactado') {
      score -= 10;
      razones.push('Aún sin contactar');
    }
    
    if (typeof lead.intentos === 'number' && lead.intentos > 3) {
      score -= 15;
      razones.push(`Muchos intentos fallidos (${lead.intentos})`);
    }
    
    // Normalizar
    score = Math.max(0, Math.min(100, score));
  }

  // Determinar temperatura
  let temperatura = 'frio';
  if (score >= 70) temperatura = 'caliente';
  else if (score >= 50) temperatura = 'tibio';

  return {
    score: Math.round(score),
    temperatura,
    razones
  };
}

/**
 * Detecta leads que necesitan atención urgente
 * Usado por el Agente 2 y Sistema de Notificaciones
 * ACTUALIZADO (05-AGO-2026): Incluye alerta crítica de 30 minutos
 */
export function detectarLeadsUrgentes(leads) {
  const urgentes = [];
  const hoy = new Date();

  leads.forEach(lead => {
    // CASO 0: Lead nuevo sin contactar en 30 minutos (CRÍTICO) - NUEVO 05-AGO-2026
    if (lead.estado === ESTADOS.NUEVO && !lead.ultimoContacto && lead.fechaRegistro) {
      const minutosSinContacto = Math.floor((hoy - lead.fechaRegistro) / (1000 * 60));
      
      if (minutosSinContacto >= 30) {
        urgentes.push({
          lead,
          razon: `⚡ CRÍTICO: Lead nuevo sin contactar hace ${minutosSinContacto} minutos (límite: 30 min)`,
          urgencia: 'critica', // Nueva urgencia máxima
          accion: 'Contactar AHORA',
          tiempoTranscurrido: minutosSinContacto
        });
      } else if (minutosSinContacto >= 15) {
        urgentes.push({
          lead,
          razon: `⚠️ Lead nuevo sin contactar hace ${minutosSinContacto} minutos (quedan ${30 - minutosSinContacto} min)`,
          urgencia: 'alta',
          accion: 'Contactar urgente',
          tiempoTranscurrido: minutosSinContacto
        });
      }
    }
    
    // Caso 1: Sin movimiento hace 2+ días en EN_SEGUIMIENTO
    if (lead.diasSinMovimiento >= 2 && lead.estado === ESTADOS.EN_SEGUIMIENTO) {
      urgentes.push({
        lead,
        razon: `Lleva ${lead.diasSinMovimiento} días sin movimiento en EN SEGUIMIENTO. Recontáctalo antes de que se enfríe.`,
        urgencia: 'alta',
        accion: 'Llamar'
      });
    }

    // Caso 2: Cita agendada HOY
    if (lead.citaAgendada) {
      const citaHoy = lead.citaAgendada.toDateString() === hoy.toDateString();
      if (citaHoy) {
        urgentes.push({
          lead,
          razon: `Prometiste llamarla HOY (cita agendada ${lead.citaAgendada.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}).`,
          urgencia: 'alta',
          accion: 'Ver'
        });
      }
    }

    // Caso 3: NUEVO sin primer contacto (sin límite de tiempo estricto)
    if (lead.estado === ESTADOS.NUEVO && !lead.ultimoContacto && !lead.fechaRegistro) {
      urgentes.push({
        lead,
        razon: 'Lead nuevo sin primer contacto registrado.',
        urgencia: 'media',
        accion: 'Primer contacto'
      });
    }
  });

  // Ordenar por urgencia (crítica > alta > media > baja)
  return urgentes.sort((a, b) => {
    const orden = { critica: 4, alta: 3, media: 2, baja: 1 };
    return orden[b.urgencia] - orden[a.urgencia];
  });
}

// Exportar todo como default también
export default {
  VENDEDORES,
  SUCURSALES,
  FUENTES,
  ESTADOS,
  MODELOS,
  LEADS,
  FAQ,
  PREGUNTAS_EJECUTIVAS,
  METRICAS_DASHBOARD,
  calcularScoreLead,
  detectarLeadsUrgentes,
  generarEstrategiaVenta,
  prepararCita,
  generarReporteConsolidado
};


/**
 * Genera estrategia de venta personalizada basada en meta y progreso
 * Usado por Agente 1 (funcionalidad generativa)
 */
export function generarEstrategiaVenta({ meta, ventasActuales, diasDelMes, diasTranscurridos }) {
  const ventasFaltantes = meta - ventasActuales;
  const diasRestantes = diasDelMes - diasTranscurridos;
  const ventasPorDia = ventasFaltantes / diasRestantes;
  const avanceEsperado = (diasTranscurridos / diasDelMes) * meta;
  const diferencia = ventasActuales - avanceEsperado;
  
  let estrategia = '';
  let acciones = [];
  
  if (ventasActuales >= meta) {
    estrategia = `🎉 ¡Felicitaciones! Ya superaste tu meta de ${meta} ventas (llevas ${ventasActuales}). Mantén el ritmo y enfócate en calidad de servicio para cerrar el mes con récord.`;
    acciones = [
      'Revisar leads tibios (🟡) que podrían convertirse en HOT',
      'Hacer seguimiento post-venta de clientes recientes',
      'Compartir best practices con el equipo'
    ];
  } else if (diferencia >= 0) {
    // Va bien
    estrategia = `📊 Vas ${Math.abs(diferencia).toFixed(0)} ventas por encima del ritmo esperado. Para llegar a ${meta}, necesitas cerrar ${ventasPorDia.toFixed(1)} ventas/día los próximos ${diasRestantes} días.`;
    acciones = [
      `Enfócate en los ${Math.ceil(ventasPorDia * 3)} leads más HOT de tu cartera`,
      'Agenda citas presenciales para esta semana',
      'Prioriza seguimiento de leads con >3 días sin contacto'
    ];
  } else {
    // Va atrasado
    const atrasoPorcentaje = (Math.abs(diferencia) / meta * 100).toFixed(0);
    estrategia = `⚠️ Vas ${Math.abs(diferencia).toFixed(0)} ventas por debajo del ritmo esperado (${atrasoPorcentaje}% de atraso). Para recuperar y llegar a ${meta}, necesitas cerrar **${ventasPorDia.toFixed(1)} ventas/día** los próximos ${diasRestantes} días.`;
    acciones = [
      `URGENTE: Contacta HOY todos tus leads 🟢 HOT (score ≥70)`,
      'Reactiva leads tibios (🟡) con correo de seguimiento',
      'Solicita apoyo del supervisor para reasignar leads fríos',
      `Agenda mínimo ${Math.ceil(ventasPorDia * 2)} citas presenciales esta semana`
    ];
  }
  
  return {
    estrategia,
    acciones,
    metricas: {
      meta,
      ventasActuales,
      ventasFaltantes,
      diasRestantes,
      ventasPorDia: ventasPorDia.toFixed(1),
      avanceEsperado: avanceEsperado.toFixed(0),
      diferencia: diferencia.toFixed(0)
    }
  };
}

/**
 * Genera preparación para cita con cliente basada en su perfil
 * Usado por Agente 1 (funcionalidad generativa)
 */
export function prepararCita(lead) {
  const temas = [];
  const objeciones = [];
  const estrategiaRapida = [];
  
  // Temas según perfil
  if (lead.cliente && lead.cliente.ingreso > 8000) {
    temas.push('Opciones de vehículos premium en stock');
    temas.push('Beneficios del programa VIP de MAF');
  } else {
    temas.push('Planes de cuotas accesibles (hasta 4 cuotas CIA)');
    temas.push('Certificados con cuotas desde S/500/mes');
  }
  
  if (lead.fuente === 'Base Toyota') {
    temas.push('Convenio especial MAF-Toyota (tasa preferencial)');
    objeciones.push('Objeción: "Ya trabajo con Toyota" → Respuesta: MAF complementa, no compite');
  }
  
  if (lead.modeloInteres) {
    temas.push(`Disponibilidad inmediata ${lead.modeloInteres}`);
    temas.push('Comparativa de cuotas según modelo');
  }
  
  // Objeciones comunes
  objeciones.push('Objeción: "Es muy caro" → Respuesta: Mostrar cuotas divididas + beneficio de uso inmediato vs ahorro total');
  objeciones.push('Objeción: "Necesito pensarlo" → Respuesta: Bloquear vacante HOY (se libera en 48h si no avanza)');
  
  // Estrategia rápida
  if (lead.temperatura === 'caliente' || lead.hot) {
    estrategiaRapida.push('🔥 Cliente HOT: Prioriza CIERRE HOY');
    estrategiaRapida.push('Lleva pre-aprobación si es posible');
    estrategiaRapida.push('Agenda firma de contrato para mañana');
  } else {
    estrategiaRapida.push('Cliente tibio: Objetivo es agendar 2da cita');
    estrategiaRapida.push('Foco en construcción de confianza');
    estrategiaRapida.push('Dejar timeline claro del proceso');
  }
  
  return {
    temas,
    objeciones,
    estrategiaRapida,
    clientePerfil: {
      nombre: lead.cliente ? lead.cliente.nombre : lead.nombre,
      temperatura: lead.temperatura || (lead.hot ? 'caliente' : 'tibio'),
      ingreso: lead.cliente ? lead.cliente.ingreso : 'No especificado',
      fuente: lead.fuente
    }
  };
}

/**
 * Genera reporte consolidado diario con derivaciones y estado de clientes
 * Usado por el supervisor para reporte al corte del día
 * Devuelve tabla con métricas clave: Citas, Evaluaciones, Certificados, Ticket Promedio
 */
export function generarReporteConsolidado(sucursalId = 's1') {
  const sucursal = SUCURSALES.find(s => s.id === sucursalId) || SUCURSALES[0];
  const vendedores = VENDEDORES.filter(v => v.sucursal === sucursal.nombre);
  const leads = LEADS.filter(l => l.sucursal === sucursal.nombre);
  
  const fecha = new Date();
  const fechaCorte = fecha.toLocaleDateString('es-PE', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Calcular totales
  const totales = {
    ventas: vendedores.reduce((sum, v) => sum + v.ventasMes, 0),
    metaVentas: vendedores.reduce((sum, v) => sum + v.metaMensual, 0),
    citas: vendedores.reduce((sum, v) => sum + v.citasGeneradas, 0),
    metaCitas: vendedores.reduce((sum, v) => sum + v.citasMeta, 0),
    evaluaciones: vendedores.reduce((sum, v) => sum + v.evaluacionesEquifax, 0),
    metaEvaluaciones: vendedores.reduce((sum, v) => sum + v.evaluacionesMeta, 0),
    certificados: vendedores.reduce((sum, v) => sum + v.certificadosEmitidos, 0),
    ticketPromedio: vendedores.reduce((sum, v) => sum + v.ticketPromedio, 0) / vendedores.length
  };
  
  // Calcular estados de leads
  const estadosLeads = {
    nuevo: leads.filter(l => l.estado === ESTADOS.NUEVO).length,
    enSeguimiento: leads.filter(l => l.estado === ESTADOS.EN_SEGUIMIENTO).length,
    contactado: leads.filter(l => l.estado === ESTADOS.CONTACTADO).length,
    noContactado: leads.filter(l => l.estado === ESTADOS.NO_CONTACTADO).length,
    cerrado: leads.filter(l => l.estado === ESTADOS.CERRADO).length,
    descartado: leads.filter(l => l.estado === ESTADOS.DESCARTADO).length
  };
  
  // Leads por vendedor
  const reportePorVendedor = vendedores.map(v => ({
    vendedor: v.nombreCompleto,
    ventas: v.ventasMes,
    metaVentas: v.metaMensual,
    cumpVentas: ((v.ventasMes / v.metaMensual) * 100).toFixed(1) + '%',
    citas: v.citasGeneradas,
    metaCitas: v.citasMeta,
    cumpCitas: ((v.citasGeneradas / v.citasMeta) * 100).toFixed(1) + '%',
    evaluaciones: v.evaluacionesEquifax,
    metaEval: v.evaluacionesMeta,
    cumpEval: ((v.evaluacionesEquifax / v.evaluacionesMeta) * 100).toFixed(1) + '%',
    certificados: v.certificadosEmitidos,
    ticketPromedio: `$${v.ticketPromedio.toLocaleString('en-US')}`,
    ticketVsMeta: v.ticketPromedio >= v.ticketMeta ? '✓' : '✗',
    leadsActivos: v.leadsActivos,
    leadsSinMovimiento: v.leadsSinMovimiento
  }));
  
  // Alertas críticas
  const alertas = [];
  vendedores.forEach(v => {
    // Vendedor por debajo del 60% en ventas
    if (v.ventasMes / v.metaMensual < 0.6) {
      alertas.push({
        tipo: 'critico',
        vendedor: v.nombreCompleto,
        mensaje: `Ventas en ${((v.ventasMes / v.metaMensual) * 100).toFixed(0)}% de meta - REQUIERE ACCIÓN`
      });
    }
    
    // Ticket promedio por debajo de meta
    if (v.ticketPromedio < v.ticketMeta * 0.9) {
      alertas.push({
        tipo: 'advertencia',
        vendedor: v.nombreCompleto,
        mensaje: `Ticket promedio $${v.ticketPromedio} (meta: $${v.ticketMeta})`
      });
    }
    
    // Muchos leads sin movimiento
    if (v.leadsSinMovimiento > 5) {
      alertas.push({
        tipo: 'advertencia',
        vendedor: v.nombreCompleto,
        mensaje: `${v.leadsSinMovimiento} leads sin movimiento - revisar cartera`
      });
    }
  });
  
  return {
    sucursal: sucursal.nombre,
    fechaCorte,
    totales,
    estadosLeads,
    reportePorVendedor,
    alertas,
    // Datos para exportar a CSV/Excel
    csvData: reportePorVendedor.map(r => ({
      'Vendedor': r.vendedor,
      'Ventas': r.ventas,
      'Meta Ventas': r.metaVentas,
      '% Cumpl. Ventas': r.cumpVentas,
      'Citas': r.citas,
      'Meta Citas': r.metaCitas,
      '% Cumpl. Citas': r.cumpCitas,
      'Evaluaciones': r.evaluaciones,
      'Meta Eval.': r.metaEval,
      '% Cumpl. Eval.': r.cumpEval,
      'Certificados': r.certificados,
      'Ticket Promedio': r.ticketPromedio,
      'Ticket OK': r.ticketVsMeta,
      'Leads Activos': r.leadsActivos,
      'Leads Sin Movimiento': r.leadsSinMovimiento
    }))
  };
}
