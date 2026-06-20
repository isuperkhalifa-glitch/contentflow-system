import { Plus, Users } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

const members = [
  ["خليفة", "مدير النظام", "نشط"],
  ["مروان", "مدير الأعمال والتطوير", "نشط"],
  ["أحمد", "كاتب محتوى", "نشط"],
  ["سارة", "مصممة جرافيك", "مشغولة"],
  ["محمد", "مسوّق إعلانات", "نشط"],
]

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="المستخدمون"
        title="الفريق والصلاحيات"
        description="إدارة أعضاء الفريق، أدوارهم، وصلاحيات الوصول إلى النظام."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            <Plus className="size-4" />
            إضافة عضو
          </button>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map(([name, role, status]) => (
          <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-5 flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-white">{name[0]}</span>
              <div>
                <h2 className="font-black">{name}</h2>
                <p className="text-sm text-slate-500">{role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500"><Users className="size-4" /> عضو فريق</span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{status}</span>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
