'use client'
import { useEffect, useState } from 'react'
import Captcha from './Captcha'
import { clsx } from 'clsx'

export default function CommentForm() {
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [isCaptchaValid, setIsCaptchaValid] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<{ id: string; nickname: string; content: string; createdAt: string }[]>([])

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/comments')
      if (res.ok) setList(await res.json())
    } catch (e) {}
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleSubmit = async () => {
    if (!nickname.trim() || !content.trim()) {
      setMsg('昵称和内容不能为空')
      return
    }
    if (!isCaptchaValid) {
      setMsg('验证码错误')
      return
    }

    setLoading(true)
    setMsg(null)

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, content }),
      })

      if (res.ok) {
        setList(await res.json())
        setNickname('')
        setContent('')
        setMsg('留言成功')
      } else {
        setMsg(await res.text())
      }
    } catch (e) {
      setMsg('网络错误，请稍后再试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Form Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold tracking-tight">发表留言</h2>
        <div className="space-y-4">
          <input
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-brand outline-none transition-all"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="昵称 (不超过20个字)"
            maxLength={20}
          />
          <textarea
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-brand outline-none min-h-[120px] resize-none transition-all"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="说点什么吧... (不超过500个字)"
            maxLength={500}
          />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Captcha onVerify={setIsCaptchaValid} />
          <button
            onClick={handleSubmit}
            disabled={loading || !nickname.trim() || !content.trim() || !isCaptchaValid}
            className="px-10 py-3 rounded-full bg-brand text-white font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            发布留言
          </button>
        </div>
        {msg && (
          <p className={clsx(
            'text-xs mt-4 px-4 py-2 rounded-lg font-medium animate-in slide-in-from-top-2',
            msg === '留言成功' ? 'bg-green-50 text-green-600 dark:bg-green-950/20' : 'bg-red-50 text-red-600 dark:bg-red-950/20'
          )}>
            {msg}
          </p>
        )}
      </div>

      {/* List Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight px-4">最近留言 ({list.length})</h2>
        <div className="space-y-4">
          {list.map((c) => (
            <div key={c.id} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm animate-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-xs uppercase">
                    {c.nickname[0]}
                  </div>
                  <span className="text-sm font-semibold">{c.nickname}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  {new Date(c.createdAt).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                {c.content}
              </p>
            </div>
          ))}
          {list.length === 0 && (
            <div className="text-center py-20 text-gray-400 italic text-sm">
              还没有人留言，快来抢沙发吧~
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
