import type { Metadata } from 'next'

import { CampusCard } from '@/components/cards/CampusCard'
import { Container } from '@/components/layout/Container'
import { PageHero } from '@/components/layout/PageHero'
import { RichText } from '@/components/rich-text/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { buildPageMetadata } from '@/lib/metadata'
import { getCampuses, getPageContent, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const [settings, pageContent] = await Promise.all([getSiteSettings(), getPageContent()])
  const hero = pageContent.contactsPage
  return buildPageMetadata(
    hero?.title || 'Контакты',
    settings.meta,
    hero?.subtitle || 'Свяжитесь с приёмной комиссией',
  )
}

export default async function ContactsPage() {
  const [pageContent, settings, campuses] = await Promise.all([
    getPageContent(),
    getSiteSettings(),
    getCampuses(),
  ])

  const hero = pageContent.contactsPage

  return (
    <>
      <PageHero title={hero?.title || 'Контакты'} subtitle={hero?.subtitle} />

      <Container className="flex flex-col gap-8 py-8 md:gap-10 md:py-10">
        <Card className="bg-muted/40">
          <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-3">
              <p className="text-base font-semibold text-foreground">{settings.organizationName}</p>
              {hero?.intro ? (
                <div className="text-sm text-muted-foreground">
                  <RichText data={hero.intro} />
                </div>
              ) : null}
              {settings.workingHours ? (
                <p className="text-sm text-muted-foreground">{settings.workingHours}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2">
              {settings.phones?.map((phone) => (
                <a
                  key={phone.number}
                  href={`tel:${phone.number.replace(/\s/g, '')}`}
                  className="text-sm text-foreground hover:text-primary"
                >
                  {phone.label ? `${phone.label}: ` : ''}
                  {phone.number}
                </a>
              ))}
              {settings.emails?.map((email) => (
                <a
                  key={email.address}
                  href={`mailto:${email.address}`}
                  className="text-sm text-foreground hover:text-primary"
                >
                  {email.label ? `${email.label}: ` : ''}
                  {email.address}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {campuses.length ? (
          <section className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-xl font-semibold text-foreground md:text-2xl">
              {hero?.campusesTitle || 'Кампусы'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {campuses.map((campus) => (
                <CampusCard key={campus.id} campus={campus} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  )
}
