import { DocumentLink } from '@/components/legal/DocumentLink'
import { InfoEmpty, InfoSection } from '@/components/legal/InfoSection'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { LegalStructure } from '@/payload-types'

type StructureViewProps = {
  data: LegalStructure
}

export function StructureView({ data }: StructureViewProps) {
  if (!data.units?.length) {
    return <InfoEmpty>Структура и органы управления не заполнены.</InfoEmpty>
  }

  return (
    <InfoSection title="Подразделения и органы управления">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Руководитель</TableHead>
            <TableHead>Должность</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead>Контакты</TableHead>
            <TableHead>Положение</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.units.map((unit, index) => (
            <TableRow key={unit.id || index}>
              <TableCell className="whitespace-normal font-medium">{unit.name}</TableCell>
              <TableCell>{unit.headFullName || '—'}</TableCell>
              <TableCell className="whitespace-normal">{unit.headPosition || '—'}</TableCell>
              <TableCell className="whitespace-normal">{unit.address || '—'}</TableCell>
              <TableCell className="whitespace-normal">
                <div className="flex flex-col gap-1">
                  {unit.email ? (
                    <a href={`mailto:${unit.email}`} className="text-primary hover:underline">
                      {unit.email}
                    </a>
                  ) : null}
                  {unit.website ? (
                    <a href={unit.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {unit.website}
                    </a>
                  ) : null}
                  {!unit.email && !unit.website ? '—' : null}
                </div>
              </TableCell>
              <TableCell>
                <DocumentLink document={unit.regulationDoc} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </InfoSection>
  )
}
