import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Megaphone,
  Heart,
  Calendar,
  Trophy,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { StatCard } from '@/components/shared/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  events,
  findUser,
  leadershipMessages,
  newJoinees,
  users,
} from '@/data/seed'
import {
  computeLeaderboard,
  visibleAnnouncements,
} from '@/lib/selectors'
import { formatDate, greeting, timeAgo } from '@/lib/utils'

export function Dashboard() {
  const me = useCurrentUser()
  const { announcements, recognitions } = useApp()

  const visibleAnn = useMemo(
    () => visibleAnnouncements(announcements, me).slice(0, 4),
    [announcements, me]
  )
  const featured = visibleAnn.filter((a) => a.featured)

  const activeRecs = useMemo(
    () => recognitions.filter((r) => r.status === 'active'),
    [recognitions]
  )

  const upcoming = useMemo(
    () =>
      events
        .filter((e) => new Date(e.start) > new Date())
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
        .slice(0, 3),
    []
  )

  const leaderboard = useMemo(
    () => computeLeaderboard(users, recognitions, 5),
    [recognitions]
  )

  const vision = leadershipMessages.find((m) => m.category === 'vision')

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title={`${greeting()}, ${me.name.split(' ')[0]}`}
        subtitle="Your prioritized hub — vision, wins, people, and culture in one place."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Your points" value={me.points} sub="Up this week" icon={Trophy} trend="up" />
        <StatCard label="Active kudos" value={activeRecs.length} icon={Heart} />
        <StatCard label="Upcoming events" value={upcoming.length} icon={Calendar} />
        <StatCard label="News for you" value={visibleAnn.length} icon={Megaphone} />
      </div>

      {vision && (
        <Card className="bg-gradient-to-r from-brand-600 to-brand-800 text-white border-0 overflow-hidden">
          <CardContent className="py-6 sm:py-8">
            <Badge className="bg-white/20 text-white mb-3">Leadership Vision</Badge>
            <h2 className="font-display text-xl sm:text-2xl font-bold">{vision.title}</h2>
            <p className="text-brand-100 mt-2 max-w-2xl">{vision.excerpt}</p>
            <Link
              to="/app/leadership"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-white hover:underline"
            >
              Read full vision <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg">Featured updates</h2>
              <Link to="/app/announcements" className="text-sm text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {(featured.length ? featured : visibleAnn).map((ann) => (
                <Card key={ann.id} interactive>
                  <CardHeader>
                    <Badge tone={ann.type === 'project-win' ? 'success' : 'brand'}>{ann.type}</Badge>
                    <CardTitle className="mt-2 text-base">{ann.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-slate-600 line-clamp-2">{ann.summary}</p>
                    <p className="text-xs text-slate-400 mt-2">{timeAgo(ann.publishedAt)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" /> New joinees
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
              {newJoinees.map((nj) => {
                const u = findUser(nj.userId)
                if (!u) return null
                return (
                  <Card key={nj.id} className="min-w-[280px] snap-start shrink-0">
                    <CardContent className="pt-5 flex gap-3">
                      <Avatar src={u.avatar} name={u.name} size="lg" />
                      <div>
                        <p className="font-semibold">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.title}</p>
                        <p className="text-sm text-slate-600 mt-2 italic">&ldquo;{nj.quote}&rdquo;</p>
                        <p className="text-xs text-brand-600 mt-1">{nj.funFact}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {upcoming.map((ev) => (
                <div key={ev.id} className="flex gap-3 items-start">
                  <div className="w-1 rounded-full self-stretch" style={{ background: ev.color }} />
                  <div>
                    <p className="text-sm font-medium">{ev.title}</p>
                    <p className="text-xs text-slate-500">
                      {formatDate(ev.start, 'MMM d · h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
              <Link to="/app/calendar" className="text-sm text-brand-600 block pt-2">
                Open calendar →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Leaderboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {leaderboard.map((entry) => (
                <div key={entry.userId} className="flex items-center gap-2 text-sm">
                  <span className="w-5 text-slate-400 font-mono">{entry.rank}</span>
                  <span className="flex-1 truncate">{entry.name}</span>
                  <span className="text-brand-600 font-medium">{entry.points}</span>
                </div>
              ))}
              <Link to="/app/recognition" className="text-sm text-brand-600 block pt-2">
                Give kudos →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent recognition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {activeRecs.slice(0, 3).map((rec) => {
                const to = findUser(rec.toUserId)
                return (
                  <p key={rec.id} className="text-sm text-slate-600 line-clamp-2">
                    <span className="font-medium text-slate-800">{to?.name}</span>
                    {' — '}
                    {rec.message}
                  </p>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
