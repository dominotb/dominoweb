'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

function HandwritingStrokeReveal({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      <span
        className={`inline-block whitespace-nowrap transition-all duration-[1700ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible
            ? '[clip-path:inset(0_0%_0_0)] opacity-100'
            : '[clip-path:inset(0_100%_0_0)] opacity-0'
        }`}
      >
        {text}
      </span>
    </div>
  )
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2200&q=90',
    title: 'Vật liệu bền bỉ & tiêu chuẩn Châu Âu',
    subtitle: 'Nội thất tủ bếp cánh kính & khung INOX cao cấp',
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90',
    title: 'Giải pháp tối ưu không gian & công năng',
    subtitle: 'Thiết kế thông minh, tối đa hóa lưu trữ',
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2200&q=90',
    title: 'Không gian sống sang trọng & hiện đại',
    subtitle: 'Khung inox 304, kính cường lực siêu trong',
  },
]

export default function ValueSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#080808] text-white py-12 lg:py-0 min-h-screen flex flex-col justify-center"
    >
      {/* DESKTOP LAYOUT (lg and above) */}
      <div className="hidden lg:block w-full">
        <div className="w-full grid grid-cols-12 min-h-screen">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="col-span-6 xl:col-span-5 flex flex-col justify-center px-12 xl:px-20 py-10 xl:py-12 z-10">
            {/* High-Contrast Editorial Typography (THIẾT KẾ/GIÁ TRỊ Giant, dựa trên/sử dụng Small Delicate) */}
            <div className="flex flex-col -space-y-1 xl:-space-y-2 mb-5">
              <div className="hero-phrase-inner text-7xl xl:text-[105px] 2xl:text-[125px] font-black text-white uppercase leading-[0.82] tracking-tight">
                THIẾT KẾ
              </div>
              <div className="hero-phrase-inner hero-phrase-sub text-amber-200/90 italic pl-3 text-xs xl:text-sm -my-1 font-light tracking-widest">
                dựa trên
              </div>
              <div className="hero-phrase-inner text-7xl xl:text-[105px] 2xl:text-[125px] font-black text-white uppercase leading-[0.82] tracking-tight">
                GIÁ TRỊ
              </div>
              <div className="hero-phrase-inner hero-phrase-sub text-stone-300 italic pl-3 text-xs xl:text-sm -my-1 font-light tracking-widest">
                sử dụng
              </div>
            </div>

            {/* Glowing Border Beam Stats Card (2 Stats Only) */}
            <div className="glowing-card-container mb-4 max-w-lg">
              <div className="glowing-card-content p-6">
                <div className="grid grid-cols-2 divide-x divide-white/10 text-center">
                  <div className="px-4">
                    <div
                      data-motion-count="15+"
                      className="text-3xl xl:text-4xl font-bold tracking-[-0.05em] text-white"
                    >
                      15+
                    </div>
                    <div className="mt-1.5 text-[10px] xl:text-xs uppercase tracking-[0.2em] text-slate-300 font-medium">
                      NĂM KINH NGHIỆM
                    </div>
                  </div>
                  <div className="px-4">
                    <div
                      data-motion-count="98%"
                      className="text-3xl xl:text-4xl font-bold tracking-[-0.05em] text-white"
                    >
                      98%
                    </div>
                    <div className="mt-1.5 text-[10px] xl:text-xs uppercase tracking-[0.2em] text-slate-300 font-medium">
                      KHÁCH HÀNG HÀI LÒNG
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Centered 2% Question & Handwritten Font */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/12 backdrop-blur-md flex flex-col items-center justify-center text-center gap-3.5 max-w-lg shadow-xl">
              <div className="font-handwriting text-3xl xl:text-4xl font-bold text-[#E2C9A0] tracking-wide leading-tight">
                <HandwritingStrokeReveal text="Vậy 2% chưa hài lòng sao???" />
              </div>
              <a
                href="#consultation"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white text-[#171717] px-6 py-3 text-xs sm:text-sm font-bold shadow-xl transition-all duration-300 hover:bg-amber-100 hover:scale-[1.03]"
              >
                <span>TÌM HIỂU VÌ SAO</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT VISUAL COLUMN WITH DYNAMIC CURVED MASK */}
          <div
            className="col-span-6 xl:col-span-7 relative min-h-screen w-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Curved Arc Shape Overlay with Thin Razor-Sharp Light Ray */}
            <div className="absolute top-0 bottom-0 -left-1 h-full w-[260px] xl:w-[320px] pointer-events-none z-20">
              <svg className="h-full w-full fill-[#080808]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0,0 C 95,22 95,78 0,100 Z" />
              </svg>
              <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible" data-motion-reveal viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  {/* Thin Light Ray Beam Gradient - Razor Fine Core Point */}
                  <linearGradient id="thinLightRayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="30%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="46%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="49.5%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="50.5%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="54%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="70%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>

                  {/* Sharp Crisp Ray Glow Filter */}
                  <filter id="sharpRayGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.4" result="sharp" />
                    <feGaussianBlur stdDeviation="1.5" result="soft" />
                    <feMerge>
                      <feMergeNode in="soft" />
                      <feMergeNode in="sharp" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Base subtle guide line */}
                <path
                  d="M 0,0 C 88,24 88,76 0,100"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="0.5"
                />

                {/* Soft Outer Fine Halo */}
                <path
                  d="M 0,0 C 88,24 88,76 0,100"
                  fill="none"
                  stroke="url(#thinLightRayGradient)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  filter="url(#sharpRayGlowFilter)"
                  className="curved-optic-flare-line"
                />

                {/* Ultra Thin Razor-Sharp Light Ray Core */}
                <path
                  d="M 0,0 C 88,24 88,76 0,100"
                  fill="none"
                  stroke="url(#thinLightRayGradient)"
                  strokeWidth="0.55"
                  strokeLinecap="round"
                  className="curved-optic-flare-core"
                />
              </svg>
            </div>

            {/* Background Slides */}
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeSlide === idx ? 'opacity-100 z-0 scale-100' : 'opacity-0 -z-10 scale-105'
                }`}
                style={{ transitionProperty: 'opacity, transform' }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="55vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-black/20 to-transparent" />
              </div>
            ))}



            {/* FLOATING GLASS CARD */}
            <div className="absolute bottom-12 left-32 z-30 max-w-xs bg-black/60 backdrop-blur-xl border border-white/20 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 group hover:bg-black/80 transition duration-300">
              <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0 border border-white/20">
                <Image
                  src={slides[(activeSlide + 1) % slides.length].image}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/95 leading-tight group-hover:text-white transition truncate">
                  {slides[activeSlide].title}
                </div>
                <div className="text-[10px] text-white/60 truncate mt-0.5">
                  {slides[activeSlide].subtitle}
                </div>
              </div>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-black transition duration-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* CAROUSEL CONTROLS */}
            <div className="absolute bottom-12 right-12 z-30 flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Chuyển tới ảnh ${idx + 1}`}
                    className={`h-0.5 transition-all duration-300 rounded-full ${
                      activeSlide === idx ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="w-9 h-9 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="w-9 h-9 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* MOBILE LAYOUT */}
      <div className="block lg:hidden px-4 sm:px-6 pt-1 pb-4">
        
        {/* Top 2-Column Row: Left Title vs Right Image */}
        <div className="grid grid-cols-12 items-center gap-2 pt-0 pb-1">
          
          {/* Left 4-Line Headline (Tight Spacing to fit viewport) */}
          <div className="col-span-7 flex flex-col justify-center pr-1">
            <div className="flex flex-col -space-y-1">
              <div className="hero-phrase-inner text-[34px] xs:text-[38px] sm:text-5xl font-black text-white uppercase leading-[0.78] tracking-tight">
                THIẾT KẾ
              </div>
              <div className="hero-phrase-inner hero-phrase-sub text-amber-200/90 italic pl-1 text-[10px] sm:text-xs -my-0.5 font-light tracking-wider">
                dựa trên
              </div>
              <div className="hero-phrase-inner text-[34px] xs:text-[38px] sm:text-5xl font-black text-white uppercase leading-[0.78] tracking-tight">
                GIÁ TRỊ
              </div>
              <div className="hero-phrase-inner hero-phrase-sub text-stone-300 italic pl-1 text-[10px] sm:text-xs -my-0.5 font-light tracking-wider">
                sử dụng
              </div>
            </div>
          </div>

          {/* Right Kitchen Image Container */}
          <div className="col-span-5 relative h-[165px] xs:h-[185px] rounded-2xl rounded-bl-[38px] overflow-hidden shadow-2xl border border-white/12">
            <Image
              src={slides[activeSlide].image}
              alt={slides[activeSlide].title}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />


          </div>

        </div>

        {/* Glowing Animated Light Border Beam Stats Card (2 Stats Only with Banner Serif Font) */}
        <div className="glowing-card-container mt-1.5 mb-2.5">
          <div className="glowing-card-content p-3 sm:p-4">
            <div className="grid grid-cols-2 divide-x divide-white/10 text-center">
              <div className="px-2">
                <div
                  data-motion-count="15+"
                  className="text-2xl sm:text-3xl font-bold tracking-[-0.05em] text-white"
                >
                  15+
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-slate-300 font-medium">
                  NĂM KINH NGHIỆM
                </div>
              </div>
              <div className="px-2">
                <div
                  data-motion-count="98%"
                  className="text-2xl sm:text-3xl font-bold tracking-[-0.05em] text-white"
                >
                  98%
                </div>
                <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-slate-300 font-medium">
                  KHÁCH HÀNG HÀI LÒNG
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Centered 2% Question & Handwritten Font */}
        <div className="w-full mt-1.5 mb-2.5 p-3 sm:p-3.5 rounded-2xl bg-white/5 border border-white/12 backdrop-blur-md flex flex-col items-center justify-center text-center gap-2 shadow-xl">
          <div className="font-handwriting text-2xl sm:text-3xl font-bold text-[#E2C9A0] tracking-wide leading-tight">
            <HandwritingStrokeReveal text="Vậy 2% chưa hài lòng sao???" />
          </div>
          <a
            href="#consultation"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-[#171717] px-5 py-2 text-xs font-bold shadow-lg transition-all duration-300 hover:bg-amber-100 hover:scale-[1.02]"
          >
            <span>TÌM HIỂU VÌ SAO</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Bottom Horizontal Showcase Cards */}
        <div className="mt-6 mb-2">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`snap-center shrink-0 w-[86%] sm:w-[320px] rounded-2xl overflow-hidden bg-[#181818] border border-white/10 text-white shadow-2xl grid grid-cols-12 cursor-pointer transition-all duration-300 ${
                  activeSlide === idx ? 'ring-2 ring-white/30 scale-[1.01]' : 'opacity-80'
                }`}
              >
                {/* Left Text Box */}
                <div className="col-span-5 p-4 flex flex-col justify-between bg-[#181818]">
                  <div className="text-xs font-medium text-white/95 leading-snug">
                    {slide.title}
                  </div>
                  <div className="mt-4 w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                {/* Right Image */}
                <div className="col-span-7 relative h-32">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 3 Dash Pagination Lines */}
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`Chuyển tới ảnh ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? 'w-6 bg-white' : 'w-3 bg-[#333333]'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
