import AlbumGrid from '@/components/AlbumGrid'
import Countdown from '@/components/Countdown'
import Image from 'next/image'
import Link from 'next/link'
import type { NewsItem, Track } from '@/lib/types'

async function getHomeData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  let news: NewsItem[] = []
  let tracks: Track[] = []

  try {
    const [newsRes, tracksRes] = await Promise.all([
      fetch(`${baseUrl}/api/news`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/tracks`, { cache: 'no-store' })
    ])
    if (newsRes.ok) news = await newsRes.json()
    if (tracksRes.ok) tracks = await tracksRes.json()
  } catch (e) {
    console.error('Fetch error:', e)
  }

  // Fallback data if API returns empty or fetch fails
  if (news.length === 0) {
    news = [
      {
        id: '1',
        title: '姜云升 2026 “未你好吗” 巡回演唱会上海站开票',
        content: '姜云升 2026 “未你好吗” 巡回演唱会上海站即将于 4 月 15 日开启预售。本次巡演将带来多首全新未发布单曲，敬请期待。',
        date: new Date().toISOString(),
        cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80'
      }
    ]
  }

  return { news, tracks }
}

export default async function HomePage() {
  const { news, tracks } = await getHomeData()
  const latestNews = news[0]
  const tourDate = '2026-04-15T19:30:00Z'

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden group">
        <Image
          src={latestNews?.cover || 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1200&q=80'}
          alt="Hero"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-brand text-[10px] font-bold uppercase mb-4">
              最新动态
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {latestNews?.title || '姜云升 2026 “未你好吗” 巡回演唱会'}
            </h1>
            <p className="mt-4 text-sm text-gray-300 line-clamp-2">
              {latestNews?.content || '探索音乐的无限可能，共赴星海之约。'}
            </p>
          </div>
          <Link
            href="/news"
            className="flex-shrink-0 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-brand hover:text-white transition-colors text-sm"
          >
            阅读详情
          </Link>
        </div>
      </section>

      {/* Tour Countdown */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 gap-8">
        <div>
          <h2 className="text-2xl font-bold">巡演倒计时</h2>
          <p className="text-gray-500 mt-2 text-sm">
            下一站：<span className="text-brand font-medium">上海 · 梅赛德斯-奔驰文化中心</span>
          </p>
        </div>
        <Countdown to={tourDate} />
      </section>

      {/* Album Selection */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">专辑精选</h2>
          <Link href="/music" className="text-sm text-brand font-medium hover:underline">
            查看全部
          </Link>
        </div>
        <AlbumGrid tracks={tracks} />
      </section>
    </div>
  )
}
