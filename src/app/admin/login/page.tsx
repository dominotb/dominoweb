'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginAdmin } from '@/lib/adminAuth'
import { supabaseUrl } from '@/lib/supabaseClient'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await loginAdmin(email, password)
      if (res.success) {
        router.push('/admin')
      } else {
        setError(res.error || 'Đăng nhập không thành công.')
      }
    } catch {
      setError('Đã xảy ra lỗi hệ thống khi kết nối.')
    } finally {
      setLoading(false)
    }
  }

  const fillQuickAccess = () => {
    setEmail('admin@domino.vn')
    setPassword('domino2026')
    setError(null)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-4 py-12">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-amber-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-[400px] w-[500px] rounded-full bg-yellow-600/5 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Brand identity badge */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 font-bold text-black text-2xl shadow-xl shadow-amber-500/20">
            D
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">DOMINO Control Center</h1>
          <p className="mt-1 text-sm text-stone-400">Đăng nhập quyền Quản trị viên website</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-[#121216]/90 p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-xs text-rose-300 flex items-start gap-2.5">
              <svg className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5" htmlFor="admin-email">
                Tài khoản hoặc Email
              </label>
              <input
                id="admin-email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domino.vn"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-stone-600 focus:border-amber-500/60 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-amber-500/60 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400" htmlFor="admin-pass">
                  Mật khẩu
                </label>
              </div>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-stone-600 focus:border-amber-500/60 focus:bg-white/[0.07] focus:outline-none focus:ring-1 focus:ring-amber-500/60 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 active:scale-[0.99] disabled:opacity-50 transition"
            >
              {loading ? 'Đang xác thực...' : 'Đăng nhập vào Hệ thống'}
            </button>
          </form>

          {/* Quick Access Helper */}
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-amber-300">Tài khoản Quản trị mặc định:</div>
              <button
                type="button"
                onClick={fillQuickAccess}
                className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/30 transition"
              >
                Tự động điền
              </button>
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-stone-400">
              User: <span className="text-stone-300">admin@domino.vn</span> | Pass: <span className="text-stone-300">domino2026</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-stone-400 border-t border-white/5 pt-4">
            <Link href="/" className="hover:text-amber-400 transition flex items-center gap-1">
              ← Trở về Website
            </Link>
            <div className="flex items-center gap-1.5" title={supabaseUrl}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Supabase Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
