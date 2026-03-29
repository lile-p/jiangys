import { render, screen } from '@testing-library/react'
import Countdown from '@/components/Countdown'

describe('Countdown', () => {
  test('renders countdown units', () => {
    const futureDate = new Date(Date.now() + 10000000).toISOString()
    render(<Countdown to={futureDate} />)
    expect(screen.getByText('天')).toBeInTheDocument()
    expect(screen.getByText('时')).toBeInTheDocument()
    expect(screen.getByText('分')).toBeInTheDocument()
    expect(screen.getByText('秒')).toBeInTheDocument()
  })
})
