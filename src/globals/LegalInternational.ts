import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalInternational: GlobalConfig = {
  slug: 'legal-international',
  label: 'Международное сотрудничество',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'agreements',
      type: 'array',
      label: 'Договоры',
      fields: [
        {
          name: 'partnerName',
          type: 'text',
          label: 'Организация-партнёр',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          label: 'Страна',
        },
        {
          name: 'status',
          type: 'select',
          label: 'Статус',
          options: [
            { label: 'Заключён', value: 'signed' },
            { label: 'Планируется', value: 'planned' },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
        },
      ],
    },
    {
      name: 'internationalAccreditation',
      type: 'array',
      label: 'Международная аккредитация программ',
      fields: [
        {
          name: 'programName',
          type: 'text',
          label: 'Программа',
          required: true,
        },
        {
          name: 'accreditationBody',
          type: 'text',
          label: 'Аккредитующий орган',
        },
        {
          name: 'validUntil',
          type: 'date',
          label: 'Действует до',
        },
      ],
    },
  ],
}
