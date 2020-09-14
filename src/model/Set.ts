export default interface Set<E> {
  add(e: E): void
  remove(e: E): void
  contains(e: E): boolean
  size(): number
  isEmpty(): boolean
}
