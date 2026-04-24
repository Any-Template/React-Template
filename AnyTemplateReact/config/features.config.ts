// ─────────────────────────────────────────────────────────────────────────────
// FEATURES CONFIG  –  Toggle entire capabilities on or off
// ─────────────────────────────────────────────────────────────────────────────
//
//  Every feature here is either included in the bundle (true) or tree-shaken
//  out / hidden (false). Disabling something here is always safe — nothing
//  will break, it simply won't render or initialise.
//
// ─────────────────────────────────────────────────────────────────────────────

import type { FeaturesConfig } from './types'

export const featuresConfig: FeaturesConfig = {
  // ── Developer tools ────────────────────────────────────────────────────────
  // Floating config panel showing active config + preset switcher.
  // Auto-disabled in production regardless of this setting.
  devConfigPanel: true,

  // ── UI features ───────────────────────────────────────────────────────────
  themeSwitcher: true,       // Preset selector in navbar
  darkModeToggle: true,      // Light/dark toggle button
  toasts: true,              // Global toast notification system
  globalSearch: false,       // Search bar in navbar
  breadcrumbs: true,         // Breadcrumb trail below navbar
  commandPalette: false,     // ⌘K command palette overlay
  keyboardShortcuts: false,  // Keyboard shortcut hint tooltips

  // ── Data features ─────────────────────────────────────────────────────────
  requestCache: true,        // Cache GET responses in memory
  formPersistence: false,    // Auto-save form data to sessionStorage

  // ── Infrastructure features ────────────────────────────────────────────────
  analytics: false,          // Analytics script injection
  pwa: false,                // PWA service worker + manifest
  offlineDetection: false,   // Banner when network is lost
  rtl: false,                // Right-to-left layout support
}
