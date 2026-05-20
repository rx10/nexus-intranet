import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconBadgeProps {
  icon: LucideIcon
  className?: string
  size?: 'sm' | 'md'
}

export function IconBadge({ icon: Icon, className, size = 'md' }: IconBadgeProps) {
  const dim = size === 'sm' ? 'p-1.5' : 'p-2.5'
  const inner = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <div className={cn('rounded-xl bg-brand-50 text-brand-600', dim, className)}>
      <Icon className={inner} />
    </div>
  )
}
