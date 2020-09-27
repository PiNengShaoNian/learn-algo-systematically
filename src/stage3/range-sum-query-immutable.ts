/*
303. 区域和检索 - 数组不可变
给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。

https://leetcode-cn.com/problems/range-sum-query-immutable/
*/

class NumArray {
  private aux: number[] = []
  constructor(nums: number[]) {
    this.aux = Array.from({ length: nums.length + 1 }, (_, i) => nums[i - 1])

    this.aux[0] = 0

    for (let i = 0; i < this.aux.length - 1; i++) {
      this.aux[i + 1] += this.aux[i]
    }
  }

  sumRange(i: number, j: number): number {
    return this.aux[j + 1] - this.aux[i]
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
