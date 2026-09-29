import Link from 'next/link'

type PageIntroProps = {
  eyebrow: string
  title: string
  description: string
  action?: { label: string; href: string }
}

export default function PageIntro({ eyebrow, title, description, action }: PageIntroProps) {
  return (
    <section className="border-b border-[#e7e1d9] bg-[#111827] pt-14 pb-12 text-white sm:py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
          {action ? <Link href={action.href} className="btn-primary mt-8">{action.label} <span className="ml-2" aria-hidden="true">→</span></Link> : null}
        </div>
      </div>
    </section>
  )
}