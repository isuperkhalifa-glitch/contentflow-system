import type { ReactNode } from "react"

import { AppHeader } from "@/components/layout/app-header"
import { DesktopSidebar } from "@/components/layout/app-sidebar"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <DesktopSidebar />
      <div className="min-h-screen lg:pr-72">
        <AppHeader />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
