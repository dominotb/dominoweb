'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { productCatalog } from '@/data/products'

type Product = { id: string; name: string; short_description?: string; media_url?: string }

export default function ProductRange({ products }: { products?: Product[] }) {
  const [active, setActive] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const families = productCatalog.map((product) => {
    const remote = products?.find((item) => item.id === product.slug)
    return {
      ...product,
      name: remote?.name || product.name,
      short_description: remote?.short_description || product.subtitle,
      media_url: remote?.media_url || product.image,
    }
  })

  // Sticky story scroll progress listener
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let ticking = false
    const onScroll = () => {
      if (userInteracted || !el) return
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const viewportHeight = window.innerHeight
          const totalScrollable = rect.height - viewportHeight
          if (totalScrollable > 0 && rect.top <= 0 && rect.bottom >= viewportHeight) {
            const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable))
            const stage = Math.min(families.length - 1, Math.floor(progress * families.length))
            setActive(stage)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [families.length, userInteracted])

  const family = families[active]

  return (
    <section
      ref={sectionRef}
      id="product-range"
      className="relative bg-[#f4f0e8] text-[#171717] py-16 sm:py-24"
    >
      <div className="flex flex-col justify-center px-4 sm:px-8">
        <div className="container mx-auto" data-motion-reveal>
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="section-header max-w-2xl">
              <div className="eyebrow">Bộ sản phẩm</div>
              <h2 className="heading-clip mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-5xl">
                <span className="heading-clip-inner">LỰA CHỌN THEO NHU CẦU SỬ DỤNG</span>
              </h2>
            </div>
            <p className="max-w-xs text-xs leading-6 text-[#57534e] sm:text-sm sm:leading-7">
              Mỗi dòng được tinh chỉnh theo công năng, mặt bằng và vật liệu phù hợp.
            </p>
          </div>

          {/* Desktop & Tablet Sticky View (lg screens) */}
          <div className="mt-8 hidden grid-cols-1 gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* Main Stage Card */}
            <div data-motion-parallax className="relative min-h-[500px] overflow-hidden rounded-xl bg-[#181818] sm:min-h-[580px]">
              <Image
                key={family.slug}
                src={family.media_url}
                alt={family.name}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                  GIAI ĐOẠN 0{active + 1} / 0{families.length}
                </div>
                <h3 className="mt-3 text-4xl font-semibold tracking-[-0.07em] sm:text-6xl text-white">
                  {family.name}
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-200 sm:text-base sm:leading-7">
                  {family.description || family.short_description}
                </p>

                {/* Specs List */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {family.specs.map((spec) => (
                    <span
                      key={spec}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/products/${family.slug}`}
                  className="btn-primary touch-card-active mt-7 inline-flex items-center text-xs font-semibold text-[#171717] sm:text-sm"
                >
                  Xem chi tiết dòng sản phẩm <span className="ml-2" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Stage Selector Tabs */}
            <div className="flex flex-col justify-center space-y-3">
              {families.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  aria-pressed={active === index}
                  onClick={() => {
                    setActive(index)
                    setUserInteracted(true)
                  }}
                  className={`touch-card-active group w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                    active === index
                      ? 'border-[#171717] bg-[#171717] text-white shadow-lg'
                      : 'border-[#c9c1b4] bg-white/40 text-[#78716c] hover:border-[#171717] hover:text-[#171717]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold tracking-widest ${active === index ? 'text-white/60' : 'text-[#171717]'}`}>
                      0{index + 1}
                    </span>
                    {active === index && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </div>
                  <div className="mt-2 text-base font-semibold">{item.name}</div>
                  <div className={`mt-1 text-xs ${active === index ? 'text-zinc-300' : 'text-[#78716c]'}`}>
                    {item.specs[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Horizontal Snap Swipe Cards (06 — PRODUCT / MATERIAL SECTION) */}
          <div className="mt-6 block lg:hidden">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar">
              {families.map((item, index) => {
                const isActiveCard = active === index
                return (
                  <div
                    key={item.slug}
                    onClick={() => {
                      setActive(index)
                      setUserInteracted(true)
                    }}
                    className={`w-[84vw] shrink-0 snap-center rounded-2xl overflow-hidden bg-[#151515] text-white transition-all duration-300 ${
                      isActiveCard ? 'scale-100 opacity-100 shadow-xl border border-white/20' : 'scale-[0.96] opacity-70 border border-transparent'
                    }`}
                  >
                    <div data-motion-parallax className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={item.media_url}
                        alt={item.name}
                        fill
                        sizes="84vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] tracking-widest text-white backdrop-blur-md">
                        0{index + 1} / 0{families.length}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
                      <p className="mt-2 text-xs leading-5 text-zinc-300 line-clamp-2">
                        {item.description || item.short_description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.specs.slice(0, 2).map((s) => (
                          <span key={s} className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
                            {s}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/products/${item.slug}`}
                        className="btn-primary touch-card-active mt-5 flex w-full items-center justify-center py-2.5 text-xs font-semibold text-[#171717]"
                      >
                        Khám phá ngay <span className="ml-1.5">→</span>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Slide indicator dots */}
            <div className="mt-3 flex justify-center gap-1.5">
              {families.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Giai đoạn ${idx + 1}`}
                  onClick={() => {
                    setActive(idx)
                    setUserInteracted(true)
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === idx ? 'w-8 bg-[#171717]' : 'w-2 bg-[#c9c1b4]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
