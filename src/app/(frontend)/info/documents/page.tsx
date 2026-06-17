import type { Metadata } from 'next'

import { DocumentList } from '@/components/legal/DocumentList'
import { LegalLayout } from '@/components/legal/LegalLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { getDocuments, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Документы', settings.meta)
}

export default async function DocumentsPage() {
  const documents = await getDocuments()

  return (
    <LegalLayout title="Документы" breadcrumbs={[{ label: 'Документы' }]}>
      <DocumentList documents={documents} groupByCategory />
    </LegalLayout>
  )
}
