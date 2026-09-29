import Image from 'next/image'

export default function Projects({ projects }: { projects?: any[] }) {
  const list = projects && projects.length ? projects : [
    { id: 'p1', title: 'Biệt Thự Vườn Thái Bình', location: 'Thái Bình', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85', tag: 'Dòng Kính INOX Premium' },
    { id: 'p2', title: 'Penthouse Heritage Hà Nội', location: 'Hà Nội', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=85', tag: 'Dòng Kính Khung Nhôm' },
    { id: 'p3', title: 'Villa Thảo Điền TP.HCM', location: 'TP.HCM', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85', tag: 'Bếp Đảo Quầy Bar' },
    { id: 'p4', title: 'Căn Hộ Panorama Đà Nẵng', location: 'Đà Nẵng', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=85', tag: 'Tủ Bếp Cánh Kính' },
  ]

  return (
    <section id="projects" className="relative flex min-h-[100svh] flex-col justify-center bg-[#faf9f6] py-16 text-[#171717] md:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div data-motion-reveal className="flex flex-col justify-between gap-6 border-b border-[#d6d0c5] pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="eyebrow">Selected projects</div>
            <h2 className="heading-clip mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">
              <span className="heading-clip-inner">CÔNG TRÌNH ĐÃ HOÀN THIỆN</span>
            </h2>
          </div>
          <a href="/projects" className="btn-secondary touch-card-active text-sm font-medium">
            Xem tất cả công trình <span className="ml-1" aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Decorative Progress Divider */}
        <div data-motion-line className="my-8 h-px bg-[#171717] opacity-20" />

        {/* Editorial Mobile & Desktop Grid Layout */}
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-start">
          {list.map((project, index) => {
            const spanClass =
              index === 0
                ? 'md:col-span-7'
                : index === 3
                ? 'md:col-span-3'
                : 'md:col-span-5'
            const aspectClass =
              index === 0
                ? 'aspect-[4/5] md:aspect-[4/3]'
                : index === 3
                ? 'aspect-[3/5]'
                : 'aspect-[4/3] md:mt-16'

            return (
              <article
                key={project.id}
                data-motion-reveal
                className={`${spanClass} group touch-card-active rounded-xl overflow-hidden`}
              >
                {/* Image Container with Subtle Parallax */}
                <div data-motion-parallax className={`relative ${aspectClass} overflow-hidden rounded-xl bg-[#181818]`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  
                  {/* Location badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                    {project.location}
                  </div>

                  {/* Caption revealed with slight delay */}
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white transition-transform duration-300 group-hover:translate-y-[-2px]">
                    <div>
                      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                        {project.tag}
                      </div>
                      <h3 className="mt-1 text-xl font-medium tracking-tight text-white sm:text-2xl">
                        {project.title}
                      </h3>
                    </div>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#171717]"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
