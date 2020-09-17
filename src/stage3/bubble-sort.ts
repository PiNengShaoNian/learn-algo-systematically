import Comparable from '../model/Comparable'

class BubbleSort {
  static bubbleSort<E extends string | number | Comparable<E>>(arr: E[]) {
    for (let i = 0; i + 1 < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (this.less(arr[j + 1], arr[j])) {
          this.exch(arr, j, j + 1)
        }
      }
    }

    return arr
  }

  static bubbleSort1<E extends string | number | Comparable<E>>(arr: E[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = arr.length - 1; j > arr.length - i - 1; j--) {
        if (this.less(arr[j], arr[j - 1])) {
          this.exch(arr, j, j - 1)
        }
      }
    }

    return arr
  }

  static exch(arr: any[], i: number, j: number) {
    const t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }

  static less<E extends Comparable<E> | number | string>(a: E, b: E): boolean {
    if (typeof a === 'string' || typeof a === 'number') {
      return a < b
    } else {
      return (a as Comparable<E>).compareTo(b) < 0
    }
  }
}

export default BubbleSort
