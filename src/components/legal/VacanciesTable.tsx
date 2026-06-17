import { InfoEmpty } from '@/components/legal/InfoSection'
import { formatNumber } from '@/components/legal/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FUNDING_SOURCE_LABELS } from '@/lib/constants'
import type { Program, Vacancy } from '@/payload-types'

type VacanciesTableProps = {
  vacancies: Vacancy[]
}

export function VacanciesTable({ vacancies }: VacanciesTableProps) {
  if (!vacancies.length) {
    return <InfoEmpty>Данные о вакантных местах не заполнены.</InfoEmpty>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Программа</TableHead>
          <TableHead>Учебный год</TableHead>
          <TableHead>Источник финансирования</TableHead>
          <TableHead>Мест для приёма</TableHead>
          <TableHead>Мест для перевода</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacancies.map((vacancy) => {
          const programTitle =
            typeof vacancy.program === 'object' && vacancy.program
              ? (vacancy.program as Program).title
              : '—'

          return (
            <TableRow key={vacancy.id}>
              <TableCell className="whitespace-normal">{programTitle}</TableCell>
              <TableCell>{vacancy.academicYear}</TableCell>
              <TableCell>{FUNDING_SOURCE_LABELS[vacancy.fundingSource] || vacancy.fundingSource}</TableCell>
              <TableCell>{formatNumber(vacancy.placesForAdmission)}</TableCell>
              <TableCell>{formatNumber(vacancy.placesForTransfer)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
