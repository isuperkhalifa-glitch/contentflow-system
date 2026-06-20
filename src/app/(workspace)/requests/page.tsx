import { ClipboardList, Plus } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

export default function RequestsPage() {
  return (
    <>
      <PageHeader
        eyebrow="المدخلات"
        title="طلبات المحتوى"
        description="استقبل الطلبات الجديدة، راجع البريف، وحوّل الطلب إلى مهمة تنفيذ."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            <Plus className="size-4" />
            طلب جديد
          </button>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {["حملة دورة PMP", "إعلان English Club", "بوست خدمات المعهد", "كاروسيل Excel", "فيديو تعريفي", "إعلان CAPM"].map((item, index) => (
          <article key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-slate-100"><ClipboardList className="size-5" /></span>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">جديد</span>
            </div>
            <h2 className="font-black">{item}</h2>
            <p className="mt-2 text-sm text-slate-500">طلب محتوى رقم REQ-{String(index + 1).padStart(3, "0")}</p>
          </article>
        ))}
      </section>
    </>
  )
}
