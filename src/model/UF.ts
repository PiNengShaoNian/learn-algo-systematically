export default interface UF {
  connected(site1: number, site2: number): boolean
  count(): number
  union(site1: number, site2: number): void
  find(site: number): number
}
