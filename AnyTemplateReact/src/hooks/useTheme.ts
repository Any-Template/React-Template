import { useState, useCallback } from 'react'
import { savePreset } from '@/lib/theme-injector'
import { presets } from '@config/presets'
import { themeConfig } from '@config/theme.config'
import type { PresetName } from '@config/types'

export function useTheme() {
  const [preset, setPreset] = useState<PresetName>(
    () => (localStorage.getItem('preset') as PresetName | null) ?? themeConfig.preset
  )
  const [isDark, setIsDark] = useState(
    () => {
      const saved = localStorage.getItem('darkMode')
      return saved !== null ? saved === 'true' : presets[themeConfig.preset].isDark
    }
  )

  const switchPreset = useCallback((name: PresetName, dark?: boolean) => {
    const useDark = dark ?? presets[name].isDark
    savePreset(name, useDark)
    setPreset(name)
    setIsDark(useDark)
  }, [])

  const toggleDark = useCallback(() => {
    const next = !isDark
    savePreset(preset, next)
    setIsDark(next)
  }, [isDark, preset])

  const currentPreset = presets[preset]

  return { preset, isDark, currentPreset, switchPreset, toggleDark, allPresets: presets }
}
