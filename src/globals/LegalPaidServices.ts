import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalPaidServices: GlobalConfig = {
  slug: 'legal-paid-services',
  label: 'Платные образовательные услуги',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'procedureDocument',
      type: 'relationship',
      relationTo: 'documents',
      label: 'Порядок оказания платных услуг',
    },
    {
      name: 'contractSample',
      type: 'relationship',
      relationTo: 'documents',
      label: 'Образец договора',
    },
    {
      name: 'notes',
      type: 'richText',
      label: 'Примечания',
    },
  ],
}
