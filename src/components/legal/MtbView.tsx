import { InfoEmpty, InfoSection } from '@/components/legal/InfoSection'
import { RichText } from '@/components/rich-text/RichText'
import { MTB_SECTION_LABELS } from '@/lib/constants'
import type { LegalMtb } from '@/payload-types'

type MtbViewProps = {
  data: LegalMtb
}

export function MtbView({ data }: MtbViewProps) {
  if (!data.sections?.length) {
    return <InfoEmpty>Данные о материально-техническом обеспечении не заполнены.</InfoEmpty>
  }

  return (
    <div className="flex flex-col gap-6">
      {data.sections.map((section, index) => (
        <InfoSection key={section.id || index} title={MTB_SECTION_LABELS[section.title] || section.title}>
          {section.description ? (
            <div className="text-sm text-foreground">
              <RichText data={section.description} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Описание не заполнено.</p>
          )}
        </InfoSection>
      ))}
    </div>
  )
}
