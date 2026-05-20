import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { useApp } from '@/context/AppContext'
import { formatDate } from '@/lib/utils'
import { ShieldCheck } from 'lucide-react'
import type { BadgeTone, ModerationStatus } from '@/types'

const STATUS_TONES: Record<ModerationStatus, BadgeTone> = {
  pending: 'warning',
  approved: 'success',
  removed: 'danger',
}

export function Moderation() {
  const { moderateItem, moderationQueue } = useApp()
  const pending = moderationQueue.filter((m) => m.status === 'pending')
  const resolved = moderationQueue.filter((m) => m.status !== 'pending')

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <PageHeader
        title="Moderation Queue"
        subtitle="Review flagged content to reduce clutter and unwanted communication."
      />

      <section>
        <h2 className="font-display font-semibold mb-3">Pending ({pending.length})</h2>
        {pending.length === 0 ? (
          <EmptyState icon={ShieldCheck} title="No pending items" description="The community is clean today." />
        ) : (
          <div className="space-y-4">
            {pending.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div>
                    <Badge tone={STATUS_TONES[item.status]}>{item.status}</Badge>
                    <CardTitle className="mt-2 text-base capitalize">
                      {item.type} · {item.contentId}
                    </CardTitle>
                    <p className="text-sm text-slate-500 mt-1">{item.reason}</p>
                    <p className="text-xs text-slate-400">{formatDate(item.createdAt)}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => moderateItem(item.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => moderateItem(item.id, 'removed')}
                    >
                      Remove
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </section>

      {resolved.length > 0 && (
        <section>
          <h2 className="font-display font-semibold mb-3">Resolved</h2>
          <div className="space-y-2">
            {resolved.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100"
              >
                <Badge tone={STATUS_TONES[item.status]}>{item.status}</Badge>
                <span className="text-sm font-medium flex-1 capitalize">
                  {item.type} · {item.contentId}
                </span>
                <span className="text-xs text-slate-400">{formatDate(item.createdAt)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
