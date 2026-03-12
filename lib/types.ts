export type NewsItem = { id: string; title: string; content: string; date: string; cover?: string }
export type Track = { id: string; title: string; artist: string; cover: string; src: string; lrc?: string; duration?: number }
export type TimelineEvent = { id: string; year: number; title: string; description: string; cover?: string }
export type Comment = { id: string; nickname: string; content: string; createdAt: string }
export type AuditRecord = { id: string; actor: string; action: string; resource: string; at: string; meta?: Record<string, unknown> }
