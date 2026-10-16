import { createClient } from '@supabase/supabase-js'

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fzayamxtakmxjskxyugg.supabase.co'
export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6YXlhbXh0YWtteGpza3h5dWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MTkxNDIsImV4cCI6MjEwNjQ5NTE0Mn0.ZQIS2j23cOhYzCklL1yQxO4KldzEUyUMIllyWimMIG8'

// Always initialize supabase client with the valid endpoint
export const supabase: any = createClient(supabaseUrl, supabaseAnonKey)

export interface Lead {
  id: string
  name: string
  phone: string
  need?: string
  note?: string
  status?: 'new' | 'contacted' | 'survey' | 'deal' | 'cancelled'
  created_at: string
}

export interface ProductLine {
  id: string
  name: string
  slug: string
  family: string
  short_description?: string
  description?: string
  media_url?: string
  is_published?: boolean
  created_at?: string
}

export interface ProjectItem {
  id: string
  title: string
  location?: string
  short_description?: string
  image?: string
  is_featured?: boolean
  is_published?: boolean
  created_at?: string
}

export interface PostItem {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  category?: string
  image?: string
  is_published?: boolean
  created_at?: string
}

// Server helper to fetch homepage data (use in Server Components)
export async function fetchHomepageData() {
  if (!supabase) return { products: [], warranties: [], projects: [], posts: [] }

  const [{ data: products }, { data: warranties }, { data: projects }, { data: posts }] = await Promise.all([
    supabase.from('product_lines').select('*').limit(8),
    supabase.from('warranty_policies').select('*'),
    supabase.from('projects').select('*').limit(3),
    supabase.from('posts').select('*').limit(3),
  ])

  return {
    products: products || [],
    warranties: warranties || [],
    projects: projects || [],
    posts: posts || [],
  }
}

// Helper to submit a consultation lead from public site
export async function submitLead(lead: { name: string; phone: string; need?: string; note?: string }) {
  if (!supabase) {
    // If Supabase not connected, save in local fallback
    saveLocalLead(lead)
    return { success: true, localOnly: true }
  }

  try {
    const { data, error } = await supabase.from('leads').insert([
      {
        name: lead.name,
        phone: lead.phone,
        need: lead.need || '',
        note: lead.note || 'Mới gửi từ website',
      },
    ])
    if (error) {
      console.error('Error inserting lead to Supabase:', error)
      saveLocalLead(lead)
      return { success: true, localOnly: true, error: error.message }
    }
    return { success: true, data }
  } catch (err: any) {
    console.error('Exception inserting lead:', err)
    saveLocalLead(lead)
    return { success: true, localOnly: true }
  }
}

function saveLocalLead(lead: any) {
  if (typeof window === 'undefined') return
  try {
    const raw = localStorage.getItem('domino_offline_leads') || '[]'
    const list = JSON.parse(raw)
    list.unshift({
      id: 'local-' + Date.now(),
      name: lead.name,
      phone: lead.phone,
      need: lead.need || '',
      note: lead.note || 'Lưu bộ nhớ tạm (Chưa đồng bộ DB)',
      status: 'new',
      created_at: new Date().toISOString(),
    })
    localStorage.setItem('domino_offline_leads', JSON.stringify(list))
  } catch (e) {
    console.warn('Could not save local lead', e)
  }
}
