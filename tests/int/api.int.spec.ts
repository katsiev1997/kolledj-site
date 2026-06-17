import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('fetches users collection', async () => {
    const users = await payload.find({
      collection: 'users',
    })
    expect(users).toBeDefined()
    expect(users.docs).toBeInstanceOf(Array)
  })

  it('fetches published programs for anonymous access pattern', async () => {
    const programs = await payload.find({
      collection: 'programs',
      where: {
        _status: {
          equals: 'published',
        },
      },
    })
    expect(programs.docs).toBeInstanceOf(Array)
  })

  it('fetches site settings global', async () => {
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    })
    expect(settings).toBeDefined()
  })

  it('fetches legal basic info global', async () => {
    const legalInfo = await payload.findGlobal({
      slug: 'legal-basic-info',
    })
    expect(legalInfo).toBeDefined()
  })

  it('creates application via payload API', async () => {
    const application = await payload.create({
      collection: 'applications',
      data: {
        type: 'consultation',
        name: 'Тест Тестов',
        phone: '+79991234567',
        consent: true,
        status: 'new',
      },
    })

    expect(application.id).toBeDefined()
    expect(application.type).toBe('consultation')
  })
})
