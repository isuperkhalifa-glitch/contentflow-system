"use client"

import { useState } from "react"
import { LoaderCircle, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import { createClient } from "@/lib/supabase/client"

export function LogoutButton() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  async function handleLogout() {
    setSubmitting(true)

    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.replace("/login")
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={submitting}
      className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition hover:bg-white hover:text-rose-600 disabled:opacity-50"
      aria-label="تسجيل الخروج"
      title="تسجيل الخروج"
    >
      {submitting ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <LogOut className="size-4" />
      )}
    </button>
  )
}
