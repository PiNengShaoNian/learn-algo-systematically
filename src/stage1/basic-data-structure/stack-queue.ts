import Queue from '../../model/Queue'
import ArrayStack from './array-stack'

class StackQueue<E> implements Queue<E> {
  private stIn = new ArrayStack<E>()
  private stOut = new ArrayStack<E>()
  private _front: E | null = null

  size(): number {
    return this.stIn.size() + this.stOut.size()
  }
  isEmpty(): boolean {
    return this.size() === 0
  }

  enqueue(e: E): void {
    if (this.isEmpty()) {
      this._front = e
    }
    this.stIn.push(e)
  }

  front(): E | null {
    return this._front
  }

  dequeue(): E | null {
    if (this.isEmpty()) return null

    if (this.stOut.isEmpty()) {
      while (this.stIn.size()) {
        this.stOut.push(this.stIn.pop()!)
      }
    }

    const item = this.stOut.pop()
    this._front = this.stOut.peek()

    return item
  }
}

export default StackQueue
