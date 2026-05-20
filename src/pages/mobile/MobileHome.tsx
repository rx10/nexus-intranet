import { Link } from 'react-router-dom'
import { Megaphone, Heart, Calendar, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { events, findUser, leadershipMessages, newJoinees } from '@/data/seed'
import { visibleAnnouncements } from '@/lib/selectors'
import { formatDate } from '@/lib/utils'

export function MobileHome() {
  const me = useCurrentUser()
  const { announcements } = useApp()

  const news = visibleAnnouncements(announcements, me)
    .filter((a) => a.featured)
    .slice(0, 2)

  const vision = leadershipMessages[0]
  const nextEvent = events.find((e) => new Date(e.start) > new Date())

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white border-0 overflow-hidden">
        <CardContent className="pt-4">
          <p className="text-xs text-white/70 uppercase tracking-wide font-medium">
            Today on Nexus
          </p>
          <p className="font-display font-bold text-lg mt-1 line-clamp-2 text-white">
            {vision?.title}
          </p>
          <p className="text-sm text-white/85 mt-1 line-clamp-2">{vision?.excerpt}</p>
        </CardContent>
      </Card>

      {news.map((n) => (
        <Card key={n.id}>
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <Megaphone className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{n.title}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.summary}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {nextEvent && (
        <Link to="/mobile/calendar" className="block">
          <Card>
            <CardContent className="pt-4 flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Calendar className="w-5 h-5 text-brand-500" />
                <div>
                  <p className="text-sm font-medium">{nextEvent.title}</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(nextEvent.start, 'MMM d')}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </CardContent>
          </Card>
        </Link>
      )}

      <Link to="/mobile/recognition" className="block">
        <Card className="border-brand-100">
          <CardContent className="pt-4 flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-500" fill="currentColor" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Send kudos</p>
              <p className="text-xs text-slate-500">Celebrate a colleague</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </CardContent>
        </Card>
      </Link>

      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide px-1">
        New teammates
      </p>
      <div className="flex gap-3 overflow-x-auto snap-x pb-2">
        {newJoinees.map((nj) => {
          const u = findUser(nj.userId)
          if (!u) return null
          return (
            <Card key={nj.id} className="min-w-[140px] snap-start shrink-0">
              <CardContent className="pt-3 text-center">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-12 h-12 rounded-full mx-auto bg-slate-100"
                />
                <p className="text-xs font-semibold mt-2">{u.name.split(' ')[0]}</p>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{u.title}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
