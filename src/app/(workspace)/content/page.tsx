import { Files, Filter, Plus } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

const rows = [
  ["CNT-024", "إعلان دورة CAPM", "ريف المهارات", "قيد التصميم", "اليوم"],
  ["CNT-023", "كاروسيل مؤشرات الأداء", "سكاي إيليت", "قيد المراجعة", "غدًا"],
  ["CNT-022", "بوست الأمن السيبراني", "القدرات الإدارية", "كتابة المحتوى", "22 يونيو"],
  ["CNT-021", "فيديو خدمات المعهد", "الدرة للتدريب", "جاهز للنشر", "23 يونيو"],
]

export default function ContentPage() {
  return (
    <>
      <PageHeader
        eyebrow="مكتبة العمل"
        title="إدارة المحتوى"
        description="تابع كل قطعة محتوى من البريف وحتى النشر في مكان واحد."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            <Plus className="size-4" />
            محتوى جديد
          </button>
        }
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-slate-100">
              <Files className="size-5" />
            </span>
            <div>
              <h2 className="font-black">كل المحتويات</h2>
              <p className="text-xs text-slate-500">24 عنصرًا نشطًا</p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black">
            <Filter className="size-4" />
            تصفية
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-right">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500">
                {["الكود", "اسم المحتوى", "البراند", "الحالة", "التسليم"].map((head) => (
                  <th key={head} className="px-4 py-3 font-black">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100 last:border-0">
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`} className="px-4 py-4 text-sm font-bold text-slate-700">
                      {index === 3 ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">{cell}</span>
                      ) : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
