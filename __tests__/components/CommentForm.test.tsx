import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CommentForm from '@/components/CommentForm'

global.fetch = jest.fn()

const comments = [
  { id: '1', nickname: 'User', content: 'Comment', createdAt: new Date().toISOString() }
]

describe('CommentForm', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/api/comments') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(comments) })
      }
      if (url === '/api/comments?captcha=new') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ question: '1+1', answer: '2' }) })
      }
      return Promise.reject()
    })
  })

  test('renders form and comments', async () => {
    render(<CommentForm />)
    await waitFor(() => {
      expect(screen.getByText('User')).toBeInTheDocument()
    })
  })

  test('submits comment successfully', async () => {
    ;(global.fetch as jest.Mock).mockImplementation((url, options) => {
      if (url === '/api/comments' && options?.method === 'POST') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([...comments, { id: '2', nickname: 'New', content: 'New', createdAt: new Date().toISOString() }]) })
      }
      if (url === '/api/comments') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(comments) })
      }
      if (url === '/api/comments?captcha=new') {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ question: '1+1', answer: '2' }) })
      }
      return Promise.reject()
    })

    render(<CommentForm />)
    
    await waitFor(() => expect(screen.getByPlaceholderText('昵称 (不超过20个字)')).toBeInTheDocument())
    
    fireEvent.change(screen.getByPlaceholderText('昵称 (不超过20个字)'), { target: { value: 'Tester' } })
    fireEvent.change(screen.getByPlaceholderText('说点什么吧... (不超过500个字)'), { target: { value: 'Test comment' } })
    fireEvent.change(screen.getByPlaceholderText('答案'), { target: { value: '2' } })
    
    fireEvent.click(screen.getByText('发布留言'))

    await waitFor(() => {
      expect(screen.getByText('留言成功')).toBeInTheDocument()
    })
  })

  test('handles fetch error', async () => {
    ;(global.fetch as jest.Mock).mockImplementation((url) => {
      if (url === '/api/comments?captcha=new') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ question: '1+1=?', key: 'test', answer: '2' })
        })
      }
      return Promise.reject(new Error('API Down'))
    })
    
    render(<CommentForm />)
    
    // Wait for captcha to load
    await waitFor(() => {
      expect(screen.queryByText('加载验证码...')).not.toBeInTheDocument()
    })
    
    fireEvent.change(screen.getByPlaceholderText(/昵称/), { target: { value: 'User' } })
    fireEvent.change(screen.getByPlaceholderText(/说点什么/), { target: { value: 'Comment' } })
    fireEvent.change(screen.getByPlaceholderText('答案'), { target: { value: '2' } })
    fireEvent.click(screen.getByText('发布留言'))

    await waitFor(() => {
      expect(screen.getByText('网络错误，请稍后再试')).toBeInTheDocument()
    })
  })
})
