import generateArr from '../../util/generateArr'
import MinHeap from '../min-heap'

test('min-heap工作正常', () => {
  const testArr = generateArr(3000, (i) => i, true)
  const pq = new MinHeap<number>()
  for (let i = 0; i < testArr.length; i++) {
    pq.insert(testArr[i])
  }

  testArr.sort((a, b) => a - b)

  for (let i = 0; i < testArr.length; i++) {
    expect(pq.deleteMin()).toBe(testArr[i])
  }

  expect(pq.size()).toBe(0)
})

test('max-heap构造函数工作正常', () => {
  const testArr = generateArr(3000, (i) => i, true)
  const pq = new MinHeap<number>(testArr)

  testArr.sort((a, b) => a - b)

  for (let i = 0; i < testArr.length; i++) {
    expect(pq.deleteMin()).toBe(testArr[i])
  }

  expect(pq.size()).toBe(0)
})
