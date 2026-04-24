import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/cn'
import { toastVariants } from '@/lib/motion'
import { useToastManager, registerToastDispatch, type Toast, type ToastVariant } from '@/hooks/useToast'

const variantStyles: Record<ToastVariant, string> = {
  default: 'bg-(--color-surface) border border-(--color-border) text-(--color-text)',
  success: 'bg-(--color-success) text-(--color-success-fg)',
  error:   'bg-(--color-error) text-(--color-error-fg)',
  warning: 'bg-(--color-warning) text-(--color-warning-fg)',
  info:    'bg-(--color-info) text-(--color-info-fg)',
}

const icons: Record<ToastVariant, React.ReactNode> = {
  default: null,
  success: <CheckCircle2 className="h-4 w-4 shrink-0" />,
  error:   <AlertCircle className="h-4 w-4 shrink-0" />,
  warning: <AlertTriangle className="h-4 w-4 shrink-0" />,
  info:    <Info className="h-4 w-4 shrink-0" />,
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-(--radius) shadow-lg min-w-[280px] max-w-sm',
        variantStyles[toast.variant]
      )}
    >
      {icons[toast.variant]}
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export function ToastContainer() {
  const { toasts, add, remove } = useToastManager()

  useEffect(() => {
    registerToastDispatch(add)
  }, [add])

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 items-end">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={remove} />
        ))}
      </AnimatePresence>
    </div>
  )
}
