import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) disabled:pointer-events-none disabled:opacity-50 select-none',
  {
    variants: {
      variant: {
        primary:     'bg-(--color-primary) text-(--color-primary-fg) hover:opacity-90',
        secondary:   'bg-(--color-surface-alt) text-(--color-text) border border-(--color-border) hover:bg-(--color-surface)',
        ghost:       'text-(--color-text) hover:bg-(--color-surface-alt)',
        outline:     'border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-(--color-primary-fg)',
        destructive: 'bg-(--color-error) text-(--color-error-fg) hover:opacity-90',
        link:        'text-(--color-primary) underline-offset-4 hover:underline p-0 h-auto',
        accent:      'bg-(--color-accent) text-(--color-accent-fg) hover:opacity-90',
      },
      size: {
        xs:   'h-7  px-2.5 text-xs  rounded-[calc(var(--radius)-2px)]',
        sm:   'h-8  px-3   text-sm  rounded-(--radius)',
        md:   'h-10 px-4   text-sm  rounded-(--radius)',
        lg:   'h-11 px-6   text-base rounded-(--radius)',
        xl:   'h-14 px-8   text-lg  rounded-(--radius)',
        icon: 'h-10 w-10          rounded-(--radius)',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)
