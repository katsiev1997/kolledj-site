import type { Metadata } from 'next'

import { LegalLayout } from '@/components/legal/LegalLayout'
import { ScholarshipsView } from '@/components/legal/ScholarshipsView'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getProgramsForLegal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Стипендии и меры поддержки', settings.meta)
}

export default async function ScholarshipsPage() {
  const [data, programs] = await Promise.all([
    getLegalGlobal('legal-scholarships'),
    getProgramsForLegal(),
  ])

  return (
    <LegalLayout title="Стипендии и меры поддержки обучающихся" breadcrumbs={[{ label: 'Стипендии и меры поддержки' }]}>
      <ScholarshipsView data={data} programs={programs} />
    </LegalLayout>
  )
}
