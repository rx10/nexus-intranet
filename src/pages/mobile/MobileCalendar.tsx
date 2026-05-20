import { events } from '@/data/seed'
import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export function MobileCalendar() {
  const sorted = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  )

  return (
    <div className="p-4 space-y-3">
      <h1 className="font-display font-bold text-lg">Events</h1>
      {sorted.map((ev) => (
        <Card key={ev.id}>
          <CardContent className="pt-4">
            <div className="flex gap-2 items-start">
              <div
                className="w-1 self-stretch rounded"
                style={{ background: ev.color }}
              />
              <div>
                <p className="font-semibold text-sm">{ev.title}</p>
                <p className="text-xs text-slate-500">
                  {formatDate(ev.start, 'MMM d · h:mm a')}
                </p>
                <Badge className="mt-2">{ev.type}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
