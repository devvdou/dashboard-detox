import React, { useRef } from 'react'
import { exportJSON, exportCSV, importJSON } from '../lib/storage'

export default function ExportImport({ state, onImport }){
  const fileRef = useRef(null)
  return (
    <div className="glass-card flex flex-wrap items-center gap-2">
      <button className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 min-h-[36px]" onClick={()=>exportJSON(state)}>Exportar JSON</button>
      <button className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 min-h-[36px]" onClick={()=>exportCSV(state)}>Exportar CSV</button>
      <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={async (e)=>{
        const file = e.target.files?.[0]
        if(!file) return
        try {
          const parsed = await importJSON(file)
          onImport(parsed)
          e.target.value = ''
        } catch(err) {
          alert('JSON inválido')
        }
      }} />
      <button className="px-3 py-2 rounded bg-white/20 sm:bg-white/10 hover:bg-white/30 sm:hover:bg-white/20 border border-white/20 sm:border-white/10 min-h-[36px]" onClick={()=>fileRef.current?.click()}>Importar JSON</button>
    </div>
  )
}