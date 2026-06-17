import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getMediaUrl } from '@/lib/payload/media'
import type { Document } from '@/payload-types'

type DocumentListProps = {
  documents: Document[]
  groupByCategory?: boolean
}

export function DocumentList({ documents, groupByCategory = false }: DocumentListProps) {
  if (!documents.length) {
    return <p className="text-muted-foreground">Документы не опубликованы.</p>
  }

  if (!groupByCategory) {
    return (
      <div className="flex flex-col gap-4">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    )
  }

  const grouped = documents.reduce<Record<string, Document[]>>((acc, doc) => {
    const key = doc.category
    if (!acc[key]) acc[key] = []
    acc[key].push(doc)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="flex flex-col gap-4">
          <h2 className="text-xl font-medium text-foreground">{category}</h2>
          <div className="flex flex-col gap-4">
            {items.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function DocumentCard({ document }: { document: Document }) {
  const fileUrl = getMediaUrl(typeof document.file === 'object' ? document.file : null)
  const href = document.externalUrl || fileUrl

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <CardTitle className="text-base">{document.title}</CardTitle>
        {document.signedWithEP ? <Badge variant="secondary">ЭП</Badge> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {document.description ? (
          <p className="text-sm text-muted-foreground">{document.description}</p>
        ) : null}
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
            Открыть документ
          </a>
        ) : null}
      </CardContent>
    </Card>
  )
}
