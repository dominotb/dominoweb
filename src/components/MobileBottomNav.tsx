'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type IconName = 'home' | 'grid' | 'building' | 'more'

function LineIcon({ name }: { name: IconName }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, viewBox: '0 0 24 24', 'aria-hidden': true }
  if (name === 'home') return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></svg>
  if (name === 'grid') return <svg {...common}><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></svg>
  if (name === 'building') return <svg {...common}><path d="M4 21V5l8-2v18" /><path d="M12 21h8V9l-8-2" /><path d="M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" /></svg>
  return <svg {...common}><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>
}

const secondaryLinks = [
  { label: 'Showroom', href: '/showroom' },
  { label: 'Giới thiệu', href: '/#about' },
  { label: 'Bảo hành', href: '/warranty' },
  { label: 'Góc chia sẻ', href: '/knowledge' },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sheetOpen])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSheetOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return <>
    {sheetOpen ? <button type="button" aria-label="Đóng bảng thêm" className="mobile-sheet-backdrop md:hidden" onClick={() => setSheetOpen(false)} /> : null}

    <aside aria-label="Các trang khác" aria-hidden={!sheetOpen} className={`mobile-more-sheet md:hidden ${sheetOpen ? 'is-open' : ''}`}>
      <div className="mobile-sheet-handle" />
      <div className="flex items-start justify-between gap-4"><div><div className="text-xs uppercase tracking-[0.18em] text-zinc-400">Khám phá DOMINO</div><h2 className="mt-2 font-serif text-3xl text-white">Thêm lựa chọn</h2></div><button type="button" aria-label="Đóng bảng thêm" onClick={() => setSheetOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-2xl text-white">×</button></div>
      <div className="mt-7 grid grid-cols-2 gap-3">{secondaryLinks.map((item) => <Link key={item.href} href={item.href} onClick={() => setSheetOpen(false)} className="flex min-h-14 items-center border border-white/12 bg-white/[0.04] px-4 text-sm text-zinc-100 transition active:bg-white/10">{item.label}<span className="ml-auto text-zinc-500" aria-hidden="true">↗</span></Link>)}</div>
      <div className="mt-5 border-t border-white/12 pt-5"><div className="text-xs uppercase tracking-[0.18em] text-zinc-500">Tư vấn trực tiếp</div><div className="mt-2 flex items-center justify-between gap-4"><a href="tel:0975811678" className="text-2xl font-medium text-white">0975.811.678</a><a href="tel:0975811678" className="flex min-h-11 items-center rounded-full bg-[#c8a06a] px-5 text-sm font-semibold text-[#111826]">Gọi ngay</a></div></div>
    </aside>

    <nav aria-label="Điều hướng mobile" className="mobile-bottom-nav md:hidden">
      <Link href="/" className={`mobile-nav-item ${isActive('/') ? 'is-active' : ''}`}><LineIcon name="home" /><span>Trang chủ</span></Link>
      <Link href="/collections" className={`mobile-nav-item ${isActive('/collections') ? 'is-active' : ''}`}><LineIcon name="grid" /><span>Bộ sưu tập</span></Link>
      <Link href="/contact" className="mobile-nav-item mobile-consult-item"><span className="mobile-consult-circle"><svg className="mobile-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6.5 4.5 9 3l2.2 4.6-2.1 1.7a14.4 14.4 0 0 0 5.1 5.1l1.7-2.1L20.5 15l-1.5 2.5a2 2 0 0 1-2.3.9C10.1 16.7 7.3 13.9 5.6 7.3a2 2 0 0 1 .9-2.3Z" /></svg></span><span>Tư vấn</span></Link>
      <Link href="/projects" className={`mobile-nav-item ${isActive('/projects') ? 'is-active' : ''}`}><LineIcon name="building" /><span>Công trình</span></Link>
      <button type="button" aria-expanded={sheetOpen} onClick={() => setSheetOpen(true)} className={`mobile-nav-item ${sheetOpen ? 'is-active' : ''}`}><LineIcon name="more" /><span>Thêm</span></button>
    </nav>
  </>
}
