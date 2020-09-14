import Set from '../model/Set'
import DoublyLinkedListCircular from '../stage1/basic-data-structure/linked-list'

class LinkedListSet<E> implements Set<E> {
  private list = new DoublyLinkedListCircular<E>()

  add(e: E): void {
    if (!this.contains(e)) this.list.addFirst(e)
  }
  remove(e: E): void {
    this.list.removeItem(e)
  }

  contains(e: E): boolean {
    return this.list.contains(e)
  }

  size(): number {
    return this.list.size()
  }
  isEmpty(): boolean {
    return this.list.isEmpty()
  }
}

export default LinkedListSet