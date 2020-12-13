import RedBlackTree from '../red-black-tree'

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

describe('RedBlackTree', () => {
  test('能工作删除和添加元素', () => {
    const map = new RedBlackTree<string, number>()

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

    expect(map.size()).toBe(new Set(words).size)

    for (const word of words) {
      map.delete(word)
    }

    expect(map.size()).toBe(0)
  })

  test('ceiling方法工作正常', () => {
    const map = new RedBlackTree<number, boolean>()

    map.put(1, true)
    map.put(2, true)
    map.put(3, true)
    map.put(5, true)
    map.put(6, true)

    expect(map.ceiling(0)).toBe(1)
    expect(map.ceiling(1)).toBe(1)
    expect(map.ceiling(2)).toBe(2)
    expect(map.ceiling(3)).toBe(3)
    expect(map.ceiling(4)).toBe(5)
    expect(map.ceiling(7)).toBe(null)
  })

  test('floor方法工作正常', () => {
    const map = new RedBlackTree<number, boolean>()

    map.put(1, true)
    map.put(2, true)
    map.put(3, true)
    map.put(5, true)
    map.put(6, true)

    expect(map.floor(1)).toBe(1)
    expect(map.floor(2)).toBe(2)
    expect(map.floor(3)).toBe(3)
    expect(map.floor(4)).toBe(3)
    expect(map.floor(7)).toBe(6)
    expect(map.floor(0)).toBe(null)
  })

  test('select方法工作正常', () => {
    const map = new RedBlackTree<number, boolean>()

    map.put(1, true)
    map.put(2, true)
    map.put(3, true)
    map.put(5, true)
    map.put(6, true)

    expect(map.select(0)).toBe(1)
    expect(map.select(1)).toBe(2)
    expect(map.select(2)).toBe(3)
    expect(map.select(6)).toBe(null)
    expect(map.select(-1)).toBe(null)
    map.delete(2)
    expect(map.select(2)).toBe(5)
  })
})
