import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { initTheme } from '@/lib/theme-injector'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ToastContainer } from '@/components/ui/Toast'
import { ConfigPanel } from '@/components/features/ConfigPanel'
import { Home } from '@/pages/Home'
import { Dashboard } from '@/pages/Dashboard'
import { Posts } from '@/pages/Posts'
import { Users } from '@/pages/Users'
import { NotFound } from '@/pages/NotFound'
import { useFeature } from '@/hooks/useFeature'
import { layoutConfig } from '@config/layout.config'
import { animationsConfig } from '@config/animations.config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function AppRoutes() {
  const location = useLocation()
  const showDevPanel = useFeature('devConfigPanel')
  const showToasts   = useFeature('toasts')
  const navbarFixed  = layoutConfig.navbar.variant === 'fixed'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {navbarFixed && (
        <div style={{ height: layoutConfig.navbar.height }} />
      )}

      {animationsConfig.enabled && animationsConfig.pageTransitions.enabled ? (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"          element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts"     element={<Posts />} />
            <Route path="/users"     element={<Users />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      ) : (
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts"     element={<Posts />} />
          <Route path="/users"     element={<Users />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      )}

      <Footer />

      {showToasts   && <ToastContainer />}
      {showDevPanel && <ConfigPanel />}
    </div>
  )
}

function ThemeBootstrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => { initTheme() }, [])
  return <>{children}</>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeBootstrapper>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeBootstrapper>
    </QueryClientProvider>
  )
}
