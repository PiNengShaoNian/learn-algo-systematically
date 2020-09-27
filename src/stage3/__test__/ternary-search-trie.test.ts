import TernarySearchTrie from '../ternary-search-trie'

const words = [
  'For',
  'many',
  'people,',
  'technology',
  'makes',
  'things',
  'easier.',
  'For',
  'people',
  'with',
  'disabilities,',
  'technology',
  'makes',
  'things',
  'possible.',
  'Accessibility',
  'means',
  'developing',
  'content',
  'to',
  'be',
  'as',
  'accessible',
  'as',
  'possible',
  'no',
  'matter',
  'an',
  "individual's",
  'physical',
  'and',
  'cognitive',
  'abilities',
  'and',
  'no',
  'matter',
  'how',
  'they',
  'access',
  'the',
  'web.',
]

test('TernarySearchTrie工作正常', () => {
  const trie = new TernarySearchTrie<number>()

  for (const word of words) {
    if (!trie.contains(word)) {
      trie.put(word, 1)
    } else trie.put(word, trie.get(word)! + 1)
  }

  const nativeMap: { [key: string]: number } = {}

  for (const word of words) {
    if (!nativeMap[word]) {
      nativeMap[word] = 1
    } else nativeMap[word] = nativeMap[word] + 1
  }

  for (const key of Object.keys(nativeMap)) {
    expect(trie.get(key)).toBe(nativeMap[key])
  }
})
