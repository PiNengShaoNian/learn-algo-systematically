import BSTSet from '../bst-set'
import bench from '../../util/bench'
import generateArr from '../../util/generateArr'

bench('BSTSet性能测试', [1000, 10000, 100000], (iter) => {
  const testArr = generateArr(iter, (i) => i, true)

  const set = new BSTSet<number>()

  for (let i = 0; i < testArr.length; i++) {
    set.add(testArr[i])
  }

  for (let i = 0; i < testArr.length; i++) {
    set.remove(testArr[i])
  }
})
