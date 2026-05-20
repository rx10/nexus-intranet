import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Menu, Smartphone, Shield, Building2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { findDepartment } from '@/data/seed'
import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'
import { webNav } from '@/config/nav'

export function WebLayout() {
  const { currentUser, logout, setMode } = useApp()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  if (!currentUser) return null

  const dept = findDepartment(currentUser.departmentId)
  const isPrivileged = currentUser.role === 'hr' || currentUser.role === 'admin'

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100',
          'flex flex-col transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-slate-900 leading-tight">Nexus</h1>
            <p className="text-xs text-slate-500">Employee Experience</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {webNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50'
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100 space-y-1">
          {isPrivileged && (
            <button
              onClick={() => {
                setMode('admin')
                navigate('/admin')
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-brand-700 hover:bg-brand-50 rounded-xl"
            >
              <Shield className="w-4 h-4" /> HR Command Center
            </button>
          )}
          <button
            onClick={() => navigate('/mobile')}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-xl"
          >
            <Smartphone className="w-4 h-4" /> Mobile view
          </button>
          <div className="flex items-center gap-3 px-2 py-2">
            <Avatar src={currentUser.avatar} name={currentUser.name} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-slate-500 truncate">{dept?.name}</p>
            </div>
            <button
              onClick={() => {
                logout()
                navigate('/')
              }}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 glass border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-semibold">Nexus</span>
          <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
