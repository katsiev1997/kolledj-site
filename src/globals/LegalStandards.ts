import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalStandards: GlobalConfig = {
  slug: 'legal-standards',
  label: 'Образовательные стандарты и требования',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'federalStandards',
      type: 'array',
      label: 'ФГОС / федеральные требования',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'document',
          type: 'relationship',
          relationTo: 'documents',
          label: 'Документ',
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'Ссылка на официальный ресурс',
        },
      ],
    },
    {
      name: 'ownStandards',
      type: 'array',
      label: 'Собственные стандарты и требования',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'document',
          type: 'relationship',
          relationTo: 'documents',
          label: 'Документ',
        },
      ],
    },
  ],
}
