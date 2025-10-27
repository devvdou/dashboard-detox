import React from 'react'
import { motion } from 'framer-motion'

export default function HabitGrid({ state, onSelectDay }){
  const days = Array.from({length:30}, (_,i)=> i+1)
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
      {days.map((d)=>{
        const done = !!state.days?.[d]?.noSmoking
        return (
          <motion.button
            key={d}
            onClick={()=>onSelectDay(d)}
            className={`habit-node ${done ? 'habit-node-completed animate-pulse-soft' : 'bg-white/10'}`}
            initial={{opacity:0, scale:0.95}}
            animate={{opacity:1, scale:1}}
            whileHover={{scale:1.05}}
            aria-label={`Abrir día ${d}`}
          >
            {d}
          </motion.button>
        )
      })}
    </div>
  )
}