import LoopQueue from './loop-queue'
import Stack from '../../model/Stack'

class QueueStack<E> implements Stack<E> {
  private q = new LoopQueue<E>()
  private top: E | null = null

  push(item: E): void {
    this.q.enqueue(item)
    this.top = item
  }

  pop(): E | null {
    if (this.q.isEmpty()) return null

    const q2 = new LoopQueue<E>()

    while (this.q.size() !== 1) {
      q2.enqueue((this.top = this.q.dequeue()!))
    }

    const item = this.q.dequeue()
    this.q = q2
    return item
  }

  peek(): E | null {
    return this.top
  }

  size(): number {
    return this.q.size()
  }

  isEmpty(): boolean {
    return this.size() === 0
  }
}

class SingleQueueStack<E> implements Stack<E> {
  private q = new LoopQueue<E>()

  push(item: E): void {
    this.q.enqueue(item)

    for (let i = 1; i < this.q.size(); i++) {
      this.q.enqueue(this.q.dequeue()!)
    }
  }

  pop(): E | null {
    return this.q.dequeue()
  }

  peek(): E | null {
    return this.q.front()
  }

  size(): number {
    return this.q.size()
  }

  isEmpty(): boolean {
    return this.size() === 0
  }
}

export default SingleQueueStack
