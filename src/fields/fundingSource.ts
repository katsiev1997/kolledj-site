import type { Field } from 'payload'

export const FUNDING_SOURCE_OPTIONS = [
  { label: 'Федеральный бюджет', value: 'federal' },
  { label: 'Бюджет субъекта РФ', value: 'regional' },
  { label: 'Местный бюджет', value: 'local' },
  { label: 'Платные договоры', value: 'paid' },
  { label: 'Иные источники', value: 'other' },
] as const

export const fundingSourceField = (): Field => ({
  name: 'fundingSource',
  type: 'select',
  label: 'Источник финансирования',
  required: true,
  options: [...FUNDING_SOURCE_OPTIONS],
})

export const fundingSourceRowFields = (): Field[] => [
  fundingSourceField(),
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
]
