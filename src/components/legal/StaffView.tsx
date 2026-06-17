import { InfoEmpty, InfoRow, InfoSection } from '@/components/legal/InfoSection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { STAFF_ROLE_LABELS } from '@/lib/constants'
import type { Program, Staff } from '@/payload-types'

type StaffViewProps = {
  staff: Staff[]
}

const LEADERSHIP_ROLES = ['director', 'deputy', 'branchHead'] as const

export function StaffView({ staff }: StaffViewProps) {
  if (!staff.length) {
    return <InfoEmpty>Данные о руководстве и педагогическом составе не заполнены.</InfoEmpty>
  }

  const leadership = staff.filter((person) => LEADERSHIP_ROLES.includes(person.role as (typeof LEADERSHIP_ROLES)[number]))
  const teachers = staff.filter((person) => person.role === 'teacher')

  return (
    <div className="flex flex-col gap-8">
      {LEADERSHIP_ROLES.map((role) => {
        const members = leadership.filter((person) => person.role === role)
        if (!members.length) return null

        return (
          <InfoSection key={role} title={STAFF_ROLE_LABELS[role]}>
            <div className="grid gap-4 md:grid-cols-2">
              {members.map((person) => (
                <StaffCard key={person.id} person={person} />
              ))}
            </div>
          </InfoSection>
        )
      })}

      {teachers.length ? (
        <InfoSection title={STAFF_ROLE_LABELS.teacher}>
          <TeachersByProgram teachers={teachers} />
        </InfoSection>
      ) : null}
    </div>
  )
}

function StaffCard({ person }: { person: Staff }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{person.fullName}</CardTitle>
        <p className="text-sm text-muted-foreground">{person.position}</p>
      </CardHeader>
      <CardContent>
        <dl>
          {person.phone ? (
            <InfoRow
              label="Телефон"
              value={
                <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                  {person.phone}
                </a>
              }
            />
          ) : null}
          {person.email ? (
            <InfoRow
              label="Email"
              value={
                <a href={`mailto:${person.email}`} className="hover:text-primary">
                  {person.email}
                </a>
              }
            />
          ) : null}
        </dl>
      </CardContent>
    </Card>
  )
}

function TeachersByProgram({ teachers }: { teachers: Staff[] }) {
  const grouped = teachers.reduce<Record<string, { title: string; members: Staff[] }>>((acc, teacher) => {
    const programs = teacher.teachesPrograms?.filter((p): p is Program => typeof p === 'object' && p !== null)

    if (!programs?.length) {
      const key = 'other'
      if (!acc[key]) acc[key] = { title: 'Без привязки к программе', members: [] }
      acc[key].members.push(teacher)
      return acc
    }

    for (const program of programs) {
      const key = program.id
      if (!acc[key]) acc[key] = { title: program.title, members: [] }
      if (!acc[key].members.some((m) => m.id === teacher.id)) {
        acc[key].members.push(teacher)
      }
    }

    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([key, group]) => (
        <div key={key} className="flex flex-col gap-3">
          <h3 className="text-base font-medium text-foreground">{group.title}</h3>
          <div className="flex flex-col gap-4">
            {group.members.map((teacher) => (
              <TeacherDetails key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TeacherDetails({ teacher }: { teacher: Staff }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{teacher.fullName}</CardTitle>
        <p className="text-sm text-muted-foreground">{teacher.position}</p>
      </CardHeader>
      <CardContent>
        <dl>
          <InfoRow label="Образование, квалификация" value={teacher.education} />
          <InfoRow label="Учёная степень / звание" value={teacher.degree} />
          <InfoRow label="Переподготовка / повышение квалификации" value={teacher.training} />
          <InfoRow label="Общий стаж" value={teacher.totalExperience != null ? `${teacher.totalExperience} лет` : null} />
          <InfoRow
            label="Стаж по специальности"
            value={teacher.specialtyExperience != null ? `${teacher.specialtyExperience} лет` : null}
          />
          <InfoRow label="Преподаваемые дисциплины" value={teacher.teachesSubjects} />
        </dl>
      </CardContent>
    </Card>
  )
}
