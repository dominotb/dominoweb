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

export default function SceneRenovation({ progress }: SceneProps) {
  // Slot: 0.27 -> 0.41
  const start = 0.27
  const end = 0.41

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

  // Sequential Reveal Order (All finish by subProgress 0.65 to ensure full reading hold):
  // 1. Title: BẠN MUỐN LÀM LẠI CĂN BẾP CŨ (at 0.02)
  // 2. Subtitle: Không chỉ muốn căn bếp mới hơn... (at 0.12)
  // 3. Pain badges: ẨM MỐC -> CONG VÊNH -> KHÓ VỆ SINH -> THIẾU CHỖ -> BỐ TRÍ BẤT TIỆN (from 0.24 to 0.44)
  // 4. LẦN NÀY, (at 0.52)
  // 5. BẠN KHÔNG MUỐN LẶP LẠI. (at 0.60)
  const titleStyle = getStepStyle(subProgress, 0.02, 0.08)
  const subtitleStyle = getStepStyle(subProgress, 0.12, 0.08)

  const painWords = [
    { word: 'ẨM MỐC', threshold: 0.24 },
    { word: 'CONG VÊNH', threshold: 0.29 },
    { word: 'KHÓ VỆ SINH', threshold: 0.34 },
    { word: 'THIẾU CHỖ', threshold: 0.39 },
    { word: 'BỐ TRÍ BẤT TIỆN', threshold: 0.44 },
  ]

  const lanNayStyle = getStepStyle(subProgress, 0.52, 0.07)
  const nonRepeatStyle = getStepStyle(subProgress, 0.60, 0.07)

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 text-white pointer-events-none"
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerTranslateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Step Number & Eyebrow */}
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <span className="text-4xl sm:text-6xl font-extrabold font-mono text-[#d4af7a]/40">02</span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af7a] border-l border-[#d4af7a]/40 pl-4 py-1">
            CẢI TẠO
          </span>
        </div>

        {/* 1. Title */}
        <div style={titleStyle}>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold uppercase tracking-tight leading-[1.15] text-white">
            BẠN MUỐN LÀM LẠI
            <span className="block text-slate-200">CĂN BẾP CŨ</span>
          </h2>
        </div>

        {/* 2. Subtitle */}
        <div style={subtitleStyle}>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Không chỉ muốn căn bếp mới hơn. Bạn muốn giải quyết những bất tiện đã tồn tại nhiều năm.
          </p>
        </div>

        {/* 3. Pain Badges 1-by-1 */}
        <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-4">
          {painWords.map((item) => {
            const badgeStyle = getStepStyle(subProgress, item.threshold, 0.06)
            return (
              <span
                key={item.word}
                style={badgeStyle}
                className="text-sm sm:text-2xl font-extrabold uppercase px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-[#d4af7a]/60 bg-[#d4af7a]/10 text-white"
              >
                {item.word}
              </span>
            )
          })}
        </div>

        {/* 4 & 5. Key Visual Statement */}
        <div className="mt-8 pt-6 border-t border-[#d4af7a]/30">
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight">
            <span style={lanNayStyle} className="block text-[#d4af7a]">
              LẦN NÀY,
            </span>
            <span style={nonRepeatStyle} className="block text-white">
              BẠN KHÔNG MUỐN LẶP LẠI.
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
}

