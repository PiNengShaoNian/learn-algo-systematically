export default interface Queue<E> {
  size(): number
  isEmpty(): boolean
  enqueue(e: E): void
  front(): E | null
  dequeue(): E | null
}
