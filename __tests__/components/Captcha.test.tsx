import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Captcha from '@/components/Captcha'

global.fetch = jest.fn()

const captcha = { question: '1 + 1 = ?', answer: '2' }

describe('Captcha', () => {
  test('renders question and verifies answer', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(captcha),
    })

    const onVerify = jest.fn()
    render(<Captcha onVerify={onVerify} />)
    
    await waitFor(() => {
      expect(screen.getByText('1 + 1 = ?')).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('答案')
    fireEvent.change(input, { target: { value: '2' } })
    expect(onVerify).toHaveBeenCalledWith(true)
  })
})
