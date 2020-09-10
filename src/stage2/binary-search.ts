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

  static ceiling<E extends Comparable<E> | number | string>(
    arr: E[],
    target: E
  ): number {
    let low = 0
    let hi = arr.length
    while (low < hi) {
      const mid = low + Math.floor((hi - low) / 2)

      if (arr[mid] < target) {
        low = mid + 1
      } else {
        hi = mid 
      }
    }
    return low
  }
}

export default BinarySearch
