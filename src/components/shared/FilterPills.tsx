import { cn } from '@/lib/utils'

export interface PillOption<T extends string> {
  value: T
  label: string
}

interface FilterPillsProps<T extends string> {
  options: PillOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  className,
}: FilterPillsProps<T>) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="tablist">
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              active
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
