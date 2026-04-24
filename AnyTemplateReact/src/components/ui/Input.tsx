import { forwardRef } from 'react'
import { cn } from '@/lib/cn'
import { themeConfig } from '@config/theme.config'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantStyles = {
  outlined:  'border border-(--color-border) bg-(--color-surface) focus:border-(--color-primary)',
  filled:    'border border-transparent bg-(--color-surface-alt) focus:bg-(--color-surface) focus:border-(--color-primary)',
  underline: 'border-b border-(--color-border) rounded-none bg-transparent focus:border-(--color-primary) px-0',
}

const radiusMap = {
  none: 'rounded-none',
  sm:   'rounded-sm',
  md:   'rounded-md',
  lg:   'rounded-lg',
  xl:   'rounded-xl',
  full: 'rounded-full',
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const { variant, rounded } = themeConfig.components.input
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-(--color-text)"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-(--color-text-muted) pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-10 px-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted)',
              'outline-none transition-colors duration-150',
              variantStyles[variant],
              radiusMap[rounded],
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-(--color-error) focus:border-(--color-error)',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-(--color-text-muted) pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-(--color-error)">{error}</p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-(--color-text-muted)">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export { Input }
