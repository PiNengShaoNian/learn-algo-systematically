class Deque<E> {
  private _size = 0
  private first = 0
  private last = 0
  private data: E[] = []

  constructor(_capacity: number = 10) {
    this.data.length = _capacity
  }

  capacity() {
    return this.data.length
  }

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  resize(capacity: number) {
    const newData = new Array(capacity)

    for (let i = 0; i < this._size; i++) {
      newData[i] = this.data[(i + this.first) % this.data.length]
    }

    this.data = newData
    this.first = 0
    this.last = this._size
  }

  addLast(e: E) {
    if (this._size === this.capacity()) {
      this.resize(this.capacity() * 2)
    }
    this.data[this.last] = e
    this.last = (this.last + 1) % this.data.length
    this._size++
  }

  addFront(e: E) {
    if (this._size === this.capacity()) {
      this.resize(this.capacity() * 2)
    }

    this.first = this.first === 0 ? this.data.length - 1 : this.first - 1

    this.data[this.first] = e
    this._size++
  }

  removeFront() {
    if (this.isEmpty()) return

    const front = this.data[this.first]
    this.first = (this.first + 1) % this.data.length
    this._size--

    if (this._size <= this.capacity() / 4 && this.capacity() > 1) {
      this.resize(Math.floor(this.capacity() / 2))
    }

    return front
  }

  removeLast() {
    if (this.isEmpty()) return

    this.last = this.last === 0 ? this.data.length - 1 : this.last - 1
    const ret = this.data[this.last]
    this._size--
    if (this._size <= this.capacity() / 4 && this.capacity() > 1) {
      this.resize(Math.floor(this.capacity() / 2))
    }

    return ret
  }

  front(): null | E {
    if (this.isEmpty()) return null

    return this.data[this.first]
  }

  tail(): null | E {
    if (this.isEmpty()) return null

    const last = this.last === 0 ? this.data.length - 1 : this.last - 1
    return this.data[last]
  }
}

export default Deque
