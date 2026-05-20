import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const FIELD_BASE =
  'w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 ' +
  'placeholder:text-slate-400 transition-shadow ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(FIELD_BASE, className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(FIELD_BASE, 'min-h-[100px] resize-y leading-relaxed', className)}
      {...props}
    />
  )
}
