import { GitFork, MessageSquare, Briefcase, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { layoutConfig } from '@config/layout.config'
import { metaConfig } from '@config/meta.config'
import { cn } from '@/lib/cn'

const socialIcons: Record<string, React.ReactNode> = {
  github:   <GitFork className="h-4 w-4" />,
  twitter:  <MessageSquare className="h-4 w-4" />,
  linkedin: <Briefcase className="h-4 w-4" />,
}

export function Footer() {
  const { footer } = layoutConfig
  if (footer.variant === 'hidden') return null

  const year = new Date().getFullYear()

  if (footer.variant === 'minimal') {
    return (
      <footer
        className="border-t border-(--color-border) bg-(--color-surface)"
        style={{ minHeight: footer.height }}
      >
        <div
          className="mx-auto flex items-center justify-between px-6 py-4 flex-wrap gap-4"
          style={{ maxWidth: layoutConfig.maxWidth }}
        >
          {footer.showCopyright && (
            <p className="text-xs text-(--color-text-muted)">
              © {year} {metaConfig.author}.
              {metaConfig.showVersion && (
                <span className="ml-2 opacity-60">v{metaConfig.appVersion}</span>
              )}
            </p>
          )}
          {footer.showLinks && (
            <nav className="flex items-center gap-4">
              {metaConfig.navLinks.slice(0, 4).map(l => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-xs text-(--color-text-muted) hover:text-(--color-text) transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          )}
          {footer.showSocials && (
            <div className="flex items-center gap-2">
              {metaConfig.socialLinks.map(s => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-(--color-text-muted) hover:text-(--color-text) transition-colors"
                  aria-label={s.platform}
                >
                  {socialIcons[s.platform] ?? <ExternalLink className="h-4 w-4" />}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    )
  }

  // full variant
  return (
    <footer className="border-t border-(--color-border) bg-(--color-surface) mt-auto">
      <div
        className="mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        style={{ maxWidth: layoutConfig.maxWidth }}
      >
        <div>
          <p className="font-bold text-lg text-gradient-primary mb-2">{metaConfig.appName}</p>
          <p className="text-sm text-(--color-text-muted)">{metaConfig.appDescription}</p>
        </div>
        {footer.showLinks && (
          <div>
            <p className="font-semibold text-sm mb-3">Navigation</p>
            <nav className="flex flex-col gap-2">
              {metaConfig.navLinks.map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-(--color-text-muted) hover:text-(--color-primary) transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
        {footer.showSocials && (
          <div>
            <p className="font-semibold text-sm mb-3">Connect</p>
            <div className="flex gap-3">
              {metaConfig.socialLinks.map(s => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'p-2 rounded-(--radius) border border-(--color-border)',
                    'text-(--color-text-muted) hover:text-(--color-primary)',
                    'hover:border-(--color-primary) transition-colors'
                  )}
                  aria-label={s.platform}
                >
                  {socialIcons[s.platform] ?? <ExternalLink className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      {footer.showCopyright && (
        <div className="border-t border-(--color-border) px-6 py-4">
          <p className="text-xs text-center text-(--color-text-muted)">
            © {year} {metaConfig.author}. All rights reserved.
            {metaConfig.showVersion && ` v${metaConfig.appVersion}`}
          </p>
        </div>
      )}
    </footer>
  )
}
