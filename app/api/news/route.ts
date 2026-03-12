import { NextRequest, NextResponse } from "next/server"
import type { NewsItem } from "@/lib/types"
import { addAudit } from "@/lib/audit"
const mem: NewsItem[] = []
export async function GET(){ return NextResponse.json(mem.slice(0,20)) }
export async function POST(req: NextRequest){
  const token = req.headers.get("x-admin-token") ?? ""
  if(!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) return new NextResponse("Unauthorized", { status: 401 })
  const body = await req.json()
  const item: NewsItem = { id: `${Date.now()}`, title: body.title, content: body.content, date: new Date().toISOString(), cover: body.cover }
  mem.unshift(item)
  addAudit({ id: crypto.randomUUID(), actor: "admin", action: "create", resource: "news", at: new Date().toISOString(), meta: { id: item.id } })
  return NextResponse.json(mem.slice(0,20))
}
