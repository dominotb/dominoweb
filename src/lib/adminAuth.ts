'use client'

import { supabase } from './supabaseClient'

const ADMIN_STORAGE_KEY = 'domino_admin_session'
const MASTER_EMAIL = 'admin@domino.vn'
const MASTER_PASS = 'domino2026'

export interface AdminUser {
  email: string
  role: string
  name: string
  loginAt: string
  provider: 'supabase' | 'master'
}

export function getAdminSession(): AdminUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AdminUser
  } catch {
    return null
  }
}

export async function loginAdmin(emailOrUser: string, password: string): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = emailOrUser.trim().toLowerCase()

  // 1. Check Master Admin Credentials first (allows instant local/backup access)
  if (
    (cleanEmail === 'admin' || cleanEmail === MASTER_EMAIL || cleanEmail === 'admin@domino.com') &&
    (password === MASTER_PASS || password === 'admin' || password === '123456')
  ) {
    const session: AdminUser = {
      email: MASTER_EMAIL,
      role: 'Super Admin',
      name: 'Quản trị viên DOMINO',
      loginAt: new Date().toISOString(),
      provider: 'master',
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session))
    }
    return { success: true }
  }

  // 2. Attempt Supabase Auth login if client is configured
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      })
      if (!error && data.user) {
        const session: AdminUser = {
          email: data.user.email || cleanEmail,
          role: 'Administrator',
          name: data.user.user_metadata?.full_name || 'Admin Supabase',
          loginAt: new Date().toISOString(),
          provider: 'supabase',
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session))
        }
        return { success: true }
      }
      return { success: false, error: error?.message || 'Email hoặc mật khẩu không chính xác.' }
    } catch (err: any) {
      return { success: false, error: err?.message || 'Lỗi khi kết nối xác thực Supabase.' }
    }
  }

  return {
    success: false,
    error: 'Sai thông tin đăng nhập. Gợi ý: admin@domino.vn / domino2026',
  }
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
    if (supabase) {
      supabase.auth.signOut().catch(() => {})
    }
    window.location.href = '/admin/login'
  }
}
