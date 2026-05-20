import { useMemo, useState } from 'react'
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/shared/PageHeader'
import { events } from '@/data/seed'
import type { BadgeTone, EventItem, EventType } from '@/types'
import { formatDateTime } from '@/lib/utils'

const TYPE_TONES: Record<EventType, BadgeTone> = {
  townhall: 'brand',
  celebration: 'warning',
  workshop: 'info',
  volunteer: 'success',
  social: 'default',
}

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function CalendarPage() {
  const [month, setMonth] = useState(new Date())

  const days = useMemo(
    () => eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }),
    [month]
  )

  const eventsByDay = useMemo(() => {
    const map = new Map<string, EventItem[]>()
    for (const ev of events) {
      const key = format(parseISO(ev.start), 'yyyy-MM-dd')
      const bucket = map.get(key) ?? []
      bucket.push(ev)
      map.set(key, bucket)
    }
    return map
  }, [])

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Engagement Calendar"
        subtitle="Townhalls, celebrations, workshops, and volunteer drives."
        actions={
          <div className="flex gap-2 items-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-4 py-1.5 font-display font-semibold min-w-[140px] text-center">
              {format(month, 'MMMM yyyy')}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="pt-5">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
            {DAY_HEADERS.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: days[0].getDay() }).map((_, i) => (
              <div key={`pad-${i}`} />
            ))}
            {days.map((day) => {
              const key = format(day, 'yyyy-MM-dd')
              const dayEvents = eventsByDay.get(key) ?? []
              const today = isSameDay(day, new Date())
              return (
                <div
                  key={key}
                  className={`min-h-[72px] p-1 rounded-lg border text-left ${
                    isSameMonth(day, month)
                      ? 'border-slate-100 bg-white'
                      : 'border-transparent opacity-40'
                  } ${today ? 'ring-2 ring-brand-500' : ''}`}
                >
                  <span className={`text-xs font-medium ${today ? 'text-brand-700' : 'text-slate-600'}`}>
                    {format(day, 'd')}
                  </span>
                  {dayEvents.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className="mt-0.5 text-[10px] truncate px-1 rounded text-white"
                      style={{ background: ev.color }}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="mt-0.5 text-[10px] text-slate-400">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <Card key={ev.id} interactive>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-semibold text-slate-900">{ev.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{formatDateTime(ev.start)}</p>
                </div>
                <Badge tone={TYPE_TONES[ev.type]}>{ev.type}</Badge>
              </div>
              <p className="text-sm text-slate-600 mt-3">
                {ev.description} · {ev.location} · {ev.attendees} attending
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
