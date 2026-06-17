'use client'

import { DocumentLink } from '@/components/legal/DocumentLink'
import { InfoEmpty, InfoRow, InfoSection } from '@/components/legal/InfoSection'
import { formatDate, formatNumber, getDocumentHref, getFileHref } from '@/components/legal/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  FUNDING_SOURCE_LABELS,
  PROGRAM_DOCUMENT_TYPE_LABELS,
  STUDY_FORM_LABELS,
} from '@/lib/constants'
import type { Program } from '@/payload-types'

type EducationViewProps = {
  programs: Program[]
}

export function EducationView({ programs }: EducationViewProps) {
  if (!programs.length) {
    return <InfoEmpty>Образовательные программы не опубликованы.</InfoEmpty>
  }

  return (
    <Accordion type="multiple" className="w-full">
      {programs.map((program) => (
        <AccordionItem key={program.id} value={program.id}>
          <AccordionTrigger className="text-base">{program.title}</AccordionTrigger>
          <AccordionContent>
            <ProgramLegalDetails program={program} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function ProgramLegalDetails({ program }: { program: Program }) {
  const legal = program.legal

  return (
    <div className="flex flex-col gap-6">
      <dl>
        <InfoRow
          label="Формы обучения"
          value={program.studyForms?.map((f) => STUDY_FORM_LABELS[f] || f).join(', ')}
        />
        <InfoRow label="Срок обучения" value={program.duration} />
        <InfoRow label="Язык обучения" value={legal?.languageOfInstruction} />
        <InfoRow label="Код специальности" value={legal?.specialtyCode} />
        <InfoRow label="Название специальности" value={legal?.specialtyName} />
        <InfoRow label="Срок действия аккредитации" value={formatDate(legal?.accreditationValidUntil)} />
        <InfoRow label="Используются ЭО и ДОТ" value={legal?.usesDistanceTechnologies ? 'Да' : 'Нет'} />
        {legal?.usesDistanceTechnologies && legal.distanceTechnologiesDescription ? (
          <InfoRow label="Описание ЭО/ДОТ" value={legal.distanceTechnologiesDescription} />
        ) : null}
        <InfoRow label="Лицензия" value={<DocumentLink document={legal?.licenseDocument} />} />
      </dl>

      {legal?.disciplines ? (
        <InfoSection title="Перечень дисциплин, модулей, практики">
          <p className="whitespace-pre-wrap text-sm text-foreground">{legal.disciplines}</p>
        </InfoSection>
      ) : null}

      {legal?.programDocuments?.length ? (
        <InfoSection title="Документы программы">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Тип</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Файл</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {legal.programDocuments.map((doc, index) => {
                const docHref = getDocumentHref(typeof doc.document === 'object' ? doc.document : null)
                const fileHref = getFileHref(typeof doc.file === 'object' ? doc.file : null)
                const href = docHref || fileHref

                return (
                  <TableRow key={doc.id || index}>
                    <TableCell>{PROGRAM_DOCUMENT_TYPE_LABELS[doc.type] || doc.type}</TableCell>
                    <TableCell className="whitespace-normal">{doc.title}</TableCell>
                    <TableCell>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Открыть
                        </a>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </InfoSection>
      ) : null}

      {legal?.studentCounts?.length ? (
        <InfoSection title="Численность обучающихся">
          {legal.studentCounts.map((yearBlock, index) => (
            <div key={yearBlock.id || index} className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground">{yearBlock.year} год</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Источник финансирования</TableHead>
                    <TableHead>Количество</TableHead>
                    <TableHead>Иностранные граждане</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearBlock.rows?.map((row, rowIndex) => (
                    <TableRow key={row.id || rowIndex}>
                      <TableCell>{FUNDING_SOURCE_LABELS[row.fundingSource] || row.fundingSource}</TableCell>
                      <TableCell>{formatNumber(row.count)}</TableCell>
                      <TableCell>{formatNumber(row.foreignCitizens)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </InfoSection>
      ) : null}

      {legal?.admissionResults?.length ? (
        <InfoSection title="Результаты приёма">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Год</TableHead>
                <TableHead>Источник</TableHead>
                <TableHead>Принято</TableHead>
                <TableHead>Средний балл</TableHead>
                <TableHead>Переведено</TableHead>
                <TableHead>Отчислено</TableHead>
                <TableHead>Восстановлено</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {legal.admissionResults.map((row, index) => (
                <TableRow key={row.id || index}>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{FUNDING_SOURCE_LABELS[row.fundingSource] || row.fundingSource}</TableCell>
                  <TableCell>{formatNumber(row.admittedCount)}</TableCell>
                  <TableCell>{row.averageScore ?? '—'}</TableCell>
                  <TableCell>{formatNumber(row.transferredCount)}</TableCell>
                  <TableCell>{formatNumber(row.expelledCount)}</TableCell>
                  <TableCell>{formatNumber(row.restoredCount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoSection>
      ) : null}
    </div>
  )
}
