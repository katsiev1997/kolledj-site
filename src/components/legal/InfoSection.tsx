import type { ReactNode } from 'react'

type InfoSectionProps = {
  title: string
  children: ReactNode
}

export function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-medium text-foreground">{title}</h2>
      {children}
    </section>
  )
}

type InfoRowProps = {
  label: string
  value: ReactNode
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="grid gap-1 border-b border-border py-3 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value || '—'}</dd>
    </div>
  )
}

export function InfoEmpty({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}
