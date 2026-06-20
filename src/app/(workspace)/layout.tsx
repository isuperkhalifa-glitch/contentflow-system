import type { ReactNode } from "react"
import { redirect } from "next/navigation"

import { AppShell } from "@/components/layout/app-shell"
import { createClient } from "@/lib/supabase/server"

type AuthClaims = {
  email?: unknown
  user_metadata?: unknown
}

function getDisplayName(claims: AuthClaims, email: string) {
  const metadata =
    claims.user_metadata &&
    typeof claims.user_metadata === "object"
      ? (claims.user_metadata as Record<string, unknown>)
      : {}

  const candidate = metadata.full_name ?? metadata.name

  if (typeof candidate === "string" && candidate.trim()) {
    return candidate.trim()
  }

  const emailName = email.split("@")[0]

  return emailName || "مستخدم النظام"
}

export default async function WorkspaceLayout({
  children,
}: {
  children: ReactNode
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  if (error || !data?.claims?.sub) {
    redirect("/login")
  }

  const claims = data.claims as AuthClaims
  const email =
    typeof claims.email === "string"
      ? claims.email
      : "مستخدم مسجل"

  const user = {
    name: getDisplayName(claims, email),
    email,
  }

  return <AppShell user={user}>{children}</AppShell>
}
