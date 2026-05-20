import { useApp } from '@/context/AppContext'
import type { User } from '@/types'

/**
 * Returns the current user. Throws if called outside `<ProtectedRoute>` —
 * lets components drop the `if (!currentUser) return null` boilerplate.
 */
export function useCurrentUser(): User {
  const { currentUser } = useApp()
  if (!currentUser) {
    throw new Error(
      'useCurrentUser called without an authenticated session. Wrap the route in <ProtectedRoute>.'
    )
  }
  return currentUser
}
