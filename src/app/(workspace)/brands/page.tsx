import { Megaphone, Plus } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

const brands = [
  ["سكاي إيليت", "12 محتوى نشط", "أزرق + أخضر"],
  ["ريف المهارات", "18 محتوى نشط", "كحلي + أزرق"],
  ["القدرات الإدارية", "7 محتويات نشطة", "كحلي + أخضر"],
  ["ماركتون", "5 محتويات نشطة", "أسود + أبيض"],
]

export default function BrandsPage() {
  return (
    <>
      <PageHeader
        eyebrow="الهوية"
        title="البراندات والحملات"
        description="إدارة الهويات البصرية، نبرة التواصل، العروض والحملات لكل براند."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            <Plus className="size-4" />
            براند جديد
          </button>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {brands.map(([name, count, identity], index) => (
          <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-8 grid size-12 place-items-center rounded-2xl bg-slate-950 text-white">
              <Megaphone className="size-5" />
            </div>
            <h2 className="text-lg font-black">{name}</h2>
            <p className="mt-2 text-sm text-slate-500">{count}</p>
            <p className="mt-5 text-xs font-bold text-slate-400">الهوية: {identity}</p>
            <p className="mt-2 text-xs text-slate-400">BR-{String(index + 1).padStart(2, "0")}</p>
          </article>
        ))}
      </section>
    </>
  )
}
