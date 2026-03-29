import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}))

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn().mockReturnValue({ theme: 'light', setTheme: jest.fn() }),
}))

describe('Header', () => {
  test('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('音乐作品')).toBeInTheDocument()
    expect(screen.getByText('个人故事')).toBeInTheDocument()
    expect(screen.getByText('留言板')).toBeInTheDocument()
  })
})
