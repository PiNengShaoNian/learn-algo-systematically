class MyArray<E> extends Array {
  private _size: number = 0

  public size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  addLast(item: E) {
    this.add(this._size, item)
  }

  add(index: number, item: E) {
    index = Math.floor(index)
    if (index < 0) {
      throw new Error(`Index "${index}" out of range`)
    }

    if (index > this._size - 1) {
      this[index] = item
      this._size++
      return
    }

    for (let i = this._size - 1; i >= index; i--) {
      this[i + 1] = this[i]
    }
    this[index] = item
    this._size++
  }

  addFirst(item: E) {
    this.add(0, item)
  }

  toString() {
    let str = `size=${this._size} [${(() => {
      let str = ''
      for (let i = 0; i < this._size; i++) {
        str += this[i] + ', '
      }
      return str.replace(/, $/, '')
    })()}]`

    return str
  }

  contains(item: E) {
    for (let i = 0; i < this._size; i++) {
      if (this[i] === item) return true
    }

    return false
  }

  remove(index: number): E {
    if (index > this._size - 1 || index < 0) {
      throw new Error(`Index ${index} out of range 0-${this._size - 1}`)
    }
    const item = this[index]
    for (let i = index + 1; i < this._size; i++) {
      this[i - 1] = this[i]
    }
    this._size--
    this.length = this._size

    return item
  }

  getIndex(item: E) {
    for (let i = 0; i < this._size; i++) {
      if (this[i] === item) return i
    }

    return -1
  }

  removeElement(item: E) {
    const index = this.getIndex(item)

    if (index >= 0) {
      this.remove(index)
    }
  }
}

export default MyArray
