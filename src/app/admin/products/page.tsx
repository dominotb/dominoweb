'use client'

import React, { useEffect, useState } from 'react'
import { supabase, ProductLine } from '@/lib/supabaseClient'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductLine[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductLine | null>(null)
  const [saving, setSaving] = useState(false)

  // Form states
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [family, setFamily] = useState('Inox cánh kính')
  const [shortDesc, setShortDesc] = useState('')
  const [desc, setDesc] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [isPublished, setIsPublished] = useState(true)

  const loadProducts = async () => {
    setLoading(true)
    let list: ProductLine[] = []

    if (supabase) {
      try {
        const { data, error } = await supabase.from('product_lines').select('*').order('created_at', { ascending: false })
        if (!error && data && data.length > 0) {
          list = data
        }
      } catch (err) {
        console.warn('Error fetching product_lines:', err)
      }
    }

    // Fallback seed items if database empty
    if (list.length === 0) {
      list = [
        {
          id: 'prod-1',
          name: 'DOMINO Inox Grand Luxury',
          slug: 'inox-grand-luxury',
          family: 'Inox cánh kính',
          short_description: 'Thùng tủ Inox 304 nguyên khối chấn gập CNC không mối hàn, cánh kính cường lực viền nhôm Anode.',
          description: 'Giải pháp tủ bếp cao cấp bậc nhất, vĩnh cửu với thời gian, chống nước và mối mọt tuyệt đối.',
          media_url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          is_published: true,
        },
        {
          id: 'prod-2',
          name: 'DOMINO Slimline Anode Black',
          slug: 'slimline-anode-black',
          family: 'Hợp kim nhôm Anode',
          short_description: 'Hệ cánh kính siêu mỏng kết hợp hợp kim nhôm Anode hóa bề mặt chống xước tối đa.',
          description: 'Phong cách tối giản đương đại, đóng mở êm ái với bản lề giảm chấn Blum & Hafele.',
          media_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
          is_published: true,
        },
        {
          id: 'prod-3',
          name: 'DOMINO Smart Island Module',
          slug: 'smart-island-module',
          family: 'Đảo bếp thông minh',
          short_description: 'Hệ đảo bếp kết hợp bàn ăn mở rộng và ray trượt âm đa năng, tích hợp ổ cắm pop-up.',
          description: 'Tối ưu không gian sinh hoạt chung, liên kết liền mạch giữa phòng bếp và phòng khách.',
          media_url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
          is_published: true,
        },
      ]
    }

    setProducts(list)
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleOpenAdd = () => {
    setEditingProduct(null)
    setName('')
    setSlug('')
    setFamily('Inox cánh kính')
    setShortDesc('')
    setDesc('')
    setMediaUrl('')
    setIsPublished(true)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (p: ProductLine) => {
    setEditingProduct(p)
    setName(p.name)
    setSlug(p.slug)
    setFamily(p.family)
    setShortDesc(p.short_description || '')
    setDesc(p.description || '')
    setMediaUrl(p.media_url || '')
    setIsPublished(p.is_published ?? true)
    setIsModalOpen(true)
  }

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (val: string) => {
    setName(val)
    if (!editingProduct) {
      setSlug(generateSlug(val))
    }
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name,
      slug: slug || generateSlug(name),
      family,
      short_description: shortDesc,
      description: desc,
      media_url: mediaUrl,
      is_published: isPublished,
    }

    if (editingProduct) {
      // Update
      if (supabase && !editingProduct.id.startsWith('prod-')) {
        try {
          await supabase.from('product_lines').update(payload).eq('id', editingProduct.id)
        } catch (e) {
          console.warn('Update prod error:', e)
        }
      }
      setProducts((prev) =>
        prev.map((item) => (item.id === editingProduct.id ? { ...item, ...payload } : item))
      )
    } else {
      // Create
      const newProd: ProductLine = {
        id: 'prod-' + Date.now(),
        ...payload,
        created_at: new Date().toISOString(),
      }

      if (supabase) {
        try {
          const { data } = await supabase.from('product_lines').insert([payload]).select()
          if (data && data[0]) {
            newProd.id = data[0].id
          }
        } catch (e) {
          console.warn('Insert prod error:', e)
        }
      }
      setProducts([newProd, ...products])
    }

    setSaving(false)
    setIsModalOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá dòng sản phẩm này?')) return

    if (supabase && !id.startsWith('prod-')) {
      try {
        await supabase.from('product_lines').delete().eq('id', id)
      } catch (e) {
        console.warn('Delete prod error:', e)
      }
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const togglePublish = async (p: ProductLine) => {
    const nextState = !p.is_published
    if (supabase && !p.id.startsWith('prod-')) {
      try {
        await supabase.from('product_lines').update({ is_published: nextState }).eq('id', p.id)
      } catch (err) {
        console.warn('Toggle publish error:', err)
      }
    }
    setProducts((prev) =>
      prev.map((item) => (item.id === p.id ? { ...item, is_published: nextState } : item))
    )
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.family.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Quản lý Dòng sản phẩm (Catalog)</h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Các dòng tủ bếp cánh kính hiển thị tại trang chủ và danh mục sản phẩm DOMINO.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Thêm dòng sản phẩm</span>
        </button>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101014] p-4">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo tên dòng sản phẩm, phân khúc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-xs text-white placeholder:text-stone-500 focus:border-amber-500/50 focus:outline-none"
          />
        </div>
        <div className="text-xs text-stone-400">
          Tổng cộng: <strong className="text-white">{filtered.length}</strong> sản phẩm
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-16 text-center text-stone-500">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            <p className="mt-2 text-xs">Đang tải danh mục sản phẩm...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-stone-500">
            Không tìm thấy sản phẩm nào.
          </div>
        ) : (
          filtered.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-sm hover:border-white/20 transition"
            >
              <div>
                {/* Image preview */}
                <div className="relative h-44 w-full bg-stone-900 overflow-hidden">
                  {prod.media_url ? (
                    <img
                      src={prod.media_url}
                      alt={prod.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-stone-600">
                      Chưa có hình ảnh
                    </div>
                  )}
                  <span className="absolute top-3 left-3 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-white/10">
                    {prod.family}
                  </span>
                  <button
                    onClick={() => togglePublish(prod)}
                    className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold backdrop-blur-md transition ${
                      prod.is_published
                        ? 'bg-emerald-500/80 text-white'
                        : 'bg-stone-800/80 text-stone-400'
                    }`}
                  >
                    {prod.is_published ? 'Hiển thị' : 'Ẩn'}
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-white tracking-tight">{prod.name}</h3>
                  <div className="mt-1 font-mono text-[10px] text-stone-500">/{prod.slug}</div>
                  <p className="mt-2.5 text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {prod.short_description || prod.description || 'Chưa có mô tả'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.01] p-4">
                <button
                  onClick={() => handleOpenEdit(prod)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-stone-300 hover:bg-white/10 hover:text-white transition"
                >
                  Sửa thông tin
                </button>
                <button
                  onClick={() => handleDelete(prod.id)}
                  className="rounded-lg p-1.5 text-stone-500 hover:bg-rose-500/10 hover:text-rose-400 transition"
                  title="Xoá sản phẩm"
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

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#141419] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Chỉnh sửa dòng sản phẩm' : 'Thêm dòng sản phẩm mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Tên dòng sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ví dụ: DOMINO Inox Cánh Kính Cao Cấp"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">Đường dẫn tĩnh (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="inox-canh-kinh"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">Hệ vật liệu (Family)</label>
                  <select
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#1c1c24] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Inox cánh kính">Inox cánh kính (Luxury)</option>
                    <option value="Hợp kim nhôm Anode">Hợp kim nhôm Anode</option>
                    <option value="Đảo bếp thông minh">Đảo bếp thông minh</option>
                    <option value="Module cao cấp">Hệ Module thông minh</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">URL Hình ảnh minh hoạ</label>
                <input
                  type="text"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://... hoặc /products/..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="Tóm tắt đặc tính nổi bật của sản phẩm..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Mô tả chi tiết</label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Thông số công năng, phụ kiện kết hợp, thời gian gia công..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="prod-publish"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded accent-amber-500"
                />
                <label htmlFor="prod-publish" className="text-xs text-stone-300">
                  Hiển thị ngay trên website công khai
                </label>
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
                  {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
