import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Breathing from './pages/Breathing'
import Weekly from './pages/Weekly'
import Settings from './pages/Settings'
import { loadState, saveStateDebounced, saveState } from './lib/storage'
import { todayISO } from './lib/date'

const initialState = {
  meta: {
    createdAt: new Date().toISOString(),
    startDate: todayISO(),
    lastEdit: new Date().toISOString(),
    theme: 'dark',
  },
  days: {},
  weeklySummary: {},
  events: [],
}

export default function App(){
  const [state, setState] = useState(()=> loadState() || initialState)
  const navigate = useNavigate()

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', state.meta?.theme === 'dark')
  }, [state.meta?.theme])

  useEffect(()=>{
    saveStateDebounced({ ...state, meta: { ...state.meta, lastEdit: new Date().toISOString() } })
  }, [state])

  function handleImport(parsed){
    setState(parsed)
    saveState(parsed)
  }

  function handleToggleTheme(){
    setState(prev => ({
      ...prev,
      meta: { ...prev.meta, theme: prev.meta?.theme === 'dark' ? 'light' : 'dark' }
    }))
  }

  function handleNewDay(){
    // Elegir el primer índice libre entre 1..30 (robusto ante huecos o importaciones no consecutivas)
    const days = state.days || {}
    let nextIndex = 1
    for (let i = 1; i <= 30; i++) {
      if (!days[i]) { nextIndex = i; break }
    }
    setState(prev => ({
      ...prev,
      days: { ...prev.days, [nextIndex]: { date: todayISO(), noSmoking: true } }
    }))
    return nextIndex
  }

  function handleSaveDay(idx, data){
    setState(prev => ({
      ...prev,
      days: { ...prev.days, [idx]: { ...prev.days[idx], ...data } },
    }))
  }

  function handleLogSlip(){
    setState(prev => ({
      ...prev,
      events: [ ...prev.events, { type:'slip', dateTime: new Date().toISOString(), note:'' } ]
    }))
  }

  // keyboard shortcuts
  useEffect(()=>{
    function onKey(e){
      if(e.key === 'E' || e.key === 'e'){
        navigate('/')
        // Export handled in Dashboard header button
      } else if (e.key === 'N' || e.key === 'n') {
        handleNewDay()
      } else if (e.key === 'D' || e.key === 'd') {
        navigate('/')
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Dashboard state={state} onNewDay={handleNewDay} onSaveDay={handleSaveDay} onLogSlip={handleLogSlip} onImport={handleImport} />} />
      <Route path="/breathing" element={<Breathing />} />
      <Route path="/weekly" element={<Weekly state={state} />} />
      <Route path="/settings" element={<Settings state={state} onToggleTheme={handleToggleTheme} />} />
      <Route path="*" element={<Dashboard state={state} onNewDay={handleNewDay} onSaveDay={handleSaveDay} onLogSlip={handleLogSlip} onImport={handleImport} />} />
    </Routes>
  )
}