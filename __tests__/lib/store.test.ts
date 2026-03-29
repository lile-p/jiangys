import { usePlayer } from '@/lib/store'

describe('Zustand Player Store', () => {
  test('should set current track', () => {
    const track = { id: '1', title: 'T', artist: 'A', cover: 'C', src: 'S' }
    usePlayer.getState().setCurrent(track as any)
    expect(usePlayer.getState().current).toEqual(track)
  })

  test('should toggle favorites', () => {
    const trackId = 'track-1'
    usePlayer.getState().toggleFavorite(trackId)
    expect(usePlayer.getState().favorites[trackId]).toBe(true)
    usePlayer.getState().toggleFavorite(trackId)
    expect(usePlayer.getState().favorites[trackId]).toBeUndefined()
  })
})
