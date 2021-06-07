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

  test('upper方法工作正常', () => {
    const testArr = generateArr(100, (i) => i)

    expect(BinarySearch.upper(testArr, 10)).toBe(11)
    expect(BinarySearch.upper(testArr, 55.5)).toBe(56)
    expect(BinarySearch.upper(testArr, -3)).toBe(0)
    expect(BinarySearch.upper(testArr, 100)).toBe(testArr.length)
  })

  test('ceil方法工作正常', () => {
    const testArr = generateArr(100, (i) => i)

    expect(BinarySearch.ceil(testArr, 10)).toBe(10)
    expect(BinarySearch.ceil(testArr, 63)).toBe(63)
    expect(BinarySearch.ceil(testArr, 55.5)).toBe(56)
    expect(BinarySearch.ceil(testArr, -3)).toBe(0)
    expect(BinarySearch.ceil(testArr, 100)).toBe(testArr.length)
  })

  test('lowerCeil方法工作正常', () => {
    const testArr = [1, 1, 2, 2, 3, 3, 4, 4]

    expect(BinarySearch.lowerCeil(testArr, 0)).toBe(0)
    expect(BinarySearch.lowerCeil(testArr, 1)).toBe(0)
    expect(BinarySearch.lowerCeil(testArr, 2)).toBe(2)
    expect(BinarySearch.lowerCeil(testArr, 2.5)).toBe(4)
    expect(BinarySearch.lowerCeil(testArr, 100)).toBe(testArr.length)
  })
  test('lower方法工作正常', () => {
    const testArr = [1, 1, 2, 2, 3, 3, 4, 4]

    expect(BinarySearch.lower(testArr, 0)).toBe(-1)
    expect(BinarySearch.lower(testArr, 1)).toBe(-1)
    expect(BinarySearch.lower(testArr, 2)).toBe(1)
    expect(BinarySearch.lower(testArr, 2.5)).toBe(3)
    expect(BinarySearch.lower(testArr, 100)).toBe(testArr.length - 1)
  })

  test('lowerBound能正确的获得target左边界', () => {
    const testArr = [1, 1, 2, 2, 3, 3, 4, 4]

    expect(BinarySearch.lowerBound(testArr, 0)).toBe(testArr.length)
    expect(BinarySearch.lowerBound(testArr, 1)).toBe(0)
    expect(BinarySearch.lowerBound(testArr, 2)).toBe(2)
    expect(BinarySearch.lowerBound(testArr, 3)).toBe(4)

    expect(BinarySearch.lowerBound(testArr, 2.5)).toBe(testArr.length)
    expect(BinarySearch.lowerBound(testArr, 100)).toBe(testArr.length)
  })
  test('upperBound能正确的获得target左边界', () => {
    const testArr = [1, 1, 2, 2, 3, 3, 4, 4]

    expect(BinarySearch.upperBound(testArr, 0)).toBe(testArr.length)
    expect(BinarySearch.upperBound(testArr, 1)).toBe(2)
    expect(BinarySearch.upperBound(testArr, 2)).toBe(4)
    expect(BinarySearch.upperBound(testArr, 3)).toBe(6)
    expect(BinarySearch.upperBound(testArr, 2.5)).toBe(testArr.length)
    expect(BinarySearch.upperBound(testArr, 100)).toBe(testArr.length)
  })
})
