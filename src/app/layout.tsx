import './globals.css'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import MotionSystem from '@/components/MotionSystem'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: 'DOMINO Glass Kitchen',
  description: 'Tủ bếp cho những năm tháng phía trước',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <MotionSystem />
        <Header />
        {children}
        <MobileBottomNav />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
