import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => {
  const typedUser = user as User | null
  return typedUser?.roles?.includes('admin') ?? false
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  const typedUser = user as User | null
  if (!typedUser?.roles) return false
  return typedUser.roles.includes('admin') || typedUser.roles.includes('editor')
}

export const anyone: Access = () => true

export const authenticatedOnly: Access = ({ req: { user } }) => Boolean(user)

export const adminOnly: Access = isAdmin

export const adminOrEditorOnly: Access = isAdminOrEditor

export const publishedOnly: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    published: {
      equals: true,
    },
  }
}

export const adminFieldOnly: FieldAccess = ({ req: { user } }) => {
  const typedUser = user as User | null
  return typedUser?.roles?.includes('admin') ?? false
}

export const adminOrEditorFieldOnly: FieldAccess = ({ req: { user } }) => {
  const typedUser = user as User | null
  if (!typedUser?.roles) return false
  return typedUser.roles.includes('admin') || typedUser.roles.includes('editor')
}

export const publicReadAdminUpdate = {
  read: anyone,
  update: adminOrEditorOnly,
}

export const contentCollectionAccess = {
  create: adminOrEditorOnly,
  read: publishedOnly,
  update: adminOrEditorOnly,
  delete: adminOnly,
}

export const applicationsAccess = {
  create: anyone,
  read: adminOrEditorOnly,
  update: adminOrEditorOnly,
  delete: adminOnly,
}

export const usersAccess = {
  create: adminOnly,
  read: adminOnly,
  update: adminOnly,
  delete: adminOnly,
}
