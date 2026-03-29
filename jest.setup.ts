import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
// @ts-ignore
global.TextDecoder = TextDecoder

// Simple mock for Response/NextResponse if not defined
if (typeof Response === 'undefined') {
  // @ts-ignore
  global.Response = class {
    body: any
    status: number
    headers: Map<string, string>
    constructor(body: any, init: any) {
      this.body = body
      this.status = init?.status || 200
      this.headers = new Map(Object.entries(init?.headers || {}))
    }
    static json(data: any, init: any) {
      return new Response(data, init)
    }
    async json() {
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    }
    async text() {
      return String(this.body)
    }
  }
}

// Mock crypto
const crypto = require('crypto')
if (!global.crypto) {
  // @ts-ignore
  global.crypto = crypto
}
if (!global.crypto.randomUUID) {
  // @ts-ignore
  global.crypto.randomUUID = crypto.randomUUID || (() => crypto.randomBytes(16).toString('hex'))
}

// Mock fetch
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([]),
    text: () => Promise.resolve(''),
  })
)
