'use client'
import { useEffect, useState } from 'react'

export default function AuditLogList() {
  const [list, setList] = useState<any[]>([])

  const fetchAudits = async () => {
    try {
      const res = await fetch('/api/audit')
      if (res.ok) setList(await res.json())
    } catch (e) {}
  }

  useEffect(() => {
    fetchAudits()
    const id = setInterval(fetchAudits, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold tracking-tight px-4">审计日志</h2>
      <div className="space-y-3">
        {list.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all shadow-sm text-xs font-mono">
            <div className="flex items-center space-x-4">
              <span className="text-brand font-bold uppercase">{r.action}</span>
              <span className="text-gray-900 dark:text-white font-medium">{r.actor}</span>
              <span className="text-gray-400">on</span>
              <span className="text-gray-900 dark:text-white font-medium uppercase tracking-widest">{r.resource}</span>
            </div>
            <div className="text-gray-400">{new Date(r.at).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-20 text-gray-400 italic text-sm">
            暂无审计记录
          </div>
        )}
      </div>
    </div>
  )
}
