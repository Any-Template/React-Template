// ─────────────────────────────────────────────────────────────────────────────
// CONFIG INDEX  –  Single import point for the entire app config
// ─────────────────────────────────────────────────────────────────────────────
//
//  import { appConfig } from '@/config'
//  import { themeConfig, apiConfig } from '@/config'
//
// ─────────────────────────────────────────────────────────────────────────────

export { themeConfig }    from './theme.config'
export { animationsConfig } from './animations.config'
export { layoutConfig }   from './layout.config'
export { featuresConfig } from './features.config'
export { apiConfig }      from './api.config'
export { apiSchemas }     from './api-schemas.config'
export { metaConfig }     from './meta.config'
export { presets }        from './presets'

export type * from './types'
export type * from './api-schemas.config'

import { themeConfig }      from './theme.config'
import { animationsConfig } from './animations.config'
import { layoutConfig }     from './layout.config'
import { featuresConfig }   from './features.config'
import { apiConfig }        from './api.config'
import { apiSchemas }       from './api-schemas.config'
import { metaConfig }       from './meta.config'
import type { AppConfig }   from './types'

export const appConfig: AppConfig = {
  theme:      themeConfig,
  animations: animationsConfig,
  layout:     layoutConfig,
  features:   featuresConfig,
  api:        apiConfig,
  schemas:    apiSchemas,
  meta:       metaConfig,
}
