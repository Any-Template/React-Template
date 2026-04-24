import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <p className="text-[8rem] font-black leading-none text-gradient-primary">404</p>
          <h1 className="text-2xl font-bold mt-4 mb-2">Page not found</h1>
          <p className="text-(--color-text-muted) mb-8 max-w-sm">
            This route doesn't exist. Add it to App.tsx or check your nav links in meta.config.ts.
          </p>
          <Link to="/">
            <Button leftIcon={<Home className="h-4 w-4" />}>Back home</Button>
          </Link>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
