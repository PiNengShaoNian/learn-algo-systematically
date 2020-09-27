type Merger<E> = (a: E, b: E) => E

class SegmentTree<E> {
  private data: E[] = []
  private tree: E[]
  private merger: Merger<E>
  constructor(data: E[], merger: Merger<E>) {
    for (let i = 0; i < data.length; i++) {
      this.data[i] = data[i]
    }
    this.tree = []

    this.merger = merger
    this.buildSegmentTree(0, 0, data.length - 1)
  }

  private buildSegmentTree(treeIndex: number, l: number, r: number) {
    if (l === r) {
      this.tree[treeIndex] = this.data[l]
      return
    }

    const leftTreeIndex = this.leftChild(treeIndex)
    const rightTreeIndex = this.rightChild(treeIndex)

    const mid = l + Math.floor((r - l) / 2)

    this.buildSegmentTree(leftTreeIndex, l, mid)
    this.buildSegmentTree(rightTreeIndex, mid + 1, r)

    this.tree[treeIndex] = this.merger(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    )
  }

  private leftChild(index: number) {
    return index * 2 + 1
  }

  get(index: number) {
    return this.data[index]
  }

  set(index: number, e: E): void {
    this.data[index] = e
    this._set(0, 0, this.data.length - 1, index, e)
  }

  private _set(treeIndex: number, l: number, r: number, index: number, e: E) {
    if (l === r) {
      this.tree[treeIndex] = e
      return
    }

    const mid = l + Math.floor((r - l) / 2)

    const leftTreeIndex = this.leftChild(treeIndex)
    const rightTreeIndex = this.rightChild(treeIndex)

    if (index >= mid + 1) {
      this._set(rightTreeIndex, mid + 1, r, index, e)
    } else {
      this._set(leftTreeIndex, l, mid, index, e)
    }

    this.tree[treeIndex] = this.merger(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    )
  }

  private rightChild(index: number) {
    return index * 2 + 2
  }

  query(queryL: number, queryR: number): E {
    return this._query(0, 0, this.data.length - 1, queryL, queryR)
  }

  private _query(
    treeIndex: number,
    l: number,
    r: number,
    queryL: number,
    queryR: number
  ): E {
    if (l === queryL && r === queryR) {
      return this.tree[treeIndex]
    }

    const mid = l + Math.floor((r - l) / 2)

    const leftTreeIndex = this.leftChild(treeIndex)
    const rightTreeIndex = this.rightChild(treeIndex)

    if (queryL >= mid + 1) {
      return this._query(rightTreeIndex, mid + 1, r, queryL, queryR)
    } else if (queryR <= mid) {
      return this._query(leftTreeIndex, l, mid, queryL, queryR)
    } else
      return this.merger(
        this._query(leftTreeIndex, l, mid, queryL, mid),
        this._query(rightTreeIndex, mid + 1, r, mid + 1, queryR)
      )
  }
}

export default SegmentTree
