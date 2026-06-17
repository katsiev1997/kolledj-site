import type { Metadata } from 'next'

import { LegalLayout } from '@/components/legal/LegalLayout'
import { PaidServicesView } from '@/components/legal/PaidServicesView'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getProgramsForLegal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Платные образовательные услуги', settings.meta)
}

export default async function PaidServicesPage() {
  const [data, programs] = await Promise.all([
    getLegalGlobal('legal-paid-services'),
    getProgramsForLegal(),
  ])

  return (
    <LegalLayout title="Платные образовательные услуги" breadcrumbs={[{ label: 'Платные образовательные услуги' }]}>
      <PaidServicesView data={data} programs={programs} />
    </LegalLayout>
  )
}
