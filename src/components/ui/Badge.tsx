import { cn } from '@/lib/utils'
import type { BadgeTone } from '@/types'
import type { HTMLAttributes } from 'react'

const TONE_CLASSES: Record<BadgeTone, string> = {
  default: 'bg-slate-100 text-slate-700',
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-sky-50 text-sky-700',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  /** @deprecated use `tone` */
  color?: BadgeTone
}

export function Badge({ children, tone, color, className, ...props }: BadgeProps) {
  const resolved: BadgeTone = tone ?? color ?? 'default'
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap',
        TONE_CLASSES[resolved],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
