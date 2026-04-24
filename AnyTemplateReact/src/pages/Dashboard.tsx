import { TrendingUp, Users, FileText, Activity, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { StatCard } from '@/components/dashboard/StatCard'
import { PostsFeed } from '@/components/dashboard/PostsFeed'
import { UsersPanel } from '@/components/dashboard/UsersPanel'
import { listContainerVariants, listItemVariants } from '@/lib/motion'
import { useApiQuery } from '@/hooks/useApi'
import { queryKeys } from '@/lib/query-keys'
import type { Post, User } from '@config/api-schemas.config'
import { toast } from '@/hooks/useToast'

const stats = [
  { label: 'Total Users',  icon: <Users className="h-4 w-4" />,     value: '2,847',  delta: '+12%',  color: 'text-(--color-primary)',  bg: 'bg-(--color-primary-100)' },
  { label: 'Posts',        icon: <FileText className="h-4 w-4" />,   value: '14,231', delta: '+8%',   color: 'text-(--color-info)',     bg: 'bg-[color-mix(in_srgb,var(--color-info)_15%,transparent)]' },
  { label: 'Active Today', icon: <Activity className="h-4 w-4" />,   value: '1,024',  delta: '+23%',  color: 'text-(--color-success)',  bg: 'bg-[color-mix(in_srgb,var(--color-success)_15%,transparent)]' },
  { label: 'Revenue',      icon: <TrendingUp className="h-4 w-4" />, value: '$94.2k', delta: '+5.4%', color: 'text-(--color-accent)',   bg: 'bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)]' },
]

export function Dashboard() {
  const { data: posts, isLoading: postsLoading, refetch: refetchPosts } = useApiQuery<Post[]>(
    queryKeys.posts.list(),
    'posts',
    'list',
    {},
    { staleTime: 60_000 }
  )

  const { data: users, isLoading: usersLoading } = useApiQuery<User[]>(
    queryKeys.users.list(),
    'users',
    'list',
    {},
    { staleTime: 30_000 }
  )

  const handleRefresh = async () => {
    await refetchPosts()
    toast('Data refreshed', 'success')
  }

  return (
    <PageWrapper title="Dashboard" description="Live data from the configured API endpoint.">
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map(s => (
          <motion.div key={s.label} variants={listItemVariants}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <PostsFeed
          posts={posts as Post[] | undefined}
          isLoading={postsLoading}
          onRefresh={handleRefresh}
        />
        <UsersPanel
          users={users as User[] | undefined}
          isLoading={usersLoading}
        />
      </div>

      <Card animate={false} className="mt-4">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-(--color-primary)" />
            <CardTitle>Analytics</CardTitle>
          </div>
          <CardDescription>Plug in your chart library here (Recharts, Victory, Chart.js…)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-end gap-2 px-4">
            {[40, 65, 45, 80, 55, 90, 72, 85, 60, 95, 70, 88].map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-(--color-primary) rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-(--color-text-muted) mt-2 px-4">
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}
