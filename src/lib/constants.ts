export const INFO_BASE = '/info' as const

export const MAIN_NAV = [
  { label: 'Каталог', href: '/programs' },
  { label: 'Новости', href: '/news' },
  { label: 'О колледже', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Сведения об организации', href: INFO_BASE },
  { label: 'Контакты', href: '/contacts' },
] as const

export const LEGAL_NAV = [
  { label: 'Основные сведения', href: `${INFO_BASE}/basic` },
  { label: 'Структура и органы управления', href: `${INFO_BASE}/structure` },
  { label: 'Документы', href: `${INFO_BASE}/documents` },
  { label: 'Образование', href: `${INFO_BASE}/education` },
  { label: 'Руководство и педагогический состав', href: `${INFO_BASE}/staff` },
  { label: 'Материально-техническое обеспечение', href: `${INFO_BASE}/mtb` },
  { label: 'Платные образовательные услуги', href: `${INFO_BASE}/paid-services` },
  { label: 'Финансово-хозяйственная деятельность', href: `${INFO_BASE}/finance` },
  { label: 'Вакантные места', href: `${INFO_BASE}/vacancies` },
  { label: 'Доступная среда', href: `${INFO_BASE}/accessible-environment` },
  { label: 'Международное сотрудничество', href: `${INFO_BASE}/international` },
  { label: 'Стипендии и меры поддержки', href: `${INFO_BASE}/scholarships` },
  { label: 'Образовательные стандарты', href: `${INFO_BASE}/standards` },
] as const

export const INFO_PAGE_TITLE = 'Сведения об образовательной организации'

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

export const DOCUMENT_CATEGORY_LABELS: Record<string, string> = {
  charter: 'Устав',
  accreditation: 'Свидетельство об аккредитации',
  license: 'Лицензия',
  'student-rules': 'Правила внутреннего распорядка обучающихся',
  'labor-rules': 'Правила внутреннего трудового распорядка',
  'collective-agreement': 'Коллективный договор',
  'self-examination': 'Отчёт о самообследовании',
  'supervisory-order': 'Предписания надзорных органов',
  'local-act': 'Локальный акт',
  'study-plan': 'Учебный план',
  'work-program': 'Рабочая программа',
  calendar: 'Календарный график',
  methodical: 'Методические материалы',
  'paid-services-procedure': 'Порядок оказания платных услуг',
  'contract-sample': 'Образец договора',
  'finance-plan': 'План финансово-хозяйственной деятельности',
  'unit-regulation': 'Положение о подразделении',
  'federal-standard': 'ФГОС / федеральные требования',
  'own-standard': 'Собственный стандарт',
  other: 'Прочее',
}

export const PROGRAM_DOCUMENT_TYPE_LABELS: Record<string, string> = {
  'study-plan': 'Учебный план',
  'work-program': 'Рабочая программа',
  calendar: 'Календарный график',
  methodical: 'Методические материалы',
  'education-program': 'Программа воспитания',
  'education-calendar': 'Календарный план воспитательной работы',
}

export const MTB_SECTION_LABELS: Record<string, string> = {
  classrooms: 'Учебные кабинеты',
  practice: 'Объекты для практики',
  library: 'Библиотека',
  sport: 'Спорт',
  'teaching-aids': 'Средства обучения',
  catering: 'Питание',
  health: 'Охрана здоровья',
  'it-access': 'Доступ к ИС и сетям',
  eor: 'Электронные образовательные ресурсы',
}

export const ACCESSIBLE_SECTION_LABELS: Record<string, string> = {
  classrooms: 'Учебные кабинеты',
  practice: 'Практика',
  library: 'Библиотека',
  sport: 'Спорт',
  'teaching-aids': 'Средства обучения',
  entrance: 'Беспрепятственный вход',
  catering: 'Питание',
  health: 'Охрана здоровья',
  'it-eor': 'ИС и ЭОР',
  'special-equipment': 'Спецсредства',
  dormitory: 'Общежитие / интернат',
}

export const STAFF_ROLE_LABELS: Record<string, string> = {
  director: 'Руководитель',
  deputy: 'Заместители',
  branchHead: 'Руководители филиалов',
  teacher: 'Педагогический состав',
}

export const AGREEMENT_STATUS_LABELS: Record<string, string> = {
  signed: 'Заключён',
  planned: 'Планируется',
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
