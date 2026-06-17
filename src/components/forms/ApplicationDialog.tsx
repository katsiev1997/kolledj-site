'use client'

import { useState } from 'react'

import {
  ApplicationForm,
  type ApplicationType,
} from '@/components/forms/ApplicationForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type ProgramOption = {
  id: string
  title: string
}

type ApplicationDialogProps = {
  trigger: React.ReactNode
  type: ApplicationType
  programId?: string
  eventId?: string
  programs?: ProgramOption[]
  privacyPageSlug?: string
}

export function ApplicationDialog({
  trigger,
  type,
  programId,
  eventId,
  programs,
  privacyPageSlug,
}: ApplicationDialogProps) {
  const [open, setOpen] = useState(false)

  const titles: Record<ApplicationType, string> = {
    consultation: 'Заявка на консультацию',
    enrollment: 'Заявка на поступление',
    openDay: 'Запись на день открытых дверей',
    feedback: 'Обратная связь',
    partnership: 'Партнёрство',
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{titles[type]}</DialogTitle>
        </DialogHeader>
        <ApplicationForm
          type={type}
          programId={programId}
          eventId={eventId}
          programs={programs}
          privacyPageSlug={privacyPageSlug}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
