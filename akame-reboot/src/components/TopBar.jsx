import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function TopBar({ title = '' }){
  const navigate = useNavigate()
  return (
    <div className="container-global flex items-center justify-between py-3 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <button
          aria-label="Atrás"
          className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 flex items-center gap-2 min-h-[36px]"
          onClick={()=> {
            // Si no hay historial suficiente (acceso directo), volvemos al inicio
            if (window.history.length > 2) navigate(-1)
            else navigate('/')
          }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Atrás</span>
        </button>
        {title && <h2 className="text-lg font-semibold ml-2">{title}</h2>}
      </div>
      <NavLink to="/" aria-label="Inicio" className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 flex items-center gap-2 min-h-[36px]">
        <Home className="w-5 h-5" />
        <span className="hidden sm:inline">Inicio</span>
      </NavLink>
    </div>
  )
}