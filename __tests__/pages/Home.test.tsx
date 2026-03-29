import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '@/app/page'

global.fetch = jest.fn()

describe('HomePage', () => {
  test('renders homepage sections', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    })

    const Result = await HomePage()
    render(Result)
    
    expect(screen.getByText('最新动态')).toBeInTheDocument()
    expect(screen.getByText('巡演倒计时')).toBeInTheDocument()
    expect(screen.getByText('专辑精选')).toBeInTheDocument()
  })
})
