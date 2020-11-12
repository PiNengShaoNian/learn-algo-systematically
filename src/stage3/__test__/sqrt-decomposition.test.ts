import { SQRTDecomposition } from '../sqrt-decomposition'

test('SQRTDecomposition正常工作', () => {
  const testArr = [-2, 0, 3, -5, 2, -1]
  const sqrt = new SQRTDecomposition<number>(testArr, (a, b) => a + b)

  expect(sqrt.query(0, 2)).toBe(1)
  expect(sqrt.query(0, 3)).toBe(-4)

  sqrt.update(0, 5)

  expect(sqrt.query(0, 2)).toBe(8)
  expect(sqrt.query(0, 3)).toBe(3)
})
