'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { productCatalog } from '@/data/products'

type Product = {
  id: string
  name: string
  short_description?: string
  media_url?: string
}

export default function ProductRange({ products }: { products?: Product[] }) {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const sectionRef = useRef<HTMLElement>(null)

  const families = productCatalog.map((product) => {
    const remote = products?.find((item) => item.id === product.slug)
    return {
      ...product,
      name: remote?.name || product.name,
      short_description: remote?.short_description || product.subtitle,
      description: product.description,
      media_url: remote?.media_url || product.image,
    }
  })

  // Smooth scroll to a specific stage
  const handleSelectStage = useCallback((index: number) => {
    activeRef.current = index
    setActive(index)

    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const currentScrollY = window.scrollY || window.pageYOffset
    const sectionTop = rect.top + currentScrollY
    const totalScrollable = sectionRef.current.offsetHeight - window.innerHeight

    if (totalScrollable > 0) {
      // Position target scroll smoothly in the center of the targeted stage bracket
      const targetFraction = (index + 0.35) / families.length
      const targetY = sectionTop + targetFraction * totalScrollable

      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      })
    }
  }, [families.length])

  // Continuous high-precision scroll ticker with Hysteresis (0 jitter, 0 unnecessary re-renders)
  useEffect(() => {
    let animationFrameId: number

    const updateScrollMetrics = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const totalScrollable = rect.height - viewportHeight

        if (totalScrollable > 0) {
          const currentProgress = Math.max(0, Math.min(1, -rect.top / totalScrollable))

          // Hysteresis deadband buffer: completely eliminates stage flickering / jittering at boundaries
          const current = activeRef.current
          let nextStage = current

          if (current === 0) {
            if (currentProgress > 0.28) nextStage = 1
          } else if (current === 1) {
            if (currentProgress < 0.22) nextStage = 0
            else if (currentProgress > 0.53) nextStage = 2
          } else if (current === 2) {
            if (currentProgress < 0.47) nextStage = 1
            else if (currentProgress > 0.78) nextStage = 3
          } else if (current === 3) {
            if (currentProgress < 0.72) nextStage = 2
          }

          // Only trigger React state update if the stage actually transitioned
          if (nextStage !== current) {
            activeRef.current = nextStage
            setActive(nextStage)
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateScrollMetrics)
    }

    animationFrameId = requestAnimationFrame(updateScrollMetrics)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [families.length])

  return (
    <section
      ref={sectionRef}
      id="product-range"
      className="relative h-[360vh] sm:h-[400vh] w-full bg-[#f4f0e8] text-[#171717]"
    >
      {/* 
        Sticky Viewport Container:
        - h-[100svh] prevents iOS/Android address bar expand/collapse height jumping (eliminates mobile shaking)
        - pt-16 sm:pt-20: ensures full clearance below fixed header
        - pb-20 md:pb-6: reserves safe margin above mobile bottom navigation bar
      */}
      <div className="sticky top-0 h-[100svh] sm:h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-20 md:pb-6 px-4 sm:px-8 lg:px-12 max-w-[1520px] mx-auto select-none">
        
        {/* =========================================================================
            HEADER SECTION (Common for Desktop & Mobile)
        ========================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-1 sm:gap-6 shrink-0">
          <div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] text-[#171717] leading-[1.1]">
              LỰA CHỌN THEO
              <br />
              NHU CẦU SỬ DỤNG
            </h2>
          </div>
          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-[#57534e] md:text-right">
            Mỗi dòng được tinh chỉnh theo công năng, mặt bằng và vật liệu phù hợp.
          </p>
        </div>

        {/* =========================================================================
            MOBILE LAYOUT (Visible on screens < 768px, synchronized with MobileBottomNav)
        ========================================================================== */}
        <div className="flex md:hidden flex-col flex-1 justify-between min-h-0 py-1.5 gap-2">
          
          {/* Mobile Horizontal Progress Timeline */}
          <div className="shrink-0">
            <div className="flex justify-end text-[10px] font-mono font-medium text-stone-500 mb-0.5">
              0{active + 1} — 0{families.length}
            </div>
            <div className="relative mx-3">
              {/* Connecting rail */}
              <div className="absolute top-[5px] left-3 right-3 h-[1.5px] bg-stone-300" />
              {/* Progress fill (smoothly connects up to the active node) */}
              <div
                className="absolute top-[5px] left-3 h-[1.5px] bg-[#171717] transition-all duration-300 ease-out"
                style={{
                  width: `${(active / (families.length - 1)) * 100}%`,
                }}
              />
              <div className="relative flex justify-between">
                {families.map((item, idx) => {
                  const isActive = active === idx
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      aria-label={`Chọn ${item.name}`}
                      onClick={() => handleSelectStage(idx)}
                      className="w-12 flex flex-col items-center gap-1 focus:outline-none cursor-pointer"
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-[#171717] ring-4 ring-[#171717]/15 scale-110'
                            : 'border-2 border-stone-400 bg-[#f4f0e8]'
                        }`}
                      />
                      <span
                        className={`text-[10px] sm:text-[11px] transition-colors duration-200 ${
                          isActive ? 'font-bold text-[#171717]' : 'text-stone-400'
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Mobile Main Showcase Card (Hardware-accelerated) */}
          <div className="relative flex-1 min-h-[260px] max-h-[48vh] rounded-2xl overflow-hidden bg-black shadow-xl">
            {families.map((item, idx) => {
              const isActive = active === idx
              return (
                <div
                  key={item.slug}
                  className={`absolute inset-0 transform-gpu will-change-[transform,opacity] transition-opacity transition-transform duration-500 ease-out ${
                    isActive
                      ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                      : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={item.media_url}
                    alt={item.name}
                    fill
                    priority={idx === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                  {/* Upward gradient for mobile readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

                  {/* Text Overlay content */}
                  <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 flex flex-col justify-end text-white">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      DÒNG SẢN PHẨM 0{idx + 1}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                      {item.name}.
                    </h3>
                    <p className="mt-1 text-[11px] sm:text-xs text-zinc-200 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Pill tags */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full bg-white/15 border border-white/20 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-white backdrop-blur-xs"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/products/${item.slug}`}
                      className="mt-2.5 inline-flex w-full items-center justify-center rounded-full bg-white py-2 px-4 text-xs font-bold text-[#171717] shadow-md transition-transform active:scale-[0.98]"
                    >
                      <span>Xem chi tiết dòng sản phẩm</span>
                      <span className="ml-1.5" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile Thumbnails Row */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-0.5 pb-0.5 shrink-0 snap-x">
            {families.map((item, idx) => {
              const isActive = active === idx
              return (
                <button
                  key={item.slug}
                  type="button"
                  aria-label={`Thumbnail ${item.name}`}
                  onClick={() => handleSelectStage(idx)}
                  className={`relative shrink-0 w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden text-left snap-start transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'ring-2 ring-[#171717] shadow-md scale-100'
                      : 'opacity-65 scale-[0.96] hover:opacity-100'
                  }`}
                >
                  <Image
                    src={item.media_url}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 p-1.5 flex flex-col justify-end text-white">
                    <span className="text-[9px] font-mono text-zinc-300 leading-none">0{idx + 1}</span>
                    <span className="text-[11px] font-bold truncate leading-tight mt-0.5">{item.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* =========================================================================
            DESKTOP & TABLET LAYOUT (Visible on screens >= 768px)
        ========================================================================== */}
        <div className="hidden md:flex flex-col flex-1 justify-between min-h-0 py-3 xl:py-4 gap-4 xl:gap-5">
          
          {/* Main Stage Row: Left Timeline + Center/Right Showcase */}
          <div className="flex items-center gap-6 xl:gap-10 flex-1 min-h-0 relative">
            
            {/* Left Vertical Progress Timeline */}
            <div className="shrink-0 flex flex-col items-start w-28 xl:w-32 py-2">
              {/* Counter 01 / 04 */}
              <div className="flex flex-col items-center mb-6 self-start pl-1">
                <span className="text-xs font-bold text-[#171717]">0{active + 1}</span>
                <span className="w-5 h-[1.5px] bg-stone-400 my-1" />
                <span className="text-xs font-medium text-stone-500">0{families.length}</span>
              </div>

              {/* Vertical Rail */}
              <div className="relative flex flex-col gap-9 py-2 pl-1">
                {/* Background Track Line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-stone-300" />
                {/* Animated fill line */}
                <div
                  className="absolute left-[7px] top-2 w-[1.5px] bg-[#171717] transition-all duration-300 ease-out"
                  style={{
                    height: `${(active / (families.length - 1)) * 100}%`,
                  }}
                />

                {families.map((item, idx) => {
                  const isActive = active === idx
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      aria-label={`Chuyển tới ${item.name}`}
                      onClick={() => handleSelectStage(idx)}
                      className="group flex items-center gap-3.5 text-left focus:outline-none cursor-pointer"
                    >
                      <span
                        className={`relative z-10 flex items-center justify-center w-3 h-3 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-[#171717] ring-4 ring-[#171717]/15 scale-110'
                            : 'border-2 border-stone-400 bg-[#f4f0e8] group-hover:border-[#171717]'
                        }`}
                      />
                      <span
                        className={`text-xs xl:text-sm font-semibold tracking-wide transition-all duration-300 ${
                          isActive
                            ? 'text-[#171717] translate-x-1 font-bold'
                            : 'text-stone-400 group-hover:text-stone-700'
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Main Stage Showcase Card (Hardware-accelerated) */}
            <div className="relative flex-1 h-[400px] xl:h-[460px] 2xl:h-[500px] rounded-3xl overflow-hidden bg-[#e8e2d8] shadow-2xl">
              {families.map((item, idx) => {
                const isActive = active === idx
                return (
                  <div
                    key={item.slug}
                    className={`absolute inset-0 transform-gpu will-change-[transform,opacity] transition-opacity transition-transform duration-500 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                        : 'opacity-0 scale-[1.03] z-0 pointer-events-none'
                    }`}
                  >
                    {/* Background Kitchen Image */}
                    <Image
                      src={item.media_url}
                      alt={item.name}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 80vw"
                      className="object-cover"
                    />

                    {/* Right-side Soft Gradient Wash */}
                    <div className="absolute inset-y-0 right-0 w-[58%] xl:w-[52%] bg-gradient-to-r from-transparent via-[#f4f0e8]/85 to-[#f4f0e8]/98 flex flex-col justify-center p-8 xl:p-12 text-[#171717]">
                      
                      {/* Eyebrow */}
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                        DÒNG SẢN PHẨM 0{idx + 1}
                      </div>

                      {/* Large Product Name */}
                      <h3 className="mt-2 text-4xl xl:text-6xl font-extrabold tracking-[-0.05em] text-[#171717]">
                        {item.name}.
                      </h3>

                      {/* Product Description */}
                      <p className="mt-3.5 max-w-sm xl:max-w-md text-xs xl:text-sm leading-relaxed text-[#44403c] font-normal">
                        {item.description}
                      </p>

                      {/* Pill Tags */}
                      <div className="mt-5 flex flex-wrap gap-2 max-w-sm xl:max-w-md">
                        {item.specs.map((spec) => (
                          <span
                            key={spec}
                            className="rounded-full border border-stone-300/80 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-stone-800 backdrop-blur-xs shadow-xs"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="mt-6">
                        <Link
                          href={`/products/${item.slug}`}
                          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs xl:text-sm font-semibold text-[#171717] shadow-sm hover:shadow-md border border-stone-200 transition-all duration-200 hover:translate-x-1"
                        >
                          <span>Xem chi tiết dòng sản phẩm</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Desktop Bottom Product Preview Thumbnails (4 Columns) */}
          <div className="grid grid-cols-4 gap-4 xl:gap-5 shrink-0">
            {families.map((item, idx) => {
              const isActive = active === idx
              return (
                <button
                  key={item.slug}
                  type="button"
                  aria-label={`Thumbnail ${item.name}`}
                  onClick={() => handleSelectStage(idx)}
                  className={`group relative h-20 xl:h-24 rounded-2xl overflow-hidden text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'ring-2 ring-[#171717] shadow-lg scale-[1.01]'
                      : 'opacity-70 hover:opacity-100 hover:shadow-md'
                  }`}
                >
                  <Image
                    src={item.media_url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1200px) 25vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                  <div className="absolute inset-0 p-3 xl:p-3.5 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-mono text-zinc-300">0{idx + 1}</span>
                    <div className="text-sm xl:text-base font-bold text-white tracking-tight leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-zinc-300 truncate mt-0.5">
                      {item.specs[0]}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
