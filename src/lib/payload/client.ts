import { getPayload, type Payload } from 'payload'

import config from '@/payload.config'

let cached: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached

  const payloadConfig = await config
  cached = await getPayload({ config: payloadConfig })
  return cached
}
