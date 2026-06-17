export const MAIN_NAV = [
  { label: 'Каталог', href: '/programs' },
  { label: 'Новости', href: '/news' },
  { label: 'Партнёры', href: '/partners' },
  { label: 'О колледже', href: '/pages/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Сведения об организации', href: '/svedeniya' },
  { label: 'Контакты', href: '/contacts' },
] as const

export const LEGAL_NAV = [
  { label: 'Основные сведения', href: '/svedeniya/basic' },
  { label: 'Структура и органы управления', href: '/svedeniya/structure' },
  { label: 'Документы', href: '/svedeniya/documents' },
  { label: 'Образование', href: '/svedeniya/education' },
  { label: 'Руководство и педагогический состав', href: '/svedeniya/staff' },
  { label: 'Материально-техническое обеспечение', href: '/svedeniya/mtb' },
  { label: 'Платные образовательные услуги', href: '/svedeniya/paid-services' },
  { label: 'Финансово-хозяйственная деятельность', href: '/svedeniya/finance' },
  { label: 'Вакантные места', href: '/svedeniya/vacancies' },
  { label: 'Доступная среда', href: '/svedeniya/accessible-environment' },
  { label: 'Международное сотрудничество', href: '/svedeniya/international' },
  { label: 'Стипендии и меры поддержки', href: '/svedeniya/scholarships' },
  { label: 'Образовательные стандарты', href: '/svedeniya/standards' },
] as const

export const PROGRAM_CATEGORY_LABELS: Record<string, string> = {
  college: 'Колледж (СПО)',
  course: 'Курсы',
  higher: 'Высшее образование',
}

export const STUDY_FORM_LABELS: Record<string, string> = {
  'full-time': 'Очная',
  'part-time': 'Заочная',
  distance: 'Дистанционная',
}

export const BASE_LABELS: Record<string, string> = {
  '9': 'После 9 класса',
  '11': 'После 11 класса',
}

export const FAQ_CATEGORY_LABELS: Record<string, string> = {
  admission: 'Поступление',
  study: 'Обучение',
  payment: 'Оплата',
  documents: 'Документы',
  benefits: 'Льготы',
  general: 'Общее',
}

export const FUNDING_SOURCE_LABELS: Record<string, string> = {
  federal: 'Федеральный бюджет',
  regional: 'Бюджет субъекта РФ',
  local: 'Местный бюджет',
  paid: 'Платные договоры',
  other: 'Иные источники',
}

export const LEGAL_GLOBAL_SLUGS = [
  'legal-basic-info',
  'legal-structure',
  'legal-mtb',
  'legal-accessible-environment',
  'legal-international',
  'legal-scholarships',
  'legal-paid-services',
  'legal-finance',
  'legal-standards',
] as const

export type LegalGlobalSlug = (typeof LEGAL_GLOBAL_SLUGS)[number]

/** ISR interval in seconds. Use literal `60` in `export const revalidate` — Next.js requires static segment config. */
export const REVALIDATE_SECONDS = 60
