import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

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
      revalidatePaths(['/', '/programs', ...(slug ? [`/programs/${slug}`] : []), '/svedeniya/education'])
      break
    case 'news':
      revalidatePaths(['/', '/news', ...(slug ? [`/news/${slug}`] : [])])
      break
    case 'pages':
      revalidatePaths(['/', ...(slug ? [`/pages/${slug}`] : [])])
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
      revalidatePaths(['/contacts'])
      break
    case 'documents':
      revalidatePaths(['/', '/svedeniya/documents'])
      break
    case 'staff':
      revalidatePaths(['/svedeniya/structure', '/svedeniya/staff'])
      break
    case 'vacancies':
      revalidatePaths(['/svedeniya/vacancies', '/svedeniya/education'])
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
      safeRevalidatePath('/svedeniya/basic')
      break
    case 'legal-structure':
      safeRevalidatePath('/svedeniya/structure')
      break
    case 'legal-mtb':
      safeRevalidatePath('/svedeniya/mtb')
      break
    case 'legal-accessible-environment':
      safeRevalidatePath('/svedeniya/accessible-environment')
      break
    case 'legal-international':
      safeRevalidatePath('/svedeniya/international')
      break
    case 'legal-scholarships':
      safeRevalidatePath('/svedeniya/scholarships')
      break
    case 'legal-paid-services':
      safeRevalidatePath('/svedeniya/paid-services')
      break
    case 'legal-finance':
      safeRevalidatePath('/svedeniya/finance')
      break
    case 'legal-standards':
      safeRevalidatePath('/svedeniya/standards')
      break
    default:
      safeRevalidatePath('/svedeniya')
      break
  }

  return global
}
