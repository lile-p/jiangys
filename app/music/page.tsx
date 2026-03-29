import AudioPlayer from '@/components/AudioPlayer'
import Image from 'next/image'
import type { Track } from '@/lib/types'

async function getTracks() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${baseUrl}/api/tracks`, { cache: 'no-store' })
    if (res.ok) return await res.json() as Track[]
  } catch (e) {
    console.error('Fetch error:', e)
  }
  return []
}

export default async function MusicPage() {
  const tracks = await getTracks()
  const firstTrack = tracks[0]

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">音乐作品</h1>
        <p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-2xl">
          探索姜云升的音乐世界。从经典的《真没睡》到触动人心的每一句歌词，
          感受说唱与文字交织的力量。
        </p>
      </div>

      {firstTrack && <AudioPlayer track={firstTrack} />}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-bold">精选曲目</h2>
          <div className="space-y-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                    <Image
                      src={track.cover}
                      alt={track.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-brand transition-colors">{track.title}</h3>
                    <p className="text-[10px] text-gray-500 mt-1">{track.artist}</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{track.duration ? `${Math.floor(track.duration/60)}:${(track.duration%60).toString().padStart(2, '0')}` : '--:--'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-brand/5 border border-brand/10 flex flex-col justify-center space-y-4">
          <h2 className="text-xl font-bold text-brand">最新专辑</h2>
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
              alt="Latest Album"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            姜云升 2026 全新个人创作专辑《未你好吗》现已开启全网预约。
            收录 12 首原创作品，回归音乐本质，讲述成长与自我的对话。
          </p>
        </div>
      </section>
    </div>
  )
}
