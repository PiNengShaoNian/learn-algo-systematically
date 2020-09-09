import Comparable from '../model/Comparable'
import InsertionSort from '../stage1/basic-sorting/insertion-sort'
import shuffle from '../util/shuffle'

class QuickSort {
  static quickSort<E extends Comparable<E> | number | string>(arr: E[]): E[] {
    shuffle(arr)
    this._quickSort(arr, 0, arr.length - 1)
    return arr
  }

  private static _quickSort<E extends Comparable<E> | number | string>(
    arr: E[],
    low: number,
    hi: number
  ) {
    if (low >= hi) return

    const p = this.partition(arr, low, hi)

    this._quickSort(arr, low, p - 1)
    this._quickSort(arr, p + 1, hi)
  }

  static partition<E extends Comparable<E> | number | string>(
    arr: E[],
    low: number,
    hi: number
  ): number {
    const v = arr[low]

    let i = low
    let j = hi + 1

    while (true) {
      while (this.less(arr[++i], v)) {
        if (i >= hi) break
      }

      while (this.less(v, arr[--j])) {
        if (j <= low) break
      }

      if (i >= j) break

      this.swap(arr, i, j)
    }

    this.swap(arr, low, j)

    return j
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

  static quickSort1<E extends Comparable<E> | number | string>(arr: E[]): E[] {
    shuffle(arr)
    this._quickSort1(arr, 0, arr.length - 1)
    return arr
  }

  private static _quickSort1<E extends Comparable<E> | number | string>(
    arr: E[],
    low: number,
    hi: number
  ) {
    if (hi - low <= 15) {
      InsertionSort.insertionSort3(arr, low, hi)
      return
    }

    const p = this.partition(arr, low, hi)

    this._quickSort1(arr, low, p - 1)
    this._quickSort1(arr, p + 1, hi)
  }

  static less<E extends Comparable<E> | number | string>(a: E, b: E): boolean {
    if (typeof a === 'string' || typeof a === 'number') {
      return a < b
    } else {
      return (a as Comparable<E>).compareTo(b) < 0
    }
  }

  static swap(arr: any[], i: number, j: number) {
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }

  static quickSort3Ways<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    shuffle(arr)
    this._quickSort3Ways(arr, 0, arr.length - 1)
    return arr
  }

  private static _quickSort3Ways<E extends Comparable<E> | number | string>(
    arr: E[],
    low: number,
    hi: number
  ) {
    if (low >= hi) return

    const v = arr[low]

    let lt = low
    let gt = hi + 1
    let i = low + 1

    while (i < gt) {
      const cmp = this.compare(arr[i], v)
      if (cmp < 0) {
        lt++
        this.swap(arr, i, lt)
        i++
      } else if (cmp > 0) {
        gt--
        this.swap(arr, i, gt)
      } else {
        i++
      }
    }

    this.swap(arr, low, lt)

    this._quickSort3Ways(arr, low, lt - 1)
    this._quickSort3Ways(arr, gt, hi)
  }
}

export default QuickSort
