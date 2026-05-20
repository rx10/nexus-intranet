import { useState } from 'react'
import { Heart, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card, CardContent } from '@/components/ui/Card'
import { useApp } from '@/context/AppContext'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { findUser, users } from '@/data/seed'
import { timeAgo } from '@/lib/utils'

export function MobileRecognition() {
  const me = useCurrentUser()
  const { recognitions, addRecognition, reactToRecognition } = useApp()
  const [toId, setToId] = useState('')
  const [msg, setMsg] = useState('')

  const recent = recognitions.filter((r) => r.status === 'active').slice(0, 8)

  return (
    <div className="p-4 space-y-4">
      <h1 className="font-display font-bold text-lg">Kudos</h1>

      <Card>
        <CardContent className="pt-4 space-y-3">
          <Select value={toId} onChange={(e) => setToId(e.target.value)}>
            <option value="">Who deserves kudos?</option>
            {users
              .filter((u) => u.id !== me.id)
              .slice(0, 8)
              .map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
          </Select>
          <Textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Your message..."
          />
          <Button
            className="w-full"
            disabled={!toId || !msg.trim()}
            onClick={() => {
              if (toId && msg.trim()) {
                addRecognition({
                  fromUserId: me.id,
                  toUserId: toId,
                  message: msg.trim(),
                  category: 'peer',
                })
                setMsg('')
                setToId('')
              }
            }}
          >
            <Heart className="w-4 h-4" /> Send
          </Button>
        </CardContent>
      </Card>

      {recent.map((r) => {
        const to = findUser(r.toUserId)
        const from = findUser(r.fromUserId)
        return (
          <Card key={r.id}>
            <CardContent className="pt-4 text-sm">
              <p className="font-medium">{to?.name}</p>
              <p className="text-xs text-slate-500">from {from?.name}</p>
              <p className="text-slate-600 mt-2">{r.message}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-slate-400">{timeAgo(r.createdAt)}</p>
                <button
                  onClick={() => reactToRecognition(r.id)}
                  className="flex items-center gap-1 text-xs text-slate-600"
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> {r.reactions}
                </button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
