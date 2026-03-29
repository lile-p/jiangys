import { render, screen, waitFor } from '@testing-library/react'
import AuditLogList from '@/components/AuditLogList'

global.fetch = jest.fn()

const audits = [
  { action: 'create', actor: 'Admin', resource: 'news', at: new Date().toISOString() }
]

describe('AuditLogList', () => {
  test('renders audit logs', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(audits),
    })

    render(<AuditLogList />)
    
    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument()
      expect(screen.getByText(/create/i)).toBeInTheDocument()
    })
  })
})
