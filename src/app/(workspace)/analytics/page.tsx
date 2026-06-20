import { BarChart3, Eye, Heart, MousePointerClick, Share2 } from "lucide-react"

import { MetricCard } from "@/components/workspace/metric-card"
import { PageHeader } from "@/components/workspace/page-header"

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        eyebrow="الأداء"
        title="تحليلات المحتوى"
        description="قِس الوصول والتفاعل والتحويل، وقارن أداء البراندات والمنصات."
      />
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="الوصول" value="184K" badge="+18%" hint="آخر 30 يومًا" icon={<Eye className="size-5" />} />
        <MetricCard title="التفاعل" value="12.4K" badge="+9%" hint="إعجابات وتعليقات" icon={<Heart className="size-5" />} />
        <MetricCard title="المشاركات" value="2,840" badge="+14%" hint="إجمالي المشاركات" icon={<Share2 className="size-5" />} />
        <MetricCard title="التحويلات" value="486" badge="+7%" hint="نقرات ورسائل" icon={<MousePointerClick className="size-5" />} />
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6">
        <div className="mb-8 flex items-center gap-3">
          <BarChart3 className="size-5" />
          <div>
            <h2 className="text-xl font-black">نظرة الأداء الشهرية</h2>
            <p className="text-sm text-slate-500">هيكل مبدئي للرسم البياني</p>
          </div>
        </div>
        <div className="flex h-72 items-end gap-3 rounded-2xl bg-slate-50 p-6">
          {[45, 70, 52, 88, 64, 92, 78, 100, 84, 96, 74, 90].map((height, index) => (
            <div key={index} className="flex flex-1 items-end">
              <div className="w-full rounded-t-lg bg-slate-950" style={{ height: `${height}%` }} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
