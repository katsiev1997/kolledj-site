import type { Metadata } from 'next'

import { LegalLayout } from '@/components/legal/LegalLayout'
import { StaffView } from '@/components/legal/StaffView'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteSettings, getStaff } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Руководство и педагогический состав', settings.meta)
}

export default async function StaffPage() {
  const staff = await getStaff()

  return (
    <LegalLayout
      title="Руководство и педагогический состав"
      breadcrumbs={[{ label: 'Руководство и педагогический состав' }]}
    >
      <StaffView staff={staff} />
    </LegalLayout>
  )
}
