import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { draftCollectionAccess } from '@/access/draftCollectionAccess'
import { seoFields } from '@/fields/seo'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Новость',
    plural: 'Новости',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'Контент',
  },
  access: draftCollectionAccess,
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    slugField(),
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Содержание',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      label: 'Категория',
      index: true,
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Время чтения (мин.)',
      min: 1,
      admin: {
        position: 'sidebar',
      },
    },
    ...seoFields(),
  ],
}
