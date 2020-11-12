import StringST from '../model/StringST'
import LoopQueue from '../stage1/basic-data-structure/loop-queue'

class TrieNode<Value> {
  character: string = ''
  value: Value | null = null
  size: number = 0
  left: TrieNode<Value> | null = null
  middle: TrieNode<Value> | null = null
  right: TrieNode<Value> | null = null
}

class TernarySearchTrie<Value> implements StringST<Value> {
  private _size: number = 0
  protected root: null | TrieNode<Value> = null

  size(): number {
    return this._size
  }
  isEmpty(): boolean {
    return this._size === 0
  }

  contains(key: string): boolean {
    return this.get(key) !== null
  }

  get(key: string): Value | null {
    if (key.length === 0) {
      throw new Error('Key must have a positive length')
    }

    const node = this._get(this.root, key, 0)

    if (!node) return null

    return node.value
  }

  private _get(
    node: TrieNode<Value> | null,
    key: string,
    digit: number
  ): null | TrieNode<Value> {
    if (!node) return null

    const currentChar = key[digit]

    if (currentChar < node.character) {
      return this._get(node.left, key, digit)
    } else if (currentChar > node.character) {
      return this._get(node.right, key, digit)
    } else if (digit < key.length - 1) {
      return this._get(node.middle, key, digit + 1)
    } else return node
  }

  put(key: string, value: Value | null): void {
    if (value === null) {
      return
    }

    let isNewKey = false

    if (!this.contains(key)) isNewKey = true

    this.root = this._put(this.root, key, value, 0, isNewKey)
  }

  private _put(
    node: TrieNode<Value> | null,
    key: string,
    value: Value,
    digit: number,
    isNewKey: boolean
  ): TrieNode<Value> | null {
    const currentChar = key[digit]

    if (!node) {
      node = new TrieNode()
      node.character = currentChar
    }

    if (currentChar < node.character) {
      node.left = this._put(node.left, key, value, digit, isNewKey)
    } else if (currentChar > node.character) {
      node.right = this._put(node.right, key, value, digit, isNewKey)
    } else if (digit < key.length - 1) {
      node.middle = this._put(node.middle, key, value, digit + 1, isNewKey)
      if (isNewKey) {
        node.size = node.size + 1
      }
    } else {
      node.value = value

      if (isNewKey) {
        node.size += 1
        this._size++
      }
    }

    return node
  }

  delete(key: string): void {
    if (!this.contains(key)) return

    this.root = this._delete(this.root, key, 0)
    this._size--
  }

  private _delete(
    node: TrieNode<Value> | null,
    key: string,
    digit: number
  ): null | TrieNode<Value> {
    if (!node) return null

    if (digit === key.length - 1) {
      node.size -= 1
      node.value = null
    } else {
      const nextChar = key[digit]

      if (nextChar < node.character) {
        node.left = this._delete(node.left, key, digit)
      } else if (nextChar > node.character) {
        node.right = this._delete(node.right, key, digit)
      } else {
        node.size -= 1
        node.middle = this._delete(node.middle, key, digit + 1)
      }

      if (node.size === 0) {
        if (!node.left && !node.right) return null
        else if (!node.left) return node.right
        else if (!node.right) return node.left
        else {
          const aux = node
          node = this._min(aux.right!)
          node.right = this._deleteMin(aux.right!)
          node.left = aux.left
        }
      }
    }
    return node
  }

  private _deleteMin(node: TrieNode<Value>): null | TrieNode<Value> {
    if (!node.left) return node.right

    node.left = this._deleteMin(node.left)

    return node
  }

  private _min(node: TrieNode<Value>): TrieNode<Value> {
    if (!node.left) return node

    return this._min(node.left)
  }
  keys(): Iterable<string> {
    const keys = new LoopQueue<string>()
    this.collect(this.root, '', keys)

    return keys
  }

  private collect(
    node: TrieNode<Value> | null,
    prefix: string,
    queue: LoopQueue<string>
  ): void {
    if (!node) return

    this.collect(node.left, prefix, queue)

    if (node.value !== null) {
      queue.enqueue(prefix + node.character)
    }

    this.collect(node.middle, prefix + node.character, queue)
    this.collect(node.right, prefix, queue)
  }

  keysThatMatch(pattern: string): Iterable<string> {
    const keysThatMatch = new LoopQueue<string>()

    this._collect(this.root, '', pattern, keysThatMatch)
    return keysThatMatch
  }

  private _collect(
    node: TrieNode<Value> | null,
    prefix: string,
    pattern: string,
    queue: LoopQueue<string>
  ): void {
    if (!node) return

    const digit = prefix.length

    const nextCharInPattern = pattern[digit]

    if (nextCharInPattern === '.' || nextCharInPattern < node.character) {
      this._collect(node.left, prefix, pattern, queue)
    }

    if (nextCharInPattern === '.' || nextCharInPattern === node.character) {
      if (digit === pattern.length - 1 && node.value !== null) {
        queue.enqueue(prefix + node.character)
      } else if (digit < pattern.length - 1) {
        this._collect(node.middle, prefix + node.character, pattern, queue)
      }
    }

    if (nextCharInPattern === '.' || nextCharInPattern > node.character) {
      this._collect(node.right, prefix, pattern, queue)
    }
  }

  keysWithPrefix(prefix: string): Iterable<string> {
    const keysWithPrefix = new LoopQueue<string>()

    const nodeWithPrefix = this._get(this.root, prefix, 0)

    if (!nodeWithPrefix) return keysWithPrefix

    if (nodeWithPrefix.value !== null) {
      keysWithPrefix.enqueue(prefix)
    }

    this.collect(nodeWithPrefix.middle, prefix, keysWithPrefix)
    return keysWithPrefix
  }
  longestPrefixOf(query: string): string {
    const length = this.search(this.root, query, 0, 0)

    return query.substring(0, length)
  }

  private search(
    node: TrieNode<Value> | null,
    query: string,
    digit: number,
    length: number
  ): number {
    if (!node) return length

    if (node.value !== null) {
      length = digit + 1
    }

    const nextChar = query[digit]

    if (nextChar < node.character) {
      return this.search(node.left, query, digit, length)
    } else if (nextChar > node.character) {
      return this.search(node.right, query, digit, length)
    } else if (digit < query.length - 1) {
      return this.search(node.middle, query, digit + 1, length)
    } else return length
  }
}

export default TernarySearchTrie
