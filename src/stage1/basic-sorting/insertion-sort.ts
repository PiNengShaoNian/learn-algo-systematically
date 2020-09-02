import Comparable from '../../model/Comparable'

class InsertionSort {
  static insertionSort<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr
    if (typeof arr[0] === 'number' || typeof arr[0] === 'string') {
      for (let i = 1; i < arr.length; i++) {
        let j = i

        while (j > 0 && arr[j] < arr[j - 1]) {
          this.swap(arr, j, --j)
        }
      }
    } else {
      for (let i = 1; i < arr.length; i++) {
        let j = i

        while (j > 0 && (arr[j] as Comparable<E>).compareTo(arr[j - 1]) < 0) {
          this.swap(arr, j, --j)
        }
      }
    }

    return arr
  }

  static insertionSort1<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr
    if (typeof arr[0] === 'number' || typeof arr[0] === 'string') {
      for (let i = 1; i < arr.length; i++) {
        let j = i
        const temp = arr[i]

        while (j > 0 && temp < arr[j - 1]) {
          arr[j] = arr[--j]
        }

        arr[j] = temp
      }
    } else {
      for (let i = 1; i < arr.length; i++) {
        let j = i
        const temp = arr[i]

        while (j > 0 && (temp as Comparable<E>).compareTo(arr[j - 1]) < 0) {
          arr[j] = arr[--j]
        }

        arr[j] = temp
      }
    }

    return arr
  }

  static insertionSort2<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr
    if (typeof arr[0] === 'number' || typeof arr[0] === 'string') {
      for (let i = arr.length - 2; i >= 0; i--) {
        let j = i
        const temp = arr[i]

        while (j < arr.length - 1 && temp > arr[j + 1]) {
          arr[j] = arr[++j]
        }

        arr[j] = temp
      }
    } else {
      for (let i = arr.length - 2; i >= 0; i--) {
        let j = i
        const temp = arr[i]

        while (
          j < arr.length - 1 &&
          (temp as Comparable<E>).compareTo(arr[j + 1]) > 0
        ) {
          arr[j] = arr[++j]
        }

        arr[j] = temp
      }
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
