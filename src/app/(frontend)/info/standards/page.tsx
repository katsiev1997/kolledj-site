import type { Metadata } from 'next'

import { LegalLayout } from '@/components/legal/LegalLayout'
import { StandardsView } from '@/components/legal/StandardsView'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Образовательные стандарты', settings.meta)
}

export default async function StandardsPage() {
  const data = await getLegalGlobal('legal-standards')

  return (
    <LegalLayout
      title="Образовательные стандарты и требования"
      breadcrumbs={[{ label: 'Образовательные стандарты' }]}
    >
      <StandardsView data={data} />
    </LegalLayout>
  )
}
