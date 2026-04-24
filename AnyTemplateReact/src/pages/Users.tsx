import { useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { UserCard } from '@/components/users/UserCard'
import { listContainerVariants } from '@/lib/motion'
import { useApiQuery } from '@/hooks/useApi'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/hooks/useToast'
import type { User } from '@config/api-schemas.config'

export function Users() {
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useApiQuery<User[]>(
    queryKeys.users.list(),
    'users',
    'list',
    {},
    { staleTime: 30_000 }
  )

  const users = data as User[] | undefined
  const filtered = users?.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  return (
    <PageWrapper title="Users" description="Data from users.list — configure endpoint in api.config.ts.">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-50">
          <Input
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={() => toast('Create user — wire up useApiMutation with users.create schema', 'default')}
        >
          Add user
        </Button>
      </div>

      {error && (
        <Card className="border-(--color-error)" animate={false}>
          <CardContent className="pt-6 text-center text-(--color-error)">
            {error.message}
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && (
        <Badge variant="secondary">{filtered.length} users</Badge>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading
          ? Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} animate={false}>
                <CardContent className="pt-6 flex items-center gap-3">
                  <Skeleton className="h-12 w-12" variant="circle" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          : filtered.map(user => <UserCard key={user.id} user={user} />)
        }
      </motion.div>
    </PageWrapper>
  )
}
