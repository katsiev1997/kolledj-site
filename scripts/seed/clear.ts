import type { Payload } from 'payload'

const CONTENT_COLLECTIONS = [
  'applications',
  'vacancies',
  'promotions',
  'staff',
  'partners',
  'events',
  'news',
  'programs',
  'documents',
  'faq',
  'pages',
  'campuses',
  'media',
] as const

export async function clearContent(payload: Payload): Promise<void> {
  for (const slug of CONTENT_COLLECTIONS) {
    const result = await payload.find({
      collection: slug,
      limit: 500,
      depth: 0,
      pagination: false,
    })

    if (!result.docs.length) continue

    await payload.delete({
      collection: slug,
      where: {
        id: {
          in: result.docs.map((doc) => doc.id),
        },
      },
    })

    console.log(`  удалено ${result.docs.length} записей из «${slug}»`)
  }
}

export async function ensureAdminUser(payload: Payload, email: string, password: string): Promise<void> {
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length) {
    console.log(`  админ уже существует: ${email}`)
    return
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      password,
      roles: ['admin'],
    },
  })

  console.log(`  создан админ: ${email}`)
}
