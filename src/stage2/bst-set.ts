import Set from '../model/Set'
import Comparable from '../model/Comparable'
import BST from './bst'

class BSTSet<E extends number | string | Comparable<E>> implements Set<E> {
  private bst = new BST<E>()
  add(e: E): void {
    this.bst.add(e)
  }
  remove(e: E): void {
    this.bst.delete(e)
  }
  contains(e: E): boolean {
    return this.bst.contains(e)
  }
  size(): number {
    return this.bst.size()
  }
  isEmpty(): boolean {
    return this.bst.isEmpty()
  }

  *[Symbol.iterator]() {
    return this.bst.inOrder()
  }
}

export default BSTSet
