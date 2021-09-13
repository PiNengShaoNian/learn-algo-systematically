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

const nums = [
  997800000, -997900000, 998000000, -998100000, 998200000, -998300000,
  998400000, -998500000, 998600000, -998700000, 998800000, -998900000,
  999000000, -999100000, 999200000, -999300000, 999400000, -999500000,
  999600000, -999700000, 999800000, -999900000,
]

describe('RedBlackTree', () => {
  test('能工作删除和添加元素', () => {
    const strMap = new RedBlackTree<string, number>()
    const numMap = new RedBlackTree<number, number>()

    for (const word of words) {
      if (!strMap.contains(word)) {
        strMap.put(word, 1)
      } else strMap.put(word, strMap.get(word)! + 1)
    }

    const strNativeMap: { [key: string]: number } = {}

    for (const word of words) {
      strNativeMap[word] = (strNativeMap[word] ?? 0) + 1
    }

    for (const key of Object.keys(strNativeMap)) {
      expect(strMap.get(key)).toBe(strNativeMap[key])
    }

    expect(strMap.size()).toBe(new Set(words).size)

    for (const word of Object.keys(strNativeMap)) {
      const size = strMap.size()
      expect(strMap.contains(word)).toBeTruthy()
      strMap.delete(word)
      expect(strMap.contains(word)).toBeFalsy()
      expect(strMap.size()).toBe(size - 1)
    }

    expect(strMap.size()).toBe(0)

    for (const num of nums) {
      numMap.put(num, (numMap.get(num) ?? 0) + 1)
    }

    const numNativeMap: { [key: number]: number } = {}

    for (const num of nums) {
      numNativeMap[num] = (numNativeMap[num] ?? 0) + 1
    }

    for (const key of Object.keys(numNativeMap)) {
      expect(numMap.get(+key)).toBe(numNativeMap[+key])
    }

    expect(numMap.size()).toBe(new Set(nums).size)

    for (const num of nums) {
      const size = numMap.size()
      expect(numMap.contains(num)).toBeTruthy()
      numMap.delete(num)
      expect(numMap.contains(num)).toBeFalsy()
      expect(numMap.size()).toBe(size - 1)
    }

    expect(numMap.size()).toBe(0)
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

  test('max方法工作正常', () => {
    const map = new RedBlackTree<number, boolean>()

    map.put(1, true)
    expect(map.max()).toBe(1)
    map.put(2, true)
    expect(map.max()).toBe(2)

    map.put(3, true)
    expect(map.max()).toBe(3)

    map.put(5, true)
    expect(map.max()).toBe(5)

    map.put(6, true)

    expect(map.max()).toBe(6)

    map.put(8, true)
    expect(map.max()).toBe(8)
    map.delete(8)
    map.put(7, true)
    expect(map.max()).toBe(7)
  })

  test('min方法工作正常', () => {
    const map = new RedBlackTree<number, boolean>()

    map.put(1, true)
    map.put(2, true)
    map.put(3, true)
    map.put(5, true)
    map.put(6, true)
    map.put(8, true)
    map.put(7, true)

    expect(map.min()).toBe(1)
    map.delete(1)
    expect(map.min()).toBe(2)
    map.delete(2)
    expect(map.min()).toBe(3)
  })
})
