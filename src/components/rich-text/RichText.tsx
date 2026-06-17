import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/lib/utils'

type RichTextData = SerializedEditorState | null | undefined

type RichTextProps = {
  data: RichTextData
  className?: string
}

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null

  return (
    <div
      className={cn(
        'prose prose-neutral max-w-none text-foreground [&_a]:text-primary [&_h2]:text-foreground [&_h3]:text-foreground [&_li]:text-foreground [&_p]:text-foreground',
        className,
      )}
    >
      <LexicalRichText data={data} />
    </div>
  )
}
