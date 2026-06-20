import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

const days = Array.from({ length: 35 }, (_, index) => index - 2)

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        eyebrow="خطة النشر"
        title="تقويم المحتوى"
        description="استعرض الجدول الشهري للمحتوى وحافظ على انتظام النشر."
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-5" />
            <h2 className="text-xl font-black">يونيو 2026</h2>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-slate-200 p-2.5"><ChevronRight className="size-4" /></button>
            <button className="rounded-xl border border-slate-200 p-2.5"><ChevronLeft className="size-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-7 overflow-hidden rounded-2xl border border-slate-200">
          {["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"].map((day) => (
            <div key={day} className="border-b border-l border-slate-200 bg-slate-50 p-3 text-center text-xs font-black last:border-l-0">{day}</div>
          ))}
          {days.map((day, index) => (
            <div key={index} className="min-h-28 border-b border-l border-slate-100 p-2 last:border-l-0">
              {day > 0 && day <= 30 ? (
                <>
                  <p className="text-xs font-black text-slate-500">{day}</p>
                  {[20, 21, 22, 25].includes(day) ? (
                    <div className="mt-2 rounded-lg bg-slate-950 p-2 text-[10px] font-bold text-white">
                      محتوى مجدول
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
