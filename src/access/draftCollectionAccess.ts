import type { Access } from 'payload'

import { adminOnly, adminOrEditorOnly } from '@/access'

const publishedOnlyRead: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    _status: {
      equals: 'published',
    },
  }
}

export const draftCollectionAccess = {
  create: adminOrEditorOnly,
  read: publishedOnlyRead,
  update: adminOrEditorOnly,
  delete: adminOnly,
}
