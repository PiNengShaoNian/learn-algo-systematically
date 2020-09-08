import bench from '../../util/bench'
import generateArr from '../../util/generateArr'
import MergeSort from '../merge-sort'

bench('归并排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  MergeSort.mergeSort(arr)
})

bench('归并排序,在对小序列排序时使用插入排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  MergeSort.mergeSort1(arr)
})

bench('归并排序,自底向上', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  MergeSort.mergeSortBottomUp(arr)
})

bench(
  '归并排序,自底向上,在对小序列排序时使用插入排序',
  [10000, 100000],
  (iter) => {
    const arr: number[] = generateArr(iter, (i) => i, true)

    MergeSort.mergeSortBottomUp1(arr)
  }
)

bench('归并排序,排序有序数组', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i)

  MergeSort.mergeSort(arr)
})
