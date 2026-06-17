import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AboutPageContent } from '@/components/about/AboutView'
import { buildPageMetadata } from '@/lib/metadata'
import { getPageBySlug, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSiteSettings(), getPageBySlug('about')])

  if (!page) {
    return buildPageMetadata('О колледже', settings.meta)
  }

  return buildPageMetadata(page.meta?.title || page.title, page.meta ?? settings.meta, page.subtitle)
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')

  if (!page) {
    notFound()
  }

  return <AboutPageContent page={page} />
}
