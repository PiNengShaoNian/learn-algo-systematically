import Comparable from '../model/Comparable'
import MaxHeap from './max-heap'

class HeapSort {
  static heapSort<E extends number | string | Comparable<E>>(data: E[]) {
    const heap = new MaxHeap<E>()

    for (let i = 0; i < data.length; i++) {
      heap.insert(data[i])
    }

    for (let i = data.length - 1; i >= 0; i--) {
      data[i] = heap.deleteMax()
    }

    return data
  }

  static heapSort1<E extends number | string | Comparable<E>>(data: E[]) {
    if (data.length <= 1) return data

    for (let i = Math.floor((data.length - 2) / 2); i >= 0; i--) {
      this.sink(data, i, data.length - 1)
    }

    let endIndex = data.length - 1

    while (endIndex > 0) {
      this.exch(data, 0, endIndex)
      endIndex--
      this.sink(data, 0, endIndex)
    }

    return data
  }

  static exch(data: any[], i: number, j: number) {
    const t = data[i]
    data[i] = data[j]
    data[j] = t
  }

  static sink<E extends Comparable<E> | number | string>(
    data: E[],
    index: number,
    endIndex: number
  ) {
    while (index * 2 + 1 <= endIndex) {
      let biggestChildIndex = index * 2 + 1

      if (
        index * 2 + 2 <= endIndex &&
        this.less(data[index * 2 + 1], data[index * 2 + 2])
      )
        biggestChildIndex = 2 * index + 2

      if (this.less(data[biggestChildIndex], data[index])) break

      this.exch(data, index, biggestChildIndex)

      index = biggestChildIndex
    }
  }

  static less<E extends Comparable<E> | number | string>(a: E, b: E): boolean {
    if (typeof a === 'string' || typeof a === 'number') {
      return a < b
    } else {
      return (a as Comparable<E>).compareTo(b) < 0
    }
  }
}

export default HeapSort
