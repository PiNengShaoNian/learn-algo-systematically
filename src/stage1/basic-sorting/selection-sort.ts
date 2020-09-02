import Comparable from '../../model/Comparable'

class SelectionSort {
  static selectionSort<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr
    if (typeof arr[0] === 'number' || typeof arr[0] === 'string') {
      for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i; j < arr.length; j++) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j
          }
        }

        this.swap(arr, i, minIndex)
      }
    } else {
      for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i; j < arr.length; j++) {
          if ((arr[j] as Comparable<E>).compareTo(arr[minIndex]) < 0) {
            minIndex = j
          }
        }

        this.swap(arr, i, minIndex)
      }
    }
    return arr
  }

  static selectionSort2<E extends Comparable<E> | number | string>(
    arr: E[]
  ): E[] {
    if (!arr.length) return arr
    if (typeof arr[0] === 'number' || typeof arr[0] === 'string') {
      for (let i = arr.length - 1; i >= 0; i--) {
        let maxIndex = i
        for (let j = i; j >= 0; j--) {
          if (arr[j] > arr[maxIndex]) {
            maxIndex = j
          }
        }

        this.swap(arr, i, maxIndex)
      }
    } else {
      for (let i = arr.length - 1; i >= 0; i--) {
        let maxIndex = i
        for (let j = i; j >= 0; j--) {
          if ((arr[j] as Comparable<E>).compareTo(arr[maxIndex]) > 0) {
            maxIndex = j
          }
        }

        this.swap(arr, i, maxIndex)
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

export default SelectionSort
