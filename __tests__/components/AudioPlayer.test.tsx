import { render, screen, fireEvent, act } from '@testing-library/react'
import AudioPlayer from '@/components/AudioPlayer'
import { usePlayer } from '@/lib/store'

const mockHowlInstance = {
  play: jest.fn().mockImplementation(function(this: any) {
    if (this.options?.onplay) this.options.onplay()
  }),
  pause: jest.fn().mockImplementation(function(this: any) {
    if (this.options?.onpause) this.options.onpause()
  }),
  unload: jest.fn(),
  seek: jest.fn(),
  duration: jest.fn().mockReturnValue(180),
  playing: jest.fn().mockReturnValue(false),
  options: {} as any
}

jest.mock('howler', () => ({
  Howl: jest.fn().mockImplementation(function(this: any, options: any) {
    this.play = mockHowlInstance.play.bind(this)
    this.pause = mockHowlInstance.pause.bind(this)
    this.unload = mockHowlInstance.unload
    this.seek = mockHowlInstance.seek
    this.duration = mockHowlInstance.duration
    this.playing = mockHowlInstance.playing
    this.options = options
    
    // Simulate onload immediately
    if (options.onload) {
      setTimeout(() => options.onload(), 0)
    }
    return this
  })
}))

describe('AudioPlayer', () => {
  const track = {
    id: '1',
    title: 'Test Song',
    artist: 'Test Artist',
    cover: '/test.jpg',
    src: '/test.mp3',
    lrc: '[00:10.00]Lyric line 1\n[00:20.00]Lyric line 2',
    duration: 180
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders track info', () => {
    render(<AudioPlayer track={track as any} />)
    expect(screen.getByText('Test Song')).toBeInTheDocument()
    expect(screen.getByText('Test Artist')).toBeInTheDocument()
  })

  test('toggles play/pause', async () => {
    render(<AudioPlayer track={track as any} />)
    const playButton = screen.getByLabelText('play')
    await act(async () => {
      fireEvent.click(playButton)
    })
    expect(mockHowlInstance.play).toHaveBeenCalled()
    
    const pauseButton = await screen.findByLabelText('pause')
    await act(async () => {
      fireEvent.click(pauseButton)
    })
    expect(mockHowlInstance.pause).toHaveBeenCalled()
  })

  test('toggles favorite', () => {
    render(<AudioPlayer track={track as any} />)
    const favButton = screen.getByLabelText('favorite')
    fireEvent.click(favButton)
    expect(favButton).toBeInTheDocument()
  })

  test('seeks on range change', async () => {
    render(<AudioPlayer track={track as any} />)
    // Wait for the component to mount and the effect to run
    await screen.findByText('Test Song')
    
    const range = screen.getByRole('slider')
    await act(async () => {
      fireEvent.change(range, { target: { value: '50' } })
    })
    expect(mockHowlInstance.seek).toHaveBeenCalledWith(50)
  })

  test('seeks on lyric click', async () => {
    render(<AudioPlayer track={track as any} />)
    const lyric = screen.getByText('Lyric line 1')
    await act(async () => {
      fireEvent.click(lyric)
    })
    expect(mockHowlInstance.seek).toHaveBeenCalledWith(10)
  })

  test('handles empty lyrics', () => {
    const trackNoLrc = { ...track, lrc: '' }
    render(<AudioPlayer track={trackNoLrc as any} />)
    expect(screen.getByText('暂无歌词')).toBeInTheDocument()
  })
})
