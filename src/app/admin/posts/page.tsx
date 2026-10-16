'use client'

import React, { useEffect, useState } from 'react'
import { supabase, PostItem } from '@/lib/supabaseClient'

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<PostItem | null>(null)
  const [saving, setSaving] = useState(false)

  // Form
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Kiến thức vật liệu')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [isPublished, setIsPublished] = useState(true)

  const loadPosts = async () => {
    setLoading(true)
    let list: PostItem[] = []

    if (supabase) {
      try {
        const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
        if (!error && data && data.length > 0) {
          list = data
        }
      } catch (err) {
        console.warn('Error fetching posts:', err)
      }
    }

    if (list.length === 0) {
      list = [
        {
          id: 'post-1',
          title: 'So sánh độ bền tủ bếp inox 304 cánh kính và tủ gỗ công nghiệp MDF',
          slug: 'so-sanh-tu-bep-inox-canh-kinh-va-tu-go-mdf',
          category: 'Kiến thức vật liệu',
          excerpt: 'Phân tích chi tiết khả năng kháng nước, chống mối mọt và tuổi thọ thực tế trong môi trường bếp ẩm nhiệt đới.',
          image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          is_published: true,
          created_at: new Date().toISOString(),
        },
        {
          id: 'post-2',
          title: 'Quy trình thi công chấn gập Inox CNC không mối hàn độc quyền tại DOMINO',
          slug: 'quy-trinh-thi-cong-chan-gap-inox-cnc',
          category: 'Công nghệ sản xuất',
          excerpt: 'Tại sao thùng tủ inox của DOMINO loại bỏ hoàn toàn các vết hàn đen, mang lại độ sắc nét và vệ sinh tuyệt đối?',
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
          is_published: true,
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ]
    }

    setPosts(list)
    setLoading(false)
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!editingPost) {
      setSlug(generateSlug(val))
    }
  }

  const handleOpenAdd = () => {
    setEditingPost(null)
    setTitle('')
    setSlug('')
    setCategory('Kiến thức vật liệu')
    setExcerpt('')
    setContent('')
    setImage('')
    setIsPublished(true)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (p: PostItem) => {
    setEditingPost(p)
    setTitle(p.title)
    setSlug(p.slug)
    setCategory(p.category || 'Kiến thức vật liệu')
    setExcerpt(p.excerpt || '')
    setContent(p.content || '')
    setImage(p.image || '')
    setIsPublished(p.is_published ?? true)
    setIsModalOpen(true)
  }

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      title,
      slug: slug || generateSlug(title),
      category,
      excerpt,
      content,
      image,
      is_published: isPublished,
    }

    if (editingPost) {
      if (supabase && !editingPost.id.startsWith('post-')) {
        try {
          await supabase.from('posts').update(payload).eq('id', editingPost.id)
        } catch (e) {
          console.warn('Update post error:', e)
        }
      }
      setPosts((prev) =>
        prev.map((item) => (item.id === editingPost.id ? { ...item, ...payload } : item))
      )
    } else {
      const newPost: PostItem = {
        id: 'post-' + Date.now(),
        ...payload,
        created_at: new Date().toISOString(),
      }

      if (supabase) {
        try {
          const { data } = await supabase.from('posts').insert([payload]).select()
          if (data && data[0]) {
            newPost.id = data[0].id
          }
        } catch (e) {
          console.warn('Insert post error:', e)
        }
      }
      setPosts([newPost, ...posts])
    }

    setSaving(false)
    setIsModalOpen(false)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá bài viết này?')) return

    if (supabase && !id.startsWith('post-')) {
      try {
        await supabase.from('posts').delete().eq('id', id)
      } catch (e) {
        console.warn('Delete post error:', e)
      }
    }

    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Quản lý Bài viết & Cẩm nang</h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Nội dung chuyên sâu về vật liệu, phong cách thiết kế bếp và cẩm nang người dùng.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Soạn bài viết mới</span>
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
            placeholder="Tìm theo tiêu đề bài viết, chuyên mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-xs text-white placeholder:text-stone-500 focus:border-amber-500/50 focus:outline-none"
          />
        </div>
        <div className="text-xs text-stone-400">
          Tổng số: <strong className="text-white">{filtered.length}</strong> bài viết
        </div>
      </div>

      {/* Posts Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                <th className="px-5 py-3.5">Bài viết</th>
                <th className="px-5 py-3.5">Chuyên mục</th>
                <th className="px-5 py-3.5">Trích dẫn tóm tắt</th>
                <th className="px-5 py-3.5">Trạng thái</th>
                <th className="px-5 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                    Đang tải bài viết...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                    Không có bài viết nào.
                  </td>
                </tr>
              ) : (
                filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-5 py-4 max-w-sm">
                      <div className="font-semibold text-white">{post.title}</div>
                      <div className="text-[10px] text-stone-500 font-mono mt-0.5">/{post.slug}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="rounded-md bg-stone-800 px-2 py-0.5 text-[10px] font-medium text-stone-300">
                        {post.category || 'Chung'}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs text-stone-400">
                      <div className="line-clamp-2">{post.excerpt || '—'}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        post.is_published ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {post.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-stone-300 hover:bg-white/10 hover:text-white transition"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="rounded-lg p-1 text-stone-500 hover:bg-rose-500/10 hover:text-rose-400 transition"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#141419] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">
                {editingPost ? 'Chỉnh sửa bài viết' : 'Soạn bài viết mới'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSavePost} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Tiêu đề bài viết..."
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
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">Chuyên mục</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#1c1c24] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Kiến thức vật liệu">Kiến thức vật liệu</option>
                    <option value="Công nghệ sản xuất">Công nghệ sản xuất</option>
                    <option value="Kinh nghiệm thiết kế">Kinh nghiệm thiết kế</option>
                    <option value="Cẩm nang bảo quản">Cẩm nang bảo quản</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">URL Ảnh bìa</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Đoạn trích tóm tắt (Excerpt)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Tóm tắt ngắn gọn để hiển thị trên thẻ bài viết..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Nội dung bài viết (Markdown / Text)</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Nội dung chi tiết của bài viết..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="post-publish"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="h-4 w-4 rounded accent-amber-500"
                />
                <label htmlFor="post-publish" className="text-xs text-stone-300">
                  Xuất bản công khai trên website
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
                  {saving ? 'Đang lưu...' : 'Lưu bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
