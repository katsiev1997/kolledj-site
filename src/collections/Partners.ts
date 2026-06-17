import type { CollectionConfig } from 'payload'

import { contentCollectionAccess } from '@/access'
import { publishedField } from '@/fields/published'

export const Partners: CollectionConfig = {
  slug: 'partners',
  labels: {
    singular: 'Партнёр',
    plural: 'Партнёры',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'published'],
    group: 'Контент',
  },
  access: contentCollectionAccess,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Сайт',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
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
