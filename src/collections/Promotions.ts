import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { contentCollectionAccess } from '@/access'
import { publishedField } from '@/fields/published'
import { seoFields } from '@/fields/seo'

export const Promotions: CollectionConfig = {
  slug: 'promotions',
  labels: {
    singular: 'Акция',
    plural: 'Акции',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'activeFrom', 'activeTo', 'published'],
    group: 'Контент',
  },
  access: contentCollectionAccess,
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    slugField(),
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
    },
    {
      name: 'conditions',
      type: 'textarea',
      label: 'Условия',
    },
    {
      name: 'activeFrom',
      type: 'date',
      label: 'Активна с',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'activeTo',
      type: 'date',
      label: 'Активна до',
      admin: {
        position: 'sidebar',
      },
    },
    ...seoFields(),
    publishedField(),
  ],
}
