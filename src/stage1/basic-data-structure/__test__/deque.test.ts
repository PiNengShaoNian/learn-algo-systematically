import generateArr from '../../../util/generateArr'
import Deque from '../deque'

describe('Deque测试', () => {
  test('addLast方法工作正常', () => {
    const testArr = generateArr(1000, (i) => i, true)

    const deque = new Deque<number>()
    for (let i = 0; i < testArr.length; i++) {
      deque.addLast(testArr[i])
      expect(deque.tail()).toBe(testArr[i])
    }
  })

  test('addFront方法工作正常', () => {
    const testArr = generateArr(1000, (i) => i, true)

    const deque = new Deque<number>()
    for (let i = 0; i < testArr.length; i++) {
      deque.addFront(testArr[i])
      expect(deque.front()).toBe(testArr[i])
    }
  })

  test('removeFront方法工作正常', () => {
    const testArr = generateArr(1000, (i) => i, true)

    const deque = new Deque<number>()
    for (let i = 0; i < testArr.length; i++) {
      deque.addFront(testArr[i])
    }

    while (!deque.isEmpty()) {
      const front = deque.front()

      expect(deque.removeFront()).toBe(front)
    }

    expect(deque.isEmpty()).toBeTruthy()
  })

  test('removeLast方法工作正常', () => {
    const testArr = generateArr(1000, (i) => i)

    const deque = new Deque<number>()
    for (let i = 0; i < testArr.length; i++) {
      deque.addFront(testArr[i])
    }

    while (!deque.isEmpty()) {
      const tail = deque.tail()

      expect(deque.removeLast()).toBe(tail)
    }

    expect(deque.isEmpty()).toBeTruthy()
  })

  test('resize工作正常', () => {
    const deque = new Deque(50)

    for (let i = 0; i < 101; i++) {
      if (i % 2 === 0) {
        deque.addFront(i)
      } else {
        deque.addLast(i)
      }
    }

    expect(deque.size()).toBe(101)
    expect(deque.capacity()).toBe(200)

    for (let i = 0; i < 51; i++) {
      deque.removeFront()
    }

    expect(deque.size()).toBe(50)
    expect(deque.capacity()).toBe(100)
  })
})
