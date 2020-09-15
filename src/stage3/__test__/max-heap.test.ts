import generateArr from '../../util/generateArr'
import MaxHeap from '../max-heap'

test('max-heap工作正常', () => {
  const testArr = generateArr(3000, (i) => i, true)
  const pq = new MaxHeap<number>()
  for (let i = 0; i < testArr.length; i++) {
    pq.insert(testArr[i])
  }

  testArr.sort((a, b) => b - a)

  for (let i = 0; i < testArr.length; i++) {
    expect(pq.deleteMax()).toBe(testArr[i])
  }

  expect(pq.size()).toBe(0)
})

test('max-heap构造函数工作正常', () => {
  const testArr = generateArr(3000, (i) => i, true)
  const pq = new MaxHeap<number>(testArr)

  testArr.sort((a, b) => b - a)

  for (let i = 0; i < testArr.length; i++) {
    expect(pq.deleteMax()).toBe(testArr[i])
  }

  expect(pq.size()).toBe(0)
})
