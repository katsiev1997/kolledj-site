import { Container } from '@/components/layout/Container'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  title: string
  subtitle?: string | null
  className?: string
}

export function PageHero({ title, subtitle, className }: PageHeroProps) {
  return (
    <section className={cn('border-b border-border bg-muted/30', className)}>
      <Container className="flex flex-col gap-2 py-8 md:gap-3 md:py-10">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h1>
        {subtitle ? (
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{subtitle}</p>
        ) : null}
      </Container>
    </section>
  )
}
