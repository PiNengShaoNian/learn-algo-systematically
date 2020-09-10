import BinarySearch from '../binary-search'
import generateArr from '../../util/generateArr'

describe('二分查找测试', () => {
  test('binarySearch工作正常', () => {
    const testArr = generateArr(1000, (i) => i - 10)
    for (let i = 0; i < testArr.length; i++) {
      expect(BinarySearch.binarySearch<number>(testArr, testArr[i])).toBe(i)
    }

    for (let i = 0; i < testArr.length; i++) {
      expect(BinarySearch.binarySearch1<number>(testArr, testArr[i])).toBe(i)
    }

    expect(BinarySearch.binarySearch(testArr, 999)).toBe(-1)
  })

  test('ceiling方法工作正常', () => {
    const testArr = generateArr(100, (i) => i)

    expect(BinarySearch.ceiling(testArr, 10)).toBe(10)
    expect(BinarySearch.ceiling(testArr, 55.5)).toBe(56)
    expect(BinarySearch.ceiling(testArr, -3)).toBe(0)
    expect(BinarySearch.ceiling(testArr, 100)).toBe(testArr.length)
  })
})
