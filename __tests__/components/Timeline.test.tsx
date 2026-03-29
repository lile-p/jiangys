import { render, screen } from '@testing-library/react'
import Timeline from '@/components/Timeline'

const events = [
  {
    id: '1',
    year: 2020,
    title: 'Event 2020',
    description: 'Desc 2020',
  },
  {
    id: '2',
    year: 2021,
    title: 'Event 2021',
    description: 'Desc 2021',
  }
]

describe('Timeline', () => {
  test('renders events', () => {
    render(<Timeline events={events as any} />)
    expect(screen.getByText('2020')).toBeInTheDocument()
    expect(screen.getByText('Event 2020')).toBeInTheDocument()
    expect(screen.getByText('2021')).toBeInTheDocument()
    expect(screen.getByText('Event 2021')).toBeInTheDocument()
  })
})
