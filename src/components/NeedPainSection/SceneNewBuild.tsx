'use client'

import React from 'react'

interface SceneProps {
  progress: number
}

function getStepStyle(subProgress: number, revealAt: number, duration: number = 0.06) {
  if (subProgress < revealAt) {
    return {
      opacity: 0,
      transform: 'translateY(16px)',
      willChange: 'transform, opacity',
    }
  }
  const p = Math.min(1, (subProgress - revealAt) / duration)
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * 16}px)`,
    willChange: 'transform, opacity',
  }
}

export default function SceneNewBuild({ progress }: SceneProps) {
  // Slot: 0.13 -> 0.27
  const start = 0.13
  const end = 0.27

  if (progress < start || progress > end) return null

  const subProgress = (progress - start) / (end - start)

  const fadeInEnd = start + 0.015
  const fadeOutStart = end - 0.015

  let containerOpacity = 1
  let containerTranslateY = 0

  if (progress < fadeInEnd) {
    const ratio = Math.max(0, Math.min(1, (progress - start) / 0.015))
    containerOpacity = ratio
    containerTranslateY = (1 - ratio) * 20
  } else if (progress > fadeOutStart) {
    const ratio = Math.max(0, Math.min(1, (end - progress) / 0.015))
    containerOpacity = ratio
    containerTranslateY = -(1 - ratio) * 20
  }

  // Sequential Reveal Thresholds (All finish by subProgress 0.68 to guarantee long reading hold window):
  // 1. Title: BẠN ĐANG XÂY MỘT NGÔI NHÀ MỚI (at 0.02)
  // 2. Subtitle: Bạn muốn căn bếp đẹp... (at 0.12)
  // 3. Caution: NHƯNG... Một quyết định sai... (at 0.25)
  // 4. Key Items 01 -> 05 (from 0.38 to 0.68)
  const titleStyle = getStepStyle(subProgress, 0.02, 0.08)
  const subtitleStyle = getStepStyle(subProgress, 0.12, 0.08)
  const cautionStyle = getStepStyle(subProgress, 0.25, 0.08)

  const gridItems = [
    { num: '01.', text: 'Vật liệu', threshold: 0.38 },
    { num: '02.', text: 'Công năng', threshold: 0.44 },
    { num: '03.', text: 'Phụ kiện', threshold: 0.50 },
    { num: '04.', text: 'Độ bền', threshold: 0.56 },
    { num: '05.', text: 'Hậu mãi', threshold: 0.62 },
  ]

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 text-white pointer-events-none"
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerTranslateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Background image subtle overlay */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=90')`,
            transform: `scale(${1 + subProgress * 0.15})`,
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        {/* Step Number & Eyebrow */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <span className="text-4xl sm:text-6xl font-extrabold font-mono text-[#d4af7a]/40">01</span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af7a] border-l border-[#d4af7a]/40 pl-4 py-1">
            XÂY MỚI
          </span>
        </div>

        {/* 1. Demand Title */}
        <div style={titleStyle}>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.15] text-white">
            BẠN ĐANG XÂY
            <span className="block text-slate-200">MỘT NGÔI NHÀ MỚI</span>
          </h2>
        </div>

        {/* 2. Subtitle */}
        <div style={subtitleStyle}>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Bạn muốn căn bếp đẹp, đồng bộ với kiến trúc ngôi nhà và đủ tốt để sử dụng trong nhiều năm.
          </p>
        </div>

        {/* 3 & 4. Caution & Key Elements */}
        <div className="mt-6 sm:mt-10 pt-6 border-t border-white/10 space-y-4">
          <div
            style={cautionStyle}
            className="text-[#d4af7a] text-sm sm:text-xl font-bold uppercase tracking-wider"
          >
            NHƯNG... Một quyết định sai ở thời điểm này có thể phải sống cùng nó 10–20 năm.
          </div>

          {/* 4. Grid items 01 -> 05 */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {gridItems.map((item) => {
              const itemStyle = getStepStyle(subProgress, item.threshold, 0.08)
              return (
                <div
                  key={item.text}
                  style={itemStyle}
                  className="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center text-xs sm:text-sm font-semibold tracking-wider text-slate-200"
                >
                  <span className="text-[#d4af7a] mr-1">{item.num}</span> {item.text}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

