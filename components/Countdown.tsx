'use client'
import { useEffect, useState } from 'react'

export default function Countdown({ to }: { to: string }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null)

  useEffect(() => {
    const end = new Date(to).getTime()
    const tick = () => {
      const now = Date.now()
      const diff = end - now
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 })
        return
      }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [to])

  if (!timeLeft) return null

  return (
    <div className="flex space-x-4">
      {[
        { value: timeLeft.d, label: '天' },
        { value: timeLeft.h, label: '时' },
        { value: timeLeft.m, label: '分' },
        { value: timeLeft.s, label: '秒' },
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="text-3xl font-bold text-brand tabular-nums">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase text-gray-400 mt-1">{item.label}</div>
        </div>
      ))}
    </div>
  )
}
