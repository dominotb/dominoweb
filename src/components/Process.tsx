const steps = [
  { id: '01', title: 'Thiết kế', desc: 'Khảo sát không gian, tư vấn tỷ lệ, ánh sáng và vật liệu hợp lý.' },
  { id: '02', title: 'Sản xuất', desc: 'Gia công quy trình chuẩn, kiểm soát chất lượng từng chi tiết.' },
  { id: '03', title: 'Kiểm tra', desc: 'Đánh giá cẩn thận trước khi bàn giao và lắp đặt.' },
  { id: '04', title: 'Lắp đặt', desc: 'Đội ngũ chuyên môn thực hiện hoàn thiện theo chuẩn bếp cao cấp.' },
]

export default function Process() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center bg-[#f4f0e8] py-16 text-[#171717] md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl" data-motion-reveal>
          <div className="eyebrow">Quy trình</div>
          <h2 className="heading-clip mt-5 text-4xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-6xl">
            <span className="heading-clip-inner">QUY TRÌNH TỪ THIẾT KẾ ĐẾN HOÀN THIỆN</span>
          </h2>
        </div>

        {/* Divider progress line */}
        <div data-motion-line className="mt-12 h-px w-full bg-[#171717] opacity-20" />

        <div className="grid gap-0 border-b border-[#c9c1b4] md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              data-motion-reveal
              className="relative border-b border-[#c9c1b4] py-7 last:border-b-0 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#171717] text-xs font-semibold text-[#171717]">
                  {step.id}
                </span>
                <span className="h-px flex-1 bg-[#c9c1b4] md:hidden" />
              </div>
              <h3 className="text-2xl font-medium">{step.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-7 text-[#57534e]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
