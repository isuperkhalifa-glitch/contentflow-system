import type { ReactNode } from "react"

import { AppHeader } from "@/components/layout/app-header"
import {
  DesktopSidebar,
  type SidebarUser,
} from "@/components/layout/app-sidebar"

type AppShellProps = {
  children: ReactNode
  user: SidebarUser
}

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <DesktopSidebar user={user} />
      <div className="min-h-screen lg:pr-72">
        <AppHeader user={user} />
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
