'use client'

import Image from 'next/image'
import { useState } from 'react'

const testimonials = [
  {
    quote: 'Bếp đơn giản nhưng rất tinh tế, công năng tốt hơn mong đợi.',
    author: 'Chị Lan - Hà Nội',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=85',
  },
  {
    quote: 'Thi công đúng tiến độ, vật liệu chắc chắn và hình ảnh rất đẹp.',
    author: 'Anh Nam - TP.HCM',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85',
  },
  {
    quote: 'Cảm giác không gian sáng hơn, gọn gàng và rất dễ vệ sinh.',
    author: 'Gia đình Minh - Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
  },
]

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0)
  const item = testimonials[active]

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center bg-[#faf9f6] py-16 text-[#171717] md:py-24">
      <div className="container mx-auto px-6">
        <div data-motion-reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Khách hàng nói</div>
            <h2 className="heading-clip mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.06em] sm:text-5xl">
              <span className="heading-clip-inner">GIẢI PHÁP CHO TỪNG KHÔNG GIAN</span>
            </h2>
          </div>
          <div className="hidden text-right text-xs uppercase tracking-[0.18em] text-[#78716c] sm:block">
            0{active + 1} / 0{testimonials.length}
          </div>
        </div>

        <div data-motion-reveal className="grid overflow-hidden rounded-xl border border-[#d6d0c5] lg:grid-cols-[1.25fr_0.75fr]">
          <div data-motion-parallax className="relative min-h-[360px] overflow-hidden bg-[#181818] sm:min-h-[500px]">
            <Image
              key={item.image}
              src={item.image}
              alt="Không gian bếp của khách hàng DOMINO"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover transition-opacity duration-500"
            />
          </div>
          <div className="flex flex-col justify-between bg-[#e9e2d5] p-7 sm:p-10">
            <div>
              <div className="text-5xl font-serif text-[#171717]">“</div>
              <blockquote className="mt-5 text-2xl leading-[1.35] tracking-[-0.03em] text-[#171717] sm:text-4xl">
                {item.quote}
              </blockquote>
              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#57534e]">
                {item.author}
              </p>
            </div>
            <div className="mt-10 flex items-center gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.author}
                  type="button"
                  aria-label={`Xem đánh giá ${index + 1}`}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  className={`touch-card-active h-2 transition-all duration-300 ${
                    active === index ? 'w-12 rounded-full bg-[#171717]' : 'w-6 rounded-full bg-[#b8ad9d]'
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
