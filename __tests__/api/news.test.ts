import { GET, POST } from '@/app/api/news/route'
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
    })),
    NextResponse: MockNextResponse
  }
})

describe('News API', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv, ADMIN_TOKEN: 'test-token' }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  test('GET returns empty array initially', async () => {
    const res = await GET()
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
  })

  test('POST returns 401 without valid token', async () => {
    const req = {
      headers: {
        get: (name: string) => name === 'x-admin-token' ? 'wrong-token' : null
      },
      json: async () => ({ title: 'Test News', content: 'Test Content' })
    } as any
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  test('POST adds news with valid token', async () => {
    const req = {
      headers: {
        get: (name: string) => name === 'x-admin-token' ? 'test-token' : null
      },
      json: async () => ({ title: 'Test News', content: 'Test Content' })
    } as any
    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data[0].title).toBe('Test News')
  })
})
