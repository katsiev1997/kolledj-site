import type { CollectionConfig } from 'payload'

import { anyone, adminOrEditorOnly, adminOnly } from '@/access'
import { validateFileSize } from '@/hooks/validateFileSize'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    read: anyone,
    create: adminOrEditorOnly,
    update: adminOrEditorOnly,
    delete: adminOnly,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.filesize != null) {
          const result = validateFileSize(data.filesize)
          if (result !== true) {
            throw new Error(result)
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt-текст',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Подпись',
    },
  ],
}
