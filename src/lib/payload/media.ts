import type { Media } from '@/payload-types'

export type MediaSize = 'thumbnail' | 'card' | 'hero'

export function isMedia(value: unknown): value is Media {
  return typeof value === 'object' && value !== null && 'url' in value
}

export function getMediaUrl(
  media: string | Media | null | undefined,
  size?: MediaSize,
): string | null {
  if (!media || typeof media === 'string') return null

  if (size && media.sizes?.[size]?.url) {
    return media.sizes[size].url ?? null
  }

  return media.url ?? null
}

export function getMediaAlt(media: string | Media | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'string') return fallback
  return media.alt || fallback
}
