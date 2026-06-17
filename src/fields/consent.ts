import type { Field } from 'payload'

export const consentField = (): Field => ({
  name: 'consent',
  type: 'checkbox',
  label: 'Согласие на обработку персональных данных',
  required: true,
  defaultValue: false,
})
