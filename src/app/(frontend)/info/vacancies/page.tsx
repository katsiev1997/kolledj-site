import type { Metadata } from 'next'

import { LegalLayout } from '@/components/legal/LegalLayout'
import { VacanciesTable } from '@/components/legal/VacanciesTable'
import { buildPageMetadata } from '@/lib/metadata'
import { getSiteSettings, getVacancies } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Вакантные места', settings.meta)
}

export default async function VacanciesPage() {
  const vacancies = await getVacancies()

  return (
    <LegalLayout title="Вакантные места для приёма (перевода)" breadcrumbs={[{ label: 'Вакантные места' }]}>
      <VacanciesTable vacancies={vacancies} />
    </LegalLayout>
  )
}
