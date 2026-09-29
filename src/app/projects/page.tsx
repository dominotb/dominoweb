import Image from 'next/image'
import PageIntro from '@/components/PageIntro'
import { projects } from '@/data/site'

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f2] text-[#111827]"><PageIntro eyebrow="Công trình" title="Những căn bếp được thiết kế để sống lâu hơn." description="Mỗi dự án bắt đầu từ thói quen, mặt bằng và nhịp sống thật của gia đình. Đây là một số không gian DOMINO đã hoàn thiện." />
      <section className="container mx-auto grid gap-6 px-6 py-16 md:grid-cols-2 md:py-24">{projects.map((project) => <article key={project.title} className="overflow-hidden rounded-[24px] border border-[#e5e7eb] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]"><div className="relative h-72"><Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /></div><div className="p-6"><div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-[#64748b]"><span>{project.type}</span><span>{project.location}</span></div><h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">{project.title}</h2><p className="mt-3 text-sm leading-7 text-[#475569]">{project.description}</p></div></article>)}</section>
    </main>
  )
}