import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings2, ChevronDown, ChevronUp, X, Zap, Palette, Layout, ToggleLeft, Globe, Database } from 'lucide-react'
import { cn } from '@/lib/cn'
import { appConfig } from '@config/index'
import { presets } from '@config/presets'
import { useTheme } from '@/hooks/useTheme'
import { Badge } from '@/components/ui/Badge'
import type { PresetName } from '@config/types'

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function Section({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-(--color-border) last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full px-4 py-2.5 hover:bg-(--color-surface-alt) transition-colors text-left"
      >
        <span className="flex items-center gap-2 text-xs font-semibold text-(--color-text)">
          {icon}
          {title}
        </span>
        {open ? <ChevronUp className="h-3 w-3 text-(--color-text-muted)" /> : <ChevronDown className="h-3 w-3 text-(--color-text-muted)" />}
      </button>
      {open && <div className="px-4 pb-3 space-y-2 text-xs">{children}</div>}
    </div>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-(--color-text-muted)">{label}</span>
      <span className="font-mono text-(--color-text) text-right max-w-[120px] truncate">{value}</span>
    </div>
  )
}

function BoolRow({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-(--color-text-muted)">{label}</span>
      <Badge variant={value ? 'success' : 'secondary'} size="sm">{value ? 'on' : 'off'}</Badge>
    </div>
  )
}

export function ConfigPanel() {
  const [open, setOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('right')
  const { preset, isDark, switchPreset } = useTheme()
  const { theme, animations, layout, features, api, meta } = appConfig

  return (
    <>
      {/* FAB trigger */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        className={cn(
          'fixed bottom-4 z-[90] flex items-center gap-1.5 px-3 py-2 rounded-full shadow-lg text-xs font-semibold',
          'bg-(--color-primary) text-(--color-primary-fg)',
          'hover:opacity-90 transition-opacity',
          side === 'right' ? 'right-4' : 'left-4'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Dev Config Panel"
      >
        <Settings2 className="h-3.5 w-3.5" />
        Config
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-[89]" onClick={() => setOpen(false)} />
            <motion.div
              className={cn(
                'fixed top-0 bottom-0 z-[90] w-72 bg-(--color-surface) border-(--color-border) shadow-2xl flex flex-col',
                side === 'right' ? 'right-0 border-l' : 'left-0 border-r'
              )}
              initial={{ x: side === 'right' ? 288 : -288 }}
              animate={{ x: 0 }}
              exit={{ x: side === 'right' ? 288 : -288 }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-(--color-border) bg-(--color-surface-alt)">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-(--color-primary)" />
                  <span className="text-sm font-bold text-(--color-text)">Dev Config</span>
                  <Badge variant="info" size="sm">DEV</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSide(s => s === 'right' ? 'left' : 'right')}
                    className="text-(--color-text-muted) hover:text-(--color-text) p-1 transition-colors"
                    title="Flip side"
                  >
                    <Layout className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setOpen(false)} className="text-(--color-text-muted) hover:text-(--color-text) p-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">

                {/* Quick Preset Switcher */}
                <Section title="Theme" icon={<Palette className="h-3.5 w-3.5 text-(--color-primary)" />} defaultOpen>
                  <Row label="Preset" value={preset} />
                  <Row label="Dark mode" value={String(isDark)} />
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    {(Object.keys(presets) as PresetName[]).map(name => (
                      <button
                        key={name}
                        onClick={() => switchPreset(name)}
                        className={cn(
                          'flex items-center gap-1.5 px-2 py-1.5 rounded text-xs transition-colors',
                          preset === name
                            ? 'bg-(--color-primary) text-(--color-primary-fg) font-semibold'
                            : 'bg-(--color-surface-alt) text-(--color-text) hover:bg-(--color-border)'
                        )}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ background: presets[name].colors.primary.DEFAULT }}
                        />
                        {presets[name].name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 space-y-1">
                    <Row label="Typography" value={theme.typography.scale} />
                    <Row label="Card shadow" value={theme.components.card.shadow} />
                    <Row label="Card radius" value={theme.components.card.rounded} />
                    <Row label="Button style" value={theme.components.button.rounded} />
                    <Row label="Input variant" value={theme.components.input.variant} />
                  </div>
                </Section>

                {/* Animations */}
                <Section title="Animations" icon={<Zap className="h-3.5 w-3.5 text-(--color-accent)" />}>
                  <BoolRow label="Master enabled" value={animations.enabled} />
                  <Row label="Speed" value={animations.speed} />
                  <Row label="Reduced motion" value={animations.reducedMotion} />
                  <BoolRow label="Page transitions" value={animations.pageTransitions.enabled} />
                  <Row label="Transition type" value={animations.pageTransitions.type} />
                  <BoolRow label="Card hover" value={animations.components.cards.hover} />
                  <BoolRow label="Card entrance" value={animations.components.cards.entrance} />
                  <BoolRow label="List stagger" value={animations.components.lists.stagger} />
                  <BoolRow label="Scroll animations" value={animations.scrollAnimations.enabled} />
                </Section>

                {/* Layout */}
                <Section title="Layout" icon={<Layout className="h-3.5 w-3.5 text-(--color-secondary)" />}>
                  <Row label="Mode" value={layout.mode} />
                  <Row label="Max width" value={layout.maxWidth} />
                  <Row label="Navbar" value={layout.navbar.variant} />
                  <Row label="Sidebar" value={layout.sidebar.variant} />
                  <Row label="Footer" value={layout.footer.variant} />
                  <BoolRow label="Navbar blur" value={layout.navbar.blurred} />
                  <BoolRow label="Navbar border" value={layout.navbar.bordered} />
                </Section>

                {/* Features */}
                <Section title="Features" icon={<ToggleLeft className="h-3.5 w-3.5 text-(--color-info)" />}>
                  {(Object.entries(features) as [string, boolean][]).map(([k, v]) => (
                    <BoolRow key={k} label={k} value={v} />
                  ))}
                </Section>

                {/* API */}
                <Section title="API" icon={<Database className="h-3.5 w-3.5 text-(--color-warning)" />}>
                  <Row label="Base URL" value={api.baseUrl.replace('https://', '').slice(0, 28)} />
                  <Row label="Version" value={api.version || '(none)'} />
                  <Row label="Auth type" value={api.auth.type} />
                  <Row label="Timeout" value={`${api.timeout}ms`} />
                  <Row label="Retries" value={String(api.retries)} />
                  <BoolRow label="Dev logging" value={api.devLogging} />
                  <div className="mt-2 pt-2 border-t border-(--color-border)">
                    <p className="text-(--color-text-muted) mb-1">Endpoint groups</p>
                    {Object.entries(api.endpoints).map(([group, eps]) => (
                      <div key={group} className="flex justify-between">
                        <span className="text-(--color-text)">{group}</span>
                        <span className="text-(--color-text-muted)">{Object.keys(eps).length} endpoints</span>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Meta */}
                <Section title="App Meta" icon={<Globe className="h-3.5 w-3.5 text-(--color-success)" />}>
                  <Row label="App name" value={meta.appName} />
                  <Row label="Version" value={meta.appVersion} />
                  <Row label="Locale" value={meta.defaultLocale} />
                  <Row label="Nav links" value={meta.navLinks.length} />
                  <Row label="Social links" value={meta.socialLinks.length} />
                </Section>
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 border-t border-(--color-border) bg-(--color-surface-alt)">
                <p className="text-[10px] text-(--color-text-muted) text-center">
                  Edit config/ files → hot-reload applies instantly
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
