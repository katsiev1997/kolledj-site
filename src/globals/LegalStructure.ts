import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalStructure: GlobalConfig = {
  slug: 'legal-structure',
  label: 'Структура и органы управления',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'units',
      type: 'array',
      label: 'Подразделения и органы управления',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'headFullName',
          type: 'text',
          label: 'ФИО руководителя',
        },
        {
          name: 'headPosition',
          type: 'text',
          label: 'Должность руководителя',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Адрес',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'website',
          type: 'text',
          label: 'Сайт',
        },
        {
          name: 'regulationDoc',
          type: 'relationship',
          relationTo: 'documents',
          label: 'Положение (электронный документ)',
        },
      ],
    },
  ],
}
