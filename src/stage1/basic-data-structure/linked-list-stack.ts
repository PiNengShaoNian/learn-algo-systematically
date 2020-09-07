import Stack from '../../model/Stack'
import LinkedList from './linked-list'

class LinkedListStack<E> implements Stack<E> {
  private list = new LinkedList<E>()
  push(item: E): void {
    this.list.addFirst(item)
  }

  pop(): E | null {
    return this.list.removeFirst() || null
  }
  peek(): E | null {
    return this.list.first()
  }
  size(): number {
    return this.list.size()
  }
  isEmpty(): boolean {
    return this.list.isEmpty()
  }

  toString() {
    return this.list.toString()
  }
}

export default LinkedListStack
