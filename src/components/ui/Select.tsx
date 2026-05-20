import { cn } from '@/lib/utils'
import type { SelectHTMLAttributes } from 'react'

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900',
        'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500',
        'disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}
