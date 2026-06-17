'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ApplicationDialog } from '@/components/forms/ApplicationDialog'
import { Button } from '@/components/ui/button'
import { MAIN_NAV } from '@/lib/constants'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type MobileNavProps = {
  trigger: React.ReactNode
  phone?: string | null
  applicationButton?: string
  menuTitle?: string | null
  privacyPageSlug?: string
}

export function MobileNav({
  trigger,
  phone,
  applicationButton = 'Оставить заявку',
  menuTitle = 'Меню',
  privacyPageSlug,
}: MobileNavProps) {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>{menuTitle}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-foreground hover:bg-muted',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        {phone ? (
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-foreground">
            {phone}
          </a>
        ) : null}
        <ApplicationDialog
          trigger={<Button className="w-full">{applicationButton}</Button>}
          type="consultation"
          privacyPageSlug={privacyPageSlug}
        />
      </SheetContent>
    </Sheet>
  )
}
