import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/cn'
import { cardVariants, cardHover } from '@/lib/motion'
import { themeConfig } from '@config/theme.config'
import { animationsConfig } from '@config/animations.config'

const shadowMap = {
  none: '',
  sm:   'shadow-sm',
  md:   'shadow-md',
  lg:   'shadow-lg',
  xl:   'shadow-xl',
}

const radiusMap = {
  none: 'rounded-none',
  sm:   'rounded-sm',
  md:   'rounded-md',
  lg:   'rounded-lg',
  xl:   'rounded-xl',
  full: 'rounded-full',
}

type CardProps = HTMLMotionProps<'div'> & {
  animate?: boolean
  hoverable?: boolean
  glass?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, animate = true, hoverable = false, glass, children, ...props }, ref) => {
    const { shadow, rounded, border, glass: configGlass } = themeConfig.components.card
    const useGlass = glass ?? configGlass
    const shouldAnimate = animate && animationsConfig.enabled && animationsConfig.components.cards.entrance

    return (
      <motion.div
        ref={ref}
        className={cn(
          'bg-(--color-surface) text-(--color-text) transition-shadow duration-200',
          shadowMap[shadow],
          radiusMap[rounded],
          border && 'border border-(--color-border)',
          useGlass && 'glass',
          className
        )}
        variants={shouldAnimate ? cardVariants : undefined}
        initial={shouldAnimate ? 'hidden' : undefined}
        animate={shouldAnimate ? 'visible' : undefined}
        whileHover={hoverable ? cardHover : undefined}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight text-lg', className)} {...props} />
  )
)

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-(--color-text-muted)', className)} {...props} />
  )
)

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)

Card.displayName             = 'Card'
CardHeader.displayName       = 'CardHeader'
CardTitle.displayName        = 'CardTitle'
CardDescription.displayName  = 'CardDescription'
CardContent.displayName      = 'CardContent'
CardFooter.displayName       = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
