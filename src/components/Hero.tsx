import Image from 'next/image'
import TypewriterText from '@/components/TypewriterText'

const heroImage = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2200&q=90'

export default function Hero() {
  return (
    <section data-motion-hero className="relative isolate min-h-[100svh] overflow-hidden bg-[#080808] text-white">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Không gian bếp DOMINO với cánh kính và khung INOX"
        fill
        priority
        sizes="100vw"
        className="hero-motion-image object-cover object-center"
      />
      
      {/* Dark gradient overlay for depth */}
      <div className="hero-motion-overlay absolute inset-0 bg-gradient-to-r from-[#080808]/92 via-[#080808]/65 to-[#080808]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/20" />
      
      <div className="container relative z-10 mx-auto flex min-h-[100svh] flex-col justify-center px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 md:pb-20 md:pt-32">
        <div className="w-full max-w-5xl">
          {/* Eyebrow / Label */}
          <div className="eyebrow">DOMINO GLASS KITCHEN</div>
          
          {/* Architectural 4-Phrase Editorial Typography Composition */}
          <h1 className="hero-motion-heading hero-title-container mt-6 text-white">
            {/* Row 1: THIẾT KẾ + CHUẨN XÁC */}
            <div className="hero-title-row row-1">
              <div className="hero-phrase-unit hero-phrase-1">
                <span className="hero-phrase-inner hero-phrase-main text-white">THIẾT KẾ</span>
              </div>
              <div className="hero-phrase-unit hero-phrase-2">
                <span className="hero-phrase-inner hero-phrase-sub">CHUẨN XÁC</span>
              </div>
            </div>

            {/* Row 2: GIÁ TRỊ + DÀI HẠN */}
            <div className="hero-title-row row-2">
              <div className="hero-phrase-unit hero-phrase-3">
                <span className="hero-phrase-inner hero-phrase-main text-white">GIÁ TRỊ</span>
              </div>
              <div className="hero-phrase-unit hero-phrase-4">
                <span className="hero-phrase-inner hero-phrase-sub">DÀI HẠN</span>
              </div>
            </div>
          </h1>

          {/* Description: Typewriter text effect */}
          <div className="hero-motion-copy hero-motion-copy-wrap mt-10 md:mt-14 flex flex-col gap-8 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <TypewriterText
              text="Tủ bếp cánh kính và khung INOX, thiết kế theo công năng, vật liệu và tiêu chuẩn lắp đặt rõ ràng."
              delay={800}
              speed={25}
            />
          </div>

          {/* Statistics Container: Glowing Animated Light Border Beam */}
          <div className="hero-motion-stats hero-motion-stats-wrap mt-10 glowing-pill-container max-w-full">
            <div className="glowing-pill-content inline-flex max-w-full flex-wrap justify-center gap-x-8 gap-y-4 px-6 py-4 sm:gap-x-10">
              {[
                ['10 năm', 'bảo hành'],
                ['3.000+', 'dự án'],
                ['24/7', 'hỗ trợ'],
              ].map(([value, label]) => (
                <div key={label} className="min-w-[72px] text-center">
                  <div
                    data-motion-count={value}
                    className="text-2xl font-semibold tracking-[-0.05em] text-white md:text-3xl"
                  >
                    {value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-300">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 right-6 hidden text-[10px] uppercase tracking-[0.25em] text-white/60 md:block">
        Kéo để khám phá
      </div>
    </section>
  )
}
