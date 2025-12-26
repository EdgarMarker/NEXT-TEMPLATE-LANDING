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
      !key.startsWith('Lucide') &&
      !key.endsWith('Icon')
    ) {
      const lowercaseKey = key.toLowerCase()
      acc[lowercaseKey] = value as LucideIcon
    }
    return acc
  },
  {} as Record<string, LucideIcon>,
)

export type LucideKey = keyof typeof lucideMap

export const LUCIDE_OPTIONS: {title: string; value: LucideKey}[] = Object.keys(lucideMap)
  .sort()
  .map((k) => {
    const title = k.charAt(0).toUpperCase() + k.slice(1)
    return {
      title,
      value: k as LucideKey,
    }
  })
