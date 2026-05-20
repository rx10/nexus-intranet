import type {
  Announcement,
  Recognition,
  User,
  VisibilityPool,
} from '@/types'

/* ────────────────────────────────────────────────────────────────────────── *
 * Tenancy & visibility
 * ────────────────────────────────────────────────────────────────────────── */

export function canView(
  visibility: VisibilityPool,
  user: User,
  opts?: { verticalId?: string; departmentId?: string }
): boolean {
  if (user.role === 'admin' || user.role === 'hr') return true
  if (visibility === 'organization') return true
  if (visibility === 'leadership') return user.visibilityPools.includes('leadership')
  if (visibility === 'vertical') return opts?.verticalId === user.verticalId
  if (visibility === 'department') return opts?.departmentId === user.departmentId
  return false
}

export function filterByTenant<
  T extends { verticalId?: string; departmentId?: string; visibility?: VisibilityPool }
>(items: T[], user: User): T[] {
  return items.filter((item) => {
    if (!item.visibility) return true
    return canView(item.visibility, user, {
      verticalId: item.verticalId,
      departmentId: item.departmentId,
    })
  })
}

/* ────────────────────────────────────────────────────────────────────────── *
 * Directory
 * ────────────────────────────────────────────────────────────────────────── */

export function visibleColleagues(directory: User[], me: User): User[] {
  if (me.role === 'admin' || me.role === 'hr') return directory
  return directory.filter((u) => {
    if (u.id === me.id) return true
    if (u.visibilityPools.includes('organization')) return true
    if (u.verticalId === me.verticalId) return true
    if (u.departmentId === me.departmentId) return true
    return false
  })
}

/* ────────────────────────────────────────────────────────────────────────── *
 * Announcements
 * ────────────────────────────────────────────────────────────────────────── */

export function visibleAnnouncements(
  announcements: Announcement[],
  user: User,
  opts: { onlyPublished?: boolean } = {}
): Announcement[] {
  const { onlyPublished = true } = opts
  const scoped = onlyPublished
    ? announcements.filter((a) => a.status === 'published')
    : announcements
  return filterByTenant(scoped, user)
}

/* ────────────────────────────────────────────────────────────────────────── *
 * Leaderboard (kudos + base points)
 * ────────────────────────────────────────────────────────────────────────── */

export interface LeaderboardRow {
  rank: number
  userId: string
  name: string
  departmentId: string
  points: number
  kudosReceived: number
}

const KUDOS_BONUS_PER_RECOGNITION = 25
const KUDOS_BONUS_PER_REACTION = 2

export function computeLeaderboard(
  directory: User[],
  recognitions: Recognition[],
  limit = 10
): LeaderboardRow[] {
  const kudosCount = new Map<string, number>()
  const reactionCount = new Map<string, number>()
  for (const r of recognitions) {
    if (r.status === 'hidden') continue
    kudosCount.set(r.toUserId, (kudosCount.get(r.toUserId) ?? 0) + 1)
    reactionCount.set(r.toUserId, (reactionCount.get(r.toUserId) ?? 0) + r.reactions)
  }

  return directory
    .map((u) => {
      const kudos = kudosCount.get(u.id) ?? 0
      const reacts = reactionCount.get(u.id) ?? 0
      return {
        userId: u.id,
        name: u.name,
        departmentId: u.departmentId,
        kudosReceived: kudos,
        points:
          u.points +
          kudos * KUDOS_BONUS_PER_RECOGNITION +
          reacts * KUDOS_BONUS_PER_REACTION,
      }
    })
    .sort((a, b) => b.points - a.points)
    .slice(0, limit)
    .map((row, i) => ({ rank: i + 1, ...row }))
}
