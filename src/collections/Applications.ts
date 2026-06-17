import type { CollectionConfig, Endpoint } from 'payload'

import { applicationsAccess, adminOrEditorFieldOnly } from '@/access'
import { consentField } from '@/fields/consent'

const APPLICATION_TYPES = [
  { label: 'Консультация', value: 'consultation' },
  { label: 'Поступление', value: 'enrollment' },
  { label: 'День открытых дверей', value: 'openDay' },
  { label: 'Обратная связь', value: 'feedback' },
  { label: 'Партнёрство', value: 'partnership' },
] as const

const submitEndpoint: Endpoint = {
  path: '/submit',
  method: 'post',
  handler: async (req) => {
    if (!req.json) {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    const body = await req.json()

    if (body.website) {
      return Response.json({ success: true })
    }

    const { type, name, phone, email, program, message, consent } = body

    if (!type || !name || !phone || consent !== true) {
      return Response.json(
        { error: 'Заполните обязательные поля и дайте согласие на обработку данных' },
        { status: 400 },
      )
    }

    const validTypes = APPLICATION_TYPES.map((t) => t.value)
    if (!validTypes.includes(type)) {
      return Response.json({ error: 'Некорректный тип заявки' }, { status: 400 })
    }

    const phoneDigits = String(phone).replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      return Response.json({ error: 'Укажите корректный телефон' }, { status: 400 })
    }

    const doc = await req.payload.create({
      collection: 'applications',
      data: {
        type,
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : undefined,
        program: program || undefined,
        message: message ? String(message).trim() : undefined,
        consent: true,
        status: 'new',
      },
      req,
    })

    return Response.json({ success: true, id: doc.id })
  },
}

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: 'Заявка',
    plural: 'Заявки',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'phone', 'status', 'createdAt'],
    group: 'Заявки',
  },
  access: applicationsAccess,
  endpoints: [submitEndpoint],
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc }) => {
        if (operation === 'update' && originalDoc) {
          return {
            ...data,
            type: originalDoc.type,
            name: originalDoc.name,
            phone: originalDoc.phone,
            email: originalDoc.email,
            program: originalDoc.program,
            message: originalDoc.message,
            consent: originalDoc.consent,
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Тип',
      required: true,
      options: [...APPLICATION_TYPES],
      access: {
        update: adminOrEditorFieldOnly,
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Имя',
      required: true,
      access: {
        update: adminOrEditorFieldOnly,
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      required: true,
      access: {
        update: adminOrEditorFieldOnly,
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      access: {
        update: adminOrEditorFieldOnly,
      },
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      label: 'Программа',
      access: {
        update: adminOrEditorFieldOnly,
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Сообщение',
      access: {
        update: adminOrEditorFieldOnly,
      },
    },
    consentField(),
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'inProgress' },
        { label: 'Завершена', value: 'done' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
