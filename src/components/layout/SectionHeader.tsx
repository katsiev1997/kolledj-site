import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  title: string
  actionLabel?: string | null
  actionHref?: string
  className?: string
}

export function SectionHeader({ title, actionLabel, actionHref, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
      {actionLabel && actionHref ? (
        <Button asChild variant="outline" className="shrink-0">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  )
}
