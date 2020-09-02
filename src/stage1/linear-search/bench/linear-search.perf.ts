import bench from '../../../util/bench'
import { linearSearch } from '../linear-search'

bench('线性查找', [1000000, 10000000], (iter) => {
  const data = Array.from({ length: iter }, (_, i) => i)
  linearSearch(data, iter)
})
