import type { ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { LegalSidebar } from '@/components/legal/LegalSidebar'
import { INFO_BASE } from '@/lib/constants'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type LegalLayoutProps = {
  title: string
  children: ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function LegalLayout({ title, children, breadcrumbs = [] }: LegalLayoutProps) {
  return (
    <Container as="article" className="py-10" data-legal-section>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={INFO_BASE}>Сведения об организации</BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.label} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <LegalSidebar />
        </aside>
        <div className="flex min-w-0 flex-col gap-6">
          <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
          {children}
        </div>
      </div>
    </Container>
  )
}
