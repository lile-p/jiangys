import { render, screen } from '@testing-library/react'
import MusicPage from '@/app/music/page'

global.fetch = jest.fn()

describe('MusicPage', () => {
  test('renders music page content', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })

    const Result = await MusicPage()
    render(Result)
    
    expect(screen.getByText('音乐作品')).toBeInTheDocument()
    expect(screen.getByText('精选曲目')).toBeInTheDocument()
  })
})
