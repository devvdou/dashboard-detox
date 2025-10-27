import React from 'react'
import Timer from '../components/Timer'
import TopBar from '../components/TopBar'

export default function Breathing(){
  return (
    <div className="container-global grid gap-4 pb-24">
      <TopBar title="Respiración & Protocolo" />
      <div className="glass-card">
        <h2 className="text-lg font-semibold mb-2">Respiración & Protocolo</h2>
        <p className="text-sm opacity-80">Técnicas: Box (4-4-4-4), 4-7-8, Diafragmática.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Timer seconds={60} label="Box Breathing" />
        <Timer seconds={90} label="4-7-8" />
        <Timer seconds={120} label="Diafragmática" />
      </div>
    </div>
  )
}