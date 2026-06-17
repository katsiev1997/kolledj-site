import type { Metadata } from 'next'

import { InternationalView } from '@/components/legal/InternationalView'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Международное сотрудничество', settings.meta)
}

export default async function InternationalPage() {
  const data = await getLegalGlobal('legal-international')

  return (
    <LegalLayout title="Международное сотрудничество" breadcrumbs={[{ label: 'Международное сотрудничество' }]}>
      <InternationalView data={data} />
    </LegalLayout>
  )
}
