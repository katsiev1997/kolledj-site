import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { contentCollectionAccess } from '@/access'
import { publishedField } from '@/fields/published'
import { seoFields } from '@/fields/seo'
import { revalidateFrontendCollection } from '@/hooks/revalidateFrontend'

const aboutFieldCondition = (_: unknown, siblingData: { template?: string | null }) =>
  siblingData?.template === 'about'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Страница',
    plural: 'Страницы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'template', 'published', 'updatedAt'],
    group: 'Контент',
  },
  access: contentCollectionAccess,
  hooks: {
    afterChange: [revalidateFrontendCollection],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Краткое описание',
      admin: {
        description: 'Используется в тизере на главной странице',
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'Текст кнопки',
      defaultValue: 'Подробнее о колледже',
    },
    slugField(),
    {
      name: 'template',
      type: 'select',
      label: 'Шаблон',
      defaultValue: 'generic',
      options: [
        { label: 'О колледже', value: 'about' },
        { label: 'Политика конфиденциальности', value: 'privacy' },
        { label: 'Общая', value: 'generic' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Подзаголовок',
      admin: {
        condition: aboutFieldCondition,
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Вводный текст',
      admin: {
        condition: aboutFieldCondition,
      },
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Цифры',
      admin: {
        condition: aboutFieldCondition,
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Значение',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Подпись',
          required: true,
        },
      ],
    },
    {
      name: 'valuesTitle',
      type: 'text',
      label: 'Заголовок блока преимуществ',
      defaultValue: 'Наши преимущества',
      admin: {
        condition: aboutFieldCondition,
      },
    },
    {
      name: 'values',
      type: 'array',
      label: 'Преимущества',
      admin: {
        condition: aboutFieldCondition,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Описание',
        },
      ],
    },
    {
      name: 'history',
      type: 'group',
      label: 'История',
      admin: {
        condition: aboutFieldCondition,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Заголовок',
          defaultValue: 'История колледжа',
        },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Абзацы',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Текст',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Кнопки',
      admin: {
        condition: aboutFieldCondition,
      },
      fields: [
        {
          name: 'programsLabel',
          type: 'text',
          label: 'Текст кнопки «Программы»',
          defaultValue: 'Смотреть программы',
        },
        {
          name: 'contactsLabel',
          type: 'text',
          label: 'Текст кнопки «Контакты»',
          defaultValue: 'Связаться с нами',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Содержание',
      validate: (value, options) => {
        const siblingData = options.siblingData as { template?: string | null } | undefined
        if (siblingData?.template === 'about') return true
        if (!value) return 'Обязательное поле'
        return true
      },
      admin: {
        condition: (_, siblingData) => siblingData?.template !== 'about',
      },
    },
    ...seoFields(),
    publishedField(),
  ],
}
