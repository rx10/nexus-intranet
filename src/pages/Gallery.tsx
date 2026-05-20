import { Play } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PageHeader } from '@/components/shared/PageHeader'
import { mediaGallery } from '@/data/seed'
import { formatDate } from '@/lib/utils'

export function Gallery() {
  return (
    <div className="page-container space-y-6 animate-fade-in">
      <PageHeader
        title="Events Gallery"
        subtitle="Photos and videos from office events and celebrations."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaGallery.map((item) => (
          <Card key={item.id} className="overflow-hidden group" interactive>
            <div className="relative aspect-video">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-[1.03]"
                loading="lazy"
              />
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="w-12 h-12 text-white" fill="currentColor" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex gap-2">
                <Badge>{item.type}</Badge>
                <Badge tone="brand">{item.event}</Badge>
              </div>
              <h3 className="font-semibold mt-2">{item.title}</h3>
              <p className="text-xs text-slate-500">{formatDate(item.date)}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
