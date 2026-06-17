import type { Metadata } from 'next'
import Link from 'next/link'

import { ProgramGrid } from '@/components/blocks/ProgramGrid'
import { Container } from '@/components/layout/Container'
import { PageHero } from '@/components/layout/PageHero'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FilterChip } from '@/components/ui/filter-chip'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { STUDY_FORM_LABELS } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/metadata'
import { getPageContent, getPublishedPrograms, getSiteSettings } from '@/lib/payload/queries'
import { cn } from '@/lib/utils'

export const revalidate = 60

type ProgramsPageProps = {
  searchParams: Promise<{
    category?: string
    studyForm?: string
    base?: string
    q?: string
    page?: string
  }>
}

const CATEGORIES = [
  { value: undefined, label: 'Все' },
  { value: 'college', label: 'СПО' },
  { value: 'course', label: 'Курсы' },
  { value: 'higher', label: 'ВО' },
] as const

const STUDY_FORMS = [
  { value: undefined, label: 'Любая форма' },
  { value: 'full-time', label: 'Очная' },
  { value: 'part-time', label: 'Заочная' },
  { value: 'distance', label: 'Дистанционная' },
] as const

const BASES = [
  { value: undefined, label: 'Любая база' },
  { value: '9', label: 'После 9 класса' },
  { value: '11', label: 'После 11 класса' },
] as const

export async function generateMetadata(): Promise<Metadata> {
  const [settings, pageContent] = await Promise.all([getSiteSettings(), getPageContent()])
  const hero = pageContent.programsPage
  return buildPageMetadata(
    hero?.title || 'Каталог программ',
    settings.meta,
    hero?.subtitle || 'Программы обучения колледжа',
  )
}

export default async function ProgramsPage({ searchParams }: ProgramsPageProps) {
  const params = await searchParams
  const page = Number(params.page || 1)
  const [result, pageContent] = await Promise.all([
    getPublishedPrograms({
      category: params.category,
      studyForm: params.studyForm,
      base: params.base,
      q: params.q,
      page,
      limit: 12,
    }),
    getPageContent(),
  ])

  const hero = pageContent.programsPage

  const buildHref = (overrides: Record<string, string | undefined>) => {
    const query = new URLSearchParams()
    const values = { ...params, ...overrides, page: overrides.page ?? String(page) }

    Object.entries(values).forEach(([key, value]) => {
      if (value) query.set(key, value)
    })

    const qs = query.toString()
    return qs ? `/programs?${qs}` : '/programs'
  }

  return (
    <>
      <PageHero title={hero?.title || 'Каталог программ'} subtitle={hero?.subtitle} />

      <Container className="flex flex-col gap-6 py-8 md:gap-8 md:py-10">
        <form action="/programs" method="get" className="flex flex-col gap-4">
          <Input
            type="search"
            name="q"
            defaultValue={params.q}
            placeholder="Поиск по названию программы"
            className="max-w-md"
          />
          {params.category ? <input type="hidden" name="category" value={params.category} /> : null}
          {params.studyForm ? <input type="hidden" name="studyForm" value={params.studyForm} /> : null}
          {params.base ? <input type="hidden" name="base" value={params.base} /> : null}
        </form>

        <div className="inline-flex w-full flex-wrap gap-1 rounded-lg bg-muted p-1">
          {CATEGORIES.map((tab) => {
            const isActive = (params.category || undefined) === tab.value

            return (
              <Link
                key={tab.label}
                href={buildHref({ category: tab.value, page: '1' })}
                className={cn(
                  'inline-flex h-9 flex-1 items-center justify-center rounded-md px-4 text-sm transition-colors sm:flex-none',
                  isActive
                    ? 'bg-background font-medium text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {BASES.map((item) => (
              <FilterChip
                key={item.label}
                href={buildHref({ base: item.value, page: '1' })}
                label={item.label}
                active={(params.base || undefined) === item.value}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {STUDY_FORMS.map((item) => (
              <FilterChip
                key={item.label}
                href={buildHref({ studyForm: item.value, page: '1' })}
                label={STUDY_FORM_LABELS[item.value ?? ''] || item.label}
                active={(params.studyForm || undefined) === item.value}
              />
            ))}
          </div>
        </div>

        {result.docs.length ? (
          <ProgramGrid programs={result.docs} showHeader={false} layout="list" embedded />
        ) : (
          <Alert>
            <AlertTitle>Программы не найдены</AlertTitle>
            <AlertDescription>Попробуйте изменить фильтры или поисковый запрос.</AlertDescription>
          </Alert>
        )}

        {result.totalPages > 1 ? (
          <Pagination>
            <PaginationContent>
              {result.hasPrevPage ? (
                <PaginationItem>
                  <PaginationPrevious href={buildHref({ page: String(page - 1) })} />
                </PaginationItem>
              ) : null}
              {Array.from({ length: result.totalPages }).map((_, index) => {
                const pageNumber = index + 1
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={buildHref({ page: String(pageNumber) })}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              {result.hasNextPage ? (
                <PaginationItem>
                  <PaginationNext href={buildHref({ page: String(page + 1) })} />
                </PaginationItem>
              ) : null}
            </PaginationContent>
          </Pagination>
        ) : null}
      </Container>
    </>
  )
}
