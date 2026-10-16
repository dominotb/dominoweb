'use client'

import React from 'react'

interface SceneProps {
  progress: number
}

export default function SceneConvergence({ progress }: SceneProps) {
  // Slot: 0.55 -> 0.69
  const start = 0.55
  const end = 0.69

  if (progress < start || progress > end) return null

  const fadeInEnd = start + 0.035
  const fadeOutStart = end - 0.035

  let opacity = 1
  let translateY = 0

  if (progress < fadeInEnd) {
    const ratio = Math.max(0, Math.min(1, (progress - start) / 0.035))
    opacity = ratio
    translateY = (1 - ratio) * 24
  } else if (progress > fadeOutStart) {
    const ratio = Math.max(0, Math.min(1, (end - progress) / 0.035))
    opacity = ratio
    translateY = -(1 - ratio) * 24
  }

  const convergenceRatio = Math.min(1, Math.max(0, (progress - start) / 0.07))
  const labelOffsetX = (1 - convergenceRatio) * 100

  const isHeadline2 = progress >= 0.62

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 text-center text-white pointer-events-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Converging 3 Demand Labels */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12">
          {/* Label 1 */}
          <div
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs sm:text-sm font-mono tracking-widest text-[#d4af7a]"
            style={{ transform: `translateX(${-labelOffsetX}px)`, willChange: 'transform' }}
          >
            01 - XÂY MỚI
          </div>

          {/* Label 2 */}
          <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs sm:text-sm font-mono tracking-widest text-[#d4af7a]">
            02 - CẢI TẠO
          </div>

          {/* Label 3 */}
          <div
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs sm:text-sm font-mono tracking-widest text-[#d4af7a]"
            style={{ transform: `translateX(${labelOffsetX}px)`, willChange: 'transform' }}
          >
            03 - NÂNG CẤP
          </div>
        </div>

        {/* Dynamic Headline Transition */}
        <div className="space-y-4">
          {!isHeadline2 ? (
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-slate-300 leading-tight">
              NHU CẦU
              <span className="block text-white">CÓ THỂ KHÁC NHAU.</span>
            </h2>
          ) : (
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight">
              NHƯNG{' '}
              <span className="text-[#d4af7a] underline decoration-[#d4af7a]/40 underline-offset-8">
                NỖI LO
              </span>{' '}
              THÌ RẤT GIỐNG NHAU.
            </h2>
          )}
        </div>
      </div>
    </div>
  )
}
