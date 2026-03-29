'use client'
import Image from 'next/image'
import { Howl } from 'howler'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Track } from '@/lib/types'
import { usePlayer } from '@/lib/store'
import { parseLRC, activeLyricIndex } from '@/lib/lyrics'
import { clsx } from 'clsx'

export default function AudioPlayer({ track }: { track: Track }) {
  const { toggleFavorite, favorites, setCurrent } = usePlayer()
  const howlRef = useRef<Howl | null>(null)
  const [pos, setPos] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  
  const parsedLyrics = useMemo(() => parseLRC(track.lrc), [track.lrc])
  const activeIndex = activeLyricIndex(parsedLyrics, pos)

  useEffect(() => {
    if (howlRef.current) {
      howlRef.current.unload()
    }

    const howl = new Howl({
      src: [track.src],
      html5: true,
      onplay: () => setPlaying(true),
      onpause: () => setPlaying(false),
      onstop: () => setPlaying(false),
      onend: () => setPlaying(false),
      onload: () => setDuration(howl.duration()),
    })

    howlRef.current = howl
    setCurrent(track)

    const interval = setInterval(() => {
      if (howl.playing()) {
        setPos(howl.seek() as number)
      }
    }, 100)

    return () => {
      howl.unload()
      clearInterval(interval)
    }
  }, [track, setCurrent])

  const togglePlay = () => {
    if (!howlRef.current) return
    if (howlRef.current.playing()) {
      howlRef.current.pause()
    } else {
      howlRef.current.play()
    }
  }

  const seek = (time: number) => {
    if (!howlRef.current) return
    howlRef.current.seek(time)
    setPos(time)
  }

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Track Info */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={track.cover}
              alt={track.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{track.title}</h2>
            <p className="text-gray-500 mt-1">{track.artist}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              aria-label={playing ? 'pause' : 'play'}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-brand text-white hover:scale-105 transition-transform"
            >
              {playing ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <button
              onClick={() => toggleFavorite(track.id)}
              aria-label="favorite"
              className={clsx(
                'p-3 rounded-full border transition-colors',
                favorites[track.id] ? 'bg-red-50 border-red-100 text-red-500' : 'border-gray-100 dark:border-gray-800 text-gray-400 hover:text-red-500'
              )}
            >
              <svg className="w-5 h-5" fill={favorites[track.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={pos}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>{formatTime(pos)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>

        {/* Right: Lyrics */}
        <div className="flex-grow h-[400px] overflow-y-auto pr-4 scroll-smooth lyric-container">
          {parsedLyrics.length > 0 ? (
            <div className="space-y-6 py-40">
              {parsedLyrics.map((line, i) => (
                <p
                  key={i}
                  className={clsx(
                    'text-lg transition-all duration-500 cursor-pointer hover:text-gray-900 dark:hover:text-white',
                    i === activeIndex ? 'text-brand font-bold scale-110 origin-left' : 'text-gray-300 dark:text-gray-700'
                  )}
                  onClick={() => seek(line.time)}
                >
                  {line.text}
                </p>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
              暂无歌词
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
