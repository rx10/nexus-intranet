import { useMemo, useState } from 'react'
import { Heart, MessageCircle, ThumbsUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { PageHeader } from '@/components/shared/PageHeader'
import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { findUser, users } from '@/data/seed'
import { computeLeaderboard } from '@/lib/selectors'
import { cn, timeAgo } from '@/lib/utils'
import type { BadgeTone, RecognitionCategory } from '@/types'

const CATEGORY_TONES: Record<RecognitionCategory, BadgeTone> = {
  peer: 'brand',
  achievement: 'success',
  milestone: 'info',
  welcome: 'warning',
}

export function Recognition() {
  const me = useCurrentUser()
  const { recognitions, addRecognition, reactToRecognition, addReply } = useApp()

  const [toId, setToId] = useState('')
  const [category, setCategory] = useState<RecognitionCategory>('peer')
  const [message, setMessage] = useState('')
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})

  const active = useMemo(
    () => recognitions.filter((r) => r.status !== 'hidden'),
    [recognitions]
  )

  const leaderboard = useMemo(
    () => computeLeaderboard(users, recognitions, 10),
    [recognitions]
  )

  function submit() {
    if (!toId || !message.trim()) return
    addRecognition({
      fromUserId: me.id,
      toUserId: toId,
      message: message.trim(),
      category,
    })
    setMessage('')
    setToId('')
    setCategory('peer')
  }

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Recognition & Celebration"
        subtitle="Peer appreciation, achievements, replies, and leaderboards."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Give kudos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="grid sm:grid-cols-2 gap-3">
              <Select value={toId} onChange={(e) => setToId(e.target.value)}>
                <option value="">Select colleague</option>
                {users
                  .filter((u) => u.id !== me.id)
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
              </Select>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value as RecognitionCategory)}
              >
                <option value="peer">Peer appreciation</option>
                <option value="achievement">Achievement</option>
                <option value="milestone">Milestone</option>
                <option value="welcome">Welcome</option>
              </Select>
            </div>
            <Textarea
              placeholder="What did they do that deserves recognition?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={submit} disabled={!toId || !message.trim()}>
              <Heart className="w-4 h-4" /> Send appreciation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Points leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {leaderboard.map((e) => (
              <div key={e.userId} className="flex items-center gap-2 text-sm py-1">
                <span className="w-6 font-mono text-slate-400">#{e.rank}</span>
                <span className="flex-1 truncate">{e.name}</span>
                <span className="font-semibold text-brand-600">{e.points}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {active.map((rec) => {
          const from = findUser(rec.fromUserId)
          const to = findUser(rec.toUserId)
          return (
            <Card key={rec.id} className={cn(rec.status === 'flagged' && 'border-amber-200')}>
              <CardContent className="pt-5">
                <div className="flex gap-3">
                  <Avatar src={from?.avatar} name={from?.name ?? '?'} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{from?.name}</span>
                      <span className="text-slate-500"> → </span>
                      <span className="font-medium">{to?.name}</span>
                    </p>
                    <div className="flex gap-2 mt-1">
                      <Badge tone={CATEGORY_TONES[rec.category]}>{rec.category}</Badge>
                      {rec.status === 'flagged' && <Badge tone="warning">Under review</Badge>}
                    </div>
                    <p className="text-slate-700 mt-2">{rec.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{timeAgo(rec.createdAt)}</p>

                    <div className="flex items-center gap-4 mt-3">
                      <button
                        onClick={() => reactToRecognition(rec.id)}
                        className="flex items-center gap-1 text-sm text-slate-600 hover:text-brand-600 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" /> {rec.reactions}
                      </button>
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <MessageCircle className="w-4 h-4" /> {rec.replies.length} replies
                      </span>
                    </div>

                    {rec.replies.map((r) => {
                      const ru = findUser(r.userId)
                      return (
                        <p
                          key={r.id}
                          className="text-sm text-slate-600 mt-2 pl-4 border-l-2 border-slate-100"
                        >
                          <span className="font-medium">{ru?.name}:</span> {r.text}
                        </p>
                      )
                    })}

                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add a reply..."
                        value={replyDrafts[rec.id] ?? ''}
                        onChange={(e) =>
                          setReplyDrafts((p) => ({ ...p, [rec.id]: e.target.value }))
                        }
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={!replyDrafts[rec.id]?.trim()}
                        onClick={() => {
                          const t = replyDrafts[rec.id]
                          if (t?.trim()) {
                            addReply(rec.id, t.trim())
                            setReplyDrafts((p) => ({ ...p, [rec.id]: '' }))
                          }
                        }}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
