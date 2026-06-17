import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { contentCollectionAccess } from '@/access'
import { publishedField } from '@/fields/published'
import { seoFields } from '@/fields/seo'
import { revalidateFrontendCollection } from '@/hooks/revalidateFrontend'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Страница',
    plural: 'Страницы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'template', 'published', 'updatedAt'],
    group: 'Контент',
  },
  access: contentCollectionAccess,
  hooks: {
    afterChange: [revalidateFrontendCollection],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
      admin: {
        description: 'Используется в тизере на главной странице',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Текст кнопки',
      defaultValue: 'Подробнее о колледже',
    },
    slugField(),
    {
      name: 'template',
      type: 'select',
      label: 'Шаблон',
      defaultValue: 'generic',
      options: [
        { label: 'О колледже', value: 'about' },
        { label: 'Политика конфиденциальности', value: 'privacy' },
        { label: 'Общая', value: 'generic' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Содержание',
      required: true,
    },
    ...seoFields(),
    publishedField(),
  ],
}
