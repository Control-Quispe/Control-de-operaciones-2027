import { BriefingData, LocalConfig, LocalId, RevoGrupo } from '../types/briefing';

export const LOCALES_CONFIG: Record<LocalId, LocalConfig> = {
  CHALACO: {
    id: 'CHALACO',
    name: 'Chalaco',
    tagline: 'Taberna Marina & Criolla',
    concept: 'Cocina de puerto, ceviches al instante, frituras maestras y pisco',
    foodCostTarget: 22.0,
    color: '#0284c7', // Sky-600
    accentBg: 'from-sky-500/10 to-cyan-500/5',
  },
  PONJA: {
    id: 'PONJA',
    name: 'Ponja Nikkei',
    tagline: 'Fusión Peruano - Japonesa',
    concept: 'Cortes limpios, técnica japonesa, ajíes peruanos y coctelería mística',
    foodCostTarget: 24.5,
    color: '#e11d48', // Rose-600
    accentBg: 'from-rose-500/10 to-red-500/5',
  },
  QUISPE: {
    id: 'QUISPE',
    name: 'Quispe',
    tagline: 'Cocina Peruana de Autor',
    concept: 'Restaurante insignia: experiencia gastronómica y tradición refinada',
    foodCostTarget: 25.0,
    color: '#d97706', // Amber-600
    accentBg: 'from-amber-500/10 to-yellow-500/5',
  },
  ACHOLAO: {
    id: 'ACHOLAO',
    name: 'Acholao',
    tagline: 'Cocina Criolla & Sabor Urbano',
    concept: 'Wok al rojo vivo, anticuchos, sanguchería y espíritu limeño',
    foodCostTarget: 23.5,
    color: '#16a34a', // Green-600
    accentBg: 'from-emerald-500/10 to-green-500/5',
  },
};

// ==========================================
// CATÁLOGOS DE REVO TPV POR LOCAL (SIN MEZCLAR)
// ==========================================

export const REVO_CATALOG_CHALACO: RevoGrupo[] = [
  {
    id: 'grp-ch-cev',
    nombre: 'Ceviches & Tiraditos',
    familias: [
      {
        id: 'fam-ch-cev-trad',
        nombre: 'Ceviches Tradicionales',
        grupoId: 'grp-ch-cev',
        productos: [
          { id: 'prod-ch-1', nombre: 'Ceviche Clásico de Corvina', activo: true, precioReferencia: 22.5, grupo: 'Ceviches & Tiraditos', familia: 'Ceviches Tradicionales', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-2', nombre: 'Ceviche Mixto Chalaco (Corvina & Pulpo)', activo: true, precioReferencia: 24.5, grupo: 'Ceviches & Tiraditos', familia: 'Ceviches Tradicionales', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-3', nombre: 'Ceviche Carretillero (con Chicharrón de Calamar)', activo: true, precioReferencia: 25.0, grupo: 'Ceviches & Tiraditos', familia: 'Ceviches Tradicionales', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-4', nombre: 'Ceviche de Conchas Negras', activo: false, precioReferencia: 26.5, grupo: 'Ceviches & Tiraditos', familia: 'Ceviches Tradicionales' }, // Inactivo en Revo (X)
        ],
      },
      {
        id: 'fam-ch-tirad',
        nombre: 'Tiraditos Criollos',
        grupoId: 'grp-ch-cev',
        productos: [
          { id: 'prod-ch-5', nombre: 'Tiradito al Ají Amarillo & Canchita', activo: true, precioReferencia: 21.0, grupo: 'Ceviches & Tiraditos', familia: 'Tiraditos Criollos', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-6', nombre: 'Tiradito Chalaco al Rocoto Ahumado', activo: true, precioReferencia: 22.0, grupo: 'Ceviches & Tiraditos', familia: 'Tiraditos Criollos', estadoOperativo: '85_ULTIMAS_UNIDADES', unidadesRestantes85: 5 },
        ],
      },
    ],
  },
  {
    id: 'grp-ch-caliente',
    nombre: 'Cocina Caliente & Wok',
    familias: [
      {
        id: 'fam-ch-arroces',
        nombre: 'Arroces & Melosos',
        grupoId: 'grp-ch-caliente',
        productos: [
          { id: 'prod-ch-7', nombre: 'Arroz con Mariscos Meloso', activo: true, precioReferencia: 26.0, grupo: 'Cocina Caliente & Wok', familia: 'Arroces & Melosos', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-8', nombre: 'Chaufa de Mariscos al Wok', activo: true, precioReferencia: 23.5, grupo: 'Cocina Caliente & Wok', familia: 'Arroces & Melosos', estadoOperativo: 'DISPONIBLE' },
        ],
      },
      {
        id: 'fam-ch-frituras',
        nombre: 'Frituras del Puerto',
        grupoId: 'grp-ch-caliente',
        productos: [
          { id: 'prod-ch-9', nombre: 'Chicharrón de Calamar con Salsa Criolla', activo: true, precioReferencia: 18.5, grupo: 'Cocina Caliente & Wok', familia: 'Frituras del Puerto', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-10', nombre: 'Jalea Marina Chalaca (Para Compartir)', activo: true, precioReferencia: 29.0, grupo: 'Cocina Caliente & Wok', familia: 'Frituras del Puerto', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-ch-bar',
    nombre: 'Bar & Coctelería Marina',
    familias: [
      {
        id: 'fam-ch-piscos',
        nombre: 'Pisco Sours & Chilcanos',
        grupoId: 'grp-ch-bar',
        productos: [
          { id: 'prod-ch-11', nombre: 'Pisco Sour Clásico Quebranta', activo: true, precioReferencia: 11.5, grupo: 'Bar & Coctelería Marina', familia: 'Pisco Sours & Chilcanos', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-12', nombre: 'Pisco Sour Macerado de Hierbaluisa', activo: true, precioReferencia: 12.5, grupo: 'Bar & Coctelería Marina', familia: 'Pisco Sours & Chilcanos', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-13', nombre: 'Pisco Sour de Maracuyá', activo: true, precioReferencia: 12.5, grupo: 'Bar & Coctelería Marina', familia: 'Pisco Sours & Chilcanos', estadoOperativo: '86_AGOTADO', motivo86: 'Rotura de stock de fruta fresca' },
          { id: 'prod-ch-14', nombre: 'Chilcano Tradicional con Ginger Ale', activo: true, precioReferencia: 11.0, grupo: 'Bar & Coctelería Marina', familia: 'Pisco Sours & Chilcanos', estadoOperativo: 'DISPONIBLE' },
        ],
      },
      {
        id: 'fam-ch-cervezas',
        nombre: 'Cervezas & Sin Alcohol',
        grupoId: 'grp-ch-bar',
        productos: [
          { id: 'prod-ch-15', nombre: 'Cerveza Cusqueña Trigo (Botella 33cl)', activo: true, precioReferencia: 4.5, grupo: 'Bar & Coctelería Marina', familia: 'Cervezas & Sin Alcohol', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-16', nombre: 'Chicha Morada Artesanal de Maíz Morado', activo: true, precioReferencia: 4.0, grupo: 'Bar & Coctelería Marina', familia: 'Cervezas & Sin Alcohol', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-ch-postres',
    nombre: 'Postres Criollos',
    familias: [
      {
        id: 'fam-ch-dulces',
        nombre: 'Tradición Dulce',
        grupoId: 'grp-ch-postres',
        productos: [
          { id: 'prod-ch-17', nombre: 'Suspiro a la Limeña Tradicional', activo: true, precioReferencia: 7.5, grupo: 'Postres Criollos', familia: 'Tradición Dulce', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ch-18', nombre: 'Tarta de Queso con Lúcuma', activo: true, precioReferencia: 8.5, grupo: 'Postres Criollos', familia: 'Tradición Dulce', estadoOperativo: '85_ULTIMAS_UNIDADES', unidadesRestantes85: 2 },
        ],
      },
    ],
  },
];

export const REVO_CATALOG_PONJA: RevoGrupo[] = [
  {
    id: 'grp-po-sushi',
    nombre: 'Barra Sushi & Omakase',
    familias: [
      {
        id: 'fam-po-nigiris',
        nombre: 'Nigiris de Autor (2 uds)',
        grupoId: 'grp-po-sushi',
        productos: [
          { id: 'prod-po-1', nombre: 'Nigiri Vieira Trufada & Foie', activo: true, precioReferencia: 18.0, grupo: 'Barra Sushi & Omakase', familia: 'Nigiris de Autor', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-po-2', nombre: 'Nigiri Atún Balfegó Akami Trufado', activo: true, precioReferencia: 16.5, grupo: 'Barra Sushi & Omakase', familia: 'Nigiris de Autor', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-po-3', nombre: 'Nigiri Salmón Flameado con Maracuyá', activo: true, precioReferencia: 14.0, grupo: 'Barra Sushi & Omakase', familia: 'Nigiris de Autor', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-po-4', nombre: 'Nigiri Erizo de Galicia', activo: true, precioReferencia: 19.5, grupo: 'Barra Sushi & Omakase', familia: 'Nigiris de Autor', estadoOperativo: '85_ULTIMAS_UNIDADES', unidadesRestantes85: 4 },
        ],
      },
      {
        id: 'fam-po-makis',
        nombre: 'Makis & Rolls Nikkei (8 uds)',
        grupoId: 'grp-po-sushi',
        productos: [
          { id: 'prod-po-5', nombre: 'Roll Acevichado Tradicional Ponja', activo: true, precioReferencia: 19.0, grupo: 'Barra Sushi & Omakase', familia: 'Makis & Rolls Nikkei', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-po-6', nombre: 'Roll Furai con Langostino y Palta', activo: true, precioReferencia: 17.5, grupo: 'Barra Sushi & Omakase', familia: 'Makis & Rolls Nikkei', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-po-caliente',
    nombre: 'Cocina Caliente & Robata',
    familias: [
      {
        id: 'fam-po-robata',
        nombre: 'Robatayaki al Carbón Binchotan',
        grupoId: 'grp-po-caliente',
        productos: [
          { id: 'prod-po-7', nombre: 'Anticucho de Pulpo a la Robata', activo: true, precioReferencia: 22.0, grupo: 'Cocina Caliente & Robata', familia: 'Robatayaki al Carbón Binchotan', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-po-8', nombre: 'Bao de Panceta Chashu con Hoisin Criollo', activo: true, precioReferencia: 15.0, grupo: 'Cocina Caliente & Robata', familia: 'Robatayaki al Carbón Binchotan', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-po-bar',
    nombre: 'Bar & Sakes',
    familias: [
      {
        id: 'fam-po-cocteles',
        nombre: 'Coctelería de Autor Shiso & Pisco',
        grupoId: 'grp-po-bar',
        productos: [
          { id: 'prod-po-9', nombre: 'Cóctel Akai Shiso & Sake Junmai', activo: true, precioReferencia: 14.0, grupo: 'Bar & Sakes', familia: 'Coctelería de Autor', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-po-10', nombre: 'Pisco Sour Nikkei con Yuzu Fresco', activo: true, precioReferencia: 13.5, grupo: 'Bar & Sakes', familia: 'Coctelería de Autor', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-po-11', nombre: 'Cerveza Asahi de Barril', activo: true, precioReferencia: 5.0, grupo: 'Bar & Sakes', familia: 'Cervezas Japonesas', estadoOperativo: '86_AGOTADO', motivo86: 'Avería en grifo barril, servir botella' },
        ],
      },
    ],
  },
];

export const REVO_CATALOG_QUISPE: RevoGrupo[] = [
  {
    id: 'grp-qu-entrantes',
    nombre: 'Entrantes & Causas de Autor',
    familias: [
      {
        id: 'fam-qu-causas',
        nombre: 'Causas de Alta Cocina',
        grupoId: 'grp-qu-entrantes',
        productos: [
          { id: 'prod-qu-1', nombre: 'Causa Limeña con Bogavante Azul', activo: true, precioReferencia: 27.0, grupo: 'Entrantes & Causas de Autor', familia: 'Causas de Alta Cocina', estadoOperativo: '85_ULTIMAS_UNIDADES', unidadesRestantes85: 6 },
          { id: 'prod-qu-2', nombre: 'Ceviche Quispe al Ají Charapita', activo: true, precioReferencia: 26.5, grupo: 'Entrantes & Causas de Autor', familia: 'Ceviches Quispe', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-qu-principales',
    nombre: 'Platos Principales de Autor',
    familias: [
      {
        id: 'fam-qu-carnes',
        nombre: 'Carnes & Cocción Lenta',
        grupoId: 'grp-qu-principales',
        productos: [
          { id: 'prod-qu-3', nombre: 'Seco de Cordero Lechal 36 Horas', activo: true, precioReferencia: 31.0, grupo: 'Platos Principales de Autor', familia: 'Carnes & Cocción Lenta', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-qu-4', nombre: 'Lomo Quispe con Tacu Tacu Trufado', activo: true, precioReferencia: 33.0, grupo: 'Platos Principales de Autor', familia: 'Carnes & Cocción Lenta', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-qu-5', nombre: 'Corvina Salvaje en Costra de Quinua', activo: true, precioReferencia: 29.5, grupo: 'Platos Principales de Autor', familia: 'Pescados de Lonja', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-qu-bodega',
    nombre: 'Barra Insignia & Bodega',
    familias: [
      {
        id: 'fam-qu-piscos',
        nombre: 'Pisco Bar Reserva',
        grupoId: 'grp-qu-bodega',
        productos: [
          { id: 'prod-qu-6', nombre: 'Pisco Punch Quispe con Piña Rostizada', activo: true, precioReferencia: 14.5, grupo: 'Barra Insignia', familia: 'Pisco Bar Reserva', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-qu-7', nombre: 'Pisco Sour Mosto Verde Portón', activo: true, precioReferencia: 14.0, grupo: 'Barra Insignia', familia: 'Pisco Bar Reserva', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
];

export const REVO_CATALOG_ACHOLAO: RevoGrupo[] = [
  {
    id: 'grp-ac-brasas',
    nombre: 'Brasas & Anticuchería',
    familias: [
      {
        id: 'fam-ac-anticuchos',
        nombre: 'Anticuchos al Carbón de Quebracho',
        grupoId: 'grp-ac-brasas',
        productos: [
          { id: 'prod-ac-1', nombre: 'Anticuchos de Corazón Criollos (2 brochetas)', activo: true, precioReferencia: 16.5, grupo: 'Brasas & Anticuchería', familia: 'Anticuchos', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ac-2', nombre: 'Mollejitas de Pollo a la Parrilla', activo: true, precioReferencia: 15.0, grupo: 'Brasas & Anticuchería', familia: 'Anticuchos', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-ac-wok',
    nombre: 'Wok Callejero & Sánguches',
    familias: [
      {
        id: 'fam-ac-saltados',
        nombre: 'Saltados Limeños al Wok',
        grupoId: 'grp-ac-wok',
        productos: [
          { id: 'prod-ac-3', nombre: 'Lomo Saltado Criollo Tradicional', activo: true, precioReferencia: 22.0, grupo: 'Wok Callejero', familia: 'Saltados', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ac-4', nombre: 'Tallarín Saltado Criollo de Pollo', activo: true, precioReferencia: 18.5, grupo: 'Wok Callejero', familia: 'Saltados', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ac-5', nombre: 'Sánguche de Chicharrón con Camote Frito', activo: true, precioReferencia: 12.5, grupo: 'Sanguchería', familia: 'Sánguches', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
  {
    id: 'grp-ac-bar',
    nombre: 'Bebidas Populares & Chelas',
    familias: [
      {
        id: 'fam-ac-cervezas',
        nombre: 'Cervezas Peruanas & Refrescos',
        grupoId: 'grp-ac-bar',
        productos: [
          { id: 'prod-ac-6', nombre: 'Cerveza Cusqueña Rubia (Tercio)', activo: true, precioReferencia: 4.2, grupo: 'Bebidas', familia: 'Cervezas', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ac-7', nombre: 'Pilsen Callao Helada', activo: true, precioReferencia: 4.2, grupo: 'Bebidas', familia: 'Cervezas', estadoOperativo: 'DISPONIBLE' },
          { id: 'prod-ac-8', nombre: 'Chicha Morada de Olla Casera (Jarra 1L)', activo: true, precioReferencia: 9.5, grupo: 'Bebidas', familia: 'Refrescos', estadoOperativo: 'DISPONIBLE' },
        ],
      },
    ],
  },
];

// ==========================================
// BRIEFINGS INICIALES (SOLO CHALACO, PONJA, QUISPE, ACHOLAO)
// ==========================================

export const INITIAL_BRIEFINGS: Record<LocalId, BriefingData> = {
  CHALACO: {
    localId: 'CHALACO',
    fechaOperativa: '2026-09-29',
    diaOperativoStr: 'Martes 29 de Septiembre',
    turno: 'CENA',
    horarioServicio: '20:30 — 00:30 (Corte 04:00 AM)',
    jefeSala: 'Carlos Mendoza (Maitre)',
    jefeCocina: 'Chef Renzo Alva',
    previsionPax: 86,
    mesasReservadas: 24,
    rotacionesPrevistas: 1.8,
    ticketMedioObjetivo: 46.5, // TKP Target
    horaPunta: '21:45 — 23:15',
    completado: false,

    // RANKING TKP (Reconocimiento del equipo sin cifras de venta global)
    tkpRanking: {
      ayerLider: {
        nombre: 'Diego Huamán',
        tkp: 52.4,
        rango: 'Rango 3 (Altas & Fondo)',
        servicio: 'Cena',
      },
      mesLider: {
        nombre: 'Valeria Rivas',
        tkp: 49.8,
        rango: 'Rango 2 (Centro Sala)',
        posicion: 1,
      },
      tkpTargetObjetivo: 46.5,
    },

    // TEMAS DE REPASO JDF (MANDOS DE SALA Y COCINA)
    repasoJdf: {
      directorActual: 'CONJUNTO',
      mensajeSala: 'Recepción y bienvenida inmediata al comensal (menos de 60 segundos). Cantar el Pisco Sour macerado de hierbaluisa antes de tomar la comanda sólida.',
      mensajeCocina: 'Mantenimiento del punto de sal y acidez del ceviche: leche de tigre recién batida para cada comanda. No acumular platos en el pase más de 1 minuto.',
      temaDelDia: 'Protocolo de Servicio de Leche de Tigre & Tiempo de Pase',
      puntosClave: [
        'Temperatura de la leche de tigre entre 2°C y 4°C.',
        'Ofrecer cuchara de degustación al comensal antes de añadir más ají.',
        'Retirada de platos vacíos en mesa siempre con permiso y en silencio.',
      ],
    },

    catalogoRevo: REVO_CATALOG_CHALACO,

    platosFoco: [
      {
        id: 'pf-1',
        nombre: 'Ceviche Mixto Chalaco',
        categoria: 'Cocina',
        tkpImpacto: 24.5,
        objetivoVenta: 22,
        motivo: 'Plato Estrella',
        argumentoVenta: 'Corvina fresca de lonja, pulpo tierno a la brasa y leche de tigre al rocoto bien balanceada.',
      },
      {
        id: 'pf-2',
        nombre: 'Arroz con Mariscos Meloso',
        categoria: 'Cocina',
        tkpImpacto: 26.0,
        objetivoVenta: 16,
        motivo: 'Especialidad',
        argumentoVenta: 'Fondo concentrado de mariscos y coral de camarón, ideal para compartir en mesas de 2 o más.',
      },
      {
        id: 'pf-3',
        nombre: 'Pisco Sour Macerado de Hierbaluisa',
        categoria: 'Barra',
        tkpImpacto: 12.5,
        objetivoVenta: 28,
        motivo: 'Plato Estrella',
        argumentoVenta: 'Aperitivo aromático digestivo con Pisco Quebranta premium elaborado en casa.',
      },
    ],

    insumosCriticos: [
      {
        id: 'ic-1',
        producto: 'Corvina Salvaje (Corte Ceviche)',
        partida: 'Pescadería',
        cantidadRestante: '4.2 kg (aprox. 18 raciones)',
        prioridad: 'Crítica',
        notaChef: 'Llegada de ayer lunes; rotación prioritaria en primer turno para mantener textura óptima.',
      },
      {
        id: 'ic-2',
        producto: 'Conchas de Abanico (Veneras)',
        partida: 'Cocina Caliente',
        cantidadRestante: '14 unidades',
        prioridad: 'Media',
        notaChef: 'Ofrecer como entrante caliente a la parmesana fuera de carta.',
      },
    ],

    mesasEspeciales: [
      {
        id: 'me-1',
        mesa: 'Mesa 12',
        pax: 4,
        hora: '21:30',
        tipo: 'VIP',
        detalles: 'Familia Quispe / Invitados de Dirección. Atención directa por Carlos.',
      },
      {
        id: 'me-2',
        mesa: 'Mesa 4',
        pax: 2,
        hora: '21:00',
        tipo: 'Alérgeno Crítico',
        detalles: '1 comensal CELÍACO SEVERO y alérgico a crustáceos. Extremar protocolo de cocina limpia.',
        alérgenos: ['Gluten', 'Crustáceos'],
      },
      {
        id: 'me-3',
        mesa: 'Mesa 8',
        pax: 6,
        hora: '22:15',
        tipo: 'Celebración',
        detalles: 'Aniversario de bodas. Incluir vela en postre cortesía de la casa.',
      },
    ],

    incidenciasPrevias: [
      {
        id: 'inc-1',
        origen: 'Cierre Anterior',
        severidad: 'Atención',
        descripcion: 'La freidora #2 de papas y yucas tarda 8 min más en alcanzar 180°C. Mantener en precalentado desde las 20:00.',
        resuelta: false,
      },
      {
        id: 'inc-2',
        origen: 'Logística',
        severidad: 'Informativa',
        descripcion: 'Recibido albarán de Pisco Biondi y cerveza Cusqueña a las 18:00.',
        resuelta: true,
      },
    ],

    rangos: [
      {
        id: 'rg-1',
        zona: 'Rango 1 (Terraza & Entrada)',
        responsableSala: 'Marcos Soto',
        mesas: 'Mesas T1 a T6 (24 pax)',
        estado: 'Presente',
      },
      {
        id: 'rg-2',
        zona: 'Rango 2 (Sala Principal Centro)',
        responsableSala: 'Valeria Rivas (Top TKP)',
        mesas: 'Mesas 1 a 7 (32 pax)',
        estado: 'Presente',
      },
      {
        id: 'rg-3',
        zona: 'Rango 3 (Altas & Salón Fondo)',
        responsableSala: 'Diego Huamán (Líder Ayer)',
        mesas: 'Mesas 8 a 14 (30 pax)',
        estado: 'Presente',
      },
      {
        id: 'rg-4',
        zona: 'Passe & Calidad Sala',
        responsableSala: 'Carlos Mendoza (Maitre)',
        mesas: 'Coordinación con Chef Renzo',
        estado: 'Presente',
      },
    ],
  },

  PONJA: {
    localId: 'PONJA',
    fechaOperativa: '2026-09-29',
    diaOperativoStr: 'Martes 29 de Septiembre',
    turno: 'CENA',
    horarioServicio: '20:30 — 00:30 (Corte 04:00 AM)',
    jefeSala: 'Naomi Tanaka',
    jefeCocina: 'Chef Kenji Sato',
    previsionPax: 92,
    mesasReservadas: 28,
    rotacionesPrevistas: 2.0,
    ticketMedioObjetivo: 54.0,
    horaPunta: '21:30 — 23:30',
    completado: false,

    tkpRanking: {
      ayerLider: {
        nombre: 'Kenzo Mori',
        tkp: 61.2,
        rango: 'Barra Omakase',
        servicio: 'Cena',
      },
      mesLider: {
        nombre: 'Naomi Tanaka',
        tkp: 58.5,
        rango: 'Sala VIP',
        posicion: 1,
      },
      tkpTargetObjetivo: 54.0,
    },

    repasoJdf: {
      directorActual: 'COCINA',
      mensajeSala: 'Explicar con calma el maridaje de sake en cada plato Omakase. Recordar que ningún nigiri caliente puede esperar más de 45 seg en pase.',
      mensajeCocina: 'Temperatura del arroz shari a 36°C constante. El corte de atún Balfegó debe mantener el ángulo de 45° sin desgarro de fibra.',
      temaDelDia: 'Temperatura de Servicio del Shari & Cadencia en Barra Omakase',
      puntosClave: [
        'Comprobar temperatura del termostato shari cada 30 minutos.',
        'Servir nigiri flameado inmediatamente en la mano del comensal.',
      ],
    },

    catalogoRevo: REVO_CATALOG_PONJA,

    platosFoco: [
      {
        id: 'pf-p1',
        nombre: 'Nigiri Vieira Trufada & Foie',
        categoria: 'Cocina',
        tkpImpacto: 18.0,
        objetivoVenta: 25,
        motivo: 'Plato Estrella',
        argumentoVenta: 'Vieira flameada al soplete con mantequilla de trufa negra y gotas de tare casera.',
      },
      {
        id: 'pf-p2',
        nombre: 'Tiradito Nikkei de Atún Balfegó',
        categoria: 'Cocina',
        tkpImpacto: 22.5,
        objetivoVenta: 20,
        motivo: 'Especialidad',
        argumentoVenta: 'Láminas de akami con emulsión de ponzu criollo y chips de ajo crujiente.',
      },
      {
        id: 'pf-p3',
        nombre: 'Cóctel Akai Shiso & Sake Junmai',
        categoria: 'Barra',
        tkpImpacto: 14.0,
        objetivoVenta: 30,
        motivo: 'Especialidad',
        argumentoVenta: 'Refrescante maridaje diseñado específicamente para la barra de sushi.',
      },
    ],

    insumosCriticos: [
      {
        id: 'ic-p1',
        producto: 'Lomo de Atún Balfegó (Akami)',
        partida: 'Sushi / Fríos',
        cantidadRestante: '3.1 kg',
        prioridad: 'Crítica',
        notaChef: 'Corte óptimo para el servicio de hoy. Impulsar tiradito y nigiri akami.',
      },
    ],

    mesasEspeciales: [
      {
        id: 'me-p1',
        mesa: 'Barra Sushi Puestos 1-4',
        pax: 4,
        hora: '21:00',
        tipo: 'Guía Gastronómica',
        detalles: 'Crítico gastronómico y acompañantes. Servicio Omakase sugerido.',
      },
    ],

    incidenciasPrevias: [],

    rangos: [
      {
        id: 'rg-p1',
        zona: 'Barra Omakase',
        responsableSala: 'Naomi Tanaka',
        mesas: '10 puestos',
        estado: 'Presente',
      },
      {
        id: 'rg-p2',
        zona: 'Salón Principal',
        responsableSala: 'Javier Castillo',
        mesas: 'Mesas 1 a 10',
        estado: 'Presente',
      },
    ],
  },

  QUISPE: {
    localId: 'QUISPE',
    fechaOperativa: '2026-09-29',
    diaOperativoStr: 'Martes 29 de Septiembre',
    turno: 'CENA',
    horarioServicio: '20:30 — 00:30 (Corte 04:00 AM)',
    jefeSala: 'Mateo Zapata',
    jefeCocina: 'Chef Principal Quispe',
    previsionPax: 110,
    mesasReservadas: 34,
    rotacionesPrevistas: 1.9,
    ticketMedioObjetivo: 62.0,
    horaPunta: '22:00 — 23:30',
    completado: false,

    tkpRanking: {
      ayerLider: {
        nombre: 'Sofía Benítez',
        tkp: 74.0,
        rango: 'Salón Noble',
        servicio: 'Cena',
      },
      mesLider: {
        nombre: 'Mateo Zapata',
        tkp: 68.4,
        rango: 'Salón Privado',
        posicion: 1,
      },
      tkpTargetObjetivo: 62.0,
    },

    repasoJdf: {
      directorActual: 'SALA',
      mensajeSala: 'Relato de la historia del plato al depositarlo en mesa. Descorche de vino impecable y cambio de cubertería de plata entre pases.',
      mensajeCocina: 'Control estricto de la temperatura de los fondos de reducción y crujientes de quinua.',
      temaDelDia: 'Storytelling Gastronómico en Mesa & Servicio de Sumillería',
      puntosClave: [
        'Explicar el origen de los ajíes nativos y tubérculos andinos.',
        'Sugerir maridaje por copas en cada paso del menú degustación.',
      ],
    },

    catalogoRevo: REVO_CATALOG_QUISPE,

    platosFoco: [
      {
        id: 'pf-q1',
        nombre: 'Causa Limeña con Tartar de Bogavante',
        categoria: 'Cocina',
        tkpImpacto: 27.0,
        objetivoVenta: 24,
        motivo: 'Plato Estrella',
        argumentoVenta: 'Papa amarilla prensada a mano con ají amarillo macerado y bogavante azul.',
      },
      {
        id: 'pf-q2',
        nombre: 'Seco de Cordero Lechal 36h',
        categoria: 'Cocina',
        tkpImpacto: 31.0,
        objetivoVenta: 18,
        motivo: 'Sugerencia Chef',
        argumentoVenta: 'Cocinado al vacío 36 horas con cilantro de huerta y frijoles canarios guisados.',
      },
    ],

    insumosCriticos: [
      {
        id: 'ic-q1',
        producto: 'Bogavante Azul',
        partida: 'Pescadería',
        cantidadRestante: '6 unidades',
        prioridad: 'Crítica',
        notaChef: 'Salida prioritaria en causas y arroces.',
      },
    ],

    mesasEspeciales: [],
    incidenciasPrevias: [],
    rangos: [
      {
        id: 'rg-q1',
        zona: 'Salón Noble',
        responsableSala: 'Mateo Zapata',
        mesas: 'Mesas 1 a 12',
        estado: 'Presente',
      },
    ],
  },

  ACHOLAO: {
    localId: 'ACHOLAO',
    fechaOperativa: '2026-09-29',
    diaOperativoStr: 'Martes 29 de Septiembre',
    turno: 'CENA',
    horarioServicio: '20:30 — 00:30 (Corte 04:00 AM)',
    jefeSala: 'Rosa Medina',
    jefeCocina: 'Chef Wok Luis',
    previsionPax: 95,
    mesasReservadas: 22,
    rotacionesPrevistas: 2.2,
    ticketMedioObjetivo: 38.0,
    horaPunta: '21:30 — 23:00',
    completado: false,

    tkpRanking: {
      ayerLider: {
        nombre: 'Piero García',
        tkp: 43.5,
        rango: 'Barra & Altas',
        servicio: 'Cena',
      },
      mesLider: {
        nombre: 'Rosa Medina',
        tkp: 40.2,
        rango: 'Salón Criollo',
        posicion: 1,
      },
      tkpTargetObjetivo: 38.0,
    },

    repasoJdf: {
      directorActual: 'CONJUNTO',
      mensajeSala: 'Rotación ágil de mesas y venta del combo tradicional de anticuchos con cerveza Cusqueña.',
      mensajeCocina: 'Fuego al máximo en el wok: el lomo saltado debe humear con aroma ahumado perfecto.',
      temaDelDia: 'Ritmo de Rotación de Mesa & Técnica de Wok Ahumado',
      puntosClave: [
        'Venta de picoteo inmediato para mesas en espera.',
        'El tiempo desde comanda hasta mesa caliente no debe superar 9 minutos.',
      ],
    },

    catalogoRevo: REVO_CATALOG_ACHOLAO,

    platosFoco: [
      {
        id: 'pf-a1',
        nombre: 'Anticuchos de Corazón Criollos',
        categoria: 'Cocina',
        tkpImpacto: 16.5,
        objetivoVenta: 30,
        motivo: 'Plato Estrella',
        argumentoVenta: 'Macerados 24h en ají panca y vinagre tinto, dorados al carbón con papa dorada.',
      },
    ],

    insumosCriticos: [],
    mesasEspeciales: [],
    incidenciasPrevias: [],
    rangos: [
      {
        id: 'rg-a1',
        zona: 'Salón Criollo',
        responsableSala: 'Rosa Medina',
        mesas: 'Mesas 1 a 10',
        estado: 'Presente',
      },
    ],
  },
};
