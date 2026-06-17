import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { contentCollectionAccess } from '@/access'

export const Campuses: CollectionConfig = {
  slug: 'campuses',
  labels: {
    singular: 'Кампус',
    plural: 'Кампусы',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'published', 'updatedAt'],
  },
  access: contentCollectionAccess,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Название',
      required: true,
    },
    slugField(),
    {
      name: 'city',
      type: 'text',
      label: 'Город',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Адрес',
      required: true,
    },
    {
      name: 'metro',
      type: 'text',
      label: 'Ближайшее метро',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Режим работы',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          label: 'Широта',
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Долгота',
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Опубликовано',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
