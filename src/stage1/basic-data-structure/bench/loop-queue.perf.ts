import bench from '../../../util/bench'
import generateArr from '../../../util/generateArr'
import LoopQueue from '../loop-queue'

bench('LoopQueue性能测试', [1000, 10000, 100000], (iter) => {
  const arr = generateArr(iter, (i) => i)

  const queue = new LoopQueue<number>()

  for (let i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i])
  }

  while (!queue.isEmpty()) {
    queue.dequeue()
  }
})
