import type { Metadata } from 'next'

import { LegalLayout } from '@/components/legal/LegalLayout'
import { MtbView } from '@/components/legal/MtbView'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Материально-техническое обеспечение', settings.meta)
}

export default async function MtbPage() {
  const data = await getLegalGlobal('legal-mtb')

  return (
    <LegalLayout
      title="Материально-техническое обеспечение и оснащённость образовательного процесса"
      breadcrumbs={[{ label: 'Материально-техническое обеспечение' }]}
    >
      <MtbView data={data} />
    </LegalLayout>
  )
}
