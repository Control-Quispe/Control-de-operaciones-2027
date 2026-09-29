/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BriefingEditor } from './components/BriefingEditor';
import { BriefingPresentationMode } from './components/BriefingPresentationMode';
import { BriefingPrintView } from './components/BriefingPrintView';
import { BriefingHistoryModal, HistorialEntry } from './components/BriefingHistoryModal';
import { INITIAL_BRIEFINGS, LOCALES_CONFIG } from './data/mockBriefingData';
import { BriefingData, LocalId, Turno } from './types/briefing';

const STORAGE_KEY_BRIEFINGS = 'grupo_quispe_briefings_v2';
const STORAGE_KEY_HISTORY = 'grupo_quispe_briefings_history_v2';

export default function App() {
  const [currentLocalId, setCurrentLocalId] = useState<LocalId>('CHALACO');
  const [isMasterProfile, setIsMasterProfile] = useState<boolean>(true); // master toggle for previewing any restaurant
  const [turno, setTurno] = useState<Turno>('CENA');
  const [activeView, setActiveView] = useState<'editor' | 'presentation' | 'print'>('editor');
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [printTargetData, setPrintTargetData] = useState<BriefingData | null>(null);

  // Load from localStorage or use initial seed
  const [briefings, setBriefings] = useState<Record<LocalId, BriefingData>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BRIEFINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading briefings from localStorage:', e);
    }
    return INITIAL_BRIEFINGS;
  });

  // Load history from localStorage
  const [history, setHistory] = useState<HistorialEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading history from localStorage:', e);
    }
    return [];
  });

  // Auto-save briefings on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BRIEFINGS, JSON.stringify(briefings));
    } catch (e) {
      console.error('Error saving briefings to localStorage:', e);
    }
  }, [briefings]);

  // Auto-save history on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error('Error saving history to localStorage:', e);
    }
  }, [history]);

  const currentBriefing = briefings[currentLocalId];
  const currentConfig = LOCALES_CONFIG[currentLocalId];

  const handleUpdateBriefing = (updatedData: BriefingData) => {
    // If it was just signed/completed, record an entry in history
    if (updatedData.completado && !currentBriefing.completado) {
      const newEntry: HistorialEntry = {
        id: `hist-${Date.now()}`,
        timestamp: new Date().toISOString(),
        data: updatedData,
      };
      setHistory((prev) => [newEntry, ...prev]);
    }

    setBriefings((prev) => ({
      ...prev,
      [currentLocalId]: updatedData,
    }));
  };

  const handleToggleTurno = (newTurno: Turno) => {
    setTurno(newTurno);
    handleUpdateBriefing({
      ...currentBriefing,
      turno: newTurno,
      horarioServicio: newTurno === 'COMIDA' ? '13:30 — 16:30 (Corte 04:00 AM)' : '20:30 — 00:30 (Corte 04:00 AM)',
      horaPunta: newTurno === 'COMIDA' ? '14:30 — 15:45' : '21:45 — 23:15',
    });
  };

  const handlePrintSpecificBriefing = (briefingToPrint: BriefingData) => {
    setPrintTargetData(briefingToPrint);
    setActiveView('print');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header: Pure Briefing Pre-Servicio */}
      <Header
        currentLocalId={currentLocalId}
        onSelectLocal={(id) => {
          setCurrentLocalId(id);
          setPrintTargetData(null);
        }}
        isMasterProfile={isMasterProfile}
        onToggleMasterProfile={() => setIsMasterProfile(!isMasterProfile)}
        turno={turno}
        onToggleTurno={handleToggleTurno}
        activeView={activeView}
        onChangeView={(view) => {
          setActiveView(view);
          if (view !== 'print') setPrintTargetData(null);
        }}
        isCompleted={currentBriefing?.completado ?? false}
        onOpenHistory={() => setShowHistoryModal(true)}
        historyCount={history.length}
      />

      {/* Main Content: Pure Briefing Module */}
      <main className="flex-1">
        {activeView === 'editor' && (
          <BriefingEditor
            data={currentBriefing}
            config={currentConfig}
            onUpdate={handleUpdateBriefing}
            onLaunchPresentation={() => setActiveView('presentation')}
            onLaunchPrint={() => {
              setPrintTargetData(currentBriefing);
              setActiveView('print');
            }}
          />
        )}

        {activeView === 'presentation' && (
          <BriefingPresentationMode
            data={currentBriefing}
            config={currentConfig}
            onClose={() => setActiveView('editor')}
          />
        )}

        {activeView === 'print' && (
          <BriefingPrintView
            data={printTargetData || currentBriefing}
            config={LOCALES_CONFIG[(printTargetData || currentBriefing).localId]}
            onBack={() => {
              setActiveView('editor');
              setPrintTargetData(null);
            }}
          />
        )}
      </main>

      {/* Historial Modal */}
      {showHistoryModal && (
        <BriefingHistoryModal
          history={history}
          onClose={() => setShowHistoryModal(false)}
          onLoadBriefing={(loadedData) => {
            setCurrentLocalId(loadedData.localId);
            setBriefings((prev) => ({
              ...prev,
              [loadedData.localId]: loadedData,
            }));
            setActiveView('editor');
          }}
          onPrintBriefing={handlePrintSpecificBriefing}
        />
      )}
    </div>
  );
}
