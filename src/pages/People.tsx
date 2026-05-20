import { useMemo, useState } from 'react'
import { Search, Mail, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { PageHeader } from '@/components/shared/PageHeader'
import { EmptyState } from '@/components/shared/EmptyState'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { departments, findDepartment, findVertical, users } from '@/data/seed'
import { visibleColleagues } from '@/lib/selectors'

export function People() {
  const me = useCurrentUser()
  const [query, setQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')

  const pool = useMemo(() => visibleColleagues(users, me), [me])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return pool.filter((u) => {
      const matchQ =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.title.toLowerCase().includes(q) ||
        u.skills.some((s) => s.toLowerCase().includes(q))
      const matchD = deptFilter === 'all' || u.departmentId === deptFilter
      return matchQ && matchD
    })
  }, [pool, query, deptFilter])

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="People Directory"
        subtitle="Discover colleagues across functions — visibility respects vertical & department pools."
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name, role, or skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search colleagues"
          />
        </div>
        <Select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="sm:w-64"
          aria-label="Filter by department"
        >
          <option value="all">All departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No matches" description="Try a different search or department." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((u) => {
            const dept = findDepartment(u.departmentId)
            const vert = findVertical(u.verticalId)
            return (
              <Card key={u.id} interactive>
                <CardContent className="pt-5">
                  <div className="flex gap-4">
                    <Avatar src={u.avatar} name={u.name} size="lg" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">{u.name}</p>
                      <p className="text-sm text-slate-500 truncate">{u.title}</p>
                      <Badge className="mt-2">{vert?.name}</Badge>
                      <p className="text-xs text-slate-400 mt-2">{dept?.name}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3 h-3" /> {u.location}
                      </div>
                      <a
                        href={`mailto:${u.email}`}
                        className="flex items-center gap-1 text-xs text-brand-600 mt-2 hover:underline"
                      >
                        <Mail className="w-3 h-3" /> Collaborate
                      </a>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {u.skills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] px-2 py-0.5 bg-slate-100 rounded-full"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
