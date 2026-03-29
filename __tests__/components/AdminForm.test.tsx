import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AdminForm from '@/components/AdminForm'

global.fetch = jest.fn()

describe('AdminForm', () => {
  test('renders form fields', () => {
    render(<AdminForm />)
    expect(screen.getByPlaceholderText('管理员口令')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('资讯标题')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('正文内容...')).toBeInTheDocument()
  })

  test('submits form successfully', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
    })

    render(<AdminForm />)
    
    fireEvent.change(screen.getByPlaceholderText('管理员口令'), { target: { value: 'token' } })
    fireEvent.change(screen.getByPlaceholderText('资讯标题'), { target: { value: 'title' } })
    fireEvent.change(screen.getByPlaceholderText('正文内容...'), { target: { value: 'content' } })
    
    fireEvent.click(screen.getByText('立即发布'))

    await waitFor(() => {
      expect(screen.getByText('发布成功')).toBeInTheDocument()
    })
  })

  test('handles fetch error', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('API Down')))
    render(<AdminForm />)
    
    fireEvent.change(screen.getByPlaceholderText('资讯标题'), { target: { value: 'Title' } })
    fireEvent.change(screen.getByPlaceholderText('正文内容...'), { target: { value: 'Content' } })
    fireEvent.change(screen.getByPlaceholderText('管理员口令'), { target: { value: 'secret' } })
    fireEvent.click(screen.getByText('立即发布'))

    await waitFor(() => {
      expect(screen.getByText('网络错误')).toBeInTheDocument()
    })
  })
})
