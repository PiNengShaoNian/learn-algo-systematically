import UF from '../model/UF'

class QuickUnion implements UF {
  private id: number[]
  private _count: number = 0

  constructor(size: number) {
    this.id = Array.from({ length: size }, (_, i) => i)
    this._count = size
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

    if (leaderId2 === leaderId1) return

    this.id[leaderId1] = leaderId2
    this._count--
  }
  find(site: number): number {
    while (site != this.id[site]) site = this.id[site]

    return site
  }
}

export default QuickUnion
