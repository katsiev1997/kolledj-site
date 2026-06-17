import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'

export default function ProgramNotFound() {
  return (
    <Container className="flex flex-col items-start gap-4 py-20">
      <h1 className="text-2xl font-semibold text-foreground">Программа не найдена</h1>
      <p className="text-muted-foreground">Возможно, программа была удалена или ещё не опубликована.</p>
      <Button asChild>
        <Link href="/programs">Вернуться в каталог</Link>
      </Button>
    </Container>
  )
}
