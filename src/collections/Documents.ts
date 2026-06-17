import type { CollectionConfig } from 'payload'

import { contentCollectionAccess } from '@/access'

export const DOCUMENT_CATEGORIES = [
  { label: 'Устав', value: 'charter' },
  { label: 'Свидетельство об аккредитации', value: 'accreditation' },
  { label: 'Лицензия', value: 'license' },
  { label: 'Правила внутреннего распорядка обучающихся', value: 'student-rules' },
  { label: 'Правила внутреннего трудового распорядка', value: 'labor-rules' },
  { label: 'Коллективный договор', value: 'collective-agreement' },
  { label: 'Отчёт о самообследовании', value: 'self-examination' },
  { label: 'Предписания надзорных органов', value: 'supervisory-order' },
  { label: 'Локальный акт', value: 'local-act' },
  { label: 'Учебный план', value: 'study-plan' },
  { label: 'Рабочая программа', value: 'work-program' },
  { label: 'Календарный график', value: 'calendar' },
  { label: 'Методические материалы', value: 'methodical' },
  { label: 'Порядок оказания платных услуг', value: 'paid-services-procedure' },
  { label: 'Образец договора', value: 'contract-sample' },
  { label: 'План финансово-хозяйственной деятельности', value: 'finance-plan' },
  { label: 'Положение о подразделении', value: 'unit-regulation' },
  { label: 'ФГОС / федеральные требования', value: 'federal-standard' },
  { label: 'Собственный стандарт', value: 'own-standard' },
  { label: 'Прочее', value: 'other' },
] as const

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: 'Документ',
    plural: 'Документы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'section', 'updatedAt'],
    group: 'Сведения об организации',
  },
  access: contentCollectionAccess,
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      required: true,
      options: [...DOCUMENT_CATEGORIES],
      index: true,
    },
    {
      name: 'section',
      type: 'select',
      label: 'Раздел сайта',
      defaultValue: 'legal',
      options: [
        { label: 'Сведения об организации', value: 'legal' },
        { label: 'Маркетинг', value: 'marketing' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Файл',
      required: true,
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Внешняя ссылка (Рособрнадзор и т.п.)',
    },
    {
      name: 'signedWithEP',
      type: 'checkbox',
      label: 'Подписан электронной подписью (63-ФЗ)',
      defaultValue: false,
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      label: 'Программа',
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
