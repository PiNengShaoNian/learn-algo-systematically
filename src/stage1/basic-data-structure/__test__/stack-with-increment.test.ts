import CustomStack from '../stack-with-increment'

describe('CustomStack测试', () => {
  test('push方法工作正常', () => {
    const maxSize = 1000
    const stack = new CustomStack(maxSize)

    expect(stack.peek()).toBe(-1)

    for (let i = 0; i < maxSize; i++) {
      stack.push(i)
      expect(stack.peek()).toBe(i)
    }

    expect(stack.size()).toBe(maxSize)
  })

  test('pop方法工作正常', () => {
    const maxSize = 1000
    const stack = new CustomStack(maxSize)

    for (let i = 0; i < maxSize; i++) {
      stack.push(i)
    }

    while (stack.size()) {
      const top = stack.peek()
      expect(top).toBe(stack.pop())
    }

    expect(stack.size()).toBe(0)
  })

  test('increment方法工作正常', () => {
    const maxSize = 10
    const stack = new CustomStack(maxSize)

    for (let i = 0; i < maxSize; i++) {
      stack.push(i)
    }

    stack.increment(4, 100)
    stack.increment(6, 100)

    for (let i = stack.size() - 1; i >= 0; i--) {
      if (i <= 3) {
        expect(stack.pop()).toBe(i + 200)
      } else if (i <= 5) {
        expect(stack.pop()).toBe(i + 100)
      } else {
        expect(stack.pop()).toBe(i)
      }
    }

    expect(stack.size()).toBe(0)
  })
})
