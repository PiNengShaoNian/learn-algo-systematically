import SegmentTree from './segment-tree'

/*
307. 区域和检索 - 数组可修改
给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。

update(i, val) 函数可以通过将下标为 i 的数值更新为 val，从而对数列进行修改。

https://leetcode-cn.com/problems/range-sum-query-mutable/
*/

class NumArray {
  private tree: SegmentTree<number> | null = null
  constructor(nums: number[]) {
    if (nums.length) {
      this.tree = new SegmentTree(nums, (a, b) => a + b)
    }
  }

  update(i: number, val: number): void {
    if (!this.tree) throw new Error('')
    this.tree.set(i, val)
  }

  sumRange(i: number, j: number): number {
    if (!this.tree) throw new Error('')

    return this.tree.query(i, j)
  }
}
