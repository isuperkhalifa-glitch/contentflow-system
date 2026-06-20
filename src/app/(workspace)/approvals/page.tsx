import { BadgeCheck, Clock3 } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

export default function ApprovalsPage() {
  return (
    <>
      <PageHeader
        eyebrow="الجودة"
        title="المراجعات والاعتمادات"
        description="راجع النسخ المطلوبة، اطلب التعديلات، واعتمد المحتوى قبل النشر."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="space-y-3">
          {["إعلان دورة CAPM", "كاروسيل مؤشرات الأداء", "فيديو خدمات المعهد", "بوست الأمن السيبراني"].map((item, index) => (
            <article key={item} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center">
              <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <BadgeCheck className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-black">{item}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock3 className="size-3.5" />
                  أُرسل للمراجعة منذ {index + 1} ساعة
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black">طلب تعديل</button>
                <button className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white">اعتماد</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
