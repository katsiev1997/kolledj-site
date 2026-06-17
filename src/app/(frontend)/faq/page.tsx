import type { Metadata } from 'next'

import { Container } from '@/components/layout/Container'
import { PageHero } from '@/components/layout/PageHero'
import { RichText } from '@/components/rich-text/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_CATEGORY_LABELS } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/metadata'
import { getFAQByCategory, getPageContent, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const [settings, pageContent] = await Promise.all([getSiteSettings(), getPageContent()])
  const hero = pageContent.faqPage
  return buildPageMetadata(hero?.title || 'FAQ', settings.meta, hero?.subtitle || 'Часто задаваемые вопросы')
}

export default async function FAQPage() {
  const [grouped, pageContent] = await Promise.all([getFAQByCategory(), getPageContent()])
  const categories = Object.keys(grouped)
  const hero = pageContent.faqPage

  return (
    <>
      <PageHero title={hero?.title || 'Часто задаваемые вопросы'} subtitle={hero?.subtitle} />
      <Container className="flex flex-col gap-8 py-8 md:gap-10 md:py-10">
        {categories.map((category) => (
          <section key={category} className="flex flex-col gap-3 md:gap-4">
            <h2 className="text-lg font-medium text-foreground md:text-xl">
              {FAQ_CATEGORY_LABELS[category] || category}
            </h2>
            <Accordion type="single" collapsible>
              {grouped[category].map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left text-base font-medium">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    <RichText data={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        ))}
      </Container>
    </>
  )
}
