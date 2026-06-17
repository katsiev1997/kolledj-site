import { getMediaUrl } from '@/lib/payload/media'
import type { Document, Media } from '@/payload-types'

export function resolveDocument(doc: string | Document | null | undefined): Document | null {
  if (!doc || typeof doc === 'string') return null
  return doc
}

export function getDocumentHref(doc: string | Document | null | undefined): string | null {
  const resolved = resolveDocument(doc)
  if (!resolved) return null
  const fileUrl = getMediaUrl(typeof resolved.file === 'object' ? resolved.file : null)
  return resolved.externalUrl || fileUrl
}

export function getFileHref(file: string | Media | null | undefined): string | null {
  if (!file || typeof file === 'string') return null
  return getMediaUrl(file)
}

export function formatDate(date: string | null | undefined): string {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('ru-RU')
}

export function formatNumber(value: number | null | undefined): string {
  if (value == null) return '—'
  return value.toLocaleString('ru-RU')
}

export function formatCurrency(value: number | null | undefined): string {
  if (value == null) return '—'
  return `${value.toLocaleString('ru-RU')} ₽`
}
