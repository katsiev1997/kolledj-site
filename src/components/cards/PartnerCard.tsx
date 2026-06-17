import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import { getMediaUrl } from '@/lib/payload/media'
import type { Partner } from '@/payload-types'

type PartnerCardProps = {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const logoUrl = getMediaUrl(partner.logo, 'thumbnail')
  const content = (
    <Card className="flex h-full items-center justify-center p-6">
      <CardContent className="flex flex-col items-center gap-3 p-0 text-center">
        {logoUrl ? (
          <div className="relative h-16 w-full">
            <Image src={logoUrl} alt={partner.name} fill className="object-contain" sizes="200px" />
          </div>
        ) : (
          <p className="text-base font-medium text-foreground">{partner.name}</p>
        )}
        {partner.description ? (
          <p className="text-sm text-muted-foreground">{partner.description}</p>
        ) : null}
      </CardContent>
    </Card>
  )

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    )
  }

  return content
}
