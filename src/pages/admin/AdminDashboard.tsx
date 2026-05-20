import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatCard } from '@/components/shared/StatCard'
import { PageHeader } from '@/components/shared/PageHeader'
import { Users, Heart, MessageSquare, AlertTriangle } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { departments, users, verticals } from '@/data/seed'

const ENGAGEMENT_TREND = [
  { name: 'Mon', views: 420, kudos: 28 },
  { name: 'Tue', views: 380, kudos: 35 },
  { name: 'Wed', views: 510, kudos: 42 },
  { name: 'Thu', views: 490, kudos: 38 },
  { name: 'Fri', views: 620, kudos: 55 },
]

export function AdminDashboard() {
  const { announcements, recognitions, moderationQueue, forumThreads } = useApp()
  const pending = moderationQueue.filter((m) => m.status === 'pending').length

  const participation = useMemo(
    () =>
      verticals.map((v) => {
        const headcount = departments
          .filter((d) => d.verticalId === v.id)
          .reduce((sum, d) => sum + d.headcount, 0)
        const color = departments.find((d) => d.verticalId === v.id)?.color ?? '#6366f1'
        return { name: v.name, value: headcount, color }
      }),
    []
  )

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <PageHeader
        title="HR Command Center"
        subtitle="Engagement analytics, moderation overview, and platform health."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Employees" value={users.length} icon={Users} />
        <StatCard
          label="Active kudos"
          value={recognitions.filter((r) => r.status === 'active').length}
          icon={Heart}
        />
        <StatCard label="Forum threads" value={forumThreads.length} icon={MessageSquare} />
        <StatCard
          label="Pending moderation"
          value={pending}
          icon={AlertTriangle}
          sub={pending ? 'Needs review' : 'All clear'}
          trend={pending ? 'down' : undefined}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly engagement</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENGAGEMENT_TREND}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" name="Page views" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="kudos" name="Kudos given" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Headcount by vertical</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={participation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {participation.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content pipeline</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 grid sm:grid-cols-3 gap-3 text-sm">
          <PipelineRow
            label="Published"
            value={announcements.filter((a) => a.status === 'published').length}
            tone="text-emerald-700 bg-emerald-50"
          />
          <PipelineRow
            label="Drafts"
            value={announcements.filter((a) => a.status === 'draft').length}
            tone="text-amber-700 bg-amber-50"
          />
          <PipelineRow
            label="Flagged recognitions"
            value={recognitions.filter((r) => r.status === 'flagged').length}
            tone="text-red-700 bg-red-50"
          />
        </CardContent>
      </Card>
    </div>
  )
}

function PipelineRow({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={`rounded-xl p-4 ${tone}`}>
      <p className="text-xs uppercase tracking-wide opacity-80">{label}</p>
      <p className="text-2xl font-display font-bold mt-1">{value}</p>
    </div>
  )
}
