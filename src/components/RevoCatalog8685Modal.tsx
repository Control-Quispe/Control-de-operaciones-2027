import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Ban, 
  AlertTriangle, 
  CheckCircle2, 
  Folder, 
  Layers, 
  Tag, 
  UtensilsCrossed 
} from 'lucide-react';
import { RevoGrupo, RevoProducto } from '../types/briefing';

interface RevoCatalog8685ModalProps {
  catalogoRevo: RevoGrupo[];
  localName: string;
  onClose: () => void;
  onUpdateCatalogo: (nuevoCatalogo: RevoGrupo[]) => void;
}

export const RevoCatalog8685Modal: React.FC<RevoCatalog8685ModalProps> = ({
  catalogoRevo,
  localName,
  onClose,
  onUpdateCatalogo,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrupoId, setSelectedGrupoId] = useState<string>(catalogoRevo[0]?.id || '');
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [unidades85, setUnidades85] = useState<number>(4);
  const [motivo86, setMotivo86] = useState<string>('Rotura de stock / merma');

  // Change product status
  const handleSetStatus = (
    prodId: string, 
    status: 'DISPONIBLE' | '85_ULTIMAS_UNIDADES' | '86_AGOTADO', 
    units?: number, 
    motivo?: string
  ) => {
    const updated = catalogoRevo.map((grp) => ({
      ...grp,
      familias: grp.familias.map((fam) => ({
        ...fam,
        productos: fam.productos.map((prod) => {
          if (prod.id === prodId) {
            return {
              ...prod,
              estadoOperativo: status,
              unidadesRestantes85: status === '85_ULTIMAS_UNIDADES' ? (units ?? 4) : undefined,
              motivo86: status === '86_AGOTADO' ? (motivo ?? 'Agotado en cocina') : undefined,
            };
          }
          return prod;
        }),
      })),
    }));

    onUpdateCatalogo(updated);
    setEditingProdId(null);
  };

  const selectedGrupo = catalogoRevo.find((g) => g.id === selectedGrupoId) || catalogoRevo[0];

  // Calculate totals
  const allActiveProducts = catalogoRevo.flatMap((g) => g.familias.flatMap((f) => f.productos)).filter((p) => p.activo);
  const count86 = allActiveProducts.filter((p) => p.estadoOperativo === '86_AGOTADO').length;
  const count85 = allActiveProducts.filter((p) => p.estadoOperativo === '85_ULTIMAS_UNIDADES').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                Revo TPV • Fichas Yurest
              </span>
              <span className="text-xs text-slate-400 font-medium">Catálogo exclusivo: {localName}</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1 flex items-center gap-3">
              <span>Gestión de Carta: 86 (Agotados) y 85 (Últimas Unidades)</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30 flex items-center gap-1">
                <Ban className="w-3.5 h-3.5" />
                {count86} en 86
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {count85} en 85
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Groups Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          {/* Groups Tabs (Categorías de Revo) */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {catalogoRevo.map((grp) => (
              <button
                key={grp.id}
                onClick={() => setSelectedGrupoId(grp.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedGrupoId === grp.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Folder className="w-3.5 h-3.5" />
                {grp.nombre}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar plato en carta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Catalog Body (Categorías ➔ Familias ➔ Productos Activos) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {selectedGrupo.familias.map((familia) => {
            // Filtrar productos activos y por búsqueda
            const productosVisibles = familia.productos
              .filter((p) => p.activo) // Regla estricta: Solo activos en Revo
              .filter((p) => 
                !searchTerm || p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              );

            if (productosVisibles.length === 0) return null;

            return (
              <div key={familia.id} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Familia: {familia.nombre}</span>
                  <span className="text-[10px] text-slate-500 font-normal">({productosVisibles.length} productos activos)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {productosVisibles.map((prod) => {
                    const is86 = prod.estadoOperativo === '86_AGOTADO';
                    const is85 = prod.estadoOperativo === '85_ULTIMAS_UNIDADES';
                    const isEditingThis = editingProdId === prod.id;

                    return (
                      <div
                        key={prod.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          is86
                            ? 'bg-rose-950/20 border-rose-500/40'
                            : is85
                            ? 'bg-amber-950/20 border-amber-500/40'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <h4 className={`text-sm font-bold ${is86 ? 'line-through text-slate-400' : 'text-white'}`}>
                              {prod.nombre}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                              <span>Ref: €{prod.precioReferencia.toFixed(2)}</span>
                              <span>•</span>
                              <span className="text-emerald-400 text-[11px]">✓ Activo en Revo</span>
                            </div>
                          </div>

                          {/* Current Status Pill */}
                          <div>
                            {is86 && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-black bg-rose-500/30 text-rose-300 border border-rose-500/50">
                                86 (AGOTADO)
                              </span>
                            )}
                            {is85 && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-black bg-amber-500/30 text-amber-300 border border-amber-500/50">
                                85 ({prod.unidadesRestantes85} UDS)
                              </span>
                            )}
                            {!is86 && !is85 && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-800 text-slate-300">
                                Disponible
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Detail Notes */}
                        {is86 && prod.motivo86 && (
                          <p className="text-[11px] text-rose-300 mt-2 bg-rose-950/40 px-2.5 py-1 rounded-lg">
                            Motivo: {prod.motivo86}
                          </p>
                        )}
                        {is85 && prod.unidadesRestantes85 && (
                          <p className="text-[11px] text-amber-300 mt-2 bg-amber-950/40 px-2.5 py-1 rounded-lg">
                            Aviso: Quedan únicamente {prod.unidadesRestantes85} porciones antes de pasar a 86.
                          </p>
                        )}

                        {/* Interactive Action Buttons */}
                        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                          {isEditingThis ? (
                            <div className="w-full space-y-2 bg-slate-900 p-2.5 rounded-xl border border-slate-700">
                              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                                <span>Ajustar 85 (Últimas Unidades):</span>
                                <input
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={unidades85}
                                  onChange={(e) => setUnidades85(Number(e.target.value))}
                                  className="w-14 bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-center text-white"
                                />
                              </div>
                              <div className="flex justify-end gap-2 pt-1">
                                <button
                                  onClick={() => setEditingProdId(null)}
                                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-400"
                                >
                                  Cancelar
                                </button>
                                <button
                                  onClick={() => handleSetStatus(prod.id, '85_ULTIMAS_UNIDADES', unidades85)}
                                  className="px-2.5 py-1 rounded bg-amber-600 text-white font-bold"
                                >
                                  Fijar 85
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 w-full justify-end">
                              {/* Set Disponible */}
                              {(is86 || is85) && (
                                <button
                                  onClick={() => handleSetStatus(prod.id, 'DISPONIBLE')}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] flex items-center gap-1"
                                  title="Marcar como 100% disponible en carta"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  <span>Disponible</span>
                                </button>
                              )}

                              {/* Set 85 */}
                              {!is85 && (
                                <button
                                  onClick={() => {
                                    setEditingProdId(prod.id);
                                    setUnidades85(4);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-semibold text-[11px] flex items-center gap-1"
                                  title="Marcar como 85 (pocas porciones restantes)"
                                >
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>Marcar 85</span>
                                </button>
                              )}

                              {/* Set 86 */}
                              {!is86 && (
                                <button
                                  onClick={() => handleSetStatus(prod.id, '86_AGOTADO', undefined, 'Agotado en cocina')}
                                  className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-semibold text-[11px] flex items-center gap-1"
                                  title="Marcar como 86 (agotado para el servicio)"
                                >
                                  <Ban className="w-3 h-3" />
                                  <span>Marcar 86</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Solo se muestran los productos activos en Revo (los marcados con 'X' quedan excluidos automáticamente).</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
          >
            Listo / Aplicar al Briefing
          </button>
        </div>
      </div>
    </div>
  );
};
