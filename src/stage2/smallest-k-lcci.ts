/*
设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

示例：

输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/smallest-k-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

function smallestK(arr: number[], k: number): number[] {
  let low = 0
  let hi = arr.length - 1

  const swap = (arr: any[], i: number, j: number) => {
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }

  const partition = (arr: number[], low: number, hi: number): number => {
    let i = low
    let j = hi + 1

    const v = arr[low]

    while (true) {
      while (arr[++i] < v) {
        if (i >= hi) break
      }

      while (arr[--j] > v) {
        if (j <= low) break
      }

      if (i >= j) break

      swap(arr, i, j)
    }

    swap(arr, low, j)

    return j
  }

  while (low <= hi) {
    const p = partition(arr, low, hi)

    if (p > k) {
      hi = p - 1
    } else if (p < k) {
      low = p + 1
    } else break
  }

  return arr.slice(0, k)
}
