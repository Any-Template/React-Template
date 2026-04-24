import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Palette, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { presets } from '@config/presets'
import type { PresetName } from '@config/types'

interface ThemeToggleProps {
  compact?: boolean
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { preset, isDark, switchPreset, toggleDark } = useTheme()
  const [open, setOpen] = useState(false)

  if (compact) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(v => !v)}
          aria-label="Theme settings"
          title="Theme settings"
        >
          <Palette className="h-4 w-4" />
        </Button>

        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
              <motion.div
                className={cn(
                  'absolute right-0 top-full mt-2 z-40 p-3 rounded-(--radius-lg)',
                  'bg-(--color-surface) border border-(--color-border) shadow-xl',
                  'min-w-[220px]'
                )}
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15 }}
              >
                <p className="text-xs font-semibold text-(--color-text-muted) uppercase tracking-wide mb-2 px-1">
                  Preset
                </p>
                <div className="grid grid-cols-2 gap-1 mb-3">
                  {(Object.keys(presets) as PresetName[]).map(name => {
                    const p = presets[name]
                    return (
                      <button
                        key={name}
                        onClick={() => { switchPreset(name); setOpen(false) }}
                        className={cn(
                          'flex items-center gap-2 px-2 py-1.5 rounded-(--radius) text-xs font-medium transition-colors text-left',
                          preset === name
                            ? 'bg-(--color-primary) text-(--color-primary-fg)'
                            : 'text-(--color-text) hover:bg-(--color-surface-alt)'
                        )}
                      >
                        <span
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ background: p.colors.primary.DEFAULT }}
                        />
                        {p.name}
                        {preset === name && <Check className="h-3 w-3 ml-auto" />}
                      </button>
                    )
                  })}
                </div>
                <div className="border-t border-(--color-border) pt-2">
                  <button
                    onClick={toggleDark}
                    className="flex items-center gap-2 w-full px-2 py-1.5 rounded-(--radius) text-xs font-medium text-(--color-text) hover:bg-(--color-surface-alt) transition-colors"
                  >
                    {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                    {isDark ? 'Light mode' : 'Dark mode'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle dark mode">
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
