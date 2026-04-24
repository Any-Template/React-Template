import { cva } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors',
  {
    variants: {
      variant: {
        default:     'bg-(--color-primary) text-(--color-primary-fg)',
        secondary:   'bg-(--color-surface-alt) text-(--color-text-secondary) border border-(--color-border)',
        outline:     'border border-(--color-primary) text-(--color-primary)',
        success:     'bg-(--color-success) text-(--color-success-fg)',
        warning:     'bg-(--color-warning) text-(--color-warning-fg)',
        error:       'bg-(--color-error) text-(--color-error-fg)',
        info:        'bg-(--color-info) text-(--color-info-fg)',
        ghost:       'bg-transparent text-(--color-text-muted)',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs rounded-[calc(var(--radius)-4px)]',
        md: 'px-2.5 py-0.5 text-xs rounded-(--radius)',
        lg: 'px-3   py-1   text-sm rounded-(--radius)',
      },
      pill: {
        true:  'rounded-full',
        false: '',
      },
    },
    defaultVariants: { variant: 'default', size: 'md', pill: false },
  }
)
