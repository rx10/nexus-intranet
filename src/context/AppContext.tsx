import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  announcements as seedAnnouncements,
  forumThreads as seedForumThreads,
  moderationQueue as seedModerationQueue,
  recognitions as seedRecognitions,
  users,
} from '@/data/seed'
import type {
  Announcement,
  ForumThread,
  ModerationItem,
  ModerationStatus,
  Recognition,
  RecognitionCategory,
  RecognitionReply,
  RecognitionStatus,
  User,
} from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export type AppMode = 'web' | 'mobile' | 'admin'

interface NewRecognitionPayload {
  fromUserId: string
  toUserId: string
  message: string
  category: RecognitionCategory
}

interface AppContextValue {
  // Session
  currentUser: User | null
  mode: AppMode
  // Mutable collections
  announcements: Announcement[]
  recognitions: Recognition[]
  forumThreads: ForumThread[]
  moderationQueue: ModerationItem[]
  // Actions
  login: (email: string, password: string) => boolean
  logout: () => void
  setMode: (mode: AppMode) => void
  addRecognition: (rec: NewRecognitionPayload) => void
  reactToRecognition: (id: string) => void
  addReply: (recognitionId: string, text: string) => void
  publishAnnouncement: (ann: Announcement) => void
  moderateItem: (id: string, status: Extract<ModerationStatus, 'approved' | 'removed'>) => void
  resetDemo: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

const KEY_SESSION = 'nexus:session'
const KEY_ANN = 'nexus:announcements'
const KEY_REC = 'nexus:recognitions'
const KEY_FORUM = 'nexus:forum'
const KEY_MOD = 'nexus:moderation'

export function AppProvider({ children }: { children: ReactNode }) {
  const [sessionUserId, setSessionUserId] = useLocalStorage<string | null>(KEY_SESSION, null)
  const [mode, setMode] = useState<AppMode>('web')

  const [announcements, setAnnouncements] = useLocalStorage<Announcement[]>(KEY_ANN, seedAnnouncements)
  const [recognitions, setRecognitions] = useLocalStorage<Recognition[]>(KEY_REC, seedRecognitions)
  const [forumThreads] = useLocalStorage<ForumThread[]>(KEY_FORUM, seedForumThreads)
  const [moderationQueue, setModerationQueue] = useLocalStorage<ModerationItem[]>(KEY_MOD, seedModerationQueue)

  const currentUser = useMemo<User | null>(
    () => (sessionUserId ? users.find((u) => u.id === sessionUserId) ?? null : null),
    [sessionUserId]
  )

  const login = useCallback(
    (email: string, password: string) => {
      const match = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      )
      if (!match) return false
      setSessionUserId(match.id)
      setMode(match.role === 'employee' ? 'web' : 'admin')
      return true
    },
    [setSessionUserId]
  )

  const logout = useCallback(() => {
    setSessionUserId(null)
    setMode('web')
  }, [setSessionUserId])

  const addRecognition = useCallback(
    (payload: NewRecognitionPayload) => {
      const next: Recognition = {
        id: `rec-${Date.now()}`,
        createdAt: new Date().toISOString(),
        reactions: 0,
        replies: [],
        moderated: false,
        status: 'active',
        ...payload,
      }
      setRecognitions((prev) => [next, ...prev])
    },
    [setRecognitions]
  )

  const reactToRecognition = useCallback(
    (id: string) => {
      setRecognitions((prev) =>
        prev.map((r) => (r.id === id ? { ...r, reactions: r.reactions + 1 } : r))
      )
    },
    [setRecognitions]
  )

  const addReply = useCallback(
    (recognitionId: string, text: string) => {
      if (!currentUser) return
      const reply: RecognitionReply = {
        id: `reply-${Date.now()}`,
        userId: currentUser.id,
        text,
        createdAt: new Date().toISOString(),
      }
      setRecognitions((prev) =>
        prev.map((r) =>
          r.id === recognitionId ? { ...r, replies: [...r.replies, reply] } : r
        )
      )
    },
    [currentUser, setRecognitions]
  )

  const publishAnnouncement = useCallback(
    (ann: Announcement) => {
      const stamped: Announcement = {
        ...ann,
        publishedAt: ann.publishedAt || new Date().toISOString(),
      }
      setAnnouncements((prev) => [stamped, ...prev])
    },
    [setAnnouncements]
  )

  const moderateItem = useCallback(
    (id: string, status: 'approved' | 'removed') => {
      setModerationQueue((prev) => {
        const item = prev.find((m) => m.id === id)
        if (status === 'removed' && item?.type === 'recognition') {
          setRecognitions((recs) =>
            recs.map((r) =>
              r.id === item.contentId
                ? { ...r, status: 'hidden' as RecognitionStatus }
                : r
            )
          )
        }
        return prev.map((m) => (m.id === id ? { ...m, status } : m))
      })
    },
    [setModerationQueue, setRecognitions]
  )

  const resetDemo = useCallback(() => {
    setAnnouncements(seedAnnouncements)
    setRecognitions(seedRecognitions)
    setModerationQueue(seedModerationQueue)
  }, [setAnnouncements, setRecognitions, setModerationQueue])

  const value = useMemo<AppContextValue>(
    () => ({
      currentUser,
      mode,
      announcements,
      recognitions,
      forumThreads,
      moderationQueue,
      login,
      logout,
      setMode,
      addRecognition,
      reactToRecognition,
      addReply,
      publishAnnouncement,
      moderateItem,
      resetDemo,
    }),
    [
      currentUser,
      mode,
      announcements,
      recognitions,
      forumThreads,
      moderationQueue,
      login,
      logout,
      addRecognition,
      reactToRecognition,
      addReply,
      publishAnnouncement,
      moderateItem,
      resetDemo,
    ]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within <AppProvider>')
  return ctx
}
