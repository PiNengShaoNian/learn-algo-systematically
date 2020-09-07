/*
删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5

https://leetcode-cn.com/problems/remove-linked-list-elements/
*/

import ListNode from '../../model/ListNode'

const removeElements = (head: ListNode, val: number) => {
  const dummyNode: ListNode = {
    val: 0,
    next: head,
  } as ListNode

  let prev = dummyNode

  while (prev.next) {
    if (prev.next.val === val) {
      prev.next = prev.next.next
      continue
    }

    prev = prev.next
  }

  return dummyNode.next
}

const removeElements1 = (
  head: ListNode | null,
  val: number
): null | ListNode => {
  if (!head) return null

  head.next = removeElements1(head.next, val)

  return head.val === val ? head.next : head
}

export default removeElements1
