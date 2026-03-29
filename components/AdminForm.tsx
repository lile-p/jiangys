'use client'
import { useState } from 'react'
import { clsx } from 'clsx'

export default function AdminForm() {
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!token || !title || !content) {
      setMsg('请填写所有必填项')
      return
    }

    setLoading(true)
    setMsg(null)

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ title, content }),
      })

      if (res.ok) {
        setMsg('发布成功')
        setTitle('')
        setContent('')
      } else {
        setMsg('发布失败：' + (await res.text()))
      }
    } catch (e) {
      setMsg('网络错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm space-y-6">
      <h2 className="text-xl font-bold tracking-tight px-4">发布新动态</h2>
      <div className="space-y-4">
        <input
          className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-brand outline-none transition-all"
          placeholder="管理员口令"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <input
          className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-brand outline-none transition-all font-semibold"
          placeholder="资讯标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-brand outline-none min-h-[120px] resize-none transition-all"
          placeholder="正文内容..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={loading || !token || !title || !content}
        className="w-full py-4 rounded-full bg-brand text-white font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
      >
        {loading && (
          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        立即发布
      </button>

      {msg && (
        <p className={clsx(
          'text-xs mt-4 px-4 py-2 rounded-lg font-medium text-center animate-in slide-in-from-top-2',
          msg === '发布成功' ? 'bg-green-50 text-green-600 dark:bg-green-950/20' : 'bg-red-50 text-red-600 dark:bg-red-950/20'
        )}>
          {msg}
        </p>
      )}
    </div>
  )
}
