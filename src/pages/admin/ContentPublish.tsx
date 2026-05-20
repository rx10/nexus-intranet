import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import type {
  Announcement,
  AnnouncementStatus,
  AnnouncementType,
  BadgeTone,
  VisibilityPool,
} from '@/types'

const STATUS_TONES: Record<AnnouncementStatus, BadgeTone> = {
  published: 'success',
  draft: 'warning',
  archived: 'default',
}

export function ContentPublish() {
  const me = useCurrentUser()
  const { announcements, publishAnnouncement } = useApp()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [type, setType] = useState<AnnouncementType>('company')
  const [visibility, setVisibility] = useState<VisibilityPool>('organization')
  const [featured, setFeatured] = useState(false)

  function publish(status: AnnouncementStatus) {
    if (!title.trim()) return
    const ann: Announcement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      body: body.trim(),
      type,
      authorId: me.id,
      publishedAt: new Date().toISOString(),
      visibility,
      tags: ['hr-published'],
      featured,
      status,
    }
    publishAnnouncement(ann)
    setTitle('')
    setSummary('')
    setBody('')
    setFeatured(false)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <PageHeader
        title="Publish Content"
        subtitle="Create company announcements with visibility controls."
      />

      <Card>
        <CardHeader>
          <CardTitle>New announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Summary (1–2 sentences)"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <Textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <Select value={type} onChange={(e) => setType(e.target.value as AnnouncementType)}>
              <option value="company">Company</option>
              <option value="business">Business</option>
              <option value="project-win">Project win</option>
              <option value="milestone">Milestone</option>
            </Select>
            <Select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as VisibilityPool)}
            >
              <option value="organization">Organization-wide</option>
              <option value="vertical">Vertical only</option>
              <option value="department">Department only</option>
              <option value="leadership">Leadership only</option>
            </Select>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Highlight as featured on the dashboard
          </label>

          <div className="flex gap-2">
            <Button onClick={() => publish('published')} disabled={!title.trim()}>
              Publish to feed
            </Button>
            <Button
              variant="secondary"
              onClick={() => publish('draft')}
              disabled={!title.trim()}
            >
              Save as draft
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-display font-semibold mb-3">All announcements</h2>
        <div className="space-y-2">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100"
            >
              <Badge tone={STATUS_TONES[a.status]}>{a.status}</Badge>
              <span className="text-sm font-medium flex-1 truncate">{a.title}</span>
              <Badge>{a.visibility}</Badge>
              {a.featured && <Badge tone="warning">Featured</Badge>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
