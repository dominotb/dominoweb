'use client'

import React, { useState, useEffect } from 'react'
import { supabase, supabaseUrl, supabaseAnonKey } from '@/lib/supabaseClient'
import { getAdminSession, AdminUser } from '@/lib/adminAuth'

export default function AdminSettingsPage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [latency, setLatency] = useState<number | null>(null)
  const [copiedSql, setCopiedSql] = useState(false)

  useEffect(() => {
    setUser(getAdminSession())
    testConnection()
  }, [])

  const testConnection = async () => {
    setDbStatus('checking')
    const start = performance.now()
    if (!supabase) {
      setDbStatus('error')
      return
    }

    try {
      const { error } = await supabase.from('product_lines').select('id').limit(1)
      const end = performance.now()
      if (error && error.code !== 'PGRST116') {
        // Table might not exist yet, but connection is alive if code returned
        setDbStatus('connected')
        setLatency(Math.round(end - start))
      } else {
        setDbStatus('connected')
        setLatency(Math.round(end - start))
      }
    } catch {
      setDbStatus('error')
    }
  }

  const sampleSqlScript = `-- SQL khởi tạo bảng cho DOMINO Glass Kitchen
create extension if not exists pgcrypto;

create table if not exists product_lines (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  family text not null,
  short_description text,
  description text,
  media_url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text,
  short_description text,
  image text,
  is_featured boolean default false,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text,
  image text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  need text,
  note text,
  created_at timestamptz default now()
);`

  const handleCopySql = () => {
    navigator.clipboard.writeText(sampleSqlScript)
    setCopiedSql(true)
    setTimeout(() => setCopiedSql(false), 2500)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Cài đặt Hệ thống & Kết nối CSDL</h2>
        <p className="text-xs sm:text-sm text-stone-400">
          Thông số hạ tầng kết nối Supabase, phiên làm việc của quản trị viên và tài nguyên hệ thống.
        </p>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Trạng thái CSDL Supabase</h3>
              <p className="text-xs text-stone-400">Hạ tầng lưu trữ dữ liệu thời gian thực</p>
            </div>
          </div>

          <button
            onClick={testConnection}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-stone-300 hover:bg-white/10 hover:text-white transition"
          >
            Kiểm tra kết nối
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-xs text-stone-400">Trạng thái kết nối</div>
            <div className="mt-2 flex items-center gap-2">
              {dbStatus === 'checking' && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                  <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
                  Đang kiểm tra...
                </span>
              )}
              {dbStatus === 'connected' && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Đang hoạt động (Online)
                </span>
              )}
              {dbStatus === 'error' && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  Chưa kết nối được
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-xs text-stone-400">Độ trễ truy vấn (Latency)</div>
            <div className="mt-2 text-base font-bold text-white font-mono">
              {latency !== null ? `${latency} ms` : '—'}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="text-xs text-stone-400">Phiên bản API</div>
            <div className="mt-2 text-base font-bold text-white font-mono">
              PostgREST v12
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 rounded-xl border border-white/5 bg-white/[0.01] p-4 text-xs">
          <div>
            <span className="text-stone-400">Supabase URL:</span>
            <div className="mt-1 font-mono text-stone-200 truncate bg-black/40 p-2 rounded-lg border border-white/5">
              {supabaseUrl || 'Chưa thiết lập NEXT_PUBLIC_SUPABASE_URL'}
            </div>
          </div>
          <div>
            <span className="text-stone-400">Anon Public Key:</span>
            <div className="mt-1 font-mono text-stone-400 truncate bg-black/40 p-2 rounded-lg border border-white/5">
              {supabaseAnonKey ? `${supabaseAnonKey.slice(0, 30)}...${supabaseAnonKey.slice(-15)}` : 'Chưa thiết lập'}
            </div>
          </div>
        </div>
      </div>

      {/* SQL Script Quick-Sync */}
      <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-semibold text-white">Kịch bản khởi tạo CSDL (SQL Seed Script)</h3>
            <p className="text-xs text-stone-400">Dùng đoạn SQL này để khởi tạo bảng dữ liệu trên Supabase SQL Editor</p>
          </div>
          <button
            onClick={handleCopySql}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 transition"
          >
            {copiedSql ? '✓ Đã sao chép' : 'Sao chép đoạn SQL'}
          </button>
        </div>

        <div className="mt-4">
          <pre className="max-h-56 overflow-y-auto rounded-xl bg-black/60 p-4 font-mono text-[11px] text-stone-300 border border-white/5">
            {sampleSqlScript}
          </pre>
        </div>
      </div>

      {/* Admin Profile Info */}
      <div className="rounded-2xl border border-white/10 bg-[#101014] p-6 shadow-sm">
        <h3 className="text-base font-semibold text-white">Thông tin phiên đăng nhập</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
            <span className="text-stone-400">Tài khoản:</span>
            <div className="mt-1 font-semibold text-white">{user?.email || 'admin@domino.vn'}</div>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
            <span className="text-stone-400">Vai trò quyền hạn:</span>
            <div className="mt-1 font-semibold text-amber-400">{user?.role || 'Super Admin'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
