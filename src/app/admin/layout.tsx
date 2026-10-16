'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { getAdminSession, logoutAdmin, AdminUser } from '@/lib/adminAuth'
import { supabaseUrl } from '@/lib/supabaseClient'

interface NavItem {
  name: string
  href: string
  icon: string
  badge?: string
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const session = getAdminSession()
    if (!session && !isLoginPage) {
      router.push('/admin/login')
    } else {
      setUser(session)
    }
    setLoading(false)
  }, [pathname, isLoginPage, router])

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#080808] text-white selection:bg-amber-500 selection:text-black">{children}</div>
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808] text-stone-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="text-sm font-medium tracking-wider uppercase text-stone-500">Đang khởi tạo phiên quản trị...</p>
        </div>
      </div>
    )
  }

  const navLinks: NavItem[] = [
    {
      name: 'Tổng quan',
      href: '/admin',
      icon: 'grid',
    },
    {
      name: 'Khách hàng tư vấn',
      href: '/admin/leads',
      icon: 'inbox',
      badge: 'Leads',
    },
    {
      name: 'Dòng sản phẩm',
      href: '/admin/products',
      icon: 'cube',
    },
    {
      name: 'Công trình thi công',
      href: '/admin/projects',
      icon: 'building',
    },
    {
      name: 'Bài viết & Cẩm nang',
      href: '/admin/posts',
      icon: 'newspaper',
    },
    {
      name: 'Cài đặt & Hệ thống',
      href: '/admin/settings',
      icon: 'cog',
    },
  ]

  const renderIcon = (name: string) => {
    const props = { className: 'w-5 h-5 transition-transform duration-200', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8 }
    switch (name) {
      case 'grid':
        return (
          <svg {...props}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        )
      case 'inbox':
        return (
          <svg {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
          </svg>
        )
      case 'cube':
        return (
          <svg {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
      case 'building':
        return (
          <svg {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'newspaper':
        return (
          <svg {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        )
      case 'cog':
        return (
          <svg {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] flex antialiased selection:bg-amber-500 selection:text-black">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#0f0f12] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-18 items-center justify-between border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 font-bold text-black shadow-lg shadow-amber-500/20">
              D
            </div>
            <div>
              <div className="font-semibold tracking-wider text-white text-base">DOMINO</div>
              <div className="text-[10px] tracking-widest uppercase text-amber-400/90 font-medium">Control Center</div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Database Status Pill */}
        <div className="mx-4 mt-4 rounded-xl border border-white/8 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-stone-300">Supabase DB</span>
            </div>
            <span className="rounded bg-emerald-950/70 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
              Live
            </span>
          </div>
          <div className="mt-1.5 truncate text-[11px] text-stone-400" title={supabaseUrl}>
            {supabaseUrl ? supabaseUrl.replace('https://', '') : 'Chưa cấu hình URL'}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 flex-1 space-y-1 px-3 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            Quản trị nội dung
          </div>
          {navLinks.map((item) => {
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-sm'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${active ? 'text-amber-400' : 'text-stone-400 group-hover:text-stone-200'}`}>
                    {renderIcon(item.icon)}
                  </span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3 border border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400 border border-amber-500/30">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="min-w-0 truncate">
                <div className="truncate text-xs font-semibold text-white">{user?.name || 'Administrator'}</div>
                <div className="truncate text-[10px] text-stone-400">{user?.email || 'admin@domino.vn'}</div>
              </div>
            </div>
            <button
              onClick={logoutAdmin}
              title="Đăng xuất"
              className="rounded-lg p-1.5 text-stone-400 hover:bg-rose-500/10 hover:text-rose-400 transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Body */}
      <div className="flex flex-1 flex-col lg:pl-72 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-white/10 bg-[#09090b]/90 backdrop-blur-md px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-stone-400 hover:bg-white/5 hover:text-white lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-400 font-mono">Bảng điều khiển</div>
              <h1 className="text-base sm:text-lg font-semibold text-white tracking-tight">Hệ thống Quản lý DOMINO</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:bg-white/10 hover:text-white transition"
            >
              <span>Xem Website</span>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition"
            >
              <span>Thoát</span>
            </button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
