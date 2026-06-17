import type { Metadata } from 'next'

import { AccessibleEnvironmentView } from '@/components/legal/AccessibleEnvironmentView'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Доступная среда', settings.meta)
}

export default async function AccessibleEnvironmentPage() {
  const data = await getLegalGlobal('legal-accessible-environment')

  return (
    <LegalLayout title="Доступная среда" breadcrumbs={[{ label: 'Доступная среда' }]}>
      <AccessibleEnvironmentView data={data} />
    </LegalLayout>
  )
}
