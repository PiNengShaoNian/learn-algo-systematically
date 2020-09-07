import LinkedListQueue from '../linked-list-queue'
import generateArr from '../../../util/generateArr'

describe('LinkedListQueue测试', () => {
  test('enqueue方法正常工作', () => {
    const testArr = generateArr(1000, (i) => i)
    const queue = new LinkedListQueue<number>()

    for (let i = 0; i < testArr.length; i++) {
      queue.enqueue(testArr[i])
      expect(queue.front()).toBe(0)
    }

    expect(queue.size()).toBe(1000)
  })

  test('dequeue方法正常工作', () => {
    const testArr = generateArr(1000, (i) => i)
    const queue = new LinkedListQueue<number>()

    for (let i = 0; i < testArr.length; i++) {
      queue.enqueue(testArr[i])
    }

    while (!queue.isEmpty()) {
      const front = queue.front()
      expect(queue.dequeue()).toBe(front)
    }

    expect(queue.size()).toBe(0)
  })
})
