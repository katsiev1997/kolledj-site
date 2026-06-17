import type { Where } from 'payload'

import type { LegalGlobalSlug } from '@/lib/constants'
import { getPayloadClient } from '@/lib/payload/client'
import type {
  Campus,
  Document,
  Event,
  Faq,
  Homepage,
  LegalAccessibleEnvironment,
  LegalBasicInfo,
  LegalFinance,
  LegalInternational,
  LegalMtb,
  LegalPaidService,
  LegalScholarship,
  LegalStandard,
  LegalStructure,
  News,
  Page,
  PageContent,
  Partner,
  Program,
  SiteSetting,
  Staff,
  Vacancy,
} from '@/payload-types'

export type ProgramFilters = {
  category?: string
  studyForm?: string
  base?: string
  q?: string
  page?: number
  limit?: number
}

const publishedWhere = { published: { equals: true } } satisfies Where
const draftPublishedWhere = { _status: { equals: 'published' } } satisfies Where

export async function getSiteSettings(): Promise<SiteSetting> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 2 })
}

export async function getHomepage(): Promise<Homepage> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'homepage', depth: 2 })
}

export async function getPageContent(): Promise<PageContent> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'page-content', depth: 0 })
}

export async function getPublishedPrograms(filters: ProgramFilters = {}) {
  const payload = await getPayloadClient()
  const { category, studyForm, base, q, page = 1, limit = 12 } = filters

  const and: Where[] = [draftPublishedWhere]

  if (category) {
    and.push({ category: { equals: category } })
  }

  if (studyForm) {
    and.push({ studyForms: { contains: studyForm } })
  }

  if (base) {
    and.push({ base: { contains: base } })
  }

  if (q) {
    and.push({
      or: [
        { title: { contains: q } },
        { shortDescription: { contains: q } },
      ],
    })
  }

  return payload.find({
    collection: 'programs',
    where: { and },
    sort: '-updatedAt',
    page,
    limit,
    depth: 2,
  })
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'programs',
    where: {
      and: [draftPublishedWhere, { slug: { equals: slug } }],
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function getPublishedProgramSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'programs',
    where: draftPublishedWhere,
    limit: 500,
    depth: 0,
    select: { slug: true },
  })

  return result.docs.map((doc) => doc.slug)
}

export async function getPublishedNews(page = 1, limit = 12) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'news',
    where: draftPublishedWhere,
    sort: '-publishedAt',
    page,
    limit,
    depth: 2,
  })
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    where: {
      and: [draftPublishedWhere, { slug: { equals: slug } }],
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function getPublishedNewsSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'news',
    where: draftPublishedWhere,
    limit: 500,
    depth: 0,
    select: { slug: true },
  })

  return result.docs.map((doc) => doc.slug)
}

export async function getFAQByCategory(): Promise<Record<string, Faq[]>> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'faq',
    where: publishedWhere,
    sort: 'order',
    limit: 200,
    depth: 0,
  })

  return result.docs.reduce<Record<string, Faq[]>>((acc, item) => {
    const category = item.category || 'general'
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {})
}

export async function getTopFAQ(limit = 5): Promise<Faq[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'faq',
    where: publishedWhere,
    sort: 'order',
    limit,
    depth: 0,
  })

  return result.docs
}

export async function getCampuses(): Promise<Campus[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'campuses',
    where: publishedWhere,
    sort: 'name',
    limit: 50,
    depth: 0,
  })

  return result.docs
}

export async function getPartners(): Promise<Partner[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'partners',
    where: publishedWhere,
    sort: 'order',
    limit: 100,
    depth: 2,
  })

  return result.docs
}

export async function getEvents(): Promise<Event[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'events',
    where: publishedWhere,
    sort: 'date',
    limit: 50,
    depth: 2,
  })

  return result.docs
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [publishedWhere, { slug: { equals: slug } }],
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] ?? null
}

export async function getPublishedPageSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: publishedWhere,
    limit: 100,
    depth: 0,
    select: { slug: true },
  })

  return result.docs.map((doc) => doc.slug)
}

export async function getDocuments(category?: string, programId?: string): Promise<Document[]> {
  const payload = await getPayloadClient()
  const and: Where[] = [publishedWhere, { section: { equals: 'legal' } }]

  if (category) {
    and.push({ category: { equals: category } })
  }

  if (programId) {
    and.push({ program: { equals: programId } })
  }

  const result = await payload.find({
    collection: 'documents',
    where: { and },
    sort: 'title',
    limit: 200,
    depth: 2,
  })

  return result.docs
}

export async function getLicenseDocuments(): Promise<Document[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'documents',
    where: {
      and: [
        publishedWhere,
        {
          category: {
            in: ['license', 'accreditation'],
          },
        },
      ],
    },
    sort: 'title',
    limit: 20,
    depth: 2,
  })

  return result.docs
}

export async function getStaff(role?: Staff['role']): Promise<Staff[]> {
  const payload = await getPayloadClient()
  const where: Where = publishedWhere

  if (role) {
    return (
      await payload.find({
        collection: 'staff',
        where: {
          and: [publishedWhere, { role: { equals: role } }],
        },
        sort: 'fullName',
        limit: 100,
        depth: 2,
      })
    ).docs
  }

  const result = await payload.find({
    collection: 'staff',
    where,
    sort: 'fullName',
    limit: 200,
    depth: 2,
  })

  return result.docs
}

export async function getVacancies(programId?: string, year?: string): Promise<Vacancy[]> {
  const payload = await getPayloadClient()
  const and: Where[] = []

  if (programId) {
    and.push({ program: { equals: programId } })
  }

  if (year) {
    and.push({ academicYear: { equals: year } })
  }

  const result = await payload.find({
    collection: 'vacancies',
    where: and.length ? { and } : undefined,
    sort: '-academicYear',
    limit: 200,
    depth: 2,
  })

  return result.docs
}

type LegalGlobalMap = {
  'legal-basic-info': LegalBasicInfo
  'legal-structure': LegalStructure
  'legal-mtb': LegalMtb
  'legal-accessible-environment': LegalAccessibleEnvironment
  'legal-international': LegalInternational
  'legal-scholarships': LegalScholarship
  'legal-paid-services': LegalPaidService
  'legal-finance': LegalFinance
  'legal-standards': LegalStandard
}

export async function getLegalGlobal<S extends LegalGlobalSlug>(slug: S): Promise<LegalGlobalMap[S]> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug, depth: 2 }) as Promise<LegalGlobalMap[S]>
}

export async function getProgramsForLegal(): Promise<Program[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'programs',
    where: draftPublishedWhere,
    sort: 'title',
    limit: 200,
    depth: 2,
  })

  return result.docs
}

export async function getProgramOptions() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'programs',
    where: draftPublishedWhere,
    sort: 'title',
    limit: 200,
    depth: 0,
    select: { id: true, title: true },
  })

  return result.docs
}
