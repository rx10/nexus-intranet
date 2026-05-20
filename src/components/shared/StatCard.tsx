import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { IconBadge } from '@/components/shared/IconBadge'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon: LucideIcon
  trend?: 'up' | 'down'
}

export function StatCard({ label, value, sub, icon, trend }: StatCardProps) {
  return (
    <Card className="animate-fade-in">
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-2xl font-display font-bold text-slate-900 mt-1 truncate">
              {value}
            </p>
            {sub && (
              <p
                className={cn(
                  'text-xs mt-1',
                  trend === 'up' && 'text-emerald-600',
                  trend === 'down' && 'text-red-500',
                  !trend && 'text-slate-500'
                )}
              >
                {sub}
              </p>
            )}
          </div>
          <IconBadge icon={icon} />
        </div>
      </CardContent>
    </Card>
  )
}
