import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  Flame, 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  AlertTriangle, 
  Ban, 
  ShieldAlert, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Calendar 
} from 'lucide-react';
import { BriefingData, LocalConfig } from '../types/briefing';

interface BriefingPresentationModeProps {
  data: BriefingData;
  config: LocalConfig;
  onClose: () => void;
}

export const BriefingPresentationMode: React.FC<BriefingPresentationModeProps> = ({
  data,
  config,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 5-minute Standup Timer (300 seconds)
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const slides = [
    { id: 'pulso', label: '1. Pulso & Ranking TKP' },
    { id: 'jdf', label: '2. Repaso JDF (Mandos)' },
    { id: 'foco', label: '3. Platos Foco TKP' },
    { id: 'carta', label: '4. Carta: 86 & 85 (Revo)' },
    { id: 'seguridad', label: '5. Alérgenos & Rangos' },
  ];

  // Extract active 86 and 85 from Revo catalog
  const allActiveProducts = data.catalogoRevo.flatMap((g) => g.familias.flatMap((f) => f.productos)).filter((p) => p.activo);
  const productos86 = allActiveProducts.filter((p) => p.estadoOperativo === '86_AGOTADO');
  const productos85 = allActiveProducts.filter((p) => p.estadoOperativo === '85_ULTIMAS_UNIDADES');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden">
      {/* Top Standup Bar with Timer */}
      <header className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg"
            style={{ backgroundColor: config.color }}
          >
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight">{config.name}</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                Briefing Pre-Servicio ({data.turno})
              </span>
            </div>
            <p className="text-xs text-slate-400">{data.diaOperativoStr} • Horario: {data.horarioServicio}</p>
          </div>
        </div>

        {/* 5-Min Timer Widget */}
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 shadow-inner">
          <Clock className="w-5 h-5 text-amber-400" />
          <div className="text-2xl font-mono font-black text-amber-300 tracking-wider">
            {formatTimer(secondsLeft)}
          </div>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              title={isTimerRunning ? 'Pausar' : 'Iniciar 5 min'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setSecondsLeft(300);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Exit Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </header>

      {/* Slide Navigation Tabs */}
      <div className="bg-slate-900/50 border-b border-slate-800/80 px-6 py-2 flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                currentSlide === idx
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400 hidden sm:block">
          Diapositiva {currentSlide + 1} de {slides.length}
        </div>
      </div>

      {/* Main Slide Presentation Content */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full flex flex-col justify-center overflow-y-auto">
        {/* SLIDE 0: Pulso & Ranking TKP (NO SALES VALUES) */}
        {currentSlide === 0 && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Previsión & Gamificación
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white">
                Previsión del Turno & Ranking TKP
              </h2>
              <p className="text-slate-400 text-sm">
                Enfoque en excelencia de servicio y ticket promedio por comensal.
              </p>
            </div>

            {/* Volume KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-xl">
                <Users className="w-8 h-8 text-indigo-400 mx-auto" />
                <div className="text-4xl sm:text-5xl font-black text-white">{data.previsionPax}</div>
                <div className="text-sm font-semibold text-slate-300">Comensales Previstos</div>
                <div className="text-xs text-slate-500">{data.mesasReservadas} mesas ({data.rotacionesPrevistas}x rotación)</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2 shadow-xl">
                <Clock className="w-8 h-8 text-purple-400 mx-auto" />
                <div className="text-2xl sm:text-3xl font-black text-white pt-2">{data.horaPunta}</div>
                <div className="text-sm font-semibold text-slate-300">Hora Punta de Pases</div>
                <div className="text-xs text-slate-500">Máxima concentración de servicio</div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 text-center space-y-2 shadow-xl bg-emerald-950/10">
                <TrendingUp className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-4xl sm:text-5xl font-black text-emerald-400">€{data.ticketMedioObjetivo}</div>
                <div className="text-sm font-semibold text-white">TKP Objetivo de Hoy</div>
                <div className="text-xs text-emerald-300">Ticket promedio por comensal</div>
              </div>
            </div>

            {/* TKP Leaderboard Showcase */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <Trophy className="w-5 h-5" />
                <span>Reconocimiento de Ticket Promedio (TKP)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-400 block">⭐ Mejor TKP de Ayer</span>
                    <div className="text-lg font-black text-white">{data.tkpRanking.ayerLider.nombre}</div>
                    <div className="text-xs text-slate-300">{data.tkpRanking.ayerLider.rango}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-amber-300">€{data.tkpRanking.ayerLider.tkp.toFixed(2)}</div>
                    <span className="text-[10px] text-slate-400">/comensal</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-400 block">👑 Líder TKP del Mes</span>
                    <div className="text-lg font-black text-white">{data.tkpRanking.mesLider.nombre}</div>
                    <div className="text-xs text-slate-300">{data.tkpRanking.mesLider.rango}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-purple-300">€{data.tkpRanking.mesLider.tkp.toFixed(2)}</div>
                    <span className="text-[10px] text-slate-400">promedio mes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 1: Repaso JDF (Mandos de Sala y Cocina) */}
        {currentSlide === 1 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Liderazgo de Turno
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Temas de Repaso JDF
              </h2>
              <p className="text-slate-400 text-sm">
                Dirige el briefing: <strong className="text-white">
                  {data.repasoJdf.directorActual === 'SALA' ? '🍷 JDF Sala' : data.repasoJdf.directorActual === 'COCINA' ? '👨‍🍳 JDF Cocina' : '🤝 Conjunto (Sala + Cocina)'}
                </strong>
              </p>
            </div>

            {/* Daily operational focus pill */}
            <div className="p-6 rounded-3xl bg-slate-900 border-2 border-indigo-500/30 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Tema Formativo del Día:</span>
                <span className="text-white text-base font-black">{data.repasoJdf.temaDelDia}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {data.repasoJdf.puntosClave.map((pt, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages Sala & Cocina */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/30 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
                  🍷 Mensaje JDF Sala ({data.jefeSala})
                </span>
                <blockquote className="text-sm font-medium text-slate-100 italic leading-relaxed">
                  "{data.repasoJdf.mensajeSala}"
                </blockquote>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-rose-500/30 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
                  👨‍🍳 Mensaje JDF Cocina ({data.jefeCocina})
                </span>
                <blockquote className="text-sm font-medium text-slate-100 italic leading-relaxed">
                  "{data.repasoJdf.mensajeCocina}"
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: Platos Foco para Subir el TKP */}
        {currentSlide === 2 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                Up-Selling Estratégico
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                ¿Qué cantamos para alcanzar el TKP?
              </h2>
              <p className="text-slate-400 text-sm">
                Platos recomendados y sus argumentos en mesa para toda la brigada.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.platosFoco.map((plato) => (
                <div
                  key={plato.id}
                  className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/30 flex flex-col justify-between shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Meta: {plato.objetivoVenta} uds
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {plato.categoria}
                    </span>
                    <h3 className="text-xl font-black text-white leading-snug">{plato.nombre}</h3>
                    <div className="text-lg font-bold text-emerald-400">
                      Impulso TKP: +€{plato.tkpImpacto.toFixed(2)}/pax
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-950/60 -mx-6 -mb-6 p-5 rounded-b-3xl">
                    <div className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Argumento en Mesa:
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium italic">
                      "{plato.argumentoVenta}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 3: Carta: 86 & 85 desde Revo */}
        {currentSlide === 3 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                Sincronización Cocina ➔ Sala
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Carta Activa de {config.name}: 86 y 85
              </h2>
              <p className="text-slate-400 text-sm">
                Basado en fichas técnicas de Yurest y Revo TPV. Solo productos activos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 86 List (Agotados) */}
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-rose-500/30 space-y-4">
                <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                  <Ban className="w-5 h-5 text-rose-500" />
                  <span>86 — Agotados (NO cantar bajo ningún concepto)</span>
                </h3>

                <div className="space-y-3">
                  {productos86.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">Carta 100% disponible. Sin productos en 86.</p>
                  ) : (
                    productos86.map((prod) => (
                      <div key={prod.id} className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-base line-through text-slate-400">{prod.nombre}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded bg-rose-500/30 text-rose-200 font-black">
                            86
                          </span>
                        </div>
                        <p className="text-xs text-rose-300 italic">{prod.motivo86 || 'Agotado en cocina'}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 85 List (Últimas Unidades) */}
              <div className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-500/30 space-y-4">
                <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>85 — En Riesgo (Últimas Unidades Restantes)</span>
                </h3>

                <div className="space-y-3">
                  {productos85.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">Sin avisos de pocas porciones para hoy.</p>
                  ) : (
                    productos85.map((prod) => (
                      <div key={prod.id} className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-base">{prod.nombre}</span>
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/30 text-amber-200 font-black">
                            Quedan {prod.unidadesRestantes85} uds
                          </span>
                        </div>
                        <p className="text-xs text-amber-300">Avisar a cocina antes de comandar en sala.</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: Alérgenos & Rangos */}
        {currentSlide === 4 && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                Hospitalidad & Seguridad
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Mesas VIP, Alérgenos y Asignación de Rangos
              </h2>
            </div>

            {/* Mesas especiales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.mesasEspeciales.map((m) => (
                <div
                  key={m.id}
                  className={`p-5 rounded-3xl border-2 flex flex-col justify-between ${
                    m.tipo === 'Alérgeno Crítico'
                      ? 'bg-rose-950/20 border-rose-500/60'
                      : m.tipo === 'VIP'
                      ? 'bg-amber-950/20 border-amber-500/60'
                      : 'bg-cyan-950/20 border-cyan-500/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-white">{m.mesa}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-slate-900 border border-slate-700">
                        {m.hora} • {m.pax} pax
                      </span>
                    </div>
                    <div className="text-xs font-bold text-amber-300">{m.tipo}</div>
                    <p className="text-xs text-slate-200">{m.detalles}</p>
                  </div>

                  {m.alérgenos && (
                    <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap gap-1">
                      {m.alérgenos.map((al, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/40 text-rose-200 font-black text-[10px]">
                          🚨 {al.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Rangos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {data.rangos.map((rango) => (
                <div key={rango.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{rango.zona}</div>
                  <div className="text-sm font-bold text-white">{rango.responsableSala}</div>
                  <div className="text-xs text-slate-400">{rango.mesas}</div>
                  <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{rango.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Presentation Footer Controls */}
      <footer className="border-t border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {currentSlide < slides.length - 1 ? (
          <button
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-colors cursor-pointer"
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finalizar Briefing</span>
          </button>
        )}
      </footer>
    </div>
  );
};
