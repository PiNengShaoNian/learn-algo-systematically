import ListNode from '../../model/ListNode'

/*
反转一个单链表。

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
https://leetcode-cn.com/problems/reverse-linked-list/
*/

export function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head
  }

  var rev = reverseList(head.next)

  head.next.next = head
  head.next = null

  return rev
}

export function reverseList1(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head

  const rev = reverseList(head.next)

  rev!.next!.next = head
  head.next = null

  return rev
}
