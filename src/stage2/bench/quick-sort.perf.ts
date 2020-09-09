import bench from '../../util/bench'
import generateArr from '../../util/generateArr'
import QuickSort from '../quick-sort'

bench('快速排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  QuickSort.quickSort(arr)
})
bench('三路快速排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  QuickSort.quickSort3Ways(arr)
})

bench('快速排序,排序有序数组', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i)

  QuickSort.quickSort1(arr)
})

bench('快速排序,排序相同元素数组', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, () => 0)

  QuickSort.quickSort1(arr)
})
bench('三路快速排序,排序相同元素数组', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, () => 0)

  QuickSort.quickSort3Ways(arr)
})

bench('快速排序,小序列时使用插入排序优化', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  QuickSort.quickSort1(arr)
})

bench('native sort', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  arr.sort((a, b) => a - b)
})
