import { Bell, Database, Palette, Save, ShieldCheck } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

const groups = [
  { title: "إعدادات النظام", description: "اسم النظام، اللغة، والمنطقة الزمنية", icon: Database },
  { title: "المظهر والهوية", description: "الألوان، الشعار، ووضع العرض", icon: Palette },
  { title: "الأدوار والصلاحيات", description: "التحكم في وصول كل مستخدم", icon: ShieldCheck },
  { title: "الإشعارات", description: "قواعد التنبيهات والبريد", icon: Bell },
]

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="التحكم"
        title="إعدادات النظام"
        description="المركز الرئيسي لتخصيص ContentFlow والتحكم في طريقة عمله."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            <Save className="size-4" />
            حفظ التغييرات
          </button>
        }
      />
      <section className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => {
          const Icon = group.icon
          return (
            <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="mb-8 grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-700">
                <Icon className="size-5" />
              </span>
              <h2 className="text-lg font-black">{group.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{group.description}</p>
              <button className="mt-6 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black">فتح الإعدادات</button>
            </article>
          )
        })}
      </section>
    </>
  )
}
