import type { CollectionConfig } from 'payload'

import { contentCollectionAccess } from '@/access'
import { publishedField } from '@/fields/published'

export const Staff: CollectionConfig = {
  slug: 'staff',
  labels: {
    singular: 'Сотрудник',
    plural: 'Персонал',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'role', 'position', 'published'],
    group: 'Сведения об организации',
  },
  access: contentCollectionAccess,
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'ФИО',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Роль',
      required: true,
      options: [
        { label: 'Руководитель', value: 'director' },
        { label: 'Заместитель', value: 'deputy' },
        { label: 'Руководитель филиала', value: 'branchHead' },
        { label: 'Педагог', value: 'teacher' },
      ],
      index: true,
    },
    {
      name: 'position',
      type: 'text',
      label: 'Должность',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
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
      name: 'education',
      type: 'textarea',
      label: 'Образование, квалификация',
    },
    {
      name: 'degree',
      type: 'text',
      label: 'Учёная степень / звание',
    },
    {
      name: 'training',
      type: 'textarea',
      label: 'Переподготовка / повышение квалификации',
    },
    {
      name: 'totalExperience',
      type: 'number',
      label: 'Общий стаж (лет)',
      min: 0,
    },
    {
      name: 'specialtyExperience',
      type: 'number',
      label: 'Стаж по специальности (лет)',
      min: 0,
    },
    {
      name: 'teachesSubjects',
      type: 'textarea',
      label: 'Преподаваемые дисциплины',
    },
    {
      name: 'teachesPrograms',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: true,
      label: 'Преподаёт на программах',
    },
    {
      name: 'campus',
      type: 'relationship',
      relationTo: 'campuses',
      label: 'Кампус',
    },
    publishedField(),
  ],
}
