import AVLTree from '../avl-tree'

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
  const map = new AVLTree<string, number>()

  for (const word of words) {
    if (!map.contains(word)) {
      map.put(word, 1)
    } else map.put(word, map.get(word)! + 1)
  }

  const nativeMap: { [key: string]: number } = {}

  for (const word of words) {
    if (!nativeMap[word]) {
      nativeMap[word] = 1
    } else nativeMap[word] = nativeMap[word] + 1
  }

  for (const key of Object.keys(nativeMap)) {
    expect(map.get(key)).toBe(nativeMap[key])
  }

  expect(map.isBST()).toBeTruthy()
  expect(map.isBalance()).toBeTruthy()
  expect(map.size()).toBe(new Set(words).size)

  for (const word of words) {
    map.delete(word)
  }

  expect(map.size()).toBe(0)
})
