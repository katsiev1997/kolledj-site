import type { Field } from 'payload'

export const publishedField = (): Field => ({
  name: 'published',
  type: 'checkbox',
  label: 'Опубликовано',
  defaultValue: false,
  admin: {
    position: 'sidebar',
  },
})
