import Image from 'next/image'
import type { Track } from '@/lib/types'

export default function AlbumGrid({ tracks }: { tracks: Track[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {tracks.map((t) => (
        <div key={t.id} className="group rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-square">
            <Image
              src={t.cover}
              alt={t.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="p-4 bg-white dark:bg-gray-900">
            <h3 className="font-semibold text-sm line-clamp-1">{t.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{t.artist}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
