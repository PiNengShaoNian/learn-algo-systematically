/*
珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。

珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  

珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/koko-eating-bananas
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

function minEatingSpeed(piles: number[], H: number): number {
  const eatingTime = (k: number): number => {
    let res = 0

    for (let i = 0; i < piles.length; i++) {
      res += Math.ceil(piles[i] / k)
    }

    return res
  }

  let hi = 1

  while (eatingTime(hi) > H) {
    hi = hi * 2
  }

  let low = Math.floor(hi / 2)

  while (low < hi) {
    const mid = low + Math.floor((hi - low) / 2)

    const cmp = eatingTime(mid) - H

    if (cmp <= 0) {
      hi = mid
    } else {
      low = mid + 1
    }
  }

  return low
}
