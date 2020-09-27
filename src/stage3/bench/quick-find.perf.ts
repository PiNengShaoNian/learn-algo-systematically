import bench from '../../util/bench'
import uniform from '../../util/uniform'
import QuickFind from '../quick-find'

bench('QuckFind性能测试', [1000, 10000], (size) => {
  const uf = new QuickFind(size)

  for (let i = 0; i < size / 2; i++) {
    uf.union(uniform(0, size), uniform(0, size))
  }

  for (let i = 0; i < size / 2; i++) {
    uf.connected(uniform(0, size), uniform(0, size))
  }
})
