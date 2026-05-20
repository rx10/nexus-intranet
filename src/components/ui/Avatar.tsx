import { cn, getInitials } from '@/lib/utils'

export function Avatar({
  src,
  name,
  size = 'md',
  className,
}: {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base' }
  return (
    <div
      className={cn(
        'rounded-full overflow-hidden bg-brand-100 flex items-center justify-center font-semibold text-brand-700 shrink-0',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  )
}
