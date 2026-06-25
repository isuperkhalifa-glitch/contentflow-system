import { ExternalLink, Megaphone, PackageOpen } from "lucide-react"

import { CreateBrandDialog } from "@/components/brands/create-brand-dialog"
import { PageHeader } from "@/components/workspace/page-header"
import type { AppRole, Brand } from "@/lib/supabase/database.types"
import { createClient } from "@/lib/supabase/server"

type BrandWithCount = Brand & {
  content_items: Array<{ count: number }> | null
}

const managementRoles: AppRole[] = [
  "system_developer",
  "administrator",
  "content_manager",
  "creative_director",
]

function getContentCount(brand: BrandWithCount) {
  return brand.content_items?.[0]?.count ?? 0
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value))
}

export default async function BrandsPage() {
  const supabase = await createClient()
  const { data: claimsData } = await supabase.auth.getClaims()
  const userId = claimsData?.claims?.sub

  const [{ data: brandsData, error: brandsError }, { data: profile }] =
    await Promise.all([
      supabase
        .from("brands")
        .select(
          "id,name,slug,description,logo_url,website_url,primary_color,secondary_color,tone_of_voice,guidelines,is_active,created_by,created_at,updated_at,content_items(count)"
        )
        .order("created_at", { ascending: false }),
      userId
        ? supabase.from("profiles").select("role").eq("id", userId).maybeSingle()
        : Promise.resolve({ data: null }),
    ])

  const brands = (brandsData ?? []) as BrandWithCount[]
  const role = profile?.role as AppRole | undefined
  const canManage = role ? managementRoles.includes(role) : false

  return (
    <>
      <PageHeader
        eyebrow="الهوية"
        title="البراندات والحملات"
        description="إدارة الهويات البصرية، نبرة التواصل، العروض والحملات لكل براند."
        action={<CreateBrandDialog canManage={canManage} />}
      />

      {brandsError ? (
        <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
          <h2 className="font-black">تعذر تحميل البراندات</h2>
          <p className="mt-2 text-sm leading-7">
            تأكد من تشغيل ملف قاعدة البيانات ومن صلاحيات حسابك ثم أعد تحميل الصفحة.
          </p>
        </section>
      ) : null}

      {!brandsError && brands.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-600">
            <PackageOpen className="size-6" />
          </span>
          <h2 className="mt-5 text-xl font-black">لا توجد براندات حتى الآن</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-slate-500">
            أضف أول براند لتبدأ ربط طلبات المحتوى والحملات والهوية البصرية به.
          </p>
        </section>
      ) : null}

      {!brandsError && brands.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {brands.map((brand) => {
            const contentCount = getContentCount(brand)
            const primaryColor = brand.primary_color || "#0f172a"
            const secondaryColor = brand.secondary_color || "#e2e8f0"

            return (
              <article
                key={brand.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70"
              >
                <div
                  className="h-2"
                  style={{
                    background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                  }}
                />

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Megaphone className="size-5" />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        brand.is_active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {brand.is_active ? "نشط" : "غير نشط"}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-black tracking-tight">
                    {brand.name}
                  </h2>
                  <p className="mt-1 text-xs font-bold text-slate-400" dir="ltr">
                    /{brand.slug}
                  </p>

                  <p className="mt-4 min-h-14 text-sm leading-7 text-slate-500">
                    {brand.description || "لم تتم إضافة وصف لهذا البراند بعد."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600">
                      {contentCount} محتوى
                    </span>
                    {brand.tone_of_voice ? (
                      <span className="max-w-full truncate rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
                        {brand.tone_of_voice}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-slate-400">
                      أضيف {formatDate(brand.created_at)}
                    </p>

                    {brand.website_url ? (
                      <a
                        href={brand.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-black text-slate-600 transition hover:text-slate-950"
                      >
                        فتح الموقع
                        <ExternalLink className="size-3.5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      ) : null}
    </>
  )
}
