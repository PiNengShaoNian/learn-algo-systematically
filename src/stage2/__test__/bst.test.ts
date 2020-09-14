import BST from '../bst'
import Comparable from '../../model/Comparable'

const buildTree = <E extends string | number | Comparable<E>>(arr: E[]) => {
  const bst = new BST<E>()
  for (const e of arr) {
    bst.add(e)
  }

  return bst
}

describe('BST测试', () => {
  test('add方法工作正常', () => {
    const bst = new BST<number>()

    bst.add(5)
    bst.add(3)
    bst.add(6)
    bst.add(2)
    bst.add(4)
    bst.add(8)

    expect(bst.size()).toBe(6)
    expect(bst.min()).toBe(2)
    expect(bst.max()).toBe(8)
  })
  test('nonRecursiveAdd方法工作正常', () => {
    const bst = new BST<number>()

    bst.nonRecursiveAdd(5)
    bst.nonRecursiveAdd(3)
    bst.nonRecursiveAdd(6)
    bst.nonRecursiveAdd(2)
    bst.nonRecursiveAdd(4)
    bst.nonRecursiveAdd(8)

    expect(bst.size()).toBe(6)
    expect(bst.min()).toBe(2)
    expect(bst.max()).toBe(8)
  })

  test('preOrder方法工作正常', () => {
    const bst = buildTree<number>([5, 3, 6, 2, 4, 8])

    expect(bst.preOrder()).toEqual([5, 3, 2, 4, 6, 8])
  })
  test('nonRecursivePreOrder方法工作正常', () => {
    const bst = buildTree<number>([5, 3, 6, 2, 4, 8])

    expect(bst.nonRecursivePreOrder()).toEqual([5, 3, 2, 4, 6, 8])
  })

  test('inOrder方法工作正常', () => {
    const bst = buildTree<number>([5, 3, 6, 2, 4, 8])

    expect(bst.inOrder()).toEqual([2, 3, 4, 5, 6, 8])
  })

  test('postOrder方法工作正常', () => {
    const bst = buildTree<number>([5, 3, 6, 2, 4, 8])

    expect(bst.postOrder()).toEqual([2, 4, 3, 8, 6, 5])
  })

  test('deleteMin工作正常', () => {
    const testArr = [5, 3, 6, 2, 4, 8]

    const bst = buildTree<number>(testArr)
    testArr.sort((a, b) => a - b)
    for (let i = 0; i < testArr.length; i++) {
      expect(bst.deleteMin()).toBe(testArr[i])
      expect(bst.contains(testArr[i])).toBeFalsy()
    }

    expect(bst.size()).toBe(0)
  })
  test('deleteMax工作正常', () => {
    const testArr = [5, 3, 6, 2, 4, 8]

    const bst = buildTree<number>(testArr)
    testArr.sort((a, b) => b - a)
    for (let i = 0; i < testArr.length; i++) {
      expect(bst.deleteMax()).toBe(testArr[i])
      expect(bst.contains(testArr[i])).toBeFalsy()
    }

    expect(bst.size()).toBe(0)
  })

  test('delete工作正常', () => {
    const testArr = [5, 3, 6, 2, 4, 8]

    const bst = buildTree<number>(testArr)
    for (let i = 0; i < testArr.length; i++) {
      bst.delete(testArr[i])
      expect(bst.contains(testArr[i])).toBeFalsy()
    }

    expect(bst.size()).toBe(0)
  })
  test('floor工作正常', () => {
    const bst = buildTree<number>([5, 3, 6, 2, 4, 8])

    expect(bst.floor(3.3)).toBe(3)
    expect(bst.floor(5)).toBe(5)
    expect(bst.floor(7)).toBe(6)
    expect(bst.floor(0)).toBeNull()
  })
})
