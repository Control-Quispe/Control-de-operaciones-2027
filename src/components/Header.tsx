import React from 'react';
import { 
  Building2, 
  Clock, 
  Sun, 
  Moon, 
  Lock, 
  Unlock, 
  Printer, 
  Tablet, 
  Edit3,
  Flame,
  History
} from 'lucide-react';
import { LocalId, Turno } from '../types/briefing';
import { LOCALES_CONFIG } from '../data/mockBriefingData';

interface HeaderProps {
  currentLocalId: LocalId;
  onSelectLocal: (id: LocalId) => void;
  isMasterProfile: boolean;
  onToggleMasterProfile: () => void;
  turno: Turno;
  onToggleTurno: (turno: Turno) => void;
  activeView: 'editor' | 'presentation' | 'print';
  onChangeView: (view: 'editor' | 'presentation' | 'print') => void;
  isCompleted: boolean;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocalId,
  onSelectLocal,
  isMasterProfile,
  onToggleMasterProfile,
  turno,
  onToggleTurno,
  activeView,
  onChangeView,
  isCompleted,
  onOpenHistory,
  historyCount,
}) => {
  const currentConfig = LOCALES_CONFIG[currentLocalId];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-2xl">
      {/* Top operational alert bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border-b border-slate-800/60 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">Trading Day Activo:</span>
          <span className="text-slate-300">29 Sep 2026</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 flex items-center gap-1 font-mono font-medium">
            <Clock className="w-3.5 h-3.5" />
            Corte Operativo: 04:00 AM
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Historial Button */}
          <button
            onClick={onOpenHistory}
            className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>Historial ({historyCount})</span>
          </button>

          {/* Master Profile Toggle */}
          <button
            onClick={onToggleMasterProfile}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1.5 transition-colors border cursor-pointer ${
              isMasterProfile 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
            }`}
            title={isMasterProfile ? 'Perfil Zapata (Master): Acceso a selección de local' : 'Perfil Local: Selector bloqueado según normas de seguridad'}
          >
            {isMasterProfile ? (
              <>
                <Unlock className="w-3 h-3 text-purple-400" />
                <span>Perfil Master (Zapata)</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Perfil Local: {currentConfig.name}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main navigation header (EXCLUSIVO BRIEFING PRE-SERVICIO) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Local Identity */}
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: currentConfig.color }}
          >
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
                Grupo Quispe
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-semibold border border-indigo-500/20">
                  Briefing Operativo
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="font-medium text-slate-200">{currentConfig.name}</span>
              <span>•</span>
              <span className="text-slate-400">{currentConfig.tagline}</span>
            </p>
          </div>
        </div>

        {/* Central Controls: Local Selector & Shift Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Restaurant Selector */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 px-2 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              Local:
            </span>
            <div className="flex items-center gap-1">
              {(Object.keys(LOCALES_CONFIG) as LocalId[]).map((id) => {
                const isSelected = currentLocalId === id;
                const isBlocked = !isMasterProfile && !isSelected;
                return (
                  <button
                    key={id}
                    disabled={isBlocked}
                    onClick={() => onSelectLocal(id)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700 font-semibold'
                        : isBlocked
                        ? 'opacity-30 cursor-not-allowed text-slate-500'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850 cursor-pointer'
                    }`}
                  >
                    {LOCALES_CONFIG[id].name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Turno Selector */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onToggleTurno('COMIDA')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                turno === 'COMIDA'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              Comida
            </button>
            <button
              onClick={() => onToggleTurno('CENA')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                turno === 'CENA'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              Cena
            </button>
          </div>
        </div>

        {/* View Switchers: Editor | Standup (5 min) | Ficha A4 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeView('editor')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              activeView === 'editor'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>

          <button
            onClick={() => onChangeView('presentation')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              activeView === 'presentation'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/25'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
            }`}
            title="Modo pantalla completa de 5 minutos para el pase con la brigada"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Standup (5 min)</span>
          </button>

          <button
            onClick={() => onChangeView('print')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              activeView === 'print'
                ? 'bg-slate-700 text-white border-slate-600'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
            }`}
            title="Ficha A4 imprimible para tablón de BOH"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ficha A4</span>
          </button>
        </div>
      </div>
    </header>
  );
};
