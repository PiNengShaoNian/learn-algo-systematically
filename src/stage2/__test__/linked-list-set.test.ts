import LinkedListSet from '../linked-list-set'

test('BSTSet工作正常', () => {
  const arr = [1, 1, 2, 2, 3, 3, 4, 4]

  const set = new LinkedListSet<number>()

  for (const e of arr) set.add(e)

  expect(set.size()).toBe(4)

  const arr2 = ['aa', 'aa', 'bb', 'cc', 'cc', 'dd']

  const set2 = new LinkedListSet<string>()

  for (const e of arr2) set2.add(e)

  expect(set2.size()).toBe(4)
  expect(set2.contains('cc')).toBeTruthy()
  expect(set2.contains('c')).toBeFalsy()
})
