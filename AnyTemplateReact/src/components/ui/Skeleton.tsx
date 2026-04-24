import { cn } from '@/lib/cn'
import { animationsConfig } from '@config/animations.config'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle'
  lines?: number
}

export function Skeleton({ className, variant = 'rect', lines = 1, ...props }: SkeletonProps) {
  const pulse = animationsConfig.components.skeleton.pulse
  const shimmer = animationsConfig.components.skeleton.wave

  const base = cn(
    'bg-(--color-surface-alt) rounded-(--radius-sm)',
    shimmer && 'skeleton',
    pulse && !shimmer && 'animate-pulse',
    variant === 'circle' && 'rounded-full',
    className
  )

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2" {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={cn(base, 'h-4', i === lines - 1 && 'w-3/4')} />
        ))}
      </div>
    )
  }

  return <div className={base} {...props} />
}
