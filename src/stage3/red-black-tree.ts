import Comparable from '../model/Comparable'
import Map from '../model/Map'

const RED = true
const BLACK = false

class Node<Key, Value> {
  public key: Key
  public value: Value
  public left: Node<Key, Value> | null = null
  public right: Node<Key, Value> | null = null
  public color: boolean = RED
  public size: number

  constructor(key: Key, value: Value, size: number, color: boolean) {
    this.key = key
    this.value = value
    this.size = size
    this.color = color
  }
}

class RedBlackTree<Key extends string | number | Comparable<Key>, Value>
  implements Map<Key, Value> {
  private root: Node<Key, Value> | null = null

  private isRed(node: null | Node<Key, Value>): boolean {
    if (!node) return false

    return node.color
  }

  delete(key: Key): void {
    if (this.isEmpty() || !this.contains(key)) return

    if (!this.isRed(this.root!.left) && !this.isRed(this.root!.right)) {
      this.root!.color = RED
    }

    this.root = this._delete(this.root, key)

    if (!this.isEmpty()) this.root!.color = BLACK
  }

  private _delete(
    node: Node<Key, Value> | null,
    key: Key
  ): Node<Key, Value> | null {
    if (!node) return null

    if (this.compare(key, node.key) < 0) {
      if (!this.isRed(node.left) && node.left && this.isRed(node.left.left)) {
        node = this.moveRedLeft(node)
      }

      node.left = this._delete(node.left, key)
    } else {
      if (this.isRed(node.left)) {
        node = this.rotateRight(node)
      }

      if (this.compare(key, node.key) === 0 && !node.right) return null

      if (
        !this.isRed(node.right) &&
        node.right &&
        !this.isRed(node.right.left)
      ) {
        node = this.moveRedRight(node)
      }

      if (this.compare(key, node.key) === 0) {
        const aux = this._min(node.right!)
        node.key = aux.key
        node.value = aux.value
        node.right = this._deleteMin(node.right!)
      } else {
        node.right = this._delete(node.right, key)
      }
    }

    return this.balance(node)
  }

  private _min(node: Node<Key, Value>): Node<Key, Value> {
    if (!node.left) return node

    return this._min(node.left)
  }

  private _deleteMin(node: Node<Key, Value>): null | Node<Key, Value> {
    if (!node.left) return null

    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      node = this.moveRedLeft(node)
    }

    node.left = this._deleteMin(node.left!)

    return this.balance(node)
  }

  private balance(node: Node<Key, Value> | null): Node<Key, Value> | null {
    if (!node) return null

    if (this.isRed(node.right)) {
      node = this.rotateLeft(node)
    }

    if (this.isRed(node.left) && this.isRed(node.left!.left)) {
      node = this.rotateRight(node)
    }

    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }

    node.size = this._size(node.left) + 1 + this._size(node.right)

    return node
  }

  private moveRedLeft(node: Node<Key, Value>) {
    this.flipColors(node)

    if (node.right && this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right)
      node = this.rotateLeft(node)
      this.flipColors(node)
    }

    return node
  }

  private moveRedRight(node: Node<Key, Value>) {
    this.flipColors(node)

    if (node.left && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
      this.flipColors(node)
    }

    return node
  }

  contains(key: Key): boolean {
    return this.get(key) !== null
  }
  get(key: Key): Value | null {
    return this._get(this.root, key)
  }

  private _get(node: Node<Key, Value> | null, key: Key): null | Value {
    if (!node) return null

    const compare = this.compare(key, node.key)

    if (compare < 0) {
      return this._get(node.left, key)
    } else if (compare > 0) {
      return this._get(node.right, key)
    } else return node.value
  }

  private rotateLeft(node: Node<Key, Value>): Node<Key, Value> {
    const newRoot = node.right!

    node.right = newRoot.left
    newRoot.left = node
    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
  }

  private rotateRight(node: Node<Key, Value>): Node<Key, Value> {
    const newRoot = node.left!

    node.left = newRoot.right
    newRoot.right = node
    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
  }

  private flipColors(node: Node<Key, Value>): void {
    if (!node || !node.left || !node.right) return

    if (
      (this.isRed(node) && !this.isRed(node.left) && !this.isRed(node.right)) ||
      (!this.isRed(node) && this.isRed(node.left) && this.isRed(node.right))
    ) {
      node.color = !node.color
      node.left.color = !node.left.color
      node.right.color = !node.right.color
    }
  }
  put(key: Key, value: Value): void {
    this.root = this._put(this.root, key, value)
    this.root.color = BLACK
  }

  private _put(
    node: null | Node<Key, Value>,
    key: Key,
    value: Value
  ): Node<Key, Value> {
    if (!node) return new Node(key, value, 1, RED)

    const compare = this.compare(key, node.key)

    if (compare < 0) {
      node.left = this._put(node.left, key, value)
    } else if (compare > 0) {
      node.right = this._put(node.right, key, value)
    } else node.value = value

    if (this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.rotateLeft(node)
    }

    if (this.isRed(node.left) && this.isRed(node.left!.left)) {
      node = this.rotateRight(node)
    }

    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node)

    node.size = this._size(node.left) + 1 + this._size(node.right)

    return node
  }

  compare(a: Key, b: Key): number {
    if (typeof a === 'string') {
      if (a === b) return 0
      return a > b ? 1 : -1
    } else if (typeof a === 'number') {
      return a - (b as number)
    } else {
      return (a as Comparable<Key>).compareTo(b)
    }
  }
  size(): number {
    return this._size(this.root)
  }

  private _size(node: Node<Key, Value> | null): number {
    if (!node) return 0

    return node.size
  }
  isEmpty(): boolean {
    return this._size(this.root) === 0
  }
}

export default RedBlackTree
