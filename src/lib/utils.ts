import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(iso: string, pattern = 'MMM d, yyyy') {
  return format(parseISO(iso), pattern)
}

export function formatDateTime(iso: string) {
  return format(parseISO(iso), 'EEE, MMM d · h:mm a')
}

export function formatTime(iso: string) {
  return format(parseISO(iso), 'h:mm a')
}

export function timeAgo(iso: string) {
  return formatDistanceToNow(parseISO(iso), { addSuffix: true })
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function greeting(date = new Date()) {
  const h = date.getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
