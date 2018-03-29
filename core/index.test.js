const core = require('../dist/index')

test('basic', () => {
  const input = '172.168.5.1'
  const expected = 2896692481
  const actual = core(input)
  expect(actual).toBe(expected)
})

test('treat left/right space as valid', () => {
  const input = '172 . 168.5.1'
  const expected = 2896692481
  const actual = core(input)
  expect(actual).toBe(expected)
})

test('throw error when invalid input', () => {
  const input = '1 72.168.5.1'
  const actual = function() {
    core(input)
  }
  expect(actual).toThrow()
})
