"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Sparkles, X } from "lucide-react"
import { useState } from "react"

import { LogoutButton } from "@/components/auth/logout-button"
import { mainNavigation, settingsNavigation } from "@/lib/navigation"

export type SidebarUser = {
  name: string
  email: string
}

type SidebarContentProps = {
  user: SidebarUser
  onNavigate?: () => void
}

function getInitial(name: string) {
  return name.trim().charAt(0) || "م"
}

function SidebarContent({ user, onNavigate }: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
          onClick={onNavigate}
        >
          <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <Sparkles className="size-4" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight">
              ContentFlow
            </span>
            <span className="block text-xs text-slate-500">
              إدارة المحتوى بوضوح
            </span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
          مساحة العمل
        </p>

        <nav className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                  active
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon className="size-5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] ${
                      active
                        ? "bg-white/15 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {item.count}
                  </span>
                ) : null}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="border-t border-slate-100 p-3">
        {settingsNavigation.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                active
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          )
        })}

        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-black text-white">
            {getInitial(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black">{user.name}</p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export function DesktopSidebar({ user }: { user: SidebarUser }) {
  return (
    <aside className="fixed inset-y-0 right-0 z-30 hidden w-72 border-l border-slate-200 lg:block">
      <SidebarContent user={user} />
    </aside>
  )
}

export function MobileSidebar({ user }: { user: SidebarUser }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm lg:hidden"
        aria-label="فتح القائمة"
      >
        <Menu className="size-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="إغلاق القائمة"
          />
          <aside className="absolute inset-y-0 right-0 w-[min(88vw,320px)] border-l border-slate-200 bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute left-4 top-5 z-10 rounded-xl border border-slate-200 bg-white p-2 text-slate-600"
              aria-label="إغلاق القائمة"
            >
              <X className="size-4" />
            </button>
            <SidebarContent
              user={user}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </div>
      ) : null}
    </>
  )
}

