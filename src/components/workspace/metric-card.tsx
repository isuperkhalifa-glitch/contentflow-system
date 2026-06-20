import type { ReactNode } from "react"

type MetricCardProps = {
  title: string
  value: string
  hint: string
  badge: string
  icon: ReactNode
}

export function MetricCard({ title, value, hint, badge, icon }: MetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="mb-5 flex items-start justify-between">
        <div className="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">
          {badge}
        </span>
      </div>
      <p className="text-sm font-bold text-slate-500">{title}</p>
      <p className="mt-1 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-3 text-xs text-slate-400">{hint}</p>
    </article>
  )
}
