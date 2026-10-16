'use client'

import React, { useState, useEffect, useRef } from 'react'
import ProgressIndicator from './ProgressIndicator'
import SceneIntro from './SceneIntro'
import SceneNewBuild from './SceneNewBuild'
import SceneRenovation from './SceneRenovation'
import SceneUpgrade from './SceneUpgrade'
import SceneConvergence from './SceneConvergence'
import ScenePain from './ScenePain'
import SceneMaterialBridge from './SceneMaterialBridge'

export default function NeedPainSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check accessibility preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleMediaChange)

    let animationFrameId: number

    // Continuous 60fps frame ticker for 100% real-time scroll sync with Lenis/Native
    const updateProgress = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const totalScrollable = rect.height - viewportHeight

        if (totalScrollable > 0) {
          const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
          setProgress((prev) => {
            if (Math.abs(prev - currentProgress) > 0.0005) {
              return currentProgress
            }
            return prev
          })
        }
      }
      animationFrameId = requestAnimationFrame(updateProgress)
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrameId)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  // Reduced motion alternative layout for accessibility
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full bg-black text-white py-20 px-6 sm:px-12 border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-20">
          <div>
            <h2 className="text-4xl font-extrabold uppercase mt-2">MỖI CĂN BẾP BẮT ĐẦU TỪ MỘT NHU CẦU KHÁC NHAU</h2>
          </div>
          <div>
            <span className="text-[#d4af7a] font-mono text-sm font-bold">01 - XÂY MỚI</span>
            <h3 className="text-3xl font-bold mt-2">BẠN ĐANG XÂY MỘT NGÔI NHÀ MỚI</h3>
            <p className="text-slate-300 mt-2">Một quyết định sai ở thời điểm này có thể phải sống cùng nó 10–20 năm.</p>
          </div>
          <div>
            <span className="text-[#d4af7a] font-mono text-sm font-bold">02 - CẢI TẠO</span>
            <h3 className="text-3xl font-bold mt-2">BẠN MUỐN LÀM LẠI CĂN BẾP CŨ</h3>
            <p className="text-[#d4af7a] text-2xl font-bold mt-2">LẦN NÀY, BẠN KHÔNG MUỐN LẶP LẠI.</p>
          </div>
          <div>
            <span className="text-[#d4af7a] font-mono text-sm font-bold">03 - NÂNG CẤP</span>
            <h3 className="text-3xl font-bold mt-2">CĂN BẾP VẪN DÙNG ĐƯỢC. NHƯNG BẠN BIẾT NÓ CHƯA ĐỦ TỐT.</h3>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">NHU CẦU CÓ THỂ KHÁC NHAU. NHƯNG NỖI LO THÌ RẤT GIỐNG NHAU.</h3>
          </div>
          <div>
            <h1 className="text-6xl font-black text-white">VẬT LIỆU.</h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="need-pain-story"
      data-motion-sticky
      className="relative h-[500vh] sm:h-[550vh] w-full bg-black text-white"
    >
      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Step Progress Indicator (Desktop) */}
        <ProgressIndicator progress={progress} />

        {/* Storytelling Scenes */}
        <SceneIntro progress={progress} />
        <SceneNewBuild progress={progress} />
        <SceneRenovation progress={progress} />
        <SceneUpgrade progress={progress} />
        <SceneConvergence progress={progress} />
        <ScenePain progress={progress} />
        <SceneMaterialBridge progress={progress} />
      </div>
    </section>
  )
}
