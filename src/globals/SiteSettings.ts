import type { GlobalConfig } from 'payload'

import { anyone, adminOrEditorOnly } from '@/access'
import { seoFields } from '@/fields/seo'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  access: {
    read: anyone,
    update: adminOrEditorOnly,
  },
  fields: [
    {
      name: 'organizationName',
      type: 'text',
      label: 'Название организации',
      required: true,
    },
    {
      name: 'organizationShortName',
      type: 'text',
      label: 'Краткое название',
    },
    {
      name: 'phones',
      type: 'array',
      label: 'Телефоны',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Подпись',
        },
        {
          name: 'number',
          type: 'text',
          label: 'Номер',
          required: true,
        },
      ],
    },
    {
      name: 'emails',
      type: 'array',
      label: 'Email',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Подпись',
        },
        {
          name: 'address',
          type: 'email',
          label: 'Email',
          required: true,
        },
      ],
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Режим работы',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Соцсети',
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Платформа',
          options: [
            { label: 'VK', value: 'vk' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Другое', value: 'other' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'requisites',
      type: 'group',
      label: 'Реквизиты',
      fields: [
        { name: 'inn', type: 'text', label: 'ИНН' },
        { name: 'kpp', type: 'text', label: 'КПП' },
        { name: 'ogrn', type: 'text', label: 'ОГРН' },
        { name: 'bankName', type: 'text', label: 'Банк' },
        { name: 'bik', type: 'text', label: 'БИК' },
        { name: 'checkingAccount', type: 'text', label: 'Расчётный счёт' },
        { name: 'correspondentAccount', type: 'text', label: 'Корр. счёт' },
      ],
    },
    {
      name: 'privacyPolicyPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Страница политики конфиденциальности',
    },
    {
      name: 'uiLabels',
      type: 'group',
      label: 'Тексты интерфейса',
      fields: [
        {
          name: 'applicationButton',
          type: 'text',
          label: 'Кнопка заявки',
          defaultValue: 'Оставить заявку',
        },
        {
          name: 'mobileMenuTitle',
          type: 'text',
          label: 'Заголовок мобильного меню',
          defaultValue: 'Меню',
        },
      ],
    },
    ...seoFields(),
  ],
}
