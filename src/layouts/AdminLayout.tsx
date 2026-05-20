import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, ArrowLeft } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { PersonaSwitcher } from '@/components/shared/PersonaSwitcher'
import { adminNav } from '@/config/nav'
import { cn } from '@/lib/utils'

export function AdminLayout() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()

  if (!currentUser || (currentUser.role !== 'hr' && currentUser.role !== 'admin')) {
    return (
      <div className="page-container text-center py-20">
        <p className="text-slate-600">HR/Admin access required.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-60 bg-slate-900 text-white flex flex-col safe-top safe-bottom">
        <div className="p-5">
          <Badge tone="brand" className="mb-2 bg-brand-500/20 text-brand-200">
            Command Center
          </Badge>
          <h1 className="font-display font-bold text-lg">Nexus Admin</h1>
          <p className="text-xs text-slate-400 mt-1">{currentUser.name}</p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {adminNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-3">
          <button
            onClick={() => navigate('/app')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white w-full"
          >
            <ArrowLeft className="w-4 h-4" /> Back to employee web
          </button>
          <div className="flex items-center gap-3">
            <Avatar src={currentUser.avatar} name={currentUser.name} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-500 capitalize">{currentUser.role}</p>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="text-slate-400 hover:text-white"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <PersonaSwitcher />
    </div>
  )
}
