'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export interface SolutionItem {
  id: string
  number: string
  title: string
  description: string
  image: string
  imageAlt: string
  badge?: string
}

export const solutionsData: SolutionItem[] = [
  {
    id: '01',
    number: '01',
    title: 'Tủ bếp kính',
    description: 'Cánh kính, khung INOX 304 cao cấp, tối ưu vệ sinh, chống ẩm mốc tuyệt đối và tối đa không gian lưu trữ.',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Tủ bếp cánh kính khung INOX cao cấp DOMINO',
    badge: 'Cánh kính & Khung INOX 304',
  },
  {
    id: '02',
    number: '02',
    title: 'Phụ kiện bền bỉ',
    description: 'Hệ thống phụ kiện inox 304 nhập khẩu, chuyển động êm ái, thao tác nhẹ nhàng và dễ dàng bảo dưỡng.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Phụ kiện tủ bếp cao cấp thao tác êm ái',
    badge: 'Hệ phụ kiện inox 304 nhập khẩu',
  },
  {
    id: '03',
    number: '03',
    title: 'Tư vấn thiết kế',
    description: 'Tư vấn bố cục 1:1, giải pháp vật liệu và công năng tối ưu riêng biệt cho từng mặt bằng thực tế.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Tư vấn thiết kế kiến trúc tủ bếp theo mặt bằng',
    badge: 'Tối ưu công năng & Bố cục 1:1',
  },
  {
    id: '04',
    number: '04',
    title: 'Bảo hành rõ ràng',
    description: 'Cam kết chất lượng khung tủ 10 năm, dịch vụ bảo trì định kỳ minh bạch và hỗ trợ kỹ thuật nhanh chóng.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Chính sách bảo hành minh bạch DOMINO',
    badge: 'Cam kết chất lượng 10 năm',
  },
]

export default function SolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto rotate tabs every 6 seconds if user is not hovering
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutionsData.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section
      id="solutions"
      data-scroll-section
      className="relative w-full bg-[#121212] text-white py-16 sm:py-20 lg:py-28 border-t border-white/5 overflow-hidden"
    >
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#e2c9a0]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e2c9a0]/25 bg-[#e2c9a0]/10 text-[#e2c9a0] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e2c9a0] animate-pulse" />
            GIẢI PHÁP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight uppercase leading-[1.15]">
            GIẢI PHÁP BẾP{' '}
            <span className="text-[#e2c9a0] italic font-normal">TOÀN DIỆN</span>
          </h2>
        </div>

        {/* Main Interactive Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* LEFT COLUMN: 4 Solution Items List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Progress Bar & Counter */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
              <span className="text-xs font-mono font-medium tracking-widest text-[#e2c9a0]">
                0{activeIndex + 1} / 0{solutionsData.length}
              </span>
              <div className="w-36 sm:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#e2c9a0] to-white transition-all duration-500 ease-out"
                  style={{ width: `${((activeIndex + 1) / solutionsData.length) * 100}%` }}
                />
              </div>
            </div>

            {/* List Items */}
            {solutionsData.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group text-left p-4 sm:p-5 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-white/5 border-[#e2c9a0]/40 shadow-lg shadow-black/40 translate-x-1'
                      : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-mono text-xl sm:text-2xl font-light transition-colors duration-300 ${
                        isActive ? 'text-[#e2c9a0]' : 'text-zinc-500 group-hover:text-zinc-400'
                      }`}
                    >
                      {item.number}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-serif text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                          }`}
                        >
                          {item.title}
                        </h3>
                        {/* Indicator Arrow or Line */}
                        <div
                          className={`h-[2px] bg-[#e2c9a0] transition-all duration-300 ${
                            isActive ? 'w-8 opacity-100' : 'w-0 opacity-0'
                          }`}
                        />
                      </div>

                      {/* Expand Description smooth collapse */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
                        }`}
                      >
                        <p className="overflow-hidden text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* RIGHT COLUMN: Visual Showcase Box */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] max-h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-[#181818] shadow-2xl group">
              {solutionsData.map((item, idx) => {
                const isActive = idx === activeIndex
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      isActive
                        ? 'opacity-100 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 scale-[1.02] pointer-events-none z-0'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority={idx === 0}
                      className="object-cover object-center"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 pointer-events-none" />

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md px-4 py-2 text-xs font-medium text-white shadow-xl">
                        <span className="w-2 h-2 rounded-full bg-[#e2c9a0] animate-pulse" />
                        <span className="tracking-wider uppercase text-[11px] font-sans text-zinc-200">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Bottom Quick Select Dots for Mobile/Touch */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {solutionsData.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Step ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-6 bg-[#e2c9a0]' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
