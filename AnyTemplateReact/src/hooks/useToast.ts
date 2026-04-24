import { useState, useCallback, useRef } from 'react'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

let globalDispatch: ((toast: Omit<Toast, 'id'>) => void) | null = null

export function registerToastDispatch(fn: (toast: Omit<Toast, 'id'>) => void) {
  globalDispatch = fn
}

export function toast(message: string, variant: ToastVariant = 'default', duration = 4000) {
  globalDispatch?.({ message, variant, duration })
}

export function useToastManager() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counter = useRef(0)

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const add = useCallback((t: Omit<Toast, 'id'>) => {
    const id = `toast-${++counter.current}`
    setToasts(prev => [...prev, { ...t, id }])
    setTimeout(() => remove(id), t.duration)
  }, [remove])

  return { toasts, add, remove }
}
