import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { contentCollectionAccess } from '@/access'
import { publishedField } from '@/fields/published'
import { seoFields } from '@/fields/seo'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Событие',
    plural: 'События',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'published'],
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
      name: 'date',
      type: 'date',
      label: 'Дата и время',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      index: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Место проведения',
    },
    {
      name: 'campus',
      type: 'relationship',
      relationTo: 'campuses',
      label: 'Кампус',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
    },
    {
      name: 'registrationEnabled',
      type: 'checkbox',
      label: 'Регистрация включена',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    ...seoFields(),
    publishedField(),
  ],
}
