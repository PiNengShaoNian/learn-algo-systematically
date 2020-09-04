/*
请你设计一个支持下述操作的栈。

实现自定义栈类 CustomStack ：

CustomStack(int maxSize)：用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。
void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。
int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。
void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/design-a-stack-with-increment-operation
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
class CustomStack {
  private data: number[] = []
  private add: number[]

  constructor(private maxSize: number) {
    this.add = Array.from({ length: maxSize }, () => 0)
  }

  push(x: number) {
    if (this.data.length >= this.maxSize) return

    this.data.push(x)
  }

  size() {
    return this.data.length
  }

  isEmpty() {
    return this.size() === 0
  }

  peek() {
    if (this.isEmpty()) return -1

    return this.data[this.size() - 1]
  }

  pop(): number {
    if (this.data.length === 0) {
      return -1
    }

    const index = this.data.length - 1

    const item = this.data[index] + this.add[index]
    if (index !== 0) {
      this.add[index - 1] = this.add[index - 1] + this.add[index]
    }
    this.add[index] = 0
    this.data.length -= 1
    return item
  }

  increment(k: number, val: number) {
    k = Math.min(k - 1, this.data.length - 1)

    if (k >= 0) {
      this.add[k] = this.add[k] + val
    }
  }
}

export default CustomStack
