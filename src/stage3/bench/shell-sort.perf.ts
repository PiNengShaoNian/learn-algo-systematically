import bench from '../../util/bench'
import generateArr from '../../util/generateArr'
import ShellSort from '../shell-sort'

bench('希尔排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  ShellSort.shellSort(arr)
})

bench('希尔排序优化', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  ShellSort.shellSort1(arr)
})
