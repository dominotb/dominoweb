import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng | DOMINO Glass Kitchen',
  description:
    'Các quy định, điều khoản sử dụng website, bản quyền thiết kế, chính sách tư vấn báo giá và nghĩa vụ của khách hàng khi sử dụng dịch vụ của DOMINO Glass Kitchen.',
}

export default function TermsOfServicePage() {
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
              Điều Khoản Sử Dụng
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
              Chào mừng quý khách đến với DOMINO Glass Kitchen. Việc truy cập và sử dụng dịch vụ trên website của chúng tôi đồng nghĩa với việc quý khách đồng ý tuân thủ các điều khoản bên dưới.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[#d4af7a]">
                📜 Pháp lý minh bạch
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
                  ĐIỂM NỔI BẬT ĐIỀU KHOẢN
                </h3>
                <ul className="mt-5 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">❖</span>
                    <span>Toàn bộ hình ảnh, thiết kế tủ bếp thuộc bản quyền DOMINO.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">❖</span>
                    <span>Khảo sát, báo giá minh bạch theo hợp đồng thi công niêm yết.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">❖</span>
                    <span>Chính sách bảo hành chính hãng từ 5 - 10 năm cho hệ thống tủ bếp.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#d4af7a] text-base mt-0.5">❖</span>
                    <span>Cam kết bảo mật thông tin và tôn trọng quyền lợi của khách hàng.</span>
                  </li>
                </ul>
              </div>

              {/* BRAND CARD */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#121212] to-[#0a0a0a] p-6 sm:p-7 backdrop-blur-md shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af7a]">
                  ĐƠN VỊ CHỦ QUẢN
                </span>
                <h4 className="mt-2 text-base font-bold text-white">
                  CÔNG TY TNHH XÂY DỰNG VÀ SẢN XUẤT DOMINO
                </h4>
                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <p><strong className="text-white">Người đại diện:</strong> Ông Lại Văn Minh (Giám đốc)</p>
                  <p><strong className="text-white">Showroom & Nhà Xưởng:</strong> Lô 5,6, Khu TDC DC1 Phường Trà Lý, Tỉnh Hưng Yên</p>
                  <p><strong className="text-white">Hotline:</strong> 0975 811 678 - 0964 811 678</p>
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
                  Chấp Thuận Các Điều Khoản
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  Bằng cách truy cập, duyệt xem hoặc gửi yêu cầu trên website <strong className="text-white">DOMINO Glass Kitchen</strong>, quý khách xác nhận đã đọc, hiểu và đồng ý tuân thủ các Điều khoản sử dụng này.
                </p>
                <p>
                  Nếu quý khách không đồng ý với bất kỳ phần nào trong các điều khoản này, vui lòng ngừng truy cập website hoặc liên hệ trực tiếp bộ phận CSKH để được hướng dẫn thêm.
                </p>
              </div>
            </section>

            {/* ITEM 2 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Quyền Sở Hữu Trí Tuệ
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  Tất cả nội dung trên website bao gồm nhưng không giới hạn: hình ảnh công trình thực tế, thiết kế bản vẽ 3D, logo thương hiệu, catalog sản phẩm, văn bản và giao diện người dùng đều thuộc sở hữu trí tuệ hợp pháp của <strong className="text-white">CÔNG TY TNHH XÂY DỰNG VÀ SẢN XUẤT DOMINO</strong>.
                </p>
                <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-4 text-xs sm:text-sm text-slate-300">
                  <span className="text-red-400 font-bold">⛔ Nghiêm cấm:</span> Việc sao chép, tải về thương mại hóa, chỉnh sửa hoặc phát hành lại các bản vẽ thiết kế và hình ảnh dự án của DOMINO khi chưa có sự đồng ý bằng văn bản từ đại diện hợp pháp của công ty.
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
                  Quy Trình Tư Vấn, Báo Giá & Đặt Hàng
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>Quy trình làm việc chuẩn hóa tại DOMINO bao gồm 4 bước chính:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[#d4af7a] font-mono font-bold text-xs">BƯỚC 1</div>
                    <h3 className="font-bold text-white text-sm sm:text-base mt-1">Tiếp Nhận & Tư Vấn</h3>
                    <p className="mt-1 text-xs text-slate-300">Lắng nghe nhu cầu, chất liệu cánh kính, khung nhôm Anode và công năng mong muốn.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[#d4af7a] font-mono font-bold text-xs">BƯỚC 2</div>
                    <h3 className="font-bold text-white text-sm sm:text-base mt-1">Khảo Sát Thực Tế</h3>
                    <p className="mt-1 text-xs text-slate-300">Kỹ sư khảo sát đo đạc mặt bằng công trình chính xác đến từng milimet.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[#d4af7a] font-mono font-bold text-xs">BƯỚC 3</div>
                    <h3 className="font-bold text-white text-sm sm:text-base mt-1">Lập Bản Vẽ & Báo Giá</h3>
                    <p className="mt-1 text-xs text-slate-300">Thống nhất bản vẽ 3D, bóc tách khối lượng và ký hợp đồng thi công chính thức.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[#d4af7a] font-mono font-bold text-xs">BƯỚC 4</div>
                    <h3 className="font-bold text-white text-sm sm:text-base mt-1">Sản Xuất & Bàn Giao</h3>
                    <p className="mt-1 text-xs text-slate-300">Sản xuất tại nhà xưởng, vận chuyển lắp đặt hoàn thiện và ký biên bản nghiệm thu.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ITEM 4 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Thanh Toán, Vận Chuyển & Lắp Đặt
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-white">Điều khoản thanh toán:</strong> Được quy định rõ ràng trong từng hợp đồng kinh tế ký kết giữa hai bên (Thường chia thành các đợt: Đặt cọc sản xuất - Giao hàng vật tư - Nghiệm thu bàn giao).
                  </li>
                  <li>
                    <strong className="text-white">Thời gian thi công:</strong> DOMINO cam kết đúng tiến độ đã thỏa thuận trong hợp đồng. Trừ các trường hợp bất khả kháng hoặc chậm trễ mặt bằng từ phía chủ nhà.
                  </li>
                  <li>
                    <strong className="text-white">Phạm vi phục vụ:</strong> DOMINO nhận khảo sát, vận chuyển và thi công lắp đặt trọn gói trên toàn quốc.
                  </li>
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
                  Chính Sách Bảo Hành & Bảo Trì
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>Tất cả sản phẩm tủ bếp kính DOMINO bàn giao đều được áp dụng chế độ bảo hành chính hãng:</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-extrabold text-[#d4af7a]">10 Năm</div>
                    <div className="mt-1 text-xs font-semibold text-white">Khung nhôm Anode</div>
                    <p className="mt-1 text-[11px] text-slate-400">Bảo hành kết cấu khung tủ và lỗi sản xuất</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-extrabold text-[#d4af7a]">5 Năm</div>
                    <div className="mt-1 text-xs font-semibold text-white">Bề mặt cánh kính</div>
                    <p className="mt-1 text-[11px] text-slate-400">Xử lý các lỗi hoàn thiện bề mặt kính</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-extrabold text-[#d4af7a]">Trọn Đời</div>
                    <div className="mt-1 text-xs font-semibold text-white">Chăm sóc & Bảo trì</div>
                    <p className="mt-1 text-[11px] text-slate-400">Hỗ trợ kỹ thuật, điều chỉnh khi có yêu cầu</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 pt-2">
                  * Chi tiết phạm vi bảo hành được đính kèm trong phiếu bảo hành giao cho khách hàng sau khi hoàn tất bàn giao.
                </p>
              </div>
            </section>

            {/* ITEM 6 */}
            <section className="rounded-3xl border border-white/15 bg-[#0a0a0a]/90 p-7 sm:p-9 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d4af7a]/20 font-mono text-base font-bold text-[#d4af7a]">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Giới Hạn Trách Nhiệm & Thay Đổi Điều Khoản
                </h2>
              </div>
              <div className="mt-5 space-y-4">
                <p>
                  DOMINO nỗ lực đảm bảo thông tin trên website luôn chính xác và cập nhật nhất. Tuy nhiên, hình ảnh màu sắc thực tế của cánh kính có thể có độ chênh lệch nhỏ tùy thuộc vào thiết bị hiển thị của quý khách. Chúng tôi khuyến khích quý khách ghé thăm Showroom trực tiếp để trải nghiệm mẫu thực tế.
                </p>
                <p>
                  DOMINO có quyền thay đổi, chỉnh sửa các điều khoản này vào bất kỳ lúc nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải công khai trên trang web này.
                </p>
              </div>
            </section>

            {/* CALL TO ACTION */}
            <div className="rounded-3xl border border-[#d4af7a]/40 bg-gradient-to-r from-[#17140e] via-[#0a0a0a] to-[#17140e] p-8 text-center shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Sẵn sàng kiến tạo không gian bếp mơ ước?
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Hãy để DOMINO đồng hành mang đến bộ tủ bếp kính đẳng cấp và bền vững cho gia đình bạn.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-xl bg-[#d4af7a] hover:bg-[#c59e69] px-6 py-3 text-sm font-bold text-[#0f172a] shadow-lg transition active:scale-95"
                >
                  Nhận báo giá ngay →
                </Link>
                <Link
                  href="/chinh-sach-bao-mat"
                  className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  Xem Chính sách bảo mật
                </Link>
              </div>
            </div>

          </article>

        </div>
      </section>
    </main>
  )
}
