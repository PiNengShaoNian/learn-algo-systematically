export default interface Stack<E> {
  push(item: E): void
  pop(): E | null
  peek(): E | null
  size(): number
  isEmpty(): boolean
}
