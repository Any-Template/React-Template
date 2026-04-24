import type { Variants, Transition } from 'framer-motion'
import { animationsConfig } from '@config/animations.config'

const { speed, pageTransitions, components } = animationsConfig

function dur(base: number): number {
  if (!animationsConfig.enabled) return 0
  const m = speed === 'slow' ? 1.5 : speed === 'fast' ? 0.6 : 1
  return base * m
}

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1]

const spring: Transition = { type: 'spring', stiffness: 400, damping: 30 }

// ─── Page transitions ─────────────────────────────────────────────────────────

const pageVariantMap: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 1.02 },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit:    { opacity: 0, filter: 'blur(8px)' },
  },
  none: {
    initial: {},
    animate: {},
    exit:    {},
  },
}

export const pageVariants: Variants = animationsConfig.enabled && pageTransitions.enabled
  ? pageVariantMap[pageTransitions.type] ?? pageVariantMap.fade
  : pageVariantMap.none

export const pageTransition: Transition = {
  duration: dur(pageTransitions.duration),
  ease,
}

// ─── Card variants ────────────────────────────────────────────────────────────

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: dur(0.3), ease } },
}

export const cardHover = components.cards.hover
  ? { y: -2, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)', transition: spring }
  : {}

// ─── List / stagger ───────────────────────────────────────────────────────────

export const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: components.lists.stagger ? components.lists.staggerDelay : 0,
    },
  },
}

export const listItemVariants: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: dur(0.25), ease } },
}

// ─── Modal variants ───────────────────────────────────────────────────────────

const modalVariantMap: Record<string, Variants> = {
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: spring },
    exit:    { opacity: 0, scale: 0.95, transition: { duration: dur(0.15) } },
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: spring },
    exit:    { opacity: 0, y: 20, transition: { duration: dur(0.15) } },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
}

export const modalVariants: Variants = components.modals.enabled
  ? (modalVariantMap[components.modals.type] ?? modalVariantMap.scale)
  : { initial: {}, animate: {}, exit: {} }

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: dur(0.2) } },
  exit:    { opacity: 0, transition: { duration: dur(0.15) } },
}

// ─── Toast variants ───────────────────────────────────────────────────────────

const toastVariantMap: Record<string, Variants> = {
  slide: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0, transition: spring },
    exit:    { opacity: 0, x: 40, transition: { duration: dur(0.2) } },
  },
  bounce: {
    initial: { opacity: 0, y: -20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 500, damping: 25 } },
    exit:    { opacity: 0, scale: 0.9, transition: { duration: dur(0.15) } },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
}

export const toastVariants: Variants = toastVariantMap[components.toast.type] ?? toastVariantMap.slide

// ─── Button interaction props (spread onto motion.button) ─────────────────────

export const buttonMotionProps = {
  whileHover: animationsConfig.enabled && components.buttons.hover ? { scale: 1.02 } : undefined,
  whileTap:   animationsConfig.enabled && components.buttons.tap   ? { scale: 0.97 } : undefined,
  transition: spring,
}

// ─── Fade-in (generic) ───────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: dur(0.35) } },
}

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: dur(0.35), ease } },
}
