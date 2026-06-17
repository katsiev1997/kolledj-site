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
import type { LegalStandard } from '@/payload-types'

type StandardsViewProps = {
  data: LegalStandard
}

export function StandardsView({ data }: StandardsViewProps) {
  const hasFederal = Boolean(data.federalStandards?.length)
  const hasOwn = Boolean(data.ownStandards?.length)

  if (!hasFederal && !hasOwn) {
    return <InfoEmpty>Данные об образовательных стандартах и требованиях не заполнены.</InfoEmpty>
  }

  return (
    <div className="flex flex-col gap-8">
      {hasFederal ? (
        <InfoSection title="ФГОС / федеральные требования">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Документ</TableHead>
                <TableHead>Официальный ресурс</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.federalStandards!.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell className="whitespace-normal">{item.title}</TableCell>
                  <TableCell>
                    <DocumentLink document={item.document} />
                  </TableCell>
                  <TableCell>
                    {item.externalUrl ? (
                      <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Перейти
                      </a>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoSection>
      ) : null}

      {hasOwn ? (
        <InfoSection title="Собственные стандарты и требования">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Документ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.ownStandards!.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell className="whitespace-normal">{item.title}</TableCell>
                  <TableCell>
                    <DocumentLink document={item.document} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoSection>
      ) : null}
    </div>
  )
}
