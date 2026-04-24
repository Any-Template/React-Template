// ─────────────────────────────────────────────────────────────────────────────
// ANIMATIONS CONFIG  –  Toggle and tune every motion in the app
// ─────────────────────────────────────────────────────────────────────────────
//
//  Set `enabled: false` at the top level to kill ALL motion everywhere.
//  Set individual component toggles to control specific interactions.
//
// ─────────────────────────────────────────────────────────────────────────────

import type { AnimationsConfig } from './types'

export const animationsConfig: AnimationsConfig = {
  // ── Master switch ──────────────────────────────────────────────────────────
  enabled: true,

  // ── Reduced-motion handling ────────────────────────────────────────────────
  // 'respect-system' → checks prefers-reduced-motion media query
  // 'never'          → always animate, even when user prefers reduced motion
  // 'always'         → always disable animations
  reducedMotion: 'respect-system',

  // ── Global speed multiplier ────────────────────────────────────────────────
  // 'slow' = 1.5× durations, 'normal' = 1×, 'fast' = 0.6×
  speed: 'normal',

  // ── Page transitions ───────────────────────────────────────────────────────
  pageTransitions: {
    enabled: true,
    // 'fade' | 'slide' | 'scale' | 'blur' | 'none'
    type: 'fade',
    duration: 0.25,
  },

  // ── Per-component motion ───────────────────────────────────────────────────
  components: {
    buttons: {
      hover: true,  // Slight scale up on hover
      tap: true,    // Scale down on click
    },
    cards: {
      hover: true,     // Lift (shadow + translate) on hover
      entrance: true,  // Fade+slide in when card mounts
      stagger: true,   // Stagger entrance when multiple cards render
    },
    modals: {
      enabled: true,
      type: 'scale',  // 'scale' | 'slide' | 'fade'
    },
    lists: {
      stagger: true,        // Each list item enters with a delay offset
      entrance: true,       // List items fade+slide in on mount
      staggerDelay: 0.05,   // Seconds between each item's entrance
    },
    navbar: {
      scrollShrink: true,  // Navbar shrinks slightly on scroll
    },
    toast: {
      type: 'slide',  // 'slide' | 'bounce' | 'fade'
    },
    skeleton: {
      pulse: true,  // Pulse animation on skeleton loaders
      wave: false,  // Shimmer wave animation (more CPU-intensive)
    },
  },

  // ── Scroll-triggered animations ────────────────────────────────────────────
  scrollAnimations: {
    enabled: true,
    // Fraction of element visible before animation triggers (0 = top edge, 1 = fully visible)
    threshold: 0.1,
  },
}
