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
  private _size = 0
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  size(): number {
    return this._size
  }

  add(word: string): void {
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
      this._size++
    }
  }

  contains(word: string): boolean {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]

      if (!cur.next[c]) return false

      cur = cur.next[c]
    }

    return cur.isWord
  }

  isPrefix(prefix: string): boolean {
    let cur = this.root

    for (let i = 0; i < prefix.length; i++) {
      const c = prefix[i]

      if (!cur.next[c]) return false

      cur = cur.next[c]
    }

    return true
  }
}

export default Trie
