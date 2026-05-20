import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { findDepartment, users } from '@/data/seed'
import { visibleColleagues } from '@/lib/selectors'

export function MobilePeople() {
  const me = useCurrentUser()
  const [q, setQ] = useState('')

  const pool = useMemo(() => visibleColleagues(users, me), [me])
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    return s ? pool.filter((u) => u.name.toLowerCase().includes(s)) : pool
  }, [pool, q])

  return (
    <div className="p-4 space-y-3">
      <h1 className="font-display font-bold text-lg">People</h1>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pl-9"
          placeholder="Search..."
        />
      </div>
      {filtered.slice(0, 20).map((u) => {
        const dept = findDepartment(u.departmentId)
        return (
          <div
            key={u.id}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100"
          >
            <Avatar src={u.avatar} name={u.name} />
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{u.name}</p>
              <p className="text-xs text-slate-500 truncate">
                {u.title} · {dept?.name}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
