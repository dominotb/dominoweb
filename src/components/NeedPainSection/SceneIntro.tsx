'use client'

import React from 'react'

interface SceneProps {
  progress: number
}

export default function SceneIntro({ progress }: SceneProps) {
  // Slot: 0.00 -> 0.13
  const end = 0.13

  if (progress > end) return null

  // Smooth fade-out in range [0.07, 0.13] (Works in both scroll directions)
  let opacity = 1
  let translateY = 0

  if (progress > 0.07) {
    const fadeOutRatio = Math.max(0, Math.min(1, (end - progress) / (end - 0.07)))
    opacity = fadeOutRatio
    translateY = -(1 - fadeOutRatio) * 30
  }

  const bgScale = 1 + progress * 0.3

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 lg:p-20 text-white pointer-events-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Dark Ambient Background Image */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90')`,
            transform: `scale(${bgScale})`,
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
      </div>

      {/* Main Headline */}
      <div className="pt-20 sm:pt-24 lg:pt-28 max-w-5xl">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.08] text-white">
          MỖI CĂN BẾP
          <span className="block mt-2 text-[#d4af7a] italic font-normal">
            BẮT ĐẦU TỪ MỘT NHU CẦU KHÁC NHAU
          </span>
        </h2>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="pb-8 flex flex-col items-center gap-3 text-center mx-auto mt-auto">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
          Cuộn để tìm câu chuyện của bạn
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#d4af7a] rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}
