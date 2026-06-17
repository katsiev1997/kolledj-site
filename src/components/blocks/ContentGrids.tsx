import { EventCard } from '@/components/cards/EventCard'
import { NewsCard } from '@/components/cards/NewsCard'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/layout/SectionHeader'
import type { Event, News } from '@/payload-types'

type EventsRowProps = {
  events: Event[]
  title?: string | null
  actionLabel?: string | null
  privacyPageSlug?: string
}

export function EventsRow({
  events,
  title = 'События',
  actionLabel = 'Все события',
  privacyPageSlug,
}: EventsRowProps) {
  if (!events.length) return null

  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-6 md:gap-10">
        <SectionHeader title={title || 'События'} actionLabel={actionLabel} actionHref="/events" />
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} privacyPageSlug={privacyPageSlug} />
          ))}
        </div>
      </Container>
    </section>
  )
}

type NewsGridProps = {
  articles: News[]
  title?: string | null
  actionLabel?: string | null
}

export function NewsGrid({
  articles,
  title = 'Новости',
  actionLabel = 'Все новости',
}: NewsGridProps) {
  if (!articles.length) return null

  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-6 md:gap-10">
        <SectionHeader title={title || 'Новости'} actionLabel={actionLabel} actionHref="/news" />
        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  )
}
