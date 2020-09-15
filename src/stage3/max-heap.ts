import Comparable from '../model/Comparable'

class MaxHeap<E extends number | string | Comparable<E>> {
  private data: E[] = []
  private _size = 0

  size() {
    return this._size
  }

  constructor(arr?: E[]) {
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        this.data[i + 1] = arr[i]
      }
      this._size = arr.length

      for (let i = Math.floor(this._size / 2); i >= 1; i--) {
        this.sink(i)
      }
    }
  }

  isEmpty() {
    return this._size === 0
  }

  insert(e: E) {
    this.data[++this._size] = e

    this.swim(this._size)
  }

  swim(k: number) {
    let j
    while (k > 1 && this.less((j = Math.floor(k / 2)), k)) {
      this.exch(k, j)
      k = j
    }
  }

  exch(i: number, j: number) {
    const t = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = t
  }

  less(i: number, j: number): boolean {
    if (typeof this.data[i] === 'string' || typeof this.data[i] === 'number') {
      return this.data[i] < this.data[j]
    } else {
      return (this.data[i] as Comparable<E>).compareTo(this.data[j]) < 0
    }
  }

  deleteMax(): E {
    const max = this.data[1]
    this.exch(1, this._size)
    this._size--
    this.data.length = this._size + 1

    this.sink(1)

    return max
  }

  sink(k: number) {
    let j
    while (k * 2 <= this._size) {
      j = 2 * k

      if (j + 1 <= this._size && this.less(j, j + 1)) j++

      if (this.less(j, k)) break

      this.exch(j, k)
      k = j
    }
  }

  replace(e: E) {
    const max = this.data[1]

    this.data[1] = e
    this.sink(1)

    return max
  }
}

export default MaxHeap
