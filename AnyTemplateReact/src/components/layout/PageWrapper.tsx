import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { pageVariants, pageTransition } from '@/lib/motion'
import { layoutConfig } from '@config/layout.config'
import { animationsConfig } from '@config/animations.config'

const paddingMap = {
  none: '',
  sm:   'py-4 px-4',
  md:   'py-8 px-4 sm:px-6',
  lg:   'py-12 px-6 sm:px-8',
}

const gapMap = {
  none: '',
  sm:   'space-y-4',
  md:   'space-y-8',
  lg:   'space-y-12',
}

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  /** Override padding from config */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  title?: string
  description?: string
}

export function PageWrapper({ children, className, fullWidth, padding, title, description }: PageWrapperProps) {
  const { mode, maxWidth, page } = layoutConfig
  const usePadding = padding ?? page.padding
  const isCenter = mode === 'centered' && !fullWidth

  const inner = (
    <div className={cn(paddingMap[usePadding], gapMap[page.gap], className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && <h1 className="text-3xl font-bold text-(--color-text)">{title}</h1>}
          {description && <p className="mt-1 text-(--color-text-muted)">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )

  const content = isCenter ? (
    <div className="mx-auto w-full" style={{ maxWidth }}>
      {inner}
    </div>
  ) : inner

  if (!animationsConfig.enabled || !animationsConfig.pageTransitions.enabled) {
    return <main className="flex-1">{content}</main>
  }

  return (
    <motion.main
      className="flex-1"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {content}
    </motion.main>
  )
}
