import { NextResponse } from 'next/server'
import type { TimelineEvent } from '@/lib/types'

const events: TimelineEvent[] = [
  {
    id: '1',
    year: 2011,
    title: '初露锋芒',
    description: '姜云升开始尝试创作说唱歌曲，并在网络上发布作品。',
  },
  {
    id: '2',
    year: 2015,
    title: '《真没睡》发布',
    description: '单曲《真没睡》发布并获得广泛关注，标志着其独特风格的确立。',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80'
  },
  {
    id: '3',
    year: 2018,
    title: '地下八英里冠军',
    description: '姜云升获得《地下八英里》全国总决赛冠军，奠定了在说唱圈的地位。',
  },
  {
    id: '4',
    year: 2020,
    title: '说唱新世代',
    description: '参加《说唱新世代》并最终获得总决赛第九名，凭借深度的歌词创作和个人魅力获得大众喜爱。',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80'
  },
  {
    id: '5',
    year: 2022,
    title: '全国巡演开启',
    description: '姜云升开启全国个人巡回演唱会，多站门票秒罄，展现极强市场号召力。',
  },
  {
    id: '6',
    year: 2026,
    title: '“未你好吗”',
    description: '开启 2026 全新巡演，并发布个人创作专辑《未你好吗》。',
  }
]

export async function GET() {
  return NextResponse.json(events)
}
