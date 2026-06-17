import type { CollectionConfig } from 'payload'

import { contentCollectionAccess } from '@/access'
import { publishedField } from '@/fields/published'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'Вопрос',
    plural: 'FAQ',
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'published'],
    group: 'Контент',
  },
  access: contentCollectionAccess,
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Вопрос',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      label: 'Ответ',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Поступление', value: 'admission' },
        { label: 'Обучение', value: 'study' },
        { label: 'Оплата', value: 'payment' },
        { label: 'Документы', value: 'documents' },
        { label: 'Льготы', value: 'benefits' },
        { label: 'Общее', value: 'general' },
      ],
      index: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
    publishedField(),
  ],
}
