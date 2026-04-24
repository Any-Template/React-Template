// ─────────────────────────────────────────────────────────────────────────────
// META CONFIG  –  App identity, navigation links, and social presence
// ─────────────────────────────────────────────────────────────────────────────

import type { MetaConfig } from './types'

export const metaConfig: MetaConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  appName:        'AnyTemplate',
  appDescription: 'A fully config-driven React frontend template.',
  appVersion:     '1.0.0',
  favicon:        '/favicon.ico',
  ogImage:        '/og-image.png',
  showVersion:    true,
  author:         'Your Name',
  defaultLocale:  'en',

  // ── Navigation ────────────────────────────────────────────────────────────
  navLinks: [
    { label: 'Home',      href: '/',          icon: 'Home' },
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Posts',     href: '/posts',     icon: 'FileText' },
    { label: 'Users',     href: '/users',     icon: 'Users' },
  ],

  // ── Social links ──────────────────────────────────────────────────────────
  socialLinks: [
    { platform: 'github',   href: 'https://github.com' },
    { platform: 'twitter',  href: 'https://twitter.com' },
    { platform: 'linkedin', href: 'https://linkedin.com' },
  ],
}
