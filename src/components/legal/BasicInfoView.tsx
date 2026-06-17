import { InfoEmpty, InfoRow, InfoSection } from '@/components/legal/InfoSection'
import { formatDate } from '@/components/legal/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Campus, LegalBasicInfo } from '@/payload-types'

type BasicInfoViewProps = {
  data: LegalBasicInfo
  campuses: Campus[]
}

export function BasicInfoView({ data, campuses }: BasicInfoViewProps) {
  const mainAddress = campuses.map((c) => c.address).filter(Boolean).join('; ')

  return (
    <div className="flex flex-col gap-8">
      <dl>
        <InfoRow label="Полное наименование" value={data.fullName} />
        <InfoRow label="Сокращённое наименование" value={data.shortName} />
        <InfoRow label="Дата создания" value={formatDate(data.createdAt)} />
        <InfoRow label="Учредитель" value={data.founder} />
        <InfoRow label="Режим и график работы" value={data.workingHours} />
        {mainAddress ? <InfoRow label="Адрес" value={mainAddress} /> : null}
      </dl>

      {data.branches?.length ? (
        <InfoSection title="Филиалы и представительства">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Сайт</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.branches.map((branch, index) => (
                <TableRow key={branch.id || index}>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell className="whitespace-normal">{branch.address || '—'}</TableCell>
                  <TableCell>
                    {branch.website ? (
                      <a href={branch.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {branch.website}
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

      {data.educationLocations?.length ? (
        <InfoSection title="Места осуществления образовательной деятельности">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Адрес</TableHead>
                <TableHead>Не в реестре лицензий</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.educationLocations.map((location, index) => (
                <TableRow key={location.id || index}>
                  <TableCell className="whitespace-normal">{location.address}</TableCell>
                  <TableCell>{location.notInLicenseRegistry ? 'Да' : 'Нет'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfoSection>
      ) : null}

      {data.contacts?.phones?.length || data.contacts?.emails?.length ? (
        <InfoSection title="Контакты">
          <dl>
            {data.contacts.phones?.map((phone, index) => (
              <InfoRow
                key={phone.id || index}
                label={phone.label || 'Телефон'}
                value={
                  <a href={`tel:${phone.number.replace(/\s/g, '')}`} className="hover:text-primary">
                    {phone.number}
                  </a>
                }
              />
            ))}
            {data.contacts.emails?.map((email, index) => (
              <InfoRow
                key={email.id || index}
                label={email.label || 'Email'}
                value={
                  <a href={`mailto:${email.address}`} className="hover:text-primary">
                    {email.address}
                  </a>
                }
              />
            ))}
          </dl>
        </InfoSection>
      ) : (
        <InfoEmpty>Контактные данные не заполнены.</InfoEmpty>
      )}
    </div>
  )
}
