import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { ApplicationDialog } from '@/components/forms/ApplicationDialog'
import { Container } from '@/components/layout/Container'
import { RichText } from '@/components/rich-text/RichText'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BASE_LABELS,
  PROGRAM_CATEGORY_LABELS,
  STUDY_FORM_LABELS,
} from '@/lib/constants'
import { buildPageMetadata } from '@/lib/metadata'
import { getMediaAlt, getMediaUrl } from '@/lib/payload/media'
import {
  getProgramBySlug,
  getPublishedProgramSlugs,
  getSiteSettings,
} from '@/lib/payload/queries'

export const revalidate = 60

type ProgramPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedProgramSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) return { title: 'Программа не найдена' }
  return buildPageMetadata(program.title, program.meta, program.shortDescription)
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params
  const [program, settings] = await Promise.all([getProgramBySlug(slug), getSiteSettings()])

  if (!program) notFound()

  const coverUrl = getMediaUrl(program.cover, 'hero')
  const privacySlug =
    typeof settings.privacyPolicyPage === 'object' && settings.privacyPolicyPage
      ? settings.privacyPolicyPage.slug
      : undefined

  return (
    <>
      <section className="border-b border-border bg-muted/30 py-10">
        <Container className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            {coverUrl ? (
              <div className="relative aspect-[16/7] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={coverUrl}
                  alt={getMediaAlt(program.cover, program.title)}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            ) : null}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <Badge>{PROGRAM_CATEGORY_LABELS[program.category]}</Badge>
                {program.studyForms?.map((form) => (
                  <Badge key={form} variant="outline">
                    {STUDY_FORM_LABELS[form]}
                  </Badge>
                ))}
                {program.base?.map((base) => (
                  <Badge key={base} variant="secondary">
                    {BASE_LABELS[base]}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-semibold text-foreground">{program.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {program.duration ? <span>Срок: {program.duration}</span> : null}
                {program.price != null ? <span>Стоимость: {program.price.toLocaleString('ru-RU')} ₽</span> : null}
              </div>
            </div>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Подать заявку</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplicationDialog
                type="enrollment"
                programId={program.id}
                privacyPageSlug={privacySlug}
                trigger={<Button className="w-full">Оставить заявку</Button>}
              />
            </CardContent>
          </Card>
        </Container>
      </section>

      <Container className="py-10">
        {program.description ? <RichText data={program.description} /> : null}
      </Container>
    </>
  )
}
