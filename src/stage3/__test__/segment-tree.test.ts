import { numericIntervalSumUpdader, SegmentTree } from '../segment-tree'

describe('SegmentTree测试', () => {
  test('SegmentTree区间和测试', () => {
    {
      const testArr = [-2, 0, 3, -5, 2, -1]
      const tree = new SegmentTree<number>(testArr, (a, b) => a + b)

      expect(tree.query(0, 2)).toBe(1)
      expect(tree.query(0, 3)).toBe(-4)

      tree.change(0, 5)

      expect(tree.query(0, 2)).toBe(8)
      expect(tree.query(0, 3)).toBe(3)
    }

    {
      const tree = new SegmentTree<number>([0, 9, 5, 7, 3], (a, b) => a + b)
      expect(tree.query(4, 4)).toBe(3)
      expect(tree.query(2, 4)).toBe(15)
      expect(tree.query(3, 3)).toBe(7)
      tree.change(4, 5)
      tree.change(1, 7)
      tree.change(0, 8)
      expect(tree.query(1, 2)).toBe(12)
      tree.change(1, 9)
      expect(tree.query(4, 4)).toBe(5)
      tree.change(3, 4)
    }

    {
      const tree = new SegmentTree<number>([9, -8], (a, b) => a + b)
      tree.change(0, 3)
      expect(tree.query(1, 1)).toBe(-8)
      expect(tree.query(0, 1)).toBe(-5)
      tree.change(1, -3)
      expect(tree.query(0, 1)).toBe(0)
    }
  })

  test('区间最大值', () => {
    const tree = new SegmentTree([1, 5, 3, 9, 7], (a, b) => Math.max(a, b))

    expect(tree.query(0, 4)).toBe(9)
    expect(tree.query(0, 3)).toBe(9)
    expect(tree.query(0, 2)).toBe(5)
    tree.change(1, 10)
    expect(tree.query(0, 2)).toBe(10)
    expect(tree.query(0, 4)).toBe(10)
    tree.change(3, 0)
    expect(tree.query(2, 4)).toBe(7)
  })

  test('区间和', () => {
    const tree = new SegmentTree(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      (a, b) => a + b,
      numericIntervalSumUpdader
    )

    //[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //update
    //[ 0,+1,+1,+1, 0,+1, 0, 0, 0, 0]
    //update
    //[+1,+1,+1, 0, 0, 0, 0, 0, 0, 0]
    //update
    //[ 0,+1, 0, 0, 0, 0, 0, 0, 0, 8]
    //update
    //[+1,+1,+1,+1,+1,+1,+1,+1,+1,+1]
    //update
    //[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2]

    tree.changeRange(1, 3, 1)
    tree.change(5, 1)
    expect(tree.query(0, 9)).toBe(4)
    expect(tree.query(1, 2)).toBe(2)
    expect(tree.query(1, 5)).toBe(4)
    expect(tree.query(5, 5)).toBe(1)
    expect(tree.query(2, 2)).toBe(1)

    tree.changeRange(0, 2, 1)
    expect(tree.query(0, 0)).toBe(1)
    expect(tree.query(1, 1)).toBe(2)
    expect(tree.query(0, 2)).toBe(5)
    expect(tree.query(0, 5)).toBe(7)

    //change的第二个参数不是delta要注意,而是会直接覆盖原来的值，
    //所以在这里如果要再加1需要传3
    tree.change(1, 3)
    tree.change(9, 8)
    expect(tree.query(1, 1)).toBe(3)
    expect(tree.query(0, 9)).toBe(16)
    expect(tree.query(5, 9)).toBe(9)

    tree.changeRange(0, 9, 1)
    expect(tree.query(0, 9)).toBe(26)

    tree.changeRange(0, 9, -2)
    expect(tree.query(0, 9)).toBe(6)

    const ans = []

    for (let i = 0; i < 10; ++i) {
      ans[i] = tree.query(i, i)
    }

    expect(ans).toEqual([0, 2, 1, 0, -1, 0, -1, -1, -1, 7])
  })
})
