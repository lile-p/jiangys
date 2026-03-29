import { GET as getAudit } from '@/app/api/audit/route'
import { GET as getTimeline } from '@/app/api/timeline/route'
import { GET as getTracks } from '@/app/api/tracks/route'
import { NextResponse } from 'next/server'

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
    NextResponse: MockNextResponse
  }
})

describe('Other APIs', () => {
  test('Audit API returns array', async () => {
    const res = await getAudit()
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
  })

  test('Timeline API returns events', async () => {
    const res = await getTimeline()
    const data = await res.json()
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('year')
  })

  test('Tracks API returns tracks', async () => {
    const res = await getTracks()
    const data = await res.json()
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('title')
  })
})
