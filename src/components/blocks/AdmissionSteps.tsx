import { Container } from '@/components/layout/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Homepage } from '@/payload-types'

type AdmissionStepsProps = {
  steps: Homepage['admissionSteps']
  title?: string | null
}

export function AdmissionSteps({ steps, title = 'Как поступить' }: AdmissionStepsProps) {
  if (!steps?.length) return null

  return (
    <section className="py-12 md:py-20">
      <Container className="flex flex-col gap-6 md:gap-10">
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{title}</h2>
        <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.id}>
              <CardHeader>
                <p className="text-sm font-semibold text-primary">Шаг {step.stepNumber}</p>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              {step.description ? (
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
