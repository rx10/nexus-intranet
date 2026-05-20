import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, Shield, Smartphone, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useApp } from '@/context/AppContext'
import type { AppMode } from '@/context/AppContext'

interface DemoAccount {
  label: string
  email: string
  password: string
  target: string
  mode: AppMode
  icon: typeof Monitor
  variant: 'secondary' | 'ghost'
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    label: 'Employee · Web — alex.rivera / employee123',
    email: 'alex.rivera@nexuscorp.com',
    password: 'employee123',
    target: '/app',
    mode: 'web',
    icon: Monitor,
    variant: 'secondary',
  },
  {
    label: 'Employee · Mobile shell',
    email: 'alex.rivera@nexuscorp.com',
    password: 'employee123',
    target: '/mobile',
    mode: 'mobile',
    icon: Smartphone,
    variant: 'secondary',
  },
  {
    label: 'HR · Command Center — priya.sharma / hr123',
    email: 'priya.sharma@nexuscorp.com',
    password: 'hr123',
    target: '/admin',
    mode: 'admin',
    icon: Shield,
    variant: 'secondary',
  },
  {
    label: 'Admin — jordan.lee / admin123',
    email: 'jordan.lee@nexuscorp.com',
    password: 'admin123',
    target: '/admin',
    mode: 'admin',
    icon: Shield,
    variant: 'ghost',
  },
]

export function Login() {
  const { login, setMode } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('alex.rivera@nexuscorp.com')
  const [password, setPassword] = useState('employee123')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (login(email, password)) {
      navigate('/app')
    } else {
      setError('Invalid credentials. Try a demo account below.')
    }
  }

  function quickLogin(account: DemoAccount) {
    setError('')
    if (login(account.email, account.password)) {
      setMode(account.mode)
      navigate(account.target)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-4 safe-top safe-bottom">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500 text-white mb-4 shadow-elevated">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Nexus</h1>
          <p className="text-slate-400 mt-2">
            Corporate Intranet — Engage, Align, Celebrate
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" size="lg">
                Enter Nexus
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-3 font-medium uppercase tracking-wide">
                Demo accounts
              </p>
              <div className="grid gap-2">
                {DEMO_ACCOUNTS.map((account) => (
                  <Button
                    key={account.label}
                    type="button"
                    variant={account.variant}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => quickLogin(account)}
                  >
                    <account.icon className="w-4 h-4" />
                    {account.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
