import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalScholarships: GlobalConfig = {
  slug: 'legal-scholarships',
  label: 'Стипендии и меры поддержки',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'scholarships',
      type: 'array',
      label: 'Стипендии',
      fields: [
        { name: 'name', type: 'text', label: 'Название', required: true },
        { name: 'conditions', type: 'richText', label: 'Условия' },
      ],
    },
    {
      name: 'socialSupport',
      type: 'richText',
      label: 'Социальная поддержка',
    },
    {
      name: 'dormitory',
      type: 'group',
      label: 'Общежитие / интернат',
      fields: [
        {
          name: 'available',
          type: 'checkbox',
          label: 'Предоставляется',
        },
        {
          name: 'placesForNonResidents',
          type: 'number',
          label: 'Мест для иногородних',
          min: 0,
        },
        {
          name: 'paymentProcedure',
          type: 'textarea',
          label: 'Порядок формирования платы за проживание',
        },
      ],
    },
  ],
}
