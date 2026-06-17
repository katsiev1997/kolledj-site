/** Минимальный Lexical richText для Payload. */
export function richText(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

export function slugify(value: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
    й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
    у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '',
    э: 'e', ю: 'yu', я: 'ya',
  }

  return value
    .toLowerCase()
    .split('')
    .map((char) => map[char] ?? char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function pickMany<T>(items: readonly T[], count: number): T[] {
  const copy = [...items]
  const result: T[] = []
  while (result.length < count && copy.length) {
    const index = Math.floor(Math.random() * copy.length)
    result.push(copy.splice(index, 1)[0])
  }
  return result
}

export const PROGRAM_TITLES = [
  'Информационные системы и программирование',
  'Компьютерные системы и комплексы',
  'Дизайн (по отраслям)',
  'Экономика и бухгалтерский учёт',
  'Право и организация социального обеспечения',
  'Туризм и гостеприимство',
  'Реклама',
  'Операционная деятельность в логистике',
  'Графический дизайн',
  'Веб-разработка',
  'Кибербезопасность',
  'Маркетинг',
] as const

export const FAQ_SEED = [
  {
    category: 'admission' as const,
    question: 'Какие документы нужны для поступления?',
    answer:
      'Паспорт, аттестат, фотографии 3×4 и заявление. Полный список доступен в разделе FAQ и на сайте приёмной комиссии.',
  },
  {
    category: 'admission' as const,
    question: 'Когда начинается приём документов?',
    answer: 'Приём документов открывается с 20 июня. Точные сроки публикуются на сайте и в соцсетях колледжа.',
  },
  {
    category: 'study' as const,
    question: 'Есть ли практика у работодателей?',
    answer: 'Да, по каждой программе предусмотрена производственная практика у партнёров колледжа.',
  },
  {
    category: 'study' as const,
    question: 'Можно ли совмещать учёбу и работу?',
    answer: 'На заочной и дистанционной форме обучения совмещение возможно. Очная форма предполагает полный учебный день.',
  },
  {
    category: 'payment' as const,
    question: 'Какие есть варианты оплаты обучения?',
    answer: 'Доступна помесячная и семестровая оплата, а также рассрочка по договору с банком-партнёром.',
  },
  {
    category: 'payment' as const,
    question: 'Предусмотрены ли скидки?',
    answer: 'Да, действуют скидки для отличников, победителей олимпиад и при единовременной оплате за год.',
  },
  {
    category: 'documents' as const,
    question: 'Как получить справку об обучении?',
    answer: 'Справку можно заказать в деканате или через личный кабинет обучающегося в течение 3 рабочих дней.',
  },
  {
    category: 'benefits' as const,
    question: 'Кому положена социальная стипендия?',
    answer: 'Социальная стипендия назначается студентам из льготных категорий согласно действующему законодательству.',
  },
  {
    category: 'general' as const,
    question: 'Как записаться на день открытых дверей?',
    answer: 'Заполните форму на сайте в разделе «События» или оставьте заявку на консультацию.',
  },
] as const
