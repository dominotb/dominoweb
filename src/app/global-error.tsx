'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="vi">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-[#f4f1ec] px-6 py-20 text-[#111827]">
          <div className="max-w-md rounded-[28px] border border-[#e7e1d9] bg-white p-8 text-center shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff7ed] text-2xl text-[#b45309]">
              !
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#64748b]">DOMINO</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#111111]">
              Ứng dụng đang gặp sự cố
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#475569]">
              Hệ thống cần tải lại để khôi phục giao diện.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="btn-primary mt-6"
            >
              Tải lại
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
