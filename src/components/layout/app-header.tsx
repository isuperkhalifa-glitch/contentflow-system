"use client"

import { Bell, Plus, Search } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  MobileSidebar,
  type SidebarUser,
} from "@/components/layout/app-sidebar"
import { mainNavigation, settingsNavigation } from "@/lib/navigation"

export function AppHeader({ user }: { user: SidebarUser }) {
  const pathname = usePathname()
  const currentItem = [...mainNavigation, ...settingsNavigation].find(
    (item) =>
      pathname === item.href || pathname.startsWith(`${item.href}/`)
  )

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <MobileSidebar user={user} />

        <div className="min-w-0">
          <p className="truncate text-sm font-black text-slate-900">
            {currentItem?.label ?? "ContentFlow"}
          </p>
          <p className="hidden text-xs text-slate-500 sm:block">
            مساحة إدارة المحتوى
          </p>
        </div>

        <div className="mr-auto flex items-center gap-2">
          <div className="relative hidden w-72 xl:block">
            <Search className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="ابحث في النظام..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-11 pl-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <button
            type="button"
            className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-50"
            aria-label="الإشعارات"
          >
            <Bell className="size-5" />
            <span className="absolute -left-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-rose-500" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-slate-950 px-3.5 py-2.5 text-sm font-black text-white shadow-sm hover:bg-slate-800"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">محتوى جديد</span>
          </button>
        </div>
      </div>
    </header>
  )
}
