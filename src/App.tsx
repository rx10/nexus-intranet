import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Layouts (eager — needed for the first paint)
import { WebLayout } from '@/layouts/WebLayout'

// Auth
import { Login } from '@/pages/Login'

// Employee web (eager — landing surface for employees)
import { Dashboard } from '@/pages/Dashboard'
import { Leadership } from '@/pages/Leadership'
import { Announcements } from '@/pages/Announcements'
import { Footprints } from '@/pages/Footprints'
import { CalendarPage } from '@/pages/CalendarPage'
import { People } from '@/pages/People'
import { Recognition } from '@/pages/Recognition'
import { Knowledge } from '@/pages/Knowledge'
import { Gallery } from '@/pages/Gallery'
import { Forum } from '@/pages/Forum'

// Admin shell — only HR/admin users hit this; recharts ships in this chunk
const AdminLayout = lazy(() =>
  import('@/layouts/AdminLayout').then((m) => ({ default: m.AdminLayout }))
)
const AdminDashboard = lazy(() =>
  import('@/pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
)
const Moderation = lazy(() =>
  import('@/pages/admin/Moderation').then((m) => ({ default: m.Moderation }))
)
const ContentPublish = lazy(() =>
  import('@/pages/admin/ContentPublish').then((m) => ({ default: m.ContentPublish }))
)
const Analytics = lazy(() =>
  import('@/pages/admin/Analytics').then((m) => ({ default: m.Analytics }))
)

// Mobile shell — separate user journey, separate chunk
const MobileLayout = lazy(() =>
  import('@/layouts/MobileLayout').then((m) => ({ default: m.MobileLayout }))
)
const MobileHome = lazy(() =>
  import('@/pages/mobile/MobileHome').then((m) => ({ default: m.MobileHome }))
)
const MobileFeed = lazy(() =>
  import('@/pages/mobile/MobileFeed').then((m) => ({ default: m.MobileFeed }))
)
const MobileRecognition = lazy(() =>
  import('@/pages/mobile/MobileRecognition').then((m) => ({ default: m.MobileRecognition }))
)
const MobileCalendar = lazy(() =>
  import('@/pages/mobile/MobileCalendar').then((m) => ({ default: m.MobileCalendar }))
)
const MobilePeople = lazy(() =>
  import('@/pages/mobile/MobilePeople').then((m) => ({ default: m.MobilePeople }))
)

function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-8 h-8 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <WebLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="leadership" element={<Leadership />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="footprints" element={<Footprints />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="people" element={<People />} />
              <Route path="recognition" element={<Recognition />} />
              <Route path="knowledge" element={<Knowledge />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="forum" element={<Forum />} />
            </Route>

            <Route
              path="/mobile"
              element={
                <ProtectedRoute>
                  <MobileLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<MobileHome />} />
              <Route path="feed" element={<MobileFeed />} />
              <Route path="recognition" element={<MobileRecognition />} />
              <Route path="calendar" element={<MobileCalendar />} />
              <Route path="people" element={<MobilePeople />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['hr', 'admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="moderation" element={<Moderation />} />
              <Route path="content" element={<ContentPublish />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  )
}
