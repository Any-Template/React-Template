import { presets } from '@config/presets'
import { themeConfig } from '@config/theme.config'
import type { PresetName, PresetDefinition } from '@config/types'

function setVar(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}

function injectPreset(preset: PresetDefinition) {
  const el = document.documentElement
  const c = preset.colors

  // Primary scale
  setVar('--color-primary',     c.primary.DEFAULT)
  setVar('--color-primary-fg',  c.primary.foreground)
  setVar('--color-primary-50',  c.primary[50])
  setVar('--color-primary-100', c.primary[100])
  setVar('--color-primary-200', c.primary[200])
  setVar('--color-primary-300', c.primary[300])
  setVar('--color-primary-400', c.primary[400])
  setVar('--color-primary-500', c.primary[500])
  setVar('--color-primary-600', c.primary[600])
  setVar('--color-primary-700', c.primary[700])
  setVar('--color-primary-800', c.primary[800])
  setVar('--color-primary-900', c.primary[900])
  setVar('--color-primary-950', c.primary[950])

  // Secondary + accent
  setVar('--color-secondary',    c.secondary.DEFAULT)
  setVar('--color-secondary-fg', c.secondary.foreground)
  setVar('--color-accent',       c.accent.DEFAULT)
  setVar('--color-accent-fg',    c.accent.foreground)

  // Surfaces
  setVar('--color-background',  c.background)
  setVar('--color-surface',     c.surface)
  setVar('--color-surface-alt', c['surface-alt'])

  // Borders
  setVar('--color-border',        c.border)
  setVar('--color-border-strong', c['border-strong'])

  // Text
  setVar('--color-text',           c.text)
  setVar('--color-text-secondary', c['text-secondary'])
  setVar('--color-text-muted',     c['text-muted'])
  setVar('--color-text-inverse',   c['text-inverse'])

  // Status
  setVar('--color-success',    c.status.success)
  setVar('--color-success-fg', c.status['success-foreground'])
  setVar('--color-warning',    c.status.warning)
  setVar('--color-warning-fg', c.status['warning-foreground'])
  setVar('--color-error',      c.status.error)
  setVar('--color-error-fg',   c.status['error-foreground'])
  setVar('--color-info',       c.status.info)
  setVar('--color-info-fg',    c.status['info-foreground'])

  // Shape + font
  setVar('--radius',     preset.radius)
  setVar('--font-sans',  preset.fonts.sans)
  setVar('--font-mono',  preset.fonts.mono)

  // Data attributes for CSS-in-CSS targeting
  el.setAttribute('data-preset', preset.name.toLowerCase())
  if (preset.glassEffect) el.setAttribute('data-glass', 'true')
  else el.removeAttribute('data-glass')
}

function applyDarkClass(isDark: boolean) {
  if (isDark) document.documentElement.classList.add('dark')
  else document.documentElement.classList.remove('dark')
}

function applySpeedVar(speed: string) {
  const multiplier = speed === 'slow' ? '1.5' : speed === 'fast' ? '0.6' : '1'
  setVar('--speed', multiplier)
}

export function applyTheme(presetName: PresetName, isDark?: boolean) {
  const preset = presets[presetName]
  const dark = isDark ?? preset.isDark

  injectPreset(preset)
  applyDarkClass(dark)

  // Apply overrides from theme.config
  const { overrides } = themeConfig
  if (overrides.primaryColor) setVar('--color-primary', overrides.primaryColor)
  if (overrides.radius)       setVar('--radius', overrides.radius)
  if (overrides.fontSans)     setVar('--font-sans', overrides.fontSans)
  if (overrides.fontMono)     setVar('--font-mono', overrides.fontMono)
}

export function initTheme() {
  // Load saved preset from localStorage, fallback to config
  const saved = localStorage.getItem('preset') as PresetName | null
  const savedDark = localStorage.getItem('darkMode')
  const presetName = saved ?? themeConfig.preset
  const isDark = savedDark !== null ? savedDark === 'true' : presets[presetName].isDark

  applyTheme(presetName, isDark)
  applySpeedVar(
    (localStorage.getItem('animSpeed') as string | null) ?? 'normal'
  )
}

export function savePreset(presetName: PresetName, isDark: boolean) {
  localStorage.setItem('preset', presetName)
  localStorage.setItem('darkMode', String(isDark))
  applyTheme(presetName, isDark)
}
