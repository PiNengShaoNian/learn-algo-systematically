import ListNode from '../model/ListNode'

export default function buildLinkedList(arr: number[]) {
  let head: ListNode
  let cur: ListNode = (head = new ListNode(arr[0], null))

  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i], null)
    cur = cur.next
  }

  return head
}
