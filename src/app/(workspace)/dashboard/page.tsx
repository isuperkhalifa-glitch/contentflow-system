import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Files,
  FolderKanban,
  Sparkles,
  Target,
} from "lucide-react"

import { MetricCard } from "@/components/workspace/metric-card"
import { PageHeader } from "@/components/workspace/page-header"

const stages = [
  { title: "كتابة المحتوى", count: 5, tone: "bg-amber-50 text-amber-700", items: ["كاروسيل أخطاء إدارة المشاريع", "إعلان مؤشرات الأداء"] },
  { title: "قيد التصميم", count: 7, tone: "bg-blue-50 text-blue-700", items: ["حملة PMP — النسخة الثانية", "برنامج الأمن السيبراني"] },
  { title: "قيد المراجعة", count: 4, tone: "bg-violet-50 text-violet-700", items: ["فيديو خدمات المعهد", "كاروسيل رحلة المتدرب"] },
  { title: "جاهز للنشر", count: 8, tone: "bg-emerald-50 text-emerald-700", items: ["إعلان دورة CAPM", "بوست نصائح Excel"] },
]

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="السبت، 20 يونيو 2026"
        title="صباح الخير، خليفة"
        description="عندك 4 قطع محتوى تنتظر اعتمادك، و3 منشورات مجدولة خلال الأيام القادمة."
      />

      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="المحتوى الجاري" value="24" badge="+12%" hint="مقارنة بالشهر الماضي" icon={<FolderKanban className="size-5" />} />
        <MetricCard title="بانتظار الاعتماد" value="08" badge="4 عاجلة" hint="تحتاج مراجعتك اليوم" icon={<CheckCircle2 className="size-5" />} />
        <MetricCard title="مجدول للنشر" value="17" badge="هذا الأسبوع" hint="عبر 5 منصات" icon={<CalendarDays className="size-5" />} />
        <MetricCard title="معدل الإنجاز" value="87%" badge="+6%" hint="منذ بداية الشهر" icon={<Target className="size-5" />} />
      </section>

      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="mb-5">
          <h2 className="text-xl font-black">سير العمل اليومي</h2>
          <p className="mt-1 text-sm text-slate-500">متابعة المحتوى حسب المرحلة الحالية</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.title} className="rounded-2xl bg-slate-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className={`rounded-lg px-2.5 py-1 text-xs font-black ${stage.tone}`}>{stage.title}</span>
                <span className="text-xs font-black text-slate-400">{stage.count}</span>
              </div>
              <div className="space-y-3">
                {stage.items.map((item) => (
                  <article key={item} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-black leading-6">{item}</p>
                    <p className="mt-2 text-xs text-slate-500">ريف المهارات</p>
                    <p className="mt-4 flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                      <Clock3 className="size-3.5" />
                      اليوم
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <Files className="size-5 text-slate-600" />
            <div>
              <h2 className="text-xl font-black">أحدث المحتويات</h2>
              <p className="text-sm text-slate-500">آخر العناصر التي تم تحديثها</p>
            </div>
          </div>
          <div className="space-y-3">
            {["إعلان دورة CAPM", "كاروسيل مؤشرات الأداء", "بوست الأمن السيبراني"].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4">
                <div className="grid size-10 place-items-center rounded-xl bg-slate-100 text-sm font-black">{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{item}</p>
                  <p className="mt-1 text-xs text-slate-500">تم التحديث منذ {index + 1} ساعة</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-200">
          <span className="grid size-11 place-items-center rounded-xl bg-white/10">
            <Sparkles className="size-5" />
          </span>
          <h2 className="mt-10 text-2xl font-black leading-9">حوّل فكرتك إلى خطة محتوى واضحة</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            اكتب الهدف والبراند، وسيجهز لك النظام الهيكل المقترح والمهام المطلوبة.
          </p>
          <button className="mt-8 w-full rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950">
            ابدأ بفكرة جديدة
          </button>
        </article>
      </section>
    </>
  )
}
