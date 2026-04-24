import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { metaConfig } from '@config/meta.config'

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const { pathname } = useLocation()

  return (
    <motion.div
      className="fixed inset-0 z-30 pt-(--navbar-height) md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.nav
        className="relative bg-(--color-surface) border-b border-(--color-border) p-4 flex flex-col gap-1"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
      >
        {metaConfig.navLinks.map(link => (
          <Link
            key={link.href}
            to={link.href}
            onClick={onClose}
            className={cn(
              'px-4 py-2.5 rounded-(--radius) text-sm font-medium transition-colors',
              pathname === link.href
                ? 'bg-(--color-primary) text-(--color-primary-fg)'
                : 'text-(--color-text) hover:bg-(--color-surface-alt)'
            )}
          >
            {link.label}
          </Link>
        ))}
      </motion.nav>
    </motion.div>
  )
}
