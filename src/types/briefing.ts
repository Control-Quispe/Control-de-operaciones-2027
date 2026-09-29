export type LocalId = 'CHALACO' | 'QUISPE' | 'PONJA' | 'ACHOLAO';

export interface LocalConfig {
  id: LocalId;
  name: string;
  tagline: string;
  concept: string;
  foodCostTarget: number; // e.g. 22.0 for Chalaco, 24.5 for Ponja, 25.0 for Quispe
  color: string;
  accentBg: string;
}

export type Turno = 'COMIDA' | 'CENA';

export type RolDirectorBriefing = 'SALA' | 'COCINA' | 'CONJUNTO';

export interface PlatoFoco {
  id: string;
  nombre: string;
  categoria: 'Cocina' | 'Barra' | 'Postre';
  tkpImpacto: number; // Impacto en TKP estimado
  objetivoVenta: number;
  motivo: 'Plato Estrella' | 'Sugerencia Chef' | 'Especialidad';
  argumentoVenta: string;
}

// Estructura Revo TPV / Fichas Técnicas Yurest
export interface RevoProducto {
  id: string;
  nombre: string;
  activo: boolean; // Solo se muestran los que están activos en Revo
  precioReferencia: number;
  familia: string;
  grupo: string;
  estadoOperativo?: 'DISPONIBLE' | '85_ULTIMAS_UNIDADES' | '86_AGOTADO';
  unidadesRestantes85?: number;
  motivo86?: string;
}

export interface RevoFamilia {
  id: string;
  nombre: string;
  grupoId: string;
  productos: RevoProducto[];
}

export interface RevoGrupo {
  id: string;
  nombre: string; // ej: 'Cocina Fría / Ceviches', 'Cocina Caliente', 'Bar / Coctelería'
  familias: RevoFamilia[];
}

export interface InsumoRotacion {
  id: string;
  producto: string;
  partida: 'Sushi / Fríos' | 'Cocina Caliente' | 'Barra' | 'Pescadería';
  cantidadRestante: string;
  prioridad: 'Crítica' | 'Media' | 'Baja';
  notaChef: string;
}

export interface MesaEspecial {
  id: string;
  mesa: string;
  pax: number;
  hora: string;
  tipo: 'VIP' | 'Alérgeno Crítico' | 'Celebración' | 'Guía Gastronómica';
  detalles: string;
  alérgenos?: string[];
}

export interface IncidenciaArrastrada {
  id: string;
  origen: 'Cierre Anterior' | 'Mantenimiento' | 'Logística';
  severidad: 'Atención' | 'Informativa' | 'Urgente';
  descripcion: string;
  resuelta: boolean;
}

export interface RangoAsignado {
  id: string;
  zona: string;
  responsableSala: string;
  mesas: string;
  estado: 'Presente' | 'Pendiente' | 'Baja';
}

export interface RepasoJDF {
  directorActual: RolDirectorBriefing;
  mensajeSala: string;
  mensajeCocina: string;
  temaDelDia: string;
  puntosClave: string[];
}

export interface TkpRanking {
  ayerLider: {
    nombre: string;
    tkp: number;
    rango: string;
    servicio: 'Comida' | 'Cena';
  };
  mesLider: {
    nombre: string;
    tkp: number;
    rango: string;
    posicion: number;
  };
  tkpTargetObjetivo: number;
}

export interface BriefingData {
  localId: LocalId;
  fechaOperativa: string;
  diaOperativoStr: string;
  turno: Turno;
  horarioServicio: string;
  
  // Responsables
  jefeSala: string;
  jefeCocina: string;
  
  // Indicadores (SIN ventas totales en €; solo volumen y TKP)
  previsionPax: number;
  mesasReservadas: number;
  rotacionesPrevistas: number;
  ticketMedioObjetivo: number; // TKP Objetivo del día
  horaPunta: string;
  
  // Reconocimiento TKP (Gamificación positiva)
  tkpRanking: TkpRanking;
  
  // Temas de Repaso JDF (Mandos de Sala y Cocina)
  repasoJdf: RepasoJDF;
  
  // Catálogo Revo propio del local y estado 86/85
  catalogoRevo: RevoGrupo[];
  
  // Secciones operativas
  platosFoco: PlatoFoco[];
  insumosCriticos: InsumoRotacion[];
  mesasEspeciales: MesaEspecial[];
  incidenciasPrevias: IncidenciaArrastrada[];
  rangos: RangoAsignado[];
  
  // Firma y cierre
  firmaEncargado?: string;
  completado: boolean;
}
