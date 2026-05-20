import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { leadershipMessages } from '@/data/seed'
import type { LeadershipCategory } from '@/types'
import { formatDate } from '@/lib/utils'

const CATEGORY_LABELS: Record<LeadershipCategory, string> = {
  vision: 'Vision',
  message: 'Leadership Message',
  'meet-outcome': 'Monthly Meet Outcomes',
}

export function Leadership() {
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Leadership & Vision"
        subtitle="Management vision, messages, and monthly leadership outcomes."
      />
      <div className="space-y-4">
        {leadershipMessages.map((msg) => (
          <Card key={msg.id}>
            <CardHeader>
              <Badge tone={msg.category === 'vision' ? 'brand' : 'default'}>
                {CATEGORY_LABELS[msg.category]}
              </Badge>
              <CardTitle className="mt-2">{msg.title}</CardTitle>
              <p className="text-sm text-slate-500">
                {msg.authorName} · {msg.authorTitle} · {formatDate(msg.publishedAt)}
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-slate-600 leading-relaxed">{msg.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
