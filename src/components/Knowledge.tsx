import Image from 'next/image'

const images = [
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85',
]

export default function Knowledge({ posts }: { posts?: any[] }) {
  const items = posts && posts.length ? posts : [
    { id: 'a1', title: 'Vật liệu kính trong tủ bếp hiện đại' },
    { id: 'a2', title: 'Kinh nghiệm lựa chọn phụ kiện bền bỉ' },
    { id: 'a3', title: 'Hướng dẫn bảo hành & chăm sóc tủ bếp' },
  ]

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center bg-[#151515] py-16 text-white md:py-24">
      <div className="container mx-auto px-6">
        <div data-motion-reveal className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="eyebrow">Knowledge</div>
            <h2 className="heading-clip mt-5 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
              <span className="heading-clip-inner">GÓC NHÌN CHUYÊN MÔN</span>
            </h2>
          </div>
          <a href="/knowledge" className="btn-header touch-card-active text-sm font-medium text-white">
            Đọc tất cả bài viết <span className="ml-1" aria-hidden="true">↗</span>
          </a>
        </div>

        <div data-motion-line className="my-6 h-px w-full bg-white opacity-15" />

        <div className="mt-8 divide-y divide-white/15">
          {items.map((item, index) => (
            <article
              key={item.id}
              data-motion-reveal
              className="touch-card-active group grid gap-5 py-7 md:grid-cols-[110px_220px_1fr_auto] md:items-center"
            >
              <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                0{index + 1}
              </div>
              <div data-motion-parallax className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#181818]">
                <Image
                  src={images[index % images.length]}
                  alt={item.title}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-medium tracking-[-0.03em] text-white transition-colors group-hover:text-[#e2c9a0] sm:text-2xl">
                {item.title}
              </h3>
              <span className="inline-flex items-center text-sm font-medium text-zinc-300 group-hover:text-white">
                Đọc thêm <span className="ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
