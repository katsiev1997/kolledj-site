import type { Field } from 'payload'

export const seoFields = (): Field[] => [
  {
    name: 'meta',
    type: 'group',
    label: 'SEO',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Meta title',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Meta description',
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        label: 'OG изображение',
      },
    ],
  },
]
