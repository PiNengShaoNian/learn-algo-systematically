import UF from '../model/UF'

class QuickFind implements UF {
  private id: number[] = []
  private _count: number = 0

  constructor(size: number) {
    this._count = size

    this.id = Array.from({ length: size }, (_, i) => i)
  }

  connected(site1: number, site2: number): boolean {
    return this.find(site1) === this.find(site2)
  }
  count(): number {
    return this._count
  }
  union(site1: number, site2: number): void {
    const leaderId1 = this.find(site1)
    const leaderId2 = this.find(site2)

    if (leaderId1 === leaderId2) return

    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === leaderId1) {
        this.id[i] = leaderId2
      }
    }
    this._count--
  }
  find(site: number): number {
    return this.id[site]
  }
}

export default QuickFind
