import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, RefreshCw } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { PostCard } from '@/components/posts/PostCard'
import { PostModal } from '@/components/posts/PostModal'
import { listContainerVariants } from '@/lib/motion'
import { useApiQuery } from '@/hooks/useApi'
import { queryKeys } from '@/lib/query-keys'
import { toast } from '@/hooks/useToast'
import type { Post } from '@config/api-schemas.config'

export function Posts() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Post | null>(null)

  const { data: posts, isLoading, error, refetch } = useApiQuery<Post[]>(
    queryKeys.posts.list(),
    'posts',
    'list',
    {},
    { staleTime: 60_000 }
  )

  const filtered = (posts as Post[] | undefined)?.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.body.toLowerCase().includes(search.toLowerCase())
  ) ?? []

  return (
    <PageWrapper title="Posts" description="Data fetched from posts.list — jsonplaceholder API.">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-50">
          <Input
            placeholder="Search posts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => { refetch(); toast('Posts refreshed', 'info') }}
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => toast('Create post — wire up useApiMutation here', 'default')}
        >
          New post
        </Button>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} animate={false}>
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton variant="text" lines={3} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <Card
          className="mt-2 border-(--color-error) bg-[color-mix(in_srgb,var(--color-error)_5%,transparent)]"
          animate={false}
        >
          <CardContent className="pt-6 text-center">
            <p className="text-(--color-error) font-medium">Failed to load posts</p>
            <p className="text-sm text-(--color-text-muted) mt-1">{error.message}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {!isLoading && !error && (
        <>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{filtered.length} posts</Badge>
            {search && <Badge variant="info">{`Filter: "${search}"`}</Badge>}
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map(post => (
              <PostCard key={post.id} post={post} onClick={setSelected} />
            ))}
          </motion.div>
        </>
      )}

      {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
    </PageWrapper>
  )
}
