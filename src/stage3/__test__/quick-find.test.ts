import QuickFind from '../quick-find'

test('QuickFind测试', () => {
  const uf = new QuickFind(10)

  expect(uf.count()).toBe(10)

  uf.union(0, 1)
  uf.union(1, 2)
  uf.union(2, 3)
  uf.union(0, 10)
  expect(uf.count()).toBe(6)
})
