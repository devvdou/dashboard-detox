import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function DayModal({ dayIndex, state, onSave, onClose }) {
  const day = state.days?.[dayIndex] || { date: '', noSmoking:false, exercise:false, respiration:false, foodClean:false, focus90:false, sleepHours:0, mood:5, notes:''}
  const [local, setLocal] = useState(day)
  const dialogRef = useRef(null)

  useEffect(()=> setLocal(day), [dayIndex])

  // Accesibilidad: cerrar con Escape y focar el diálogo al abrir
  useEffect(()=>{
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(()=>{
    dialogRef.current?.focus()
  }, [dayIndex])

  function handleSave(){
    onSave(dayIndex, local)
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true"></div>
      <motion.div initial={{y:30}} animate={{y:0}} role="dialog" aria-modal="true" aria-label={`Detalle día ${dayIndex}`} className="relative bg-white/5 backdrop-blur rounded-2xl p-4 sm:p-6 w-full max-w-lg shadow-lg max-h-[80vh] overflow-y-auto" tabIndex={-1} ref={dialogRef}>
        <h3 className="text-xl font-semibold mb-3">Día {dayIndex} — {local.date}</h3>
        <div className="grid gap-3">
          <label className="flex items-center gap-2 text-base">
            <input className="w-5 h-5 accent-[#6EE7B7]" type="checkbox" checked={local.noSmoking} onChange={e => setLocal({...local, noSmoking:e.target.checked})} />
            No fumar
          </label>
          <label className="flex items-center gap-2 text-base">
            <input className="w-5 h-5 accent-[#6EE7B7]" type="checkbox" checked={local.exercise} onChange={e => setLocal({...local, exercise:e.target.checked})} />
            Ejercicio
          </label>
          <label className="flex items-center gap-2 text-base">
            <input className="w-5 h-5 accent-[#6EE7B7]" type="checkbox" checked={local.respiration} onChange={e => setLocal({...local, respiration:e.target.checked})} />
            Respiración
          </label>
          <label className="flex items-center gap-2 text-base">
            <input className="w-5 h-5 accent-[#6EE7B7]" type="checkbox" checked={local.foodClean} onChange={e => setLocal({...local, foodClean:e.target.checked})} />
            Comer limpio
          </label>
          <label className="flex items-center gap-2 text-base">
            <input className="w-5 h-5 accent-[#6EE7B7]" type="checkbox" checked={local.focus90} onChange={e => setLocal({...local, focus90:e.target.checked})} />
            Foco 90min
          </label>
          <label className="grid gap-1 text-base">
            <span>Horas de sueño</span>
            <input type="number" min="0" step="0.5" value={local.sleepHours} onChange={e => setLocal({...local, sleepHours:Number(e.target.value)})} className="px-2 py-2 rounded bg-white/10" />
          </label>
          <label className="grid gap-1 text-base">
            <span>Ánimo (0–10)</span>
            <input type="number" min="0" max="10" value={local.mood} onChange={e => setLocal({...local, mood:Number(e.target.value)})} className="px-2 py-2 rounded bg-white/10" />
          </label>
          <label className="grid gap-1 text-base">
            <span>Observaciones</span>
            <textarea className="w-full p-3 rounded bg-white/10" value={local.notes} onChange={e => setLocal({...local, notes:e.target.value})} />
          </label>
        </div>
        <div className="flex gap-3 mt-4 justify-end">
          <button className="px-4 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10" onClick={onClose}>Cerrar</button>
          <button className="px-4 py-2 rounded bg-gradient-to-br from-[#6EE7B7] to-[#60A5FA]" onClick={handleSave}>Guardar ahora</button>
        </div>
      </motion.div>
    </motion.div>
  )
}