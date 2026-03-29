const stopWords = ['暴恐', '反人类', '涉黄', '辱骂']

export function filterSensitive(input: string): string {
  let text = input
  for (const w of stopWords) {
    const re = new RegExp(w, 'gi')
    text = text.replace(re, '*'.repeat(w.length))
  }
  return text
}

export function hasBlocked(input: string): boolean {
  return stopWords.some((w) => new RegExp(w, 'i').test(input))
}
