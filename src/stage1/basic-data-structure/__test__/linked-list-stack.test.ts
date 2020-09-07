import LinkedListStack from '../linked-list-stack'
import generateArr from '../../../util/generateArr'

describe('QueueStack测试', () => {
  test('push方法测试', () => {
    const stack = new LinkedListStack<number>()

    const testArr: number[] = generateArr(100, (i) => i)

    for (let i = 0; i < testArr.length; i++) {
      stack.push(testArr[i])
    }

    expect(stack.size()).toBe(100)
  })

  test('pop方法测试', () => {
    const stack = new LinkedListStack<number>()

    const testArr: number[] = generateArr(1000, (i) => i)

    for (let i = 0; i < testArr.length; i++) {
      stack.push(testArr[i])
    }

    expect(stack.size()).toBe(testArr.length)

    while (stack.size()) {
      expect(stack.peek()).toBe(stack.size() - 1)
      stack.pop()
    }
  })
})
