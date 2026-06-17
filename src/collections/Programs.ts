import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { draftCollectionAccess } from '@/access/draftCollectionAccess'
import { seoFields } from '@/fields/seo'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Программа',
    plural: 'Программы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', '_status', 'updatedAt'],
    group: 'Контент',
  },
  access: draftCollectionAccess,
  versions: {
    drafts: true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Маркетинг',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Название',
              required: true,
            },
            slugField(),
            {
              name: 'shortDescription',
              type: 'textarea',
              label: 'Краткое описание',
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Описание',
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              label: 'Обложка',
            },
            {
              name: 'category',
              type: 'select',
              label: 'Категория',
              required: true,
              defaultValue: 'college',
              options: [
                { label: 'Колледж (СПО)', value: 'college' },
                { label: 'Курсы', value: 'course' },
                { label: 'Высшее образование', value: 'higher' },
              ],
              index: true,
            },
            {
              name: 'studyForms',
              type: 'select',
              hasMany: true,
              label: 'Формы обучения',
              options: [
                { label: 'Очная', value: 'full-time' },
                { label: 'Заочная', value: 'part-time' },
                { label: 'Дистанционная', value: 'distance' },
              ],
            },
            {
              name: 'base',
              type: 'select',
              label: 'База поступления',
              hasMany: true,
              options: [
                { label: 'После 9 класса', value: '9' },
                { label: 'После 11 класса', value: '11' },
              ],
            },
            {
              name: 'duration',
              type: 'text',
              label: 'Срок обучения',
            },
            {
              name: 'price',
              type: 'number',
              label: 'Стоимость (руб.)',
              min: 0,
            },
            {
              name: 'campuses',
              type: 'relationship',
              relationTo: 'campuses',
              hasMany: true,
              label: 'Кампусы',
            },
            ...seoFields(),
          ],
        },
        {
          label: 'Сведения для приказа',
          fields: [
            {
              name: 'legal',
              type: 'group',
              label: 'Образование (§3.4)',
              fields: [
                {
                  name: 'specialtyCode',
                  type: 'text',
                  label: 'Код специальности',
                },
                {
                  name: 'specialtyName',
                  type: 'text',
                  label: 'Название специальности',
                },
                {
                  name: 'languageOfInstruction',
                  type: 'text',
                  label: 'Язык обучения',
                  defaultValue: 'Русский',
                },
                {
                  name: 'accreditationValidUntil',
                  type: 'date',
                  label: 'Срок действия аккредитации',
                },
                {
                  name: 'disciplines',
                  type: 'textarea',
                  label: 'Перечень дисциплин, модулей, практики',
                },
                {
                  name: 'usesDistanceTechnologies',
                  type: 'checkbox',
                  label: 'Используются ЭО и ДОТ',
                },
                {
                  name: 'distanceTechnologiesDescription',
                  type: 'textarea',
                  label: 'Описание ЭО/ДОТ',
                  admin: {
                    condition: (_, siblingData) => siblingData?.usesDistanceTechnologies === true,
                  },
                },
                {
                  name: 'licenseDocument',
                  type: 'relationship',
                  relationTo: 'documents',
                  label: 'Лицензия',
                },
                {
                  name: 'programDocuments',
                  type: 'array',
                  label: 'Документы программы',
                  fields: [
                    {
                      name: 'type',
                      type: 'select',
                      label: 'Тип документа',
                      required: true,
                      options: [
                        { label: 'Учебный план', value: 'study-plan' },
                        { label: 'Рабочая программа', value: 'work-program' },
                        { label: 'Календарный график', value: 'calendar' },
                        { label: 'Методические материалы', value: 'methodical' },
                        { label: 'Программа воспитания', value: 'education-program' },
                        { label: 'Календарный план воспитательной работы', value: 'education-calendar' },
                      ],
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Название',
                      required: true,
                    },
                    {
                      name: 'document',
                      type: 'relationship',
                      relationTo: 'documents',
                      label: 'Документ',
                    },
                    {
                      name: 'file',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Файл',
                    },
                  ],
                },
                {
                  name: 'studentCounts',
                  type: 'array',
                  label: 'Численность обучающихся',
                  fields: [
                    {
                      name: 'year',
                      type: 'number',
                      label: 'Год',
                      required: true,
                    },
                    {
                      name: 'rows',
                      type: 'array',
                      label: 'По источникам финансирования',
                      fields: [
                        {
                          name: 'fundingSource',
                          type: 'select',
                          label: 'Источник',
                          required: true,
                          options: [
                            { label: 'Федеральный бюджет', value: 'federal' },
                            { label: 'Бюджет субъекта РФ', value: 'regional' },
                            { label: 'Местный бюджет', value: 'local' },
                            { label: 'Платные договоры', value: 'paid' },
                            { label: 'Иные источники', value: 'other' },
                          ],
                        },
                        {
                          name: 'count',
                          type: 'number',
                          label: 'Количество',
                          required: true,
                          min: 0,
                        },
                        {
                          name: 'foreignCitizens',
                          type: 'number',
                          label: 'Иностранные граждане',
                          min: 0,
                          defaultValue: 0,
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'admissionResults',
                  type: 'array',
                  label: 'Результаты приёма',
                  fields: [
                    {
                      name: 'year',
                      type: 'number',
                      label: 'Год',
                      required: true,
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
                    },
                    {
                      name: 'admittedCount',
                      type: 'number',
                      label: 'Принято',
                      min: 0,
                    },
                    {
                      name: 'averageScore',
                      type: 'number',
                      label: 'Средний балл',
                    },
                    {
                      name: 'transferredCount',
                      type: 'number',
                      label: 'Переведено',
                      min: 0,
                    },
                    {
                      name: 'expelledCount',
                      type: 'number',
                      label: 'Отчислено',
                      min: 0,
                    },
                    {
                      name: 'restoredCount',
                      type: 'number',
                      label: 'Восстановлено',
                      min: 0,
                    },
                  ],
                },
                {
                  name: 'employmentStats',
                  type: 'array',
                  label: 'Трудоустройство выпускников',
                  fields: [
                    {
                      name: 'year',
                      type: 'number',
                      label: 'Год выпуска',
                      required: true,
                    },
                    {
                      name: 'graduatesCount',
                      type: 'number',
                      label: 'Выпускников',
                      min: 0,
                    },
                    {
                      name: 'employedCount',
                      type: 'number',
                      label: 'Трудоустроено',
                      min: 0,
                    },
                    {
                      name: 'employmentRate',
                      type: 'number',
                      label: 'Процент трудоустройства',
                      min: 0,
                      max: 100,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
