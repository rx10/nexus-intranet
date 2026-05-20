import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { visibleAnnouncements } from '@/lib/selectors'
import { timeAgo } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export function MobileFeed() {
  const me = useCurrentUser()
  const { announcements } = useApp()
  const feed = visibleAnnouncements(announcements, me)

  return (
    <div className="p-4 space-y-3">
      <h1 className="font-display font-bold text-lg">Feed</h1>
      {feed.map((a) => (
        <Card key={a.id}>
          <CardContent className="pt-4">
            <Badge tone="brand" className="mb-2">
              {a.type}
            </Badge>
            <p className="font-semibold">{a.title}</p>
            <p className="text-sm text-slate-600 mt-1">{a.summary}</p>
            <p className="text-xs text-slate-400 mt-2">{timeAgo(a.publishedAt)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
