/*
677. 键值映射
实现一个 MapSum 类里的两个方法，insert 和 sum。

对于方法 insert，你将得到一对（字符串，整数）的键值对。字符串表示键，整数表示值。如果键已经存在，那么原来的键值对将被替代成新的键值对。

对于方法 sum，你将得到一个表示前缀的字符串，你需要返回所有以该前缀开头的键的值的总和。

https://leetcode-cn.com/problems/map-sum-pairs/
*/

class TrieNode {
  next: { [key: string]: TrieNode } = {}
  value: number | null = null
}

class MapSum {
  private root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(key: string, val: number): void {
    let cur = this.root
    for (let i = 0; i < key.length; i++) {
      const c = key[i]
      if (!cur.next[c]) {
        cur.next[c] = new TrieNode()
      }

      cur = cur.next[c]
    }

    cur.value = val
  }

  sum(prefix: string): number {
    const stack: TrieNode[] = []
    const node = this.get(this.root, prefix, 0)
    if (!node) return 0

    let res = 0
    stack.push(node)
    while (stack.length) {
      const node = stack.pop()!

      if (node.value !== null) {
        res += node.value
      }

      const chars = Object.keys(node.next)

      for (const char of chars) {
        stack.push(node.next[char])
      }
    }

    return res
  }

  private get(node: TrieNode, prefix: string, digit: number): null | TrieNode {
    if (!node) return null

    if (digit === prefix.length) return node

    const c = prefix[digit]
    return this.get(node.next[c], prefix, digit + 1)
  }
}

export default MapSum
