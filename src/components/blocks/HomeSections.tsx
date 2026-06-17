import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Homepage } from '@/payload-types'

type ValuesGridProps = {
  values: Homepage['values']
  title?: string | null
}

export function ValuesGrid({ values, title = 'Наши ценности' }: ValuesGridProps) {
  if (!values?.length) return null

  return (
    <section className="bg-muted/40 py-12 md:py-20">
      <Container className="flex flex-col gap-6 md:gap-10">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
        <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {values.map((value) => (
            <Card key={value.id}>
              <CardHeader>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              {value.description ? (
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

type StatsRowProps = {
  stats: Homepage['stats']
}

export function StatsRow({ stats }: StatsRowProps) {
  if (!stats?.length) return null

  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-2 text-center">
              <p className="text-3xl font-semibold text-primary md:text-4xl">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

type AboutTeaserProps = {
  title?: string
  excerpt?: string | null
  ctaText?: string | null
}

export function AboutTeaser({
  title = 'О колледже',
  excerpt,
  ctaText = 'Подробнее о колледже',
}: AboutTeaserProps) {
  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
          {excerpt ? <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{excerpt}</p> : null}
        </div>
        <Button asChild className="w-full md:w-auto">
          <Link href="/pages/about">{ctaText}</Link>
        </Button>
      </Container>
    </section>
  )
}
