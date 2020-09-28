import Comparable from '../model/Comparable'
import Map from '../model/Map'

class TreeNode<Key, Value> {
  left: TreeNode<Key, Value> | null = null
  right: TreeNode<Key, Value> | null = null
  height: number = 1

  constructor(public key: Key, public value: Value) {}
}

class AVLTree<Key extends string | number | Comparable<Key>, Value>
  implements Map<Key, Value> {
  private _size = 0
  private root: TreeNode<Key, Value> | null = null

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  private _height(node: TreeNode<Key, Value> | null) {
    if (!node) return 0

    return node.height
  }

  delete(key: Key): void {
    if (!this.contains(key)) return

    this.root = this._delete(this.root, key)
    this._size--
  }

  private _delete(
    node: TreeNode<Key, Value> | null,
    key: Key
  ): TreeNode<Key, Value> | null {
    if (!node) return null

    const cmp = this.compare(key, node.key)

    if (cmp < 0) {
      node.left = this._delete(node.left, key)
    } else if (cmp > 0) {
      node.right = this._delete(node.right, key)
    } else {
      if (!node.left) {
        return node.right
      } else if (!node.right) {
        return node.left
      } else {
        const aux = this._min(node.right)
        node.key = aux.key
        node.value = aux.value
        node.right = this._delete(node.right, aux.key)
      }
    }

    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right))

    return this.balance(node)
  }

  private balance(node: TreeNode<Key, Value>): TreeNode<Key, Value> {
    const balanceFactor = this._balanceFactor(node)

    if (balanceFactor > 1 && this._balanceFactor(node.left) >= 0) {
      node = this.rotateRight(node)
    }
    if (balanceFactor < -1 && this._balanceFactor(node.right) <= 0) {
      node = this.rotateLeft(node)
    }
    if (balanceFactor > 1 && this._balanceFactor(node.left) < 0) {
      node.left = this.rotateLeft(node.left!)
      node = this.rotateRight(node)
    }
    if (balanceFactor < -1 && this._balanceFactor(node.right) > 0) {
      node.right = this.rotateRight(node.right!)
      node = this.rotateLeft(node)
    }

    return node
  }

  min(): Key | null {
    if (this.isEmpty()) return null

    return this._min(this.root!).key
  }

  private _min(node: TreeNode<Key, Value>): TreeNode<Key, Value> {
    if (!node.left) return node

    return this._min(node.left)
  }

  contains(key: Key): boolean {
    return this.get(key) !== null
  }
  get(key: Key): Value | null {
    return this._get(this.root, key)
  }

  private _get(node: TreeNode<Key, Value> | null, key: Key): Value | null {
    if (!node) return null
    const cmp = this.compare(key, node.key)

    if (cmp < 0) return this._get(node.left, key)
    else if (cmp > 0) return this._get(node.right, key)
    else return node.value
  }
  put(key: Key, value: Value): void {
    this.root = this._put(this.root, key, value)
  }

  private _put(
    node: TreeNode<Key, Value> | null,
    key: Key,
    value: Value
  ): TreeNode<Key, Value> {
    if (!node) {
      this._size++
      return new TreeNode(key, value)
    }

    const cmp = this.compare(key, node.key)

    if (cmp > 0) {
      node.right = this._put(node.right, key, value)
    } else if (cmp < 0) {
      node.left = this._put(node.left, key, value)
    } else {
      node.value = value
    }

    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right))

    return this.balance(node)
  }

  private rotateRight(node: TreeNode<Key, Value>): TreeNode<Key, Value> {
    const newRoot = node.left!

    node.left = newRoot.right
    newRoot.right = node

    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right))
    newRoot.height =
      1 + Math.max(this._height(newRoot.right), this._height(newRoot.left))

    return newRoot
  }

  private rotateLeft(node: TreeNode<Key, Value>): TreeNode<Key, Value> {
    const newRoot = node.right!

    node.right = newRoot.left
    newRoot.left = node

    node.height =
      1 + Math.max(this._height(node.left), this._height(node.right))
    newRoot.height =
      1 + Math.max(this._height(newRoot.right), this._height(newRoot.left))

    return newRoot
  }

  private _balanceFactor(node: TreeNode<Key, Value> | null): number {
    if (!node) return 0

    return this._height(node.left) - this._height(node.right)
  }

  isBST(): boolean {
    const keys: Key[] = []

    this.inOrder(this.root, keys)

    for (let i = 1; i < keys.length; i++) {
      if (this.compare(keys[i - 1], keys[i]) > 0) return false
    }
    return true
  }

  isBalance(): boolean {
    return this._isBalance(this.root)
  }

  private _isBalance(node: TreeNode<Key, Value> | null): boolean {
    if (!node) return true

    const balanceFactor = this._balanceFactor(node)

    if (Math.abs(balanceFactor) > 1) return false
    else return this._isBalance(node.left) && this._isBalance(node.right)
  }

  private inOrder(node: TreeNode<Key, Value> | null, keys: Key[]): void {
    if (!node) return

    this.inOrder(node.left, keys)
    keys.push(node.key)
    this.inOrder(node.right, keys)
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
}

export default AVLTree
