import React, { useEffect, useRef, useState } from 'react'

export default function Timer({ seconds=60, onDone, label='Box Breathing' }){
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(()=>{
    if(!running) return
    intervalRef.current = setInterval(()=>{
      setRemaining(prev => {
        if(prev <= 1){
          clearInterval(intervalRef.current)
          setRunning(false)
          onDone?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return ()=> clearInterval(intervalRef.current)
  }, [running])

  return (
    <div className="glass-card grid place-items-center gap-3 p-6">
      <div className="text-sm opacity-80">{label}</div>
      <div className="relative grid place-items-center">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 backdrop-blur grid place-items-center">
          <div className="text-2xl sm:text-3xl font-semibold">{remaining}s</div>
        </div>
      </div>
      <div className="flex gap-2">
        {!running ? (
          <button className="px-4 py-2 rounded bg-gradient-to-br from-[#6EE7B7] to-[#60A5FA]" onClick={()=>setRunning(true)}>Iniciar rutina</button>
        ) : (
          <button className="px-4 py-2 rounded bg-white/10" onClick={()=>setRunning(false)}>Pausar</button>
        )}
        <button className="px-4 py-2 rounded bg-white/10" onClick={()=>{setRunning(false); setRemaining(seconds)}}>Reiniciar</button>
      </div>
    </div>
  )
}