import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import type { User } from '@config/api-schemas.config'

interface UsersPanelProps {
  users: User[] | undefined
  isLoading: boolean
}

export function UsersPanel({ users, isLoading }: UsersPanelProps) {
  return (
    <Card animate={false}>
      <CardHeader className="pb-2">
        <CardTitle>Users</CardTitle>
        <CardDescription>Via users.list endpoint</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" variant="circle" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2.5 w-32" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {users?.slice(0, 8).map(user => (
              <div key={user.id} className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-gradient-brand flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {user.name?.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-(--color-text) truncate">{user.name}</p>
                  <p className="text-xs text-(--color-text-muted) truncate">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
