'use client'

import React from 'react'

interface ProgressIndicatorProps {
  progress: number
}

export default function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  // Visible during Scenes 01, 02, 03 (progress 0.13 to 0.55)
  const isVisible = progress >= 0.13 && progress < 0.55

  let currentStep = '01'
  if (progress >= 0.27 && progress < 0.41) {
    currentStep = '02'
  } else if (progress >= 0.41) {
    currentStep = '03'
  }

  if (!isVisible) return null

  return (
    <div className="fixed right-6 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4 text-xs font-mono tracking-widest transition-opacity duration-300">
      <div className="text-[#d4af7a] font-bold text-sm">{currentStep}</div>
      <div className="h-20 w-px bg-white/10 relative overflow-hidden">
        <div
          className="w-full bg-[#d4af7a] transition-all duration-150 ease-out"
          style={{
            height: `${Math.min(100, Math.max(0, ((progress - 0.13) / 0.42) * 100))}%`,
          }}
        />
      </div>
      <div className="text-zinc-500">03</div>
    </div>
  )
}
