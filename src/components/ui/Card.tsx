import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

/**
 * If the caller supplies their own `bg-*` utility we skip the default
 * `bg-white` — Tailwind doesn't resolve conflicting utilities by className
 * order, so without this guard the default would win in the cascade.
 */
const hasBgOverride = (cls?: string) =>
  !!cls && /(^|\s)bg-(?!opacity)/.test(cls)

export function Card({ className, interactive, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        !hasBgOverride(className) && 'bg-white',
        'rounded-2xl border border-slate-100 shadow-card',
        interactive && 'transition-shadow hover:shadow-elevated',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 pt-5 pb-2', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-display font-semibold text-slate-900', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-5 pb-5', className)} {...props}>
      {children}
    </div>
  )
}
