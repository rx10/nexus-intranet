import type {
  Announcement,
  Department,
  EventItem,
  Footprint,
  ForumThread,
  KnowledgeDoc,
  LeadershipMessage,
  MediaItem,
  ModerationItem,
  NewJoinee,
  Recognition,
  User,
  Vertical,
  VisibilityPool,
} from '@/types'

/* ─── Org structure ─────────────────────────────────────────────────────── */

export const verticals: Vertical[] = [
  { id: 'v-tech', name: 'Technology', description: 'Product engineering & platform', icon: 'Cpu' },
  { id: 'v-ops', name: 'Operations', description: 'Delivery, support & excellence', icon: 'Workflow' },
  { id: 'v-gtm', name: 'Go-To-Market', description: 'Sales, marketing & partnerships', icon: 'TrendingUp' },
  { id: 'v-corp', name: 'Corporate', description: 'HR, finance, legal & admin', icon: 'Building2' },
]

export const departments: Department[] = [
  { id: 'd-platform', name: 'Platform Engineering', verticalId: 'v-tech', headcount: 48, color: '#6366f1' },
  { id: 'd-product', name: 'Product Design', verticalId: 'v-tech', headcount: 22, color: '#8b5cf6' },
  { id: 'd-delivery', name: 'Client Delivery', verticalId: 'v-ops', headcount: 65, color: '#0ea5e9' },
  { id: 'd-support', name: 'Customer Success', verticalId: 'v-ops', headcount: 34, color: '#14b8a6' },
  { id: 'd-sales', name: 'Enterprise Sales', verticalId: 'v-gtm', headcount: 40, color: '#f59e0b' },
  { id: 'd-marketing', name: 'Brand & Marketing', verticalId: 'v-gtm', headcount: 18, color: '#ec4899' },
  { id: 'd-hr', name: 'People & Culture', verticalId: 'v-corp', headcount: 12, color: '#10b981' },
  { id: 'd-finance', name: 'Finance', verticalId: 'v-corp', headcount: 15, color: '#64748b' },
]

/* ─── Directory ─────────────────────────────────────────────────────────── */

const COLLEAGUE_NAMES = [
  'Sam Okonkwo', 'Elena Vasquez', 'Ravi Patel', 'Nina Kowalski',
  'James Wu', 'Fatima Al-Rashid', "Chris O'Brien", 'Yuki Tanaka',
  'Diego Morales', 'Aisha Khan', 'Tom Berger', 'Lisa Nguyen',
]

const COLLEAGUE_TITLES = [
  'Senior Engineer', 'Lead Designer', 'Account Executive', 'CS Lead',
  'Business Analyst', 'Recruiter', 'DevOps Engineer', 'Technical Writer',
  'Solutions Architect', 'Product Manager', 'QA Lead', 'Data Scientist',
]

const COLLEAGUE_LOCATIONS = ['Remote', 'New York, NY', 'London, UK', 'Singapore']
const ORG_VERTICAL_DEPT_POOL: VisibilityPool[] = ['organization', 'vertical', 'department']

export const users: User[] = [
  {
    id: 'u-emp',
    name: 'Alex Rivera',
    email: 'alex.rivera@nexuscorp.com',
    password: 'employee123',
    role: 'employee',
    title: 'Senior Product Analyst',
    departmentId: 'd-product',
    verticalId: 'v-tech',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    location: 'Austin, TX',
    skills: ['Analytics', 'Roadmapping', 'Workshops'],
    bio: 'Passionate about clarity and cross-team alignment.',
    joinedAt: '2022-03-15',
    points: 1240,
    badges: ['Collaborator', 'Culture Champion'],
    visibilityPools: ['organization', 'vertical', 'department'],
  },
  {
    id: 'u-hr',
    name: 'Priya Sharma',
    email: 'priya.sharma@nexuscorp.com',
    password: 'hr123',
    role: 'hr',
    title: 'Head of People & Culture',
    departmentId: 'd-hr',
    verticalId: 'v-corp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    location: 'New York, NY',
    skills: ['Engagement', 'Policy', 'Moderation'],
    bio: 'Building workplaces where everyone feels seen.',
    joinedAt: '2019-06-01',
    points: 2100,
    badges: ['Culture Architect', 'Moderator'],
    visibilityPools: ['organization', 'vertical', 'department', 'leadership'],
  },
  {
    id: 'u-admin',
    name: 'Jordan Lee',
    email: 'jordan.lee@nexuscorp.com',
    password: 'admin123',
    role: 'admin',
    title: 'Intranet Platform Admin',
    departmentId: 'd-platform',
    verticalId: 'v-tech',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    location: 'Remote',
    skills: ['Governance', 'Analytics', 'Content'],
    bio: 'Keeping Nexus aligned and secure.',
    joinedAt: '2020-01-10',
    points: 1850,
    badges: ['Platform Guardian'],
    visibilityPools: ['organization', 'vertical', 'department', 'leadership'],
  },
  {
    id: 'u-ceo',
    name: 'Morgan Chen',
    email: 'morgan.chen@nexuscorp.com',
    password: 'leadership123',
    role: 'employee',
    title: 'Chief Executive Officer',
    departmentId: 'd-platform',
    verticalId: 'v-tech',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan',
    location: 'San Francisco, CA',
    skills: ['Strategy', 'Vision'],
    bio: 'Customer-obsessed, people-first leadership.',
    joinedAt: '2015-01-01',
    points: 3200,
    badges: ['Visionary'],
    visibilityPools: ['organization', 'leadership'],
  },
  ...Array.from({ length: 12 }, (_, i): User => {
    const dept = departments[i % departments.length]
    return {
      id: `u-${i + 10}`,
      name: COLLEAGUE_NAMES[i],
      email: `colleague${i + 10}@nexuscorp.com`,
      password: 'employee123',
      role: 'employee',
      title: COLLEAGUE_TITLES[i],
      departmentId: dept.id,
      verticalId: dept.verticalId,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`,
      location: COLLEAGUE_LOCATIONS[i % COLLEAGUE_LOCATIONS.length],
      skills: ['Teamwork', 'Communication'],
      bio: 'Happy to collaborate across functions.',
      joinedAt: `2023-${String((i % 12) + 1).padStart(2, '0')}-01`,
      points: 400 + i * 85,
      badges: i % 3 === 0 ? ['Rising Star'] : [],
      visibilityPools: ORG_VERTICAL_DEPT_POOL,
    }
  }),
]

/* ─── Leadership ────────────────────────────────────────────────────────── */

export const leadershipMessages: LeadershipMessage[] = [
  {
    id: 'lm-1',
    title: '2026 Vision: One Nexus, Infinite Impact',
    excerpt:
      'Our north star is unified visibility — every team sees how their work moves the company forward.',
    body:
      'This year we double down on cross-vertical collaboration, transparent milestones, and celebrating wins at every level. Your voice on Nexus shapes how we work together.',
    authorName: 'Morgan Chen',
    authorTitle: 'CEO',
    publishedAt: '2026-05-01T09:00:00Z',
    category: 'vision',
  },
  {
    id: 'lm-2',
    title: 'April Leadership Meet — Key Outcomes',
    excerpt:
      'Q2 priorities: platform scale, customer delight index +12%, and culture programs expansion.',
    body:
      'Leadership aligned on three pillars: delivery excellence, GTM acceleration, and people experience. Department footprints will be updated monthly on Nexus.',
    authorName: 'Morgan Chen',
    authorTitle: 'CEO',
    publishedAt: '2026-04-28T14:00:00Z',
    category: 'meet-outcome',
  },
  {
    id: 'lm-3',
    title: 'Thank You for an Incredible Q1',
    excerpt:
      'Record engagement on our internal platforms — you are building something special.',
    body:
      'From volunteer drives to product launches, your energy fuels our momentum. Keep sharing stories and recognizing peers.',
    authorName: 'Morgan Chen',
    authorTitle: 'CEO',
    publishedAt: '2026-04-15T10:00:00Z',
    category: 'message',
  },
]

/* ─── Announcements ─────────────────────────────────────────────────────── */

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Nexus Intranet Launch — Welcome Aboard',
    summary: 'Our new engagement layer is live for all employees.',
    body:
      'Explore dashboards, recognition, knowledge hub, and forums. HR and admins can moderate from the command center.',
    type: 'company',
    authorId: 'u-hr',
    publishedAt: '2026-05-18T08:00:00Z',
    visibility: 'organization',
    tags: ['launch', 'culture'],
    featured: true,
    status: 'published',
  },
  {
    id: 'ann-2',
    title: 'Enterprise Deal Closed — FinServe Global',
    summary: 'GTM closes $4.2M multi-year partnership.',
    body: 'Huge win for Enterprise Sales and Delivery. Shout-out to Elena, Ravi, and the proposal squad.',
    type: 'project-win',
    authorId: 'u-admin',
    publishedAt: '2026-05-16T11:00:00Z',
    visibility: 'organization',
    tags: ['win', 'sales'],
    featured: true,
    status: 'published',
  },
  {
    id: 'ann-3',
    title: 'Platform 3.0 Milestone Shipped',
    summary: 'Core API latency reduced 40%; 12 teams onboarded.',
    body: 'Platform Engineering hit a major reliability milestone. See footprint card for metrics.',
    type: 'milestone',
    authorId: 'u-admin',
    publishedAt: '2026-05-14T09:30:00Z',
    visibility: 'vertical',
    verticalId: 'v-tech',
    tags: ['engineering'],
    featured: false,
    status: 'published',
  },
  {
    id: 'ann-4',
    title: 'Delivery Ops — Regional Expansion',
    summary: 'New APAC hub opening in Q3.',
    body: 'Operations vertical expanding footprint. Department-only briefing for delivery leads.',
    type: 'business',
    authorId: 'u-hr',
    publishedAt: '2026-05-10T16:00:00Z',
    visibility: 'department',
    departmentId: 'd-delivery',
    verticalId: 'v-ops',
    tags: ['ops'],
    featured: false,
    status: 'published',
  },
  {
    id: 'ann-5',
    title: 'Draft: Summer Townhall Agenda',
    summary: 'Internal draft — not yet published.',
    body: 'Agenda items TBD.',
    type: 'company',
    authorId: 'u-hr',
    publishedAt: '2026-05-19T12:00:00Z',
    visibility: 'leadership',
    tags: ['draft'],
    featured: false,
    status: 'draft',
  },
]

/* ─── Footprints ────────────────────────────────────────────────────────── */

export const footprints: Footprint[] = [
  {
    id: 'fp-1',
    teamName: 'Platform Engineering',
    departmentId: 'd-platform',
    verticalId: 'v-tech',
    impact: 'Reduced P99 latency 40% and enabled 12 downstream teams.',
    metrics: [
      { label: 'Uptime', value: '99.97%' },
      { label: 'Teams enabled', value: '12' },
      { label: 'Incidents', value: '-28%' },
    ],
    quarter: 'Q2 2026',
    visibility: 'organization',
  },
  {
    id: 'fp-2',
    teamName: 'Enterprise Sales',
    departmentId: 'd-sales',
    verticalId: 'v-gtm',
    impact: 'Closed 3 enterprise logos; pipeline velocity +18%.',
    metrics: [
      { label: 'ARR added', value: '$8.1M' },
      { label: 'Win rate', value: '34%' },
    ],
    quarter: 'Q2 2026',
    visibility: 'vertical',
  },
  {
    id: 'fp-3',
    teamName: 'People & Culture',
    departmentId: 'd-hr',
    verticalId: 'v-corp',
    impact: 'Engagement score +9pts; 4 culture programs launched.',
    metrics: [
      { label: 'eNPS', value: '72' },
      { label: 'Programs', value: '4' },
    ],
    quarter: 'Q1 2026',
    visibility: 'organization',
  },
]

/* ─── Calendar ──────────────────────────────────────────────────────────── */

export const events: EventItem[] = [
  {
    id: 'ev-1',
    title: 'Company Townhall',
    description: 'CEO update + Q&A',
    start: '2026-05-22T15:00:00Z',
    end: '2026-05-22T16:30:00Z',
    type: 'townhall',
    location: 'All-hands Zoom',
    attendees: 420,
    color: '#6366f1',
  },
  {
    id: 'ev-2',
    title: 'Tech Vertical Demo Day',
    description: 'Sprint showcases',
    start: '2026-05-24T17:00:00Z',
    end: '2026-05-24T19:00:00Z',
    type: 'workshop',
    location: 'Building A / Stream',
    departmentId: 'd-platform',
    attendees: 85,
    color: '#8b5cf6',
  },
  {
    id: 'ev-3',
    title: 'Wellness Wednesday',
    description: 'Yoga + mindfulness',
    start: '2026-05-21T12:00:00Z',
    end: '2026-05-21T13:00:00Z',
    type: 'social',
    location: 'Roof garden',
    attendees: 45,
    color: '#10b981',
  },
  {
    id: 'ev-4',
    title: 'Volunteer: Food Bank',
    description: 'Team volunteer drive',
    start: '2026-05-28T09:00:00Z',
    end: '2026-05-28T14:00:00Z',
    type: 'volunteer',
    location: 'Downtown Center',
    attendees: 30,
    color: '#f59e0b',
  },
  {
    id: 'ev-5',
    title: 'Q1 Wins Celebration',
    description: 'Recognition & snacks',
    start: '2026-05-30T18:00:00Z',
    end: '2026-05-30T20:00:00Z',
    type: 'celebration',
    location: 'HQ Atrium',
    attendees: 200,
    color: '#ec4899',
  },
]

/* ─── Recognitions ──────────────────────────────────────────────────────── */

export const recognitions: Recognition[] = [
  {
    id: 'rec-1',
    fromUserId: 'u-emp',
    toUserId: 'u-10',
    message: 'Sam crushed the analytics workshop — clear, actionable, and fun!',
    category: 'peer',
    createdAt: '2026-05-19T10:00:00Z',
    reactions: 14,
    replies: [
      { id: 'r1', userId: 'u-11', text: 'Fully agree — learned a ton!', createdAt: '2026-05-19T11:00:00Z' },
    ],
    moderated: false,
    status: 'active',
  },
  {
    id: 'rec-2',
    fromUserId: 'u-hr',
    toUserId: 'u-12',
    message: 'Welcome Elena! Excited to have your design leadership on the team.',
    category: 'welcome',
    createdAt: '2026-05-17T09:00:00Z',
    reactions: 22,
    replies: [],
    moderated: false,
    status: 'active',
  },
  {
    id: 'rec-3',
    fromUserId: 'u-13',
    toUserId: 'u-14',
    message: 'FinServe deal — Ravi was unstoppable on the final negotiation.',
    category: 'achievement',
    createdAt: '2026-05-16T15:00:00Z',
    reactions: 31,
    replies: [
      { id: 'r2', userId: 'u-emp', text: 'Legendary hustle!', createdAt: '2026-05-16T16:00:00Z' },
    ],
    moderated: false,
    status: 'active',
  },
  {
    id: 'rec-4',
    fromUserId: 'u-15',
    toUserId: 'u-16',
    message: 'Flagged sample for moderation demo',
    category: 'peer',
    createdAt: '2026-05-15T08:00:00Z',
    reactions: 2,
    replies: [],
    moderated: true,
    status: 'flagged',
  },
]

export const newJoinees: NewJoinee[] = [
  { id: 'nj-1', userId: 'u-12', quote: 'Design is how we show we care.', funFact: 'Ran a marathon on every continent.', startDate: '2026-05-12' },
  { id: 'nj-2', userId: 'u-17', quote: 'Data tells stories — I listen.', funFact: 'Collects vintage keyboards.', startDate: '2026-05-08' },
  { id: 'nj-3', userId: 'u-18', quote: 'Quality is a team sport.', funFact: 'Bakes sourdough every weekend.', startDate: '2026-05-01' },
]

/* ─── Forum ─────────────────────────────────────────────────────────────── */

export const forumThreads: ForumThread[] = [
  {
    id: 'ft-1',
    title: 'Best practices for cross-vertical workshops?',
    body: 'We are planning a joint GTM + Tech session. What format worked for you?',
    authorId: 'u-emp',
    category: 'Collaboration',
    createdAt: '2026-05-18T14:00:00Z',
    repliesList: [
      {
        id: 'ft-1-r1',
        userId: 'u-10',
        text: 'Start with 10 min of context-setting from each side. Saved us last quarter.',
        createdAt: '2026-05-18T15:30:00Z',
      },
      {
        id: 'ft-1-r2',
        userId: 'u-hr',
        text: 'Happy to co-facilitate — People & Culture has a template we can share.',
        createdAt: '2026-05-18T18:10:00Z',
      },
    ],
    views: 124,
    pinned: true,
    tags: ['workshops', 'tips'],
  },
  {
    id: 'ft-2',
    title: 'Remote onboarding tips for new hires',
    body: 'Sharing what helped me in my first 30 days...',
    authorId: 'u-11',
    category: 'Onboarding',
    createdAt: '2026-05-17T10:00:00Z',
    repliesList: [
      {
        id: 'ft-2-r1',
        userId: 'u-12',
        text: 'Block calendar for "shadow Slack" the first week. Massive accelerator.',
        createdAt: '2026-05-17T12:00:00Z',
      },
    ],
    views: 89,
    pinned: false,
    tags: ['onboarding'],
  },
  {
    id: 'ft-3',
    title: 'Policy question: travel guidelines 2026',
    body: 'Is there an updated international travel policy doc?',
    authorId: 'u-19',
    category: 'Policies',
    createdAt: '2026-05-16T09:00:00Z',
    repliesList: [],
    views: 67,
    pinned: false,
    tags: ['policy'],
  },
]

/* ─── Knowledge & media ─────────────────────────────────────────────────── */

export const knowledgeDocs: KnowledgeDoc[] = [
  { id: 'kd-1', title: 'Employee Handbook 2026', category: 'handbook', summary: 'Culture, conduct, and workplace guidelines.', updatedAt: '2026-01-15', size: '2.4 MB' },
  { id: 'kd-2', title: 'Code of Conduct', category: 'policy', summary: 'Ethics and compliance expectations.', updatedAt: '2026-02-01', size: '890 KB' },
  { id: 'kd-3', title: 'Remote Work Policy', category: 'policy', summary: 'Hybrid schedules and equipment.', updatedAt: '2026-03-10', size: '1.1 MB' },
  { id: 'kd-4', title: 'Brand Guidelines', category: 'reference', summary: 'Logos, colors, and voice.', updatedAt: '2026-04-01', size: '5.2 MB', departmentId: 'd-marketing' },
  { id: 'kd-5', title: 'New Hire Onboarding Checklist', category: 'onboarding', summary: 'First 30/60/90 day guide.', updatedAt: '2026-05-01', size: '450 KB' },
]

export const mediaGallery: MediaItem[] = [
  { id: 'mg-1', title: 'Q1 Townhall', type: 'image', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800', event: 'Townhall', date: '2026-04-10' },
  { id: 'mg-2', title: 'Hackathon Winners', type: 'image', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', event: 'Hackathon', date: '2026-03-22', departmentId: 'd-platform' },
  { id: 'mg-3', title: 'Culture Day Recap', type: 'video', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', event: 'Culture Day', date: '2026-02-14' },
  { id: 'mg-4', title: 'Volunteer Drive', type: 'image', url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800', event: 'Volunteer', date: '2026-01-20' },
]

/* ─── Moderation ────────────────────────────────────────────────────────── */

export const moderationQueue: ModerationItem[] = [
  { id: 'mod-1', type: 'recognition', contentId: 'rec-4', reason: 'Potential spam pattern', reportedBy: 'u-11', status: 'pending', createdAt: '2026-05-15T09:00:00Z' },
  { id: 'mod-2', type: 'forum', contentId: 'ft-3', reason: 'Off-topic escalation', reportedBy: 'u-emp', status: 'pending', createdAt: '2026-05-16T11:00:00Z' },
  { id: 'mod-3', type: 'comment', contentId: 'r1', reason: 'Resolved — no action', reportedBy: 'u-hr', status: 'approved', createdAt: '2026-05-14T08:00:00Z' },
]

/* ─── Lookup helpers ────────────────────────────────────────────────────── */

export function findUser(id: string | undefined): User | undefined {
  if (!id) return undefined
  return users.find((u) => u.id === id)
}

export function findDepartment(id: string | undefined) {
  if (!id) return undefined
  return departments.find((d) => d.id === id)
}

export function findVertical(id: string | undefined) {
  if (!id) return undefined
  return verticals.find((v) => v.id === id)
}
