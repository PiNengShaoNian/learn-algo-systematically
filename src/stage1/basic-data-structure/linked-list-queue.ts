import Queue from '../../model/Queue'

class ListNode<E> {
  constructor(public item: E, public next: ListNode<E> | null) {}
}

class LinkedListQueue<E> implements Queue<E> {
  private _size = 0
  private first: ListNode<E> | null = null
  private last: ListNode<E> | null = null

  size(): number {
    return this._size
  }
  isEmpty(): boolean {
    return this._size === 0
  }
  enqueue(e: E): void {
    if (this.isEmpty()) {
      this.first = this.last = new ListNode(e, null)
    } else {
      const node = new ListNode(e, null)
      this.last!.next = node
      this.last = node
    }

    this._size++
  }
  front(): E | null {
    if (this.isEmpty()) return null
    return this.first!.item
  }
  dequeue(): E | null {
    if (this.isEmpty()) return null

    const item = this.first!.item
    this.first = this.first?.next || null

    if (!this.first) this.last = null
    this._size--

    return item
  }
}

export default LinkedListQueue
