import React from 'react';
import { X, Calendar, Clock, CheckCircle2, UserCheck, Users, TrendingUp, Printer, FileText } from 'lucide-react';
import { BriefingData } from '../types/briefing';
import { LOCALES_CONFIG } from '../data/mockBriefingData';

export interface HistorialEntry {
  id: string;
  timestamp: string;
  data: BriefingData;
}

interface BriefingHistoryModalProps {
  history: HistorialEntry[];
  onClose: () => void;
  onLoadBriefing: (data: BriefingData) => void;
  onPrintBriefing: (data: BriefingData) => void;
}

export const BriefingHistoryModal: React.FC<BriefingHistoryModalProps> = ({
  history,
  onClose,
  onLoadBriefing,
  onPrintBriefing,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                Historial Guardado
              </span>
              <span className="text-xs text-slate-400 font-medium">Auditoría Operativa BOH</span>
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              Historial de Briefings Pre-Servicio Firmados
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">Aún no hay briefings firmados</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Cuando el equipo complete un servicio y pulse "Firmar y Cerrar Briefing", quedará registrado permanentemente aquí para consulta de gerencia.
              </p>
            </div>
          ) : (
            history.map((entry) => {
              const b = entry.data;
              const localConf = LOCALES_CONFIG[b.localId];
              return (
                <div
                  key={entry.id}
                  className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span 
                        className="text-xs font-black px-2.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: localConf.color }}
                      >
                        {localConf.name}
                      </span>
                      <span className="text-xs font-bold text-slate-200">
                        {b.diaOperativoStr} ({b.turno})
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {b.horarioServicio}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        {b.previsionPax} pax previstos
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        TKP Obj: €{b.ticketMedioObjetivo.toFixed(2)}
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        Firmado: {b.firmaEncargado || `${b.jefeSala} & ${b.jefeCocina}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onPrintBriefing(b);
                        onClose();
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Imprimir copia oficial A4"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Ficha A4</span>
                    </button>

                    <button
                      onClick={() => {
                        onLoadBriefing(b);
                        onClose();
                      }}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Cargar en Editor</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Registros guardados con corte operativo oficial (04:00 AM).</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
