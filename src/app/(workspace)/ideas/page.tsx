import { Lightbulb, Plus, Sparkles } from "lucide-react"

import { PageHeader } from "@/components/workspace/page-header"

export default function IdeasPage() {
  return (
    <>
      <PageHeader
        eyebrow="الإلهام"
        title="بنك الأفكار"
        description="احفظ الأفكار والهوكات والمراجع، ثم حوّل أي فكرة إلى محتوى بضغطة."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white">
            <Plus className="size-4" />
            فكرة جديدة
          </button>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {["ليش غيرك متقدم عليك؟", "قرار واحد يوقف خسائر كبيرة", "الفرق مو في Excel", "قبل ما تضغط تعلّم", "من فكرة لنتيجة", "كيف تختار دورتك؟"].map((idea, index) => (
          <article key={idea} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-8 flex items-center justify-between">
              <Lightbulb className="size-5 text-amber-500" />
              <span className="text-xs font-bold text-slate-400">IDEA-{index + 1}</span>
            </div>
            <h2 className="text-lg font-black leading-7">{idea}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">فكرة قابلة للتحويل إلى بوست أو كاروسيل أو إعلان.</p>
            <button className="mt-6 flex items-center gap-2 text-sm font-black text-slate-700">
              <Sparkles className="size-4" />
              تحويل إلى محتوى
            </button>
          </article>
        ))}
      </section>
    </>
  )
}
