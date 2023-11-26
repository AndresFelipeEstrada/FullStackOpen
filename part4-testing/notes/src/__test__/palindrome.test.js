import { palindrome } from '../utils/for_testing.js'

test('palidronme of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palidronme of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palidronme of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})
