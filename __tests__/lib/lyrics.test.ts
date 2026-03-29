import { parseLRC, activeLyricIndex } from '@/lib/lyrics'

describe('Lyrics Utils', () => {
  test('parseLRC should parse valid LRC strings', () => {
    const lrc = '[00:01.00] Line 1\n[00:02.50] Line 2'
    const parsed = parseLRC(lrc)
    expect(parsed).toHaveLength(2)
    expect(parsed[0]).toEqual({ time: 1, text: 'Line 1' })
    expect(parsed[1]).toEqual({ time: 2.5, text: 'Line 2' })
  })

  test('parseLRC should handle empty or invalid input', () => {
    expect(parseLRC('')).toEqual([])
    expect(parseLRC(undefined)).toEqual([])
    expect(parseLRC('Invalid LRC')).toEqual([])
  })

  test('activeLyricIndex should find the correct index', () => {
    const lyrics = [
      { time: 1, text: 'L1' },
      { time: 3, text: 'L2' },
      { time: 5, text: 'L3' }
    ]
    expect(activeLyricIndex(lyrics, 0)).toBe(0)
    expect(activeLyricIndex(lyrics, 2)).toBe(0)
    expect(activeLyricIndex(lyrics, 4)).toBe(1)
    expect(activeLyricIndex(lyrics, 10)).toBe(2)
  })
})
