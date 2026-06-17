import type { Metadata } from 'next'

import { EducationView } from '@/components/legal/EducationView'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { getProgramsForLegal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Образование', settings.meta)
}

export default async function EducationPage() {
  const programs = await getProgramsForLegal()

  return (
    <LegalLayout title="Образование" breadcrumbs={[{ label: 'Образование' }]}>
      <EducationView programs={programs} />
    </LegalLayout>
  )
}
