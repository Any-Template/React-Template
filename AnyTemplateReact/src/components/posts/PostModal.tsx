import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { toast } from '@/hooks/useToast'
import type { Post } from '@config/api-schemas.config'

interface PostModalProps {
  post: Post | null
  onClose: () => void
}

export function PostModal({ post, onClose }: PostModalProps) {
  if (!post) return null

  return (
    <Modal open onClose={onClose} title={post.title} size="lg">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-(--color-text-muted)">
          <Badge variant="secondary">User {post.userId}</Badge>
          <Badge variant="outline">Post #{post.id}</Badge>
        </div>
        <p className="text-(--color-text) leading-relaxed">{post.body}</p>
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            onClick={() => { toast(`Editing post #${post.id}`, 'info'); onClose() }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => { toast(`Deleted post #${post.id}`, 'error'); onClose() }}
          >
            Delete
          </Button>
          <Button size="sm" variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}
