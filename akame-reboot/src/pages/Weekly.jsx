import React from 'react'
import WeeklyChart from '../components/WeeklyChart'
import TopBar from '../components/TopBar'

export default function Weekly({ state }){
  return (
    <div className="container-global grid gap-4 pb-24">
      <TopBar title="Registro Semanal" />
      <div className="glass-card">
        <h2 className="text-lg font-semibold mb-2">Registro Semanal</h2>
        <p className="text-sm opacity-80">Completa tu resumen semanal y observa tu progreso.</p>
      </div>
      <WeeklyChart weekly={state?.weeklySummary || {}} />
    </div>
  )
}