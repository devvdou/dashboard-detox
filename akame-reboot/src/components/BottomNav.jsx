import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Wind, BarChart3, Settings } from 'lucide-react'

export default function BottomNav(){
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-neutral-800/60 backdrop-blur border-t border-white/10">
      <ul className="grid grid-cols-4">
        <li>
          <NavLink to="/" className="grid place-items-center py-3" aria-label="Dashboard"><LayoutDashboard className="w-6 h-6"/></NavLink>
        </li>
        <li>
          <NavLink to="/breathing" className="grid place-items-center py-3" aria-label="Respiración"><Wind className="w-6 h-6"/></NavLink>
        </li>
        <li>
          <NavLink to="/weekly" className="grid place-items-center py-3" aria-label="Registro semanal"><BarChart3 className="w-6 h-6"/></NavLink>
        </li>
        <li>
          <NavLink to="/settings" className="grid place-items-center py-3" aria-label="Ajustes"><Settings className="w-6 h-6"/></NavLink>
        </li>
      </ul>
    </nav>
  )
}