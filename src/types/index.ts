export type UserRole = 'employee' | 'hr' | 'admin'
export type VisibilityPool = 'organization' | 'vertical' | 'department' | 'leadership'
export type BadgeTone = 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'info'

export interface Department {
  id: string
  name: string
  verticalId: string
  headcount: number
  color: string
}

export interface Vertical {
  id: string
  name: string
  description: string
  icon: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  title: string
  departmentId: string
  verticalId: string
  avatar: string
  location: string
  skills: string[]
  bio: string
  joinedAt: string
  points: number
  badges: string[]
  visibilityPools: VisibilityPool[]
}

export type AnnouncementType = 'company' | 'business' | 'project-win' | 'milestone'
export type AnnouncementStatus = 'draft' | 'published' | 'archived'

export interface Announcement {
  id: string
  title: string
  summary: string
  body: string
  type: AnnouncementType
  authorId: string
  publishedAt: string
  visibility: VisibilityPool
  verticalId?: string
  departmentId?: string
  tags: string[]
  featured: boolean
  status: AnnouncementStatus
}

export type LeadershipCategory = 'vision' | 'message' | 'meet-outcome'

export interface LeadershipMessage {
  id: string
  title: string
  excerpt: string
  body: string
  authorName: string
  authorTitle: string
  publishedAt: string
  category: LeadershipCategory
  videoUrl?: string
}

export interface Footprint {
  id: string
  teamName: string
  departmentId: string
  verticalId: string
  impact: string
  metrics: Array<{ label: string; value: string }>
  quarter: string
  visibility: VisibilityPool
}

export type EventType = 'townhall' | 'celebration' | 'workshop' | 'volunteer' | 'social'

export interface EventItem {
  id: string
  title: string
  description: string
  start: string
  end: string
  type: EventType
  location: string
  departmentId?: string
  attendees: number
  color: string
}

export type RecognitionCategory = 'peer' | 'achievement' | 'milestone' | 'welcome'
export type RecognitionStatus = 'active' | 'flagged' | 'hidden'

export interface RecognitionReply {
  id: string
  userId: string
  text: string
  createdAt: string
}

export interface Recognition {
  id: string
  fromUserId: string
  toUserId: string
  message: string
  category: RecognitionCategory
  createdAt: string
  reactions: number
  replies: RecognitionReply[]
  moderated: boolean
  status: RecognitionStatus
}

export interface ForumReply {
  id: string
  userId: string
  text: string
  createdAt: string
}

export interface ForumThread {
  id: string
  title: string
  body: string
  authorId: string
  category: string
  createdAt: string
  /** Persisted reply list — the legacy `replies` count is derived from this. */
  repliesList: ForumReply[]
  views: number
  pinned: boolean
  tags: string[]
}

export type DocCategory = 'handbook' | 'policy' | 'reference' | 'onboarding'

export interface KnowledgeDoc {
  id: string
  title: string
  category: DocCategory
  summary: string
  updatedAt: string
  size: string
  departmentId?: string
}

export interface MediaItem {
  id: string
  title: string
  type: 'image' | 'video'
  url: string
  event: string
  date: string
  departmentId?: string
}

export type ModerationType = 'recognition' | 'forum' | 'comment'
export type ModerationStatus = 'pending' | 'approved' | 'removed'

export interface ModerationItem {
  id: string
  type: ModerationType
  contentId: string
  reason: string
  reportedBy: string
  status: ModerationStatus
  createdAt: string
}

export interface NewJoinee {
  id: string
  userId: string
  quote: string
  funFact: string
  startDate: string
}
