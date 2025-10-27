import React from 'react'

export default function Settings({ theme='dark', onThemeToggle }){
  return (
    <div className="glass-card">
      <h3 className="text-lg font-semibold mb-2">Ajustes</h3>
      <div className="flex items-center justify-between">
        <span>Tema</span>
        <button aria-label="Cambiar tema" className="px-3 py-2 rounded bg-white/10" onClick={onThemeToggle}>
          {theme==='dark' ? 'Dark' : 'Light'}
        </button>
      </div>
  <div className="mt-4 text-sm opacity-80">
        <p>Atajos de teclado:</p>
        <ul className="list-disc ml-5">
          <li>N = Nuevo día</li>
          <li>E = Ir al Dashboard (export disponible en la cabecera)</li>
          <li>D = Ir al Dashboard</li>
        </ul>
      </div>
    </div>
  )
}