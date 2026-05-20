import { useMemo, useState } from 'react'
import { FileText, Download, Search, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { PageHeader } from '@/components/shared/PageHeader'
import { FilterPills } from '@/components/shared/FilterPills'
import { IconBadge } from '@/components/shared/IconBadge'
import { EmptyState } from '@/components/shared/EmptyState'
import { knowledgeDocs } from '@/data/seed'
import type { BadgeTone, DocCategory, KnowledgeDoc } from '@/types'
import { formatDate } from '@/lib/utils'

const CATEGORY_LABELS: Record<DocCategory, string> = {
  handbook: 'Handbook',
  policy: 'Policy',
  reference: 'Reference',
  onboarding: 'Onboarding',
}

const CATEGORY_TONES: Record<DocCategory, BadgeTone> = {
  handbook: 'brand',
  policy: 'warning',
  reference: 'info',
  onboarding: 'success',
}

type Filter = 'all' | DocCategory

const FILTER_OPTIONS: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'handbook', label: 'Handbooks' },
  { value: 'policy', label: 'Policies' },
  { value: 'reference', label: 'References' },
  { value: 'onboarding', label: 'Onboarding' },
]

export function Knowledge() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [activeDoc, setActiveDoc] = useState<KnowledgeDoc | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return knowledgeDocs.filter((d) => {
      if (filter !== 'all' && d.category !== filter) return false
      if (!q) return true
      return (
        d.title.toLowerCase().includes(q) ||
        d.summary.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
      )
    })
  }, [filter, query])

  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Knowledge Hub"
        subtitle="Handbooks, policies, and reference documents — single source of truth."
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search documents"
          />
        </div>
      </div>

      <FilterPills options={FILTER_OPTIONS} value={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nothing matches"
          description="Try a different search term or category."
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((doc) => (
            <Card key={doc.id} interactive>
              <button
                type="button"
                onClick={() => setActiveDoc(doc)}
                className="text-left w-full h-full"
              >
                <CardHeader className="flex flex-row gap-3 items-start">
                  <IconBadge icon={FileText} />
                  <div className="flex-1 min-w-0">
                    <Badge tone={CATEGORY_TONES[doc.category]} className="mb-1">
                      {CATEGORY_LABELS[doc.category]}
                    </Badge>
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">{doc.summary}</p>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Updated {formatDate(doc.updatedAt)} · {doc.size}
                  </span>
                  <span className="flex items-center gap-1 text-brand-600 font-medium">
                    <Download className="w-3 h-3" /> Preview
                  </span>
                </CardContent>
              </button>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!activeDoc}
        onClose={() => setActiveDoc(null)}
        title={activeDoc?.title}
        subtitle={
          activeDoc && (
            <span className="flex items-center gap-2 flex-wrap">
              <Badge tone={CATEGORY_TONES[activeDoc.category]}>
                {CATEGORY_LABELS[activeDoc.category]}
              </Badge>
              <span className="text-xs text-slate-500">
                Updated {formatDate(activeDoc.updatedAt)} · {activeDoc.size}
              </span>
            </span>
          )
        }
        size="lg"
        actions={
          <>
            <Button variant="secondary" onClick={() => setActiveDoc(null)}>
              Close
            </Button>
            <Button>
              <Download className="w-4 h-4" /> Download
            </Button>
          </>
        }
      >
        {activeDoc && (
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">{activeDoc.summary}</p>
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-sm text-slate-600 mt-3 font-medium">
                Document preview
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                In production, this pane renders the PDF / markdown content. For
                this demo we simulate the preview with a placeholder while the
                metadata, search, and filtering all behave realistically.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <DocMetaRow label="Category" value={CATEGORY_LABELS[activeDoc.category]} />
              <DocMetaRow label="Last updated" value={formatDate(activeDoc.updatedAt)} />
              <DocMetaRow label="File size" value={activeDoc.size} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function DocMetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-slate-800 font-medium mt-0.5">{value}</p>
    </div>
  )
}
