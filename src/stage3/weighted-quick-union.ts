import UF from '../model/UF'

class WeightedQuickUnion implements UF {
  private id: number[]
  private _count: number = 0
  private size: number[]

  constructor(size: number) {
    this.id = Array.from({ length: size }, (_, i) => i)
    this.size = Array.from({ length: size }, () => 1)
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

    if (this.size[leaderId1] < this.size[leaderId2]) {
      this.id[leaderId1] = leaderId2
      this.size[leaderId2] += this.size[leaderId1]
    } else {
      this.id[leaderId2] = leaderId1
      this.size[leaderId1] += this.size[leaderId2]
    }

    this._count--
  }
  find(site: number): number {
    while (site != this.id[site]) site = this.id[site]

    return site
  }
}

export default WeightedQuickUnion
