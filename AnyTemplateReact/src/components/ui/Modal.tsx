import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { modalVariants, overlayVariants } from "@/lib/motion";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  showClose?: boolean;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-[95vw]",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  className,
  showClose = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />
          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal
            aria-labelledby={title ? "modal-title" : undefined}
            className={cn(
              "relative w-full bg-(--color-surface) rounded-lg shadow-xl",
              "border border-(--color-border)",
              sizeMap[size],
              className,
            )}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {(title || showClose) && (
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-semibold text-(--color-text)"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-(--color-text-muted) mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {showClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="shrink-0 -mr-2 -mt-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
