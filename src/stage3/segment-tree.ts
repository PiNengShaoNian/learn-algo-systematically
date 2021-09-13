type Merger<E> = (a: E, b: E) => E

export type Updater<T> = {
  spread: (
    parent: SegmentTreeNode<T>,
    left: SegmentTreeNode<T>,
    right: SegmentTreeNode<T>
  ) => void
  update(node: SegmentTreeNode<T>, delta: T): void
}

export class SegmentTreeNode<T> {
  constructor(
    public l: number,
    public r: number,
    public val: T,
    public mark: T | null = null
  ) {}
}

export const numericIntervalSumUpdader: Updater<number> = {
  spread(p, l, r) {
    if (p.mark) {
      l.val += (l.r - l.l + 1) * p.mark
      l.mark = (l.mark ?? 0) + p.mark

      r.val += (r.r - r.l + 1) * p.mark
      r.mark = (r.mark ?? 0) + p.mark
      p.mark = null
    }
  },
  update(n, delta) {
    n.val += (n.r - n.l + 1) * delta
    if (n.mark === null) {
      n.mark = 0
    }
    n.mark += delta
  },
}

export class SegmentTree<T> {
  private merger: Merger<T>
  private updater: Updater<T>
  private tree: SegmentTreeNode<T>[] = []

  /**
   *
   * @param data 线段树初始化数据
   * @param merger 合并函数，一个用于不同用途的线段树，需要不同的merge函数，比如
   * 区间最大值就需要Math.max这样的函数，区间和就可以传一个求和函数
   * @param spread 扩散函数，仅在线段树需要区间更新是使用，当一个懒惰求值节点上的mark
   * 需要向下扩散的时候需要调用该函数，在函数中可以自定义parent中mark向子节点扩散
   * 的方式
   */
  constructor(data: T[], merger: Merger<T>, updater?: Updater<T>) {
    const n = data.length
    this.merger = merger
    this.updater = {
      spread(p, l, r) {
        if (updater?.spread && p.mark !== null) {
          updater.spread(p, l, r)
        }
      },
      update(node, delta) {
        updater?.update(node, delta)
      },
    }

    this.build(1, 0, n - 1, data)
  }

  /**
   * 线段树构建函数
   * @param curr 当前节点的索引
   * @param l 当前节点代表的左区间
   * @param r 当前节点代表的右区间
   * @param data 初始化数据
   * @returns
   */
  private build(curr: number, l: number, r: number, data: T[]) {
    if (l === r) {
      this.tree[curr] = new SegmentTreeNode(l, r, data[l])
      return
    }

    const mid = l + Math.floor((r - l) / 2)
    this.build(curr * 2, l, mid, data)
    this.build(curr * 2 + 1, mid + 1, r, data)

    this.tree[curr] = new SegmentTreeNode(
      l,
      r,
      this.merger(this.tree[curr * 2].val, this.tree[curr * 2 + 1].val)
    )
  }

  /**
   * 将第i位置的值更改为val
   * @param i 值的下表，其范围为[0-n)
   * @param val 要更新的值
   */
  change(i: number, val: T): void {
    this.changeRecursively(1, i, val)
  }

  /**
   * 查询l到r区间中线段树的值，其中(r >= l, r 和 l的范围都是[0-n))
   * @param l 左区间
   * @param r 右区间
   * @returns 区间的值，具体是什么得看merger函数的定义
   */
  query(l: number, r: number): T {
    return this.queryRecursively(1, l, r)
  }

  changeRange(l: number, r: number, delta: T): void {
    this.changeRangeRecursively(1, l, r, delta)
  }

  private changeRangeRecursively(
    curr: number,
    l: number,
    r: number,
    delta: T
  ): void {
    if (l <= this.tree[curr].l && r >= this.tree[curr].r) {
      this.updater.update(this.tree[curr], delta)
      return
    }

    this.updater.spread(
      this.tree[curr],
      this.tree[curr * 2],
      this.tree[curr * 2 + 1]
    )

    const mid =
      this.tree[curr].l +
      Math.floor((this.tree[curr].r - this.tree[curr].l) / 2)

    if (l <= mid) {
      this.changeRangeRecursively(curr * 2, l, r, delta)
    }

    if (r >= mid + 1) {
      this.changeRangeRecursively(curr * 2 + 1, l, r, delta)
    }

    this.tree[curr].val = this.merger(
      this.tree[curr * 2].val,
      this.tree[curr * 2 + 1].val
    )
  }

  private queryRecursively(curr: number, l: number, r: number): T {
    if (l <= this.tree[curr].l && r >= this.tree[curr].r) {
      return this.tree[curr].val
    }

    const mid =
      this.tree[curr].l +
      Math.floor((this.tree[curr].r - this.tree[curr].l) / 2)
    this.updater.spread(
      this.tree[curr],
      this.tree[curr * 2],
      this.tree[curr * 2 + 1]
    )

    let ans: T | null = null
    if (l <= mid) {
      ans = this.queryRecursively(curr * 2, l, r)
    }

    if (r >= mid + 1) {
      const right = this.queryRecursively(curr * 2 + 1, l, r)

      if (ans !== null) ans = this.merger(ans, right)
      else {
        ans = right
      }
    }

    return ans as T
  }

  private changeRecursively(curr: number, i: number, val: T) {
    if (this.tree[curr].l === this.tree[curr].r) {
      this.tree[curr].val = val
      return
    }

    this.updater.spread(
      this.tree[curr],
      this.tree[curr * 2],
      this.tree[curr * 2 + 1]
    )

    const mid =
      this.tree[curr].l +
      Math.floor((this.tree[curr].r - this.tree[curr].l) / 2)

    if (i <= mid) {
      this.changeRecursively(curr * 2, i, val)
    } else {
      this.changeRecursively(curr * 2 + 1, i, val)
    }

    this.tree[curr].val = this.merger(
      this.tree[curr * 2].val,
      this.tree[curr * 2 + 1].val
    )
  }
}
