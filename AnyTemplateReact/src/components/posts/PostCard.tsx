import { User, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { listItemVariants } from '@/lib/motion'
import type { Post } from '@config/api-schemas.config'

interface PostCardProps {
  post: Post
  onClick: (post: Post) => void
}

export function PostCard({ post, onClick }: PostCardProps) {
  return (
    <motion.div variants={listItemVariants}>
      <Card hoverable className="h-full cursor-pointer" onClick={() => onClick(post)}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 w-6 rounded-full bg-(--color-primary-100) flex items-center justify-center">
              <User className="h-3 w-3 text-(--color-primary)" />
            </div>
            <span className="text-xs text-(--color-text-muted)">User {post.userId}</span>
            <Badge variant="secondary" size="sm" className="ml-auto">#{post.id}</Badge>
          </div>
          <CardTitle className="text-sm leading-tight line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-(--color-text-muted) line-clamp-3">{post.body}</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-(--color-text-muted)">
            <MessageCircle className="h-3 w-3" />
            <span>View comments</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
