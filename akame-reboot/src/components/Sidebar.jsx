import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Wind, BarChart3, Settings } from 'lucide-react'

export default function Sidebar(){
  return (
    <aside className="hidden lg:block sidebar-glass">
      <div className="text-lg font-semibold mb-4">AKAME</div>
      <nav className="grid gap-2">
        <NavLink to="/" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded ${isActive?'bg-white/10':''}`}><LayoutDashboard className="w-4 h-4"/>Dashboard</NavLink>
        <NavLink to="/breathing" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded ${isActive?'bg-white/10':''}`}><Wind className="w-4 h-4"/>Respiración</NavLink>
        <NavLink to="/weekly" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded ${isActive?'bg-white/10':''}`}><BarChart3 className="w-4 h-4"/>Registro Semanal</NavLink>
        <NavLink to="/settings" className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded ${isActive?'bg-white/10':''}`}><Settings className="w-4 h-4"/>Ajustes</NavLink>
      </nav>
    </aside>
  )
}