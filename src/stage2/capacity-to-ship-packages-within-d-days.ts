/*
传送带上的包裹必须在 D 天内从一个港口运送到另一个港口。

传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。

返回能在 D 天内将传送带上的所有包裹送达的船的最低运载能力。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/capacity-to-ship-packages-within-d-days
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

function shipWithinDays(weights: number[], D: number): number {
  const days = (weights: number[], load: number): number => {
    let res = 0
    let weight = 0
    for (let i = 0; i < weights.length; i++) {
      if (weights[i] > load) return Infinity
      if (weight + weights[i] <= load) weight += weights[i]
      else {
        res += 1
        weight = weights[i]
      }
    }

    return res + 1
  }

  let hi = 0

  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > hi) hi = weights[i]
  }

  while (days(weights, hi) > D) hi = hi * 2

  let low = Math.floor(hi / 2)

  //hi也有可能是目标值而实际是在[low-hi)中查找所以手动把hi加1
  hi += 1

  while (low < hi) {
    const mid = low + Math.floor((hi - low) / 2)

    const cmp = days(weights, mid) - D

    if (cmp <= 0) {
      hi = mid
    } else low = mid + 1
  }

  return low
}
