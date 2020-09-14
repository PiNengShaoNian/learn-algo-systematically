import Comparable from '../model/Comparable'
import ArrayStack from '../stage1/basic-data-structure/array-stack'
import LoopQueue from '../stage1/basic-data-structure/loop-queue'

class Node<E> {
  public e: E
  public left: Node<E> | null
  public right: Node<E> | null

  constructor(e: E) {
    this.e = e
    this.left = null
    this.right = null
  }
}

class BST<E extends number | string | Comparable<E>> {
  public root: Node<E> | null = null
  private _size = 0

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  add(e: E): void {
    this.root = this._add(this.root, e)
  }

  compare(a: E, b: E): number {
    if (typeof a === 'string') {
      if (a === b) return 0
      return a > b ? 1 : -1
    } else if (typeof a === 'number') {
      return a - (b as number)
    } else {
      return (a as Comparable<E>).compareTo(b)
    }
  }

  private _add(node: Node<E> | null, e: E): Node<E> {
    if (!node) {
      this._size++
      return new Node(e)
    }

    const cmp = this.compare(e, node.e)

    if (cmp === 0) return node
    else if (cmp < 0) node.left = this._add(node.left, e)
    else if (cmp > 0) node.right = this._add(node.right, e)

    return node
  }

  nonRecursiveAdd(e: E) {
    const parents = new ArrayStack<Node<E>>()

    let parent: Node<E> | null = this.root

    while (parent) {
      parents.push(parent)

      const cmp = this.compare(parent.e, e)
      if (cmp === 0) return
      else if (cmp > 0) {
        parent = parent.left
      } else {
        parent = parent.right
      }
    }

    const node = new Node(e)
    parent = parents.peek()
    this._size++
    if (parent) {
      const cmp = this.compare(e, parent.e)
      if (cmp > 0) parent.right = node
      else parent.left = node
    } else {
      this.root = node
    }
  }

  contains(e: E): boolean {
    return this._contains(this.root, e)
  }

  private _contains(node: Node<E> | null, e: E): boolean {
    if (!node) return false

    const cmp = this.compare(e, node.e)
    if (cmp === 0) return true
    else if (cmp < 0) {
      return this._contains(node.left, e)
    } else return this._contains(node.right, e)
  }

  preOrder() {
    const items: E[] = []
    this._preOrder(this.root, items)
    return items
  }

  nonRecursivePreOrder() {
    const stack = new ArrayStack<Node<E>>()
    const items: E[] = []
    if (this.root) stack.push(this.root)

    while (!stack.isEmpty()) {
      const cur = stack.pop()!
      items.push(cur.e)

      if (cur.right) stack.push(cur.right)
      if (cur.left) stack.push(cur.left)
    }

    return items
  }

  private _preOrder(node: Node<E> | null, items: E[]) {
    if (!node) return

    items.push(node.e)
    this._preOrder(node.left, items)
    this._preOrder(node.right, items)
  }

  inOrder() {
    const items: E[] = []
    this._inOrder(this.root, items)
    return items
  }

  private _inOrder(node: Node<E> | null, items: E[]) {
    if (!node) return

    this._inOrder(node.left, items)
    items.push(node.e)
    this._inOrder(node.right, items)
  }

  postOrder() {
    const items: E[] = []
    this._postOrder(this.root, items)
    return items
  }

  private _postOrder(node: Node<E> | null, items: E[]) {
    if (!node) return

    this._postOrder(node.left, items)
    this._postOrder(node.right, items)
    items.push(node.e)
  }

  levelOrder() {
    const queue = new LoopQueue<Node<E>>()

    const items: E[] = []
    if (this.root) queue.enqueue(this.root)

    while (!queue.isEmpty()) {
      const cur = queue.dequeue()!
      items.push(cur.e)
      if (cur.left) queue.enqueue(cur.left)

      if (cur.right) queue.enqueue(cur.right)
    }

    return items
  }

  min(): E {
    if (this._size === 0) {
      throw new Error('Empty binary tree')
    }

    return this._min(this.root!).e
  }

  private _min(node: Node<E>): Node<E> {
    if (!node.left) return node

    return this._min(node.left)
  }

  max(): E {
    if (this._size === 0) {
      throw new Error('Empty binary tree')
    }

    return this._max(this.root!).e
  }

  private _max(node: Node<E>): Node<E> {
    if (!node.right) return node

    return this._max(node.right)
  }

  deleteMin() {
    if (this.isEmpty()) return

    const min = this.min()
    this.root = this._deleteMin(this.root!)
    this._size--
    return min
  }

  private _deleteMin(node: Node<E>): Node<E> | null {
    if (!node.left) return node.right

    node.left = this._deleteMin(node.left)

    return node
  }

  deleteMax() {
    if (this.isEmpty()) return

    const max = this.max()
    this.root = this._deleteMax(this.root!)
    this._size--
    return max
  }

  private _deleteMax(node: Node<E>): Node<E> | null {
    if (!node.right) return node.left

    node.right = this._deleteMax(node.right)

    return node
  }

  delete(e: E) {
    if (this.isEmpty()) return

    if (!this.contains(e)) return

    this.root = this._delete(this.root, e)
    this._size--
  }

  private _delete(node: Node<E> | null, e: E): null | Node<E> {
    if (!node) return null
    const cmp = this.compare(e, node.e)

    if (cmp < 0) {
      node.left = this._delete(node.left, e)
    } else if (cmp > 0) {
      node.right = this._delete(node.right, e)
    } else {
      if (!node.left) {
        return node.right
      }

      if (!node.right) {
        return node.left
      }

      const min = this._min(node.right).e
      node.right = this._deleteMin(node.right)
      node.e = min
    }

    return node
  }

  floor(e: E): null | E {
    if (this.isEmpty()) throw new Error('Empty binary search tree')

    const node = this._floor(this.root, e)

    if (node) return node.e

    return null
  }

  private _floor(node: Node<E> | null, e: E): Node<E> | null {
    if (!node) return null

    const cmp = this.compare(e, node.e)

    if (cmp === 0) return node
    else if (cmp < 0) {
      return this._floor(node.left, e)
    } else {
      const rightNode = this._floor(node.right, e)

      if (rightNode) return rightNode
      else return node
    }
  }
}

export default BST
