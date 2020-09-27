export default interface StringST<Value> {
  size(): number
  isEmpty(): boolean
  contains(key: string): boolean
  get(key: string): Value | null
  put(key: string, value: Value): void
  delete(key: string): void
  keys(): Iterable<string>
  keysWithPrefix(prefix: string): Iterable<string>
  longestPrefixOf(query: string): string
  keysThatMatch(pattern: string): Iterable<string>
}
