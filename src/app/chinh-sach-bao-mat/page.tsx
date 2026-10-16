import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính Sách Bảo Mật | DOMINO Glass Kitchen',
  description:
    'Cam kết bảo mật thông tin cá nhân khách hàng của DOMINO. Chúng tôi bảo vệ quyền riêng tư, an toàn dữ liệu và tuân thủ các quy định pháp luật hiện hành.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = '06/10/2026'

  return (
    <main className="min-h-screen bg-black text-[#f8fafc] font-sans">
      {/* HERO BANNER SECTION */}
      <section className="relative w-full overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/90 to-black/95 z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0" />

        <div className="container mx-auto relative z-10 pt-4">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#d4af7a]">
              CHÍNH SÁCH & PHÁP LÝ
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Chính Sách Bảo Mật
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              DOMINO Glass Kitchen cam kết bảo vệ thông tin cá nhân và quyền riêng tư tuyệt đối của quý khách hàng khi truy cập và sử dụng dịch vụ trên hệ thống của chúng tôi.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[#d4af7a]">
                🛡️ Bảo mật tuyệt đối
              </span>
              <span>Cập nhật lần cuối: <strong className="text-white">{lastUpdated}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          
          {/* QUICK SUMMARY SIDEBAR */}
          <aside className="lg:col-span-4 lg:order-2">
            <div className="sticky top-28 space-y-6">
              
              <div className="rounded-3xl border border-white/15 bg-[#0a0a0a]/95 p-6 sm:p-7 backdrop-blur-md shadow-2xl">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af7a] border-b border-white/15 pb-3">
                  TỔNG QUAN CAM KẾT
                </h3>
                <ul className="mt-5 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">✓</span>
                    <span>Không bán, chia sẻ dữ liệu cho bên thứ ba vì mục đích thương mại.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">✓</span>
                    <span>Thu thập đúng mục đích tư vấn, báo giá và bảo hành sản phẩm.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">✓</span>
                    <span>Mã hóa thông tin và áp dụng các biện pháp an ninh mạng cao nhất.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">✓</span>
                    <span>Khách hàng toàn quyền yêu cầu xem, sửa hoặc xóa dữ liệu cá nhân.</span>
                  </li>
                </ul>
              </div>

              {/* CONTACT CARD */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-6 sm:p-7 backdrop-blur-md shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af7a]">
                  HỖ TRỢ BẢO MẬT & DỮ LIỆU
                </span>
                <h4 className="mt-2 text-base font-bold text-white">
                  CÔNG TY TNHH XÂY DỰNG VÀ SẢN XUẤT DOMINO
                </h4>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Mọi thắc mắc hoặc yêu cầu xử lý dữ liệu cá nhân, vui lòng liên hệ trực tiếp bộ phận CSKH:
                </p>
                <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[#d4af7a]">📞</span>
                    <a href="tel:0975811678" className="font-mono font-bold text-white hover:text-[#d4af7a]">
                      0975 811 678
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#d4af7a]">✉️</span>
                    <a href="mailto:dominoxdsx062025@gmail.com" className="text-slate-200 hover:text-white truncate">
                      dominoxdsx062025@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-2 pt-2 border-t border-white/10 text-slate-300">
                    <span className="text-[#d4af7a]">📍</span>
                    <span>Lô 5,6, Khu TDC DC1 Phường Trà Lý, Tỉnh Hưng Yên</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* DETAILED ARTICLE CONTENT */}
          <article className="lg:col-span-8 lg:order-1 space-y-8 text-slate-300 text-sm sm:text-base leading-relaxed">
            
            {/* ITEM 1 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Mục Đích và Phạm Vi Thu Thập Thông Tin
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  Khi quý khách truy cập website hoặc gửi yêu cầu tư vấn, DOMINO sẽ thu thập một số thông tin cá nhân cần thiết bao gồm:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                  <li>
                    <strong className="text-white">Dữ liệu cá nhân trực tiếp:</strong> Họ và tên, số điện thoại, địa chỉ email, địa chỉ lắp đặt/công trình.
                  </li>
                  <li>
                    <strong className="text-white">Dữ liệu không gian công trình:</strong> Bản vẽ mặt bằng, hình ảnh hiện trạng không gian bếp do quý khách cung cấp để phục vụ thiết kế 3D.
                  </li>
                  <li>
                    <strong className="text-white">Dữ liệu kỹ thuật tự động:</strong> Địa chỉ IP, loại trình duyệt, thời gian truy cập, cookie và lịch sử xem các bộ sưu tập tủ bếp trên trang web.
                  </li>
                </ul>
              </div>
            </section>

            {/* ITEM 2 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Phạm Vi Sử Dụng Thông Tin
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  Thông tin cá nhân của quý khách chỉ được sử dụng trong nội bộ DOMINO cho các mục đích hợp pháp sau đây:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="font-bold text-white text-sm sm:text-base">1. Tư Vấn & Đo Đạc</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      Liên hệ tư vấn giải pháp vật liệu kính, khảo sát thực tế và lập báo giá chi tiết.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="font-bold text-white text-sm sm:text-base">2. Thi Công & Bàn Giao</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      Vận chuyển vật tư nhôm kính, tiến hành lắp đặt và hoàn thiện tủ bếp tại công trình.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="font-bold text-white text-sm sm:text-base">3. Bảo Hành & Bảo Trì</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      Theo dõi hồ sơ bảo hành 5 - 10 năm cho khung nhôm, cánh kính và phụ kiện đi kèm.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <h3 className="font-bold text-white text-sm sm:text-base">4. Nâng Cấp Trải Nghiệm</h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      Cải thiện chất lượng dịch vụ, lắng nghe phản hồi và cập nhật mẫu thiết kế mới.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ITEM 3 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Thời Gian Lưu Trữ Thông Tin
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  Thông tin khách hàng sẽ được lưu giữ bảo mật trên hệ thống máy chủ của DOMINO trong suốt thời hạn hợp đồng và thời gian bảo hành sản phẩm (tối thiểu 10 năm) để phục vụ cho các quyền lợi chăm sóc và bảo trì trọn đời.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 border-l-2 border-[#d4af7a] pl-4 italic">
                  Trong trường hợp quý khách có mong muốn chấm dứt việc lưu trữ, quý khách có thể gửi yêu cầu hủy bỏ bất kỳ lúc nào qua hotline hoặc email của DOMINO.
                </p>
              </div>
            </section>

            {/* ITEM 4 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Cam Kết Không Chia Sẻ Dữ Liệu
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  DOMINO cam kết tuyệt đối <strong className="text-white">không thương mại hóa, bán, cho thuê hoặc tiết lộ</strong> thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào vì mục đích quảng cáo không thuộc phạm vi cung cấp dịch vụ của DOMINO.
                </p>
                <p>
                  Ngoại lệ duy nhất chỉ áp dụng khi:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Phối hợp cùng đội ngũ kỹ thuật vận chuyển/lắp đặt ủy quyền để hoàn thiện tủ bếp.</li>
                  <li>Có yêu cầu chính thức bằng văn bản từ cơ quan quản lý nhà nước có thẩm quyền theo pháp luật Việt Nam.</li>
                </ul>
              </div>
            </section>

            {/* ITEM 5 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Quyền Của Khách Hàng
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>Quý khách hàng hoàn toàn có các quyền sau đối với dữ liệu cá nhân của mình:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <span className="text-[#d4af7a] font-bold">🔍</span>
                    <div>
                      <strong className="text-white">Quyền tiếp cận & chỉnh sửa:</strong> Yêu cầu xem lại, sửa đổi hoặc cập nhật chính xác thông tin liên hệ.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <span className="text-[#d4af7a] font-bold">❌</span>
                    <div>
                      <strong className="text-white">Quyền xóa dữ liệu:</strong> Yêu cầu xóa bỏ hồ sơ thông tin cá nhân khỏi hệ thống dữ liệu tư vấn.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <span className="text-[#d4af7a] font-bold">🔕</span>
                    <div>
                      <strong className="text-white">Quyền từ chối nhận thông báo:</strong> Hủy đăng ký nhận bản tin, thông báo ưu đãi bất kỳ lúc nào.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ITEM 6 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Sử Dụng Cookie & An Ninh Hệ Thống
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  Website của chúng tôi sử dụng cookie để lưu nhớ tùy chọn ngôn ngữ, cải thiện tốc độ tải trang và phân tích lượt truy cập nhằm phục vụ quý khách tốt hơn. Quý khách có thể tùy chỉnh chấp nhận hoặc từ chối cookie ngay trong cài đặt trình duyệt của mình.
                </p>
                <p>
                  Hệ thống của DOMINO được bảo vệ bởi chứng chỉ mã hóa SSL/TLS cùng tường lửa hiện đại, đảm bảo dữ liệu truyền tải giữa thiết bị của bạn và server luôn an toàn tuyệt đối.
                </p>
              </div>
            </section>

            {/* CALL TO ACTION */}
            <div className="rounded-3xl border border-[#d4af7a]/40 bg-gradient-to-r from-[#17140e] via-[#0a0a0a] to-[#17140e] p-8 text-center shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Bạn có câu hỏi cần giải đáp?
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Đội ngũ chuyên viên tư vấn của DOMINO luôn sẵn sàng hỗ trợ giải đáp mọi thắc mắc của bạn.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#d4af7a] hover:bg-[#c59e69] px-6 py-3 text-sm font-bold text-[#0f172a] shadow-lg transition active:scale-95"
                >
                  Liên hệ tư vấn ngay →
                </Link>
                <Link
                  href="/dieu-khoan-su-dung"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  Xem Điều khoản sử dụng
                </Link>
              </div>
            </div>

          </article>

        </div>
      </section>
    </main>
  )
}
