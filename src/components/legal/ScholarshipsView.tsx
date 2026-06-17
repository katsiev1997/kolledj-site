import { InfoEmpty, InfoRow, InfoSection } from '@/components/legal/InfoSection'
import { formatNumber } from '@/components/legal/utils'
import { RichText } from '@/components/rich-text/RichText'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { LegalScholarship, Program } from '@/payload-types'

type ScholarshipsViewProps = {
  data: LegalScholarship
  programs: Program[]
}

export function ScholarshipsView({ data, programs }: ScholarshipsViewProps) {
  const employmentPrograms = programs.filter((p) => p.legal?.employmentStats?.length)

  const hasContent =
    Boolean(data.scholarships?.length) ||
    Boolean(data.socialSupport) ||
    Boolean(data.dormitory?.available) ||
    employmentPrograms.length > 0

  if (!hasContent) {
    return <InfoEmpty>Данные о стипендиях и мерах поддержки не заполнены.</InfoEmpty>
  }

  return (
    <div className="flex flex-col gap-8">
      {data.scholarships?.length ? (
        <InfoSection title="Стипендии">
          <div className="flex flex-col gap-4">
            {data.scholarships.map((scholarship, index) => (
              <div key={scholarship.id || index} className="rounded-lg border border-border p-4">
                <h3 className="mb-2 text-base font-medium text-foreground">{scholarship.name}</h3>
                {scholarship.conditions ? (
                  <div className="text-sm text-foreground">
                    <RichText data={scholarship.conditions} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </InfoSection>
      ) : null}

      {data.socialSupport ? (
        <InfoSection title="Социальная поддержка">
          <div className="text-sm text-foreground">
            <RichText data={data.socialSupport} />
          </div>
        </InfoSection>
      ) : null}

      {data.dormitory?.available ? (
        <InfoSection title="Общежитие / интернат">
          <dl>
            <InfoRow label="Предоставляется" value="Да" />
            <InfoRow label="Мест для иногородних" value={formatNumber(data.dormitory.placesForNonResidents)} />
            <InfoRow label="Порядок формирования платы" value={data.dormitory.paymentProcedure} />
          </dl>
        </InfoSection>
      ) : null}

      {employmentPrograms.length ? (
        <InfoSection title="Трудоустройство выпускников">
          {employmentPrograms.map((program) => (
            <div key={program.id} className="mb-6 flex flex-col gap-2">
              <h3 className="text-base font-medium text-foreground">{program.title}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Год выпуска</TableHead>
                    <TableHead>Выпускников</TableHead>
                    <TableHead>Трудоустроено</TableHead>
                    <TableHead>Процент</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {program.legal!.employmentStats!.map((stat, index) => (
                    <TableRow key={stat.id || index}>
                      <TableCell>{stat.year}</TableCell>
                      <TableCell>{formatNumber(stat.graduatesCount)}</TableCell>
                      <TableCell>{formatNumber(stat.employedCount)}</TableCell>
                      <TableCell>{stat.employmentRate != null ? `${stat.employmentRate}%` : '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </InfoSection>
      ) : null}
    </div>
  )
}
