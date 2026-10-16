'use client'

import React from 'react'

interface SceneProps {
  progress: number
}

export default function SceneMaterialBridge({ progress }: SceneProps) {
  // Slot: >= 0.83
  const start = 0.83
  if (progress < start) return null

  const fadeInEnd = start + 0.035

  let opacity = 1
  let translateY = 0

  if (progress < fadeInEnd) {
    const ratio = Math.max(0, Math.min(1, (progress - start) / 0.035))
    opacity = ratio
    translateY = (1 - ratio) * 24
  }

  const isPart2 = progress >= 0.92

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 text-center text-white pointer-events-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Macro INOX background image */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=90')`,
            transform: `scale(${1 + (progress - start) * 0.3})`,
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        {!isPart2 ? (
          <div className="space-y-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af7a]">
              ĐẶT VẤN ĐỀ
            </span>
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight">
              VẬY MỘT CĂN BẾP
              <span className="block text-[#d4af7a] mt-2">ĐƯỢC LÀM ĐỂ SỬ DỤNG LÂU DÀI</span>
              <span className="block text-slate-200 mt-1 font-normal italic text-xl sm:text-3xl">NÊN BẮT ĐẦU TỪ ĐÂU?</span>
            </h2>
          </div>
        ) : (
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#d4af7a] uppercase">
              CÂU TRẢ LỜI NẰM Ở
            </span>
            <h1 className="text-5xl sm:text-8xl lg:text-[130px] font-black uppercase tracking-tighter text-white leading-none">
              VẬT LIỆU<span className="text-[#d4af7a]">.</span>
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
