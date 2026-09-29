import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, getRelatedProducts } from '@/data/products'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug || 'basic')
  const related = getRelatedProducts(product.slug)

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="container mx-auto px-6 py-10 md:py-16">
        <Link href="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white">
          ← Quay lại trang chủ
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
            <div className="relative h-[420px] overflow-hidden rounded-[22px] md:h-[560px]">
              <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="eyebrow">Dòng sản phẩm</div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg text-[#d1d5db]">{product.subtitle}</p>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-300">{product.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {product.specs.map((spec: string) => (
                <span key={spec} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200">
                  {spec}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-[#111111] p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-gray-400">Điểm nổi bật</div>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                {product.highlights.map((item: string) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: product.accent }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="btn-primary focus-ring">Tư vấn ngay</Link>
              <Link href="/" className="btn-secondary focus-ring">Xem trang chủ</Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 text-2xl font-semibold tracking-[-0.05em] text-white">Khám phá thêm</div>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item: { slug: string; image: string; name: string; subtitle: string }) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="group rounded-[24px] border border-white/10 bg-[#111111] p-4 hover:border-white/20">
                <div className="relative h-48 overflow-hidden rounded-[18px]">
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-gray-300">
                    View
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-400">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
