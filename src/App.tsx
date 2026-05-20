import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Layouts
import { WebLayout } from '@/layouts/WebLayout'
import { MobileLayout } from '@/layouts/MobileLayout'
import { AdminLayout } from '@/layouts/AdminLayout'

// Auth
import { Login } from '@/pages/Login'

// Employee web
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

// Admin
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { Moderation } from '@/pages/admin/Moderation'
import { ContentPublish } from '@/pages/admin/ContentPublish'
import { Analytics } from '@/pages/admin/Analytics'

// Mobile
import { MobileHome } from '@/pages/mobile/MobileHome'
import { MobileFeed } from '@/pages/mobile/MobileFeed'
import { MobileRecognition } from '@/pages/mobile/MobileRecognition'
import { MobileCalendar } from '@/pages/mobile/MobileCalendar'
import { MobilePeople } from '@/pages/mobile/MobilePeople'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AppProvider>
  )
}
