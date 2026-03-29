import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'
import { useTheme } from 'next-themes'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('ThemeToggle', () => {
  test('toggles theme on click', () => {
    const setTheme = jest.fn()
    ;(useTheme as jest.Mock).mockReturnValue({ theme: 'light', setTheme })
    
    render(<ThemeToggle />)
    const button = screen.getByLabelText('toggle-theme')
    fireEvent.click(button)
    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})
