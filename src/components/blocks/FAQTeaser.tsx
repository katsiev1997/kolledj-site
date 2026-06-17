import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/layout/SectionHeader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RichText } from '@/components/rich-text/RichText'
import type { Faq } from '@/payload-types'

type FAQTeaserProps = {
  items: Faq[]
  title?: string | null
  actionLabel?: string | null
}

export function FAQTeaser({ items, title = 'Частые вопросы', actionLabel = 'Все вопросы' }: FAQTeaserProps) {
  if (!items.length) return null

  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-6 md:gap-10">
        <SectionHeader title={title!} actionLabel={actionLabel!} actionHref="/faq" />
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-base font-medium">{item.question}</AccordionTrigger>
              <AccordionContent>
                <RichText data={item.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
