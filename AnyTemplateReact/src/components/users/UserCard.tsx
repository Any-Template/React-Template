import { Mail, Phone, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { listItemVariants } from '@/lib/motion'
import { UserAvatar } from './UserAvatar'
import type { User } from '@config/api-schemas.config'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <motion.div variants={listItemVariants}>
      <Card hoverable className="h-full">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <UserAvatar name={user.name} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-(--color-text) truncate">{user.name}</p>
              {user.username && (
                <p className="text-xs text-(--color-text-muted)">@{user.username}</p>
              )}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs text-(--color-text-muted)">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-1.5 text-xs text-(--color-text-muted)">
                    <Phone className="h-3 w-3 shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-1.5 text-xs text-(--color-text-muted)">
                    <Globe className="h-3 w-3 shrink-0" />
                    <span className="truncate">{user.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
