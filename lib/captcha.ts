export function newCaptcha() {
  const a = Math.floor(1 + Math.random() * 9)
  const b = Math.floor(1 + Math.random() * 9)
  const operators = ['+', '-']
  const op = operators[Math.floor(Math.random() * operators.length)]
  
  let question = ''
  let answer = ''
  
  if (op === '+') {
    question = `${a} + ${b} = ?`
    answer = String(a + b)
  } else {
    // Ensure positive result for simplicity
    const max = Math.max(a, b)
    const min = Math.min(a, b)
    question = `${max} - ${min} = ?`
    answer = String(max - min)
  }

  return {
    key: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    question,
    answer
  }
}
