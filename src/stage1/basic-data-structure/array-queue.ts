import Queue from '../../model/Queue'

class ArrayQueue<E> implements Queue<E> {
  private queue: E[] = []
  size(): number {
    return this.queue.length
  }
  isEmpty(): boolean {
    return this.queue.length === 0
  }
  enqueue(e: E): void {
    this.queue.unshift(e)
  }
  front(): E | null {
    if (this.isEmpty()) return null

    return this.queue[0]
  }
  dequeue(): E | null {
    if (this.isEmpty()) return null

    return this.queue.shift()!
  }
}

export default ArrayQueue
