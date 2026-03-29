'use client'
import type { TimelineEvent } from '@/lib/types'
import Image from 'next/image'
import { useRef } from 'react'

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const sortedEvents = [...events].sort((a, b) => a.year - b.year)

  return (
    <div 
      ref={containerRef}
      className="flex overflow-x-auto pb-10 space-x-12 scroll-smooth snap-x cursor-grab active:cursor-grabbing hide-scrollbar"
    >
      {sortedEvents.map((event, i) => (
        <div 
          key={event.id} 
          className="flex-shrink-0 w-[320px] snap-center group"
        >
          <div className="relative">
            {/* Year Badge */}
            <div className="absolute -top-4 -left-4 z-10 w-16 h-16 flex items-center justify-center rounded-full bg-brand text-white font-bold shadow-xl border-4 border-white dark:border-gray-950 transition-transform group-hover:scale-110">
              {event.year}
            </div>

            {/* Content Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 pt-12 shadow-sm transition-all group-hover:shadow-xl group-hover:border-brand/20 h-full flex flex-col">
              {event.cover && (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                  <Image
                    src={event.cover}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-4 group-hover:text-brand transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {event.description}
              </p>
              
              {/* Connector */}
              {i < sortedEvents.length - 1 && (
                <div className="absolute top-1/2 -right-12 w-12 h-[2px] bg-gray-100 dark:bg-gray-800 hidden md:block" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
