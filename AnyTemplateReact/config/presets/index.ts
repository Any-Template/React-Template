export { minimal } from './minimal'
export { dark } from './dark'
export { glass } from './glass'
export { corporate } from './corporate'
export { neon } from './neon'
export { pastel } from './pastel'
export { sunset } from './sunset'

import { minimal } from './minimal'
import { dark } from './dark'
import { glass } from './glass'
import { corporate } from './corporate'
import { neon } from './neon'
import { pastel } from './pastel'
import { sunset } from './sunset'
import type { PresetDefinition, PresetName } from '../types'

export const presets: Record<PresetName, PresetDefinition> = {
  minimal,
  dark,
  glass,
  corporate,
  neon,
  pastel,
  sunset,
}
