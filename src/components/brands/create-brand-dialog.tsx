"use client"

import { useActionState, useState } from "react"
import { LoaderCircle, Plus, X } from "lucide-react"

import {
  createBrandAction,
  type BrandActionState,
} from "@/app/(workspace)/brands/actions"

const initialBrandActionState: BrandActionState = {
  status: "idle",
  message: "",
}

type FieldErrorProps = {
  errors?: string[]
}

function FieldError({ errors }: FieldErrorProps) {
  if (!errors?.length) {
    return null
  }

  return <p className="mt-1 text-xs font-bold text-rose-600">{errors[0]}</p>
}

export function CreateBrandDialog({ canManage }: { canManage: boolean }) {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(
    createBrandAction,
    initialBrandActionState
  )

  if (!canManage) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-500">
        الإضافة متاحة لمديري المحتوى والإدارة فقط
      </div>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-800"
      >
        <Plus className="size-4" />
        براند جديد
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="إغلاق النافذة"
          />

          <section className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black text-slate-500">إضافة هوية جديدة</p>
                <h2 className="mt-1 text-2xl font-black tracking-tight">براند جديد</h2>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  احفظ بيانات الهوية الأساسية لاستخدامها في الطلبات والمحتوى والحملات.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
                aria-label="إغلاق"
              >
                <X className="size-5" />
              </button>
            </div>

            <form action={formAction} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-black text-slate-700">
                    اسم البراند
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="مثال: ريف المهارات"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                  <FieldError errors={state.fieldErrors?.name} />
                </div>

                <div>
                  <label htmlFor="slug" className="mb-2 block text-sm font-black text-slate-700">
                    الرابط المختصر
                  </label>
                  <input
                    id="slug"
                    name="slug"
                    dir="ltr"
                    placeholder="reef-skills"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-left text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                  <FieldError errors={state.fieldErrors?.slug} />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-black text-slate-700">
                  وصف مختصر
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="نبذة عملية تساعد الفريق على فهم البراند..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                <FieldError errors={state.fieldErrors?.description} />
              </div>

              <div>
                <label htmlFor="websiteUrl" className="mb-2 block text-sm font-black text-slate-700">
                  رابط الموقع
                </label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="url"
                  dir="ltr"
                  placeholder="https://example.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-left text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                />
                <FieldError errors={state.fieldErrors?.websiteUrl} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="primaryColor" className="mb-2 block text-sm font-black text-slate-700">
                    اللون الأساسي
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <input
                      id="primaryColor"
                      name="primaryColor"
                      type="color"
                      defaultValue="#0f172a"
                      className="size-9 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <span className="text-xs font-bold text-slate-500">اللون الرئيسي للهوية</span>
                  </div>
                  <FieldError errors={state.fieldErrors?.primaryColor} />
                </div>

                <div>
                  <label htmlFor="secondaryColor" className="mb-2 block text-sm font-black text-slate-700">
                    اللون الثانوي
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2">
                    <input
                      id="secondaryColor"
                      name="secondaryColor"
                      type="color"
                      defaultValue="#e2e8f0"
                      className="size-9 cursor-pointer rounded-lg border-0 bg-transparent"
                    />
                    <span className="text-xs font-bold text-slate-500">لون مساعد للتصميمات</span>
                  </div>
                  <FieldError errors={state.fieldErrors?.secondaryColor} />
                </div>
              </div>

              <div>
                <label htmlFor="toneOfVoice" className="mb-2 block text-sm font-black text-slate-700">
                  نبرة التواصل
                </label>
                <textarea
                  id="toneOfVoice"
                  name="toneOfVoice"
                  rows={2}
                  placeholder="مثال: سعودي واضح، مهني، مباشر ومريح"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                <FieldError errors={state.fieldErrors?.toneOfVoice} />
              </div>

              {state.message ? (
                <div
                  role="status"
                  className={`rounded-xl border px-4 py-3 text-sm font-bold leading-6 ${
                    state.status === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {state.message}
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {pending ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    "حفظ البراند"
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </>
  )
}
