import Comparable from '../model/Comparable'
import Map from '../model/Map'

const RED = true
const BLACK = false

class TreeNode<Key, Value> {
  public key: Key
  public value: Value
  public left: TreeNode<Key, Value> | null = null
  public right: TreeNode<Key, Value> | null = null
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
  private root: TreeNode<Key, Value> | null = null

  private isRed(node: null | TreeNode<Key, Value>): boolean {
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
    node: TreeNode<Key, Value> | null,
    key: Key
  ): TreeNode<Key, Value> | null {
    if (!node) return null

    if (this.compare(key, node.key) < 0) {
      if (!this.isRed(node.left) && node.left && !this.isRed(node.left.left)) {
        node = this.moveRedLeft(node)
      }

      node.left = this._delete(node.left, key)
    } else {
      if (this.isRed(node.left)) {
        node = this.rotateRight(node)
      }

      if (this. compare(key, node.key) === 0 && !node.right) return null

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

  private _min(node: TreeNode<Key, Value>): TreeNode<Key, Value> {
    if (!node.left) return node

    return this._min(node.left)
  }

  private _deleteMin(node: TreeNode<Key, Value>): null | TreeNode<Key, Value> {
    if (!node.left) return null

    if (!this.isRed(node.left) && !this.isRed(node.left.left)) {
      node = this.moveRedLeft(node)
    }

    node.left = this._deleteMin(node.left!)

    return this.balance(node)
  }

  private balance(node: TreeNode<Key, Value> | null): TreeNode<Key, Value> | null {
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

  private moveRedLeft(node: TreeNode<Key, Value>) {
    this.flipColors(node)

    if (node.right && this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right)
      node = this.rotateLeft(node)
      this.flipColors(node)
    }

    return node
  }

  private moveRedRight(node: TreeNode<Key, Value>) {
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

  private _get(node: TreeNode<Key, Value> | null, key: Key): null | Value {
    if (!node) return null

    const compare = this.compare(key, node.key)

    if (compare < 0) {
      return this._get(node.left, key)
    } else if (compare > 0) {
      return this._get(node.right, key)
    } else return node.value
  }

  private rotateLeft(node: TreeNode<Key, Value>): TreeNode<Key, Value> {
    const newRoot = node.right!

    node.right = newRoot.left
    newRoot.left = node
    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
  }

  private rotateRight(node: TreeNode<Key, Value>): TreeNode<Key, Value> {
    const newRoot = node.left!

    node.left = newRoot.right
    newRoot.right = node
    newRoot.color = node.color
    node.color = RED

    newRoot.size = node.size
    node.size = this._size(node.left) + 1 + this._size(node.right)

    return newRoot
  }

  private flipColors(node: TreeNode<Key, Value>): void {
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
    node: null | TreeNode<Key, Value>,
    key: Key,
    value: Value
  ): TreeNode<Key, Value> {
    if (!node) return new TreeNode(key, value, 1, RED)

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

  private compare(a: Key, b: Key): number {
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

  private _size(node: TreeNode<Key, Value> | null): number {
    if (!node) return 0

    return node.size
  }

  floor(key: Key): Key | null {
    const node = this._floor(this.root, key)
    if (!node) return null

    return node.key
  }

  private _floor(
    node: TreeNode<Key, Value> | null,
    key: Key
  ): TreeNode<Key, Value> | null {
    if (!node) return null

    const compare = this.compare(key, node.key)

    if (compare === 0) return node
    else if (compare < 0) return this._floor(node.left, key)
    else {
      const rightNode = this._floor(node.right, key)

      if (rightNode) return rightNode
      else return node
    }
  }

  ceiling(key: Key): null | Key {
    const node = this._ceiling(this.root, key)
    if (!node) return null

    return node.key
  }

  private _ceiling(
    node: TreeNode<Key, Value> | null,
    key: Key
  ): TreeNode<Key, Value> | null {
    if (!node) return null

    const compare = this.compare(key, node.key)

    if (compare === 0) return node
    else if (compare > 0) return this._ceiling(node.right, key)
    else {
      const leftNode = this._ceiling(node.left, key)

      if (leftNode) return leftNode
      else return node
    }
  }

  select(index: number): Key | null {
    if (index > this.size() || this.isEmpty() || index < 0) {
      return null
    }

    return this._select(this.root!, index).key
  }

  private _select(node: TreeNode<Key, Value>, index: number): TreeNode<Key, Value> {
    const leftSubtreeSize = this._size(node.left)

    if (leftSubtreeSize === index) return node
    else if (leftSubtreeSize > index) return this._select(node.left!, index)
    else return this._select(node.right!, index - leftSubtreeSize - 1)
  }

  rank(key: Key) {
    return this._rank(this.root, key)
  }

  private _rank(node: TreeNode<Key, Value> | null, key: Key): number {
    if (!node) return 0

    const compare = this.compare(key, node.key)
    if (compare < 0) {
      return this._rank(node.left, key)
    } else if (compare > 0) {
      return this._size(node.left) + 1 + this._rank(node.right, key)
    } else return this._size(node.left)
  }

  isEmpty(): boolean {
    return this._size(this.root) === 0
  }
}

export default RedBlackTree
