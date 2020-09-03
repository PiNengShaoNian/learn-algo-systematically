import isValid from '../valid-parentheses'

test('valid-parentheses测试', () => {
  const s1 = '[][]{}[]'
  const s2 = '{{{{{{}}}}}'
  const s3 = '{()}[{{[[]]}}]'
  const s4 = '{{{{}]'

  expect(isValid(s1)).toBeTruthy()
  expect(isValid(s2)).toBeFalsy()
  expect(isValid(s3)).toBeTruthy()
  expect(isValid(s4)).toBeFalsy()
})
