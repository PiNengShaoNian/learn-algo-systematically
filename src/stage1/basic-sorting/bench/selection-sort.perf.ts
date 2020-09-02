import bench from '../../../util/bench'
import generateArr from '../../../util/generateArr'
import SelectionSort from '../selection-sort'

bench('选择排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  SelectionSort.selectionSort(arr)
})
