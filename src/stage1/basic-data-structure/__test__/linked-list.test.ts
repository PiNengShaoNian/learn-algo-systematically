import LinkedList from '../linked-list'
import generateArr from '../../../util/generateArr'

describe('LinkedList测试', () => {
  test('addFirst工作正常', () => {
    const testArr: number[] = generateArr(1000, (i) => i)
    const linkedList = new LinkedList<number>()
    for (let i = 0; i < testArr.length; i++) {
      linkedList.addFirst(testArr[i])
      expect(linkedList.first()).toBe(testArr[i])
      expect(linkedList.contains(testArr[i])).toBeTruthy()
    }

    expect(linkedList.size()).toBe(testArr.length)
  })

  test('get工作正常', () => {
    const testArr: number[] = generateArr(1000, (i) => i)
    const linkedList = new LinkedList<number>()
    for (let i = 0; i < testArr.length; i++) {
      linkedList.addFirst(testArr[i])
    }

    for (let i = 0; i < testArr.length; i++) {
      expect(linkedList.get(i)).toBe(testArr.length - i - 1)
    }
  })

  test('addAtIndex工作正常', () => {
    const testArr: number[] = generateArr(1000, (i) => i)
    const linkedList = new LinkedList<number>()
    for (let i = 0; i < testArr.length; i++) {
      linkedList.addFirst(testArr[i])
    }

    linkedList.addAtIndex(333, 666)
    expect(linkedList.get(333)).toBe(666)

    linkedList.addAtIndex(127, 666)
    expect(linkedList.get(127)).toBe(666)

    expect(linkedList.size()).toBe(testArr.length + 2)
  })

  test('removeAtIndex工作正常', () => {
    const testArr: number[] = generateArr(1000, (i) => i)
    const linkedList = new LinkedList<number>()
    for (let i = 0; i < testArr.length; i++) {
      linkedList.addFirst(testArr[i])
    }

    for (let i = testArr.length - 1; i >= 0; i--) {
      linkedList.removeAtIndex(i)

      expect(linkedList.contains(testArr[testArr.length - i - 1])).toBeFalsy()
    }

    expect(linkedList.size()).toBe(0)
  })

  test('removeFirst工作正常', () => {
    const testArr: number[] = generateArr(3, (i) => i)
    const linkedList = new LinkedList<number>()
    for (let i = 0; i < testArr.length; i++) {
      linkedList.addFirst(testArr[i])
    }

    for (let i = 0; i < testArr.length - 1; i++) {
      linkedList.removeFirst()
    }

    expect(linkedList.size()).toBe(1)
  })
})
