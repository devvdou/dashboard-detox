import React from 'react'

export default function ProgressRing({ percent=0, size=100, stroke=10 }){
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent/100) * circumference
  return (
    <svg width={size} height={size} className="block">
      <defs>
        <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#6EE7B7"/>
          <stop offset="100%" stopColor="#60A5FA"/>
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={radius} stroke="#ffffff22" strokeWidth={stroke} fill="none" />
      <circle
        cx={size/2}
        cy={size/2}
        r={radius}
        stroke="url(#grad)"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition:'stroke-dashoffset 0.6s ease' }}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
    </svg>
  )
}