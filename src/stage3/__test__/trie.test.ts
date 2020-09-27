import Trie from '../trie'

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

test('Trie测试', () => {
  const trie = new Trie()

  for (let i = 0; i < words.length; i++) {
    trie.add(words[i])
  }

  expect(trie.size()).toBe(new Set(words).size)

  expect(trie.contains('access')).toBeTruthy()
  expect(trie.contains('matter')).toBeTruthy()
  expect(trie.contains('possible')).toBeTruthy()

  expect(trie.isPrefix('disabilitie')).toBeTruthy()
  expect(trie.isPrefix('disabili')).toBeTruthy()
})
