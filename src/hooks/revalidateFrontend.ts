import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

import { INFO_BASE } from '@/lib/constants'

function safeRevalidatePath(path: string, type?: 'layout' | 'page') {
  try {
    revalidatePath(path, type)
  } catch {
    // Вне Next.js runtime (seed, тесты) revalidate недоступен
  }
}

function revalidatePaths(paths: string[]) {
  for (const path of paths) {
    safeRevalidatePath(path)
  }
}

export const revalidateFrontendCollection: CollectionAfterChangeHook = ({ doc, collection }) => {
  const slug = typeof doc.slug === 'string' ? doc.slug : undefined

  switch (collection.slug) {
    case 'programs':
      revalidatePaths(['/', '/programs', ...(slug ? [`/programs/${slug}`] : []), `${INFO_BASE}/education`])
      break
    case 'news':
      revalidatePaths(['/', '/news', ...(slug ? [`/news/${slug}`] : [])])
      break
    case 'pages':
      revalidatePaths(['/', '/about', ...(slug && slug !== 'about' ? [`/pages/${slug}`] : [])])
      break
    case 'faq':
      revalidatePaths(['/', '/faq'])
      break
    case 'events':
      revalidatePaths(['/', '/events'])
      break
    case 'partners':
      revalidatePaths(['/partners'])
      break
    case 'campuses':
      revalidatePaths(['/contacts', `${INFO_BASE}/basic`])
      break
    case 'documents':
      revalidatePaths(['/', `${INFO_BASE}/documents`])
      break
    case 'staff':
      revalidatePaths([`${INFO_BASE}/structure`, `${INFO_BASE}/staff`])
      break
    case 'vacancies':
      revalidatePaths([`${INFO_BASE}/vacancies`, `${INFO_BASE}/education`])
      break
    default:
      break
  }

  return doc
}

export const revalidateFrontendGlobal: GlobalAfterChangeHook = ({ global }) => {
  switch (global.slug) {
    case 'homepage':
      safeRevalidatePath('/')
      break
    case 'site-settings':
      safeRevalidatePath('/', 'layout')
      break
    case 'page-content':
      revalidatePaths(['/programs', '/faq', '/contacts'])
      break
    case 'legal-basic-info':
      safeRevalidatePath(`${INFO_BASE}/basic`)
      break
    case 'legal-structure':
      safeRevalidatePath(`${INFO_BASE}/structure`)
      break
    case 'legal-mtb':
      safeRevalidatePath(`${INFO_BASE}/mtb`)
      break
    case 'legal-accessible-environment':
      safeRevalidatePath(`${INFO_BASE}/accessible-environment`)
      break
    case 'legal-international':
      safeRevalidatePath(`${INFO_BASE}/international`)
      break
    case 'legal-scholarships':
      safeRevalidatePath(`${INFO_BASE}/scholarships`)
      break
    case 'legal-paid-services':
      safeRevalidatePath(`${INFO_BASE}/paid-services`)
      break
    case 'legal-finance':
      safeRevalidatePath(`${INFO_BASE}/finance`)
      break
    case 'legal-standards':
      safeRevalidatePath(`${INFO_BASE}/standards`)
      break
    default:
      safeRevalidatePath(INFO_BASE)
      break
  }

  return global
}
