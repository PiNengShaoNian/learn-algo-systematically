/*
208. 实现 Trie (前缀树)
实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。

https://leetcode-cn.com/problems/implement-trie-prefix-tree/
*/

class TrieNode {
  public isWord: boolean = false
  public next: { [key: string]: TrieNode } = {}

  constructor(isWord?: boolean) {
    if (typeof isWord === 'boolean') {
      this.isWord = isWord
    }
  }
}

class Trie {
  private root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  insert(word: string): void {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]

      if (!cur.next[c]) {
        cur.next[c] = new TrieNode()
      }
      cur = cur.next[c]
    }

    if (!cur.isWord) {
      cur.isWord = true
    }
  }

  search(word: string): boolean {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]

      if (!cur.next[c]) return false

      cur = cur.next[c]
    }

    return cur.isWord
  }

  startsWith(prefix: string): boolean {
    let cur = this.root

    for (let i = 0; i < prefix.length; i++) {
      const c = prefix[i]

      if (!cur.next[c]) return false

      cur = cur.next[c]
    }

    return true
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
