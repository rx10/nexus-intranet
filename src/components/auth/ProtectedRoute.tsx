import { Navigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import type { ReactNode } from 'react'
import type { UserRole } from '@/types'

interface ProtectedRouteProps {
  children: ReactNode
  /** If set, only these roles may render the children; others get bounced to `/app`. */
  roles?: UserRole[]
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { currentUser } = useApp()
  if (!currentUser) return <Navigate to="/" replace />
  if (roles && !roles.includes(currentUser.role)) return <Navigate to="/app" replace />
  return <>{children}</>
}
