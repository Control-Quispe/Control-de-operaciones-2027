import React, { useState } from 'react';
import { 
  Scale, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Save, 
  Flame, 
  FileSpreadsheet, 
  Filter 
} from 'lucide-react';
import { LocalId } from '../types/briefing';
import { LOCALES_CONFIG } from '../data/mockBriefingData';
import { RegistroMerma } from '../types/costeReal';
import { REGISTROS_MERMAS_INICIALES } from '../data/mockCosteRealData';

interface MermasModuleProps {
  currentLocalId: LocalId;
}

export const MermasModule: React.FC<MermasModuleProps> = ({ currentLocalId }) => {
  const [mermas, setMermas] = useState<RegistroMerma[]>(REGISTROS_MERMAS_INICIALES);
  
  // New Merma Form State
  const [partida, setPartida] = useState<'Pescadería' | 'Cocina Caliente' | 'Sushi / Nikkei' | 'Barra' | 'Pastelería'>('Pescadería');
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState<number>(1.0);
  const [unidad, setUnidad] = useState<'kg' | 'uds' | 'litros'>('kg');
  const [costeUnitario, setCosteUnitario] = useState<number>(18.5);
  const [motivo, setMotivo] = useState<'Caducidad / Merma natural' | 'Error de cocinado / Pase' | 'Rotura / Caída' | 'Calidad proveedor no apta'>('Caducidad / Merma natural');
  const [responsable, setResponsable] = useState('Jefe de Partida');
  const [notification, setNotification] = useState<string | null>(null);

  const localConfig = LOCALES_CONFIG[currentLocalId];

  // Calculated impact
  const costeTotalMerma = Number((cantidad * costeUnitario).toFixed(2));
  // Estimated impact on day's food cost (assuming ~€4000 daily sales):
  const impactoEstimado = Number(((costeTotalMerma / 4000) * 100).toFixed(2));

  // Quick preset products
  const presets = [
    { prod: 'Corvina Salvaje (Corte Ceviche)', part: 'Pescadería', cost: 18.5, un: 'kg' as const },
    { prod: 'Pulpo Cocido Entero', part: 'Pescadería', cost: 22.0, un: 'kg' as const },
    { prod: 'Lomo de Atún Balfegó', part: 'Pescadería', cost: 38.0, un: 'kg' as const },
    { prod: 'Lomo Bajo de Añojo', part: 'Cocina Caliente', cost: 19.8, un: 'kg' as const },
    { prod: 'Arroz con Mariscos (Ración)', part: 'Cocina Caliente', cost: 5.4, un: 'uds' as const },
    { prod: 'Pisco Quebranta (Botella)', part: 'Barra', cost: 18.2, un: 'uds' as const },
    { prod: 'Limón Sutil Verde', part: 'Pescadería', cost: 3.4, un: 'kg' as const },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setProducto(p.prod);
    setPartida(p.part as any);
    setCosteUnitario(p.cost);
    setUnidad(p.un);
  };

  const handleAddMerma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!producto.trim()) return;

    const nuevaMerma: RegistroMerma = {
      id: `merm-${Date.now()}`,
      fecha: '2026-09-29',
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      localId: currentLocalId,
      partida,
      producto,
      cantidad,
      unidad,
      costeUnitario,
      costeTotalMerma,
      motivo,
      responsable,
      impactoCosteEstimadoPct: impactoEstimado,
    };

    setMermas([nuevaMerma, ...mermas]);
    setProducto('');
    setCantidad(1.0);
    setNotification(`Merma registrada: €${costeTotalMerma} (+${impactoEstimado}% en Food Cost)`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleDeleteMerma = (id: string) => {
    setMermas(mermas.filter((m) => m.id !== id));
  };

  const totalMermasEuros = mermas.reduce((acc, m) => acc + m.costeTotalMerma, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-rose-500 text-white font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-rose-400">
          <AlertTriangle className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded border border-rose-500/20">
              Terminal BOH de Cocina
            </span>
            <span className="text-xs text-slate-400 font-mono">Trading Day • Corte 04:00 AM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Registro Rápido de Mermas: {localConfig.name}
          </h2>
          <p className="text-xs text-slate-400">
            Imputación instantánea al cierre diario para calibrar el Coste Real de Food Cost sin esperar al inventario mensual.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Mermas Imputadas Hoy</span>
            <span className="text-xl font-black text-rose-400">€{totalMermasEuros.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Grid: Formulario Rápido Táctil & Historial */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Quick Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-rose-500" />
            <span>Nueva Merma / Descarte</span>
          </h3>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Insumos Frecuentes (1 Clic):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors"
                >
                  {p.prod}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleAddMerma} className="space-y-4 text-xs pt-2">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Producto o Insumo</label>
              <input
                type="text"
                required
                placeholder="Ej: Corvina Salvaje"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Partida</label>
                <select
                  value={partida}
                  onChange={(e) => setPartida(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 text-xs"
                >
                  <option value="Pescadería">Pescadería</option>
                  <option value="Cocina Caliente">Cocina Caliente</option>
                  <option value="Sushi / Nikkei">Sushi / Nikkei</option>
                  <option value="Barra">Barra</option>
                  <option value="Pastelería">Pastelería</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Motivo del Descarte</label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 text-xs"
                >
                  <option value="Caducidad / Merma natural">Caducidad / Merma natural</option>
                  <option value="Error de cocinado / Pase">Error de cocinado / Pase</option>
                  <option value="Rotura / Caída">Rotura / Caída</option>
                  <option value="Calidad proveedor no apta">Calidad proveedor no apta</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Cantidad</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Unidad</label>
                <select
                  value={unidad}
                  onChange={(e) => setUnidad(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 text-xs"
                >
                  <option value="kg">kg</option>
                  <option value="uds">uds</option>
                  <option value="litros">litros</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Coste €/ud</label>
                <input
                  type="number"
                  step="0.1"
                  value={costeUnitario}
                  onChange={(e) => setCosteUnitario(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-500 text-xs"
                />
              </div>
            </div>

            {/* Impacto Económico Inmediato */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-rose-400" />
                Impacto Financiero Calculado:
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white">€{costeTotalMerma}</span>
                <span className="text-xs font-bold text-rose-400">
                  +{impactoEstimado}% en Food Cost del día
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar e Imputar al Cierre</span>
            </button>
          </form>
        </div>

        {/* Right: Live Log of Recorded Waste (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <span>Historial de Mermas del Día Operativo</span>
              </h3>
              <p className="text-xs text-slate-400">
                Imputado de 04:00 AM a 03:59 AM. Se deduce automáticamente del Food Cost.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              {mermas.length} registros
            </span>
          </div>

          <div className="space-y-3">
            {mermas.map((m) => (
              <div
                key={m.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{m.producto}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {m.partida}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{m.hora}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-sm font-black text-rose-400 block">€{m.costeTotalMerma.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-500">{m.cantidad} {m.unidad} a €{m.costeUnitario}/{m.unidad}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteMerma(m.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                  <span>Motivo: <strong className="text-slate-300">{m.motivo}</strong></span>
                  <span>Resp: {m.responsable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
