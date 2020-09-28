export default interface Map<Key, Value> {
  delete(key: Key): void
  contains(key: Key): boolean
  get(key: Key): Value | null
  put(key: Key, value: Value): void
  size(): number
  isEmpty(): boolean
}
