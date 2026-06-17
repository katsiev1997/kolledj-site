import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BASE_LABELS,
  PROGRAM_CATEGORY_LABELS,
  STUDY_FORM_LABELS,
} from '@/lib/constants'
import { getMediaAlt, getMediaUrl } from '@/lib/payload/media'
import type { Program } from '@/payload-types'

type ProgramCardProps = {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  const coverUrl = getMediaUrl(program.cover, 'card')

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {coverUrl ? (
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
          <Image
            src={coverUrl}
            alt={getMediaAlt(program.cover, program.title)}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}
      <CardHeader className="gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{PROGRAM_CATEGORY_LABELS[program.category]}</Badge>
          {program.studyForms?.map((form) => (
            <Badge key={form} variant="outline">
              {STUDY_FORM_LABELS[form]}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg">
          <Link href={`/programs/${program.slug}`} className="hover:text-primary">
            {program.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {program.shortDescription ? (
          <p className="text-sm text-muted-foreground">{program.shortDescription}</p>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-3 text-sm text-muted-foreground">
          {program.duration ? <span>{program.duration}</span> : null}
          {program.price != null ? <span>от {program.price.toLocaleString('ru-RU')} ₽</span> : null}
          {program.base?.map((base) => (
            <span key={base}>{BASE_LABELS[base]}</span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/programs/${program.slug}`}>Подробнее</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
