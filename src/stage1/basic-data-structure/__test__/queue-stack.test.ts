import QueueStack from '../queue-stack'
import generateArr from '../../../util/generateArr'

describe('QueueStack测试', () => {
  test('push方法测试', () => {
    const stack = new QueueStack()

    const testArr: number[] = generateArr(100, (i) => i)

    for (let i = 0; i < testArr.length; i++) {
      stack.push(testArr[i])
    }

    expect(stack.size()).toBe(100)
  })

  test('pop方法测试', () => {
    const stack = new QueueStack<number>()

    const testArr: number[] = generateArr(100, (i) => i)

    for (let i = 0; i < testArr.length; i++) {
      stack.push(testArr[i])
    }

    expect(stack.size()).toBe(100)

    while (stack.size()) {
      expect(stack.peek()).toBe(stack.size() - 1)
      stack.pop()
    }
  })
})
