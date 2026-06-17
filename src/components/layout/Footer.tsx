import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Separator } from '@/components/ui/separator'
import { LEGAL_NAV, MAIN_NAV } from '@/lib/constants'
import type { SiteSetting } from '@/payload-types'

type FooterProps = {
  settings: SiteSetting
}

export function Footer({ settings }: FooterProps) {
  const privacySlug =
    typeof settings.privacyPolicyPage === 'object' && settings.privacyPolicyPage
      ? settings.privacyPolicyPage.slug
      : null

  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="flex flex-col gap-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold text-foreground">{settings.organizationName}</p>
            {settings.workingHours ? (
              <p className="text-sm text-muted-foreground">{settings.workingHours}</p>
            ) : null}
            {settings.phones?.map((phone) => (
              <a key={phone.number} href={`tel:${phone.number.replace(/\s/g, '')}`} className="text-sm text-foreground">
                {phone.label ? `${phone.label}: ` : ''}
                {phone.number}
              </a>
            ))}
            {settings.emails?.map((email) => (
              <a key={email.address} href={`mailto:${email.address}`} className="text-sm text-foreground">
                {email.label ? `${email.label}: ` : ''}
                {email.address}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">Навигация</p>
            <nav className="flex flex-col gap-2" aria-label="Навигация в подвале">
              {MAIN_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">Сведения об организации</p>
            <nav className="flex flex-col gap-2" aria-label="Сведения об организации">
              <Link href="/svedeniya" className="text-sm text-muted-foreground hover:text-foreground">
                Образовательная организация
              </Link>
              {LEGAL_NAV.slice(0, 6).map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {settings.organizationShortName || settings.organizationName}</p>
          {privacySlug ? (
            <Link href={`/pages/${privacySlug}`} className="hover:text-foreground">
              Политика конфиденциальности
            </Link>
          ) : null}
        </div>
      </Container>
    </footer>
  )
}
