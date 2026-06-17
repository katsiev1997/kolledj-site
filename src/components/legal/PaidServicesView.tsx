import { DocumentLink } from '@/components/legal/DocumentLink'
import { InfoEmpty, InfoSection } from '@/components/legal/InfoSection'
import { formatCurrency } from '@/components/legal/utils'
import { RichText } from '@/components/rich-text/RichText'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { LegalPaidService, Program } from '@/payload-types'

type PaidServicesViewProps = {
  data: LegalPaidService
  programs: Program[]
}

export function PaidServicesView({ data, programs }: PaidServicesViewProps) {
  const pricedPrograms = programs.filter((p) => p.price != null)

  return (
    <div className="flex flex-col gap-8">
      <InfoSection title="Документы">
        <dl className="flex flex-col gap-3">
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Порядок оказания платных услуг</p>
            <DocumentLink document={data.procedureDocument} />
          </div>
          <div>
            <p className="mb-1 text-sm text-muted-foreground">Образец договора</p>
            <DocumentLink document={data.contractSample} />
          </div>
        </dl>
      </InfoSection>

      {data.notes ? (
        <InfoSection title="Примечания">
          <div className="text-sm text-foreground">
            <RichText data={data.notes} />
          </div>
        </InfoSection>
      ) : null}

      {pricedPrograms.length ? (
        <InfoSection title="Утверждённая стоимость по программам">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Программа</TableHead>
                <TableHead>Стоимость</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricedPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell className="whitespace-normal">{program.title}</TableCell>
                  <TableCell>{formatCurrency(program.price)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoSection>
      ) : (
        <InfoEmpty>Стоимость платных образовательных услуг по программам не указана.</InfoEmpty>
      )}
    </div>
  )
}
