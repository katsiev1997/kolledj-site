import type { CollectionConfig } from 'payload'

import { adminOrEditorOnly, adminOnly, anyone } from '@/access'

export const Vacancies: CollectionConfig = {
  slug: 'vacancies',
  labels: {
    singular: 'Вакантное место',
    plural: 'Вакантные места',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'program', 'academicYear', 'fundingSource', 'placesForAdmission'],
    group: 'Сведения об организации',
  },
  access: {
    create: adminOrEditorOnly,
    read: anyone,
    update: adminOrEditorOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Подпись',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      label: 'Программа',
      required: true,
      index: true,
    },
    {
      name: 'academicYear',
      type: 'text',
      label: 'Учебный год',
      required: true,
      index: true,
    },
    {
      name: 'fundingSource',
      type: 'select',
      label: 'Источник финансирования',
      required: true,
      options: [
        { label: 'Федеральный бюджет', value: 'federal' },
        { label: 'Бюджет субъекта РФ', value: 'regional' },
        { label: 'Местный бюджет', value: 'local' },
        { label: 'Платные договоры', value: 'paid' },
        { label: 'Иные источники', value: 'other' },
      ],
      index: true,
    },
    {
      name: 'placesForAdmission',
      type: 'number',
      label: 'Мест для приёма',
      required: true,
      min: 0,
    },
    {
      name: 'placesForTransfer',
      type: 'number',
      label: 'Мест для перевода',
      min: 0,
      defaultValue: 0,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (data?.program) {
          const programId = typeof data.program === 'object' ? data.program.id : data.program
          const program = await req.payload.findByID({
            collection: 'programs',
            id: programId,
            depth: 0,
          })
          data.label = `${program.title} — ${data.academicYear ?? ''} (${data.fundingSource ?? ''})`
        }
        return data
      },
    ],
  },
}
