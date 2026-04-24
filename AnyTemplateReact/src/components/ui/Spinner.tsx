import { cn } from '@/lib/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  label?: string
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
  xl: 'h-16 w-16 border-4',
}

export function Spinner({ size = 'md', className, label = 'Loading…' }: SpinnerProps) {
  return (
    <div role="status" className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'rounded-full border-(--color-border) border-t-(--color-primary) animate-spin',
          sizeMap[size]
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function FullPageSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-(--color-background)/80 backdrop-blur-sm z-50">
      <Spinner size="lg" />
    </div>
  )
}
