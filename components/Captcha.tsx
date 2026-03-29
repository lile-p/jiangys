'use client'
import { useEffect, useState } from 'react'

export default function Captcha({ onVerify }: { onVerify: (ok: boolean) => void }) {
  const [q, setQ] = useState<{ key: string; question: string; answer: string } | null>(null)
  const [a, setA] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchCaptcha = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/comments?captcha=new')
      if (res.ok) setQ(await res.json())
    } catch (e) {
      console.error('Failed to fetch captcha:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaptcha()
  }, [])

  useEffect(() => {
    if (!q) return
    onVerify(a.trim() === q.answer)
  }, [a, q, onVerify])

  if (!q) return <div className="text-xs text-gray-500 animate-pulse">加载验证码...</div>

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium">{q.question}</span>
        <button 
          onClick={fetchCaptcha}
          disabled={loading}
          className="p-1 hover:text-brand transition-colors disabled:opacity-50"
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </button>
      </div>
      <input
        value={a}
        onChange={(e) => setA(e.target.value)}
        className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm w-24 bg-transparent focus:ring-1 focus:ring-brand outline-none"
        placeholder="答案"
        aria-label="captcha"
      />
    </div>
  )
}
