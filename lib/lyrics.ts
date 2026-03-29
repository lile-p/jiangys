export function parseLRC(lrc?: string): { time: number; text: string }[] {
  if (!lrc) return []
  const lines = lrc.split(/\r?\n/).filter(Boolean)
  const out: { time: number; text: string }[] = []
  const re = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\](.*)/
  for (const line of lines) {
    const m = re.exec(line)
    if (!m) continue
    const mm = Number(m[1])
    const ss = Number(m[2])
    let ms = 0
    if (m[3]) {
      const msStr = m[3]
      ms = Number(msStr)
      if (msStr.length === 2) ms *= 10 // centiseconds to milliseconds
    }
    out.push({ time: mm * 60 + ss + ms / 1000, text: m[4].trim() })
  }
  return out.sort((a, b) => a.time - b.time)
}

export function activeLyricIndex(list: { time: number }[], t: number) {
  if (!list.length) return -1
  let lo = 0, hi = list.length - 1, ans = 0
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (list[mid].time <= t) {
      ans = mid
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }
  return ans
}
