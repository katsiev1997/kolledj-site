import type { Metadata } from 'next'

import { InfoIndex } from '@/components/legal/InfoIndex'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { INFO_PAGE_TITLE } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata(INFO_PAGE_TITLE, settings.meta, 'Обязательные сведения об образовательной организации')
}

export default async function InfoPage() {
  const basicInfo = await getLegalGlobal('legal-basic-info')

  return (
    <LegalLayout title={INFO_PAGE_TITLE}>
      <InfoIndex basicInfo={basicInfo} />
    </LegalLayout>
  )
}
