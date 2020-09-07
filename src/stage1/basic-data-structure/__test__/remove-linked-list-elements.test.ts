import removeElements from '../remove-linked-list-elements'
import generateArr from '../../../util/generateArr'
import ListNode from '../../../model/ListNode'

const buildLinkedList = (arr: number[]) => {
  let head: ListNode
  let cur: ListNode = (head = new ListNode(arr[0], null))

  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i], null)
    cur = cur.next
  }

  return head
}

test('removeElements测试', () => {
  const testArr: number[] = generateArr(10, (i) => i)

  let head: ListNode | null = buildLinkedList(testArr)

  head = removeElements(head, 6)

  for (const x of head!) {
    expect(x).not.toBe(6)
  }

  head = removeElements(head!, 5)

  for (const x of head!) {
    expect(x).not.toBe(5)
  }

  let head2: ListNode | null = buildLinkedList([6, 6, 6, 6, 6, 666])

  head2 = removeElements(head2, 6)

  for (const x of head2!) {
    expect(x).not.toBe(6)
  }

  head2 = removeElements(head2!, 666)

  expect(head2).toBeNull()
})
