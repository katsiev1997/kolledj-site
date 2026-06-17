import type { Metadata } from 'next'

import { FinanceView } from '@/components/legal/FinanceView'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Финансово-хозяйственная деятельность', settings.meta)
}

export default async function FinancePage() {
  const data = await getLegalGlobal('legal-finance')

  return (
    <LegalLayout
      title="Финансово-хозяйственная деятельность"
      breadcrumbs={[{ label: 'Финансово-хозяйственная деятельность' }]}
    >
      <FinanceView data={data} />
    </LegalLayout>
  )
}
