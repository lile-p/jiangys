import { GET, POST } from '@/app/api/comments/route'
import { NextRequest, NextResponse } from 'next/server'

jest.mock('next/server', () => {
  const MockNextResponse = jest.fn().mockImplementation((body, init) => ({
    status: init?.status || 200,
    body,
    json: async () => typeof body === 'string' ? JSON.parse(body) : body,
  }))
  ;(MockNextResponse as any).json = (data: any, init?: any) => ({
    status: init?.status || 200,
    json: async () => data,
  })
  return {
    NextRequest: jest.fn().mockImplementation((url, init) => ({
      url,
      ...init,
      nextUrl: new URL(url),
      json: async () => typeof init?.body === 'string' ? JSON.parse(init.body) : init?.body,
      headers: {
        get: (name: string) => init?.headers?.[name] || null
      }
    })),
    NextResponse: MockNextResponse
  }
})

describe('Comments API', () => {
  test('GET returns initial comments', async () => {
    const req = {
      nextUrl: { searchParams: new URLSearchParams() }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(data.length).toBeGreaterThan(0)
  })

  test('GET returns new captcha', async () => {
    const req = {
      nextUrl: { searchParams: new URLSearchParams('captcha=new') }
    } as any
    const res = await GET(req)
    const data = await res.json()
    expect(data).toHaveProperty('question')
    expect(data).toHaveProperty('key')
  })

  test('POST adds comment and returns list', async () => {
    const req = {
      headers: {
        get: () => '1.1.1.1'
      },
      json: async () => ({
        nickname: 'TestUser',
        content: 'Hello world',
        captchaAnswer: 'mock',
        captchaKey: 'mock'
      })
    } as any
    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data[0].nickname).toBe('TestUser')
  })

  test('POST blocks sensitive content', async () => {
    const req = {
      headers: { get: () => '2.2.2.2' },
      json: async () => ({ nickname: 'Test', content: '涉黄内容' })
    } as any
    const res = await POST(req)
    expect(res.status).toBe(403)
  })

  test('POST returns 400 for empty nickname or content', async () => {
    const req = {
      headers: { get: () => '3.3.3.3' },
      json: async () => ({ nickname: '', content: '' })
    } as any
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  test('POST returns 429 for rapid requests', async () => {
    const req = {
      headers: { get: () => '4.4.4.4' },
      json: async () => ({ nickname: 'T', content: 'C' })
    } as any
    await POST(req)
    const res = await POST(req)
    expect(res.status).toBe(429)
  })
})
