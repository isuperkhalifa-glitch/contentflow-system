import {
  BadgeCheck,
  BarChart3,
  CalendarDays,
  ClipboardList,
  Files,
  LayoutDashboard,
  Lightbulb,
  Megaphone,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

export type NavigationItem = {
  label: string
  href: string
  icon: LucideIcon
  count?: number
}

export const mainNavigation: NavigationItem[] = [
  { label: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { label: "إدارة المحتوى", href: "/content", icon: Files },
  { label: "تقويم المحتوى", href: "/calendar", icon: CalendarDays },
  { label: "طلبات المحتوى", href: "/requests", icon: ClipboardList, count: 7 },
  { label: "بنك الأفكار", href: "/ideas", icon: Lightbulb },
  { label: "البراندات والحملات", href: "/brands", icon: Megaphone },
  { label: "المراجعات والاعتمادات", href: "/approvals", icon: BadgeCheck, count: 4 },
  { label: "الفريق", href: "/team", icon: Users },
  { label: "التحليلات", href: "/analytics", icon: BarChart3 },
]

export const settingsNavigation: NavigationItem[] = [
  { label: "الإعدادات", href: "/settings", icon: Settings },
]
