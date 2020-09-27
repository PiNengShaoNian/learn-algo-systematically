import bench from '../../util/bench'
import uniform from '../../util/uniform'
import QuickUnion from '../quick-union'

bench('QuckUnion性能测试', [1000, 10000, 100000], (size) => {
  const uf = new QuickUnion(size)

  for (let i = 0; i < size / 2; i++) {
    uf.union(uniform(0, size), uniform(0, size))
  }

  for (let i = 0; i < size / 2; i++) {
    uf.connected(uniform(0, size), uniform(0, size))
  }
})

bench('QuckUnion连接连续节点', [1000, 10000, 100000], (size) => {
  const uf = new QuickUnion(size)

  for (let i = 1; i < size / 2; i++) {
    uf.union(i - 1, i)
  }

  for (let i = 0; i < size / 2; i++) {
    uf.connected(uniform(0, size), uniform(0, size))
  }
})
