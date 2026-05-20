import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { footprints, findDepartment, findVertical } from '@/data/seed'
import { filterByTenant } from '@/lib/selectors'

export function Footprints() {
  const me = useCurrentUser()
  const visible = filterByTenant(footprints, me)

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Impact Footprints"
        subtitle="Department and vertical impact — breaking silos with visible outcomes."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((fp) => {
          const dept = findDepartment(fp.departmentId)
          const vert = findVertical(fp.verticalId)
          return (
            <Card key={fp.id} className="overflow-hidden" interactive>
              <div className="h-1.5" style={{ background: dept?.color ?? '#6366f1' }} />
              <CardHeader>
                <Badge>{fp.quarter}</Badge>
                <CardTitle className="mt-2 text-lg">{fp.teamName}</CardTitle>
                <p className="text-xs text-slate-500">
                  {vert?.name} · {dept?.name}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-slate-600">{fp.impact}</p>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {fp.metrics.map((m) => (
                    <div key={m.label} className="text-center p-2 rounded-lg bg-slate-50">
                      <p className="text-lg font-bold text-brand-700">{m.value}</p>
                      <p className="text-xs text-slate-500">{m.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
