import type { Metadata } from 'next'

import { BasicInfoView } from '@/components/legal/BasicInfoView'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { getCampuses, getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Основные сведения', settings.meta)
}

export default async function BasicInfoPage() {
  const [data, campuses] = await Promise.all([getLegalGlobal('legal-basic-info'), getCampuses()])

  return (
    <LegalLayout title="Основные сведения" breadcrumbs={[{ label: 'Основные сведения' }]}>
      <BasicInfoView data={data} campuses={campuses} />
    </LegalLayout>
  )
}
