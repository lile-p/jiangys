import { render, screen } from '@testing-library/react'
import CommentsPage from '@/app/comments/page'

global.fetch = jest.fn()

describe('CommentsPage', () => {
  test('renders comments page content', () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })

    render(<CommentsPage />)
    expect(screen.getByText('留言板')).toBeInTheDocument()
  })
})
