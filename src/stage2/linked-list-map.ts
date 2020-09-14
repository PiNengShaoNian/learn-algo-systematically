import Comparable from '../model/Comparable'
import Map from '../model/Map'

class Node<Key, Value> {
  constructor(
    public key?: Key,
    public value?: Value,
    public next?: Node<Key, Value> | null
  ) {}
}

class LinkedListMap<Key extends number | string | Comparable<Key>, Value>
  implements Map<Key, Value> {
  private dummyHead = new Node<Key, Value>()
  private _size = 0

  put(key: Key, value: Value): void {
    const node = this.getNode(key)

    if (node === null) {
      this.dummyHead.next = new Node(key, value, this.dummyHead.next)
      this._size++
    } else node.value = value
  }

  remove(key: Key): Value | null {
    let prev = this.dummyHead

    while (prev.next) {
      if (prev.next.key === key) {
        break
      }
      prev = prev.next
    }

    if (prev.next) {
      const delNode = prev.next
      prev.next = delNode.next
      this._size--
      return delNode.value ?? null
    }

    return null
  }

  contains(key: Key): boolean {
    return this.getNode(key) !== null
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

  getNode(key: Key): null | Node<Key, Value> {
    let cur = this.dummyHead.next

    while (cur) {
      if (this.compare(key, cur.key!) === 0) {
        return cur
      }

      cur = cur.next
    }
    return null
  }

  get(key: Key): Value | null {
    const node = this.getNode(key)
    if (node) return node.value!
    else return null
  }

  set(key: Key, value: Value): void {
    const node = this.getNode(key)

    if (node === null) {
      throw new Error(`Key ${key} doesn't exist!`)
    }

    node.value = value
  }
  size(): number {
    return this._size
  }
  isEmpty(): boolean {
    return this._size === 0
  }
}

export default LinkedListMap
