export default function Warranty({ warranties }: { warranties?: any[] }) {
  const items = warranties && warranties.length ? warranties : [
    { id: 'w1', title: 'Khung/Thùng', value: '10 năm' },
    { id: 'w2', title: 'Cánh kính', value: '5 năm' },
    { id: 'w3', title: 'Phụ kiện', value: '2 năm' },
  ]

  return (
    <section id="warranty" className="relative flex min-h-[100svh] flex-col justify-center bg-[#faf9f6] py-16 text-[#171717] md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-motion-reveal>
            <div className="eyebrow">Bảo hành</div>
            <h2 className="heading-clip mt-5 text-4xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-6xl">
              <span className="heading-clip-inner">TIÊU CHUẨN CHO GIÁ TRỊ DÀI HẠN</span>
            </h2>
          </div>
          <div data-motion-reveal>
            <p className="max-w-xl text-base leading-8 text-[#57534e]">
              Bảo dưỡng, kiểm tra và chăm sóc theo tiêu chuẩn DOMINO, với chính sách rõ ràng trước khi bàn giao.
            </p>
            <div className="mt-10 grid grid-cols-1 divide-y divide-[#d6d0c5] border-t border-[#d6d0c5] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {items.map((item) => (
                <div key={item.id} className="py-5 sm:px-5 sm:first:pl-0">
                  <div
                    data-motion-count={item.value}
                    className="text-4xl font-semibold tracking-[-0.06em] text-[#171717]"
                  >
                    {item.value}
                  </div>
                  <div className="mt-3 text-xs uppercase tracking-[0.16em] text-[#78716c]">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
