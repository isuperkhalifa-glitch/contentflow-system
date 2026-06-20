import {
  Archive,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronLeft,
  CircleCheckBig,
  Clock3,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Lightbulb,
  Megaphone,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

const navigation = [
  { label: "لوحة التحكم", icon: LayoutDashboard, active: true },
  { label: "إدارة المحتوى", icon: FolderKanban },
  { label: "تقويم المحتوى", icon: CalendarDays },
  { label: "طلبات المحتوى", icon: FileText, count: 7 },
  { label: "بنك الأفكار", icon: Lightbulb },
  { label: "البراندات والحملات", icon: Megaphone },
  { label: "المراجعات والاعتمادات", icon: CircleCheckBig, count: 4 },
  { label: "الفريق", icon: Users },
  { label: "التحليلات", icon: BarChart3 },
]

const stats = [
  {
    title: "المحتوى الجاري",
    value: "24",
    change: "+12%",
    hint: "مقارنة بالشهر الماضي",
    icon: FolderKanban,
  },
  {
    title: "بانتظار الاعتماد",
    value: "08",
    change: "4 عاجلة",
    hint: "تحتاج مراجعتك اليوم",
    icon: CircleCheckBig,
  },
  {
    title: "مجدول للنشر",
    value: "17",
    change: "هذا الأسبوع",
    hint: "عبر 5 منصات",
    icon: CalendarDays,
  },
  {
    title: "معدل الإنجاز",
    value: "87%",
    change: "+6%",
    hint: "منذ بداية الشهر",
    icon: Target,
  },
]

const workflow = [
  {
    title: "كتابة المحتوى",
    count: 5,
    tone: "bg-amber-50 text-amber-700 ring-amber-200",
    items: [
      { title: "كاروسيل: أخطاء إدارة المشاريع", brand: "سكاي إيليت", due: "اليوم" },
      { title: "إعلان دورة مؤشرات الأداء", brand: "ريف المهارات", due: "غدًا" },
    ],
  },
  {
    title: "قيد التصميم",
    count: 7,
    tone: "bg-blue-50 text-blue-700 ring-blue-200",
    items: [
      { title: "حملة PMP — النسخة الثانية", brand: "ريف المهارات", due: "اليوم" },
      { title: "بوست برنامج الأمن السيبراني", brand: "القدرات الإدارية", due: "22 يونيو" },
    ],
  },
  {
    title: "قيد المراجعة",
    count: 4,
    tone: "bg-violet-50 text-violet-700 ring-violet-200",
    items: [
      { title: "فيديو تعريفي بخدمات المعهد", brand: "الدرة للتدريب", due: "عاجل" },
      { title: "كاروسيل رحلة المتدرب", brand: "سكاي إيليت", due: "23 يونيو" },
    ],
  },
  {
    title: "جاهز للنشر",
    count: 8,
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    items: [
      { title: "إعلان دورة CAPM", brand: "ريف المهارات", due: "اليوم 8:00 م" },
      { title: "بوست نصائح Excel", brand: "سكاي إيليت", due: "غدًا 2:00 م" },
    ],
  },
]

const schedule = [
  { day: "20", month: "يونيو", title: "إعلان دورة CAPM", platform: "إنستجرام", time: "8:00 م" },
  { day: "21", month: "يونيو", title: "كاروسيل مؤشرات الأداء", platform: "لينكدإن", time: "11:00 ص" },
  { day: "22", month: "يونيو", title: "بوست الأمن السيبراني", platform: "إكس", time: "6:30 م" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-72 flex-col border-l border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-lg font-black tracking-tight">ContentFlow</p>
                <p className="text-xs text-slate-500">إدارة المحتوى بوضوح</p>
              </div>
            </div>
          </div>
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="طي القائمة">
            <Menu className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            مساحة العمل
          </p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    item.active
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="flex-1 text-right">{item.label}</span>
                  {item.count ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] ${
                        item.active ? "bg-white/15 text-white" : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.count}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="border-t border-slate-100 p-4">
          <button className="mb-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            <Settings className="size-5" />
            <span>الإعدادات</span>
          </button>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
            <div className="grid size-10 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              خ
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">خليفة</p>
              <p className="truncate text-xs text-slate-500">مدير النظام</p>
            </div>
            <MoreHorizontal className="size-5 text-slate-400" />
          </div>
        </div>
      </aside>

      <div className="lg:pr-72">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
            <button className="rounded-xl border border-slate-200 p-2.5 lg:hidden" aria-label="فتح القائمة">
              <Menu className="size-5" />
            </button>

            <div className="hidden flex-1 md:block">
              <div className="relative max-w-xl">
                <Search className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                  placeholder="ابحث عن محتوى، براند، حملة..."
                />
              </div>
            </div>

            <div className="mr-auto flex items-center gap-2">
              <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50">
                <Bell className="size-5" />
                <span className="absolute -left-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-rose-500" />
              </button>
              <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 sm:flex">
                <MessageSquareText className="size-4" />
                التعليقات
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-slate-800">
                <Plus className="size-4" />
                محتوى جديد
              </button>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-500">السبت، 20 يونيو 2026</p>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">صباح الخير، خليفة</h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                عندك 4 قطع محتوى تنتظر اعتمادك، و3 منشورات مجدولة خلال الأيام القادمة.
              </p>
            </div>
            <button className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold shadow-sm hover:bg-slate-50">
              عرض تقويم المحتوى
              <ChevronLeft className="size-4" />
            </button>
          </section>

          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <article
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="grid size-11 place-items-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="size-5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
                  <p className="mt-1 text-3xl font-black tracking-tight">{stat.value}</p>
                  <p className="mt-3 text-xs text-slate-400">{stat.hint}</p>
                </article>
              )
            })}
          </section>

          <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black">سير العمل اليومي</h2>
                <p className="mt-1 text-sm text-slate-500">متابعة المحتوى حسب المرحلة الحالية</p>
              </div>
              <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50">
                عرض الكل
              </button>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {workflow.map((column) => (
                <div key={column.title} className="rounded-2xl bg-slate-50 p-3">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ring-1 ${column.tone}`}>
                        {column.title}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{column.count}</span>
                    </div>
                    <MoreHorizontal className="size-4 text-slate-400" />
                  </div>

                  <div className="space-y-3">
                    {column.items.map((item) => (
                      <article
                        key={item.title}
                        className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"
                      >
                        <p className="text-sm font-bold leading-6">{item.title}</p>
                        <p className="mt-2 text-xs text-slate-500">{item.brand}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                            <Clock3 className="size-3.5" />
                            {item.due}
                          </span>
                          <div className="flex -space-x-2 space-x-reverse">
                            <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-slate-800 text-[10px] font-bold text-white">
                              ك
                            </span>
                            <span className="grid size-7 place-items-center rounded-full border-2 border-white bg-slate-300 text-[10px] font-bold text-slate-700">
                              م
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-xs font-bold text-slate-500 hover:border-slate-400 hover:bg-white">
                      <Plus className="size-4" />
                      إضافة محتوى
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black">النشر القادم</h2>
                  <p className="mt-1 text-sm text-slate-500">أقرب المحتويات المجدولة</p>
                </div>
                <button className="text-sm font-bold text-slate-600 hover:text-slate-950">فتح التقويم</button>
              </div>

              <div className="space-y-3">
                {schedule.map((item) => (
                  <div
                    key={`${item.day}-${item.title}`}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3 transition hover:border-slate-200 hover:bg-slate-50"
                  >
                    <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-slate-950 text-center text-white">
                      <div>
                        <p className="text-lg font-black leading-none">{item.day}</p>
                        <p className="mt-1 text-[10px] text-slate-300">{item.month}</p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.platform}</p>
                    </div>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-bold text-slate-600">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-200">
              <div className="mb-10 flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10">
                  <Sparkles className="size-5" />
                </span>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                  مساعد ذكي
                </span>
              </div>
              <h2 className="max-w-xs text-2xl font-black leading-9">
                حوّل فكرتك إلى خطة محتوى واضحة
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                اكتب الهدف والبراند، وسيجهز لك النظام الهيكل المقترح والمهام المطلوبة.
              </p>
              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 hover:bg-slate-100">
                ابدأ بفكرة جديدة
                <ChevronLeft className="size-4" />
              </button>

              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Archive className="size-3.5" />
                  يحفظ تلقائيًا
                </span>
                <span>ContentFlow AI</span>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  )
}
