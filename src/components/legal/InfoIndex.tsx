import Link from 'next/link'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LEGAL_NAV } from '@/lib/constants'
import type { LegalBasicInfo } from '@/payload-types'
import { InfoRow } from '@/components/legal/InfoSection'
import { formatDate } from '@/components/legal/utils'

type InfoIndexProps = {
  basicInfo?: LegalBasicInfo | null
}

export function InfoIndex({ basicInfo }: InfoIndexProps) {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-muted-foreground">
        Обязательная информация об образовательной организации в соответствии с требованиями
        законодательства Российской Федерации.
      </p>

      {basicInfo?.fullName ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Краткие сведения</CardTitle>
          </CardHeader>
          <CardContent>
            <dl>
              <InfoRow label="Полное наименование" value={basicInfo.fullName} />
              {basicInfo.shortName ? (
                <InfoRow label="Сокращённое наименование" value={basicInfo.shortName} />
              ) : null}
              {basicInfo.createdAt ? (
                <InfoRow label="Дата создания" value={formatDate(basicInfo.createdAt)} />
              ) : null}
              {basicInfo.founder ? <InfoRow label="Учредитель" value={basicInfo.founder} /> : null}
            </dl>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {LEGAL_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border border-border p-4 text-sm transition-colors hover:bg-muted"
          >
            <span className="font-medium text-foreground">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
