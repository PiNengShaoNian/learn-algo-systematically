import MyArray from '../array'
import generateArr from '../../../util/generateArr'

describe('MyArray测试', () => {
  test('addLast方法测试', () => {
    const testArr = generateArr(1000, (i) => i, true)
    const myArray = new MyArray()

    for (let i = 0; i < testArr.length; i++) {
      myArray.addLast(testArr[i])

      expect(myArray[i]).toBe(testArr[i])
    }
  })

  test('addFirst方法测试', () => {
    const testArr = generateArr(1000, (i) => i, true)
    const myArray = new MyArray()

    for (let i = 0; i < testArr.length; i++) {
      myArray.addFirst(testArr[i])

      expect(myArray[0]).toBe(testArr[i])
    }

    expect(myArray[testArr.length - 1]).toBe(testArr[0])
  })

  test('add方法测试', () => {
    const testArr = generateArr(1000, (i) => i, true)
    const myArray = new MyArray()

    for (let i = 0; i < testArr.length; i++) {
      myArray.addFirst(testArr[i])
    }

    for (let i = 0; i < 10; i++) {
      const index = Math.floor(testArr.length * Math.random())

      myArray.add(index, i)

      expect(myArray[index]).toBe(i)
    }

    expect(myArray.size()).toBe(testArr.length + 10)
  })

  test('remove方法测试', () => {
    const testArr = generateArr(20, (i) => i)
    const myArray = new MyArray()

    for (let i = 0; i < testArr.length; i++) {
      myArray.addLast(testArr[i])
    }

    for (let i = 0; i < 10; i++) {
      myArray.remove(i)
      expect(myArray[i] % 2).not.toBe(0)
    }

    while (myArray.size()) {
      expect(myArray[0]).toBe(1)
      myArray.remove(myArray.size() - 1)
    }
  })

  test('removeElement方法测试', () => {
    const testArr = generateArr(100, (i) => i, true)
    const myArray = new MyArray()

    for (let i = 0; i < testArr.length; i++) {
      myArray.addLast(testArr[i])
    }

    while (myArray.size()) {
      myArray.removeElement(myArray.size() - 1)
    }

    expect(myArray.size()).toBe(0)
  })
})
