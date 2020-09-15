import bench from '../../util/bench'
import generateArr from '../../util/generateArr'
import HeapSort from '../heap-sort'

bench('堆排序', [10000, 100000], (iter) => {
  const arr: number[] = generateArr(iter, (i) => i, true)

  HeapSort.heapSort(arr)
})
