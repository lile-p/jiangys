import { render, screen } from '@testing-library/react'
import TimelinePage from '@/app/timeline/page'

global.fetch = jest.fn()

describe('TimelinePage', () => {
  test('renders timeline page content', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })

    const Result = await TimelinePage()
    render(Result)
    
    expect(screen.getByText('个人故事')).toBeInTheDocument()
  })
})
