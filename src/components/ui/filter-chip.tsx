import Link from 'next/link'

import { cn } from '@/lib/utils'

type FilterChipProps = {
  href: string
  label: string
  active?: boolean
  className?: string
}

export function FilterChip({ href, label, active, className }: FilterChipProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-8 items-center rounded-lg border px-3 text-sm transition-colors',
        active
          ? 'border-border bg-muted font-medium text-foreground'
          : 'border-border bg-transparent text-muted-foreground hover:bg-muted/50',
        className,
      )}
    >
      {label}
    </Link>
  )
}
