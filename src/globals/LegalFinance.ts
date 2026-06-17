import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalFinance: GlobalConfig = {
  slug: 'legal-finance',
  label: 'Финансово-хозяйственная деятельность',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'yearlyReports',
      type: 'array',
      label: 'Отчёты по годам',
      fields: [
        {
          name: 'year',
          type: 'number',
          label: 'Год',
          required: true,
        },
        {
          name: 'activityVolumes',
          type: 'array',
          label: 'Объёмы деятельности по источникам',
          fields: [
            {
              name: 'fundingSource',
              type: 'select',
              label: 'Источник',
              required: true,
              options: [
                { label: 'Федеральный бюджет', value: 'federal' },
                { label: 'Бюджет субъекта РФ', value: 'regional' },
                { label: 'Местный бюджет', value: 'local' },
                { label: 'Платные договоры', value: 'paid' },
              ],
            },
            {
              name: 'volume',
              type: 'number',
              label: 'Объём (руб.)',
              min: 0,
            },
          ],
        },
        {
          name: 'income',
          type: 'number',
          label: 'Поступление средств (руб.)',
          min: 0,
        },
        {
          name: 'expenses',
          type: 'number',
          label: 'Расходование средств (руб.)',
          min: 0,
        },
        {
          name: 'planDocument',
          type: 'relationship',
          relationTo: 'documents',
          label: 'План фин.-хоз. деятельности / смета',
        },
      ],
    },
  ],
}
