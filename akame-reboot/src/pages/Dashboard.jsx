import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import BottomNav from '../components/BottomNav'
import HabitGrid from '../components/HabitGrid'
import DayModal from '../components/DayModal'
import ProgressRing from '../components/ProgressRing'
import ExportImport from '../components/ExportImport'

export default function Dashboard({ state, onNewDay, onSaveDay, onLogSlip, onImport }){
  const [openDay, setOpenDay] = useState(null)

  function handleNewDay(){
    const idx = onNewDay()
    setOpenDay(idx)
  }

  function handleSaveDay(idx, data){
    onSaveDay(idx, data)
    setOpenDay(null)
  }

  function handleLogSlip(){
    onLogSlip()
  }

  function handleImport(parsed){
    onImport(parsed)
  }

  const completed = Object.values(state.days || {}).filter(d=> d?.noSmoking).length
  const percent = Math.round((completed/30)*100)

  return (
    <div className="container-global grid lg:grid-cols-[18rem_1fr] gap-4 pb-24">
      <Sidebar />
      <main className="grid gap-4">
        <Header state={state} onNewDay={handleNewDay} onLogSlip={handleLogSlip}/>
        <section className="grid lg:grid-cols-[1fr_22rem] gap-4">
          <div className="glass-card">
            <h2 className="text-lg font-semibold mb-3">Progreso 30 días</h2>
            <HabitGrid state={state} onSelectDay={setOpenDay} />
          </div>
          <div className="grid gap-4">
            <div className="glass-card grid place-items-center">
              <h3 className="font-semibold mb-2">Completado</h3>
              <ProgressRing percent={percent} />
              <div className="mt-2 text-sm">{completed} / 30 días</div>
            </div>
            <ExportImport state={state} onImport={handleImport} />
            <div className="glass-card text-sm">
              <p className="opacity-80">Frase diaria</p>
              <p>Respira, enfoca, 1% mejor hoy.</p>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
      {openDay && (
        <DayModal dayIndex={openDay} state={state} onSave={handleSaveDay} onClose={()=>setOpenDay(null)} />
      )}
    </div>
  )
}