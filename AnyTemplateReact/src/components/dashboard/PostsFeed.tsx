import { RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Post } from '@config/api-schemas.config'

interface PostsFeedProps {
  posts: Post[] | undefined
  isLoading: boolean
  onRefresh: () => void
}

export function PostsFeed({ posts, isLoading, onRefresh }: PostsFeedProps) {
  return (
    <Card className="lg:col-span-2" animate={false}>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>Via posts.list from api.config.ts</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onRefresh} title="Refresh">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {posts?.slice(0, 6).map(post => (
              <div
                key={post.id}
                className="flex gap-3 pb-3 border-b border-(--color-border) last:border-0 last:pb-0"
              >
                <div className="h-8 w-8 rounded-full bg-(--color-primary-100) flex items-center justify-center text-xs font-bold text-(--color-primary) shrink-0">
                  {String(post.userId)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-(--color-text) truncate">{post.title}</p>
                  <p className="text-xs text-(--color-text-muted) truncate mt-0.5">
                    {post.body.slice(0, 80)}…
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
