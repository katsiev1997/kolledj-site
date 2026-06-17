import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalAccessibleEnvironment: GlobalConfig = {
  slug: 'legal-accessible-environment',
  label: 'Доступная среда',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Адаптированные условия',
      fields: [
        {
          name: 'title',
          type: 'select',
          label: 'Тип',
          required: true,
          options: [
            { label: 'Учебные кабинеты', value: 'classrooms' },
            { label: 'Практика', value: 'practice' },
            { label: 'Библиотека', value: 'library' },
            { label: 'Спорт', value: 'sport' },
            { label: 'Средства обучения', value: 'teaching-aids' },
            { label: 'Беспрепятственный вход', value: 'entrance' },
            { label: 'Питание', value: 'catering' },
            { label: 'Охрана здоровья', value: 'health' },
            { label: 'ИС и ЭОР', value: 'it-eor' },
            { label: 'Спецсредства', value: 'special-equipment' },
            { label: 'Общежитие / интернат', value: 'dormitory' },
          ],
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Описание',
        },
        {
          name: 'adaptedPlacesCount',
          type: 'number',
          label: 'Количество адаптированных мест',
          min: 0,
        },
      ],
    },
  ],
}
