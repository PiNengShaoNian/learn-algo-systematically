import Stack from '../../model/Stack'

class ArrayStack<E> implements Stack<E> {
  private data: E[] = []
  push(item: E): void {
    this.data.push(item)
  }
  pop(): E | null {
    if (this.isEmpty()) return null

    return this.data.pop()!
  }
  peek(): E | null {
    if (this.isEmpty()) return null

    return this.data[this.data.length - 1]
  }
  size(): number {
    return this.data.length
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
}

export default ArrayStack
