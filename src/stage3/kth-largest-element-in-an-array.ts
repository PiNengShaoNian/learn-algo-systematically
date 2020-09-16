import MinHeap from './min-heap'

function findKthLargest(nums: number[], k: number): number {
  const pq = new MinHeap<number>()
  for (let i = 0; i < k; i++) {
    pq.insert(nums[i])
  }

  for (let i = k; i < nums.length; i++) {
    if (!pq.isEmpty() && pq.min() < nums[i]) {
      pq.deleteMin()
      pq.insert(nums[i])
    }
  }

  return pq.min()
}
