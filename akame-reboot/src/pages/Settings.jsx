import React from 'react'
import SettingsPanel from '../components/Settings'
import TopBar from '../components/TopBar'

export default function Settings({ state, onToggleTheme }){
  return (
    <div className="container-global grid gap-4 pb-24">
      <TopBar title="Ajustes" />
      <div className="glass-card">
        <h2 className="text-lg font-semibold mb-2">Ajustes</h2>
      </div>
      <SettingsPanel theme={state?.meta?.theme} onThemeToggle={onToggleTheme} />
    </div>
  )
}