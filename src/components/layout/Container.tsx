import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('mx-auto w-full max-w-[1440px] px-5 lg:px-[120px]', className)}>{children}</Tag>
}
