'use client'

import React from 'react'

interface SceneProps {
  progress: number
}

export default function ScenePain({ progress }: SceneProps) {
  // Slot: 0.68 -> 0.83
  const start = 0.68
  const end = 0.83

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

  // Determine active step based on subProgress:
  // Step 0 (01 active, 02..04 hidden): subProgress < 0.22
  // Step 1 (02 active, 01 small white, 03..04 hidden): 0.22 <= subProgress < 0.44
  // Step 2 (03 active, 01..02 small white, 04 hidden): 0.44 <= subProgress < 0.66
  // Step 3 (04 active, 01..03 small white): subProgress >= 0.66
  let activeStep = 0
  if (subProgress >= 0.66) {
    activeStep = 3
  } else if (subProgress >= 0.44) {
    activeStep = 2
  } else if (subProgress >= 0.22) {
    activeStep = 1
  }

  const questions = [
    { num: '01.', text: 'Liệu có bền?' },
    { num: '02.', text: 'Liệu vài năm nữa có xuống cấp?' },
    { num: '03.', text: 'Liệu số tiền mình bỏ ra có thực sự xứng đáng?' },
    { num: '04.', text: 'VÀ NẾU CÓ VẤN ĐỀ - AI SẼ LÀ NGƯỜI CHỊU TRÁCH NHIỆM?' },
  ]

  return (
    <div
      className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 text-white pointer-events-none bg-black"
      style={{
        opacity: containerOpacity,
        transform: `translateY(${containerTranslateY}px)`,
        willChange: 'transform, opacity',
      }}
    >
      <div className="max-w-4xl mx-auto w-full space-y-4 sm:space-y-6">
        {questions.map((q, idx) => {
          const isRevealed = idx <= activeStep
          const isActive = idx === activeStep

          return (
            <div
              key={q.text}
              className="transition-all duration-500 ease-out overflow-hidden"
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'translateY(0)' : 'translateY(16px)',
                maxHeight: isRevealed ? '220px' : '0px',
                marginTop: isRevealed && idx > 0 ? '16px' : '0px',
                willChange: 'transform, opacity, max-height',
              }}
            >
              <div
                className={`transition-all duration-500 ease-out py-1 ${
                  isActive
                    ? 'text-[#d4af7a] font-extrabold text-xl sm:text-3xl lg:text-4xl'
                    : 'text-slate-200 font-bold text-sm sm:text-lg lg:text-xl opacity-60'
                }`}
              >
                <div className="flex items-start gap-3.5 sm:gap-5">
                  <span
                    className={`font-mono transition-all duration-500 shrink-0 ${
                      isActive
                        ? 'text-[#d4af7a] text-xl sm:text-3xl lg:text-4xl font-extrabold'
                        : 'text-[#d4af7a]/50 text-xs sm:text-sm font-semibold mt-1'
                    }`}
                  >
                    {q.num}
                  </span>
                  <p className="leading-tight tracking-tight">{q.text}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

