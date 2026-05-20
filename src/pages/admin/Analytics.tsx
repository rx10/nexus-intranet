import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/shared/PageHeader'

const TREND = [
  { week: 'W1', engagement: 62, recognition: 45 },
  { week: 'W2', engagement: 68, recognition: 52 },
  { week: 'W3', engagement: 71, recognition: 58 },
  { week: 'W4', engagement: 78, recognition: 64 },
]

export function Analytics() {
  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in">
      <PageHeader
        title="Engagement Analytics"
        subtitle="Culture metrics and participation trends for HR planning."
      />
      <Card>
        <CardHeader>
          <CardTitle>Engagement index vs recognition volume</CardTitle>
        </CardHeader>
        <CardContent className="h-80 pt-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="engagement"
                name="Engagement index"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="recognition"
                name="Recognition volume"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
