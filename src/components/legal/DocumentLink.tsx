import { Badge } from '@/components/ui/badge'
import { getDocumentHref, resolveDocument } from '@/components/legal/utils'
import type { Document } from '@/payload-types'

type DocumentLinkProps = {
  document: string | Document | null | undefined
  fallbackLabel?: string
}

export function DocumentLink({ document, fallbackLabel = 'Открыть документ' }: DocumentLinkProps) {
  const resolved = resolveDocument(document)
  const href = getDocumentHref(resolved)

  if (!resolved || !href) {
    return <span className="text-sm text-muted-foreground">Документ не опубликован</span>
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
        {resolved.title || fallbackLabel}
      </a>
      {resolved.signedWithEP ? <Badge variant="secondary">ЭП</Badge> : null}
    </span>
  )
}
