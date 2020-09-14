export default interface Map<Key, Value> {
  remove(key: Key): Value | null
  contains(key: Key): boolean
  get(key: Key): Value | null
  put(key: Key, value: Value): void
  size(): number
  isEmpty(): boolean
}
