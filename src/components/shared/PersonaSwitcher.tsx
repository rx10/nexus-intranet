import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UserCog,
  Monitor,
  Smartphone,
  Shield,
  Sparkles,
  X,
  ChevronUp,
} from 'lucide-react'
import { useApp, type AppMode } from '@/context/AppContext'
import type { LucideIcon } from 'lucide-react'

interface Persona {
  label: string
  description: string
  email: string
  password: string
  target: string
  mode: AppMode
  icon: LucideIcon
  accent: string
}

const PERSONAS: Persona[] = [
  {
    label: 'Alex Rivera',
    description: 'Employee · Tech vertical · Product Design',
    email: 'alex.rivera@nexuscorp.com',
    password: 'employee123',
    target: '/app',
    mode: 'web',
    icon: Monitor,
    accent: 'bg-brand-50 text-brand-700 border-brand-100',
  },
  {
    label: 'Alex Rivera · Mobile',
    description: 'Same employee, mobile shell (limited features)',
    email: 'alex.rivera@nexuscorp.com',
    password: 'employee123',
    target: '/mobile',
    mode: 'mobile',
    icon: Smartphone,
    accent: 'bg-slate-50 text-slate-700 border-slate-200',
  },
  {
    label: 'Priya Sharma',
    description: 'HR Head · sees all pools + moderation + publish',
    email: 'priya.sharma@nexuscorp.com',
    password: 'hr123',
    target: '/admin',
    mode: 'admin',
    icon: Shield,
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    label: 'Morgan Chen',
    description: 'CEO · leadership pool, sees draft leadership content',
    email: 'morgan.chen@nexuscorp.com',
    password: 'leadership123',
    target: '/app',
    mode: 'web',
    icon: Sparkles,
    accent: 'bg-amber-50 text-amber-700 border-amber-100',
  },
]

export function PersonaSwitcher() {
  const { currentUser, login, setMode } = useApp()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!currentUser) return null

  function switchTo(p: Persona) {
    if (login(p.email, p.password)) {
      setMode(p.mode)
      navigate(p.target)
      setOpen(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 print:hidden">
      {open ? (
        <div className="w-80 bg-white rounded-2xl shadow-elevated border border-slate-100 animate-slide-up overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <p className="text-sm font-semibold flex items-center gap-1.5">
                <UserCog className="w-4 h-4 text-brand-600" /> Demo persona switcher
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Try the multi-tenant visibility — same data, different views.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close persona switcher"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-2 max-h-[60vh] overflow-y-auto">
            {PERSONAS.map((p) => {
              const isCurrent =
                p.email.toLowerCase() === currentUser.email.toLowerCase() &&
                p.target.startsWith(window.location.pathname.split('/').slice(0, 2).join('/'))
              return (
                <button
                  key={p.label + p.target}
                  onClick={() => switchTo(p)}
                  className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                    isCurrent
                      ? 'bg-brand-50 ring-1 ring-brand-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${p.accent}`}
                  >
                    <p.icon className="w-4 h-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="text-sm font-medium text-slate-800 block truncate">
                      {p.label}
                      {isCurrent && (
                        <span className="ml-2 text-[10px] uppercase tracking-wide text-brand-600">
                          Current
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {p.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-elevated hover:bg-slate-800 text-sm font-medium"
        >
          <UserCog className="w-4 h-4" /> Switch persona
          <ChevronUp className="w-3.5 h-3.5 opacity-70" />
        </button>
      )}
    </div>
  )
}
