import { filterSensitive, hasBlocked } from '@/lib/sensitive'

describe('Sensitive Word Filter', () => {
  test('should detect blocked words', () => {
    expect(hasBlocked('这是暴恐信息')).toBe(true)
    expect(hasBlocked('正常内容')).toBe(false)
  })

  test('should filter sensitive words', () => {
    expect(filterSensitive('包含涉黄词汇')).toBe('包含**词汇')
    expect(filterSensitive('无敏感词')).toBe('无敏感词')
  })
})
