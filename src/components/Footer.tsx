'use client'

import Link from 'next/link'
import React, { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="border-t border-white/10 bg-[#07090e] text-[#94a3b8]">
      <div className="container mx-auto grid gap-10 px-6 py-14 lg:grid-cols-12 lg:gap-8">
        
        {/* Column 1: Brand info & Socials */}
        <div className="lg:col-span-3">
          <div>
            <span className="font-logo text-[2.2rem] font-bold tracking-tight text-white">DOMINO</span>
            <div className="text-[0.65rem] uppercase tracking-[0.45em] text-[#d4af7a] -mt-1 font-medium">glass kitchen</div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#94a3b8]">
            Thiết kế, sản xuất và lắp đặt tủ bếp hiện đại với phong cách tối giản, bền vững và đậm dấu ấn riêng.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.facebook.com/tubepdominothaibinh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white transition hover:border-[#d4af7a] hover:bg-[#d4af7a] hover:text-[#0f172a]"
            >
              f
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white transition hover:border-[#d4af7a] hover:bg-[#d4af7a] hover:text-[#0f172a]"
            >
              ▶
            </a>
            <a
              href="https://www.tiktok.com/@tubep.domino.tb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white transition hover:border-[#d4af7a] hover:bg-[#d4af7a] hover:text-[#0f172a]"
            >
              ♪
            </a>
            <a
              href="https://zalo.me/0975811678"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-white transition hover:border-[#d4af7a] hover:bg-[#d4af7a] hover:text-[#0f172a]"
            >
              Zalo
            </a>
          </div>
        </div>

        {/* Column 2: MENU */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">MENU</h3>
          <div className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
            <Link href="/" className="hover:text-white transition">Trang chủ</Link>
            <Link href="/knowledge" className="hover:text-white transition">Kiến thức</Link>
            <Link href="/collections" className="hover:text-white transition">Sản phẩm</Link>
            <Link href="/#about" className="hover:text-white transition">Giới thiệu</Link>
            <Link href="/projects" className="hover:text-white transition">Công trình</Link>
            <Link href="/contact" className="hover:text-white transition">Liên hệ</Link>
          </div>
        </div>

        {/* Column 3: THÔNG TIN LIÊN HỆ */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">THÔNG TIN LIÊN HỆ</h3>
          <ul className="mt-4 space-y-3 text-xs leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="text-[#d4af7a]">📞</span>
              <span className="font-semibold text-white">0975 811 678 - 0964 811 678</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#d4af7a]">✉️</span>
              <a href="mailto:dominoxdsx062025@gmail.com" className="hover:text-white transition truncate">
                dominoxdsx062025@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4af7a] mt-0.5">📍</span>
              <span>Lô 5,6, Khu TDC DC1 Phường Trà Lý, Tỉnh Hưng Yên</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#d4af7a]">🕒</span>
              <span>Thứ 2 - Chủ nhật | 8:00 - 18:00</span>
            </li>
          </ul>
        </div>

        {/* Column 4: ĐĂNG KÝ NHẬN THÔNG TIN */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">ĐĂNG KÝ NHẬN THÔNG TIN</h3>
          <p className="mt-4 text-xs leading-relaxed text-[#94a3b8]">
            Cập nhật công trình, kiến thức và ưu đãi mới nhất từ DOMINO.
          </p>

          <form onSubmit={handleSubscribe} className="mt-4 flex items-center rounded-xl border border-white/15 bg-white/5 p-1 transition focus-within:border-[#d4af7a]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-8 w-9 shrink-0 items-center justify-center rounded-lg bg-[#d4af7a] text-[#0f172a] transition hover:bg-[#c59e69]"
              title="Đăng ký"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>

          {subscribed && (
            <p className="mt-2 text-[11px] text-emerald-400">✓ Đăng ký nhận thông tin thành công!</p>
          )}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#05070a]">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-4 text-[11px] text-slate-500 sm:flex-row">
          <span>© 2026 DOMINO. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="#" className="hover:text-white transition">Chính sách bảo mật</Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition">Điều khoản sử dụng</Link>
            <span>|</span>
            <span>Thiết kế & Thi công tủ bếp kính cao cấp.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
