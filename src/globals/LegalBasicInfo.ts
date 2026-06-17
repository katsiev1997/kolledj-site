import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'

export const LegalBasicInfo: GlobalConfig = {
  slug: 'legal-basic-info',
  label: 'Основные сведения',
  admin: {
    group: 'Сведения об организации',
  },
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Полное наименование',
      required: true,
    },
    {
      name: 'shortName',
      type: 'text',
      label: 'Сокращённое наименование',
    },
    {
      name: 'createdAt',
      type: 'date',
      label: 'Дата создания организации',
    },
    {
      name: 'founder',
      type: 'textarea',
      label: 'Учредитель',
    },
    {
      name: 'branches',
      type: 'array',
      label: 'Филиалы и представительства',
      fields: [
        { name: 'name', type: 'text', label: 'Название', required: true },
        { name: 'address', type: 'textarea', label: 'Адрес' },
        { name: 'website', type: 'text', label: 'Сайт' },
      ],
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Режим и график работы',
    },
    {
      name: 'educationLocations',
      type: 'array',
      label: 'Места осуществления образовательной деятельности',
      fields: [
        { name: 'address', type: 'textarea', label: 'Адрес', required: true },
        {
          name: 'notInLicenseRegistry',
          type: 'checkbox',
          label: 'Не указан в реестре лицензий',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'contacts',
      type: 'group',
      label: 'Контакты',
      fields: [
        {
          name: 'phones',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', label: 'Подпись' },
            { name: 'number', type: 'text', label: 'Телефон', required: true },
          ],
        },
        {
          name: 'emails',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', label: 'Подпись' },
            { name: 'address', type: 'email', label: 'Email', required: true },
          ],
        },
      ],
    },
  ],
}
