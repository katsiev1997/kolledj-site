import Link from 'next/link'

import { ApplicationDialog } from '@/components/forms/ApplicationDialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Event } from '@/payload-types'

type EventCardProps = {
  event: Event
  privacyPageSlug?: string
}

function formatEventDate(date: string) {
  return new Date(date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function EventCard({ event, privacyPageSlug }: EventCardProps) {
  const campusName =
    typeof event.campus === 'object' && event.campus ? event.campus.name : undefined

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <span>{formatEventDate(event.date)}</span>
          {event.location ? <span>{event.location}</span> : null}
          {campusName ? <span>{campusName}</span> : null}
        </div>
        {event.registrationEnabled ? (
          <ApplicationDialog
            type="openDay"
            eventId={event.id}
            privacyPageSlug={privacyPageSlug}
            trigger={<Button size="sm">Записаться</Button>}
          />
        ) : (
          <Button asChild size="sm" variant="outline">
            <Link href="/events">Подробнее</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
