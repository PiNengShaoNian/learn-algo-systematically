type Merger<E> = (a: E, b: E) => E

export class SQRTDecomposition<Value> {
  private data: Value[] = []
  private blocks: Value[] = []
  private merger: Merger<Value>
  private blockSize: number
  private dataNumber

  constructor(data: Value[], merger: Merger<Value>) {
    this.merger = merger
    this.dataNumber = data.length

    this.blockSize = Math.floor(Math.sqrt(this.dataNumber))
    for (let i = 0; i < data.length; i++) {
      this.data[i] = data[i]

      if (i % this.blockSize === 0) {
        this.blocks[Math.floor(i / this.blockSize)] = data[i]
      } else {
        const prev = this.blocks[Math.floor(i / this.blockSize)]
        this.blocks[Math.floor(i / this.blockSize)] = merger(prev, data[i])
      }
    }
  }

  query(left: number, right: number): Value | null {
    if (
      left < 0 ||
      left >= this.dataNumber ||
      right < 0 ||
      right >= this.dataNumber
    ) {
      return null
    }

    const leftBlock = Math.floor(left / this.blockSize)
    const rightBlock = Math.floor(right / this.blockSize)

    let result: Value
    result = this.data[left]
    if (leftBlock === rightBlock) {
      for (let i = left + 1; i <= right; i++) {
        result = this.merger(result, this.data[i])
      }
    } else {
      for (let i = left + 1; i < (leftBlock + 1) * this.blockSize; i++) {
        result = this.merger(result, this.data[i])
      }

      for (let i = leftBlock + 1; i < rightBlock; i++) {
        result = this.merger(result, this.blocks[i])
      }

      for (let i = rightBlock * this.blockSize; i <= right; i++) {
        result = this.merger(result, this.data[i])
      }
    }

    return result
  }

  update(index: number, value: Value): void {
    if (index < 0 || index >= this.dataNumber) return

    const blockIndex = Math.floor(index / this.blockSize)

    const lastIndex = Math.min(
      this.dataNumber,
      (blockIndex + 1) * this.blockSize
    )
    this.data[index] = value
    this.blocks[this.blockSize * blockIndex] = this.data[
      this.blockSize * blockIndex
    ]
    for (let i = blockIndex * this.blockSize + 1; i < lastIndex; i++) {
      this.blocks[blockIndex] = this.merger(
        this.blocks[blockIndex],
        this.data[i]
      )
    }
  }
}
