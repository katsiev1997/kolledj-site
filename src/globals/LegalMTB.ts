import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalMTB: GlobalConfig = {
  slug: 'legal-mtb',
  label: 'Материально-техническое обеспечение',
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
      label: 'Разделы',
      fields: [
        {
          name: 'title',
          type: 'select',
          label: 'Тип',
          required: true,
          options: [
            { label: 'Учебные кабинеты', value: 'classrooms' },
            { label: 'Объекты для практики', value: 'practice' },
            { label: 'Библиотека', value: 'library' },
            { label: 'Спорт', value: 'sport' },
            { label: 'Средства обучения', value: 'teaching-aids' },
            { label: 'Питание', value: 'catering' },
            { label: 'Охрана здоровья', value: 'health' },
            { label: 'Доступ к ИС и сетям', value: 'it-access' },
            { label: 'Электронные образовательные ресурсы', value: 'eor' },
          ],
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Описание',
        },
      ],
    },
  ],
}
