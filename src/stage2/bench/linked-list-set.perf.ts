import LinkedListSet from '../linked-list-set'
import bench from '../../util/bench'
import generateArr from '../../util/generateArr'

bench('LinkedListSet性能测试', [1000, 10000], (iter) => {
  const testArr = generateArr(iter, (i) => i, true)

  const set = new LinkedListSet<number>()

  for (let i = 0; i < testArr.length; i++) {
    set.add(testArr[i])
  }

  for (let i = 0; i < testArr.length; i++) {
    set.remove(testArr[i])
  }
})
