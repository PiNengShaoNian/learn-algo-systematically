function select(k: number, nums: number[]) {
  const swap = (nums: number[], i: number, j: number) => {
    const t = nums[i]
    nums[i] = nums[j]
    nums[j] = t
  }

  //在[low-hi]中搜索
  const _select = (nums: number[], low: number, hi: number): number => {
    if (low === hi) return nums[low]

    const v = nums[low]
    let i = low
    let j = hi + 1

    while (true) {
      while (v > nums[++i]) if (i >= hi) break

      while (nums[--j] > v) if (j <= low) break

      if (i >= j) break

      swap(nums, i, j)
    }

    swap(nums, low, j)

    if (j === k) {
      return nums[j]
    } else if (j > k) {
      return _select(nums, low, j - 1)
    } else {
      return _select(nums, j + 1, hi)
    }
  }

  return _select(nums, 0, nums.length - 1)
}

function select1(k: number, nums: number[]) {
  const swap = (nums: number[], i: number, j: number) => {
    const t = nums[i]
    nums[i] = nums[j]
    nums[j] = t
  }

  //在[l-r)中搜索
  const _select = (nums: number[], low: number, hi: number): number => {
    if (low === hi - 1) return nums[low]

    const v = nums[low]
    let i = low
    let j = hi

    while (true) {
      while (v > nums[++i]) if (i >= hi - 1) break

      while (nums[--j] > v) if (j <= low) break

      if (i >= j) break

      swap(nums, i, j)
    }

    swap(nums, low, j)

    if (j === k) {
      return nums[j]
    } else if (j > k) {
      return _select(nums, low, j)
    } else {
      return _select(nums, j + 1, hi)
    }
  }

  return _select(nums, 0, nums.length)
}

export default select1
