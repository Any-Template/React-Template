import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export interface StatCardProps {
  label: string
  icon: React.ReactNode
  value: string
  delta: string
  color: string
  bg: string
}

export function StatCard({ label, icon, value, delta, color, bg }: StatCardProps) {
  return (
    <Card hoverable>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-(--radius) ${bg} ${color}`}>{icon}</div>
          <Badge variant="success" pill size="sm">{delta}</Badge>
        </div>
        <p className="text-2xl font-bold text-(--color-text)">{value}</p>
        <p className="text-sm text-(--color-text-muted) mt-0.5">{label}</p>
      </CardContent>
    </Card>
  )
}
