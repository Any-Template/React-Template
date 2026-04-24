import { featuresConfig } from '@config/features.config'
import type { FeaturesConfig } from '@config/types'

/** Returns true if a feature flag is enabled. Always false in prod for devConfigPanel. */
export function useFeature(key: keyof FeaturesConfig): boolean {
  if (key === 'devConfigPanel' && import.meta.env.PROD) return false
  return featuresConfig[key]
}

/** Inline check without the hook (for non-component usage) */
export function isEnabled(key: keyof FeaturesConfig): boolean {
  if (key === 'devConfigPanel' && import.meta.env.PROD) return false
  return featuresConfig[key]
}
