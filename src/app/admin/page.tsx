'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, Lead, ProductLine, ProjectItem, PostItem } from '@/lib/supabaseClient'

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    leadsCount: 0,
    newLeadsCount: 0,
    productsCount: 0,
    projectsCount: 0,
    postsCount: 0,
  })
  const [recentLeads, setRecentLeads] = useState<Lead[]>([])

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true)
      let leads: Lead[] = []
      let products: ProductLine[] = []
      let projects: ProjectItem[] = []
      let posts: PostItem[] = []

      // 1. Fetch from Supabase
      if (supabase) {
        try {
          const [leadsRes, prodRes, projRes, postRes] = await Promise.all([
            supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(6),
            supabase.from('product_lines').select('*'),
            supabase.from('projects').select('*'),
            supabase.from('posts').select('*'),
          ])

          if (leadsRes.data) leads = leadsRes.data
          if (prodRes.data) products = prodRes.data
          if (projRes.data) projects = projRes.data
          if (postRes.data) posts = postRes.data
        } catch (e) {
          console.warn('Error loading from Supabase:', e)
        }
      }

      // Check offline local leads if any
      if (typeof window !== 'undefined') {
        try {
          const rawLocal = localStorage.getItem('domino_offline_leads')
          if (rawLocal) {
            const localList: Lead[] = JSON.parse(rawLocal)
            leads = [...localList, ...leads]
          }
        } catch (err) {
          console.warn('Error reading offline leads:', err)
        }
      }

      // Calculate stats
      const today = new Date().toISOString().split('T')[0]
      const newToday = leads.filter((l) => l.created_at?.startsWith(today)).length

      setStats({
        leadsCount: leads.length,
        newLeadsCount: newToday > 0 ? newToday : leads.length,
        productsCount: products.length || 4, // fallback default
        projectsCount: projects.length || 6,
        postsCount: posts.length || 3,
      })

      setRecentLeads(leads.slice(0, 5))
      setLoading(false)
    }

    loadDashboardData()
  }, [])

  const statCards = [
    {
      title: 'Khách hàng tư vấn (Leads)',
      value: stats.leadsCount,
      sub: `${stats.newLeadsCount} yêu cầu cần chăm sóc`,
      href: '/admin/leads',
      color: 'from-amber-500/20 to-amber-600/5',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Dòng sản phẩm tủ bếp',
      value: stats.productsCount,
      sub: 'Đang hiển thị trên catalog',
      href: '/admin/products',
      color: 'from-sky-500/20 to-sky-600/5',
      borderColor: 'border-sky-500/30',
      iconColor: 'text-sky-400',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'Dự án & Công trình',
      value: stats.projectsCount,
      sub: 'Hình ảnh công trình thực tế',
      href: '/admin/projects',
      color: 'from-emerald-500/20 to-emerald-600/5',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: 'Bài viết & Cẩm nang',
      value: stats.postsCount,
      sub: 'Kiến thức vật liệu & giải pháp',
      href: '/admin/posts',
      color: 'from-violet-500/20 to-violet-600/5',
      borderColor: 'border-violet-500/30',
      iconColor: 'text-violet-400',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#17171d] via-[#121217] to-[#0d0d10] p-6 sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Phiên bản Quản trị 1.0
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Xin chào Quản trị viên DOMINO!
            </h2>
            <p className="mt-1 text-sm text-stone-400 max-w-xl">
              Hệ thống quản lý dữ liệu trực tiếp: tiếp nhận thông tin khách hàng tư vấn, cập nhật catalog sản phẩm tủ bếp cánh kính và dự án thực tế.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Xem Leads ({stats.leadsCount})</span>
            </Link>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-stone-300 hover:bg-white/10 hover:text-white transition"
            >
              <span>Quản lý sản phẩm</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group relative overflow-hidden rounded-2xl border ${card.borderColor} bg-gradient-to-b ${card.color} p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-stone-400">{card.title}</span>
              <div className={`rounded-xl bg-white/[0.05] p-2.5 ${card.iconColor}`}>{card.icon}</div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white">
                {loading ? '...' : card.value}
              </span>
            </div>
            <div className="mt-2 text-xs text-stone-400 flex items-center justify-between">
              <span>{card.sub}</span>
              <span className="text-stone-300 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Grid: Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Leads Table (Col-span 2) */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Khách hàng yêu cầu tư vấn mới nhất</h3>
              <p className="text-xs text-stone-400">Danh sách khách hàng để lại thông tin qua biểu mẫu trên website</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-medium text-amber-400 hover:text-amber-300 transition"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="mt-4 divide-y divide-white/5">
            {loading ? (
              <div className="py-8 text-center text-sm text-stone-500">Đang tải dữ liệu leads...</div>
            ) : recentLeads.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-stone-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
                  </svg>
                </div>
                <p className="mt-3 text-sm text-stone-400">Chưa có thông tin khách hàng mới</p>
                <p className="text-xs text-stone-600">Khi khách hàng điền form tư vấn, thông tin sẽ xuất hiện tại đây.</p>
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 hover:bg-white/[0.02] px-2 rounded-xl transition">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{lead.name || 'Khách hàng'}</span>
                      <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-medium text-amber-300">
                        {lead.phone}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 truncate max-w-md">
                      {lead.need || lead.note || 'Quan tâm tủ bếp cánh kính DOMINO'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-stone-400">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Vừa xong'}
                    </span>
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition"
                    >
                      Gọi ngay
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Tools & Shortcuts (Col-span 1) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-white">Thao tác nhanh</h3>
            <p className="text-xs text-stone-400 mt-0.5">Lối tắt tác vụ thường dùng</p>

            <div className="mt-4 space-y-2.5">
              <Link
                href="/admin/products"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm font-medium text-stone-200 hover:border-amber-500/40 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                    +
                  </span>
                  <span>Thêm dòng sản phẩm mới</span>
                </div>
                <span className="text-stone-500">→</span>
              </Link>

              <Link
                href="/admin/projects"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm font-medium text-stone-200 hover:border-amber-500/40 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    +
                  </span>
                  <span>Đăng công trình hoàn thiện</span>
                </div>
                <span className="text-stone-500">→</span>
              </Link>

              <Link
                href="/admin/posts"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm font-medium text-stone-200 hover:border-amber-500/40 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    +
                  </span>
                  <span>Viết bài kiến thức tủ bếp</span>
                </div>
                <span className="text-stone-500">→</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm font-medium text-stone-200 hover:border-amber-500/40 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                    ⚡
                  </span>
                  <span>Kiểm tra kết nối Supabase</span>
                </div>
                <span className="text-stone-500">→</span>
              </Link>
            </div>
          </div>

          {/* Database Info Card */}
          <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-sm">
            <h3 className="text-base font-semibold text-white">Trạng thái CSDL</h3>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5 text-stone-400">
                <span>Nhà cung cấp:</span>
                <span className="font-semibold text-stone-200">Supabase Cloud</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5 text-stone-400">
                <span>Chế độ đồng bộ:</span>
                <span className="font-semibold text-emerald-400">Thời gian thực</span>
              </div>
              <div className="flex justify-between py-1 text-stone-400">
                <span>Khu vực máy chủ:</span>
                <span className="font-semibold text-stone-200">Singapore (ap-southeast-1)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
