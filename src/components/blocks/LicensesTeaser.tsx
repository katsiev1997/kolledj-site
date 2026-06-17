import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { INFO_BASE } from '@/lib/constants'
import { getMediaUrl } from '@/lib/payload/media'
import type { Document } from '@/payload-types'

type LicensesTeaserProps = {
  documents: Document[]
  title?: string | null
  actionLabel?: string | null
}

export function LicensesTeaser({
  documents,
  title = 'Лицензии и аккредитация',
  actionLabel = 'Все документы',
}: LicensesTeaserProps) {
  if (!documents.length) return null

  return (
    <section className="bg-muted/40 py-12 md:py-20">
      <Container className="flex flex-col gap-6 md:gap-10">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
        <div className="grid gap-3 md:grid-cols-2 md:gap-6">
          {documents.map((doc) => {
            const fileUrl = getMediaUrl(typeof doc.file === 'object' ? doc.file : null)
            const href = doc.externalUrl || fileUrl

            return (
              <Card key={doc.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{doc.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {doc.description ? (
                    <p className="text-sm leading-relaxed text-muted-foreground">{doc.description}</p>
                  ) : null}
                  <div className="flex flex-wrap gap-2">
                    {doc.signedWithEP ? <Badge variant="secondary">ЭП</Badge> : null}
                    {href ? (
                      <Button asChild size="sm" variant="outline">
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          Открыть документ
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <Button asChild variant="outline" className="w-fit">
          <Link href={`${INFO_BASE}/documents`}>{actionLabel}</Link>
        </Button>
      </Container>
    </section>
  )
}
