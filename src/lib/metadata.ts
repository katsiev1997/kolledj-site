import type { Metadata } from 'next'

import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/lib/payload/media'

type MetaFields = {
  title?: string | null
  description?: string | null
  ogImage?: string | Media | null
}

export function buildPageMetadata(
  title: string,
  meta?: MetaFields | null,
  fallbackDescription?: string | null,
): Metadata {
  const description = meta?.description || fallbackDescription || undefined
  const ogImageUrl = getMediaUrl(meta?.ogImage ?? null)

  return {
    title: meta?.title || title,
    description,
    openGraph: {
      title: meta?.title || title,
      description,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
  }
}
