'use client'

import React, { useEffect, useState } from 'react'
import { supabase, Lead } from '@/lib/supabaseClient'

export default function LeadsManagementPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Modals state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Form state
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formNeed, setFormNeed] = useState('')
  const [formNote, setFormNote] = useState('')
  const [formStatus, setFormStatus] = useState<Lead['status']>('new')
  const [saving, setSaving] = useState(false)

  const loadLeads = async () => {
    setLoading(true)
    let fetchedLeads: Lead[] = []

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data) {
          fetchedLeads = data
        }
      } catch (err) {
        console.warn('Supabase leads fetch error:', err)
      }
    }

    // Merge with any local offline leads if table isn't created or user tested offline
    if (typeof window !== 'undefined') {
      try {
        const rawLocal = localStorage.getItem('domino_offline_leads')
        if (rawLocal) {
          const locals: Lead[] = JSON.parse(rawLocal)
          // prepend unique locals
          const ids = new Set(fetchedLeads.map((l) => l.id))
          const missingLocals = locals.filter((l) => !ids.has(l.id))
          fetchedLeads = [...missingLocals, ...fetchedLeads]
        }
      } catch (err) {
        console.warn('Error parsing offline leads:', err)
      }
    }

    // Sample fallback if no leads exist yet to give an immediately rich UI
    if (fetchedLeads.length === 0) {
      fetchedLeads = [
        {
          id: 'demo-1',
          name: 'Anh Trần Tuấn Kiệt',
          phone: '0912 345 678',
          need: 'Tư vấn trọn gói tủ bếp inox cánh kính Luxury cho biệt thự Gamuda',
          note: 'Khách muốn màu trà khói, hẹn khảo sát T7 tuần này',
          status: 'survey',
          created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: 'demo-2',
          name: 'Chị Nguyễn Mai Anh',
          phone: '0988 765 432',
          need: 'Dòng hợp kim nhôm Anode, mặt đá Vicostone',
          note: 'Cần gửi báo giá sơ bộ qua Zalo trước',
          status: 'contacted',
          created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
        {
          id: 'demo-3',
          name: 'KTS Hoàng Dũng (Studio Design)',
          phone: '0903 889 911',
          need: 'Hợp tác thiết kế nội thất Penthouse Tây Hồ',
          note: 'Quan tâm module thông minh và giải pháp phụ kiện Blum',
          status: 'deal',
          created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
        },
      ]
    }

    setLeads(fetchedLeads)
    setLoading(false)
  }

  useEffect(() => {
    loadLeads()
  }, [])

  // Filter and search
  const filteredLeads = leads.filter((item) => {
    const matchesSearch =
      (item.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.phone || '').includes(searchTerm) ||
      (item.need?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (item.note?.toLowerCase() || '').includes(searchTerm.toLowerCase())

    if (statusFilter === 'all') return matchesSearch
    return matchesSearch && item.status === statusFilter
  })

  // Open Edit Modal
  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead)
    setFormName(lead.name || '')
    setFormPhone(lead.phone || '')
    setFormNeed(lead.need || '')
    setFormNote(lead.note || '')
    setFormStatus(lead.status || 'new')
    setIsEditModalOpen(true)
  }

  // Open Add Modal
  const handleOpenAdd = () => {
    setFormName('')
    setFormPhone('')
    setFormNeed('')
    setFormNote('')
    setFormStatus('new')
    setIsAddModalOpen(true)
  }

  // Save changes (Update)
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead) return
    setSaving(true)

    const updatedLead: Lead = {
      ...selectedLead,
      name: formName,
      phone: formPhone,
      need: formNeed,
      note: formNote,
      status: formStatus,
    }

    // Try Supabase update
    if (supabase && !selectedLead.id.startsWith('demo-') && !selectedLead.id.startsWith('local-')) {
      try {
        await supabase
          .from('leads')
          .update({
            name: formName,
            phone: formPhone,
            need: formNeed,
            note: formNote,
          })
          .eq('id', selectedLead.id)
      } catch (err) {
        console.warn('Supabase update lead error:', err)
      }
    }

    // Update state
    setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? updatedLead : l)))
    setSaving(false)
    setIsEditModalOpen(false)
  }

  // Add new lead
  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      name: formName,
      phone: formPhone,
      need: formNeed,
      note: formNote,
      status: formStatus,
      created_at: new Date().toISOString(),
    }

    if (supabase) {
      try {
        const { data } = await supabase.from('leads').insert([
          {
            name: formName,
            phone: formPhone,
            need: formNeed,
            note: formNote,
          },
        ]).select()
        if (data && data[0]) {
          newLead.id = data[0].id
        }
      } catch (err) {
        console.warn('Supabase insert lead error:', err)
      }
    }

    setLeads([newLead, ...leads])
    setSaving(false)
    setIsAddModalOpen(false)
  }

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá yêu cầu tư vấn này?')) return

    if (supabase && !id.startsWith('demo-') && !id.startsWith('local-')) {
      try {
        await supabase.from('leads').delete().eq('id', id)
      } catch (err) {
        console.warn('Delete error:', err)
      }
    }

    setLeads((prev) => prev.filter((l) => l.id !== id))
  }

  // Export CSV for Excel
  const exportToCSV = () => {
    const headers = ['Mã', 'Họ và tên', 'Số điện thoại', 'Nhu cầu tư vấn', 'Ghi chú', 'Trạng thái', 'Thời gian gửi']
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${(l.need || '').replace(/"/g, '""')}"`,
      `"${(l.note || '').replace(/"/g, '""')}"`,
      l.status || 'new',
      l.created_at ? new Date(l.created_at).toLocaleString('vi-VN') : '',
    ])

    // BOM \uFEFF ensures Excel displays UTF-8 Vietnamese correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `domino-leads-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'survey':
        return <span className="rounded-full bg-blue-500/10 border border-blue-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-blue-400">Đã khảo sát</span>
      case 'deal':
        return <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">Đã chốt hợp đồng</span>
      case 'contacted':
        return <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">Đã gọi điện</span>
      case 'cancelled':
        return <span className="rounded-full bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-rose-400">Hủy / Không nghe máy</span>
      case 'new':
      default:
        return <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-purple-400">Mới tiếp nhận</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Quản lý Khách hàng Tư vấn (Leads)</h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Theo dõi, xử lý và phân loại các yêu cầu tư vấn từ biểu mẫu website DOMINO.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-stone-300 hover:bg-white/10 hover:text-white transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Xuất CSV (Excel)</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Tạo Lead thủ công</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#101014] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Tìm theo họ tên, số điện thoại, ghi chú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-stone-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'new', label: 'Mới' },
            { id: 'contacted', label: 'Đã liên hệ' },
            { id: 'survey', label: 'Khảo sát' },
            { id: 'deal', label: 'Đã chốt' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition ${
                statusFilter === tab.id
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-white/5 text-stone-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={loadLeads}
            title="Tải lại danh sách"
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-stone-400 hover:text-white hover:bg-white/10"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                <th className="px-5 py-3.5">Khách hàng</th>
                <th className="px-5 py-3.5">Số điện thoại</th>
                <th className="px-5 py-3.5">Nhu cầu / Mô tả</th>
                <th className="px-5 py-3.5">Ghi chú Sale</th>
                <th className="px-5 py-3.5">Trạng thái</th>
                <th className="px-5 py-3.5">Thời gian</th>
                <th className="px-5 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-500">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                      <span>Đang tải danh sách leads...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-500">
                    Không tìm thấy yêu cầu tư vấn nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{lead.name || 'Khách vãng lai'}</div>
                      <div className="text-[10px] text-stone-500 font-mono">ID: {lead.id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={`tel:${lead.phone}`}
                        className="inline-flex items-center gap-1 font-mono font-medium text-amber-400 hover:underline"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4 max-w-xs text-stone-300">
                      <div className="line-clamp-2" title={lead.need}>
                        {lead.need || 'Không có mô tả chi tiết'}
                      </div>
                    </td>
                    <td className="px-5 py-4 max-w-xs text-stone-400">
                      <div className="line-clamp-2" title={lead.note}>
                        {lead.note || '—'}
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-5 py-4 text-stone-500 whitespace-nowrap">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '—'}
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(lead)}
                          className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-stone-300 hover:bg-white/10 hover:text-white transition"
                        >
                          Cập nhật
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          title="Xoá lead"
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

      {/* Edit Lead Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141419] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Cập nhật yêu cầu tư vấn</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Trạng thái xử lý</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="w-full rounded-xl border border-white/10 bg-[#1c1c24] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="new">Mới tiếp nhận</option>
                  <option value="contacted">Đã liên hệ tư vấn</option>
                  <option value="survey">Đã hẹn lịch / Đã khảo sát hiện trạng</option>
                  <option value="deal">Đã chốt hợp đồng thi công</option>
                  <option value="cancelled">Hủy / Không liên lạc được</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Nhu cầu khách hàng</label>
                <textarea
                  rows={2}
                  value={formNeed}
                  onChange={(e) => setFormNeed(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Ghi chú của chuyên viên Sale</label>
                <textarea
                  rows={3}
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  placeholder="Ví dụ: Đã gửi catalogue qua Zalo, khách ưng ý màu trà khói..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-stone-400 hover:bg-white/5"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-black hover:bg-amber-400"
                >
                  {saving ? 'Đang lưu...' : 'Lưu cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#141419] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-base font-bold text-white">Thêm yêu cầu tư vấn mới</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-400 mb-1">Số điện thoại *</label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Nhu cầu tư vấn</label>
                <input
                  type="text"
                  value={formNeed}
                  onChange={(e) => setFormNeed(e.target.value)}
                  placeholder="Quan tâm dòng tủ bếp Inox cánh kính..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-400 mb-1">Ghi chú ban đầu</label>
                <textarea
                  rows={2}
                  value={formNote}
                  onChange={(e) => setFormNote(e.target.value)}
                  placeholder="Khách gọi từ hotline, dự định lắp tháng tới..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-stone-400 hover:bg-white/5"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-semibold text-black hover:bg-amber-400"
                >
                  {saving ? 'Đang thêm...' : 'Tạo Lead mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
