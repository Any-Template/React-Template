// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT CONFIG  –  Define the structure and behaviour of the shell
// ─────────────────────────────────────────────────────────────────────────────

import type { LayoutConfig } from './types'

export const layoutConfig: LayoutConfig = {
  // ── Centring strategy ──────────────────────────────────────────────────────
  // 'centered' → max-width container, centred
  // 'wide'     → wider container with modest padding
  // 'full'     → edge-to-edge, no container
  mode: 'centered',
  maxWidth: '1280px',

  // ── Top navigation bar ─────────────────────────────────────────────────────
  navbar: {
    // 'sticky'  → stays at top while scrolling
    // 'fixed'   → always in viewport (adds body padding-top)
    // 'static'  → scrolls away with the page
    // 'hidden'  → no navbar rendered
    variant: 'sticky',
    height: '4rem',
    showLogo: true,
    showSearch: false,
    showThemeToggle: true,
    showUserMenu: true,
    blurred: true,   // backdrop-blur on navbar background
    bordered: true,  // bottom border
  },

  // ── Side navigation ────────────────────────────────────────────────────────
  sidebar: {
    // 'full'    → full-width sidebar, always visible on desktop
    // 'rail'    → icon-only rail, expands on hover
    // 'overlay' → slides over content on mobile/toggle
    // 'hidden'  → no sidebar rendered
    variant: 'hidden',
    width: '16rem',
    collapsedWidth: '4rem',
    defaultOpen: true,
    showIcons: true,
    showLabels: true,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    // 'minimal' → single-line with copyright
    // 'full'    → multi-column links + socials
    // 'hidden'  → no footer rendered
    variant: 'minimal',
    height: '4rem',
    showSocials: false,
    showLinks: true,
    showCopyright: true,
  },

  // ── Page content area ─────────────────────────────────────────────────────
  page: {
    padding: 'md',  // 'none' | 'sm' | 'md' | 'lg'
    gap: 'md',      // gap between sections/grids
  },
}
