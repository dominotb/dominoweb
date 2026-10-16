'use client'

import React, { useState } from 'react'
import { submitLead } from '@/lib/supabaseClient'

export default function Consultation() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [brief, setBrief] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Vui lòng nhập họ tên và số điện thoại.')
      return
    }

    setSubmitting(true)
    setErrorMsg('')

    try {
      await submitLead({
        name: name.trim(),
        phone: phone.trim(),
        need: brief.trim(),
        note: 'Đăng ký từ Form tư vấn 1:1 trang chủ',
      })
      setSubmitted(true)
      setName('')
      setPhone('')
      setBrief('')
    } catch {
      setErrorMsg('Không thể gửi thông tin lúc này. Vui lòng liên hệ hotline.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="consultation" className="relative flex min-h-[100svh] flex-col justify-center bg-[#f4f0e8] py-16 text-[#171717] md:py-24">
      <div className="container mx-auto px-6">
        <div data-motion-reveal className="grid gap-10 border-y border-[#c9c1b4] py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div>
            <div className="eyebrow">Tư vấn 1:1</div>
            <h2 className="heading-clip mt-5 text-4xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-6xl">
              <span className="heading-clip-inner">ĐẦU TƯ CHO GIÁ TRỊ DÀI HẠN</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#57534e]">
              Chia sẻ mặt bằng và nhu cầu, DOMINO sẽ đề xuất giải pháp theo công năng, vật liệu và ngân sách.
            </p>
            <div className="mt-8 text-sm font-semibold text-[#171717]">
              Tư vấn miễn phí · 24/7
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="rounded-2xl border border-emerald-600/30 bg-emerald-500/10 p-8 text-center text-emerald-900">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xl">
                  ✓
                </div>
                <h3 className="mt-4 text-xl font-bold">Cảm ơn Quý khách!</h3>
                <p className="mt-2 text-sm text-[#57534e]">
                  Chuyên viên giải pháp tủ bếp DOMINO sẽ liên hệ lại với Quý khách trong thời gian sớm nhất.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-semibold text-[#171717] underline hover:opacity-80"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Form tư vấn">
                {errorMsg && (
                  <div className="sm:col-span-2 text-xs text-rose-600 font-medium">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label className="sr-only" htmlFor="name">
                    Họ và tên
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-[#b8ad9d] bg-transparent p-4 text-[#171717] placeholder:text-[#78716c] focus:outline-none focus:border-[#171717]"
                    placeholder="Họ và tên *"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="phone">
                    Số điện thoại
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b border-[#b8ad9d] bg-transparent p-4 text-[#171717] placeholder:text-[#78716c] focus:outline-none focus:border-[#171717]"
                    placeholder="Số điện thoại *"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="sr-only" htmlFor="brief">
                    Nhu cầu
                  </label>
                  <textarea
                    id="brief"
                    name="brief"
                    rows={3}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    className="w-full border-b border-[#b8ad9d] bg-transparent p-4 text-[#171717] placeholder:text-[#78716c] focus:outline-none focus:border-[#171717]"
                    placeholder="Mô tả nhu cầu hoặc kích thước mặt bằng dự kiến..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary touch-card-active focus-ring w-full sm:w-auto"
                  >
                    {submitting ? 'Đang gửi...' : 'Nhận tư vấn ngay'}{' '}
                    <span className="ml-2" aria-hidden="true">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
