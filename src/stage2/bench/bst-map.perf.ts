import bench from '../../util/bench'
import generateArr from '../../util/generateArr'
import BSTMap from '../bst-map'

bench('BSTMap性能测试', [1000, 10000, 100000], (iter) => {
  const testArr = generateArr(iter, (i) => i, true)
  const map = new BSTMap<number, number>()
  for (let i = 0; i < testArr.length; i++) {
    map.put(testArr[i], i)
  }

  for (let i = 0; i < map.size(); i++) {
    map.get(i)
  }
})

bench('NativeMap性能测试', [1000, 10000, 100000], (iter) => {
  const testArr = generateArr(iter, (i) => i, true)
  const map: { [key: number]: number } = {}
  for (let i = 0; i < testArr.length; i++) {
    map[testArr[i]] = i
  }

  for (let i = 0; i < testArr.length; i++) {
    map[i]
  }
})
