import {
  LayoutDashboard,
  Megaphone,
  Footprints,
  Calendar,
  Users,
  Heart,
  BookOpen,
  Image,
  MessageSquare,
  Sparkles,
  Shield,
  FileText,
  BarChart3,
  Home,
  Bell,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  icon: LucideIcon
  label: string
  end?: boolean
}

export const webNav: NavItem[] = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/app/leadership', icon: Sparkles, label: 'Leadership' },
  { to: '/app/announcements', icon: Megaphone, label: 'News & Wins' },
  { to: '/app/footprints', icon: Footprints, label: 'Impact' },
  { to: '/app/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/app/people', icon: Users, label: 'People' },
  { to: '/app/recognition', icon: Heart, label: 'Recognition' },
  { to: '/app/knowledge', icon: BookOpen, label: 'Knowledge' },
  { to: '/app/gallery', icon: Image, label: 'Gallery' },
  { to: '/app/forum', icon: MessageSquare, label: 'Forum' },
]

export const adminNav: NavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/admin/moderation', icon: Shield, label: 'Moderation' },
  { to: '/admin/content', icon: FileText, label: 'Publish' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
]

export const mobileNav: NavItem[] = [
  { to: '/mobile', icon: Home, label: 'Home', end: true },
  { to: '/mobile/feed', icon: Bell, label: 'Feed' },
  { to: '/mobile/recognition', icon: Heart, label: 'Kudos' },
  { to: '/mobile/calendar', icon: Calendar, label: 'Events' },
  { to: '/mobile/people', icon: Users, label: 'People' },
]
