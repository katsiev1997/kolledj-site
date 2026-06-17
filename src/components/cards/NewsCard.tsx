import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMediaAlt, getMediaUrl } from '@/lib/payload/media'
import type { News } from '@/payload-types'

type NewsCardProps = {
  article: News
}

function formatDate(date?: string | null) {
  if (!date) return null
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NewsCard({ article }: NewsCardProps) {
  const coverUrl = getMediaUrl(article.cover, 'card')

  return (
    <Card className="overflow-hidden">
      {coverUrl ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
          <Image
            src={coverUrl}
            alt={getMediaAlt(article.cover, article.title)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {formatDate(article.publishedAt) ? <span>{formatDate(article.publishedAt)}</span> : null}
          {article.category ? <Badge variant="secondary">{article.category}</Badge> : null}
          {article.readingTime ? <span>{article.readingTime} мин.</span> : null}
        </div>
        <CardTitle className="text-lg">
          <Link href={`/news/${article.slug}`} className="hover:text-primary">
            {article.title}
          </Link>
        </CardTitle>
      </CardHeader>
      {article.excerpt ? (
        <CardContent>
          <p className="text-sm text-muted-foreground">{article.excerpt}</p>
        </CardContent>
      ) : null}
    </Card>
  )
}
