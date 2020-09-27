/*
211. 添加与搜索单词 - 数据结构设计
如果数据结构中有任何与word匹配的字符串，则bool search（word）返回true，否则返回false。 单词可能包含点“。” 点可以与任何字母匹配的地方。

请你设计一个数据结构，支持 添加新单词 和 查找字符串是否与任何先前添加的字符串匹配 。

实现词典类 WordDictionary ：

WordDictionary() 初始化词典对象
void addWord(word) 将 word 添加到数据结构中，之后可以对它进行匹配
bool search(word) 如果数据结构中存在字符串与 word 匹配，则返回 true ；否则，返回  false 。word 中可能包含一些 '.' ，每个 . 都可以表示任何一个字母。

 https://leetcode-cn.com/problems/design-add-and-search-words-data-structure/
*/

class TrieNode {
  isWord: boolean = false
  next: { [key: string]: TrieNode } = {}
}

class WordDictionary {
  private root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  addWord(word: string): void {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (!cur.next[c]) {
        cur.next[c] = new TrieNode()
      }
      cur = cur.next[c]
    }

    cur.isWord = true
  }

  search(word: string): boolean {
    return this._search(this.root, word, 0)
  }

  private _search(node: TrieNode, word: string, digit: number): boolean {
    const c = word[digit]

    if (digit === word.length) return node.isWord

    const chars = Object.keys(node.next)

    if (c !== '.') {
      if (!node.next[c]) return false
      else return this._search(node.next[c], word, digit + 1)
    } else {
      for (const char of chars) {
        if (this._search(node.next[char], word, digit + 1)) return true
      }

      return false
    }
  }
}

export default WordDictionary

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
