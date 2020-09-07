export default class ListNode {
  constructor(public val: number, public next: ListNode | null) {}

  *[Symbol.iterator]() {
    for (let x: null | ListNode = this; x; x = x.next) {
      yield x.val
    }
  }
}
