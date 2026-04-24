import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { layoutConfig } from '@config/layout.config'
import { metaConfig } from '@config/meta.config'
import { animationsConfig } from '@config/animations.config'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/features/ThemeToggle'
import { useFeature } from '@/hooks/useFeature'
import { MobileMenu } from './MobileMenu'

function NavbarContent() {
  const { navbar } = layoutConfig
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const showThemeToggle = useFeature('themeSwitcher')

  useEffect(() => {
    if (!animationsConfig.components.navbar.scrollShrink) return
    const handler = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change without a state-in-effect pattern
  const currentPath = location.pathname
  const [menuOpenForPath, setMenuOpenForPath] = useState(currentPath)
  const isMobileOpen = mobileOpen && menuOpenForPath === currentPath

  const openMobile = () => {
    setMenuOpenForPath(currentPath)
    setMobileOpen(true)
  }
  const closeMobile = () => setMobileOpen(false)

  const isFixed  = navbar.variant === 'fixed'
  const isSticky = navbar.variant === 'sticky'

  return (
    <>
      <motion.header
        className={cn(
          'top-0 left-0 right-0 z-40 transition-all duration-300',
          isFixed  && 'fixed',
          isSticky && 'sticky',
          navbar.blurred  && 'backdrop-blur-md',
          navbar.bordered && 'border-b border-(--color-border)',
          scrolled
            ? 'bg-(--color-surface)/95 shadow-sm'
            : 'bg-(--color-surface)/80'
        )}
        style={{ height: navbar.height }}
        animate={
          animationsConfig.components.navbar.scrollShrink
            ? { height: scrolled ? '3.25rem' : navbar.height }
            : undefined
        }
        transition={{ duration: 0.2 }}
      >
        <div
          className="mx-auto flex h-full items-center justify-between px-4 sm:px-6"
          style={{ maxWidth: layoutConfig.maxWidth }}
        >
          {navbar.showLogo && (
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-lg text-(--color-text) shrink-0"
            >
              <span className="text-gradient-primary">{metaConfig.appName}</span>
            </Link>
          )}

          <nav className="hidden md:flex items-center gap-1">
            {metaConfig.navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-(--radius) text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'bg-(--color-primary-100) text-(--color-primary)'
                    : 'text-(--color-text-secondary) hover:text-(--color-text) hover:bg-(--color-surface-alt)'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {showThemeToggle && <ThemeToggle compact />}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={isMobileOpen ? closeMobile : openMobile}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && <MobileMenu onClose={closeMobile} />}
      </AnimatePresence>
    </>
  )
}

export function Navbar() {
  if (layoutConfig.navbar.variant === 'hidden') return null
  return <NavbarContent />
}
