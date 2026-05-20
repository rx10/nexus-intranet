import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { FilterPills } from '@/components/shared/FilterPills'
import { EmptyState } from '@/components/shared/EmptyState'
import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { findUser } from '@/data/seed'
import { visibleAnnouncements } from '@/lib/selectors'
import { timeAgo } from '@/lib/utils'
import type { AnnouncementType } from '@/types'
import { Megaphone } from 'lucide-react'

type Filter = 'all' | AnnouncementType

const FILTER_OPTIONS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'company', label: 'Company' },
  { value: 'business', label: 'Business' },
  { value: 'project-win', label: 'Project win' },
  { value: 'milestone', label: 'Milestone' },
]

export function Announcements() {
  const me = useCurrentUser()
  const { announcements } = useApp()
  const [filter, setFilter] = useState<Filter>('all')

  const visible = useMemo(
    () => visibleAnnouncements(announcements, me),
    [announcements, me]
  )

  const filtered = filter === 'all' ? visible : visible.filter((a) => a.type === filter)

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="News & Business Updates"
        subtitle="Announcements, project wins, and milestones — tenant-aware visibility."
      />
      <FilterPills options={FILTER_OPTIONS} value={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState
          icon={Megaphone}
          title="Nothing here yet"
          description="No announcements match this filter for your visibility scope."
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map((ann) => {
            const author = findUser(ann.authorId)
            return (
              <Card key={ann.id} interactive>
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="brand">{ann.type}</Badge>
                    <Badge>{ann.visibility}</Badge>
                    {ann.featured && <Badge tone="warning">Featured</Badge>}
                  </div>
                  <CardTitle className="mt-2">{ann.title}</CardTitle>
                  <p className="text-sm text-slate-500">
                    {author?.name} · {timeAgo(ann.publishedAt)}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-slate-600">{ann.body}</p>
                  <div className="flex gap-2 mt-3">
                    {ann.tags.map((t) => (
                      <span key={t} className="text-xs text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
