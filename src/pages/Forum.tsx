import { MessageSquare, Pin, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { useApp } from '@/context/AppContext'
import { findUser } from '@/data/seed'
import { timeAgo } from '@/lib/utils'

export function Forum() {
  const { forumThreads } = useApp()
  const sorted = [...forumThreads].sort((a, b) => Number(b.pinned) - Number(a.pinned))

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Community Forum"
        subtitle="Two-way exchange alongside the knowledge base — pinned and categorized threads."
      />
      <div className="space-y-3">
        {sorted.map((thread) => {
          const author = findUser(thread.authorId)
          return (
            <Card key={thread.id} interactive>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-brand-500 shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 items-center">
                      {thread.pinned && (
                        <Badge tone="warning" className="flex items-center gap-1">
                          <Pin className="w-3 h-3" /> Pinned
                        </Badge>
                      )}
                      <Badge>{thread.category}</Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">{thread.title}</CardTitle>
                    <p className="text-sm text-slate-500">
                      {author?.name} · {timeAgo(thread.createdAt)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-slate-600">{thread.body}</p>
                <div className="flex gap-4 mt-3 text-sm text-slate-500">
                  <span>{thread.replies} replies</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {thread.views} views
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {thread.tags.map((t) => (
                    <span key={t} className="text-xs text-brand-600">
                      #{t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
