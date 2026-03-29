import { newCaptcha } from '@/lib/captcha'

describe('Captcha Utils', () => {
  test('should generate a valid captcha', () => {
    // Run multiple times to cover both + and - branches
    for (let i = 0; i < 20; i++) {
      const captcha = newCaptcha()
      expect(captcha).toHaveProperty('key')
      expect(captcha).toHaveProperty('question')
      expect(captcha).toHaveProperty('answer')
      expect(typeof captcha.answer).toBe('string')
      
      // Check if it's a valid math question
      if (captcha.question.includes('+')) {
        const [a, b] = captcha.question.split(' + ').map(s => parseInt(s))
        expect(parseInt(captcha.answer)).toBe(a + b)
      } else {
        const [a, b] = captcha.question.split(' - ').map(s => parseInt(s))
        expect(parseInt(captcha.answer)).toBe(a - b)
      }
    }
  })
})
