'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LEGAL_NAV } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function LegalSidebar() {
  const pathname = usePathname()

  return (
    <nav aria-label="Сведения об образовательной организации" className="flex flex-col gap-1">
      <Link
        href="/svedeniya"
        className={cn(
          'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
          pathname === '/svedeniya' ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground',
        )}
      >
        Оглавление
      </Link>
      {LEGAL_NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
            pathname === item.href || pathname.startsWith(`${item.href}/`)
              ? 'bg-muted font-medium text-foreground'
              : 'text-muted-foreground',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
