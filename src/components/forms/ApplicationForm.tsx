'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export type ApplicationType =
  | 'consultation'
  | 'enrollment'
  | 'openDay'
  | 'feedback'
  | 'partnership'

type ProgramOption = {
  id: string
  title: string
}

type ApplicationFormProps = {
  type: ApplicationType
  programId?: string
  eventId?: string
  programs?: ProgramOption[]
  privacyPageSlug?: string
  onSuccess?: () => void
}

export function ApplicationForm({
  type,
  programId,
  eventId,
  programs = [],
  privacyPageSlug,
  onSuccess,
}: ApplicationFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [selectedProgram, setSelectedProgram] = useState(programId ?? '')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!consent) {
      toast.error('Необходимо согласие на обработку персональных данных')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          name,
          phone,
          email: email || undefined,
          program: selectedProgram || undefined,
          message: message || (eventId ? `Событие: ${eventId}` : undefined),
          consent: true,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось отправить заявку')
      }

      toast.success('Заявка отправлена. Мы свяжемся с вами в ближайшее время.')
      setName('')
      setPhone('')
      setEmail('')
      setMessage('')
      setConsent(false)
      if (!programId) setSelectedProgram('')
      onSuccess?.()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка отправки заявки')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="application-name">Имя</FieldLabel>
          <FieldContent>
            <Input
              id="application-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="application-phone">Телефон</FieldLabel>
          <FieldContent>
            <Input
              id="application-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="application-email">Email</FieldLabel>
          <FieldContent>
            <Input
              id="application-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </FieldContent>
        </Field>

        {programs.length > 0 && !programId ? (
          <Field>
            <FieldLabel htmlFor="application-program">Программа</FieldLabel>
            <FieldContent>
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger id="application-program">
                  <SelectValue placeholder="Выберите программу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldContent>
          </Field>
        ) : null}

        <Field>
          <FieldLabel htmlFor="application-message">Сообщение</FieldLabel>
          <FieldContent>
            <Textarea
              id="application-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </FieldContent>
        </Field>

        <Field orientation="horizontal">
          <Checkbox
            id="application-consent"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            aria-invalid={!consent}
          />
          <FieldContent>
            <FieldLabel htmlFor="application-consent" className="font-normal">
              Согласен на обработку персональных данных
              {privacyPageSlug ? (
                <>
                  {' '}
                  (<Link href={`/pages/${privacyPageSlug}`} className="text-primary underline-offset-4 hover:underline">
                    политика конфиденциальности
                  </Link>
                  )
                </>
              ) : null}
            </FieldLabel>
            <FieldDescription>Обязательное поле для отправки заявки</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </Button>
    </form>
  )
}
