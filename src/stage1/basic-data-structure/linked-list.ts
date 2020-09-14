class ListNode<E> {
  constructor(public item: E, public next: ListNode<E> | null) {}

  toString() {
    return this.item
  }
}

class LinkedList<E> {
  private dummyHead: ListNode<E> | null = new ListNode(
    (null as unknown) as E,
    null
  )
  private _size: number = 0

  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  addFirst(e: E) {
    this.addAtIndex(0, e)
  }

  addAtIndex(index: number, e: E) {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let prev = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev!.next
    }

    prev!.next = new ListNode(e, prev!.next)
    this._size++
  }

  addLast(e: E) {
    this.addAtIndex(this._size, e)
  }

  get(index: number): E {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let cur = this.dummyHead?.next

    for (let i = 0; i < index; i++) {
      cur = cur!.next
    }

    return cur!.item
  }

  first() {
    return this.get(0)
  }

  last() {
    return this.get(this._size - 1)
  }

  set(index: number, e: E) {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let cur = this.dummyHead!.next

    for (let i = 0; i < index; i++) {
      cur = cur!.next
    }

    cur!.item = e
  }

  removeAtIndex(index: number) {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    let prev = this.dummyHead

    for (let i = 0; i < index; i++) {
      prev = prev!.next
    }

    const retNode = prev!.next
    prev!.next = retNode!.next
    retNode!.next = null
    this._size--

    return retNode?.item
  }

  removeFirst() {
    return this.removeAtIndex(0)
  }

  removeLast() {
    return this.removeAtIndex(this._size - 1)
  }

  contains(e: E) {
    let cur = this.dummyHead?.next

    while (cur) {
      if (cur.item === e) return true

      cur = cur.next
    }

    return false
  }

  toString() {
    let str = ''
    let cur = this.dummyHead?.next
    while (cur) {
      str += cur.item + '->'
      cur = cur.next
    }

    return str
  }
}

class LinkedListRecursive<E> {
  private _first: ListNode<E> | null = null
  private _size: number = 0
  size() {
    return this._size
  }

  isEmpty() {
    return this._size === 0
  }

  addAtIndex(index: number, e: E) {
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    this._first = this._addAtIndex(this._first, index, e)
    this._size++
  }

  private _addAtIndex(node: ListNode<E> | null, index: number, e: E) {
    if (index === 0) return new ListNode(e, node)

    node!.next = this._addAtIndex(node!.next, index - 1, e)

    return node
  }

  addFirst(e: E) {
    this.addAtIndex(0, e)
  }

  addLast(e: E) {
    this.addAtIndex(this._size, e)
  }

  get(index: number): E | null {
    if (this.isEmpty()) return null
    if (index < 0 || index > this._size) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    return this._get(this._first!, index)
  }

  private _get(node: ListNode<E>, index: number): E {
    if (index === 0) return node.item

    return this._get(node.next!, index - 1)
  }

  first(): E | null {
    return this._first?.item ?? null
  }

  set(index: number, e: E) {
    if (this.isEmpty()) return
    if (index < 0 || index > this._size - 1) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    this._set(this._first!, index, e)
  }

  private _set(node: ListNode<E>, index: number, e: E) {
    if (index === 0) {
      node.item = e
      return
    }

    this._set(node.next!, index - 1, e)
  }

  removeAtIndex(index: number) {
    if (this.isEmpty()) return
    if (index < 0 || index > this._size - 1) {
      throw new Error(`Index ${index} out of range 0-${this._size}`)
    }

    this._first = this._removeAtIndex(this._first, index)
    this._size--
  }

  private _removeAtIndex(node: ListNode<E> | null, index: number) {
    if (index === 0) return node!.next

    node!.next = this._removeAtIndex(node!.next, index - 1)

    return node
  }

  removeFirst() {
    this.removeAtIndex(0)
  }

  contains(e: E) {
    return this._contains(this._first, e)
  }

  _contains(node: ListNode<E> | null, e: E): boolean {
    if (!node) return false

    if (node.item === e) return true
    else return this._contains(node.next, e)
  }
}

class DoubleNode<E> {
  constructor(
    public item: E,
    public previous: DoubleNode<E> | null,
    public next: DoubleNode<E> | null
  ) {}
}

class DoublyLinkedListCircular<E> {
  private _size = 0
  private _first: DoubleNode<E> | null = null
  private _last: DoubleNode<E> | null = null

  isEmpty() {
    return this._size === 0
  }

  size() {
    return this._size
  }

  first(): E | null {
    return this._first?.item ?? null
  }

  firstNode(): DoubleNode<E> | null {
    return this._first
  }

  last(): E | null {
    return this._last?.item ?? null
  }

  lastNode(): DoubleNode<E> | null {
    return this._last
  }

  get(index: number): E | null {
    if (this.isEmpty()) return null

    if (index < 0 || index >= this._size) {
      throw new Error('Index must be between 0 and ' + (this._size - 1))
    }

    let current = this._first
    let count = 0

    while (count !== index) {
      current = current!.next
      count++
    }

    return current!.item
  }

  addFirst(item: E) {
    const oldFirst = this._first

    const doubleNode = new DoubleNode<E>(item, null, null)
    this._first = doubleNode
    this._first.next = oldFirst

    if (!this.isEmpty()) {
      this._first.previous = oldFirst!.previous
      oldFirst!.previous = this._first
    } else {
      this._last = this._first
      this._first.previous = this._last
    }

    this._last!.next = this._first
    this._size++
  }

  addLast(item: E) {
    const oldLast = this._last

    this._last = new DoubleNode(item, oldLast, null)

    if (!this.isEmpty()) {
      this._last.next = oldLast!.next
      oldLast!.next = this._last
    } else {
      this._first = this._last
      this._last.next = this._first
    }

    this._first!.previous = this._last
    this._size++
  }

  removeFirst(): E | null {
    if (this.isEmpty()) return null

    const item = this._first!.item

    if (this._size > 1) {
      this._first!.next!.previous = this._first!.previous
      this._first!.previous!.next = this._first!.next
      this._first = this._first!.next
    } else {
      this._first = null
      this._last = null
    }

    this._size--

    return item
  }

  removeLast(): E | null {
    if (this.isEmpty()) return null

    const item = this._last!.item

    if (this._size > 1) {
      this._last!.previous!.next = this._last!.next
      this._last!.next!.previous = this._last!.previous
      this._last = this._last!.previous
    } else {
      this._first = null
      this._last = null
    }

    this._size--
    return item
  }

  removeAtIndex(nodeIndex: number): E | null {
    if (this.isEmpty()) return null

    if (nodeIndex < 0 || nodeIndex >= this._size) {
      throw new Error('Index must be between 0 and ' + (this._size - 1))
    }

    const startFromTheBeginning = nodeIndex <= this._size / 2

    let index = startFromTheBeginning ? 0 : this._size - 1

    let currentNode = startFromTheBeginning ? this._first : this._last

    while (true) {
      if (nodeIndex === index) {
        break
      }

      if (startFromTheBeginning) index++
      else index--

      currentNode = startFromTheBeginning
        ? currentNode!.next
        : currentNode!.previous
    }

    const item = currentNode!.item
    this.removeItemWithNode(currentNode!)

    return item
  }

  insertBeforeItem(beforeItem: DoubleNode<E>, item: E) {
    if (this.isEmpty()) return

    const node = new DoubleNode<E>(item, beforeItem.previous, beforeItem)
    beforeItem.previous!.next = node
    beforeItem.previous = node
  }

  addAtIndex(nodeIndex: number, item: E) {
    if (nodeIndex < 0 || nodeIndex > this._size) {
      throw new Error('Index must be between 0 and ' + (this._size - 1))
    }
    if (this.isEmpty()) {
      this.addFirst(item)
      return
    }
    if (nodeIndex === this._size) {
      this.addLast(item)
      return
    }

    const startFromTheBeginning = nodeIndex <= this._size / 2

    let index = startFromTheBeginning ? 0 : this._size - 1

    let currentNode = startFromTheBeginning ? this._first : this._last

    while (true) {
      if (nodeIndex === index) {
        break
      }

      if (startFromTheBeginning) index++
      else index--

      currentNode = startFromTheBeginning
        ? currentNode!.next
        : currentNode!.previous
    }

    this.insertBeforeItem(currentNode!, item)
    this._size++
  }

  removeItemWithNode(doubleNode: DoubleNode<E>) {
    if (!doubleNode) {
      throw new Error('Node cannot be null')
    }

    if (this.isEmpty()) return

    if (doubleNode === this._first && this._first === this._last) {
      this._first = null
      this._last = null
      this._size--
      return
    }

    const previousNode = doubleNode!.previous
    const nextNode = doubleNode!.next

    previousNode!.next = nextNode
    nextNode!.previous = previousNode

    if (doubleNode === this._first) {
      this._first = nextNode
    }

    if (doubleNode === this._last) {
      this._last = previousNode
    }

    this._size--
  }

  removeItem(item: E) {
    if (this.isEmpty()) return

    let currentNode = this._first!

    while (currentNode !== this._last) {
      if (currentNode.item === item) {
        this.removeItemWithNode(currentNode)
        return
      }

      currentNode = currentNode.next!
    }

    if (currentNode.item === item) {
      this.removeLast()
    }
  }

  contains(item: E) {
    if (this.isEmpty()) return false
    let currentNode = this._first

    for (let i = 0; i < this._size; i++) {
      if (currentNode?.item === item) return true
      currentNode = currentNode!.next
    }

    return false
  }

  *[Symbol.iterator]() {
    let currentNode = this._first
    for (let i = 0; i < this._size; i++) {
      yield currentNode?.item
      currentNode = currentNode!.next
    }
  }

  toString() {
    const ret = []

    for (const node of this) {
      ret.push(node)
    }

    return ret.join('->')
  }
}

export default DoublyLinkedListCircular
