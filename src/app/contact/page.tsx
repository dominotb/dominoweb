'use client'

import React, { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    fileName: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
      fileName: '',
    })
    setSubmitted(false)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      q: 'Thời gian nhận báo giá là bao lâu?',
      a: 'Sau khi tiếp nhận đầy đủ thông tin mặt bằng và nhu cầu sử dụng, chuyên viên DOMINO sẽ chuẩn bị báo giá chi tiết và gửi lại cho bạn trong vòng 24h làm việc.',
    },
    {
      q: 'Có thể tham quan showroom không?',
      a: 'Rất hoan nghênh bạn! Showroom DOMINO tại Lô 5,6 Khu TDC DC1 Phường Trà Lý, Tỉnh Hưng Yên mở cửa từ 8:00 đến 18:00 tất cả các ngày trong tuần (Thứ 2 - Chủ Nhật).',
    },
    {
      q: 'DOMINO có hỗ trợ khảo sát tại nhà không?',
      a: 'Có, kỹ sư của DOMINO hỗ trợ khảo sát đo đạc mặt bằng thực tế hoàn toàn miễn phí tại khu vực Hưng Yên, Hà Nội và các tỉnh thành lân cận.',
    },
    {
      q: 'Chế độ bảo hành như thế nào?',
      a: 'Tủ bếp kính DOMINO được bảo hành chính hãng lên tới 5 - 10 năm cho toàn bộ hệ thống cánh kính, khung nhôm Anode và phụ kiện cao cấp, kèm bảo trì trọn đời.',
    },
    {
      q: 'Tôi có thể gửi bản vẽ mặt bằng trước không?',
      a: 'Bạn hoàn toàn có thể đính kèm file bản vẽ mặt bằng (JPG, PNG, PDF) ngay tại Form gửi yêu cầu ở trên để kỹ sư tư vấn của chúng tôi phân tích sớm.',
    },
    {
      q: 'Làm việc ngoài tỉnh có được không?',
      a: 'DOMINO cung cấp giải pháp tư vấn, thiết kế, sản xuất và vận chuyển lắp đặt hoàn thiện tủ bếp kính trên toàn quốc với tiến độ và tiêu chuẩn niêm yết.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#07090e] text-[#f8fafc] font-sans">
      
      {/* SECTION 1: HERO SECTION WITH LUXURY KITCHEN BACKGROUND */}
      <section className="relative min-h-[500px] lg:min-h-[560px] w-full overflow-hidden flex flex-col justify-between py-14 px-6 sm:px-10 lg:px-16">
        {/* Background image & gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/95 via-[#07090e]/85 to-[#07090e]/90 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/60 via-transparent to-[#07090e] z-0" />

        <div className="container mx-auto relative z-10 my-auto pt-6">
          <div className="max-w-4xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af7a]">
              LIÊN HỆ
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Chúng tôi luôn sẵn sàng đồng hành cùng bạn
            </h1>
            <p className="mt-5 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-200 font-normal max-w-3xl">
              Dù là tư vấn thiết kế, báo giá, tham quan showroom hay bảo hành, đội ngũ DOMINO luôn sẵn sàng hỗ trợ nhanh chóng và tận tâm.
            </p>

            {/* 4 Feature Pills / Cards */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
              <div className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                  👤
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Tư vấn chi tiết</div>
                  <div className="text-xs text-slate-300">Giải đáp mọi thắc mắc</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                  🏷️
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Báo giá minh bạch</div>
                  <div className="text-xs text-slate-300">Phù hợp nhu cầu</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                  📅
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Hẹn showroom</div>
                  <div className="text-xs text-slate-300">Trải nghiệm thực tế</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                  🛠️
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Hỗ trợ sau bán</div>
                  <div className="text-xs text-slate-300">Dài hạn, tận tâm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline bottom right */}
        <div className="container mx-auto relative z-10 pt-8 text-right hidden sm:block">
          <span className="text-sm sm:text-base italic text-slate-300 font-medium">
            Không chỉ là một bộ tủ bếp, mà là một không gian sống bền vững 10–20 năm ―
          </span>
        </div>
      </section>

      {/* SECTION 2: MAIN FORM & CONTACT DETAILS (2 COLUMNS) */}
      <section className="container mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* LEFT COLUMN: GỬI YÊU CẦU FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/15 bg-[#0d111a]/95 p-7 sm:p-9 backdrop-blur-md shadow-2xl">
              
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#d4af7a]">
                  <span>◎</span> GỬI YÊU CẦU
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                  Gửi yêu cầu tư vấn & báo giá
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Điền thông tin bên dưới, đội ngũ DOMINO sẽ chủ động liên hệ và tư vấn chi tiết trong vòng 24h.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-10 text-center backdrop-blur-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-3xl">
                    ✓
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">Gửi yêu cầu thành công!</h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-200">
                    Cảm ơn <span className="font-bold text-emerald-400">{formData.name}</span>. Đội ngũ DOMINO sẽ gọi điện tư vấn qua số điện thoại <span className="font-bold text-emerald-400">{formData.phone}</span> trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-8 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20"
                  >
                    Gửi yêu cầu mới
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Row 1: Họ tên & Số điện thoại */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-2">
                        Họ và tên <span className="text-[#d4af7a]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nhập họ và tên"
                        className="w-full rounded-xl border border-white/20 bg-[#141924] px-4 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 transition focus:border-[#d4af7a] focus:bg-[#1a2130] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-2">
                        Số điện thoại <span className="text-[#d4af7a]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Nhập số điện thoại"
                        className="w-full rounded-xl border border-white/20 bg-[#141924] px-4 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 transition focus:border-[#d4af7a] focus:bg-[#1a2130] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Nhu cầu quan tâm */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Nhập email (nếu có)"
                        className="w-full rounded-xl border border-white/20 bg-[#141924] px-4 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 transition focus:border-[#d4af7a] focus:bg-[#1a2130] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-200 mb-2">
                        Nhu cầu quan tâm <span className="text-[#d4af7a]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full appearance-none rounded-xl border border-white/20 bg-[#141924] px-4 py-3.5 text-sm sm:text-base text-white transition focus:border-[#d4af7a] focus:bg-[#1a2130] focus:outline-none pr-10"
                        >
                          <option value="" disabled>Chọn nhu cầu</option>
                          <option value="Tư vấn thiết kế tủ bếp kính">Tư vấn thiết kế tủ bếp kính</option>
                          <option value="Tham quan showroom">Tham quan showroom</option>
                          <option value="Báo giá & Thi công mặt bằng">Báo giá & Thi công mặt bằng</option>
                          <option value="Hỗ trợ bảo hành">Hỗ trợ bảo hành</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400 text-sm font-bold">
                          ⌄
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Nội dung chi tiết */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-200 mb-2">
                      Nội dung chi tiết
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Chia sẻ thêm về không gian, nhu cầu, ngân sách..."
                      className="w-full rounded-xl border border-white/20 bg-[#141924] px-4 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 transition focus:border-[#d4af7a] focus:bg-[#1a2130] focus:outline-none"
                    />
                  </div>

                  {/* Row 4: File attachment box */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-[#141924] p-4 sm:p-5">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-slate-200 text-xl">
                        🔒
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Tải ảnh mặt bằng / không gian bếp <span className="text-slate-400 font-normal">(nếu có)</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          Hỗ trợ định dạng JPG, PNG, PDF (tối đa 10MB)
                        </div>
                        {formData.fileName && (
                          <div className="text-xs text-[#d4af7a] mt-1 font-semibold">
                            📎 Đã chọn: {formData.fileName}
                          </div>
                        )}
                      </div>
                    </div>

                    <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 shrink-0">
                      <span>Chọn file</span>
                      <input type="file" accept=".jpg,.png,.pdf" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#d4af7a] hover:bg-[#c59e69] px-6 py-4.5 text-base sm:text-lg font-extrabold text-[#0f172a] shadow-xl shadow-[#d4af7a]/20 transition active:scale-[0.99] disabled:opacity-50 mt-3"
                  >
                    {loading ? (
                      <span>Đang gửi...</span>
                    ) : (
                      <>
                        <span>Gửi yêu cầu cho DOMINO</span>
                        <span className="text-xl">→</span>
                      </>
                    )}
                  </button>

                  {/* Security Note */}
                  <p className="text-center text-xs sm:text-sm text-slate-300 flex items-center justify-center gap-2 pt-2">
                    <span>🔒</span>
                    <span>Thông tin của bạn được cam kết bảo mật tuyệt đối theo chính sách của DOMINO.</span>
                  </p>

                </form>
              )}

            </div>
          </div>

          {/* RIGHT COLUMN: THÔNG TIN LIÊN HỆ & KẾT NỐI VỚI DOMINO */}
          <div className="space-y-8 lg:col-span-5">
            
            {/* Card 1: THÔNG TIN LIÊN HỆ */}
            <div className="rounded-3xl border border-white/15 bg-[#0d111a]/95 p-7 sm:p-8 backdrop-blur-md shadow-2xl">
              
              <div className="border-b border-white/15 pb-5">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#d4af7a]">
                  THÔNG TIN LIÊN HỆ
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-white leading-snug">
                  CÔNG TY TNHH XÂY DỰNG VÀ SẢN XUẤT DOMINO
                </h3>
              </div>

              <div className="mt-6 space-y-5 text-sm sm:text-base">
                
                {/* Item 1: Hotline */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                    📞
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Hotline</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-bold text-white">
                      0975 811 678 &nbsp;-&nbsp; 0964 811 678
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Thứ 2 - Chủ nhật | 8:00 - 18:00
                    </div>
                  </div>
                </div>

                {/* Item 2: Email */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                    ✉️
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</span>
                    <a href="mailto:dominoxdsx062025@gmail.com" className="block mt-1 font-semibold text-white truncate hover:text-[#d4af7a] transition">
                      dominoxdsx062025@gmail.com
                    </a>
                    <div className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Phản hồi trong 24h
                    </div>
                  </div>
                </div>

                {/* Item 3: Địa chỉ */}
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                    📍
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Địa chỉ</span>
                    <div className="mt-1 font-semibold text-white leading-relaxed">
                      Lô 5,6, Khu TDC DC1 Phường Trà Lý, Tỉnh Hưng Yên
                    </div>
                    <a
                      href="https://www.google.com/maps/place/T%E1%BB%A7+B%E1%BA%BFp+DOMINO+Th%C3%A1i+B%C3%ACnh/@20.4589794,106.354695,19z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#d4af7a] mt-1.5 hover:underline"
                    >
                      <span>Xem trên Google Maps</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>

                {/* Item 4: Đại diện */}
                <div className="flex items-start gap-4 border-t border-white/15 pt-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d4af7a]/20 text-[#d4af7a] text-base">
                    👤
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Đại diện</span>
                    <div className="mt-1 flex flex-wrap items-center justify-between text-white gap-2">
                      <span className="font-bold text-base sm:text-lg">Ông Lại Văn Minh</span>
                      <span className="text-slate-300 text-xs sm:text-sm">Chức vụ: <strong className="text-white font-bold">Giám đốc</strong></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: KẾT NỐI VỚI DOMINO */}
            <div className="rounded-3xl border border-white/15 bg-[#0d111a]/95 p-7 sm:p-8 backdrop-blur-md shadow-2xl">
              
              <div className="border-b border-white/15 pb-4">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#d4af7a]">
                  KẾT NỐI VỚI DOMINO
                </span>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Theo dõi các kênh chính thức để cập nhật công trình, kiến thức và ưu đãi mới nhất.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                
                {/* Youtube */}
                <a
                  href="https://www.youtube.com/@dominothaibinh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-[#141924] p-3.5 sm:p-4 transition hover:border-red-500/50 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white text-sm font-bold">
                    ▶
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">Kênh Youtube</div>
                    <div className="text-xs text-slate-300 truncate">Video công trình</div>
                  </div>
                </a>

                {/* Facebook / Fanpage */}
                <a
                  href="https://www.facebook.com/tubepdominothaibinh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-[#141924] p-3.5 sm:p-4 transition hover:border-blue-500/50 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white text-sm font-bold">
                    f
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">Fanpage</div>
                    <div className="text-xs text-slate-300 truncate">Tủ Bếp DOMINO</div>
                  </div>
                </a>

                {/* Zalo OA */}
                <a
                  href="https://zalo.me/0975811678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-[#141924] p-3.5 sm:p-4 transition hover:border-sky-500/50 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white text-xs font-black">
                    Zalo
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">Zalo OA</div>
                    <div className="text-xs text-slate-300 truncate">Hỗ trợ nhanh</div>
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@tubep.domino.tb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-[#141924] p-3.5 sm:p-4 transition hover:border-pink-500/50 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white text-sm font-bold border border-white/20">
                    ♪
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white font-mono truncate">@tubep.domino</div>
                    <div className="text-xs text-slate-300 truncate">TikTok DOMINO</div>
                  </div>
                </a>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: SHOWROOM TRẢI NGHIỆM THỰC TẾ & BẢN ĐỒ CHỈ ĐƯỜNG */}
      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Showroom DOMINO */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-white/15 bg-[#0d111a]/95 p-7 sm:p-9 backdrop-blur-md">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#d4af7a]">
                TRẢI NGHIỆM THỰC TẾ
              </span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                Showroom DOMINO tại Hưng Yên
              </h3>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Trực tiếp trải nghiệm chất liệu, màu sắc và các giải pháp tủ bếp cùng đội ngũ tư vấn của chúng tôi.
              </p>
            </div>

            {/* 3 Gallery Images */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="group overflow-hidden rounded-2xl border border-white/15 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80"
                  alt="Showroom DOMINO 1"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="group overflow-hidden rounded-2xl border border-white/15 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80"
                  alt="Showroom DOMINO 2"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="group overflow-hidden rounded-2xl border border-white/15 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80"
                  alt="Showroom DOMINO 3"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bản đồ chỉ đường */}
          <div className="lg:col-span-6 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-[#0d111a]/95 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 p-6 sm:px-8">
              <div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#d4af7a]">
                  <span>📍</span> BẢN ĐỒ CHỈ ĐƯỜNG
                </div>
                <div className="text-sm text-slate-200 mt-1 truncate max-w-xs sm:max-w-md font-semibold">
                  Lô 5,6, Khu TDC DC1 Phường Trà Lý, Tỉnh Hưng Yên
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/T%E1%BB%A7+B%E1%BA%BFp+DOMINO+Th%C3%A1i+B%C3%ACnh/@20.4589794,106.354695,19z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-white/20 shrink-0"
              >
                <span>Chỉ đường</span>
                <span>→</span>
              </a>
            </div>

            {/* Google map iframe */}
            <div className="relative min-h-[260px] h-full w-full bg-slate-900">
              <iframe
                title="Tủ Bếp DOMINO Thái Bình - Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d660.8180273165003!2d106.35469501895435!3d20.45897941534718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135fb0026d4329b%3A0xce850c3b80506fa8!2zVOG7pyBC4bq_cCBET01JTk8gVGjDoWkgQsOsbmg!5e0!3m2!1svi!2s!4v1790666135664!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '260px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full grayscale-[20%] contrast-[105%] invert-[85%] hue-rotate-[180deg]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: FAQ SECTION (CÁC CÂU HỎI THƯỜNG GẶP) */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af7a]">
            CÁC CÂU HỎI THƯỜNG GẶP
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Một số thắc mắc được quan tâm
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/15 bg-[#0d111a]/90 transition duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left text-base sm:text-lg font-bold text-white hover:text-[#d4af7a] transition"
                >
                  <span>{faq.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-200 text-lg font-bold">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-6 pb-6 pt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </main>
  )
}