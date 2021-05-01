import bench from '../../util/bench'
import { generateRandomStrArr } from '../../util/generateArr'
import { LSDSort } from '../lsd-sort'

bench('LSD排序性能', [1000, 10000], (n) => {
  const arr = generateRandomStrArr(n, 20)
  LSDSort(arr, 20)
})

bench('LSD排序短字符串性能', [1000, 10000], (n) => {
  const arr = generateRandomStrArr(n, 6)
  LSDSort(arr, 6)
})

bench('Native sort排序性能', [1000, 10000], (n) => {
  const arr = generateRandomStrArr(n, 20)
  arr.sort()
})

bench('Native sort排序短字符串性能', [1000, 10000], (n) => {
  const arr = generateRandomStrArr(n, 6)
  arr.sort()
})
