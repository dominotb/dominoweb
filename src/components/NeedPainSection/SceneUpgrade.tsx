'use client'

import React from 'react'

interface SceneProps {
  progress: number
}

function getStepStyle(subProgress: number, revealAt: number, duration: number = 0.05) {
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

export default function SceneUpgrade({ progress }: SceneProps) {
  // Slot: 0.41 -> 0.55
  const start = 0.41
  const end = 0.55

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

  // Sequential Reveal Order (All finish by subProgress 0.58 to ensure long reading hold):
  // 1. CĂN BẾP VẪN DÙNG ĐƯỢC. (at 0.02)
  // 2. NHƯNG BẠN BIẾT NÓ CHƯA ĐỦ TỐT. (at 0.12)
  // 3. Bullet points 1 to 5 (from 0.22 to 0.52)
  const line1Style = getStepStyle(subProgress, 0.02, 0.08)
  const line2Style = getStepStyle(subProgress, 0.12, 0.08)

  const messages = [
    { text: 'Đồ dùng ngày một nhiều', threshold: 0.22 },
    { text: 'Không gian lưu trữ không còn đủ', threshold: 0.29 },
    { text: 'Phụ kiện bắt đầu xuống cấp', threshold: 0.36 },
    { text: 'Việc nấu ăn trở nên bất tiện', threshold: 0.43 },
    { text: 'Những chi tiết nhỏ bắt đầu khiến bạn khó chịu mỗi ngày', threshold: 0.50 },
  ]

  const bgScale = 1 + subProgress * 0.15

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 text-white pointer-events-none"
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerTranslateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      {/* Background with slight zoom */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2000&q=90')`,
            transform: `scale(${bgScale})`,
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      </div>

      <div className="max-w-5xl mx-auto w-full">
        {/* Step Number & Eyebrow */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <span className="text-4xl sm:text-6xl font-extrabold font-mono text-[#d4af7a]/40">03</span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af7a] border-l border-[#d4af7a]/40 pl-4 py-1">
            NÂNG CẤP
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.15] text-white max-w-4xl">
          <span style={line1Style} className="block">
            CĂN BẾP VẪN DÙNG ĐƯỢC.
          </span>
          <span style={line2Style} className="block text-[#d4af7a] mt-1 font-normal italic">
            NHƯNG BẠN BIẾT NÓ CHƯA ĐỦ TỐT.
          </span>
        </h2>

        {/* Sequential message list */}
        <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3 max-w-3xl">
          {messages.map((item) => {
            const itemStyle = getStepStyle(subProgress, item.threshold, 0.08)
            return (
              <div
                key={item.text}
                style={itemStyle}
                className="flex items-center gap-3.5 text-white opacity-90 text-sm sm:text-lg lg:text-xl leading-relaxed"
              >
                <div className="h-2 w-2 rounded-full bg-[#d4af7a] shrink-0" />
                <span>{item.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

