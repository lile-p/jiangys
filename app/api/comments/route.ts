import { NextRequest, NextResponse } from 'next/server'
import type { Comment } from '@/lib/types'
import { filterSensitive, hasBlocked } from '@/lib/sensitive'
import { newCaptcha } from '@/lib/captcha'
import { addAudit } from '@/lib/audit'

const comments: Comment[] = [
  {
    id: '1',
    nickname: '星星',
    content: '姜老师的歌词真的太顶了，每一句都戳在心上。',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    nickname: '乐迷小张',
    content: '巡演上海站见！',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
]

let lastIpTime: Record<string, number> = {}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('captcha') === 'new') {
    return NextResponse.json(newCaptcha())
  }
  return NextResponse.json(comments.slice(0, 50))
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  
  // Basic rate limiting
  if (lastIpTime[ip] && now - lastIpTime[ip] < 5000) {
    return new NextResponse('发布频率过快，请稍后再试', { status: 429 })
  }
  lastIpTime[ip] = now

  const body = await req.json()
  const { nickname, content, captchaAnswer, captchaKey } = body

  // Simple validation
  if (!nickname || !content) {
    return new NextResponse('内容不能为空', { status: 400 })
  }

  // Check for blocked words
  if (hasBlocked(content)) {
    return new NextResponse('内容包含不当言论', { status: 403 })
  }

  const newComment: Comment = {
    id: `${Date.now()}`,
    nickname: nickname.slice(0, 20),
    content: filterSensitive(content.slice(0, 500)),
    createdAt: new Date().toISOString()
  }

  comments.unshift(newComment)
  
  // Log audit
  addAudit({
    id: crypto.randomUUID(),
    actor: nickname,
    action: 'create',
    resource: 'comment',
    at: new Date().toISOString()
  })

  return NextResponse.json(comments.slice(0, 50))
}
