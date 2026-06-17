import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/Container'
import { RichText } from '@/components/rich-text/RichText'
import { Badge } from '@/components/ui/badge'
import { buildPageMetadata } from '@/lib/metadata'
import { getMediaAlt, getMediaUrl } from '@/lib/payload/media'
import { getNewsBySlug, getPublishedNewsSlugs } from '@/lib/payload/queries'

export const revalidate = 60

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) return { title: 'Новость не найдена' }
  return buildPageMetadata(article.title, article.meta, article.excerpt)
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) notFound()

  const coverUrl = getMediaUrl(article.cover, 'hero')

  return (
    <Container as="article" className="py-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {article.publishedAt ? (
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          ) : null}
          {article.category ? <Badge variant="secondary">{article.category}</Badge> : null}
          {article.readingTime ? <span>{article.readingTime} мин. чтения</span> : null}
        </div>
        <h1 className="text-3xl font-semibold text-foreground">{article.title}</h1>
        {coverUrl ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <Image
              src={coverUrl}
              alt={getMediaAlt(article.cover, article.title)}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ) : null}
        <RichText data={article.content} />
      </div>
    </Container>
  )
}
