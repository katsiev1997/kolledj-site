import type { Metadata } from 'next'

import { AdmissionSteps } from '@/components/blocks/AdmissionSteps'
import { ConsultationSection } from '@/components/blocks/ConsultationSection'
import { EventsRow, NewsGrid } from '@/components/blocks/ContentGrids'
import { FAQTeaser } from '@/components/blocks/FAQTeaser'
import { AboutTeaser, StatsRow, ValuesGrid } from '@/components/blocks/HomeSections'
import { LicensesTeaser } from '@/components/blocks/LicensesTeaser'
import { ProgramGrid } from '@/components/blocks/ProgramGrid'
import { buildPageMetadata } from '@/lib/metadata'
import {
  getHomepage,
  getLicenseDocuments,
  getPageBySlug,
  getPublishedPrograms,
  getSiteSettings,
  getTopFAQ,
} from '@/lib/payload/queries'
import type { Event, News, Program } from '@/payload-types'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata(settings.organizationName, settings.meta)
}

function resolveFeatured<T extends { _status?: 'draft' | 'published' | null; published?: boolean | null }>(
  items: (string | T)[] | null | undefined,
): T[] {
  if (!items?.length) return []
  return items.filter((item): item is T => {
    if (typeof item !== 'object' || item === null) return false
    if ('_status' in item && item._status != null) return item._status === 'published'
    if ('published' in item) return item.published !== false
    return true
  })
}

export default async function HomePage() {
  const [homepage, settings, licenses, faq, fallbackPrograms, aboutPage] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
    getLicenseDocuments(),
    getTopFAQ(5),
    getPublishedPrograms({ limit: 6 }),
    getPageBySlug('about'),
  ])

  const featuredPrograms = resolveFeatured<Program>(homepage.featuredPrograms)
  const programs = featuredPrograms.length ? featuredPrograms : fallbackPrograms.docs

  const featuredNews = resolveFeatured<News>(homepage.featuredNews)
  const featuredEvents = resolveFeatured<Event>(homepage.featuredEvents)

  const privacySlug =
    typeof settings.privacyPolicyPage === 'object' && settings.privacyPolicyPage
      ? settings.privacyPolicyPage.slug
      : undefined

  return (
    <>
      <ConsultationSection
        cta={homepage.consultationCta}
        viewProgramsLabel={homepage.actionLabels?.viewPrograms}
        privacyPageSlug={privacySlug}
      />
      <AdmissionSteps steps={homepage.admissionSteps} title={homepage.sectionTitles?.admissionSteps} />
      <ProgramGrid
        programs={programs}
        title={homepage.sectionTitles?.programs}
        actionLabel={homepage.actionLabels?.allPrograms}
      />
      <AboutTeaser
        title={aboutPage?.title}
        excerpt={aboutPage?.excerpt}
        ctaText={aboutPage?.ctaText}
      />
      <ValuesGrid values={homepage.values} title={homepage.sectionTitles?.values} />
      <StatsRow stats={homepage.stats} />
      <EventsRow
        events={featuredEvents}
        title={homepage.sectionTitles?.events}
        actionLabel={homepage.actionLabels?.allEvents}
        privacyPageSlug={privacySlug}
      />
      <NewsGrid
        articles={featuredNews}
        title={homepage.sectionTitles?.news}
        actionLabel={homepage.actionLabels?.allNews}
      />
      <LicensesTeaser
        documents={licenses}
        title={homepage.sectionTitles?.licenses}
        actionLabel={homepage.actionLabels?.allDocuments}
      />
      <FAQTeaser
        items={faq}
        title={homepage.sectionTitles?.faq}
        actionLabel={homepage.actionLabels?.allFaq}
      />
    </>
  )
}
