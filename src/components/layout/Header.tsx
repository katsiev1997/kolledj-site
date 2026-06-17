'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconMenu2 } from '@tabler/icons-react'

import { ApplicationDialog } from '@/components/forms/ApplicationDialog'
import { Container } from '@/components/layout/Container'
import { MobileNav } from '@/components/layout/MobileNav'
import { Button } from '@/components/ui/button'
import { MAIN_NAV } from '@/lib/constants'
import { cn } from '@/lib/utils'
import type { SiteSetting } from '@/payload-types'

type HeaderProps = {
  settings: SiteSetting
}

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname()
  const phone = settings.phones?.[0]?.number
  const orgName = settings.organizationShortName || settings.organizationName
  const applicationButton = settings.uiLabels?.applicationButton || 'Оставить заявку'

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-base font-semibold text-foreground">
            {orgName}
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground',
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {phone ? (
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="hidden text-sm text-foreground md:block">
              {phone}
            </a>
          ) : null}
          <ApplicationDialog
            trigger={<Button size="sm">{applicationButton}</Button>}
            type="consultation"
            privacyPageSlug={
              typeof settings.privacyPolicyPage === 'object' && settings.privacyPolicyPage
                ? settings.privacyPolicyPage.slug
                : undefined
            }
          />
          <MobileNav
            phone={phone}
            applicationButton={applicationButton}
            menuTitle={settings.uiLabels?.mobileMenuTitle}
            privacyPageSlug={
              typeof settings.privacyPolicyPage === 'object' && settings.privacyPolicyPage
                ? settings.privacyPolicyPage.slug
                : undefined
            }
            trigger={
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Открыть меню">
                <IconMenu2 />
              </Button>
            }
          />
        </div>
      </Container>
    </header>
  )
}
