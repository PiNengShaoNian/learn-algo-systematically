export class NumArray {
  private data: number[] = []
  private blocks: number[] = []
  private N: number
  private B: number = 0
  private Bn: number = 0

  constructor(nums: number[]) {
    this.N = nums.length
    if (this.N === 0) return

    this.B = Math.floor(Math.sqrt(this.N))
    this.Bn = Math.ceil(this.N / this.B)

    for (let i = 0; i < this.N; i++) {
      this.data[i] = nums[i]
    }

    for (let i = 0; i < this.Bn; i++) {
      this.blocks[i] = 0
    }

    for (let i = 0; i < this.N; i++) {
      this.blocks[Math.floor(i / this.B)] += nums[i]
    }
  }

  sumRange(x: number, y: number): number {
    if (x < 0 || x >= this.N || y < 0 || y >= this.N) return 0

    const bStart = Math.floor(x / this.B)
    const bEnd = Math.floor(y / this.B)

    let result = 0
    if (bStart === bEnd) {
      for (let i = x; i <= y; i++) {
        result += this.data[i]
      }

      return result
    }

    for (let i = x; i < (bStart + 1) * this.B; i++) {
      result += this.data[i]
    }

    for (let i = bStart + 1; i < bEnd; i++) {
      result += this.blocks[i]
    }

    for (let i = bEnd * this.B; i <= y; i++) {
      result += this.data[i]
    }

    return result
  }

  update(i: number, val: number): void {
    if (i < 0 || i >= this.N) return

    const b = Math.floor(i / this.B)

    this.blocks[b] -= this.data[i]
    this.blocks[b] += val

    this.data[i] = val
  }
}
