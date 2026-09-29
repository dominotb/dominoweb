'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const items = [
  { label: 'Sản phẩm', href: '#product-range' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Bảo hành', href: '#warranty' },
  { label: 'Liên hệ', href: '#consultation' },
]

export default function StickyMiniNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav aria-label="Điều hướng nhanh" className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition duration-300 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-[#111111]/90 p-1.5 shadow-[0_18px_55px_rgba(0,0,0,0.42)] backdrop-blur-xl">
        {items.map((item) => <Link key={item.href} href={item.href} className="shrink-0 rounded-full px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white">{item.label}</Link>)}
      </div>
    </nav>
  )
}