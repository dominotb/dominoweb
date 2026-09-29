export default function Consultation() {
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
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-label="Form tư vấn">
            <label className="sr-only" htmlFor="name">
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              className="border-b border-[#b8ad9d] bg-transparent p-4 text-[#171717] placeholder:text-[#78716c]"
              placeholder="Họ và tên"
            />
            <label className="sr-only" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              className="border-b border-[#b8ad9d] bg-transparent p-4 text-[#171717] placeholder:text-[#78716c]"
              placeholder="Số điện thoại"
            />
            <label className="sr-only" htmlFor="brief">
              Nhu cầu
            </label>
            <textarea
              id="brief"
              name="brief"
              rows={3}
              className="sm:col-span-2 border-b border-[#b8ad9d] bg-transparent p-4 text-[#171717] placeholder:text-[#78716c]"
              placeholder="Mô tả nhu cầu của bạn"
            />
            <div className="sm:col-span-2">
              <button
                type="button"
                className="btn-primary touch-card-active focus-ring w-full sm:w-auto"
              >
                Nhận tư vấn ngay <span className="ml-2" aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
