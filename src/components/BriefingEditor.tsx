import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Flame, 
  AlertTriangle, 
  Ban, 
  Award, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  FileCheck, 
  Calendar, 
  UserCheck, 
  ShieldAlert, 
  Trophy, 
  BookOpen, 
  UtensilsCrossed, 
  Coffee, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { 
  BriefingData, 
  LocalConfig, 
  PlatoFoco, 
  InsumoRotacion, 
  MesaEspecial, 
  RevoGrupo, 
  RolDirectorBriefing 
} from '../types/briefing';
import { RevoCatalog8685Modal } from './RevoCatalog8685Modal';

interface BriefingEditorProps {
  data: BriefingData;
  config: LocalConfig;
  onUpdate: (updatedData: BriefingData) => void;
  onLaunchPresentation: () => void;
  onLaunchPrint: () => void;
}

export const BriefingEditor: React.FC<BriefingEditorProps> = ({
  data,
  config,
  onUpdate,
  onLaunchPresentation,
  onLaunchPrint,
}) => {
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showAddMesaModal, setShowAddMesaModal] = useState(false);
  const [showAddInsumoModal, setShowAddInsumoModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Helper to extract active 86 and 85 items from Revo catalog
  const allProducts = data.catalogoRevo.flatMap((g) => g.familias.flatMap((f) => f.productos)).filter((p) => p.activo);
  const productos86 = allProducts.filter((p) => p.estadoOperativo === '86_AGOTADO');
  const productos85 = allProducts.filter((p) => p.estadoOperativo === '85_ULTIMAS_UNIDADES');

  // Change handlers (NO SALES VALUES)
  const handlePaxChange = (val: number) => {
    onUpdate({
      ...data,
      previsionPax: Math.max(0, val),
    });
  };

  const handleTicketChange = (val: number) => {
    onUpdate({
      ...data,
      ticketMedioObjetivo: Math.max(0, val),
    });
  };

  // JDF change handler
  const handleDirectorChange = (rol: RolDirectorBriefing) => {
    onUpdate({
      ...data,
      repasoJdf: {
        ...data.repasoJdf,
        directorActual: rol,
      },
    });
  };

  // Attendance toggle
  const handleToggleAsistencia = (id: string) => {
    const updated = data.rangos.map((rg) => 
      rg.id === id ? { ...rg, estado: rg.estado === 'Presente' ? 'Pendiente' : 'Presente' as const } : rg
    );
    onUpdate({ ...data, rangos: updated });
  };

  // Incidencia toggle
  const handleToggleIncidencia = (id: string) => {
    const updated = data.incidenciasPrevias.map((inc) => 
      inc.id === id ? { ...inc, resuelta: !inc.resuelta } : inc
    );
    onUpdate({ ...data, incidenciasPrevias: updated });
  };

  // Final Sign-off
  const handleCompleteBriefing = () => {
    onUpdate({
      ...data,
      completado: true,
      firmaEncargado: `${data.jefeSala} & ${data.jefeCocina} [${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}]`,
    });
    showToast('¡Briefing validado y firmado para el servicio!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-300 animate-in fade-in slide-in-from-bottom-4">
          <FileCheck className="w-5 h-5" />
          <span>{notification}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                {data.turno} • {data.diaOperativoStr}
              </span>
              <span className="text-xs text-slate-400">
                {data.horarioServicio}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{config.name}</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Briefing Diario BOH / FOH
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">{config.concept}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onLaunchPresentation}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Modo Standup (5 min)</span>
            </button>

            <button
              onClick={onLaunchPrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Ficha Oficial A4</span>
            </button>
          </div>
        </div>

        {/* Operational Pulse (STRICTLY NO SALES TOTALS — ONLY VOLUME & TKP) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {/* Pax Previsión */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              Previsión Pax
            </span>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={data.previsionPax}
                onChange={(e) => handlePaxChange(Number(e.target.value))}
                className="w-20 text-2xl font-black text-white bg-transparent border-b border-indigo-500/50 focus:border-indigo-400 focus:outline-none"
              />
              <span className="text-xs text-slate-400">pax</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Capacidad estimada del turno</p>
          </div>

          {/* Mesas y Rotaciones */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Mesas / Reservas
            </span>
            <div className="flex items-baseline gap-1">
              <input
                type="number"
                value={data.mesasReservadas}
                onChange={(e) => onUpdate({ ...data, mesasReservadas: Number(e.target.value) })}
                className="w-16 text-2xl font-black text-white bg-transparent border-b border-cyan-500/50 focus:border-cyan-400 focus:outline-none"
              />
              <span className="text-xs text-slate-400">mesas</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Rotación prev.: ~{data.rotacionesPrevistas}x</p>
          </div>

          {/* TKP Objetivo (Ticket Promedio por comensal) */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              TKP Objetivo
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-emerald-400">€</span>
              <input
                type="number"
                step="0.5"
                value={data.ticketMedioObjetivo}
                onChange={(e) => handleTicketChange(Number(e.target.value))}
                className="w-20 text-2xl font-black text-white bg-transparent border-b border-emerald-500/50 focus:border-emerald-400 focus:outline-none"
              />
              <span className="text-xs text-slate-400">/pax</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Ticket medio por persona</p>
          </div>

          {/* Horario Punta */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              Hora Punta
            </span>
            <input
              type="text"
              value={data.horaPunta}
              onChange={(e) => onUpdate({ ...data, horaPunta: e.target.value })}
              className="w-full text-sm font-bold text-white bg-transparent border-b border-purple-500/50 focus:border-purple-400 focus:outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">Concentración de pases</p>
          </div>

          {/* Responsables de Servicio */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5 mb-1">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              Responsables JDF
            </span>
            <div className="text-xs font-semibold text-white truncate">
              Sala: {data.jefeSala}
            </div>
            <div className="text-xs text-slate-300 truncate mt-0.5">
              Cocina: {data.jefeCocina}
            </div>
          </div>
        </div>

        {/* RANKING TKP (Gamificación Positiva sin cifras de venta global) */}
        <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Reconocimiento TKP (Ticket Promedio de la Brigada)
            </h3>
            <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">
              Motivación de Up-selling individual sin revelar facturación total
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mejor TKP de Ayer */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  ⭐ Mejor TKP de Ayer ({data.tkpRanking.ayerLider.servicio})
                </span>
                <div className="text-sm font-black text-white">
                  {data.tkpRanking.ayerLider.nombre}
                </div>
                <div className="text-xs text-slate-400">{data.tkpRanking.ayerLider.rango}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-amber-300">
                  €{data.tkpRanking.ayerLider.tkp.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">por comensal</span>
              </div>
            </div>

            {/* Mejor TKP del Mes en Curso */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-500/10 via-slate-900 to-slate-900 border border-purple-500/20 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1">
                  👑 Líder TKP Acumulado del Mes
                </span>
                <div className="text-sm font-black text-white">
                  {data.tkpRanking.mesLider.nombre}
                </div>
                <div className="text-xs text-slate-400">{data.tkpRanking.mesLider.rango} • Posición #{data.tkpRanking.mesLider.posicion}</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-purple-300">
                  €{data.tkpRanking.mesLider.tkp.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-400 font-medium">promedio mensual</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN NUEVA: TEMAS DE REPASO JDF (MANDOS DE SALA Y COCINA) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Temas de Repaso JDF (Jefaturas BOH & FOH)</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Consignas operativas diarias comunicadas por los mandos de Sala y Cocina según quién lidera el briefing.
            </p>
          </div>

          {/* Selector de Quién Dirige el Briefing */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold px-2">Dirige hoy:</span>
            <button
              onClick={() => handleDirectorChange('SALA')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                data.repasoJdf.directorActual === 'SALA'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🍷 JDF Sala
            </button>
            <button
              onClick={() => handleDirectorChange('COCINA')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                data.repasoJdf.directorActual === 'COCINA'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              👨‍🍳 JDF Cocina
            </button>
            <button
              onClick={() => handleDirectorChange('CONJUNTO')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                data.repasoJdf.directorActual === 'CONJUNTO'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🤝 Conjunto (Ambos)
            </button>
          </div>
        </div>

        {/* Mensajes Específicos por JDF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mensaje JDF Sala */}
          <div className={`p-5 rounded-2xl border transition-all ${
            data.repasoJdf.directorActual === 'SALA' || data.repasoJdf.directorActual === 'CONJUNTO'
              ? 'bg-slate-950/80 border-indigo-500/40'
              : 'bg-slate-950/40 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                🍷 Mensaje Diario — JDF Sala ({data.jefeSala})
              </span>
              {data.repasoJdf.directorActual === 'SALA' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  Enfoque Principal
                </span>
              )}
            </div>
            <textarea
              value={data.repasoJdf.mensajeSala}
              onChange={(e) => onUpdate({
                ...data,
                repasoJdf: { ...data.repasoJdf, mensajeSala: e.target.value },
              })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none h-24"
              placeholder="Instrucciones de sala: bienvenida, tempos de servicio, up-selling de cóctel/vino..."
            />
          </div>

          {/* Mensaje JDF Cocina */}
          <div className={`p-5 rounded-2xl border transition-all ${
            data.repasoJdf.directorActual === 'COCINA' || data.repasoJdf.directorActual === 'CONJUNTO'
              ? 'bg-slate-950/80 border-rose-500/40'
              : 'bg-slate-950/40 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                👨‍🍳 Mensaje Diario — JDF Cocina ({data.jefeCocina})
              </span>
              {data.repasoJdf.directorActual === 'COCINA' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  Enfoque Principal
                </span>
              )}
            </div>
            <textarea
              value={data.repasoJdf.mensajeCocina}
              onChange={(e) => onUpdate({
                ...data,
                repasoJdf: { ...data.repasoJdf, mensajeCocina: e.target.value },
              })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 resize-none h-24"
              placeholder="Instrucciones de cocina: puntos de cocción, emplatado, ritmo de salida en el pase..."
            />
          </div>
        </div>

        {/* Píldora de Repaso Operativo del Día */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-950 to-slate-950 border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Tema de Formación / Repaso del Día: <span className="text-amber-300 font-black">{data.repasoJdf.temaDelDia}</span>
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {data.repasoJdf.puntosClave.map((pt, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Platos Foco & Estado de Carta 86/85 desde Revo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Foco Comercial (Platos de Up-selling) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <span>Platos Foco para Subir el TKP</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Platos y bebidas que la sala debe cantar para alcanzar el objetivo de €{data.ticketMedioObjetivo}/pax.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {data.platosFoco.map((plato) => (
                <div
                  key={plato.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <h4 className="font-bold text-white text-sm">{plato.nombre}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {plato.categoria}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-400">
                        Aporte TKP: <strong className="text-emerald-400">+€{plato.tkpImpacto.toFixed(2)}</strong>
                      </span>
                      <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg text-amber-300 font-semibold">
                        <span>Meta: {plato.objetivoVenta} uds</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-medium">Argumento en Mesa: </span>
                      <span>"{plato.argumentoVenta}"</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distribución de Rangos */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <span>Distribución de Rangos & Asistencia</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Posiciones de sala confirmadas para el servicio.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.rangos.map((rango) => (
                <div
                  key={rango.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-white">{rango.zona}</h5>
                    <p className="text-[11px] text-slate-400">{rango.mesas}</p>
                    <p className="text-xs font-medium text-indigo-300 mt-1">{rango.responsableSala}</p>
                  </div>
                  <button
                    onClick={() => handleToggleAsistencia(rango.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      rango.estado === 'Presente'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {rango.estado}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): REVO 86 / 85 LIST + ALÉRGENOS */}
        <div className="lg:col-span-5 space-y-6">
          {/* CARTA DE REVO: LISTA DE 86 (AGOTADOS) Y 85 (ÚLTIMAS UNIDADES) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-rose-500" />
                  <span>Control de Carta: 86 & 85 (Revo TPV)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Extraído de las fichas de {config.name}. Solo productos activos.
                </p>
              </div>
              <button
                onClick={() => setShowCatalogModal(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Gestionar Carta</span>
              </button>
            </div>

            {/* 86 List (Agotados) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5" />
                86 — Platos Agotados (NO Cantar en Sala)
              </span>
              {productos86.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-500 italic">
                  Carta 100% disponible. Sin productos en 86.
                </div>
              ) : (
                productos86.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs line-through text-slate-400">
                        {prod.nombre}
                      </span>
                      <p className="text-[10px] text-slate-500">{prod.grupo} • {prod.familia}</p>
                      {prod.motivo86 && (
                        <p className="text-[10px] text-rose-300 italic">{prod.motivo86}</p>
                      )}
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-500/30 text-rose-200 border border-rose-400/40">
                      86
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* 85 List (Últimas Unidades) */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                85 — En Riesgo / Últimas Unidades
              </span>
              {productos85.length === 0 ? (
                <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-500 italic">
                  Sin avisos de pocas porciones para hoy.
                </div>
              ) : (
                productos85.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="font-bold text-xs text-amber-200">
                        {prod.nombre}
                      </span>
                      <p className="text-[10px] text-slate-400">{prod.grupo} • {prod.familia}</p>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-amber-500/30 text-amber-200 border border-amber-400/40">
                      Quedan {prod.unidadesRestantes85} uds
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Insumos Críticos de Cocina */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Rotación Crítica de Cocina</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Insumos frescos que deben darse salida prioritaria hoy para evitar merma.
                </p>
              </div>
              <button
                onClick={() => setShowAddInsumoModal(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Insumo</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.insumosCriticos.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">Sin insumos en riesgo crítico hoy.</p>
              ) : (
                data.insumosCriticos.map((ins) => (
                  <div
                    key={ins.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-rose-950/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        {ins.producto}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                        {ins.cantidadRestante}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 italic pl-3.5 border-l border-rose-500/30">
                      Chef: "{ins.notaChef}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mesas Especiales & Alérgenos Críticos */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  <span>VIPs & Alérgenos Críticos</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Mesas que requieren atención especial de sala y cocina.
                </p>
              </div>
              <button
                onClick={() => setShowAddMesaModal(true)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Mesa</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.mesasEspeciales.map((m) => (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl border ${
                    m.tipo === 'Alérgeno Crítico'
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : m.tipo === 'VIP'
                      ? 'bg-amber-950/20 border-amber-500/30'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-white flex items-center gap-2">
                      <span>{m.mesa}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({m.pax} pax • {m.hora})</span>
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                      m.tipo === 'Alérgeno Crítico'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : m.tipo === 'VIP'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    }`}>
                      {m.tipo}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{m.detalles}</p>
                  {m.alérgenos && m.alérgenos.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {m.alérgenos.map((al, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 font-semibold border border-rose-400/30">
                          ⚠️ {al}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Signature & Closing Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-sm font-bold text-white">Validación del Briefing de Turno</h4>
          <p className="text-xs text-slate-400">
            Firma conjunta entre {data.jefeSala} (Sala) y {data.jefeCocina} (Cocina).
          </p>
          {data.firmaEncargado && (
            <div className="text-xs text-emerald-400 font-mono font-medium pt-1">
              ✓ Firmado digitalmente: {data.firmaEncargado}
            </div>
          )}
        </div>

        <button
          onClick={handleCompleteBriefing}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Firmar y Cerrar Briefing</span>
        </button>
      </div>

      {/* MODAL REVO CATALOG 86/85 */}
      {showCatalogModal && (
        <RevoCatalog8685Modal
          catalogoRevo={data.catalogoRevo}
          localName={config.name}
          onClose={() => setShowCatalogModal(false)}
          onUpdateCatalogo={(nuevoCatalogo) => {
            onUpdate({
              ...data,
              catalogoRevo: nuevoCatalogo,
            });
            showToast('Carta actualizada con Revo TPV');
          }}
        />
      )}

      {/* MODAL AÑADIR MESA */}
      {showAddMesaModal && (
        <AddMesaModal
          onClose={() => setShowAddMesaModal(false)}
          onAdd={(nuevaMesa) => {
            onUpdate({
              ...data,
              mesasEspeciales: [...data.mesasEspeciales, nuevaMesa],
            });
            setShowAddMesaModal(false);
            showToast('Mesa especial registrada');
          }}
        />
      )}

      {/* MODAL AÑADIR INSUMO */}
      {showAddInsumoModal && (
        <AddInsumoModal
          onClose={() => setShowAddInsumoModal(false)}
          onAdd={(nuevoInsumo) => {
            onUpdate({
              ...data,
              insumosCriticos: [...data.insumosCriticos, nuevoInsumo],
            });
            setShowAddInsumoModal(false);
            showToast('Insumo crítico añadido');
          }}
        />
      )}
    </div>
  );
};

// Modal helpers
function AddMesaModal({ onClose, onAdd }: { onClose: () => void; onAdd: (mesa: MesaEspecial) => void }) {
  const [mesa, setMesa] = useState('Mesa ');
  const [pax, setPax] = useState(2);
  const [hora, setHora] = useState('21:30');
  const [tipo, setTipo] = useState<'VIP' | 'Alérgeno Crítico' | 'Celebración' | 'Guía Gastronómica'>('Alérgeno Crítico');
  const [detalles, setDetalles] = useState('');
  const [alérgenos, setAlérgenos] = useState('Gluten');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `me-${Date.now()}`,
      mesa,
      pax,
      hora,
      tipo,
      detalles: detalles || `${tipo} registrado por el maitre.`,
      alérgenos: tipo === 'Alérgeno Crítico' ? alérgenos.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          Registrar Mesa Especial / Alérgeno
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Mesa</label>
              <input
                type="text"
                required
                value={mesa}
                onChange={(e) => setMesa(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Pax</label>
              <input
                type="number"
                min="1"
                value={pax}
                onChange={(e) => setPax(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Hora</label>
              <input
                type="text"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Tipo de Alerta</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Alérgeno Crítico">Alérgeno Crítico (Celíaco, Frutos secos, etc.)</option>
              <option value="VIP">VIP / Dirección / Invitado Especial</option>
              <option value="Celebración">Celebración / Aniversario / Cumpleaños</option>
              <option value="Guía Gastronómica">Guía Gastronómica / Prensa</option>
            </select>
          </div>

          {tipo === 'Alérgeno Crítico' && (
            <div>
              <label className="text-slate-300 font-medium block mb-1">Alérgenos (separados por coma)</label>
              <input
                type="text"
                placeholder="Gluten, Crustáceos, Cacahuetes"
                value={alérgenos}
                onChange={(e) => setAlérgenos(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="text-slate-300 font-medium block mb-1">Instrucciones para Sala y Cocina</label>
            <textarea
              required
              placeholder="Instrucciones específicas de servicio..."
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 h-16 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-500 shadow-md shadow-rose-600/30"
            >
              Registrar Mesa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddInsumoModal({ onClose, onAdd }: { onClose: () => void; onAdd: (insumo: InsumoRotacion) => void }) {
  const [producto, setProducto] = useState('');
  const [partida, setPartida] = useState<'Sushi / Fríos' | 'Cocina Caliente' | 'Barra' | 'Pescadería'>('Pescadería');
  const [cantidadRestante, setCantidadRestante] = useState('3 kg');
  const [prioridad, setPrioridad] = useState<'Crítica' | 'Media' | 'Baja'>('Crítica');
  const [notaChef, setNotaChef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!producto.trim()) return;
    onAdd({
      id: `ic-${Date.now()}`,
      producto,
      partida,
      cantidadRestante,
      prioridad,
      notaChef: notaChef || 'Rotar con prioridad en este turno.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
          Añadir Insumo para Rotación Inmediata
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 font-medium block mb-1">Producto / Insumo</label>
            <input
              type="text"
              required
              placeholder="Ej: Pulpo Cocido / Corvina Fresca"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-medium block mb-1">Partida</label>
              <select
                value={partida}
                onChange={(e) => setPartida(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Pescadería">Pescadería</option>
                <option value="Sushi / Fríos">Sushi / Fríos</option>
                <option value="Cocina Caliente">Cocina Caliente</option>
                <option value="Barra">Barra</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 font-medium block mb-1">Cantidad Restante</label>
              <input
                type="text"
                placeholder="Ej: 4 raciones / 2.5 kg"
                value={cantidadRestante}
                onChange={(e) => setCantidadRestante(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-medium block mb-1">Nota o Recomendación del Chef</label>
            <textarea
              required
              placeholder="Instrucción de venta para sala..."
              value={notaChef}
              onChange={(e) => setNotaChef(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 h-16 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-500 shadow-md shadow-rose-600/30"
            >
              Guardar Insumo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
