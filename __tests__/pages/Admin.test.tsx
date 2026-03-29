import { render, screen } from '@testing-library/react'
import AdminPage from '@/app/admin/page'

global.fetch = jest.fn()

describe('AdminPage', () => {
  test('renders admin page content', () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })

    render(<AdminPage />)
    expect(screen.getByText('后台管理')).toBeInTheDocument()
  })
})
