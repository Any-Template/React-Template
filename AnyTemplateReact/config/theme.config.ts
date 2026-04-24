// ─────────────────────────────────────────────────────────────────────────────
// THEME CONFIG  –  Edit this file to control visual style
// ─────────────────────────────────────────────────────────────────────────────
//
//  QUICK START:
//    1. Set `preset` to one of: 'minimal' | 'dark' | 'glass' | 'corporate' | 'neon' | 'pastel' | 'sunset'
//    2. Optionally override specific values in `overrides`
//    3. Adjust `components` for per-component defaults
//
// ─────────────────────────────────────────────────────────────────────────────

import type { ThemeConfig } from './types'

export const themeConfig: ThemeConfig = {
  // ── Preset base ────────────────────────────────────────────────────────────
  // All colors, fonts, radius and shadow-style come from the preset.
  // Override individual values below without touching the preset.
  preset: 'minimal',

  // ── Dark mode strategy ─────────────────────────────────────────────────────
  // 'class'    → toggled via <html class="dark">
  // 'media'    → follows OS preference automatically
  // 'disabled' → always light
  darkMode: 'class',

  // ── Overrides ──────────────────────────────────────────────────────────────
  // Each key replaces the preset default. Leave empty ({}) to use preset as-is.
  overrides: {
    // primaryColor: '#6366f1',      // Custom primary HEX (replaces preset primary.DEFAULT)
    // radius: '0.75rem',            // Custom base border-radius
    // fontSans: "'Geist', system-ui, sans-serif",
    // fontMono: "'Geist Mono', monospace",
    // shadowStyle: 'elevated',      // 'flat' | 'elevated' | 'glow'
  },

  // ── Typography ─────────────────────────────────────────────────────────────
  typography: {
    // 'compact' = tighter line-heights and letter-spacing
    // 'default' = comfortable reading rhythm
    // 'loose'   = airy, editorial feel
    scale: 'default',

    // Font names — use 'system' for the OS default, or any Google Font name.
    // If using a Google Font, add the @import to src/styles/globals.css.
    headingFont: 'system',
    bodyFont: 'system',
    monoFont: 'system',
  },

  // ── Per-component defaults ─────────────────────────────────────────────────
  components: {
    card: {
      shadow: 'md',    // 'none' | 'sm' | 'md' | 'lg' | 'xl'
      rounded: 'lg',   // 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
      border: true,    // Show card border
      glass: false,    // Glassmorphism card (requires glass preset or glassEffect)
    },
    button: {
      rounded: 'md',
      shadow: false,
      uppercase: false,
    },
    input: {
      rounded: 'md',
      variant: 'outlined', // 'outlined' | 'filled' | 'underline'
    },
    badge: {
      rounded: 'full',
    },
  },
}
