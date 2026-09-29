import Image from 'next/image'

const showroomImage = 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85'

export default function Showroom() {
  return (
    <section id="showroom" className="relative flex min-h-[100svh] flex-col justify-center bg-[#151515] py-16 text-white md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid items-end gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div data-motion-reveal>
            <div className="eyebrow">Showroom</div>
            <h2 className="heading-clip mt-5 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">
              <span className="heading-clip-inner">TRẢI NGHIỆM VẬT LIỆU THỰC TẾ</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-zinc-300">
              Xem trực tiếp vật liệu, cấu tạo, màu sắc và thao tác mở cánh trước khi lựa chọn.
            </p>
            <a
              href="/showroom"
              className="btn-header touch-card-active mt-8 inline-flex items-center text-sm font-semibold text-white"
            >
              Đặt lịch đến showroom <span className="ml-3" aria-hidden="true">↗</span>
            </a>
          </div>

          <div
            data-motion-parallax
            className="relative min-h-[430px] overflow-hidden rounded-xl bg-[#181818] md:min-h-[600px]"
          >
            <Image
              src={showroomImage}
              alt="Không gian showroom nội thất DOMINO"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-full bg-black/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              Hà Nội · TP.HCM
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
