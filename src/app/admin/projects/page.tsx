'use client'

import React, { useEffect, useState } from 'react'
import { supabase, ProjectItem } from '@/lib/supabaseClient'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null)
  const [saving, setSaving] = useState(false)

  // Form
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [image, setImage] = useState('')
  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(true)

  const loadProjects = async () => {
    setLoading(true)
    let list: ProjectItem[] = []

    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
        if (!error && data && data.length > 0) {
          list = data
        }
      } catch (err) {
        console.warn('Error fetching projects:', err)
      }
    }

    // Fallback seed projects
    if (list.length === 0) {
      list = [
        {
          id: 'proj-1',
          title: 'Biệt thự Đơn Lập Starlake Tây Hồ',
          location: 'Hà Nội',
          short_description: 'Công trình tủ bếp Inox 304 kết hợp kính cường lực xám khói, phụ kiện nâng hạ điện tử cao cấp.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          is_featured: true,
          is_published: true,
        },
        {
          id: 'proj-2',
          title: 'Penthouse Vinhomes Golden River',
          location: 'TP. Hồ Chí Minh',
          short_description: 'Hệ tủ bếp cánh kính hợp kim nhôm Anode champagne, hệ đảo bếp 4.2m đá marble tự nhiên.',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          is_featured: true,
          is_published: true,
        },
        {
          id: 'proj-3',
          title: 'Villa Nghỉ Dưỡng Flamingo Đại Lải',
          location: 'Vĩnh Phúc',
          short_description: 'Thiết kế tủ bếp mở liên thông sân vườn, chống ẩm mốc và thích ứng hoàn hảo khí hậu nhiệt đới.',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          is_featured: false,
          is_published: true,
        },
      ]
    }

    setProjects(list)
    setLoading(false)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleOpenAdd = () => {
    setEditingProject(null)
    setTitle('')
    setLocation('')
    setShortDesc('')
    setImage('')
    setIsFeatured(false)
    setIsPublished(true)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (p: ProjectItem) => {
    setEditingProject(p)
    setTitle(p.title)
    setLocation(p.location || '')
    setShortDesc(p.short_description || '')
    setImage(p.image || '')
    setIsFeatured(p.is_featured ?? false)
    setIsPublished(p.is_published ?? true)
    setIsModalOpen(true)
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      title,
      location,
      short_description: shortDesc,
      image,
      is_featured: isFeatured,
      is_published: isPublished,
    }

    if (editingProject) {
      if (supabase && !editingProject.id.startsWith('proj-')) {
        try {
          await supabase.from('projects').update(payload).eq('id', editingProject.id)
        } catch (e) {
          console.warn('Update project error:', e)
        }
      }
      setProjects((prev) =>
        prev.map((item) => (item.id === editingProject.id ? { ...item, ...payload } : item))
      )
    } else {
      const newProj: ProjectItem = {
        id: 'proj-' + Date.now(),
        ...payload,
        created_at: new Date().toISOString(),
      }

      if (supabase) {
        try {
          const { data } = await supabase.from('projects').insert([payload]).select()
          if (data && data[0]) {
            newProj.id = data[0].id
          }
        } catch (e) {
          console.warn('Insert proj error:', e)
        }
      }
      setProjects([newProj, ...projects])
    }

    setSaving(false)
    setIsModalOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá công trình này?')) return

    if (supabase && !id.startsWith('proj-')) {
      try {
        await supabase.from('projects').delete().eq('id', id)
      } catch (e) {
        console.warn('Delete project error:', e)
      }
    }

    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Quản lý Công trình Thi công</h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Hình ảnh các dự án thực tế đã bàn giao để khách hàng tham khảo chất lượng hoàn thiện.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Thêm công trình</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101014] p-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tên công trình, địa điểm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-xs text-white placeholder:text-stone-500 focus:border-amber-500/50 focus:outline-none"
          />
        </div>
        <div className="text-xs text-stone-400">
          Tổng số: <strong className="text-white">{filtered.length}</strong> công trình
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-16 text-center text-stone-500">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            <p className="mt-2 text-xs">Đang tải danh sách công trình...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-stone-500">
            Không tìm thấy công trình nào.
          </div>
        ) : (
          filtered.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-sm hover:border-white/20 transition"
            >
              <div>
                <div className="relative h-48 w-full bg-stone-900 overflow-hidden">
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-stone-600">
                      Chưa có hình ảnh
                    </div>
                  )}

                  {proj.location && (
                    <span className="absolute top-3 left-3 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-stone-300 border border-white/10">
                      📍 {proj.location}
                    </span>
                  )}

                  {proj.is_featured && (
                    <span className="absolute top-3 right-3 rounded-md bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-black shadow">
                      ★ Tiêu biểu
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-white tracking-tight">{proj.title}</h3>
                  <p className="mt-2 text-xs text-stone-400 line-clamp-3 leading-relaxed">
                    {proj.short_description || 'Chưa có mô tả công trình.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.01] p-4">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-stone-300 hover:bg-white/10 hover:text-white transition"
                >
                  Sửa thông tin
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="rounded-lg p-1.5 text-stone-500 hover:bg-rose-500/10 hover:text-rose-400 transition"
                  title="Xoá công trình"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#141419] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">
                {editingProject ? 'Chỉnh sửa công trình' : 'Thêm công trình thực tế'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Tên công trình / Dự án *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Biệt thự Starlake Tây Hồ"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Địa điểm / Khu đô thị</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Hà Nội, Quảng Ninh, TP.HCM..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">URL Hình ảnh công trình</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://... hoặc /projects/..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Mô tả đặc điểm thi công</label>
                <textarea
                  rows={3}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Hệ tủ Inox cánh kính viền đen, phụ kiện Blum, mặt đá nhân tạo..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="proj-featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  <label htmlFor="proj-featured" className="text-xs text-stone-300">
                    Dự án tiêu biểu (Ghim đầu trang)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="proj-publish"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 rounded accent-amber-500"
                  />
                  <label htmlFor="proj-publish" className="text-xs text-stone-300">
                    Hiển thị công khai
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-stone-400 hover:bg-white/5"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-black hover:bg-amber-400"
                >
                  {saving ? 'Đang lưu...' : 'Lưu công trình'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
