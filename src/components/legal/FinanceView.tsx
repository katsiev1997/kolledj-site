import { DocumentLink } from '@/components/legal/DocumentLink'
import { InfoEmpty, InfoSection } from '@/components/legal/InfoSection'
import { formatCurrency } from '@/components/legal/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FUNDING_SOURCE_LABELS } from '@/lib/constants'
import type { LegalFinance } from '@/payload-types'

type FinanceViewProps = {
  data: LegalFinance
}

export function FinanceView({ data }: FinanceViewProps) {
  if (!data.yearlyReports?.length) {
    return <InfoEmpty>Данные о финансово-хозяйственной деятельности не заполнены.</InfoEmpty>
  }

  return (
    <div className="flex flex-col gap-8">
      {data.yearlyReports.map((report, index) => (
        <InfoSection key={report.id || index} title={`Отчёт за ${report.year} год`}>
          <div className="flex flex-col gap-6">
            {report.activityVolumes?.length ? (
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium text-foreground">Объёмы деятельности по источникам</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Источник</TableHead>
                      <TableHead>Объём</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.activityVolumes.map((volume, volIndex) => (
                      <TableRow key={volume.id || volIndex}>
                        <TableCell>{FUNDING_SOURCE_LABELS[volume.fundingSource] || volume.fundingSource}</TableCell>
                        <TableCell>{formatCurrency(volume.volume)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : null}

            <dl className="grid gap-2 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Поступление средств</p>
                <p className="text-sm font-medium text-foreground">{formatCurrency(report.income)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Расходование средств</p>
                <p className="text-sm font-medium text-foreground">{formatCurrency(report.expenses)}</p>
              </div>
            </dl>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">План фин.-хоз. деятельности / смета</p>
              <DocumentLink document={report.planDocument} />
            </div>
          </div>
        </InfoSection>
      ))}
    </div>
  )
}
