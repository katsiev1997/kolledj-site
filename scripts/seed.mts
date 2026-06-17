import 'dotenv/config'

import { faker } from '@faker-js/faker/locale/ru'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from '../src/payload.config.js'
import { clearContent, ensureAdminUser } from './seed/clear.js'
import { ABOUT_PAGE_SEED, FAQ_SEED, pick, pickMany, PROGRAM_TITLES, richText, slugify } from './seed/utils.js'

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@college.local'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'admin123'

const NEWS_TITLES = [
  'День открытых дверей: знакомство с колледжем и программами',
  'Студенты колледжа победили на региональном чемпионате',
  'Запущена новая лаборатория цифрового дизайна',
  'Колледж подписал соглашение с IT-партнёром',
  'Итоги весенней сессии: рекордная успеваемость',
  'Мастер-класс по веб-разработке для абитуриентов',
] as const

const EVENT_TITLES = [
  'День открытых дверей',
  'Мастер-класс по цифровому дизайну',
  'Консультация приёмной комиссии',
  'Экскурсия по кампусу',
] as const

async function createPlaceholderImage(payload: Awaited<ReturnType<typeof getPayload>>, label: string) {
  const color = faker.color.rgb({ format: 'hex' })
  const buffer = await sharp({
    create: {
      width: 1200,
      height: 800,
      channels: 3,
      background: color,
    },
  })
    .png()
    .toBuffer()

  return payload.create({
    collection: 'media',
    data: { alt: label },
    file: {
      data: buffer,
      mimetype: 'image/png',
      name: `${slugify(label) || 'image'}.png`,
      size: buffer.length,
    },
  })
}

async function seed() {
  const fresh = process.argv.includes('--fresh')

  console.log('Подключение к Payload...')
  const payload = await getPayload({ config })

  const existingCampuses = await payload.find({ collection: 'campuses', limit: 1, depth: 0 })
  if (!fresh && existingCampuses.docs.length > 0) {
    console.log('В базе уже есть данные. Запустите с --fresh для полной перезаливки:')
    console.log('  pnpm seed:fresh')
    process.exit(0)
  }

  if (fresh) {
    console.log('Очистка контента (--fresh)...')
    await clearContent(payload)
  }

  console.log('Создание пользователя...')
  await ensureAdminUser(payload, ADMIN_EMAIL, ADMIN_PASSWORD)

  console.log('Создание медиа...')
  const coverMedia = await createPlaceholderImage(payload, 'Обложка программы')
  const partnerMedia = await createPlaceholderImage(payload, 'Логотип партнёра')
  const documentMedia = await createPlaceholderImage(payload, 'Документ колледжа')

  console.log('Создание кампусов...')
  const campusData = [
    {
      name: 'Главный кампус',
      slug: 'main',
      city: 'Москва',
      address: 'ул. Образовательная, д. 12',
      metro: 'м. Университет',
      phone: '+7 (495) 123-45-67',
      email: 'info@college.ru',
      workingHours: 'Пн–Пт: 9:00–18:00',
      latitude: 55.703,
      longitude: 37.53,
      published: true,
    },
    {
      name: 'Филиал на севере',
      slug: 'north',
      city: 'Москва',
      address: 'пр-т Мира, д. 45',
      metro: 'м. ВДНХ',
      phone: '+7 (495) 987-65-43',
      email: 'north@college.ru',
      workingHours: 'Пн–Пт: 10:00–19:00',
      latitude: 55.826,
      longitude: 37.637,
      published: true,
    },
  ]

  const campuses = await Promise.all(
    campusData.map((data) => payload.create({ collection: 'campuses', data })),
  )

  console.log('Создание документов...')
  const licenseDoc = await payload.create({
    collection: 'documents',
    data: {
      title: 'Лицензия на образовательную деятельность',
      description: 'Бессрочная лицензия Министерства образования.',
      category: 'license',
      section: 'marketing',
      file: documentMedia.id,
      signedWithEP: true,
      published: true,
    },
  })

  await payload.create({
    collection: 'documents',
    data: {
      title: 'Свидетельство о государственной аккредитации',
      description: 'Подтверждает соответствие образовательных программ федеральным стандартам.',
      category: 'accreditation',
      section: 'marketing',
      file: documentMedia.id,
      published: true,
    },
  })

  console.log('Создание программ...')
  const categories = ['college', 'course', 'higher'] as const
  const studyForms = ['full-time', 'part-time', 'distance'] as const
  const bases = [['9'], ['11'], ['9', '11']] as const

  const programs = await Promise.all(
    PROGRAM_TITLES.map((title, index) => {
      const category = categories[index % categories.length]
      return payload.create({
        collection: 'programs',
        data: {
          title,
          slug: slugify(title),
          shortDescription: faker.lorem.paragraph({ min: 1, max: 2 }),
          description: richText(faker.lorem.paragraphs({ min: 2, max: 3 })),
          cover: coverMedia.id,
          category,
          studyForms: pickMany(studyForms, faker.number.int({ min: 1, max: 2 })),
          base: pick(bases),
          duration: `${faker.number.int({ min: 2, max: 4 })} года ${faker.number.int({ min: 6, max: 10 })} месяцев`,
          price: faker.number.int({ min: 45000, max: 180000 }),
          campuses: pickMany(
            campuses.map((c) => c.id),
            faker.number.int({ min: 1, max: campuses.length }),
          ),
          _status: 'published',
          legal: {
            specialtyCode: `09.0${faker.number.int({ min: 1, max: 9 })}.${faker.number.int({ min: 10, max: 99 })}`,
            specialtyName: title,
            languageOfInstruction: 'Русский',
            licenseDocument: licenseDoc.id,
          },
        },
      })
    }),
  )

  console.log('Создание новостей...')
  const news = await Promise.all(
    NEWS_TITLES.map((title, index) =>
      payload.create({
        collection: 'news',
        data: {
          title,
          slug: `news-${index + 1}`,
          excerpt: faker.lorem.sentence({ min: 8, max: 16 }),
          content: richText(faker.lorem.paragraphs({ min: 3, max: 5 })),
          category: pick(['События', 'Обучение', 'Поступление', 'Достижения']),
          cover: coverMedia.id,
          publishedAt: faker.date.recent({ days: 60 }).toISOString(),
          readingTime: faker.number.int({ min: 3, max: 8 }),
          _status: 'published',
        },
      }),
    ),
  )

  console.log('Создание событий...')
  const events = await Promise.all(
    EVENT_TITLES.map((title, index) =>
      payload.create({
        collection: 'events',
        data: {
          title,
          slug: `event-${index + 1}`,
          date: faker.date.soon({ days: 30 }).toISOString(),
          location: `${pick(campuses).name}, ауд. ${faker.number.int({ min: 100, max: 399 })}`,
          campus: pick(campuses).id,
          description: richText(faker.lorem.paragraph({ min: 2, max: 4 })),
          registrationEnabled: true,
          published: true,
        },
      }),
    ),
  )

  console.log('Создание FAQ...')
  const faq = await Promise.all(
    FAQ_SEED.map((item, index) =>
      payload.create({
        collection: 'faq',
        data: {
          question: item.question,
          answer: richText(item.answer),
          category: item.category,
          order: index,
          published: true,
        },
      }),
    ),
  )

  console.log('Создание страниц...')
  const aboutPage = await payload.create({
    collection: 'pages',
    data: ABOUT_PAGE_SEED,
  })

  const privacyPage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Политика конфиденциальности',
      slug: 'privacy',
      template: 'privacy',
      content: richText(
        'Настоящая политика описывает порядок обработки персональных данных посетителей сайта и абитуриентов колледжа.',
      ),
      published: true,
    },
  })

  console.log('Создание партнёров...')
  await Promise.all(
    Array.from({ length: 6 }, (_, index) =>
      payload.create({
        collection: 'partners',
        data: {
          name: faker.company.name(),
          logo: partnerMedia.id,
          url: faker.internet.url(),
          description: faker.lorem.sentence(),
          order: index,
          published: true,
        },
      }),
    ),
  )

  console.log('Обновление globals...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      organizationName: 'Государственный колледж информационных технологий',
      organizationShortName: 'Колледж',
      phones: [
        { label: 'Приёмная комиссия', number: '+7 (495) 123-45-67' },
        { label: 'Справочная', number: '+7 (495) 123-45-68' },
      ],
      emails: [{ label: 'Общий', address: 'info@college.ru' }],
      workingHours: 'Пн–Пт: 9:00–18:00',
      socialLinks: [
        { platform: 'vk', url: 'https://vk.com/example' },
        { platform: 'telegram', url: 'https://t.me/example' },
      ],
      requisites: {
        inn: faker.string.numeric(10),
        kpp: faker.string.numeric(9),
        ogrn: faker.string.numeric(13),
        bankName: 'ПАО «Пример Банк»',
        bik: faker.string.numeric(9),
        checkingAccount: faker.finance.accountNumber(20),
        correspondentAccount: faker.finance.accountNumber(20),
      },
      privacyPolicyPage: privacyPage.id,
      uiLabels: {
        applicationButton: 'Оставить заявку',
        mobileMenuTitle: 'Меню',
      },
      meta: {
        title: 'Государственный колледж информационных технологий',
        description: 'Современные программы обучения, практика у партнёров и сопровождение до диплома.',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'page-content',
    data: {
      programsPage: {
        title: 'Каталог программ',
        subtitle: 'Выберите программу обучения по интересующим параметрам',
      },
      faqPage: {
        title: 'Часто задаваемые вопросы',
        subtitle: 'Ответы на популярные вопросы абитуриентов и студентов',
      },
      contactsPage: {
        title: 'Контакты',
        subtitle: 'Свяжитесь с приёмной комиссией или посетите один из кампусов колледжа',
        campusesTitle: 'Кампусы',
        intro: richText('Мы всегда на связи — выберите удобный способ связи или приезжайте в один из кампусов.'),
      },
    },
  })

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      consultationCta: {
        title: 'Поступай в колледж с уверенностью',
        description:
          'Современные программы, практика у партнёров и сопровождение от первой консультации до диплома.',
        buttonText: 'Оставить заявку',
      },
      admissionSteps: [
        {
          stepNumber: 1,
          title: 'Оставьте заявку',
          description: 'Заполните форму на сайте или позвоните в приёмную комиссию.',
        },
        {
          stepNumber: 2,
          title: 'Подготовьте документы',
          description: 'Паспорт, аттестат и фотографии. Список зависит от программы.',
        },
        {
          stepNumber: 3,
          title: 'Пройдите консультацию',
          description: 'Мы поможем выбрать программу и форму обучения.',
        },
        {
          stepNumber: 4,
          title: 'Заключите договор',
          description: 'После зачисления оформите договор и приступайте к обучению.',
        },
      ],
      stats: [
        { value: '500+', label: 'Студентов' },
        { value: '12', label: 'Программ' },
        { value: '30+', label: 'Партнёров' },
        { value: '95%', label: 'Трудоустройство' },
      ],
      values: [
        {
          title: 'Практика с первого курса',
          description: 'Стажировки у партнёров и реальные проекты в учебном процессе.',
        },
        {
          title: 'Наставники из индустрии',
          description: 'Преподаватели и приглашённые эксперты делятся актуальным опытом.',
        },
        {
          title: 'Современная инфраструктура',
          description: 'Лаборатории, мастерские и цифровые классы для комфортного обучения.',
        },
      ],
      featuredPrograms: programs.slice(0, 3).map((p) => p.id),
      featuredNews: news.slice(0, 3).map((n) => n.id),
      featuredEvents: events.slice(0, 3).map((e) => e.id),
    },
  })

  console.log('')
  console.log('Seed завершён.')
  console.log(`  программ: ${programs.length}`)
  console.log(`  новостей: ${news.length}`)
  console.log(`  событий: ${events.length}`)
  console.log(`  FAQ: ${faq.length}`)
  console.log(`  кампусов: ${campuses.length}`)
  console.log('  страниц: 2 (about, privacy)')
  console.log('')
  console.log(`Админ: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  console.log('Запуск: pnpm dev → http://localhost:3000/admin')

  process.exit(0)
}

seed().catch((error) => {
  console.error('Ошибка seed:', error)
  process.exit(1)
})
