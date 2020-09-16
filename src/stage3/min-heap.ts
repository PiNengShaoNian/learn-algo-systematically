import Comparable from '../model/Comparable'

class MinHeap<E extends number | string | Comparable<E>> {
  private pq: E[] = []
  private _size = 0

  constructor(arr?: E[]) {
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        this.pq[i + 1] = arr[i]
      }

      this._size = arr.length

      for (let k = Math.floor(arr.length / 2); k >= 1; k--) {
        this.sink(k)
      }
    }
  }

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  insert(e: E) {
    this.pq[++this._size] = e
    this.swim(this._size)
  }

  deleteMin() {
    const min = this.pq[1]

    this.exch(1, this._size)
    this._size--
    this.pq.length = this._size + 1

    this.sink(1)

    return min
  }

  exch(i: number, j: number) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  sink(k: number) {
    while (2 * k <= this._size) {
      let j = 2 * k

      if (j + 1 <= this._size && this.less(j + 1, j)) j++

      if (this.less(k, j)) break

      this.exch(k, j)
      k = j
    }
  }

  swim(k: number) {
    let j: number
    while (k > 1 && this.less(k, (j = Math.floor(k / 2)))) {
      this.exch(j, k)
      k = j
    }
  }

  less(i: number, j: number): boolean {
    if (typeof this.pq[i] === 'string' || typeof this.pq[i] === 'number') {
      return this.pq[i] < this.pq[j]
    } else {
      return (this.pq[i] as Comparable<E>).compareTo(this.pq[j]) < 0
    }
  }

  min() {
    return this.pq[1]
  }
}

export default MinHeap
