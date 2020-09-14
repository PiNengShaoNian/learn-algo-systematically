import Comparable from '../model/Comparable'
import Map from '../model/Map'

class BSTNode<Key, Value> {
  public left: BSTNode<Key, Value> | null = null
  public right: BSTNode<Key, Value> | null = null

  constructor(public key: Key, public value: Value) {}
}

class BSTMap<Key extends number | string | Comparable<Key>, Value>
  implements Map<Key, Value> {
  private root: BSTNode<Key, Value> | null = null
  private _size = 0

  remove(key: Key): Value | null {
    if (this.isEmpty()) return null
    if (!this.contains(key)) return null

    const val = this.get(key)
    this.root = this._delete(this.root, key)
    this._size--
    return val
  }

  private _delete(
    node: BSTNode<Key, Value> | null,
    key: Key
  ): null | BSTNode<Key, Value> {
    if (!node) return null
    const cmp = this.compare(key, node.key)

    if (cmp < 0) {
      node.left = this._delete(node.left, key)
    } else if (cmp > 0) {
      node.right = this._delete(node.right, key)
    } else {
      if (!node.left) {
        return node.right
      }

      if (!node.right) {
        return node.left
      }

      const min = this._min(node.right)
      node.right = this._deleteMin(node.right)
      node.value = min.value
      node.key = min.key
    }

    return node
  }

  deleteMin() {
    if (this.isEmpty()) return

    const min = this.min()
    this.root = this._deleteMin(this.root!)
    this._size--
    return min
  }

  private _deleteMin(node: BSTNode<Key, Value>): BSTNode<Key, Value> | null {
    if (!node.left) return node.right

    node.left = this._deleteMin(node.left)

    return node
  }

  min(): Value {
    if (this._size === 0) {
      throw new Error('Empty binary tree')
    }

    return this._min(this.root!).value
  }

  private _min(node: BSTNode<Key, Value>): BSTNode<Key, Value> {
    if (!node.left) return node

    return this._min(node.left)
  }

  contains(key: Key): boolean {
    return this._contains(this.root, key)
  }

  private _contains(node: BSTNode<Key, Value> | null, key: Key): boolean {
    if (!node) return false

    const cmp = this.compare(key, node.key)
    if (cmp === 0) return true
    else if (cmp < 0) {
      return this._contains(node.left, key)
    } else return this._contains(node.right, key)
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

  get(key: Key): Value | null {
    if (this.isEmpty()) return null

    const node = this._get(this.root!, key)
    if (node) return node.value
    return null
  }

  private _get(
    node: BSTNode<Key, Value> | null,
    key: Key
  ): BSTNode<Key, Value> | null {
    if (!node) return null
    const cmp = this.compare(key, node.key)

    if (cmp === 0) return node
    else if (cmp < 0) return this._get(node.left, key)
    else return this._get(node.right, key)
  }

  put(key: Key, value: Value): void {
    this.root = this._put(this.root, key, value)
  }

  private _put(node: BSTNode<Key, Value> | null, key: Key, value: Value) {
    if (!node) {
      this._size++
      return new BSTNode(key, value)
    }

    const cmp = this.compare(key, node.key)

    if (cmp === 0) node.value = value
    else if (cmp < 0) node.left = this._put(node.left, key, value)
    else if (cmp > 0) node.right = this._put(node.right, key, value)

    return node
  }
  size(): number {
    return this._size
  }
  isEmpty(): boolean {
    return this._size === 0
  }
}

export default BSTMap
