import bench from '../../util/bench'
import generateArr from '../../util/generateArr'
import MaxHeap from '../max-heap'

bench('MaxHeap性能测试', [1000, 10000, 100000], (iter) => {
  const arr = generateArr(iter, (i) => i, true)
  const pq = new MaxHeap<number>()
  for (let i = 0; i < arr.length; i++) {
    pq.insert(arr[i])
  }

  for (let i = 0; i < arr.length; i++) {
    pq.deleteMax()
  }
})

bench('MaxHeap数组构造函数性能测试', [1000, 10000, 100000], (iter) => {
  const arr = generateArr(iter, (i) => i, true)
  const pq = new MaxHeap<number>(arr)

  for (let i = 0; i < arr.length; i++) {
    pq.deleteMax()
  }
})
