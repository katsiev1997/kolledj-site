import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'
import { revalidateFrontendGlobal } from '@/hooks/revalidateFrontend'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Главная страница',
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  hooks: {
    afterChange: [revalidateFrontendGlobal],
  },
  fields: [
    {
      name: 'sectionTitles',
      type: 'group',
      label: 'Заголовки секций',
      fields: [
        { name: 'admissionSteps', type: 'text', label: 'Как поступить', defaultValue: 'Как поступить' },
        { name: 'programs', type: 'text', label: 'Программы', defaultValue: 'Программы обучения' },
        { name: 'values', type: 'text', label: 'Ценности', defaultValue: 'Наши ценности' },
        { name: 'licenses', type: 'text', label: 'Лицензии', defaultValue: 'Лицензии и аккредитация' },
        { name: 'faq', type: 'text', label: 'FAQ', defaultValue: 'Частые вопросы' },
        { name: 'events', type: 'text', label: 'События', defaultValue: 'События' },
        { name: 'news', type: 'text', label: 'Новости', defaultValue: 'Новости' },
      ],
    },
    {
      name: 'actionLabels',
      type: 'group',
      label: 'Тексты кнопок',
      fields: [
        { name: 'allPrograms', type: 'text', label: 'Все программы', defaultValue: 'Все программы' },
        { name: 'allDocuments', type: 'text', label: 'Все документы', defaultValue: 'Все документы' },
        { name: 'allFaq', type: 'text', label: 'Все вопросы', defaultValue: 'Все вопросы' },
        { name: 'allEvents', type: 'text', label: 'Все события', defaultValue: 'Все события' },
        { name: 'allNews', type: 'text', label: 'Все новости', defaultValue: 'Все новости' },
        { name: 'aboutCollege', type: 'text', label: 'О колледже', defaultValue: 'Подробнее о колледже' },
        { name: 'viewPrograms', type: 'text', label: 'Смотреть программы', defaultValue: 'Смотреть программы' },
      ],
    },
    {
      name: 'admissionSteps',
      type: 'array',
      label: 'Шаги поступления',
      maxRows: 4,
      fields: [
        {
          name: 'stepNumber',
          type: 'number',
          label: 'Номер',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Цифры',
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Значение',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Подпись',
          required: true,
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      label: 'Ценности',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Иконка',
        },
      ],
    },
    {
      name: 'consultationCta',
      type: 'group',
      label: 'CTA консультации',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Текст кнопки',
          defaultValue: 'Оставить заявку',
        },
      ],
    },
    {
      name: 'featuredPrograms',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      label: 'Избранные программы',
    },
    {
      name: 'featuredNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      label: 'Избранные новости',
    },
    {
      name: 'featuredEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      label: 'Избранные события',
    },
  ],
}
