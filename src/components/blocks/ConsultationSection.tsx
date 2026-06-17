import Link from 'next/link'

import { ApplicationDialog } from '@/components/forms/ApplicationDialog'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import type { Homepage } from '@/payload-types'

type ConsultationSectionProps = {
  cta: Homepage['consultationCta']
  viewProgramsLabel?: string | null
  privacyPageSlug?: string
}

export function ConsultationSection({
  cta,
  viewProgramsLabel = 'Смотреть программы',
  privacyPageSlug,
}: ConsultationSectionProps) {
  if (!cta?.title && !cta?.description) return null

  return (
    <section className="bg-primary py-12 text-primary-foreground md:py-24">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex max-w-2xl flex-col gap-3 md:gap-4">
          {cta.title ? (
            <h1 className="text-2xl font-semibold leading-tight md:text-4xl">{cta.title}</h1>
          ) : null}
          {cta.description ? (
            <p className="text-sm leading-relaxed text-primary-foreground/90 md:text-base">{cta.description}</p>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <ApplicationDialog
            type="consultation"
            privacyPageSlug={privacyPageSlug}
            trigger={<Button variant="secondary" className="w-full sm:w-auto">{cta.buttonText || 'Оставить заявку'}</Button>}
          />
          <Button
            asChild
            variant="outline"
            className="w-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
          >
            <Link href="/programs">{viewProgramsLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
