import { FileText, Download } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PageHeader } from '@/components/shared/PageHeader'
import { IconBadge } from '@/components/shared/IconBadge'
import { knowledgeDocs } from '@/data/seed'
import type { DocCategory } from '@/types'
import { formatDate } from '@/lib/utils'

const CATEGORIES: DocCategory[] = ['handbook', 'policy', 'reference', 'onboarding']

export function Knowledge() {
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Knowledge Hub"
        subtitle="Handbooks, policies, and reference documents — single source of truth."
      />
      {CATEGORIES.map((cat) => {
        const docs = knowledgeDocs.filter((d) => d.category === cat)
        if (!docs.length) return null
        return (
          <section key={cat}>
            <h2 className="font-display font-semibold capitalize mb-3">{cat}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {docs.map((doc) => (
                <Card key={doc.id} interactive className="cursor-pointer">
                  <CardHeader className="flex flex-row gap-3 items-start">
                    <IconBadge icon={FileText} />
                    <div>
                      <CardTitle className="text-base">{doc.title}</CardTitle>
                      <p className="text-sm text-slate-500 mt-1">{doc.summary}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex items-center justify-between text-xs text-slate-400">
                    <span>
                      Updated {formatDate(doc.updatedAt)} · {doc.size}
                    </span>
                    <button className="flex items-center gap-1 text-brand-600 hover:underline">
                      <Download className="w-3 h-3" /> Preview
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
