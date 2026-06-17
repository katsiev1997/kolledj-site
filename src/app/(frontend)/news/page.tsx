import type { Metadata } from 'next'
import Link from 'next/link'

import { NewsGrid } from '@/components/blocks/ContentGrids'
import { Container } from '@/components/layout/Container'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { buildPageMetadata } from '@/lib/metadata'
import { getPublishedNews, getSiteSettings } from '@/lib/payload/queries'

export const revalidate = 60

type NewsPageProps = {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return buildPageMetadata('Новости', settings.meta, 'Новости колледжа')
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const page = Number(params.page || 1)
  const result = await getPublishedNews(page, 12)

  return (
    <>
      <section className="border-b border-border bg-muted/30 py-10">
        <Container>
          <h1 className="text-3xl font-semibold text-foreground">Новости</h1>
        </Container>
      </section>

      <NewsGrid articles={result.docs} title="Все новости" />

      {result.totalPages > 1 ? (
        <Container className="pb-10">
          <Pagination>
            <PaginationContent>
              {result.hasPrevPage ? (
                <PaginationItem>
                  <PaginationPrevious href={`/news?page=${page - 1}`} />
                </PaginationItem>
              ) : null}
              {Array.from({ length: result.totalPages }).map((_, index) => {
                const pageNumber = index + 1
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink href={`/news?page=${pageNumber}`} isActive={pageNumber === page}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              {result.hasNextPage ? (
                <PaginationItem>
                  <PaginationNext href={`/news?page=${page + 1}`} />
                </PaginationItem>
              ) : null}
            </PaginationContent>
          </Pagination>
        </Container>
      ) : null}
    </>
  )
}
