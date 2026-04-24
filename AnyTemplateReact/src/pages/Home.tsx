import { motion } from 'framer-motion'
import { ArrowRight, Zap, Palette, Database, ToggleLeft, Code2, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '@/components/layout/PageWrapper'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { listContainerVariants, listItemVariants } from '@/lib/motion'
import { metaConfig } from '@config/meta.config'
import { themeConfig } from '@config/theme.config'

const features = [
  {
    icon: <Palette className="h-5 w-5" />,
    title: 'Config-driven themes',
    description: '7 built-in presets. Switch via config/theme.config.ts or live in the UI.',
    badge: 'theme.config.ts',
    color: 'text-(--color-primary)',
    bg: 'bg-(--color-primary-100)',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Motion control',
    description: 'Master switch, per-component toggles, speed multiplier — all in one file.',
    badge: 'animations.config.ts',
    color: 'text-(--color-accent)',
    bg: 'bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)]',
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: 'Typed API client',
    description: 'Define endpoints in api.config.ts, schemas in api-schemas.config.ts. Auto-validated with Zod + React Query.',
    badge: 'api.config.ts',
    color: 'text-(--color-warning)',
    bg: 'bg-[color-mix(in_srgb,var(--color-warning)_15%,transparent)]',
  },
  {
    icon: <ToggleLeft className="h-5 w-5" />,
    title: 'Feature flags',
    description: 'Toggle any capability on/off. Dev panel auto-disabled in production.',
    badge: 'features.config.ts',
    color: 'text-(--color-info)',
    bg: 'bg-[color-mix(in_srgb,var(--color-info)_15%,transparent)]',
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: 'Layout control',
    description: 'Navbar, sidebar, footer — all configurable. Switch between centered/wide/full modes.',
    badge: 'layout.config.ts',
    color: 'text-(--color-secondary)',
    bg: 'bg-(--color-surface-alt)',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Drop into any project',
    description: 'Copy the config/ folder. Adjust. Done. Stack-agnostic config format.',
    badge: 'config/',
    color: 'text-(--color-success)',
    bg: 'bg-[color-mix(in_srgb,var(--color-success)_15%,transparent)]',
  },
]

export function Home() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="text-center py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" pill className="mb-6">
            <span className="animate-pulse h-1.5 w-1.5 rounded-full bg-(--color-success) mr-1" />
            Preset: {themeConfig.preset}
          </Badge>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-none">
            <span className="text-gradient-primary">{metaConfig.appName}</span>
          </h1>

          <p className="text-xl text-(--color-text-muted) max-w-2xl mx-auto mb-10 leading-relaxed">
            {metaConfig.appDescription}
            <br />
            <strong className="text-(--color-text)">Edit config files. Everything changes.</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>Dashboard</Button>
            </Link>
            <Link to="/posts">
              <Button size="lg" variant="outline">Live API demo</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature grid */}
      <section className="pb-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-2">Everything is a config value</h2>
          <p className="text-(--color-text-muted)">No more hunting through components to change a color.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map(f => (
            <motion.div key={f.title} variants={listItemVariants}>
              <Card hoverable className="h-full">
                <CardHeader className="pb-3">
                  <div className={`inline-flex p-2 rounded-(--radius) ${f.bg} ${f.color} w-fit mb-3`}>
                    {f.icon}
                  </div>
                  <Badge variant="secondary" size="sm" className="font-mono w-fit mb-1">{f.badge}</Badge>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>{f.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <Card glass className="text-center py-12 px-6 bg-gradient-brand border-0">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to ship?</h2>
          <p className="text-white/80 mb-6">Open config/theme.config.ts and pick your preset.</p>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>See the dashboard →</Button>
          </Link>
        </Card>
      </section>
    </PageWrapper>
  )
}
