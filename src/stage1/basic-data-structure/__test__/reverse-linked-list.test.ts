import { reverseList, reverseList1 } from '../reverse-linked-list'
import buildLinkedList from '../../../util/buildLinkedList'

test('reverse linked list测试', () => {
  let node1 = buildLinkedList([1, 2, 3, 4, 5])

  node1 = reverseList(node1)!

  const arr1 = []
  for (let x of node1) arr1.push(x)

  expect(arr1).toEqual([5, 4, 3, 2, 1])
})
