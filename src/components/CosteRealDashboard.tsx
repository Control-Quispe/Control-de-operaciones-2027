import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Euro, 
  Users, 
  ShoppingBag, 
  Search, 
  ArrowLeft, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Building2, 
  FileSpreadsheet, 
  Clock, 
  Sparkles, 
  ChevronRight,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';
import { LocalId } from '../types/briefing';
import { LOCALES_CONFIG } from '../data/mockBriefingData';
import { 
  SCORECARD_LOCALES, 
  EVOLUCION_COMPRAS_2026, 
  FAMILIAS_SEED, 
  PROVEEDORES_SEED, 
  PRODUCTOS_COMPRAS_SEED, 
  FLUJO_COSTE_REAL_CHALACO 
} from '../data/mockCosteRealData';

interface CosteRealDashboardProps {
  currentLocalId: LocalId;
  isMasterProfile: boolean;
}

export const CosteRealDashboard: React.FC<CosteRealDashboardProps> = ({
  currentLocalId,
  isMasterProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'datos' | 'compras' | 'analisis'>('datos');

  // Compras Tab interactive state
  const [selectedMesIdx, setSelectedMesIdx] = useState<number | null>(8); // Sep 2026 default
  const [viewWeekly, setViewWeekly] = useState<boolean>(false);
  const [selectedFamilia, setSelectedFamilia] = useState<string | null>(null);
  const [selectedProveedor, setSelectedProveedor] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState<string>('');

  const currentLocalConfig = LOCALES_CONFIG[currentLocalId];

  // Totals for Datos Generales
  const totalVentaNeta = SCORECARD_LOCALES.reduce((acc, l) => acc + l.ventaNeta, 0);
  const totalVentaIva = SCORECARD_LOCALES.reduce((acc, l) => acc + l.ventaIva, 0);
  const totalPax = SCORECARD_LOCALES.reduce((acc, l) => acc + l.pax, 0);
  const totalComprasFb = SCORECARD_LOCALES.reduce((acc, l) => acc + l.comprasFb, 0);
  const avgCosteReal = Number((totalComprasFb / totalVentaNeta * 100).toFixed(1));

  // Current selected month data for purchases chart
  const currentMonthData = selectedMesIdx !== null ? EVOLUCION_COMPRAS_2026[selectedMesIdx] : EVOLUCION_COMPRAS_2026[8];

  // Cross-filtered products
  const filteredProducts = PRODUCTOS_COMPRAS_SEED.filter((prod) => {
    const matchFam = !selectedFamilia || prod.familia === selectedFamilia;
    const matchProv = !selectedProveedor || prod.proveedor === selectedProveedor;
    const matchSearch = !searchProduct || prod.nombre.toLowerCase().includes(searchProduct.toLowerCase()) || prod.proveedor.toLowerCase().includes(searchProduct.toLowerCase());
    return matchFam && matchProv && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-in fade-in">
      {/* Top Navigation Tabs (Estilo Apple minimalista) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
              Yurest Sync • Mercamadrid • Revo TPV
            </span>
            <span className="text-xs text-slate-400 font-mono">Corte Operativo 04:00 AM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Dashboard de Coste Real & Compras F&B
          </h2>
          <p className="text-xs text-slate-400">
            Control de márgenes, auditoría de precios de compra y flujo financiero de materias primas.
          </p>
        </div>

        {/* 3 Apple-Style Tabs */}
        <div className="flex items-center bg-slate-900 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('datos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'datos'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Datos Generales
          </button>
          <button
            onClick={() => setActiveTab('compras')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'compras'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Compras & Auditoría
          </button>
          <button
            onClick={() => setActiveTab('analisis')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analisis'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Análisis Coste Real
          </button>
        </div>
      </div>

      {/* ========================================================
          PESTAÑA 1: DATOS GENERALES (Scorecard Multi-Local y KPIs)
          ======================================================== */}
      {activeTab === 'datos' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Hero KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-indigo-400" />
                Venta Neta Revo
              </span>
              <div className="text-2xl font-black text-white">€{totalVentaNeta.toLocaleString('es-ES')}</div>
              <p className="text-[11px] text-slate-500">Base imponible sin IVA</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-purple-400" />
                Venta Total con IVA
              </span>
              <div className="text-2xl font-black text-white">€{totalVentaIva.toLocaleString('es-ES')}</div>
              <p className="text-[11px] text-slate-500">Facturación bruta en caja</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                Comensales (Pax)
              </span>
              <div className="text-2xl font-black text-white">{totalPax.toLocaleString('es-ES')}</div>
              <p className="text-[11px] text-slate-500">TKP Global: €{(totalVentaNeta / totalPax).toFixed(2)}/pax</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                Compras F&B (Mes)
              </span>
              <div className="text-2xl font-black text-amber-300">€{totalComprasFb.toLocaleString('es-ES')}</div>
              <p className="text-[11px] text-slate-500">Solo Alimentos & Bebidas</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/30 space-y-1 bg-emerald-950/10">
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                Coste Real Consolidado
              </span>
              <div className="text-2xl font-black text-emerald-400">{avgCosteReal}%</div>
              <p className="text-[11px] text-emerald-300/80">Target Global: 23.5%</p>
            </div>
          </div>

          {/* Scorecard Comparativo por Local en Filas */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                  <span>Scorecard Comparativo de Food Cost por Local</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Desglose consolidado del mes. Alertas automáticas según targets individuales.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> En Target
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> Atención (+0.1% a +0.5%)
                </span>
                <span className="flex items-center gap-1 text-rose-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span> Desviado (&gt; +0.5%)
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Local</th>
                    <th className="py-3 px-4 text-right">Venta Neta</th>
                    <th className="py-3 px-4 text-center">Pax</th>
                    <th className="py-3 px-4 text-right">TKP</th>
                    <th className="py-3 px-4 text-right">Compras F&B</th>
                    <th className="py-3 px-4 text-center">Coste Real</th>
                    <th className="py-3 px-4 text-center">Target</th>
                    <th className="py-3 px-4 text-center">Desviación</th>
                    <th className="py-3 px-4 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {SCORECARD_LOCALES.map((row) => (
                    <tr key={row.localId} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-2.5">
                        <span 
                          className="w-3 h-3 rounded-full shrink-0" 
                          style={{ backgroundColor: LOCALES_CONFIG[row.localId].color }}
                        />
                        <span>{row.nombre}</span>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-200">€{row.ventaNeta.toLocaleString('es-ES')}</td>
                      <td className="py-4 px-4 text-center text-slate-300">{row.pax}</td>
                      <td className="py-4 px-4 text-right text-slate-200">€{row.tkp.toFixed(2)}</td>
                      <td className="py-4 px-4 text-right text-amber-300 font-semibold">€{row.comprasFb.toLocaleString('es-ES')}</td>
                      <td className="py-4 px-4 text-center font-black text-white text-sm">
                        {row.costeRealPct}%
                      </td>
                      <td className="py-4 px-4 text-center text-slate-400 font-semibold">
                        {row.costeTargetPct}%
                      </td>
                      <td className="py-4 px-4 text-center font-bold">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${
                          row.desviacionPct <= 0 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : row.desviacionPct <= 0.3
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {row.desviacionPct > 0 ? `+${row.desviacionPct}%` : `${row.desviacionPct}%`}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                          row.estado === 'Optimo'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : row.estado === 'Atencion'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {row.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PESTAÑA 2: COMPRAS & AUDITORÍA DE MATERIAS PRIMAS
          ======================================================== */}
      {activeTab === 'compras' && (
        <div className="space-y-8 animate-in fade-in">
          {/* HERO CHART: Evolución de Compras Mensual con conmutación a Semanal */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" />
                  {viewWeekly ? `Desglose Semanal: ${currentMonthData.mes}` : 'Evolución de Compras Mensual (Ene — Sep 2026)'}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">
                  {viewWeekly ? `Compras Semanales de ${currentMonthData.mes}` : 'Volumen de Compras F&B en Miles de Euros'}
                </h3>
                <p className="text-xs text-slate-400">
                  {viewWeekly 
                    ? 'Haz clic en "Volver a Mensual" para ver el histórico de todo el año.' 
                    : 'Haz clic en cualquier barra mensual para desplegar sus semanas.'}
                </p>
              </div>

              {viewWeekly && (
                <button
                  onClick={() => setViewWeekly(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver a Evolución Mensual</span>
                </button>
              )}
            </div>

            {/* SVG BARS CHART INTERACTIVO CON GRADIENTE AZUL */}
            <div className="pt-6 pb-2">
              <svg viewBox="0 0 800 240" className="w-full h-56 overflow-visible">
                <defs>
                  <linearGradient id="barBlueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#1e40af" />
                  </linearGradient>
                  <linearGradient id="barActiveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4338ca" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                {[0, 60, 120, 180].map((y, i) => (
                  <line 
                    key={i} 
                    x1="40" 
                    y1={y + 20} 
                    x2="780" 
                    y2={y + 20} 
                    stroke="#1e293b" 
                    strokeDasharray="4 4" 
                  />
                ))}

                {/* Bars */}
                {!viewWeekly ? (
                  // MENSUAL
                  EVOLUCION_COMPRAS_2026.map((item, idx) => {
                    const maxVal = 95000;
                    const barHeight = (item.compras / maxVal) * 170;
                    const x = 50 + idx * 80;
                    const y = 200 - barHeight;
                    const isSelected = selectedMesIdx === idx;

                    return (
                      <g 
                        key={item.mesCorto} 
                        className="cursor-pointer group"
                        onClick={() => {
                          setSelectedMesIdx(idx);
                          setViewWeekly(true);
                        }}
                      >
                        {/* Monetary value on top */}
                        <text
                          x={x + 22}
                          y={y - 8}
                          textAnchor="middle"
                          fill={isSelected ? '#38bdf8' : '#94a3b8'}
                          fontSize="11"
                          fontWeight="bold"
                          className="transition-colors group-hover:fill-sky-300"
                        >
                          €{Math.round(item.compras / 1000)}k
                        </text>

                        {/* Bar */}
                        <rect
                          x={x}
                          y={y}
                          width="44"
                          height={barHeight}
                          rx="8"
                          fill={isSelected ? 'url(#barActiveGradient)' : 'url(#barBlueGradient)'}
                          className="transition-all group-hover:opacity-90 group-hover:scale-y-105 origin-bottom"
                        />

                        {/* Label */}
                        <text
                          x={x + 22}
                          y="222"
                          textAnchor="middle"
                          fill={isSelected ? '#ffffff' : '#64748b'}
                          fontSize="11"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                        >
                          {item.mesCorto}
                        </text>
                      </g>
                    );
                  })
                ) : (
                  // SEMANAL (Mes seleccionado)
                  currentMonthData.semanas.map((sem, idx) => {
                    const maxVal = 25000;
                    const barHeight = (sem.compras / maxVal) * 170;
                    const x = 120 + idx * 150;
                    const y = 200 - barHeight;

                    return (
                      <g key={sem.semana} className="group">
                        <text
                          x={x + 35}
                          y={y - 8}
                          textAnchor="middle"
                          fill="#38bdf8"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          €{sem.compras.toLocaleString()}
                        </text>

                        <rect
                          x={x}
                          y={y}
                          width="70"
                          height={barHeight}
                          rx="10"
                          fill="url(#barBlueGradient)"
                          className="transition-all group-hover:opacity-90"
                        />

                        <text
                          x={x + 35}
                          y="222"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="12"
                          fontWeight="bold"
                        >
                          {sem.semana}
                        </text>
                      </g>
                    );
                  })
                )}
              </svg>
            </div>
          </div>

          {/* CRUCE DINÁMICO: Familias & Proveedores */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Familias F&B (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Familias de Compra F&B</span>
                  </h4>
                  <p className="text-xs text-slate-400">Haz clic en una familia para filtrar proveedores y productos.</p>
                </div>
                {selectedFamilia && (
                  <button
                    onClick={() => setSelectedFamilia(null)}
                    className="text-[11px] text-indigo-400 hover:underline"
                  >
                    Limpiar filtro
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {FAMILIAS_SEED.map((fam) => {
                  const isSelected = selectedFamilia === fam.nombre;
                  return (
                    <div
                      key={fam.id}
                      onClick={() => setSelectedFamilia(isSelected ? null : fam.nombre)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-white">{fam.nombre}</span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-300 font-bold">€{fam.totalEuros.toLocaleString()}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{fam.porcentaje}%</span>
                        </div>
                      </div>

                      {/* Bar indicator */}
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: `${fam.porcentaje}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Proveedores de Mercamadrid y Central (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span>Proveedores Principales</span>
                  </h4>
                  <p className="text-xs text-slate-400">Haz clic en un proveedor para auditar sus materias primas.</p>
                </div>
                {selectedProveedor && (
                  <button
                    onClick={() => setSelectedProveedor(null)}
                    className="text-[11px] text-purple-400 hover:underline"
                  >
                    Limpiar filtro
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROVEEDORES_SEED.map((prov) => {
                  const isSelected = selectedProveedor === prov.nombre;
                  return (
                    <div
                      key={prov.id}
                      onClick={() => setSelectedProveedor(isSelected ? null : prov.nombre)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-950/40 border-purple-500 shadow-md'
                          : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-1 truncate">{prov.nombre}</div>
                      <div className="text-sm font-black text-purple-300">€{prov.totalEuros.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{prov.porcentaje}% del total de compras</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* TABLA DETALLADA DE PRODUCTOS CON BUSCADOR EN TIEMPO REAL */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Auditoría Detallada de Materias Primas</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {filteredProducts.length} productos filtrados. Control de último precio vs precio medio.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar producto o proveedor..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Producto</th>
                    <th className="py-2.5 px-3">Proveedor & Familia</th>
                    <th className="py-2.5 px-3 text-right">Cantidad</th>
                    <th className="py-2.5 px-3 text-right">Precio Medio</th>
                    <th className="py-2.5 px-3 text-right">Último Precio</th>
                    <th className="py-2.5 px-3 text-right">Total Compra</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProducts.map((p, idx) => {
                    const priceUp = p.ultimoPrecio > p.precioMedio;
                    return (
                      <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                        <td className="py-3 px-3 text-slate-500">{idx + 1}</td>
                        <td className="py-3 px-3 font-bold text-white">{p.nombre}</td>
                        <td className="py-3 px-3">
                          <span className="text-slate-300 block">{p.proveedor}</span>
                          <span className="text-[10px] text-slate-500">{p.familia}</span>
                        </td>
                        <td className="py-3 px-3 text-right text-slate-200">
                          {p.cantidad} {p.unidad}
                        </td>
                        <td className="py-3 px-3 text-right text-slate-300">
                          €{p.precioMedio.toFixed(2)}/{p.unidad}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className={`font-bold flex items-center justify-end gap-1 ${priceUp ? 'text-amber-400' : 'text-slate-300'}`}>
                            {priceUp && <ArrowUpRight className="w-3 h-3 text-amber-400" />}
                            €{p.ultimoPrecio.toFixed(2)}
                          </div>
                          <span className="text-[10px] text-slate-500">{p.fechaUltimaCompra}</span>
                        </td>
                        <td className="py-3 px-3 text-right font-black text-amber-300">
                          €{p.totalCompra.toLocaleString('es-ES')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PESTAÑA 3: ANÁLISIS COSTE REAL (Fórmula Estricta F&B)
          ======================================================== */}
      {activeTab === 'analisis' && (
        <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2 pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                Fórmula de Auditoría Financiera
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Flujo Vertical de Coste Real: {currentLocalConfig.name}
              </h3>
              <p className="text-xs text-slate-400 max-w-xl mx-auto">
                Cálculo riguroso exclusivo de Alimentos y Bebidas contra la Venta Neta de Revo TPV.
              </p>
            </div>

            {/* Vertical Flow Steps */}
            <div className="space-y-3 font-mono">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-sans block">1. Inventario Inicial (F&B)</span>
                  <span className="text-sm font-bold text-white font-sans">Stock valorizado al inicio del periodo</span>
                </div>
                <div className="text-base font-bold text-slate-200">+ €{FLUJO_COSTE_REAL_CHALACO.inventarioInicial.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-sans block">2. Compras F&B Netas</span>
                  <span className="text-sm font-bold text-white font-sans">Albaranes recibidos en el mes</span>
                </div>
                <div className="text-base font-bold text-slate-200">+ €{FLUJO_COSTE_REAL_CHALACO.comprasFb.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-sans block">3. Traspasos Entrada (QB Kitchen)</span>
                  <span className="text-sm font-bold text-white font-sans">Bases y salsas recibidas del hub</span>
                </div>
                <div className="text-base font-bold text-emerald-400">+ €{FLUJO_COSTE_REAL_CHALACO.traspasosEntrada.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-sans block">4. Traspasos Salida</span>
                  <span className="text-sm font-bold text-white font-sans">Envíos a otros locales del grupo</span>
                </div>
                <div className="text-base font-bold text-rose-400">- €{FLUJO_COSTE_REAL_CHALACO.traspasosSalida.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-sans block">5. Mermas Registradas</span>
                  <span className="text-sm font-bold text-white font-sans">Desperdicio imputado en cocina</span>
                </div>
                <div className="text-base font-bold text-rose-400">- €{FLUJO_COSTE_REAL_CHALACO.mermas.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-sans block">6. Inventario Final (F&B)</span>
                  <span className="text-sm font-bold text-white font-sans">Recuento físico en cámaras al cierre</span>
                </div>
                <div className="text-base font-bold text-rose-400">- €{FLUJO_COSTE_REAL_CHALACO.inventarioFinal.toLocaleString()}</div>
              </div>

              {/* Subtotal Consumo Neto */}
              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/40 flex items-center justify-between">
                <div>
                  <span className="text-xs text-indigo-300 font-sans font-bold block">= Consumo Neto de Materias Primas</span>
                  <span className="text-xs text-slate-400 font-sans">Total consumido en el periodo</span>
                </div>
                <div className="text-lg font-black text-indigo-300">€{FLUJO_COSTE_REAL_CHALACO.consumoNetoFb.toLocaleString()}</div>
              </div>

              {/* Divider against Venta Neta */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-sans block">÷ Venta Neta Total (Revo TPV)</span>
                  <span className="text-sm font-bold text-white font-sans">Facturación neta (sin IVA)</span>
                </div>
                <div className="text-base font-bold text-slate-200">€{FLUJO_COSTE_REAL_CHALACO.ventaNeta.toLocaleString()}</div>
              </div>
            </div>

            {/* Final Coste % Result Hero Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 border-2 border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Resultado Oficial de Auditoría
                </span>
                <div className="text-4xl font-black text-emerald-400 mt-1">
                  {FLUJO_COSTE_REAL_CHALACO.costeRealCalculadoPct}%
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Target Oficial de {currentLocalConfig.name}: <strong>{FLUJO_COSTE_REAL_CHALACO.costeTargetPct}%</strong>
                </p>
              </div>

              <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6">
                <span className="text-xs text-slate-400 block">Desviación:</span>
                <div className="text-2xl font-black text-emerald-400">-0.4%</div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  ✓ Cumple Objetivo
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
