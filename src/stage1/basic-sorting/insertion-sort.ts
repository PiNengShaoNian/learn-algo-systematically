import Comparable from '../../model/Comparable'

class InsertionSort {
  static insertionSort<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr
    for (let i = 1; i < arr.length; i++) {
      let j = i

      while (j > 0 && this.less<E>(arr[j], arr[j - 1])) {
        this.swap(arr, j, --j)
      }
    }

    return arr
  }

  static less<E extends Comparable<E> | number | string>(a: E, b: E): boolean {
    if (typeof a === 'number' || typeof a === 'string') {
      return a < b
    } else {
      return (a as Comparable<E>).compareTo(b) < 0
    }
  }

  static insertionSort1<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr
    for (let i = 1; i < arr.length; i++) {
      let j = i
      const temp = arr[i]

      while (j > 0 && this.less<E>(temp, arr[j - 1])) {
        arr[j] = arr[--j]
      }

      arr[j] = temp
    }

    return arr
  }

  static insertionSort2<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr

    for (let i = arr.length - 2; i >= 0; i--) {
      let j = i
      const temp = arr[i]

      while (j < arr.length - 1 && !this.less<E>(temp, arr[j + 1])) {
        arr[j] = arr[++j]
      }

      arr[j] = temp
    }

    return arr
  }

  static insertionSort3<E extends Comparable<E> | number | string>(
    arr: E[],
    low: number,
    hi: number
  ): E[] {
    for (let i = low + 1; i <= hi; i++) {
      const temp = arr[i]

      let j = i
      while (j > low && this.less(temp, arr[j - 1])) {
        arr[j] = arr[--j]
      }

      arr[j] = temp
    }

    return arr
  }

  private static swap(arr: any[], i: number, j: number) {
    const temp = arr[i]

    arr[i] = arr[j]
    arr[j] = temp
  }
}

export default InsertionSort
