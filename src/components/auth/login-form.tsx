"use client"

import { FormEvent, useState } from "react"
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"

type LoginFormProps = {
  nextPath?: string
}

function getSafeNextPath(nextPath?: string) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return "/dashboard"
  }

  return nextPath
}

function getArabicAuthError(message: string) {
  const normalized = message.toLowerCase()

  if (normalized.includes("invalid login credentials")) {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة."
  }

  if (normalized.includes("email not confirmed")) {
    return "يجب تأكيد البريد الإلكتروني قبل تسجيل الدخول."
  }

  if (normalized.includes("too many requests")) {
    return "تم إجراء محاولات كثيرة. انتظر قليلًا ثم حاول مرة أخرى."
  }

  return "تعذر تسجيل الدخول. تحقق من البيانات وحاول مرة أخرى."
}

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")
    setSubmitting(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        setErrorMessage(getArabicAuthError(error.message))
        return
      }

      router.replace(getSafeNextPath(nextPath))
      router.refresh()
    } catch {
      setErrorMessage(
        "تعذر الاتصال بخدمة تسجيل الدخول. راجع إعدادات Supabase."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-black text-slate-700"
        >
          البريد الإلكتروني
        </label>
        <div className="relative">
          <Mail className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@company.com"
            className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-12 pl-4 text-left text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-black text-slate-700"
        >
          كلمة المرور
        </label>
        <div className="relative">
          <LockKeyhole className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className="h-13 w-full rounded-2xl border border-slate-200 bg-slate-50 pr-12 pl-12 text-left text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            dir="ltr"
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold leading-6 text-rose-700"
        >
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <LoaderCircle className="size-5 animate-spin" />
            جاري تسجيل الدخول...
          </>
        ) : (
          "تسجيل الدخول"
        )}
      </button>
    </form>
  )
}
