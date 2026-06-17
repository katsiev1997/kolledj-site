import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'
import { revalidateFrontendGlobal } from '@/hooks/revalidateFrontend'

const pageHeroFields = (defaults: { title: string; subtitle?: string }) => [
  {
    name: 'title',
    type: 'text' as const,
    label: 'Заголовок',
    defaultValue: defaults.title,
    required: true,
  },
  {
    name: 'subtitle',
    type: 'textarea' as const,
    label: 'Подзаголовок',
    defaultValue: defaults.subtitle,
  },
]

export const PageContent: GlobalConfig = {
  slug: 'page-content',
  label: 'Тексты страниц',
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  hooks: {
    afterChange: [revalidateFrontendGlobal],
  },
  fields: [
    {
      name: 'programsPage',
      type: 'group',
      label: 'Каталог программ',
      fields: pageHeroFields({
        title: 'Каталог программ',
        subtitle: 'Выберите программу обучения по интересующим параметрам',
      }),
    },
    {
      name: 'faqPage',
      type: 'group',
      label: 'FAQ',
      fields: pageHeroFields({
        title: 'Часто задаваемые вопросы',
      }),
    },
    {
      name: 'contactsPage',
      type: 'group',
      label: 'Контакты',
      fields: [
        ...pageHeroFields({
          title: 'Контакты',
          subtitle: 'Свяжитесь с приёмной комиссией или посетите один из кампусов колледжа',
        }),
        {
          name: 'campusesTitle',
          type: 'text',
          label: 'Заголовок блока кампусов',
          defaultValue: 'Кампусы',
        },
        {
          name: 'intro',
          type: 'richText',
          label: 'Вводный текст',
        },
      ],
    },
  ],
}
