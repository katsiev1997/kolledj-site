import Link from 'next/link'

import { ProgramCard } from '@/components/cards/ProgramCard'
import { Container } from '@/components/layout/Container'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { cn } from '@/lib/utils'
import type { Program } from '@/payload-types'

type ProgramGridProps = {
  programs: Program[]
  title?: string | null
  actionLabel?: string | null
  actionHref?: string
  showHeader?: boolean
  layout?: 'grid' | 'list'
  embedded?: boolean
}

export function ProgramGrid({
  programs,
  title = 'Программы обучения',
  actionLabel,
  actionHref = '/programs',
  showHeader = true,
  layout = 'grid',
  embedded = false,
}: ProgramGridProps) {
  if (!programs.length) return null

  const content = (
    <>
      {showHeader ? (
        <SectionHeader
          title={title || 'Программы обучения'}
          actionLabel={actionLabel}
          actionHref={actionLabel ? actionHref : undefined}
        />
      ) : null}
      <div
        className={cn(
          layout === 'grid'
            ? 'grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3'
            : 'flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6',
        )}
      >
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
    </>
  )

  if (embedded) {
    return <div className="flex flex-col gap-6">{content}</div>
  }

  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-6 md:gap-10">{content}</Container>
    </section>
  )
}
