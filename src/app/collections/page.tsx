import Link from 'next/link'
import Image from 'next/image'
import PageIntro from '@/components/PageIntro'
import { productCatalog } from '@/data/products'

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] text-[#111827]">
      <PageIntro eyebrow="Bộ sưu tập" title="Một hệ tủ, nhiều cách sống." description="Khám phá bốn dòng tủ bếp DOMINO từ giải pháp thực dụng đến hoàn thiện cá nhân hóa. Mỗi dòng có một điểm bắt đầu rõ ràng để bạn dễ chọn hơn." action={{ label: 'Đặt lịch tư vấn', href: '/contact' }} />
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {productCatalog.map((product, index) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="group overflow-hidden rounded-[24px] border border-[#e5e7eb] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
              <div className="relative h-72 overflow-hidden">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white"><span className="text-xs uppercase tracking-[0.18em] text-white/70">0{index + 1} / 04</span><h2 className="mt-2 text-3xl font-semibold">{product.name}</h2></div>
              </div>
              <div className="p-6"><p className="text-sm leading-7 text-[#475569]">{product.description}</p><span className="mt-5 inline-flex text-sm font-semibold text-[#2563EB]">Xem dòng sản phẩm <span className="ml-2" aria-hidden="true">→</span></span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}