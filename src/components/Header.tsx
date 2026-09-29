'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/#about' },
  { label: 'Sản phẩm', href: '/collections' },
  { label: 'Công trình', href: '/projects' },
  { label: 'Kiến thức', href: '/knowledge' },
  { label: 'Liên hệ', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
      <div className="scroll-progress-bar" />
      <div className="container mx-auto px-4 pt-[max(10px,env(safe-area-inset-top))] pb-2.5 sm:px-6 sm:py-3.5">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3" aria-label="DOMINO home">
            <div className="flex h-9 w-[130px] items-center sm:h-11 sm:w-[150px]">
              <span className="font-serif text-[1.85rem] font-bold leading-none tracking-[-0.08em] text-[#F8FAFC] sm:text-[2.15rem]">DOMINO</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors border-b-2 pb-0.5 ${
                  pathname === item.href || (item.href === '/contact' && pathname.startsWith('/contact'))
                    ? 'border-[#d4af7a] text-white'
                    : 'border-transparent text-[#94a3b8] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:0975811678" className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-[#f8fafc] shadow-sm sm:inline-flex items-center gap-1.5 hover:bg-white/10 transition">
              <span>📞</span>
              <span>0975 811 678</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#d4af7a] hover:bg-[#c59e69] px-4 py-2 text-xs sm:text-sm font-bold text-[#0f172a] shadow-lg shadow-[#d4af7a]/20 transition active:scale-95"
            >
              <span>Tư vấn ngay</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
