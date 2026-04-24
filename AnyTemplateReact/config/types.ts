// ─────────────────────────────────────────────────────────────────────────────
// CONFIG TYPES  –  The shape of every knob you can turn
// ─────────────────────────────────────────────────────────────────────────────

export type PresetName =
  | 'minimal'
  | 'dark'
  | 'glass'
  | 'corporate'
  | 'neon'
  | 'pastel'
  | 'sunset'

export type AnimationSpeed = 'slow' | 'normal' | 'fast'
export type PageTransitionType = 'fade' | 'slide' | 'scale' | 'blur' | 'none'
export type ComponentRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ShadowLevel = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type AuthType = 'bearer' | 'apikey' | 'basic' | 'none'
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type DarkMode = 'class' | 'media' | 'disabled'
export type TypographyScale = 'compact' | 'default' | 'loose'
export type NavbarVariant = 'sticky' | 'fixed' | 'static' | 'hidden'
export type SidebarVariant = 'full' | 'rail' | 'overlay' | 'hidden'
export type FooterVariant = 'minimal' | 'full' | 'hidden'
export type LayoutMode = 'centered' | 'wide' | 'full'
export type ShadowStyle = 'flat' | 'elevated' | 'glow'

// ─── Color Scales ─────────────────────────────────────────────────────────────

export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
  DEFAULT: string
  foreground: string
}

export interface StatusColors {
  success: string
  'success-foreground': string
  warning: string
  'warning-foreground': string
  error: string
  'error-foreground': string
  info: string
  'info-foreground': string
}

export interface PresetColors {
  primary: ColorScale
  secondary: ColorScale
  accent: ColorScale
  background: string
  surface: string
  'surface-alt': string
  border: string
  'border-strong': string
  text: string
  'text-secondary': string
  'text-muted': string
  'text-inverse': string
  status: StatusColors
}

// ─── Preset Definition ────────────────────────────────────────────────────────

export interface PresetDefinition {
  name: string
  description: string
  isDark: boolean
  colors: PresetColors
  fonts: {
    sans: string
    mono: string
  }
  /** Base border-radius in rem, e.g. "0.5rem" */
  radius: string
  shadowStyle: ShadowStyle
  /** Enables backdrop-blur effects on cards/navbars */
  glassEffect: boolean
}

// ─── Theme Config ─────────────────────────────────────────────────────────────

export interface ThemeConfig {
  /** Which preset to use as base */
  preset: PresetName
  /** Dark mode strategy */
  darkMode: DarkMode
  /** Per-field overrides on top of the preset */
  overrides: Partial<{
    primaryColor: string
    radius: string
    fontSans: string
    fontMono: string
    shadowStyle: ShadowStyle
  }>
  typography: {
    scale: TypographyScale
    /** Custom Google Font name or 'system' */
    headingFont: string
    bodyFont: string
    monoFont: string
  }
  components: {
    card: {
      shadow: ShadowLevel
      rounded: ComponentRadius
      border: boolean
      glass: boolean
    }
    button: {
      rounded: ComponentRadius
      shadow: boolean
      uppercase: boolean
    }
    input: {
      rounded: ComponentRadius
      variant: 'outlined' | 'filled' | 'underline'
    }
    badge: {
      rounded: ComponentRadius
    }
  }
}

// ─── Animation Config ─────────────────────────────────────────────────────────

export interface AnimationsConfig {
  /** Master switch – disabling this kills ALL motion */
  enabled: boolean
  /** 'respect-system' honours prefers-reduced-motion */
  reducedMotion: 'always' | 'never' | 'respect-system'
  speed: AnimationSpeed
  pageTransitions: {
    enabled: boolean
    type: PageTransitionType
    duration: number // seconds
  }
  components: {
    buttons: { hover: boolean; tap: boolean }
    cards: { hover: boolean; entrance: boolean; stagger: boolean }
    modals: { enabled: boolean; type: 'scale' | 'slide' | 'fade' }
    lists: { stagger: boolean; entrance: boolean; staggerDelay: number }
    navbar: { scrollShrink: boolean }
    toast: { type: 'slide' | 'bounce' | 'fade' }
    skeleton: { pulse: boolean; wave: boolean }
  }
  scrollAnimations: {
    enabled: boolean
    threshold: number // 0–1, when element enters viewport
  }
}

// ─── Layout Config ────────────────────────────────────────────────────────────

export interface LayoutConfig {
  mode: LayoutMode
  maxWidth: string // e.g. '1280px'
  navbar: {
    variant: NavbarVariant
    height: string
    showLogo: boolean
    showSearch: boolean
    showThemeToggle: boolean
    showUserMenu: boolean
    blurred: boolean
    bordered: boolean
  }
  sidebar: {
    variant: SidebarVariant
    width: string
    collapsedWidth: string
    defaultOpen: boolean
    showIcons: boolean
    showLabels: boolean
  }
  footer: {
    variant: FooterVariant
    height: string
    showSocials: boolean
    showLinks: boolean
    showCopyright: boolean
  }
  page: {
    padding: 'none' | 'sm' | 'md' | 'lg'
    gap: 'none' | 'sm' | 'md' | 'lg'
  }
}

// ─── Feature Flags ────────────────────────────────────────────────────────────

export interface FeaturesConfig {
  /** Show the floating dev config panel */
  devConfigPanel: boolean
  /** Show theme switcher in navbar */
  themeSwitcher: boolean
  /** Toast notification system */
  toasts: boolean
  /** Search bar in navbar */
  globalSearch: boolean
  /** Dark mode toggle */
  darkModeToggle: boolean
  /** Breadcrumb navigation */
  breadcrumbs: boolean
  /** Command palette (⌘K) */
  commandPalette: boolean
  /** Analytics tracking */
  analytics: boolean
  /** Progressive Web App manifest */
  pwa: boolean
  /** Right-to-left support */
  rtl: boolean
  /** Keyboard shortcut hints */
  keyboardShortcuts: boolean
  /** Auto-save form state */
  formPersistence: boolean
  /** Request caching */
  requestCache: boolean
  /** Offline detection banner */
  offlineDetection: boolean
}

// ─── API Config ───────────────────────────────────────────────────────────────

export interface EndpointDefinition {
  method: HttpMethod
  path: string
  /** Whether this endpoint requires auth headers */
  authenticated: boolean
  /** Override timeout for this specific endpoint */
  timeout?: number
  /** Cache response for N milliseconds (0 = no cache) */
  cache?: number
  /** Human-readable description */
  description?: string
}

export interface EndpointGroup {
  [endpointName: string]: EndpointDefinition
}

export interface ApiConfig {
  baseUrl: string
  version: string
  /** ms before request times out */
  timeout: number
  auth: {
    type: AuthType
    /** Header name for token (e.g. 'Authorization') */
    headerName: string
    /** Prefix for token value (e.g. 'Bearer') */
    tokenPrefix: string
    /** localStorage key where the token is stored */
    storageKey: string
  }
  /** Headers sent with every request */
  defaultHeaders: Record<string, string>
  endpoints: Record<string, EndpointGroup>
  /** Retry failed requests N times (0 = no retry) */
  retries: number
  /** Log requests to console in dev mode */
  devLogging: boolean
}

// ─── API Schemas Config ───────────────────────────────────────────────────────

import type { ZodTypeAny } from 'zod'

export interface SchemaGroup {
  [endpointName: string]: {
    /** Zod schema for the request body */
    request?: ZodTypeAny
    /** Zod schema for the response body */
    response?: ZodTypeAny
  }
}

export type ApiSchemasConfig = Record<string, SchemaGroup>

// ─── Meta Config ─────────────────────────────────────────────────────────────

export interface MetaConfig {
  appName: string
  appDescription: string
  appVersion: string
  /** Path to favicon in /public */
  favicon: string
  /** OG image for social sharing */
  ogImage: string
  /** Show version badge in footer */
  showVersion: boolean
  /** Copyright holder name */
  author: string
  /** e.g. 'en' | 'hu' | 'de' */
  defaultLocale: string
  /** Navigation links rendered in Navbar + Footer */
  navLinks: Array<{ label: string; href: string; icon?: string }>
  /** Social links rendered in Footer */
  socialLinks: Array<{ platform: string; href: string }>
}

// ─── Aggregated Config ────────────────────────────────────────────────────────

export interface AppConfig {
  theme: ThemeConfig
  animations: AnimationsConfig
  layout: LayoutConfig
  features: FeaturesConfig
  api: ApiConfig
  schemas: ApiSchemasConfig
  meta: MetaConfig
}
