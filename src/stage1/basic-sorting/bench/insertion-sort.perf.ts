import bench from '../../../util/bench'
import generateArr from '../../../util/generateArr'
import InsertionSort from '../insertion-sort'

bench('插入排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  InsertionSort.insertionSort(arr)
})

bench('插入排序优化',[10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  InsertionSort.insertionSort1(arr)
})

bench('插入排序排序有序数组',[10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i)

  InsertionSort.insertionSort2(arr)
})
