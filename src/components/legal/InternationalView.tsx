import { InfoEmpty, InfoSection } from '@/components/legal/InfoSection'
import { formatDate } from '@/components/legal/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AGREEMENT_STATUS_LABELS } from '@/lib/constants'
import type { LegalInternational } from '@/payload-types'

type InternationalViewProps = {
  data: LegalInternational
}

export function InternationalView({ data }: InternationalViewProps) {
  const hasAgreements = Boolean(data.agreements?.length)
  const hasAccreditation = Boolean(data.internationalAccreditation?.length)

  if (!hasAgreements && !hasAccreditation) {
    return <InfoEmpty>Данные о международном сотрудничестве не заполнены.</InfoEmpty>
  }

  return (
    <div className="flex flex-col gap-8">
      {hasAgreements ? (
        <InfoSection title="Договоры с иностранными и международными организациями">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Организация</TableHead>
                <TableHead>Страна</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Описание</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.agreements!.map((agreement, index) => (
                <TableRow key={agreement.id || index}>
                  <TableCell className="whitespace-normal">{agreement.partnerName}</TableCell>
                  <TableCell>{agreement.country || '—'}</TableCell>
                  <TableCell>
                    {agreement.status ? AGREEMENT_STATUS_LABELS[agreement.status] || agreement.status : '—'}
                  </TableCell>
                  <TableCell className="whitespace-normal">{agreement.description || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoSection>
      ) : null}

      {hasAccreditation ? (
        <InfoSection title="Международная аккредитация программ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Программа</TableHead>
                <TableHead>Аккредитующий орган</TableHead>
                <TableHead>Действует до</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.internationalAccreditation!.map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell className="whitespace-normal">{item.programName}</TableCell>
                  <TableCell>{item.accreditationBody || '—'}</TableCell>
                  <TableCell>{formatDate(item.validUntil)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoSection>
      ) : null}
    </div>
  )
}
