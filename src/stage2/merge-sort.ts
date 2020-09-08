import Comparable from '../model/Comparable'
import InsertionSort from '../stage1/basic-sorting/insertion-sort'

class MergeSort {
  static mergeSort<E extends Comparable<E> | number | string>(arr: E[]): E[] {
    const aux: E[] = []
    this._mergeSort<E>(arr, aux, 0, arr.length - 1)
    return arr
  }

  static _mergeSort<E extends Comparable<E> | number | string>(
    arr: E[],
    aux: E[],
    low: number,
    hi: number
  ) {
    if (low >= hi) return

    const mid = low + Math.floor((hi - low) / 2)

    this._mergeSort(arr, aux, low, mid)
    this._mergeSort(arr, aux, mid + 1, hi)
    if (this.less(arr[mid + 1], arr[mid])) {
      this.merge<E>(arr, aux, low, mid, hi)
    }
  }

  static merge<E extends Comparable<E> | number | string>(
    arr: E[],
    aux: E[],
    low: number,
    mid: number,
    hi: number
  ) {
    for (let i = low; i <= hi; i++) {
      aux[i] = arr[i]
    }

    let k = low
    let j = mid + 1
    for (let i = low; i <= hi; i++) {
      if (k > mid) arr[i] = aux[j++]
      else if (j > hi) arr[i] = aux[k++]
      else if (this.less<E>(aux[j], aux[k])) arr[i] = aux[j++]
      else arr[i] = aux[k++]
    }
  }

  static less<E extends Comparable<E> | number | string>(a: E, b: E): boolean {
    if (typeof a === 'string' || typeof a === 'number') {
      return a < b
    } else {
      return (a as Comparable<E>).compareTo(b) < 0
    }
  }

  static mergeSort1<E extends Comparable<E> | number | string>(arr: E[]): E[] {
    const aux: E[] = []
    this._mergeSort1<E>(arr, aux, 0, arr.length - 1)
    return arr
  }

  static _mergeSort1<E extends Comparable<E> | number | string>(
    arr: E[],
    aux: E[],
    low: number,
    hi: number
  ) {
    if (hi - low <= 15) {
      InsertionSort.insertionSort3(arr, low, hi)
      return
    }

    const mid = low + Math.floor((hi - low) / 2)

    this._mergeSort1(arr, aux, low, mid)
    this._mergeSort1(arr, aux, mid + 1, hi)
    if (this.less(arr[mid + 1], arr[mid])) {
      this.merge<E>(arr, aux, low, mid, hi)
    }
  }

  static mergeSortBottomUp<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    const aux: E[] = []
    const n = arr.length
    for (let sz = 1; sz < n; sz += sz) {
      for (let i = 0; i + sz < n; i += sz + sz) {
        if (this.less(arr[i + sz - 1], arr[i + sz])) continue

        const low = i
        const mid = i + sz - 1
        const hi = Math.min(i + sz + sz - 1, n - 1)

        this.merge<E>(arr, aux, low, mid, hi)
      }
    }

    return arr
  }

  static mergeSortBottomUp1<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    const aux: E[] = []
    const n = arr.length

    for (let i = 0; i < n; i += 16) {
      InsertionSort.insertionSort3(arr, i, Math.min(n - 1, i + 15))
    }

    for (let sz = 16; sz < n; sz += sz) {
      for (let i = 0; sz + i < n; i += sz + sz) {
        if (this.less(arr[i + sz - 1], arr[i + sz])) continue

        const low = i
        const mid = i + sz - 1
        const hi = Math.min(i + sz + sz - 1, n - 1)

        this.merge<E>(arr, aux, low, mid, hi)
      }
    }

    return arr
  }
}

export default MergeSort
