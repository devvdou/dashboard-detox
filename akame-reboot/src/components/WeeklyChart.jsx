import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function WeeklyChart({ weekly }){
  const weeks = Object.keys(weekly || {}).map((k)=>({
    name: k,
    energy: weekly[k]?.energy ?? 0,
    anxiety: weekly[k]?.anxiety ?? 0,
  }))
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="glass-card">
        <h3 className="font-semibold mb-2">Energía (línea)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeks}>
              <XAxis dataKey="name" stroke="#fff" tick={{ fill:'#fff', fontSize: 12 }} tickMargin={8}/>
              <YAxis stroke="#fff" tick={{ fill:'#fff', fontSize: 12 }}/>
              <Tooltip contentStyle={{ background:'#111', border:'1px solid #333' }}/>
              <Line type="monotone" dataKey="energy" stroke="#6EE7B7" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card">
        <h3 className="font-semibold mb-2">Ansiedad (barras)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeks}>
              <XAxis dataKey="name" stroke="#fff" tick={{ fill:'#fff', fontSize: 12 }} tickMargin={8}/>
              <YAxis stroke="#fff" tick={{ fill:'#fff', fontSize: 12 }}/>
              <Tooltip contentStyle={{ background:'#111', border:'1px solid #333' }}/>
              <Bar dataKey="anxiety" fill="#F472B6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}