import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Monitor } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Avatar } from '@/components/ui/Avatar'
import { mobileNav } from '@/config/nav'
import { cn } from '@/lib/utils'

export function MobileLayout() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()
  if (!currentUser) return null

  return (
    <div className="mobile-shell flex flex-col min-h-dvh">
      <header className="sticky top-0 z-20 glass px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
          <div>
            <p className="text-sm font-semibold leading-tight">Hi, {currentUser.name.split(' ')[0]}</p>
            <p className="text-xs text-brand-600 font-medium">{currentUser.points} pts</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => navigate('/app')}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            title="Web console"
            aria-label="Web console"
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto mobile-safe pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] glass border-t border-slate-100 px-2 py-2 flex justify-around mobile-safe z-30">
        {mobileNav.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-medium',
                isActive ? 'text-brand-600' : 'text-slate-500'
              )
            }
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
