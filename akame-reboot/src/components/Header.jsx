import React from 'react'
import { CalendarDays, Clock, Download, FileDown, Flame } from 'lucide-react'
import { daysSince, todayISO } from '../lib/date'
import { exportJSON, exportCSV } from '../lib/storage'

export default function Header({ state, onNewDay, onLogSlip }) {
  const start = state?.meta?.startDate || todayISO()
  const days = daysSince(start)
  return (
    <header className="container-global flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">Akame Reboot</h1>
        <div className="flex items-center gap-2 text-sm opacity-90 sm:opacity-80 flex-wrap">
          <CalendarDays className="w-5 h-5" />
          <span>Inicio: {start}</span>
          <Clock className="w-5 h-5 ml-3" />
          <span>Días sin THC: {days}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap justify-end">
        <button aria-label="Registrar caída" className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 flex items-center gap-2 min-h-[36px]" onClick={onLogSlip}>
          <Flame className="w-5 h-5 text-accent" />
          <span className="hidden sm:inline">Registrar caída</span>
        </button>
        <button aria-label="Nuevo día" className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 min-h-[36px]" onClick={onNewDay}>Nuevo día</button>
        <button aria-label="Backup JSON" className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 flex items-center gap-2 min-h-[36px]" onClick={()=>exportJSON(state)}>
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Backup JSON</span>
        </button>
        <button aria-label="Exportar CSV" className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 flex items-center gap-2 min-h-[36px]" onClick={()=>exportCSV(state)}>
          <FileDown className="w-5 h-5" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>
    </header>
  )
}