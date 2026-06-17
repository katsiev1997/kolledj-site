import { InfoEmpty, InfoSection } from '@/components/legal/InfoSection'
import { formatNumber } from '@/components/legal/utils'
import { RichText } from '@/components/rich-text/RichText'
import { ACCESSIBLE_SECTION_LABELS } from '@/lib/constants'
import type { LegalAccessibleEnvironment } from '@/payload-types'

type AccessibleEnvironmentViewProps = {
  data: LegalAccessibleEnvironment
}

export function AccessibleEnvironmentView({ data }: AccessibleEnvironmentViewProps) {
  if (!data.sections?.length) {
    return <InfoEmpty>Данные о доступной среде не заполнены.</InfoEmpty>
  }

  return (
    <div className="flex flex-col gap-6">
      {data.sections.map((section, index) => (
        <InfoSection key={section.id || index} title={ACCESSIBLE_SECTION_LABELS[section.title] || section.title}>
          {section.description ? (
            <div className="text-sm text-foreground">
              <RichText data={section.description} />
            </div>
          ) : null}
          {section.adaptedPlacesCount != null ? (
            <p className="text-sm text-muted-foreground">
              Адаптированных мест: {formatNumber(section.adaptedPlacesCount)}
            </p>
          ) : null}
        </InfoSection>
      ))}
    </div>
  )
}
