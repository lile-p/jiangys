import { NextResponse } from 'next/server'
import type { Track } from '@/lib/types'

const tracks: Track[] = [
  {
    id: '1',
    title: '真没睡',
    artist: '姜云升',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    src: '/audio/track1.mp3',
    lrc: '[00:00.00]姜云升 - 真没睡\n[00:01.00]作曲 : 姜云升\n[00:02.00]作词 : 姜云升\n[00:10.00]我真没睡呢 刚才只是在发呆\n[00:13.00]你说的那句话 我现在还在猜\n[00:16.00]如果你觉得累 那我就先离开\n[00:19.00]反正我这辈子 也就是个大反派',
    duration: 180
  },
  {
    id: '2',
    title: '你一定能够成为你想要去成为的人',
    artist: '姜云升',
    cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80',
    src: '/audio/track2.mp3',
    lrc: '[00:00.00]姜云升 - 你一定能够成为你想要去成为的人\n[00:10.00]你要相信你自己\n[00:13.00]不要在意别人的眼光',
    duration: 210
  }
]

export async function GET() {
  return NextResponse.json(tracks)
}
