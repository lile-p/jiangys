import Timeline from '@/components/Timeline'
import type { TimelineEvent } from '@/lib/types'

async function getTimelineEvents() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/timeline`, { cache: 'no-store' })
    if (res.ok) return await res.json() as TimelineEvent[]
  } catch (e) {
    console.error('Fetch error:', e)
  }
  return []
}

export default async function TimelinePage() {
  const events = await getTimelineEvents()

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">个人故事</h1>
        <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-2xl">
          记录姜云升从初露锋芒到走向大众视野的每一个关键瞬间。
          每一个年份，每一段旋律，都见证了成长的力量。
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
        <Timeline events={events} />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="space-y-4">
          <div className="text-3xl font-bold text-brand italic">15+</div>
          <div className="text-xs uppercase tracking-widest text-gray-400">活跃年份</div>
        </div>
        <div className="space-y-4">
          <div className="text-3xl font-bold text-brand italic">200+</div>
          <div className="text-xs uppercase tracking-widest text-gray-400">原创作品</div>
        </div>
        <div className="space-y-4">
          <div className="text-3xl font-bold text-brand italic">50+</div>
          <div className="text-xs uppercase tracking-widest text-gray-400">全国巡演场次</div>
        </div>
      </section>
    </div>
  )
}
