import type {LucideIcon} from 'lucide-react'
import * as LucideIcons from 'lucide-react'

export const lucideMap = Object.entries(LucideIcons).reduce(
  (acc, [key, value]) => {
    if (
      key !== 'createLucideIcon' &&
      key !== 'icons' &&
      !key.startsWith('create') &&
      key !== 'Icon' &&
      /^[A-Z]/.test(key) &&
      !key.endsWith('Icon')
    ) {
      acc[key.toLowerCase()] = value as LucideIcon
    }
    return acc
  },
  {} as Record<string, LucideIcon>,
)