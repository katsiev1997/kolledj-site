import type { Metadata } from 'next'

import { LegalLayout } from '@/components/legal/LegalLayout'
import { StructureView } from '@/components/legal/StructureView'
import { buildPageMetadata } from '@/lib/metadata'
import { getLegalGlobal, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Структура и органы управления', settings.meta)
}

export default async function StructurePage() {
  const data = await getLegalGlobal('legal-structure')

  return (
    <LegalLayout title="Структура и органы управления" breadcrumbs={[{ label: 'Структура и органы управления' }]}>
      <StructureView data={data} />
    </LegalLayout>
  )
}
