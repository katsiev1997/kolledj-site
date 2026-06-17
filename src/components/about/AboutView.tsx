import Link from 'next/link'
import { notFound } from 'next/navigation'

import { StatsRow, ValuesGrid } from '@/components/blocks/HomeSections'
import { Container } from '@/components/layout/Container'
import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Page } from '@/payload-types'

type AboutViewProps = {
  page: Page
}

export function AboutView({ page }: AboutViewProps) {
  const historyParagraphs = page.history?.paragraphs?.map((item) => item.text).filter(Boolean) ?? []

  return (
    <>
      <PageHero title={page.title} subtitle={page.subtitle} />

      <Container className="flex flex-col gap-10 py-8 md:gap-14 md:py-10">
        {page.intro ? (
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{page.intro}</p>
        ) : null}

        <StatsRow stats={page.stats} />
        <ValuesGrid values={page.values} title={page.valuesTitle || 'Наши преимущества'} />

        {page.history?.title && historyParagraphs.length ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">{page.history.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {historyParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {paragraph}
                </p>
              ))}
            </CardContent>
          </Card>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/programs">{page.cta?.programsLabel || 'Смотреть программы'}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contacts">{page.cta?.contactsLabel || 'Связаться с нами'}</Link>
          </Button>
        </div>
      </Container>
    </>
  )
}

export function AboutPageContent({ page }: AboutViewProps) {
  if (page.template !== 'about') {
    notFound()
  }

  return <AboutView page={page} />
}
