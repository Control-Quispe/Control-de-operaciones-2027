import React from 'react';
import { Printer, ArrowLeft, Trophy, BookOpen, Layers } from 'lucide-react';
import { BriefingData, LocalConfig } from '../types/briefing';

interface BriefingPrintViewProps {
  data: BriefingData;
  config: LocalConfig;
  onBack: () => void;
}

export const BriefingPrintView: React.FC<BriefingPrintViewProps> = ({
  data,
  config,
  onBack,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const allActiveProducts = data.catalogoRevo.flatMap((g) => g.familias.flatMap((f) => f.productos)).filter((p) => p.activo);
  const productos86 = allActiveProducts.filter((p) => p.estadoOperativo === '86_AGOTADO');
  const productos85 = allActiveProducts.filter((p) => p.estadoOperativo === '85_ULTIMAS_UNIDADES');

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6">
      {/* Action buttons (hidden on print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Editor</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Optimizado para A4 (BOH)</span>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Ficha A4 / Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (White A4 style) */}
      <div className="max-w-4xl mx-auto bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200 print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none text-xs">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-start justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              GRUPO QUISPE • CONTROL DE OPERACIONES BOH
            </div>
            <h1 className="text-2xl font-black text-slate-950 mt-1">
              FICHA OFICIAL DE BRIEFING PRE-SERVICIO
            </h1>
            <p className="text-slate-600 font-semibold text-xs mt-0.5">
              Local: <span className="text-slate-950 font-black">{config.name}</span> ({config.tagline})
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-slate-950">
              {data.diaOperativoStr}
            </div>
            <div className="text-[11px] text-slate-600">
              Turno: <strong>{data.turno}</strong> • {data.horarioServicio}
            </div>
            <div className="text-[10px] text-slate-500 mt-1 font-mono">
              Trading Day (Corte 04:00 AM) • Target Coste: {config.foodCostTarget}%
            </div>
          </div>
        </div>

        {/* Section: Operational Pulse / KPIs (NO SALES TOTALS) */}
        <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Previsión Pax</span>
            <span className="text-lg font-black text-slate-950">{data.previsionPax} pax</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Reservas / Mesas</span>
            <span className="text-lg font-black text-slate-950">{data.mesasReservadas} ({data.rotacionesPrevistas}x)</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">TKP Objetivo de Hoy</span>
            <span className="text-lg font-black text-emerald-700">€{data.ticketMedioObjetivo.toFixed(2)}/pax</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Hora Punta Pases</span>
            <span className="text-lg font-black text-slate-950">{data.horaPunta}</span>
          </div>
        </div>

        {/* Section: TKP Leaderboard Showcase */}
        <div className="mb-6 p-3 bg-amber-50/60 rounded-xl border border-amber-200">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase text-amber-900 mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Reconocimiento TKP de la Brigada</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-slate-600 font-bold block">⭐ Mejor TKP de Ayer:</span>
              <span className="font-black text-slate-900">{data.tkpRanking.ayerLider.nombre}</span>
              <span className="text-slate-600 ml-1">({data.tkpRanking.ayerLider.rango}) — </span>
              <strong className="text-amber-800">€{data.tkpRanking.ayerLider.tkp.toFixed(2)}/pax</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-600 font-bold block">👑 Líder TKP del Mes:</span>
              <span className="font-black text-slate-900">{data.tkpRanking.mesLider.nombre}</span>
              <span className="text-slate-600 ml-1">({data.tkpRanking.mesLider.rango}) — </span>
              <strong className="text-purple-800">€{data.tkpRanking.mesLider.tkp.toFixed(2)}/pax</strong>
            </div>
          </div>
        </div>

        {/* Section: Repaso JDF (Mandos Sala y Cocina) */}
        <div className="mb-6 border border-slate-200 rounded-xl p-3.5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded-lg border-l-4 border-slate-900 mb-3">
            1. Temas de Repaso JDF (Liderazgo de Turno: {data.repasoJdf.directorActual})
          </h2>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-black uppercase text-indigo-900 block">Tema Formativo del Día:</span>
              <p className="font-bold text-slate-950 text-xs mt-0.5">{data.repasoJdf.temaDelDia}</p>
              <ul className="list-disc pl-4 text-slate-700 text-[11px] mt-1 space-y-0.5">
                {data.repasoJdf.puntosClave.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-800 block">🍷 Consigna JDF Sala ({data.jefeSala}):</span>
                <p className="text-slate-700 italic text-[11px] mt-0.5">"{data.repasoJdf.mensajeSala}"</p>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-rose-800 block">👨‍🍳 Consigna JDF Cocina ({data.jefeCocina}):</span>
                <p className="text-slate-700 italic text-[11px] mt-0.5">"{data.repasoJdf.mensajeCocina}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Platos Foco para Subir el TKP */}
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded-lg border-l-4 border-slate-900 mb-3">
            2. Platos Foco para Alcanzar el TKP Objetivo
          </h2>
          <table className="w-full text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-50 text-[10px] text-slate-600 border-b border-slate-200">
                <th className="p-2 border-r border-slate-200">Plato / Bebida</th>
                <th className="p-2 border-r border-slate-200">Partida</th>
                <th className="p-2 border-r border-slate-200 text-center">Meta (uds)</th>
                <th className="p-2 border-r border-slate-200 text-right">Impulso TKP</th>
                <th className="p-2">Argumento en Mesa para la Brigada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.platosFoco.map((p) => (
                <tr key={p.id}>
                  <td className="p-2 font-bold text-slate-950 border-r border-slate-200">{p.nombre}</td>
                  <td className="p-2 text-slate-600 border-r border-slate-200">{p.categoria}</td>
                  <td className="p-2 text-center font-black border-r border-slate-200">{p.objetivoVenta} uds</td>
                  <td className="p-2 text-right font-bold text-emerald-700 border-r border-slate-200">+€{p.tkpImpacto.toFixed(2)}</td>
                  <td className="p-2 text-slate-600 italic">"{p.argumentoVenta}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section: Revo 86 y 85 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded-lg border-l-4 border-rose-600 mb-2">
              3. 86 — Agotados en Carta (Revo TPV)
            </h2>
            <div className="border border-slate-200 rounded-lg p-2.5">
              {productos86.length === 0 ? (
                <div className="text-slate-500 italic">Carta 100% disponible.</div>
              ) : (
                <ul className="list-disc pl-4 space-y-1 text-slate-800 font-bold">
                  {productos86.map((prod) => (
                    <li key={prod.id} className="line-through text-slate-500">
                      <span className="text-slate-950">{prod.nombre}</span>
                      {prod.motivo86 && <span className="text-slate-500 font-normal text-[10px] ml-1">({prod.motivo86})</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded-lg border-l-4 border-amber-600 mb-2">
              4. 85 — En Riesgo / Últimas Unidades (Revo TPV)
            </h2>
            <div className="border border-slate-200 rounded-lg p-2.5">
              {productos85.length === 0 ? (
                <div className="text-slate-500 italic">Sin avisos de pocas porciones.</div>
              ) : (
                <ul className="list-disc pl-4 space-y-1 text-slate-800 font-bold">
                  {productos85.map((prod) => (
                    <li key={prod.id}>
                      <span className="text-slate-950">{prod.nombre}</span>
                      <span className="text-amber-700 font-black ml-1">({prod.unidadesRestantes85} uds restantes)</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Section: Mesas Especiales y Alérgenos */}
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded-lg border-l-4 border-cyan-600 mb-2">
            5. VIPs, Celebraciones y Alérgenos Críticos
          </h2>
          <div className="border border-slate-200 rounded-lg divide-y divide-slate-200">
            {data.mesasEspeciales.map((m) => (
              <div key={m.id} className="p-2.5 flex items-start justify-between">
                <div>
                  <div className="font-black text-slate-900">
                    {m.mesa} ({m.pax} pax • {m.hora}) — <span className="uppercase text-slate-700">{m.tipo}</span>
                  </div>
                  <div className="text-slate-600 mt-0.5">{m.detalles}</div>
                </div>
                {m.alérgenos && (
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-black text-[10px]">
                      ALERTA: {m.alérgenos.join(', ').toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section: Rangos y Brigada */}
        <div className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 p-2 rounded-lg border-l-4 border-indigo-600 mb-2">
            6. Distribución de Rangos de Sala & Passe
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {data.rangos.map((r) => (
              <div key={r.id} className="border border-slate-200 p-2 rounded-lg">
                <div className="font-bold text-slate-900">{r.zona}</div>
                <div className="text-slate-700 font-semibold">{r.responsableSala}</div>
                <div className="text-[10px] text-slate-500">{r.mesas}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="border-t-2 border-slate-900 pt-4 mt-8">
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div className="border-t border-slate-400 pt-1 text-center">
              <div className="font-bold text-slate-950">{data.jefeSala}</div>
              <div className="text-[10px] text-slate-500 uppercase">Jefe de Sala / Maitre</div>
            </div>
            <div className="border-t border-slate-400 pt-1 text-center">
              <div className="font-bold text-slate-950">{data.jefeCocina}</div>
              <div className="text-[10px] text-slate-500 uppercase">Jefe de Cocina / Chef Ejecutivo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
