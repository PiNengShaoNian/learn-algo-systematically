import Comparable from '../model/Comparable'

class BinarySearch {
  static binarySearch<E extends Comparable<E> | number | string>(
    arr: E[],
    target: E
  ): number {
    return this._binarySearch<E>(arr, 0, arr.length - 1, target)
  }

  private static _binarySearch<E extends Comparable<E> | number | string>(
    arr: E[],
    low: number,
    hi: number,
    target: E
  ): number {
    if (low > hi) return -1

    const mid = low + Math.floor((hi - low) / 2)
    const cmp = this.compare(target, arr[mid])

    if (cmp === 0) return mid
    else if (cmp < 0) {
      return this._binarySearch(arr, low, mid - 1, target)
    } else {
      return this._binarySearch(arr, mid + 1, hi, target)
    }
  }

  static compare<E extends Comparable<E> | number | string>(
    a: E,
    b: E
  ): number {
    if (typeof a === 'string') {
      if (a === b) return 0
      return a > b ? 1 : -1
    } else if (typeof a === 'number') {
      return a - (b as number)
    } else {
      return (a as Comparable<E>).compareTo(b)
    }
  }

  static binarySearch1<E extends Comparable<E> | number | string>(
    arr: E[],
    target: E
  ): number {
    let low = 0
    let hi = arr.length - 1

    while (low <= hi) {
      const mid = Math.floor((hi - low) / 2) + low

      const cmp = this.compare(target, arr[mid])

      if (cmp === 0) return mid
      else if (cmp > 0) low = mid + 1
      else hi = mid - 1
    }

    return -1
  }

  static upper<E extends Comparable<E> | number | string>(
    arr: E[],
    target: E
  ): number {
    let low = 0
    let hi = arr.length
    while (low < hi) {
      const mid = low + Math.floor((hi - low) / 2)

      if (arr[mid] <= target) {
        low = mid + 1
      } else {
        hi = mid
      }
    }
    return low
  }

  static ceil<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ): number {
    const u = this.upper(data, target)

    if (u - 1 >= 0 && this.compare(data[u - 1], target) === 0) return u - 1
    else return u
  }

  static lowerCeil<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ): number {
    let low = 0
    let hi = data.length

    while (low < hi) {
      const mid = low + Math.floor((hi - low) / 2)

      const cmp = this.compare(data[mid], target)

      if (cmp < 0) {
        low = mid + 1
      } else hi = mid
    }

    return low
  }

  static lower<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ): number {
    let low = -1
    let hi = data.length - 1

    while (low < hi) {
      const mid = low + Math.floor((hi - low + 1) / 2)

      const cmp = this.compare(data[mid], target)

      if (cmp >= 0) hi = mid - 1
      else low = mid
    }

    return low
  }

  static lowerFloor<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ): number {
    const f = this.lower(data, target)

    if (f + 1 < data.length && this.compare(data[f + 1], target) === 0)
      return f + 1

    return f
  }

  static upperFloor<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ): number {
    let low = -1
    let hi = data.length - 1

    while (low < hi) {
      const mid = low + Math.floor((hi - low + 1) / 2)

      const cmp = this.compare(data[mid], target)

      if (cmp > 0) {
        hi = mid - 1
      } else {
        low = mid
      }
    }
    return low
  }

  static binarySearch2<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ): number {
    let low = 0
    let hi = data.length

    while (low < hi) {
      const mid = low + Math.floor((hi - low) / 2)

      const cmp = this.compare(data[mid], target)

      if (cmp >= 0) {
        hi = mid
      } else low = mid + 1
    }

    if (low < data.length && this.compare(data[low], target) === 0) return low

    return -1
  }

  /**
   * 和c++中的lowerBound功能类似和upperBound配合使用能求出一个元素的左闭右开的边界
   * @param data 有序数组
   * @param target 要查找的目标
   * @returns 元素在数组中的左边界
   */
  static lowerBound<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ) {
    let lo = 0
    let hi = data.length - 1

    while (lo <= hi) {
      const mid = lo + ((hi - lo) >> 1)

      if (data[mid] > target) {
        hi = mid - 1
      } else if (data[mid] === target) {
        hi = mid - 1
      } else if (data[mid] < target) {
        lo = mid + 1
      }
    }

    if (lo >= data.length || data[lo] !== target) return data.length
    return lo
  }

  static upperBound<E extends Comparable<E> | number | string>(
    data: E[],
    target: E
  ) {
    let lo = 0
    let hi = data.length - 1

    while (lo <= hi) {
      const mid = lo + ((hi - lo) >> 1)

      if (data[mid] > target) {
        hi = mid - 1
      } else if (data[mid] === target) {
        lo = mid + 1
      } else if (data[mid] < target) {
        lo = mid + 1
      }
    }

    if (hi < 0 || data[hi] !== target) return data.length
    return hi + 1
  }
}

export default BinarySearch
