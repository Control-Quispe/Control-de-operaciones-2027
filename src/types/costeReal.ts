import { LocalId } from './briefing';

export interface ScorecardLocal {
  localId: LocalId;
  nombre: string;
  ventaNeta: number;
  ventaIva: number;
  pax: number;
  tkp: number;
  comprasFb: number;
  costeRealPct: number;
  costeTargetPct: number;
  desviacionPct: number;
  estado: 'Optimo' | 'Atencion' | 'Desviado';
}

export interface CompraProducto {
  id: string;
  nombre: string;
  familia: string;
  proveedor: string;
  cantidad: number;
  unidad: string;
  precioMedio: number;
  ultimoPrecio: number;
  fechaUltimaCompra: string;
  totalCompra: number;
  categoriaFb: 'ALIMENTOS' | 'BEBIDAS';
}

export interface ProveedorResumen {
  id: string;
  nombre: string;
  totalEuros: number;
  porcentaje: number;
  familias: string[];
}

export interface FamiliaResumen {
  id: string;
  nombre: string;
  totalEuros: number;
  porcentaje: number;
  proveedores: string[];
}

export interface EvolucionMensual {
  mes: string;
  mesCorto: string;
  compras: number;
  semanas: {
    semana: string;
    compras: number;
  }[];
}

export interface FlujoCosteReal {
  inventarioInicial: number;
  comprasFb: number;
  traspasosEntrada: number;
  traspasosSalida: number;
  mermas: number;
  inventarioFinal: number;
  consumoNetoFb: number;
  ventaNeta: number;
  costeRealCalculadoPct: number;
  costeTargetPct: number;
}

export interface RegistroMerma {
  id: string;
  fecha: string;
  hora: string;
  localId: LocalId;
  partida: 'Pescadería' | 'Cocina Caliente' | 'Sushi / Nikkei' | 'Barra' | 'Pastelería';
  producto: string;
  cantidad: number;
  unidad: 'kg' | 'uds' | 'litros';
  costeUnitario: number;
  costeTotalMerma: number;
  motivo: 'Caducidad / Merma natural' | 'Error de cocinado / Pase' | 'Rotura / Caída' | 'Calidad proveedor no apta';
  responsable: string;
  impactoCosteEstimadoPct: number;
}
