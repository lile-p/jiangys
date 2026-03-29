import { NextResponse } from 'next/server'
import { getAudits } from '@/lib/audit'

export async function GET() {
  return NextResponse.json(getAudits())
}
