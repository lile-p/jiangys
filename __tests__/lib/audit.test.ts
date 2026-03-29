import { addAudit, getAudits } from '@/lib/audit'

describe('Audit Utils', () => {
  test('should add and retrieve audits', () => {
    const record = { id: '1', actor: 'A', action: 'C', resource: 'R', at: 'T' }
    addAudit(record)
    const audits = getAudits()
    expect(audits).toContainEqual(record)
  })
})
