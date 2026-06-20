import { ArrowLeft, Layers3, ShieldCheck, Sparkles } from "lucide-react"

import { LoginForm } from "@/components/auth/login-form"

type LoginPageProps = {
  searchParams: Promise<{
    next?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams

  return (
    <main className="min-h-screen bg-[#f5f6f8] p-4 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 sm:min-h-[calc(100vh-3rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-32 -top-32 size-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-28 size-[28rem] rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-slate-950">
                <Sparkles className="size-5" />
              </span>
              <div>
                <p className="text-xl font-black tracking-tight">ContentFlow</p>
                <p className="text-xs text-slate-400">إدارة المحتوى بوضوح</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black text-slate-300">
              <ShieldCheck className="size-4 text-emerald-300" />
              مساحة عمل آمنة لفريقك
            </span>
            <h1 className="text-4xl font-black leading-[1.35] tracking-tight xl:text-5xl">
              من أول فكرة...
              <br />
              لحد النشر والتحليل.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
              نظّم الطلبات، المحتوى، التصميم، المراجعات والاعتمادات داخل رحلة
              عمل واحدة واضحة.
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Layers3 className="mb-4 size-5 text-blue-300" />
              <p className="text-sm font-black">سير عمل متكامل</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                كل مرحلة ومسؤول وموعد في مكان واحد.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="mb-4 size-5 text-emerald-300" />
              <p className="text-sm font-black">دخول محمي</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                جلسات آمنة مرتبطة مباشرة بـSupabase.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <span className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-white">
                <Sparkles className="size-5" />
              </span>
              <div>
                <p className="text-xl font-black tracking-tight">ContentFlow</p>
                <p className="text-xs text-slate-500">إدارة المحتوى بوضوح</p>
              </div>
            </div>

            <p className="mb-3 flex items-center gap-2 text-sm font-black text-slate-500">
              مرحبًا بعودتك
              <ArrowLeft className="size-4" />
            </p>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">
              تسجيل الدخول
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              استخدم بيانات حسابك للوصول إلى مساحة العمل.
            </p>

            <LoginForm nextPath={params.next} />

            <p className="mt-8 text-center text-xs leading-6 text-slate-400">
              الدخول متاح فقط للمستخدمين المسجلين داخل النظام.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
