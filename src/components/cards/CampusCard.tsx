import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Campus } from '@/payload-types'

type CampusCardProps = {
  campus: Campus
  className?: string
}

export function CampusCard({ campus, className }: CampusCardProps) {
  const phoneHref = campus.phone ? `tel:${campus.phone.replace(/\s/g, '')}` : undefined

  return (
    <Card className={cn('h-full', className)}>
      <CardHeader className="gap-3">
        {campus.city ? <p className="text-sm font-semibold text-primary">{campus.city}</p> : null}
        <CardTitle className="text-xl">{campus.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {campus.address ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{campus.address}</p>
        ) : null}
        {campus.metro ? <p className="text-sm text-muted-foreground">{campus.metro}</p> : null}
        <div className="aspect-[16/9] w-full rounded-lg bg-muted" aria-hidden />
        {phoneHref ? (
          <a href={phoneHref} className="text-sm text-foreground hover:text-primary">
            {campus.phone}
          </a>
        ) : null}
        {campus.email ? (
          <a href={`mailto:${campus.email}`} className="text-sm text-foreground hover:text-primary">
            {campus.email}
          </a>
        ) : null}
        {campus.workingHours ? (
          <p className="text-sm text-muted-foreground">{campus.workingHours}</p>
        ) : null}
        {campus.latitude != null && campus.longitude != null ? (
          <Link
            href={`https://yandex.ru/maps/?pt=${campus.longitude},${campus.latitude}&z=16&l=map`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Открыть на карте
          </Link>
        ) : null}
      </CardContent>
    </Card>
  )
}
