import bench from '../../../util/bench'
import generateArr from '../../../util/generateArr'
import LinkedListStack from '../linked-list-stack'

bench('LinkedListStack性能测试', [1000, 10000], (i) => {
  const arr = generateArr(i, (i) => i)

  const stack = new LinkedListStack<number>()
  for (let i = 0; i < arr.length; i++) {
    stack.push(arr[i])
  }

  for (let i = 0; i < arr.length; i++) {
    stack.pop()
  }
})
