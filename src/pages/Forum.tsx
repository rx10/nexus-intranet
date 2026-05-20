import { useMemo, useState } from 'react'
import { MessageSquare, Pin, Eye, Plus, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { Avatar } from '@/components/ui/Avatar'
import { PageHeader } from '@/components/shared/PageHeader'
import { FilterPills } from '@/components/shared/FilterPills'
import { EmptyState } from '@/components/shared/EmptyState'
import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { findUser } from '@/data/seed'
import { timeAgo } from '@/lib/utils'
import type { ForumThread } from '@/types'

const CATEGORIES = ['Collaboration', 'Onboarding', 'Policies', 'Tech', 'Culture'] as const

export function Forum() {
  const me = useCurrentUser()
  const {
    forumThreads,
    createForumThread,
    addForumReply,
    incrementForumView,
  } = useApp()

  const [composerOpen, setComposerOpen] = useState(false)
  const [activeThread, setActiveThread] = useState<ForumThread | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [replyDraft, setReplyDraft] = useState('')

  const [draftTitle, setDraftTitle] = useState('')
  const [draftBody, setDraftBody] = useState('')
  const [draftCategory, setDraftCategory] = useState<string>(CATEGORIES[0])
  const [draftTags, setDraftTags] = useState('')

  const filterOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...CATEGORIES.map((c) => ({ value: c, label: c })),
    ],
    []
  )

  const sorted = useMemo(() => {
    const list =
      filter === 'all'
        ? forumThreads
        : forumThreads.filter((t) => t.category === filter)
    return [...list].sort(
      (a, b) =>
        Number(b.pinned) - Number(a.pinned) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [forumThreads, filter])

  // Stay in sync if the underlying thread changes (e.g. new reply)
  const liveActive = activeThread
    ? forumThreads.find((t) => t.id === activeThread.id) ?? activeThread
    : null

  function openThread(t: ForumThread) {
    incrementForumView(t.id)
    setActiveThread(t)
    setReplyDraft('')
  }

  function submitThread() {
    if (!draftTitle.trim() || !draftBody.trim()) return
    const tags = draftTags
      .split(',')
      .map((s) => s.trim().replace(/^#/, ''))
      .filter(Boolean)
    createForumThread({
      title: draftTitle,
      body: draftBody,
      category: draftCategory,
      tags,
    })
    setDraftTitle('')
    setDraftBody('')
    setDraftTags('')
    setDraftCategory(CATEGORIES[0])
    setComposerOpen(false)
  }

  function submitReply() {
    if (!liveActive || !replyDraft.trim()) return
    addForumReply(liveActive.id, replyDraft)
    setReplyDraft('')
  }

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Community Forum"
        subtitle="Two-way exchange alongside the knowledge base — pinned and categorized threads."
        actions={
          <Button onClick={() => setComposerOpen(true)}>
            <Plus className="w-4 h-4" /> Start a thread
          </Button>
        }
      />

      <FilterPills options={filterOptions} value={filter} onChange={setFilter} />

      {sorted.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No threads here yet"
          description="Be the first to start a conversation in this category."
        />
      ) : (
        <div className="space-y-3">
          {sorted.map((thread) => {
            const author = findUser(thread.authorId)
            return (
              <Card key={thread.id} interactive>
                <button
                  type="button"
                  onClick={() => openThread(thread)}
                  className="text-left w-full"
                >
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
                    <p className="text-slate-600 line-clamp-2">{thread.body}</p>
                    <div className="flex gap-4 mt-3 text-sm text-slate-500">
                      <span>{thread.repliesList.length} replies</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" /> {thread.views} views
                      </span>
                    </div>
                    {thread.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {thread.tags.map((t) => (
                          <span key={t} className="text-xs text-brand-600">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </button>
              </Card>
            )
          })}
        </div>
      )}

      {/* Compose modal */}
      <Modal
        open={composerOpen}
        onClose={() => setComposerOpen(false)}
        title="Start a thread"
        subtitle="Visible to all employees — be helpful, be kind."
        size="md"
        actions={
          <>
            <Button variant="secondary" onClick={() => setComposerOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={submitThread}
              disabled={!draftTitle.trim() || !draftBody.trim()}
            >
              Post thread
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <Input
            placeholder="Thread title"
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
          />
          <Textarea
            placeholder="Share context, your question, or what you've already tried..."
            value={draftBody}
            onChange={(e) => setDraftBody(e.target.value)}
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              value={draftCategory}
              onChange={(e) => setDraftCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Tags (comma separated)"
              value={draftTags}
              onChange={(e) => setDraftTags(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      {/* Thread detail modal */}
      <Modal
        open={!!liveActive}
        onClose={() => setActiveThread(null)}
        title={liveActive?.title}
        subtitle={
          liveActive && (
            <span>
              {findUser(liveActive.authorId)?.name} · {timeAgo(liveActive.createdAt)} ·{' '}
              {liveActive.repliesList.length} replies
            </span>
          )
        }
        size="lg"
      >
        {liveActive && (
          <div className="space-y-5">
            <div className="flex gap-2 flex-wrap">
              {liveActive.pinned && (
                <Badge tone="warning" className="flex items-center gap-1">
                  <Pin className="w-3 h-3" /> Pinned
                </Badge>
              )}
              <Badge>{liveActive.category}</Badge>
              {liveActive.tags.map((t) => (
                <span key={t} className="text-xs text-brand-600">
                  #{t}
                </span>
              ))}
            </div>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {liveActive.body}
            </p>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">
                Replies ({liveActive.repliesList.length})
              </h4>
              {liveActive.repliesList.length === 0 ? (
                <p className="text-sm text-slate-500 italic">No replies yet — be first.</p>
              ) : (
                liveActive.repliesList.map((r) => {
                  const author = findUser(r.userId)
                  return (
                    <div key={r.id} className="flex gap-3">
                      <Avatar src={author?.avatar} name={author?.name ?? '?'} size="sm" />
                      <div className="flex-1 bg-slate-50 rounded-xl p-3">
                        <p className="text-sm">
                          <span className="font-medium">{author?.name}</span>
                          <span className="text-xs text-slate-400 ml-2">
                            {timeAgo(r.createdAt)}
                          </span>
                        </p>
                        <p className="text-sm text-slate-700 mt-1">{r.text}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <Avatar src={me.avatar} name={me.name} size="sm" />
              <Input
                placeholder="Write a reply..."
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    submitReply()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={submitReply} disabled={!replyDraft.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
