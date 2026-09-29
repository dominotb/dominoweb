import Hero from '@/components/Hero'
import ValueSection from '@/components/ValueSection'
import SolutionsSection from '@/components/SolutionsSection'
import ProductRange from '@/components/ProductRange'
import Warranty from '@/components/Warranty'
import Process from '@/components/Process'
import Projects from '@/components/Projects'
import Showroom from '@/components/Showroom'
import Knowledge from '@/components/Knowledge'
import Consultation from '@/components/Consultation'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { fetchHomepageData } from '@/lib/supabaseClient'

export default async function Home() {
  const { products, warranties, projects, posts } = await fetchHomepageData()

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Section 1: Hero Banner */}
      <div data-scroll-section className="w-full">
        <Hero />
      </div>

      {/* Section 2: Value Editorial Showcase */}
      <div data-scroll-section className="w-full">
        <ValueSection />
      </div>

      {/* Section 3: Solutions Pinned Scroll Storytelling Section */}
      <SolutionsSection />

      {/* Section 4: Product Range */}
      <div data-scroll-section className="w-full">
        <ProductRange products={products} />
      </div>

      {/* Section 5: Why DOMINO / Craftsmanship Section */}
      <section data-scroll-section className="relative flex min-h-[100svh] flex-col justify-center bg-[#080808] py-16 text-white md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div data-motion-reveal>
              <div className="eyebrow">Tại sao chọn DOMINO</div>
              <h2 className="heading-clip mt-5 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
                <span className="heading-clip-inner">CHẤT LƯỢNG TRONG TỪNG CHI TIẾT</span>
              </h2>
            </div>
            <div data-motion-reveal>
              <div data-motion-line className="mb-8 h-px w-full bg-white opacity-20" />
              <div className="grid grid-cols-3 gap-5">
                {[
                  ['10 năm', 'bảo hành khung'],
                  ['1:1', 'tư vấn không gian'],
                  ['24/7', 'hỗ trợ khách hàng'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div
                      data-motion-count={value}
                      className="text-3xl font-semibold tracking-[-0.06em] text-white sm:text-5xl"
                    >
                      {value}
                    </div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Warranty */}
      <div data-scroll-section className="w-full">
        <Warranty warranties={warranties} />
      </div>

      {/* Section 7: Process */}
      <div data-scroll-section className="w-full">
        <Process />
      </div>

      {/* Section 8: Projects */}
      <div data-scroll-section className="w-full">
        <Projects projects={projects} />
      </div>

      {/* Section 9: Showroom */}
      <div data-scroll-section className="w-full">
        <Showroom />
      </div>

      {/* Section 10: Testimonials */}
      <div data-scroll-section className="w-full">
        <TestimonialCarousel />
      </div>

      {/* Section 11: Knowledge */}
      <div data-scroll-section className="w-full">
        <Knowledge posts={posts} />
      </div>

      {/* Section 12: Consultation */}
      <div data-scroll-section className="w-full">
        <Consultation />
      </div>
    </main>
  )
}
